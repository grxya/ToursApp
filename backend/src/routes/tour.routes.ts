import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/tour.dtos";
import { tourController } from "../controllers/tour.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function tourRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("AddTourSchema"),
        tags: ["Tours"],
      },
    },
    tourController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("Admin"),
      schema: {
        body: $ref("RemoveTourSchema"),
        tags: ["Tours"],
      },
    },
    tourController.remove
  );
  server.get(
    "/:tourId",
    {
      schema: {
        params: $ref("TourParamsSchema"),
        tags: ["Tours"],
      },
    },
    tourController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Tours"],
      },
    },
    tourController.getAll
  );
  server.get(
    "/all/:countryId",
    {
      schema: {
        params: $ref("TourCountryParamsSchema"),
        tags: ["Tours"],
      },
    },
    tourController.getByCountry
  );
}
