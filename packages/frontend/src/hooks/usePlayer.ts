import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Player } from '@/types/player'

export function usePlayer(id: string) {
  return useQuery({
    queryKey: ['player', id],
    queryFn: async () => {
      const { data } = await api.get<Player>(`/api/players/${id}`)
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
