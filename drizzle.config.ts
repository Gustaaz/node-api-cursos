import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials:{
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/minha_base',
  },
  out:'./drizzle',
  schema: './src/database/schema.ts',
})