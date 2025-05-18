import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";
import { $ref } from "../dtos/auth.dtos";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function authRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    {
      schema: {
        body: $ref("RegisterSchema"),
        tags: ["Auth"],
      },
    },
    authController.register
  );
  server.post(
    "/login",
    {
      schema: {
        body: $ref("LoginSchema"),
        tags: ["Auth"],
      },
    },
    authController.login
  );
  server.post(
    "/logout",
    {
      preHandler: authorizeRole("User","Admin"),
      schema: {
        tags: ["Auth"],
      },
    },
    authController.logout
  );
}
