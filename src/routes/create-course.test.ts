import { fakerPT_BR } from '@faker-js/faker'
import request from 'supertest'
import { expect, test } from 'vitest'
import { app } from '../app.ts'

test('create course', async () => {
  await app.ready()

  const response = await request(app.server)
    .post('/courses')
    .set('Content-type', 'application/json')
    .send({
      title: fakerPT_BR.lorem.words(4),
      description: fakerPT_BR.lorem.words(5),
    })

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({
    courseId: expect.any(String),
  })
})
