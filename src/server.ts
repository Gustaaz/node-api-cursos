import { app } from './app.ts'

const server = app

server
  .listen({ port: 3000 })
  .then(() => {
    console.log('Server is running on http://localhost:3000')
    console.log('Swagger UI is available at http://localhost:3000/docs')
  })
  .catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
