'use client';

import { useState } from 'react';
import Lobby from '@/components/Lobby';
import GameBoard from '@/components/GameBoard';
import { apiCall } from '@/lib/api';

export default function Home() {
  const [gameState, setGameState] = useState<'lobby' | 'playing'>('lobby');
  const [userData, setUserData] = useState<{
    gameId: number | null;
    roomCode: string | null;
    playerToken: string | null;
    playerName: string | null;
    playerId: number | null;
  }>({
    gameId: null,
    roomCode: null,
    playerToken: null,
    playerName: null,
    playerId: null
  });

  const handleCreateRoom = async (playerName: string) => {
    try {
      const { room_code } = await apiCall('create_room');
      await handleJoinRoom(room_code, playerName);
    } catch (err) {
      alert('Oda oluşturulurken bir hata oluştu.');
    }
  };

  const handleJoinRoom = async (roomCode: string, playerName: string) => {
    try {
      const response = await apiCall('join_room', { room_code: roomCode, player_name: playerName }, 'POST');
      if (response.error) {
        alert(response.error);
        return;
      }
      setUserData({
        gameId: response.game_id,
        roomCode: roomCode,
        playerToken: response.player_token,
        playerName: response.player_name,
        playerId: response.player_id || null // Add player_id to PHP join_room response
      });
      setGameState('playing');
    } catch (err) {
      alert('Odaya katılırken bir hata oluştu.');
    }
  };

  return (
    <main className="min-h-screen bg-transparent py-4 px-2 md:py-12 md:px-4">
      {gameState === 'lobby' ? (
        <Lobby onCreate={handleCreateRoom} onJoin={handleJoinRoom} />
      ) : (
        <GameBoard
          gameId={userData.gameId!}
          roomCode={userData.roomCode!}
          playerToken={userData.playerToken!}
          playerId={userData.playerId!}
        />
      )}
    </main>
  );
}
