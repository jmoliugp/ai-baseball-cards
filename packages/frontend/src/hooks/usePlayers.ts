import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { PaginatedPlayersResponse } from '@/types/player'

export function usePlayers(
  sortBy?: 'hits' | 'homeRuns' | 'average' | 'atBats' | 'runs' | 'rbi',
  order: 'asc' | 'desc' = 'desc',
  page: number = 1,
  limit: number = 20,
) {
  return useQuery({
    queryKey: ['players', sortBy, order, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (sortBy) params.append('sortBy', sortBy)
      if (order) params.append('order', order)
      params.append('page', page.toString())
      params.append('limit', limit.toString())

      const { data } = await api.get<PaginatedPlayersResponse>(`/api/players?${params.toString()}`)
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
  })
}


