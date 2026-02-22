'use client';

import React from 'react';
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
                alert('Sıfırlama hatası!');
            }
        }
    };

    return (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
                <span>🛠️ Host Paneli</span>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-amber-600 text-white text-xs font-black uppercase rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
                >
                    OYUNU SIFIRLA
                </button>
            </div>
        </div>
    );
}
