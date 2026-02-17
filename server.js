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

// Initialize Game Manager
const gameManager = new GameManager(io);

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Player Connection
  socket.on('joinAsPlayer', (data) => {
    const { playerName, token } = data;

    if (gameManager.gameState.gameStarted) {
      socket.emit('joinRejected', { message: 'Game already in progress!' });
      return;
    }

    const result = gameManager.handlePlayerJoin(socket.id, playerName, token);

    socket.emit('joinSuccess', {
      playerId: result.playerId,
      playerToken: result.playerToken,
      playerName: result.playerName,
      message: result.isReconnection ? 'Tekrar hoşgeldin! Puanın korundu.' : 'Bağlandı! Oyun bekleniyor...'
    });

    io.emit('playerListUpdate', {
      players: gameManager.getPlayersData(),
      totalPlayers: Object.keys(gameManager.gameState.players).length
    });
  });

  // Start Game
  socket.on('startGame', () => {
    if (!gameManager.gameState.players[socket.id]) {
      socket.emit('error', { message: 'You must join first!' });
      return;
    }

    if (!gameManager.startGame()) {
      socket.emit('error', { message: 'Need at least 2 players to start!' });
      return;
    }

    io.emit('gameStarted', {
      message: 'Game Started!',
      currentPlayerId: gameManager.gameState.currentTurn,
      currentPlayerName: gameManager.gameState.players[gameManager.gameState.currentTurn].name,
      players: gameManager.getPlayersData()
    });

    io.to(gameManager.gameState.currentTurn).emit('yourTurn', {
      message: 'It\'s your turn! Choose a category and difficulty.',
      availableJokers: gameManager.gameState.players[gameManager.gameState.currentTurn].jokers
    });

    console.log('Game started!');
  });

  // Use Joker
  socket.on('useJoker', (data) => {
    const { jokerType } = data;
    const gameState = gameManager.gameState;

    if (socket.id !== gameState.currentTurn) {
      socket.emit('error', { message: 'Not your turn!' });
      return;
    }

    if (jokerType === 'double' && gameState.currentQuestion) {
      socket.emit('error', { message: 'Double Trouble must be used BEFORE the question is revealed!' });
      return;
    }

    if (gameManager.useJoker(socket.id, jokerType)) {
      if (jokerType === 'double') {
        io.emit('jokerUsed', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          jokerType: 'Double Trouble',
          message: 'Points will be doubled if answered correctly!'
        });
      } else if (jokerType === 'extraTime') {
        io.emit('jokerUsed', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          jokerType: 'Extra Time',
          message: 'Timer will be doubled!'
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
      socket.emit('error', { message: 'Joker already used or invalid!' });
    }
  });

  // Select Category and Difficulty
  socket.on('selectQuestion', (data) => {
    const { category, difficulty } = data;
    const gameState = gameManager.gameState;

    if (socket.id !== gameState.currentTurn) {
      socket.emit('error', { message: 'Not your turn!' });
      return;
    }

    if (gameState.currentQuestion) {
      socket.emit('error', { message: 'Question already active!' });
      return;
    }

    if (!CATEGORIES.includes(category)) {
      socket.emit('error', { message: 'Invalid category!' });
      return;
    }

    // Check category limit
    const attempts = gameState.categoryAttempts[socket.id][category];
    if (attempts >= QUESTIONS_PER_CATEGORY) {
      socket.emit('error', {
        message: `You've already answered ${QUESTIONS_PER_CATEGORY} questions from ${category}! Choose another category.`
      });
      return;
    }

    const question = gameManager.selectQuestion(socket.id, category, difficulty);

    if (!question) {
      socket.emit('error', { message: 'No more questions available!' });
      return;
    }

    let timerDuration = DIFFICULTIES[difficulty].time;
    if (gameState.pendingJokers.extraTime) {
      timerDuration *= 2;
    }

    io.emit('questionSelected', {
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
    console.log(`Question selected: ${category} - ${difficulty}`);
  });

  // Submit Answer
  socket.on('submitAnswer', (data) => {
    const { answer } = data;
    const gameState = gameManager.gameState;

    if (!gameState.currentQuestion) {
      socket.emit('error', { message: 'No active question!' });
      return;
    }

    const isMainPlayer = socket.id === gameState.currentTurn;
    const isCorrect = answer === gameState.currentQuestion.correctAnswer;

    if (isMainPlayer && !gameState.isStealPhase) {
      gameManager.stopTimer();

      if (isCorrect) {
        let points = DIFFICULTIES[gameState.currentDifficulty].points;
        if (gameState.pendingJokers.double) points *= 2;

        gameState.players[socket.id].score += points;

        io.emit('answerResult', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          correct: true,
          points,
          newScore: gameState.players[socket.id].score
        });

        // Store earned points for Point Theft
        gameState.lastEarnedPoints = { playerId: socket.id, points: points };
        gameManager.endQuestion(true);
      } else {
        io.emit('answerResult', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          correct: false
        });
        gameManager.enterStealPhase();
      }

    } else if (gameState.isStealPhase && !isMainPlayer) {
      // Stealing logic
      gameManager.stopTimer();

      if (isCorrect) {
        const basePoints = DIFFICULTIES[gameState.currentDifficulty].points;
        const stealPoints = Math.floor(basePoints / 2);

        gameState.players[socket.id].score += stealPoints;

        io.emit('answerResult', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          correct: true,
          points: stealPoints,
          newScore: gameState.players[socket.id].score
        });

        gameState.lastEarnedPoints = { playerId: socket.id, points: stealPoints };
        gameManager.endQuestion(true);
      } else {
        gameState.players[socket.id].strikes++;

        io.emit('answerResult', {
          playerId: socket.id,
          playerName: gameState.players[socket.id].name,
          correct: false,
          strikes: gameState.players[socket.id].strikes
        });

        if (gameState.players[socket.id].strikes >= 3) { // 3 is MAX_STRIKES
          const STRIKE_PENALTY = 20;
          gameState.players[socket.id].score -= STRIKE_PENALTY;
          gameState.players[socket.id].strikes = 0;

          io.emit('strikePenalty', {
            playerId: socket.id,
            playerName: gameState.players[socket.id].name,
            penalty: STRIKE_PENALTY,
            newScore: gameState.players[socket.id].score
          });
        }

        if (gameState.questionTimer > 0) {
          gameManager.enterStealPhase(); // Restart steal timer/process for others
        } else {
          gameManager.endQuestion(false);
        }
      }
    }
  });

  // Buzz In
  socket.on('buzzIn', () => {
    const gameState = gameManager.gameState;
    if (!gameState.isStealPhase) return;
    if (socket.id === gameState.currentTurn) return;
    if (gameState.stealBuzzOrder.includes(socket.id)) return;

    gameState.stealBuzzOrder.push(socket.id);

    if (gameState.stealBuzzOrder.length === 1) {
      gameManager.stopTimer();

      io.emit('buzzWinner', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name
      });

      io.to(socket.id).emit('enableAnswering', {
        question: gameState.currentQuestion,
        canAnswer: true
      });

      gameManager.startQuestionTimer(5);
    }
  });

  // Point Theft
  socket.on('usePointTheft', () => {
    const gameState = gameManager.gameState;
    if (!gameState.players[socket.id].jokers.pointTheft) {
      socket.emit('error', { message: 'Already used!' });
      return;
    }

    if (!gameState.lastEarnedPoints) {
      socket.emit('error', { message: 'No points to steal!' });
      return;
    }

    const victim = gameState.lastEarnedPoints.playerId;
    const stolenPoints = gameState.lastEarnedPoints.points;

    gameState.players[victim].score -= stolenPoints;
    gameState.players[socket.id].score += stolenPoints;
    gameState.players[socket.id].jokers.pointTheft = false;

    io.emit('pointTheftUsed', {
      thiefId: socket.id,
      thiefName: gameState.players[socket.id].name,
      victimId: victim,
      victimName: gameState.players[victim].name,
      stolenPoints: stolenPoints,
      thiefNewScore: gameState.players[socket.id].score,
      victimNewScore: gameState.players[victim].score
    });

    gameState.lastEarnedPoints = null; // Consume
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
    const result = gameManager.handlePlayerDisconnect(socket.id);

    if (result) {
      io.emit('playerDisconnected', {
        message: `${result.name} disconnected`,
        players: gameManager.getPlayersData()
      });

      if (result.wasTurn && gameManager.gameState.gameStarted) {
        gameManager.stopTimer();
        gameManager.nextTurn();
      }
    }
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🎮 Trivia Game Server running on port ${PORT}`);
  console.log(`📱 Players: http://localhost:${PORT}`);
});
