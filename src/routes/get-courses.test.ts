import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { expect, test } from 'vitest'
import { app } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get courses', async () => {
  await app.ready()

  const titleId = randomUUID()

  const course = await makeCourse(titleId)

  const response = await request(app.server).get(
    `/courses?search=${course.title}`
  )

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    courses: [
      {
        id: course.id,
        title: course.title,
        enrollments: 0,
      },
    ],
    pagination: {
      hasNext: false,
      hasPrev: false,
      limit: 10,
      page: 1,
      total: 1,
      totalPages: 1,
    },
  })
})
