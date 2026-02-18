import { z } from 'zod'

export const playerSchema = z.object({
  id: z.string(),
  externalId: z.string().optional(),
  name: z.string(),
  team: z.string(),
  position: z.string().optional(),
  hits: z.number().int().nonnegative(),
  homeRuns: z.number().int().nonnegative(),
  average: z.number().min(0).max(1),
  atBats: z.number().int().nonnegative().optional(),
  runs: z.number().int().nonnegative().optional(),
  rbi: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  rawData: z.any().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const updatePlayerSchema = z.object({
  name: z.string().optional(),
  team: z.string().optional(),
  position: z.string().optional(),
  hits: z.number().int().nonnegative().optional(),
  homeRuns: z.number().int().nonnegative().optional(),
  average: z.number().min(0).max(1).optional(),
  atBats: z.number().int().nonnegative().optional(),
  runs: z.number().int().nonnegative().optional(),
  rbi: z.number().int().nonnegative().optional(),
})

export const queryParamsSchema = z.object({
  sortBy: z.enum(['hits', 'homeRuns', 'average', 'atBats', 'runs', 'rbi']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
})

export type Player = z.infer<typeof playerSchema>
export type UpdatePlayer = z.infer<typeof updatePlayerSchema>
export type QueryParams = z.infer<typeof queryParamsSchema>
