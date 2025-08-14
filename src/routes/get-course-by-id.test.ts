import request from 'supertest'
import { expect, test } from 'vitest'
import { app } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get courses by id', async () => {
  await app.ready()

  const course = await makeCourse()

  const response = await request(app.server).get(`/courses/${course.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    id: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
  })
})
