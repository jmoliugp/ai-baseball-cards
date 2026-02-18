export interface Player {
  id: string
  name: string
  team: string
  position?: string | null
  hits: number
  homeRuns: number
  average: number
  atBats?: number | null
  runs?: number | null
  rbi?: number | null
  description?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedPlayersResponse {
  data: Player[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

