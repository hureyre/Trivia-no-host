'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { apiCall } from '@/lib/api';
import AdminPanel from './AdminPanel';

interface Question {
    id: number;
    question_text: string;
    explanation: string;
    difficulty: string;
    options: { id: number; option_text: string }[];
}

interface GameBoardProps {
    gameId: number;
    roomCode: string;
    playerToken: string;
    playerId: number;
}


export default function GameBoard({ gameId, roomCode, playerToken, playerId }: GameBoardProps) {
    const [gameState, setGameState] = useState<any>(null);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [result, setResult] = useState<{ correct: boolean; points: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isShaking, setIsShaking] = useState(false);

    // Poll for game state
    useEffect(() => {
        const fetchState = async () => {
            try {
                const data = await apiCall('get_game_state', { room_code: roomCode });
                setGameState(data);
            } catch (err) {
                console.error('State fetching error:', err);
            }
        };

        const interval = setInterval(fetchState, 3000);
        return () => clearInterval(interval);
    }, [roomCode]);

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await apiCall('get_categories');
            setCategories(cats as { id: number; name: string }[]);
        };
        fetchCats();
    }, []);

    const handleSelectQuestion = async (catId: number, difficulty: string) => {
        await apiCall('select_question', { game_id: gameId, category_id: catId, difficulty }, 'POST');
        // State will be updated by polling
    };

    // Timer logic
    useEffect(() => {
        if (gameState?.current_question && timeLeft > 0 && !result) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [gameState?.current_question, timeLeft, result]);

    useEffect(() => {
        if (gameState?.current_question) {
            setTimeLeft(20);
        }
    }, [gameState?.current_question?.id]);

    const handleSubmit = async () => {
        if (selectedOption === null || !gameState?.current_question) return;
        setIsSubmitting(true);
        try {
            const res: any = await apiCall('submit_answer', {
                player_id: playerId,
                player_token: playerToken,
                question_id: gameState.current_question.id,
                option_id: selectedOption
            }, 'POST');

            setResult(res);

            if (res.correct) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#3b82f6', '#22c55e']
                });
            } else {
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
            }

            setTimeout(() => {
                setResult(null);
                setSelectedOption(null);
                setIsSubmitting(false);
            }, 4000);
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
        }
    };

    if (!gameState) return <div className="text-center p-10">Yükleniyor...</div>;

    const { game, players, current_question } = gameState;
    const currentPlayer = players.find((p: any) => p.id === playerId);
    const isHost = currentPlayer?.is_host === 1;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            {isHost && (
                <AdminPanel
                    gameId={gameId}
                    playerToken={playerToken}
                    isHost={isHost}
                    onReset={() => {
                        setSelectedOption(null);
                        setResult(null);
                    }}
                />
            )}

            {/* Header: Room & Players */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center arena-card p-6 rounded-[2rem] shadow-2xl border-b-4 border-blue-500/20"
            >
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">ARENA KODU</div>
                    <div className="text-4xl font-black tracking-tighter text-white font-mono">{game.room_code}</div>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {players.map((p: any) => (
                        <div key={p.id} className="relative group">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`w-16 h-16 rounded-2xl p-1 transition-all ${p.id === playerId ? 'neon-glow-blue bg-blue-600' : 'bg-slate-800'}`}
                            >
                                <img
                                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${p.name}`}
                                    alt={p.name}
                                    className="w-full h-full rounded-xl"
                                />
                                {p.is_host === 1 && (
                                    <span className="absolute -top-2 -right-2 bg-amber-500 text-[8px] font-black px-2 py-1 rounded-full text-amber-950">HOST</span>
                                )}
                            </motion.div>
                            <div className="mt-2 text-center">
                                <div className="text-[10px] font-bold text-gray-400 truncate w-16">{p.name}</div>
                                <div className="text-sm font-black text-white">{p.score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Main Content: Question or Lobby */}
            <AnimatePresence mode="wait">
                {current_question ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
                        }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="relative"
                    >
                        {/* Timer Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-slate-800 rounded-full overflow-hidden z-10">
                            <motion.div
                                initial={{ width: '100%' }}
                                animate={{
                                    width: `${(timeLeft / 20) * 100}%`,
                                    backgroundColor: timeLeft < 5 ? '#ef4444' : '#22c55e'
                                }}
                                className="h-full"
                            />
                        </div>

                        <div className="arena-card p-8 md:p-12 rounded-[3.5rem] mt-4 shadow-3xl border-t-2 border-white/5">
                            <div className="flex justify-between items-center mb-10">
                                <span className="px-4 py-2 bg-slate-900 text-blue-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-blue-500/30">
                                    {current_question.difficulty} • {timeLeft}s
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-12 leading-[1.2] tracking-tight text-center md:text-left">
                                {current_question.question_text}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {current_question.options.map((opt: any) => (
                                    <motion.button
                                        key={opt.id}
                                        whileHover={!result ? { y: -5, scale: 1.02 } : {}}
                                        whileTap={!result ? { scale: 0.98 } : {}}
                                        onClick={() => !result && setSelectedOption(opt.id)}
                                        disabled={!!result}
                                        className={`p-6 text-left rounded-3xl border-2 transition-all duration-300 relative group overflow-hidden ${selectedOption === opt.id
                                            ? 'neon-glow-purple bg-purple-600/10 text-white'
                                            : 'border-slate-800 bg-slate-900/50 text-gray-400 hover:border-slate-600'
                                            } ${result ? 'cursor-default' : ''}`}
                                    >
                                        <div className="flex items-center space-x-4 relative z-10">
                                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${selectedOption === opt.id ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-500'
                                                }`}>
                                                {String.fromCharCode(65 + current_question.options.indexOf(opt))}
                                            </span>
                                            <span className="font-bold text-lg md:text-xl">{opt.option_text}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {!result && selectedOption !== null && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="mt-12 w-full py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-blue-500/20 hover:neon-glow-blue transition-all"
                                    >
                                        {isSubmitting ? 'GÖNDERİLİYOR...' : 'CEVABI KİLİTLE'}
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Result Overlay */}
                            <AnimatePresence>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mt-10 p-8 rounded-[2.5rem] ${result.correct ? 'bg-green-600 neon-glow-green' : 'bg-red-600 neon-glow-red'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-6">
                                            <span className="text-6xl">{result.correct ? '🏆' : '💀'}</span>
                                            <div>
                                                <div className="text-3xl font-black italic uppercase tracking-tighter">
                                                    {result.correct ? 'MUHTEŞEM!' : 'HAYIR!'}
                                                </div>
                                                {result.points > 0 && <div className="text-xl font-bold opacity-80">+{result.points} PUAN</div>}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-white font-bold text-lg leading-relaxed">{current_question.explanation}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="lobby"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-12 py-10"
                    >
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">ARENA BEKLEME ODASI</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Savaşçılar toplanıyor... Host bekleniyor.</p>
                        </div>

                        {isHost ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {categories.map((cat: { id: number; name: string }) => (
                                    <motion.div
                                        key={cat.id}
                                        whileHover={{ y: -5 }}
                                        className="arena-card p-6 rounded-[2.5rem] space-y-6 border-b-4 border-purple-500/20"
                                    >
                                        <div className="font-black text-white text-xs uppercase tracking-widest leading-tight">{cat.name}</div>
                                        <div className="space-y-3">
                                            {['easy', 'medium', 'hard'].map(diff => (
                                                <motion.button
                                                    key={diff}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleSelectQuestion(cat.id, diff)}
                                                    className={`w-full py-3 text-[10px] font-black uppercase rounded-xl transition-all border-2 ${diff === 'easy' ? 'text-green-400 border-green-400/20 hover:bg-green-400/5' :
                                                        diff === 'medium' ? 'text-amber-400 border-amber-400/20 hover:bg-amber-400/5' :
                                                            'text-red-400 border-red-400/20 hover:bg-red-400/5'
                                                        }`}
                                                >
                                                    {diff}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="inline-block p-10 arena-card rounded-full border-4 border-blue-500/20"
                            >
                                <div className="text-6xl animate-bounce">⚔️</div>
                                <div className="text-blue-400 font-black text-sm mt-4 tracking-widest">HOST SEÇİM YAPIYOR...</div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
