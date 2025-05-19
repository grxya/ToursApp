import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/excursion.dtos";
import { excursionController } from "../controllers/excursion.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function excursionRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("AddExcursionSchema"),
        tags: ["Excursions"],
      },
    },
    excursionController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("RemoveExcursionSchema"),
        tags: ["Excursions"],
      },
    },
    excursionController.remove
  );
  server.get(
    "/:excursionId",
    {
      schema: {
        params: $ref("ExcursionParamsSchema"),
        tags: ["Excursions"],
      },
    },
    excursionController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Excursions"],
      },
    },
    excursionController.getAll
  );

    server.get(
      "/all/:countryId",
      {
        schema: {
          params: $ref("ExcursionCountryParamsSchema"),
          tags: ["Excursions"],
        },
      },
      excursionController.getByCountry
    );
}
