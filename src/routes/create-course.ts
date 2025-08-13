import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";

export const createCourseRoute: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        body: z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().min(1, "Description is required"),
        }),
        response: {
          201: z.object({
            courseId: z.uuid(),
          }).describe("Curso criado com sucesso"),
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;

      const result = await db.insert(courses).values({
        title,
        description,
      }).returning();

      return reply.status(201).send({ courseId: result[0].id });
    }
  );
};
