export interface Player {
  id: string
  externalId?: string
  name: string
  team: string
  position?: string
  hits: number
  homeRuns: number
  average: number
  atBats?: number
  runs?: number
  rbi?: number
  description?: string
  createdAt?: Date
  updatedAt?: Date
}
