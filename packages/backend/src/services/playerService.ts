import { db } from '../utils/db.js'
import type { UpdatePlayer } from '../schemas/playerSchema.js'

export interface PaginatedPlayersResult {
  data: Array<{
    id: string
    name: string
    team: string
    position: string | null
    hits: number
    homeRuns: number
    average: number
    atBats: number | null
    runs: number | null
    rbi: number | null
    description: string | null
    createdAt: Date
    updatedAt: Date
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export async function getAllPlayers(
  sortBy?: 'hits' | 'homeRuns' | 'average' | 'atBats' | 'runs' | 'rbi',
  order: 'asc' | 'desc' = 'desc',
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedPlayersResult> {
  const skip = (page - 1) * limit

  // Get total count
  const total = await db.player.count()

  // Get paginated data
  const data = await db.player.findMany({
    orderBy: sortBy ? { [sortBy]: order } : { hits: 'desc' },
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      team: true,
      position: true,
      hits: true,
      homeRuns: true,
      average: true,
      atBats: true,
      runs: true,
      rbi: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const totalPages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export async function getPlayerById(id: string) {
  return db.player.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      team: true,
      position: true,
      hits: true,
      homeRuns: true,
      average: true,
      atBats: true,
      runs: true,
      rbi: true,
      description: true,
      rawData: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updatePlayer(id: string, data: UpdatePlayer) {
  return db.player.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      team: true,
      position: true,
      hits: true,
      homeRuns: true,
      average: true,
      atBats: true,
      runs: true,
      rbi: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updatePlayerDescription(id: string, description: string) {
  return db.player.update({
    where: { id },
    data: { description },
    select: {
      id: true,
      name: true,
      team: true,
      position: true,
      hits: true,
      homeRuns: true,
      average: true,
      atBats: true,
      runs: true,
      rbi: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

