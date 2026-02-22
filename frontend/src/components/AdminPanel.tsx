'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { apiCall } from '@/lib/api';

interface AdminPanelProps {
    gameId: number;
    playerToken: string;
    isHost: boolean;
    onReset: () => void;
}

export default function AdminPanel({ gameId, playerToken, isHost, onReset }: AdminPanelProps) {
    if (!isHost) return null;

    const handleReset = async () => {
        if (confirm('Oyunu sıfırlayıp lobiye dönmek istediğinize emin misiniz?')) {
            try {
                await apiCall('reset_game', { game_id: gameId, player_token: playerToken }, 'POST');
                onReset();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/80 border border-amber-500/20 p-4 rounded-3xl flex items-center justify-between backdrop-blur-md"
        >
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-sm">
                    🛠️
                </div>
                <span className="text-amber-500/80 font-black text-xs uppercase tracking-widest">HOST PANELİ</span>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-6 py-2 bg-amber-600/10 border border-amber-600 text-amber-500 text-[10px] font-black uppercase rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-lg shadow-amber-900/20"
            >
                OYUNU SIFIRLA
            </motion.button>
        </motion.div>
    );
}
