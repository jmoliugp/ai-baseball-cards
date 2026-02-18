import { db } from '../utils/db.js'
import type { UpdatePlayer } from '../schemas/playerSchema.js'

export async function getAllPlayers(sortBy?: 'hits' | 'homeRuns', order: 'asc' | 'desc' = 'desc') {
  return db.player.findMany({
    orderBy: sortBy ? { [sortBy]: order } : { hits: 'desc' },
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

