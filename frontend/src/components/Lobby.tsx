'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LobbyProps {
    onJoin: (roomCode: string, playerName: string) => void;
    onCreate: (playerName: string) => void;
}

export default function Lobby({ onJoin, onCreate }: LobbyProps) {
    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center justify-center min-h-[80vh] px-4"
        >
            <div className="text-center mb-12 space-y-2">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-black italic tracking-tighter text-white uppercase"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">ARENA</span>
                    <span className="block text-2xl tracking-[0.3em] font-light mt-[-10px] text-gray-400">TRIVIA NO HOST</span>
                </motion.h1>
            </div>

            <div className="w-full max-w-md arena-card p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                {/* Glow decor */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full group-hover:bg-purple-600/30 transition-colors"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full group-hover:bg-blue-600/30 transition-colors"></div>

                <div className="relative space-y-8">
                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Savaşçı Adın</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Takma adını yaz..."
                            className="w-full bg-slate-900/50 border-2 border-slate-800 px-6 py-4 rounded-2xl text-white placeholder:text-gray-600 focus:neon-glow-purple outline-none transition-all font-bold text-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onCreate(playerName)}
                            disabled={!playerName}
                            className="w-full py-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-900/40 hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            ARENA OLUŞTUR
                        </motion.button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-[1px] flex-1 bg-slate-800"></div>
                            <span className="text-[10px] font-black tracking-widest text-gray-600 uppercase">Veya</span>
                            <div className="h-[1px] flex-1 bg-slate-800"></div>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="KOD"
                                maxLength={4}
                                className="w-24 bg-slate-900/50 border-2 border-slate-800 px-2 py-4 rounded-2xl text-white text-center font-black text-xl tracking-widest placeholder:text-gray-700 focus:neon-glow-blue outline-none transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onJoin(roomCode, playerName)}
                                disabled={!playerName || !roomCode}
                                className="flex-1 py-4 border-2 border-slate-800 hover:border-blue-500 text-blue-400 font-black uppercase tracking-wider rounded-2xl transition-all hover:bg-blue-500/5"
                            >
                                KATIL
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-xs font-bold text-gray-500 uppercase tracking-widest opacity-50">v2.0 Arena Edition</p>
        </motion.div>
    );
}
