import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/customizedTour.dtos";
import { customizedTourController } from "../controllers/customizedTour.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function customizedTourRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("AddCustomizedTourSchema"),
        tags: ["CustomizedTours"],
      },
    },
    customizedTourController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("RemoveCustomizedTourSchema"),
        tags: ["CustomizedTours"],
      },
    },
    customizedTourController.remove
  );
  server.get(
    "/:customizedTourId",
    {
      schema: {
        params: $ref("CustomizedTourParamsSchema"),
        tags: ["CustomizedTours"],
      },
    },
    customizedTourController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["CustomizedTours"],
      },
    },
    customizedTourController.getAll
  );
}
