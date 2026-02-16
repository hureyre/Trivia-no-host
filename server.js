const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Import questions database
const { getQuestions } = require('./data/questions');

// Serve static files
app.use(express.static('public'));

// Routes - Everyone uses the same interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player.html'));
});

// Game State
let gameState = {
  players: {}, // { socketId: { name, score, strikes, questionsAsMainPlayer, jokers: {double, extraTime, pointTheft}, isActive } }
  currentTurn: null, // socketId of active player
  gameStarted: false,
  currentQuestion: null,
  questionTimer: null,
  timerInterval: null,
  isStealPhase: false,
  stealBuzzOrder: [], // Track who buzzed first during steal
  currentCategory: null,
  currentDifficulty: null,
  usedQuestions: [], // Track used question IDs to avoid repeats
  pendingJokers: {
    double: false,
    extraTime: false
  },
  categoryAttempts: {}, // Track how many questions each player has attempted per category
  gameEnded: false
};

// Constants
const CATEGORIES = ['Sanat', 'Coğrafya', 'Genel Kültür', 'Tarih', 'Bilim', 'Spor', 'Mantık'];
const DIFFICULTIES = {
  easy: { time: 10, points: 10 },
  medium: { time: 15, points: 20 },
  hard: { time: 20, points: 30 }
};
const MAX_STRIKES = 3;
const STRIKE_PENALTY = 20;
const QUESTIONS_PER_CATEGORY = 2;
const TOTAL_QUESTIONS_PER_PLAYER = CATEGORIES.length * QUESTIONS_PER_CATEGORY; // 14 questions

// Helper Functions
function generatePlayerId() {
  return 'player_' + Math.random().toString(36).substr(2, 9);
}

function getNextPlayer() {
  const playerIds = Object.keys(gameState.players);
  if (playerIds.length === 0) return null;
  
  const currentIndex = playerIds.indexOf(gameState.currentTurn);
  const nextIndex = (currentIndex + 1) % playerIds.length;
  return playerIds[nextIndex];
}

