import { fakerPT_BR } from '@faker-js/faker'
import { db } from './client.ts'
import { courses, enrollments, users } from './schema.ts'

const seedUsers = [
  { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
  { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
]

const seedCourses = [
  { title: fakerPT_BR.lorem.words(5), description: fakerPT_BR.lorem.words(5) },
  { title: fakerPT_BR.lorem.words(5), description: fakerPT_BR.lorem.words(5) },
  { title: fakerPT_BR.lorem.words(5), description: fakerPT_BR.lorem.words(5) },
]

async function seed() {
  const usesrsInsert = await db.insert(users).values(seedUsers).returning()
  const coursesInsert = await db.insert(courses).values(seedCourses).returning()

  if (
    !coursesInsert[0] ||
    !coursesInsert[1] ||
    !usesrsInsert[0] ||
    !usesrsInsert[1]
  ) {
    throw new Error('Failed to insert seed data')
  }

  await db.insert(enrollments).values([
    { courseId: coursesInsert[0].id, userId: usesrsInsert[0].id },
    { courseId: coursesInsert[0].id, userId: usesrsInsert[1].id },
    { courseId: coursesInsert[1].id, userId: usesrsInsert[0].id },
    { courseId: coursesInsert[1].id, userId: usesrsInsert[1].id },
  ])
}

seed()
