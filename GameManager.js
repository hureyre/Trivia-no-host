const { getQuestions } = require('./data/questions');

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

class GameManager {
    constructor(io) {
        this.io = io;
        this.gameState = {
            players: {},
            currentTurn: null,
            gameStarted: false,
            currentQuestion: null,
            questionTimer: null,
            timerInterval: null,
            isStealPhase: false,
            stealBuzzOrder: [],
            currentCategory: null,
            currentDifficulty: null,
            usedQuestions: [],
            pendingJokers: { double: false, extraTime: false },
            categoryAttempts: {},
            gameEnded: false,
            lastEarnedPoints: null
        };
        this.playerSessions = {};
    }

    // --- Player Management ---

    handlePlayerJoin(socketId, playerName, token) {
        // Check for reconnection
        let savedSession = null;
        if (token && this.playerSessions[token]) {
            savedSession = this.playerSessions[token];
            console.log(`Player reconnected: ${playerName} (${socketId})`);
        }

        const newPlayer = {
            name: playerName,
            token: token || this.generatePlayerId(),
            score: savedSession ? savedSession.score : 0,
            strikes: savedSession ? savedSession.strikes : 0,
            questionsAsMainPlayer: savedSession ? savedSession.questionsAsMainPlayer : 0,
            jokers: savedSession ? savedSession.jokers : {
                double: true,
                extraTime: true,
                pointTheft: true
            },
            isActive: false
        };

        this.gameState.players[socketId] = newPlayer;

        // Restore turn if player disconnected during their turn
        if (savedSession && savedSession.isCurrentTurn) {
            this.gameState.currentTurn = socketId;
            // Also ensure isActive is true for this player if needed, though getPlayersData handles it via currentTurn check
        }

        // Restore or initialize category attempts
        if (savedSession && savedSession.categoryAttempts) {
            this.gameState.categoryAttempts[socketId] = savedSession.categoryAttempts;
        } else {
            this.gameState.categoryAttempts[socketId] = {};
            CATEGORIES.forEach(cat => {
                this.gameState.categoryAttempts[socketId][cat] = 0;
            });
        }

        return {
            playerId: socketId,
            playerToken: newPlayer.token,
            playerName: newPlayer.name,
            isReconnection: !!savedSession
        };
    }

    handlePlayerDisconnect(socketId) {
        if (this.gameState.players[socketId]) {
            const player = this.gameState.players[socketId];
            this.savePlayerSession(socketId);

            const wasTurn = socketId === this.gameState.currentTurn;
            delete this.gameState.players[socketId];

            return {
                name: player.name,
                wasTurn: wasTurn
            };
        }
        return null;
    }

    savePlayerSession(socketId) {
        const player = this.gameState.players[socketId];
        if (!player || !player.token) return;

        this.playerSessions[player.token] = {
            name: player.name,
            score: player.score,
            strikes: player.strikes,
            questionsAsMainPlayer: player.questionsAsMainPlayer,
            jokers: { ...player.jokers },
            categoryAttempts: { ...this.gameState.categoryAttempts[socketId] },
            isCurrentTurn: socketId === this.gameState.currentTurn
        };
    }

    getPlayersData() {
        return Object.keys(this.gameState.players).map(id => ({
            id,
            name: this.gameState.players[id].name,
            score: this.gameState.players[id].score,
            strikes: this.gameState.players[id].strikes,
            questionsAsMainPlayer: this.gameState.players[id].questionsAsMainPlayer,
            jokers: this.gameState.players[id].jokers,
            isActive: id === this.gameState.currentTurn
        }));
    }

    generatePlayerId() {
        return 'player_' + Math.random().toString(36).substr(2, 9);
    }

    // --- Game Logic ---

    startGame() {
        if (Object.keys(this.gameState.players).length < 2) return false;

        this.gameState.gameStarted = true;
        this.gameState.currentTurn = Object.keys(this.gameState.players)[0];
        return true;
    }

    nextTurn() {
        if (this.checkGameEnd()) {
            this.endGame();
            return;
        }

        this.gameState.currentQuestion = null;
        this.gameState.isStealPhase = false;
        this.gameState.stealBuzzOrder = [];
        this.gameState.pendingJokers = { double: false, extraTime: false };

        this.gameState.currentTurn = this.getNextPlayer();

        this.io.emit('newTurn', {
            currentPlayerId: this.gameState.currentTurn,
            currentPlayerName: this.gameState.players[this.gameState.currentTurn].name,
            players: this.getPlayersData()
        });

        this.io.to(this.gameState.currentTurn).emit('yourTurn', {
            message: 'It\'s your turn! Choose a category and difficulty.',
            availableJokers: this.gameState.players[this.gameState.currentTurn].jokers
        });
    }

