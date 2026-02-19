const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const { GameManager, CATEGORIES, DIFFICULTIES, QUESTIONS_PER_CATEGORY } = require('./GameManager');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player.html'));
});

// Game Rooms Map
const games = new Map(); // roomId -> GameManager instance

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Helper to get current game for this socket
  const getGame = () => {
    const roomId = socket.data.roomId;
    return roomId ? games.get(roomId) : null;
  };

  // --- Room Management ---

  socket.on('createRoom', () => {
    const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const gameManager = new GameManager(io, roomId);
    games.set(roomId, gameManager);

    socket.join(roomId);
    socket.data.roomId = roomId;

    console.log(`Room created: ${roomId} by ${socket.id}`);
    socket.emit('roomCreated', { roomId });
  });

  socket.on('joinRoom', (data) => {
    // Handle both object {code} and string input just in case
    const roomId = (typeof data === 'object' ? data.code : data).toUpperCase();

    if (games.has(roomId)) {
      socket.join(roomId);
      socket.data.roomId = roomId;
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      socket.emit('roomJoined', { roomId });
    } else {
      socket.emit('error', { message: 'Oda bulunamadı!' });
    }
  });

  // --- Reconnection Logic ---
  socket.on('rejoinGame', (data) => {
    const { roomId, token } = data;
    if (games.has(roomId)) {
      const gameManager = games.get(roomId);
      if (gameManager.playerSessions[token]) {
        socket.join(roomId);
        socket.data.roomId = roomId;

        // Restore player connection in GameManager
        const result = gameManager.handlePlayerJoin(socket.id, data.playerName, token);

        socket.emit('rejoinSuccess', {
          roomId,
          playerId: socket.id,
          playerName: result.playerName,
          gameStarted: gameManager.gameState.gameStarted
        });

        // Trigger state sync
        if (gameManager.gameState.gameStarted) {
          // Sync Game State similar to joinAsPlayer
          socket.emit('gameStarted', {
            message: 'Oyuna geri dönüldü!',
            currentPlayerId: gameManager.gameState.currentTurn,
            currentPlayerName: gameManager.gameState.players[gameManager.gameState.currentTurn].name
          });
          // Sync active question if any
          if (gameManager.gameState.currentQuestion) {
            socket.emit('questionSelected', {
              question: gameManager.gameState.currentQuestion,
              timer: gameManager.gameState.questionTimer,
              points: DIFFICULTIES[gameManager.gameState.currentDifficulty].points,
              category: gameManager.gameState.currentCategory,
              difficulty: gameManager.gameState.currentDifficulty
            });
          }
        } else {
          // Sync Lobby
          gameManager.io.to(roomId).emit('playerListUpdate', {
            players: gameManager.getPlayersData(),
            totalPlayers: Object.keys(gameManager.gameState.players).length,
            gameStarted: false
          });
        }

        console.log(`Player reconnected to room ${roomId}`);
      } else {
        socket.emit('error', { message: 'Oturum bulunamadı veya süresi dolmuş.' });
      }
    } else {
      socket.emit('error', { message: 'Oda artık mevcut değil.' });
    }
  });

  // --- Player Management ---

  socket.on('joinAsPlayer', (data) => {
    const gameManager = getGame();
    if (!gameManager) {
      socket.emit('error', { message: 'Önce bir odaya katılmalısınız!' });
      return;
    }

    const { playerName, token } = data;
    const isReconnection = token && gameManager.playerSessions[token];

    if (gameManager.gameState.gameStarted && !isReconnection) {
      socket.emit('joinRejected', { message: 'Oyun çoktan başladı!' });
      return;
    }

    const result = gameManager.handlePlayerJoin(socket.id, playerName, token);

    socket.emit('joinSuccess', {
      playerId: result.playerId,
      playerToken: result.playerToken,
      playerName: result.playerName,
      message: result.isReconnection ? 'Tekrar hoşgeldin! Puanın korundu.' : 'Bağlandı! Oyun bekleniyor...'
    });

    gameManager.io.to(gameManager.roomId).emit('playerListUpdate', {
      players: gameManager.getPlayersData(),
      totalPlayers: Object.keys(gameManager.gameState.players).length,
      gameStarted: gameManager.gameState.gameStarted
    });

    // Sync state if late join/reconnect
    if (gameManager.gameState.gameStarted) {
      socket.emit('gameStarted', {
        message: 'Oyuna geri dönüldü!',
        currentPlayerId: gameManager.gameState.currentTurn,
        currentPlayerName: gameManager.gameState.players[gameManager.gameState.currentTurn].name,
        gameId: 'reconnect'
      });

      // If question active
      if (gameManager.gameState.currentQuestion) {
        setTimeout(() => {
          socket.emit('questionSelected', {
            question: gameManager.gameState.currentQuestion,
            timer: gameManager.gameState.questionTimer,
            points: DIFFICULTIES[gameManager.gameState.currentDifficulty].points,
            doubleActive: gameManager.gameState.pendingJokers.double
          });

          // If passed
          if (gameManager.gameState.activePlayer !== gameManager.gameState.currentTurn) {
            // Maybe emit questionPassed state?
            // For now simple sync
          }
        }, 500);
      } else {
        if (socket.id === gameManager.gameState.currentTurn) {
          setTimeout(() => {
            socket.emit('yourTurn', {
              message: 'Sıra sende! Kategori seç.',
              availableJokers: gameManager.gameState.players[socket.id].jokers
            });
          }, 500);
        }
      }
    }
  });

  // --- Game Control ---

  socket.on('startGame', () => {
    const gameManager = getGame();
    if (!gameManager) return;

    if (!gameManager.gameState.players[socket.id]) {
      socket.emit('error', { message: 'Önce oyuna katılmalısın!' });
      return;
    }

    if (gameManager.gameState.gameStarted) {
      socket.emit('error', { message: 'Oyun zaten başladı!' });
      return;
    }

    if (!gameManager.startGame()) {
      socket.emit('error', { message: 'En az 2 oyuncu gerekli!' });
      return;
    }

    console.log(`Game started in room ${gameManager.roomId}`);
  });

  // Use Joker
  socket.on('useJoker', (data) => {
    const gameManager = getGame();
    if (!gameManager) return;

    const { jokerType } = data;
    const gameState = gameManager.gameState;

    if (socket.id !== gameState.currentTurn) {
      socket.emit('error', { message: 'Sıra sende değil!' });
      return;
    }

    if (jokerType === 'double' && gameState.currentQuestion) {
      socket.emit('error', { message: 'Çift Bela sorudan ÖNCE kullanılmalı!' });
      return;
    }

    if (gameManager.useJoker(socket.id, jokerType)) {
      if (jokerType === 'double') {
        io.to(gameManager.roomId).emit('jokerUsed', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          jokerType: 'Double Trouble',
          message: 'Doğru cevap 2 kat puan!'
        });
      } else if (jokerType === 'extraTime') {
        io.to(gameManager.roomId).emit('jokerUsed', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          jokerType: 'Extra Time',
          message: 'Süre uzatıldı!'
        });

        if (gameState.currentQuestion && gameState.questionTimer) {
          gameManager.stopTimer();
          const difficulty = gameState.currentDifficulty;
          const extendedTime = DIFFICULTIES[difficulty].time * 2;
          gameManager.startQuestionTimer(extendedTime);
        }
      }
      socket.emit('jokerActivated', { jokerType });
    } else {
      socket.emit('error', { message: 'Joker zaten kullanıldı veya geçersiz!' });
    }
  });

  // Select Question
  socket.on('selectQuestion', (data) => {
    const gameManager = getGame();
    if (!gameManager) return;

    const { category, difficulty } = data;
    const gameState = gameManager.gameState;

    if (socket.id !== gameState.currentTurn) {
      socket.emit('error', { message: 'Sıra sende değil!' });
      return;
    }

    if (gameState.currentQuestion) {
      socket.emit('error', { message: 'Soru zaten aktif!' });
      return;
    }

    if (!CATEGORIES.includes(category)) {
      socket.emit('error', { message: 'Geçersiz kategori!' });
      return;
    }

    // Check category limit
    const attempts = gameState.categoryAttempts[socket.id][category];
    if (attempts >= QUESTIONS_PER_CATEGORY) {
      socket.emit('error', {
        message: `${category} kategorisinden hakkın doldu!`
      });
      return;
    }

    const question = gameManager.selectQuestion(socket.id, category, difficulty);

    if (!question) {
      socket.emit('error', { message: 'Bu kategoride soru kalmadı!' });
      return;
    }

    let timerDuration = DIFFICULTIES[difficulty].time;
    if (gameState.pendingJokers.extraTime) {
      timerDuration *= 2;
    }

    io.to(gameManager.roomId).emit('questionSelected', {
      category,
      difficulty,
      question: {
        id: question.id,
        text: question.question,
        options: question.options
      },
      points: DIFFICULTIES[difficulty].points,
      timer: timerDuration,
      doubleActive: gameState.pendingJokers.double
    });

    gameManager.startQuestionTimer(timerDuration);
  });

  // Submit Answer
  socket.on('submitAnswer', (data) => {
    const gameManager = getGame();
    if (!gameManager) return;

    const { answer } = data;
    const gameState = gameManager.gameState;

    if (!gameState.currentQuestion) {
      socket.emit('error', { message: 'Aktif soru yok!' });
      return;
    }

    // Check if it's the ACTIVE player's turn (handles pass mechanic)
    // gameManager.gameState.activePlayer should be set. If not, fallback to currentTurn
    const activePlayerId = gameState.activePlayer || gameState.currentTurn;

    if (socket.id !== activePlayerId) {
      socket.emit('error', { message: 'Cevaplama sırası sende değil!' });
      return;
    }

    const isCorrect = answer === gameState.currentQuestion.correctAnswer;

    // Always stop timer when answer submitted
    gameManager.stopTimer();

    if (isCorrect) {
      // Calculation
      let points = DIFFICULTIES[gameState.currentDifficulty].points;

      // Handling Steal/Pass Points:
      // If it was a pass (activePlayer != currentTurn), maybe half points?
      // Requirement says: "Question passes to opponent". Doesn't specify point reduction.
      // We will halve points if it is a steal/pass answer.

      const isSteal = socket.id !== gameState.currentTurn;
      if (isSteal) {
        points = Math.floor(points / 2);
      } else {
        if (gameState.pendingJokers.double) points *= 2;
      }

      gameState.players[socket.id].score += points;

      io.to(gameManager.roomId).emit('answerResult', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name,
        correct: true,
        points,
        newScore: gameState.players[socket.id].score
      });

      // Point Theft Joker Logic support (if we keep it)
      // gameState.lastEarnedPoints = { playerId: socket.id, points: points };

      gameManager.endQuestion(true);

    } else {
      // WRONG Answer
      io.to(gameManager.roomId).emit('answerResult', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name,
        correct: false
      });

      // Add to attempts
      gameState.attemptsForQuestion.push(socket.id);

      // Pass to next player
      gameManager.passTurnOrEnd();
    }
  });



  socket.on('disconnect', () => {
    // We need to find which game the socket was in.
    // socket.data.roomId should have it.
    const roomId = socket.data.roomId;
    if (roomId && games.has(roomId)) {
      const gameManager = games.get(roomId);
      console.log(`Disconnected: ${socket.id} from ${roomId}`);

      const result = gameManager.handlePlayerDisconnect(socket.id);

      if (result) {
        io.to(roomId).emit('playerDisconnected', {
          message: `${result.name} ayrıldı`,
          players: gameManager.getPlayersData()
        });

        if (result.wasTurn && gameManager.gameState.gameStarted) {
          gameManager.stopTimer();
          gameManager.nextTurn();
        }

        // Clean up empty rooms
        if (Object.keys(gameManager.gameState.players).length === 0) {
          console.log(`Deleting empty room ${roomId}`);
          games.delete(roomId);
        }
      }
    }
  });

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🎮 Trivia Server running on port ${PORT}`);
});
