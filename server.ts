import fastify from "fastify";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    },
  },
})

server.listen({ port: 3000 }).then(() => {
  console.log("Server is running on http://localhost:3000");
}).catch(err => {
  console.error("Error starting server:", err);
  process.exit(1);
});