    getNextPlayer() {
        const playerIds = Object.keys(this.gameState.players);
        if (playerIds.length === 0) return null;

        const currentIndex = playerIds.indexOf(this.gameState.currentTurn);
        // Calculate next index, handling cases where current player might have left
        let nextIndex = (currentIndex + 1) % playerIds.length;
        if (currentIndex === -1) nextIndex = 0; // If current player not found, start from 0

        return playerIds[nextIndex];
    }

    // --- Question & Timer ---

    selectQuestion(socketId, category, difficulty) {
        const questions = getQuestions();
        let availableQuestions = questions[category][difficulty].filter(q =>
            !this.gameState.usedQuestions.includes(q.id)
        );

        if (availableQuestions.length === 0) {
            console.log(`⚠️ Question pool exhausted for ${category} - ${difficulty}. Recycling questions.`);
            const questionsToRecycle = questions[category][difficulty].map(q => q.id);
            this.gameState.usedQuestions = this.gameState.usedQuestions.filter(id => !questionsToRecycle.includes(id));
            availableQuestions = questions[category][difficulty];
        }

        if (availableQuestions.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];

        this.gameState.usedQuestions.push(selectedQuestion.id);
        this.gameState.currentQuestion = selectedQuestion;
        this.gameState.currentCategory = category;
        this.gameState.currentDifficulty = difficulty;
        this.gameState.players[socketId].questionsAsMainPlayer++;
        this.gameState.categoryAttempts[socketId][category]++;

        return selectedQuestion;
    }

    startQuestionTimer(duration) {
        this.stopTimer(); // Ensure previous timer is cleared

        let timeLeft = duration;
        this.gameState.questionTimer = timeLeft;
        this.io.emit('timerUpdate', { timeLeft });

        this.gameState.timerInterval = setInterval(() => {
            timeLeft--;
            this.gameState.questionTimer = timeLeft;
            this.io.emit('timerUpdate', { timeLeft });

            if (timeLeft <= 0) {
                this.stopTimer();
                this.handleTimeOut();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
            this.gameState.timerInterval = null;
        }
    }

    handleTimeOut() {
        if (!this.gameState.isStealPhase) {
            // Main player timeout -> Steal Phase
            this.io.emit('mainPlayerTimeout', {
                message: 'Time\'s up! Other players can now buzz in to steal.',
                correctAnswer: this.gameState.currentQuestion.correctAnswer
            });
            this.enterStealPhase();
        } else {
            // Steal phase timeout
            this.io.emit('stealPhaseTimeout', {
                message: 'No one buzzed in time!',
                correctAnswer: this.gameState.currentQuestion.correctAnswer
            });
            this.endQuestion(false);
        }
    }

    enterStealPhase() {
        this.gameState.isStealPhase = true;
        this.gameState.stealBuzzOrder = [];

        Object.keys(this.gameState.players).forEach(playerId => {
            if (playerId !== this.gameState.currentTurn) {
                this.io.to(playerId).emit('enableBuzzer', { canBuzz: true });
            }
        });

        const stealTime = DIFFICULTIES[this.gameState.currentDifficulty].time;
        this.startQuestionTimer(stealTime);
    }

    endQuestion(wasAnswered) {
        this.stopTimer();

        setTimeout(() => {
            if (this.gameState.currentQuestion) {
                this.io.emit('showCorrectAnswer', {
                    correctAnswer: this.gameState.currentQuestion.correctAnswer,
                    explanation: this.gameState.currentQuestion.explanation || ''
                });
            }

            setTimeout(() => {
                this.nextTurn();
            }, 3000);
        }, 2000);
    }

    checkGameEnd() {
        const playerIds = Object.keys(this.gameState.players);
        if (playerIds.length === 0) return true; // Should not happen usually

        for (let playerId of playerIds) {
            if (this.gameState.players[playerId].questionsAsMainPlayer < TOTAL_QUESTIONS_PER_PLAYER) {
                return false;
            }
        }
        return true;
    }

    endGame() {
        this.gameState.gameEnded = true;
        const playerIds = Object.keys(this.gameState.players);
        let winner = null;
        let highestScore = -Infinity;

        playerIds.forEach(playerId => {
            if (this.gameState.players[playerId].score > highestScore) {
                highestScore = this.gameState.players[playerId].score;
                winner = playerId;
            }
        });

        this.io.emit('gameEnded', {
            winner: winner ? {
                id: winner,
                name: this.gameState.players[winner].name,
                score: highestScore
            } : null,
            finalScores: this.getPlayersData()
        });
    }

    // --- Joker Logic ---

    useJoker(socketId, jokerType) {
        const player = this.gameState.players[socketId];
        if (!player || !player.jokers[jokerType]) return false;

        player.jokers[jokerType] = false;

        if (jokerType === 'double') this.gameState.pendingJokers.double = true;
        if (jokerType === 'extraTime') this.gameState.pendingJokers.extraTime = true;

        return true;
    }
}

module.exports = { GameManager, CATEGORIES, DIFFICULTIES, QUESTIONS_PER_CATEGORY };
