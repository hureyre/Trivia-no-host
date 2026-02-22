-- Trivia Game Database Schema

CREATE DATABASE IF NOT EXISTS trivia_db;
USE trivia_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_VALUE_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_VALUE_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    question_text TEXT NOT NULL,
    explanation TEXT,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Options Table
CREATE TABLE IF NOT EXISTS options (
    id INT AUTO_VALUE_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Games (Rooms) Table
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_VALUE_INCREMENT PRIMARY KEY,
    room_code VARCHAR(6) NOT NULL UNIQUE,
    status ENUM('lobby', 'playing', 'finished') DEFAULT 'lobby',
    current_question_id INT,
    active_difficulty ENUM('easy', 'medium', 'hard'),
    question_started_at TIMESTAMP NULL,
    current_turn_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (current_question_id) REFERENCES questions(id) ON DELETE SET NULL
);

-- Players Table
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_VALUE_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    token VARCHAR(255) NOT NULL,
    is_host BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Initial Categories
INSERT IGNORE INTO categories (name) VALUES 
('Sanat'), ('Coğrafya'), ('Genel Kültür'), ('Tarih'), ('Bilim'), ('Spor'), ('Mantık');
