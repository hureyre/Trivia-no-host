<?php
// api/index.php - Main router for the Trivia API

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'db.php';

$request = $_GET['action'] ?? '';

switch ($request) {
    case 'create_room':
        $roomCode = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 4));
        $stmt = $pdo->prepare("INSERT INTO games (room_code, status) VALUES (?, 'lobby')");
        $stmt->execute([$roomCode]);
        $gameId = $pdo->lastInsertId();
        echo json_encode(['room_code' => $roomCode, 'game_id' => $gameId]);
        break;

    case 'join_room':
        $roomCode = strtoupper($_POST['room_code'] ?? '');
        $playerName = $_POST['player_name'] ?? '';
        
        $stmt = $pdo->prepare("SELECT id FROM games WHERE room_code = ?");
        $stmt->execute([$roomCode]);
        $game = $stmt->fetch();

        if (!$game) {
            echo json_encode(['error' => 'Oda bulunamadı!']);
            break;
        }

        $playerToken = bin2hex(random_bytes(16));
        $playerStmt = $pdo->prepare("INSERT INTO players (game_id, name, token) VALUES (?, ?, ?)");
        $playerStmt->execute([$game['id'], $playerName, $playerToken]);
        $playerId = $pdo->lastInsertId();
        
        echo json_encode([
            'game_id' => $game['id'],
            'player_token' => $playerToken,
            'player_name' => $playerName,
            'player_id' => $playerId
        ]);
        break;

    case 'get_game_state':
        $roomCode = $_GET['room_code'] ?? '';
        $stmt = $pdo->prepare("SELECT * FROM games WHERE room_code = ?");
        $stmt->execute([$roomCode]);
        $game = $stmt->fetch();

        if (!$game) {
            echo json_encode(['error' => 'Oda bulunamadı!']);
            break;
        }

        // Get players
        $pStmt = $pdo->prepare("SELECT id, name, score, is_host FROM players WHERE game_id = ?");
        $pStmt->execute([$game['id']]);
        $players = $pStmt->fetchAll();

        // Get current question if playing
        $question = null;
        if ($game['current_question_id']) {
            $qStmt = $pdo->prepare("SELECT id, question_text, explanation, difficulty FROM questions WHERE id = ?");
            $qStmt->execute([$game['current_question_id']]);
            $question = $qStmt->fetch();
            
            if ($question) {
                $oStmt = $pdo->prepare("SELECT id, option_text FROM options WHERE question_id = ?");
                $oStmt->execute([$question['id']]);
                $question['options'] = $oStmt->fetchAll();
            }
        }

        echo json_encode([
            'game' => $game,
            'players' => $players,
            'current_question' => $question
        ]);
        break;

    case 'start_game':
        $gameId = $_POST['game_id'] ?? null;
        $playerToken = $_POST['player_token'] ?? '';
        
        // Verify host (for now first player)
        $stmt = $pdo->prepare("UPDATE games SET status = 'playing' WHERE id = ?");
        $stmt->execute([$gameId]);
        echo json_encode(['success' => true]);
        break;

    case 'select_question':
        $gameId = $_POST['game_id'] ?? null;
        $categoryId = $_POST['category_id'] ?? null;
        $difficulty = $_POST['difficulty'] ?? 'easy';

        // Get a random question
        $qStmt = $pdo->prepare("SELECT id FROM questions WHERE category_id = ? AND difficulty = ? ORDER BY RAND() LIMIT 1");
        $qStmt->execute([$categoryId, $difficulty]);
        $question = $qStmt->fetch();

        if ($question) {
            $updateStmt = $pdo->prepare("UPDATE games SET current_question_id = ?, active_difficulty = ?, question_started_at = NOW() WHERE id = ?");
            $updateStmt->execute([$question['id'], $difficulty, $gameId]);
            echo json_encode(['success' => true, 'question_id' => $question['id']]);
        } else {
            echo json_encode(['error' => 'Bu kategoride soru kalmadı!']);
        }
        break;

    case 'get_players':
        $gameId = $_GET['game_id'] ?? null;
        if (!$gameId) {
            echo json_encode(['error' => 'Game ID required']);
            break;
        }
        $stmt = $pdo->prepare("SELECT id, name, score, is_host FROM players WHERE game_id = ?");
        $stmt->execute([$gameId]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'get_categories':
        $stmt = $pdo->query("SELECT id, name FROM categories");
        echo json_encode($stmt->fetchAll());
        break;

    case 'get_questions':
        $categoryId = $_GET['category_id'] ?? null;
        $difficulty = $_GET['difficulty'] ?? 'easy';
        
        if (!$categoryId) {
            echo json_encode(['error' => 'Category ID required']);
            break;
        }

        $stmt = $pdo->prepare("SELECT id, question_text, explanation, difficulty FROM questions WHERE category_id = ? AND difficulty = ? ORDER BY RAND() LIMIT 1");
        $stmt->execute([$categoryId, $difficulty]);
        $question = $stmt->fetch();

        if ($question) {
            $optStmt = $pdo->prepare("SELECT id, option_text, is_correct FROM options WHERE question_id = ?");
            $optStmt->execute([$question['id']]);
            $question['options'] = $optStmt->fetchAll();
            
            // Remove is_correct from options to prevent cheating in frontend
            foreach ($question['options'] as &$option) {
                unset($option['is_correct']);
            }
        }

        echo json_encode($question);
        break;

    case 'use_joker':
        $playerId = $_POST['player_id'] ?? null;
        $playerToken = $_POST['player_token'] ?? '';
        $jokerType = $_POST['joker_type'] ?? '';

        // Verification
        $stmt = $pdo->prepare("SELECT * FROM players WHERE id = ? AND token = ?");
        $stmt->execute([$playerId, $playerToken]);
        $player = $stmt->fetch();

        if (!$player) {
            echo json_encode(['error' => 'Geçersiz oyuncu!']);
            break;
        }

        // Logic for jokers (simplified for now)
        // In a full implementation, you'd track used jokers in a new table
        echo json_encode(['success' => true, 'joker' => $jokerType]);
        break;
    case 'submit_answer':
        $playerId = $_POST['player_id'] ?? null;
        $playerToken = $_POST['player_token'] ?? '';
        $questionId = $_POST['question_id'] ?? null;
        $optionId = $_POST['option_id'] ?? null;

        // Verify player
        $pStmt = $pdo->prepare("SELECT id, score FROM players WHERE id = ? AND token = ?");
        $pStmt->execute([$playerId, $playerToken]);
        $player = $pStmt->fetch();

        if (!$player) {
            echo json_encode(['error' => 'Geçersiz oyuncu!']);
            break;
        }

        // Check if correct
        $oStmt = $pdo->prepare("SELECT is_correct FROM options WHERE id = ? AND question_id = ?");
        $oStmt->execute([$optionId, $questionId]);
        $option = $oStmt->fetch();

        $isCorrect = $option && $option['is_correct'];
        $points = 0;

        if ($isCorrect) {
            // Get question difficulty to determine points
            $qStmt = $pdo->prepare("SELECT difficulty FROM questions WHERE id = ?");
            $qStmt->execute([$questionId]);
            $q = $qStmt->fetch();
            
            $pointsMap = ['easy' => 10, 'medium' => 20, 'hard' => 30];
            $points = $pointsMap[$q['difficulty']] ?? 10;

            $uStmt = $pdo->prepare("UPDATE players SET score = score + ? WHERE id = ?");
            $uStmt->execute([$points, $playerId]);
        }

        echo json_encode([
            'correct' => (bool)$isCorrect,
            'points' => $points,
            'new_score' => $player['score'] + $points
        ]);
        break;
}
