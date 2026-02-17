import { useState } from 'react'
import { mockPlayers } from '@/lib/mockData'
import type { Player } from '@/types/player'

export function usePlayers(sortBy?: 'hits' | 'homeRuns', order: 'asc' | 'desc' = 'desc') {
  const [players] = useState<Player[]>(() => {
    const sorted = [...mockPlayers]

    if (sortBy) {
      sorted.sort((a, b) => {
        const aValue = sortBy === 'hits' ? a.hits : a.homeRuns
        const bValue = sortBy === 'hits' ? b.hits : b.homeRuns
        return order === 'asc' ? aValue - bValue : bValue - aValue
      })
    }

    return sorted
  })

  return {
    data: players,
    isLoading: false,
    error: null,
  }
}
