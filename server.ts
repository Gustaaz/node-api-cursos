import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import scalarAPIReference from "@scalar/fastify-api-reference";

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
}).withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Course API",
      description: "API for managing courses",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform
});

server.register(scalarAPIReference, {
  routePrefix: "/docs",
});

server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute);

server
  .listen({ port: 3000 })
  .then(() => {
    console.log("Server is running on http://localhost:3000");
    console.log("Swagger UI is available at http://localhost:3000/docs");
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