function selectRandomQuestion(category, difficulty) {
  const questions = getQuestions();
  const categoryQuestions = questions[category][difficulty];
  
  // Filter out used questions
  const availableQuestions = categoryQuestions.filter(q => 
    !gameState.usedQuestions.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    return null; // No more questions available
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const selectedQuestion = availableQuestions[randomIndex];
  
  gameState.usedQuestions.push(selectedQuestion.id);
  return selectedQuestion;
}

function startQuestionTimer(duration) {
  let timeLeft = duration;
  gameState.questionTimer = timeLeft;
  
  // Broadcast initial timer
  io.emit('timerUpdate', { timeLeft });
  
  gameState.timerInterval = setInterval(() => {
    timeLeft--;
    gameState.questionTimer = timeLeft;
    io.emit('timerUpdate', { timeLeft });
    
    if (timeLeft <= 0) {
      clearInterval(gameState.timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function stopTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

function handleTimeOut() {
  stopTimer();
  
  if (!gameState.isStealPhase) {
    // Main player timed out - enter steal phase
    io.emit('mainPlayerTimeout', {
      message: 'Time\'s up! Other players can now buzz in to steal.',
      correctAnswer: gameState.currentQuestion.correctAnswer
    });
    
    enterStealPhase();
  } else {
    // Steal phase timeout
    io.emit('stealPhaseTimeout', {
      message: 'No one buzzed in time!',
      correctAnswer: gameState.currentQuestion.correctAnswer
    });
    
    endQuestion(false);
  }
}

function enterStealPhase() {
  gameState.isStealPhase = true;
  gameState.stealBuzzOrder = [];
  
  // Enable buzzers for all non-active players
  Object.keys(gameState.players).forEach(playerId => {
    if (playerId !== gameState.currentTurn) {
      io.to(playerId).emit('enableBuzzer', { canBuzz: true });
    }
  });
  
  // Start steal phase timer (same as original question duration)
  const difficulty = gameState.currentDifficulty;
  const stealTime = DIFFICULTIES[difficulty].time;
  startQuestionTimer(stealTime);
}

function handleCorrectAnswer(playerId, points) {
  gameState.players[playerId].score += points;
  
  io.emit('answerResult', {
    playerId,
    playerName: gameState.players[playerId].name,
    correct: true,
    points,
    newScore: gameState.players[playerId].score
  });
  
  return points; // Return points for potential Point Theft joker
}

function handleIncorrectAnswer(playerId, isMainPlayer) {
  if (!isMainPlayer) {
    // Add strike to stealing player
    gameState.players[playerId].strikes++;
    
    io.emit('answerResult', {
      playerId,
      playerName: gameState.players[playerId].name,
      correct: false,
      strikes: gameState.players[playerId].strikes
    });
    
    // Check if player reached max strikes
    if (gameState.players[playerId].strikes >= MAX_STRIKES) {
      gameState.players[playerId].score -= STRIKE_PENALTY;
      gameState.players[playerId].strikes = 0; // Reset strikes
      
      io.emit('strikePenalty', {
        playerId,
        playerName: gameState.players[playerId].name,
        penalty: STRIKE_PENALTY,
        newScore: gameState.players[playerId].score
      });
    }
  } else {
    io.emit('answerResult', {
      playerId,
      playerName: gameState.players[playerId].name,
      correct: false
    });
  }
}

function endQuestion(wasAnswered) {
  stopTimer();
  
  // Show correct answer
  setTimeout(() => {
    io.emit('showCorrectAnswer', {
      correctAnswer: gameState.currentQuestion.correctAnswer,
      explanation: gameState.currentQuestion.explanation || ''
    });
    
    // Move to next turn after showing answer
    setTimeout(() => {
      nextTurn();
    }, 3000);
  }, 2000);
}

function nextTurn() {
  // Check if game should end
  if (checkGameEnd()) {
    endGame();
    return;
  }
  
  // Reset question state
  gameState.currentQuestion = null;
  gameState.isStealPhase = false;
  gameState.stealBuzzOrder = [];
  gameState.pendingJokers = { double: false, extraTime: false };
  
  // Move to next player
  gameState.currentTurn = getNextPlayer();
  
  // Broadcast new turn
  io.emit('newTurn', {
    currentPlayerId: gameState.currentTurn,
    currentPlayerName: gameState.players[gameState.currentTurn].name,
    players: getPlayersData()
  });
  
  // Notify active player
  io.to(gameState.currentTurn).emit('yourTurn', {
    message: 'It\'s your turn! Choose a category and difficulty.',
    availableJokers: gameState.players[gameState.currentTurn].jokers
  });
}

function checkGameEnd() {
  // Game ends when all players have attempted exactly TOTAL_QUESTIONS_PER_PLAYER questions
  const playerIds = Object.keys(gameState.players);
  
  for (let playerId of playerIds) {
    if (gameState.players[playerId].questionsAsMainPlayer < TOTAL_QUESTIONS_PER_PLAYER) {
      return false;
    }
  }
  
  return true;
}

function endGame() {
  gameState.gameEnded = true;
  
  // Calculate winner
  const playerIds = Object.keys(gameState.players);
  let winner = null;
  let highestScore = -Infinity;
  
  playerIds.forEach(playerId => {
    if (gameState.players[playerId].score > highestScore) {
      highestScore = gameState.players[playerId].score;
      winner = playerId;
    }
  });
  
  io.emit('gameEnded', {
    winner: {
      id: winner,
      name: gameState.players[winner].name,
      score: highestScore
    },
    finalScores: getPlayersData()
  });
}

function getPlayersData() {
  return Object.keys(gameState.players).map(id => ({
    id,
    name: gameState.players[id].name,
    score: gameState.players[id].score,
    strikes: gameState.players[id].strikes,
    questionsAsMainPlayer: gameState.players[id].questionsAsMainPlayer,
    jokers: gameState.players[id].jokers,
    isActive: id === gameState.currentTurn
  }));
}

function getCategoryProgress(playerId) {
  if (!gameState.categoryAttempts[playerId]) {
    gameState.categoryAttempts[playerId] = {};
    CATEGORIES.forEach(cat => {
      gameState.categoryAttempts[playerId][cat] = 0;
    });
  }
  return gameState.categoryAttempts[playerId];
}

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  
  // Player Connection
  socket.on('joinAsPlayer', (data) => {
    const { playerName } = data;
    
    if (gameState.gameStarted) {
      socket.emit('joinRejected', { message: 'Game already in progress!' });
      return;
    }
    
    // Initialize player
    gameState.players[socket.id] = {
      name: playerName,
      score: 0,
      strikes: 0,
      questionsAsMainPlayer: 0,
      jokers: {
        double: true,
        extraTime: true,
        pointTheft: true
      },
      isActive: false
    };
    
    // Initialize category attempts
    gameState.categoryAttempts[socket.id] = {};
    CATEGORIES.forEach(cat => {
      gameState.categoryAttempts[socket.id][cat] = 0;
    });
    
    console.log(`Player joined: ${playerName} (${socket.id})`);
    
    socket.emit('joinSuccess', {
      playerId: socket.id,
      playerName: playerName,
      message: 'Connected! Waiting for game to start...'
    });
    
    // Broadcast updated player list
    io.emit('playerListUpdate', {
      players: getPlayersData(),
      totalPlayers: Object.keys(gameState.players).length
    });
  });
  
  // Start Game - Any player can start if 2+ players
  socket.on('startGame', () => {
    if (!gameState.players[socket.id]) {
      socket.emit('error', { message: 'You must join first!' });
      return;
    }
    
    if (Object.keys(gameState.players).length < 2) {
      socket.emit('error', { message: 'Need at least 2 players to start!' });
      return;
    }
    
    gameState.gameStarted = true;
    gameState.currentTurn = Object.keys(gameState.players)[0]; // First player starts
    
    io.emit('gameStarted', {
      message: 'Game Started!',
      currentPlayerId: gameState.currentTurn,
      currentPlayerName: gameState.players[gameState.currentTurn].name,
      players: getPlayersData()
    });
    
    // Notify first player
    io.to(gameState.currentTurn).emit('yourTurn', {
      message: 'It\'s your turn! Choose a category and difficulty.',
      availableJokers: gameState.players[gameState.currentTurn].jokers
    });
    
    console.log('Game started!');
  });
  
  // Use Joker
  socket.on('useJoker', (data) => {
    const { jokerType } = data;
    
    if (socket.id !== gameState.currentTurn) {
      socket.emit('error', { message: 'Not your turn!' });
      return;
    }
    
    if (!gameState.players[socket.id].jokers[jokerType]) {
      socket.emit('error', { message: 'Joker already used!' });
      return;
    }
    
    // Handle different joker types
    if (jokerType === 'double') {
      if (gameState.currentQuestion) {
        socket.emit('error', { message: 'Double Trouble must be used BEFORE the question is revealed!' });
        return;
      }
      gameState.pendingJokers.double = true;
      gameState.players[socket.id].jokers.double = false;
      
      io.emit('jokerUsed', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name,
        jokerType: 'Double Trouble',
        message: 'Points will be doubled if answered correctly!'
      });
      
    } else if (jokerType === 'extraTime') {
      gameState.pendingJokers.extraTime = true;
      gameState.players[socket.id].jokers.extraTime = false;
      
      io.emit('jokerUsed', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name,
        jokerType: 'Extra Time',
        message: 'Timer will be doubled!'
      });
      
      // If question already active, extend the timer
      if (gameState.currentQuestion && gameState.questionTimer) {
        stopTimer();
        const difficulty = gameState.currentDifficulty;
        const extendedTime = DIFFICULTIES[difficulty].time * 2;
        startQuestionTimer(extendedTime);
      }
    }
    
    socket.emit('jokerActivated', { jokerType });
  });
  
  // Select Category and Difficulty
  socket.on('selectQuestion', (data) => {
    const { category, difficulty } = data;
    
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
    
    if (!DIFFICULTIES[difficulty]) {
      socket.emit('error', { message: 'Invalid difficulty!' });
      return;
    }
    
    // Check category limit for this player
    const categoryProgress = getCategoryProgress(socket.id);
    if (categoryProgress[category] >= QUESTIONS_PER_CATEGORY) {
      socket.emit('error', { 
        message: `You've already answered ${QUESTIONS_PER_CATEGORY} questions from ${category}! Choose another category.` 
      });
      return;
    }
    
    // Select question
    const question = selectRandomQuestion(category, difficulty);
    
    if (!question) {
      socket.emit('error', { message: 'No more questions available in this category/difficulty!' });
      return;
    }
    
    gameState.currentQuestion = question;
    gameState.currentCategory = category;
    gameState.currentDifficulty = difficulty;
    gameState.players[socket.id].questionsAsMainPlayer++;
    categoryProgress[category]++;
    
    // Calculate timer duration (with extra time joker if active)
    let timerDuration = DIFFICULTIES[difficulty].time;
    if (gameState.pendingJokers.extraTime) {
      timerDuration *= 2;
    }
    
    // Broadcast question to all
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
    
    // Start timer
    startQuestionTimer(timerDuration);
    
    console.log(`Question selected: ${category} - ${difficulty}`);
  });
  
  // Submit Answer
  socket.on('submitAnswer', (data) => {
    const { answer } = data;
    
    if (!gameState.currentQuestion) {
      socket.emit('error', { message: 'No active question!' });
      return;
    }
    
    const isMainPlayer = socket.id === gameState.currentTurn;
    const isCorrect = answer === gameState.currentQuestion.correctAnswer;
    
    if (isMainPlayer && !gameState.isStealPhase) {
      // Main player answering
      stopTimer();
      
      if (isCorrect) {
        let points = DIFFICULTIES[gameState.currentDifficulty].points;
        
        // Apply double joker if active
        if (gameState.pendingJokers.double) {
          points *= 2;
        }
        
        const earnedPoints = handleCorrectAnswer(socket.id, points);
        
        // Store earned points for potential Point Theft
        gameState.lastEarnedPoints = {
          playerId: socket.id,
          points: earnedPoints
        };
        
        endQuestion(true);
      } else {
        handleIncorrectAnswer(socket.id, true);
        enterStealPhase();
      }
      
    } else if (gameState.isStealPhase && !isMainPlayer) {
      // Stealing player answering
      stopTimer();
      
      if (isCorrect) {
        const basePoints = DIFFICULTIES[gameState.currentDifficulty].points;
        const stealPoints = Math.floor(basePoints / 2); // Half points for stealing
        
        const earnedPoints = handleCorrectAnswer(socket.id, stealPoints);
        
        // Store earned points for potential Point Theft
        gameState.lastEarnedPoints = {
          playerId: socket.id,
          points: earnedPoints
        };
        
        endQuestion(true);
      } else {
        handleIncorrectAnswer(socket.id, false);
        
        // Continue steal phase if time remains
        if (gameState.questionTimer > 0) {
          enterStealPhase();
        } else {
          endQuestion(false);
        }
      }
    } else {
      socket.emit('error', { message: 'Cannot answer right now!' });
    }
  });
  
  // Buzz In (for steal phase)
  socket.on('buzzIn', () => {
    if (!gameState.isStealPhase) {
      socket.emit('error', { message: 'Not in steal phase!' });
      return;
    }
    
    if (socket.id === gameState.currentTurn) {
      socket.emit('error', { message: 'You are the main player!' });
      return;
    }
    
    if (gameState.stealBuzzOrder.includes(socket.id)) {
      socket.emit('error', { message: 'You already buzzed!' });
      return;
    }
    
    // Record buzz
    gameState.stealBuzzOrder.push(socket.id);
    
    // First buzzer gets to answer
    if (gameState.stealBuzzOrder.length === 1) {
      stopTimer();
      
      io.emit('buzzWinner', {
        playerId: socket.id,
        playerName: gameState.players[socket.id].name
      });
      
      // Enable answer buttons for buzzer
      io.to(socket.id).emit('enableAnswering', {
        question: gameState.currentQuestion,
        canAnswer: true
      });
      
      // Give them time to answer
      startQuestionTimer(5); // 5 seconds to answer after buzzing
    }
  });
  
  // Point Theft Joker
  socket.on('usePointTheft', () => {
    if (!gameState.players[socket.id].jokers.pointTheft) {
      socket.emit('error', { message: 'Point Theft joker already used!' });
      return;
    }
    
    if (!gameState.lastEarnedPoints) {
      socket.emit('error', { message: 'No points to steal!' });
      return;
    }
    
    const victim = gameState.lastEarnedPoints.playerId;
    const stolenPoints = gameState.lastEarnedPoints.points;
    
    // Transfer points
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
    
    // Clear last earned points
    gameState.lastEarnedPoints = null;
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
    
    // Handle player disconnect
    if (gameState.players[socket.id]) {
      const playerName = gameState.players[socket.id].name;
      delete gameState.players[socket.id];
      
      io.emit('playerDisconnected', {
        message: `${playerName} disconnected`,
        players: getPlayersData()
      });
      
      // If it was their turn, move to next player
      if (socket.id === gameState.currentTurn && gameState.gameStarted) {
        stopTimer();
        nextTurn();
      }
    }
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🎮 Trivia Game Server (No Host Mode) running on port ${PORT}`);
  console.log(`📱 Players: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://<your-local-ip>:${PORT}`);
});
