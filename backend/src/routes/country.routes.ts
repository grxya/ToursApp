import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/country.dtos";
import { countryController } from "../controllers/country.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function countryRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("AddCountrySchema"),
        tags: ["Countries"],
      },
    },
    countryController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("RemoveCountrySchema"),
        tags: ["Countries"],
      },
    },
    countryController.remove
  );
  server.get(
    "/:countryId",
    {
      schema: {
        params: $ref("CountryParamsSchema"),
        tags: ["Countries"],
      },
    },
    countryController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Countries"],
      },
    },
    countryController.getAll
  );
}
