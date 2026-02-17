import { mockPlayers } from '@/lib/mockData'

export function usePlayer(id: string) {
  const player = mockPlayers.find((p) => p.id === id)

  return {
    data: player || null,
    isLoading: false,
    error: player ? null : new Error('Player not found'),
  }
}
