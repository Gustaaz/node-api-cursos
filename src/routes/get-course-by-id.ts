import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { courses } from '../database/schema.ts'
import { db } from '../database/client.ts'
import { eq } from 'drizzle-orm'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/courses/:id',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Get course by ID',
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string(),
          }),
          404: z
            .object({
              message: z.string(),
            })
            .describe('Curso não encontrado'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, id))
        .limit(1)

      if (result.length === 0) {
        return reply.status(404).send({ message: 'Course not found' })
      }

      return reply.send(result[0])
    }
  )
}
