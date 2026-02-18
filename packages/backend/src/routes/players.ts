import type { FastifyInstance } from 'fastify'
import * as playerService from '../services/playerService.js'
import { updatePlayerSchema, queryParamsSchema } from '../schemas/playerSchema.js'
import { playerSwaggerSchemas } from '../schemas/swaggerSchemas.js'

export async function playerRoutes(fastify: FastifyInstance) {
  // List all players with optional sorting
  fastify.get(
    '/api/players',
    {
      schema: {
        description: 'Get all players with optional sorting',
        tags: ['players'],
        querystring: {
          type: 'object',
          properties: {
            sortBy: {
              type: 'string',
              enum: ['hits', 'homeRuns'],
              description: 'Field to sort by',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
              default: 'desc',
            },
          },
        },
        response: {
          200: {
            type: 'array',
            items: playerSwaggerSchemas.player,
          },
          400: playerSwaggerSchemas.error,
          500: playerSwaggerSchemas.error,
        },
      },
    },
    async (request, reply) => {
      try {
        const params = queryParamsSchema.parse(request.query)
        const players = await playerService.getAllPlayers(params.sortBy, params.order)
        return reply.send(players)
      } catch (error) {
        if (error instanceof Error) {
          return reply.code(400).send({
            error: 'ValidationError',
            message: error.message,
          })
        }
        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    }
  )

  // Get player by ID
  fastify.get(
    '/api/players/:id',
    {
      schema: {
        description: 'Get a single player by ID',
        tags: ['players'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Player ID' },
          },
          required: ['id'],
        },
        response: {
          200: playerSwaggerSchemas.player,
          404: playerSwaggerSchemas.error,
          500: playerSwaggerSchemas.error,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      try {
        const player = await playerService.getPlayerById(id)

        if (!player) {
          return reply.code(404).send({
            error: 'NotFound',
            message: 'Player not found',
          })
        }

        return reply.send(player)
      } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    }
  )

  // Update player
  fastify.put(
    '/api/players/:id',
    {
      schema: {
        description: 'Update player data',
        tags: ['players'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Player ID' },
          },
          required: ['id'],
        },
        body: playerSwaggerSchemas.updatePlayer,
        response: {
          200: playerSwaggerSchemas.player,
          400: playerSwaggerSchemas.error,
          404: playerSwaggerSchemas.error,
          500: playerSwaggerSchemas.error,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      try {
        const validatedData = updatePlayerSchema.parse(request.body)
        const updatedPlayer = await playerService.updatePlayer(id, validatedData)

        if (!updatedPlayer) {
          return reply.code(404).send({
            error: 'NotFound',
            message: 'Player not found',
          })
        }

        return reply.send(updatedPlayer)
      } catch (error) {
        if (error instanceof Error) {
          return reply.code(400).send({
            error: 'ValidationError',
            message: error.message,
          })
        }
        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    }
  )

  // Generate AI description (placeholder for now)
  fastify.post(
    '/api/players/:id/description',
    {
      schema: {
        description: 'Generate AI-powered description for a player',
        tags: ['players'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Player ID' },
          },
          required: ['id'],
        },
        response: {
          200: playerSwaggerSchemas.descriptionResponse,
          404: playerSwaggerSchemas.error,
          500: playerSwaggerSchemas.error,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      try {
        const player = await playerService.getPlayerById(id)

        if (!player) {
          return reply.code(404).send({
            error: 'NotFound',
            message: 'Player not found',
          })
        }

        // TODO: Integrate with AI agent in Phase 5
        const mockDescription = `${player.name} is an exceptional player for the ${player.team}. With ${player.hits} hits and ${player.homeRuns} home runs, they maintain an impressive ${player.average.toFixed(3)} batting average.`

        const updated = await playerService.updatePlayerDescription(id, mockDescription)

        return reply.send({
          description: updated?.description,
        })
      } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
