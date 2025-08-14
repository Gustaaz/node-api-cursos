import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { asc, ilike } from 'drizzle-orm'
import type { GetCoursesQuery, GetCoursesResponse } from '../types/index.ts'

export const getCoursesRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get<{
    Querystring: GetCoursesQuery
    Reply: GetCoursesResponse
  }>(
    '/courses',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Get all courses',
        description: 'Retrieve courses with optional search and ordering',
        querystring: z.object({
          search: z
            .string()
            .optional()
            .describe('Search term for course titles'),
          orderBy: z
            .enum(['title', 'id'])
            .optional()
            .default('id')
            .describe('Field to order results by'),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid().describe('Unique course identifier'),
                title: z.string().describe('Course title'),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy = 'id' } = request.query

      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses)
        .orderBy(asc(courses[orderBy]))
        .where(search ? ilike(courses.title, `%${search}%`) : undefined)

      return reply.send({ courses: result })
    }
  )
}
