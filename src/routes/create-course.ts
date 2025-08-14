import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

const createCourseSchema = {
  tags: ['Courses'],
  summary: 'Create a new course',
  description: 'Create a new course with title and description',
  body: z.object({
    title: z.string().min(1, 'Title is required').describe('Course title'),
    description: z
      .string()
      .min(1, 'Description is required')
      .describe('Course description'),
  }),
  response: {
    201: z
      .object({
        courseId: z.uuid().describe('ID of the created course'),
      })
      .describe('Curso criado com sucesso'),
  },
}

export const createCourseRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.post(
    '/courses',
    {
      schema: createCourseSchema,
    },
    async (request, reply) => {
      const { title, description } = request.body

      const [newCourse] = await db
        .insert(courses)
        .values({ title, description })
        .returning()

      if (!newCourse) {
        throw new Error('Failed to create course')
      }

      return reply.status(201).send({ courseId: newCourse.id })
    }
  )
}
