import { and, asc, count, ilike, type SQL } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

const getCoursesSchema = {
  tags: ['Courses'],
  summary: 'Get all courses',
  description: 'Retrieve courses with optional search and ordering',
  querystring: z.object({
    search: z.string().optional().describe('Search term for course titles'),
    orderBy: z
      .enum(['title', 'id'])
      .optional()
      .default('id')
      .describe('Field to order results by'),
    page: z.number().min(1).default(1).describe('Page number (starts from 1)'),
    limit: z
      .number()
      .min(1)
      .max(100)
      .default(10)
      .describe('Items per page (max 100)'),
  }),
  response: {
    200: z.object({
      courses: z.array(
        z.object({
          id: z.uuid().describe('Unique course identifier'),
          title: z.string().describe('Course title'),
        })
      ),
      pagination: z.object({
        page: z.number().describe('Current page'),
        limit: z.number().describe('Items per page'),
        total: z.number().describe('Total number of courses'),
        totalPages: z.number().describe('Total number of pages'),
        hasNext: z.boolean().describe('Has next page'),
        hasPrev: z.boolean().describe('Has previous page'),
      }),
    }),
  },
}

const calculatePagination = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
  hasNext: page < Math.ceil(total / limit),
  hasPrev: page > 1,
})

export const getCoursesRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/courses',
    {
      schema: getCoursesSchema,
    },
    async (request, reply) => {
      const { search, orderBy = 'id', page = 1, limit = 10 } = request.query
      const conditions: SQL[] = []

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`))
      }

      const result = await db.transaction(async tx => {
        const [coursesResult, totalCountResult] = await Promise.all([
          tx
            .select({
              id: courses.id,
              title: courses.title,
            })
            .from(courses)
            .where(and(...conditions))
            .orderBy(asc(courses[orderBy]))
            .limit(limit)
            .offset((page - 1) * limit),

          tx
            .select({ count: count() })
            .from(courses)
            .where(and(...conditions)),
        ])

        const total = totalCountResult[0]?.count || 0

        return {
          courses: coursesResult,
          pagination: calculatePagination(page, limit, total),
        }
      })

      return reply.send(result)
    }
  )
}
