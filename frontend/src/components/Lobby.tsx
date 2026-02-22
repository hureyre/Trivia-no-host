'use client';

import { useState } from 'react';

interface LobbyProps {
    onJoin: (roomCode: string, playerName: string) => void;
    onCreate: (playerName: string) => void;
}

export default function Lobby({ onJoin, onCreate }: LobbyProps) {
    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Bilgi Yarışması</h1>

            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Takma adınızı girin..."
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="pt-4 space-y-3">
                        <button
                            onClick={() => onCreate(playerName)}
                            disabled={!playerName}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                        >
                            Yeni Oda Oluştur
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Veya</span></div>
                        </div>

                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="ODA KODU"
                                className="w-1/3 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center font-mono placeholder:font-sans"
                            />
                            <button
                                onClick={() => onJoin(roomCode, playerName)}
                                disabled={!playerName || !roomCode}
                                className="flex-1 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 transition-colors"
                            >
                                Odaya Katıl
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
