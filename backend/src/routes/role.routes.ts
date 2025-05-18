import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/role.dtos";
import { roleController } from "../controllers/role.coontroller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function roleRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("AddRoleSchema"),
        tags: ["Roles"],
      },
    },
    roleController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("RemoveRoleSchema"),
        tags: ["Roles"],
      },
    },
    roleController.remove
  );
  server.get(
    "/:roleId",
    {
      schema: {
        params: $ref("RoleParamsSchema"),
        tags: ["Roles"],
      },
    },
    roleController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Roles"],
      },
    },
    roleController.getAll
  );
}
