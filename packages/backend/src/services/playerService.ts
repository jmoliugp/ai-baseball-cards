import type { Player, UpdatePlayer } from '../schemas/playerSchema.js'

// Mock data for initial development
const mockPlayers: Player[] = [
  {
    id: '1',
    externalId: 'player-1',
    name: 'Mike Trout',
    team: 'Los Angeles Angels',
    position: 'CF',
    hits: 185,
    homeRuns: 40,
    average: 0.305,
    atBats: 606,
    runs: 110,
    rbi: 104,
    description: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    externalId: 'player-2',
    name: 'Aaron Judge',
    team: 'New York Yankees',
    position: 'RF',
    hits: 177,
    homeRuns: 62,
    average: 0.311,
    atBats: 569,
    runs: 133,
    rbi: 131,
    description: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    externalId: 'player-3',
    name: 'Mookie Betts',
    team: 'Los Angeles Dodgers',
    position: 'RF',
    hits: 175,
    homeRuns: 35,
    average: 0.289,
    atBats: 606,
    runs: 117,
    rbi: 82,
    description: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    externalId: 'player-4',
    name: 'Ronald Acuña Jr.',
    team: 'Atlanta Braves',
    position: 'RF',
    hits: 217,
    homeRuns: 41,
    average: 0.337,
    atBats: 644,
    runs: 149,
    rbi: 106,
    description: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    externalId: 'player-5',
    name: 'Shohei Ohtani',
    team: 'Los Angeles Angels',
    position: 'DH',
    hits: 174,
    homeRuns: 44,
    average: 0.304,
    atBats: 572,
    runs: 102,
    rbi: 95,
    description: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export class PlayerService {
  async getAllPlayers(sortBy?: 'hits' | 'homeRuns', order: 'asc' | 'desc' = 'desc') {
    let players = [...mockPlayers]

    if (sortBy) {
      players.sort((a, b) => {
        const aValue = sortBy === 'hits' ? a.hits : a.homeRuns
        const bValue = sortBy === 'hits' ? b.hits : b.homeRuns
        return order === 'asc' ? aValue - bValue : bValue - aValue
      })
    }

    return players
  }

  async getPlayerById(id: string) {
    const player = mockPlayers.find((p) => p.id === id)
    return player || null
  }

  async updatePlayer(id: string, data: UpdatePlayer) {
    const index = mockPlayers.findIndex((p) => p.id === id)

    if (index === -1) {
      return null
    }

    mockPlayers[index] = {
      ...mockPlayers[index],
      ...data,
      updatedAt: new Date(),
    }

    return mockPlayers[index]
  }

  async updatePlayerDescription(id: string, description: string) {
    return this.updatePlayer(id, { description })
  }
}
