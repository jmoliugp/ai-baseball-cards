import { zodToJsonSchema } from 'zod-to-json-schema'
import { playerSchema, updatePlayerSchema, queryParamsSchema } from './playerSchema.js'

// Convert Zod schemas to JSON Schema for Swagger
// Use $refStrategy: 'none' to avoid reference issues in Fastify
const zodOptions = {
  $refStrategy: 'none' as const,
  target: 'openApi3' as const,
}

export const playerSwaggerSchemas = {
  player: zodToJsonSchema(playerSchema, zodOptions),
  updatePlayer: zodToJsonSchema(updatePlayerSchema, zodOptions),
  queryParams: zodToJsonSchema(queryParamsSchema, zodOptions),
  error: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
    },
    required: ['error', 'message'],
  },
  descriptionResponse: {
    type: 'object',
    properties: {
      description: { type: 'string' },
    },
    required: ['description'],
  },
}
