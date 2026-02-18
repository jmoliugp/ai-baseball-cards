import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Player } from '@/types/player'

export function usePlayers(sortBy?: 'hits' | 'homeRuns', order: 'asc' | 'desc' = 'desc') {
  return useQuery({
    queryKey: ['players', sortBy, order],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (sortBy) params.append('sortBy', sortBy)
      if (order) params.append('order', order)

      const { data } = await api.get<Player[]>(`/api/players?${params.toString()}`)
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
