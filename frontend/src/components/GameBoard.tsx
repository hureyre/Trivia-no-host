'use client';

import { useState, useEffect } from 'react';
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

    const handleSubmit = async () => {
        if (selectedOption === null || !gameState?.current_question) return;
        setIsSubmitting(true);
        try {
            const res = await apiCall('submit_answer', {
                player_id: playerId,
                player_token: playerToken,
                question_id: gameState.current_question.id,
                option_id: selectedOption
            }, 'POST');
            setResult(res as { correct: boolean; points: number });
            // Wait a bit then clear result and question (in a real game, this is managed by turns)
            setTimeout(() => {
                setResult(null);
                setSelectedOption(null);
                setIsSubmitting(false);
            }, 3000);
        } catch (err) {
            alert('Hata!');
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
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="space-y-1">
                    <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Oda Kodu</div>
                    <div className="text-2xl font-mono font-bold text-blue-600">{game.room_code}</div>
                </div>
                <div className="flex items-center space-x-8">
                    {players.map((p: any) => (
                        <div key={p.id} className="text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${p.id === playerId ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                {p.name[0].toUpperCase()}
                            </div>
                            <div className="text-xs font-bold text-gray-700">{p.name}</div>
                            <div className="text-sm font-black text-blue-800">{p.score}</div>
                        </div>
                    ))}
                </div>
            </div>

            {current_question ? (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
                            {current_question.difficulty}
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-10 leading-tight">
                        {current_question.question_text}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {current_question.options.map((opt: any) => (
                            <button
                                key={opt.id}
                                onClick={() => !result && setSelectedOption(opt.id)}
                                disabled={!!result}
                                className={`p-5 text-left rounded-2xl border-2 transition-all duration-200 ${selectedOption === opt.id
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-50'
                                    : 'border-gray-50 bg-gray-50 hover:border-blue-200 hover:bg-white'
                                    } ${result ? 'cursor-default opacity-80' : 'hover:-translate-y-1 shadow-sm'}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-400">
                                        {opt.id}
                                    </span>
                                    <span className="font-semibold">{opt.option_text}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {!result && selectedOption !== null && (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="mt-10 w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Gönderiliyor...' : 'CEVABI ONAYLA'}
                        </button>
                    )}

                    {result && (
                        <div className={`mt-10 p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.correct ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}>
                            <div className="flex items-center space-x-4 mb-3">
                                <span className="text-4xl">{result.correct ? '🎯' : '💡'}</span>
                                <div>
                                    <div className="text-2xl font-black italic uppercase">
                                        {result.correct ? 'Doğru!' : 'Yanlış!'}
                                    </div>
                                    {result.points > 0 && <div className="text-lg font-bold">+{result.points} Puan Kazandın</div>}
                                </div>
                            </div>
                            <p className="text-white/90 font-medium leading-relaxed">{current_question.explanation}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-in fade-in duration-700">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Soru Seç</h3>
                        <p className="text-gray-500">Bir kategori ve zorluk seviyesi belirle</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat: { id: number; name: string }) => (
                            <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                                <div className="font-bold text-gray-700 text-sm">{cat.name}</div>
                                <div className="flex flex-col space-y-2">
                                    {['easy', 'medium', 'hard'].map(diff => (
                                        <button
                                            key={diff}
                                            onClick={() => handleSelectQuestion(cat.id, diff)}
                                            className="py-2 px-3 text-[10px] font-black uppercase rounded-lg bg-gray-50 hover:bg-blue-600 hover:text-white transition-colors border border-gray-100"
                                        >
                                            {diff}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
