import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/review.dtos";
import { reviewController } from "../controllers/review.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function reviewRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("AddReviewSchema"),
        tags: ["Reviews"],
      },
    },
    reviewController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("RemoveReviewSchema"),
        tags: ["Reviews"],
      },
    },
    reviewController.remove
  );
  server.get(
    "/:reviewId",
    {
      schema: {
        params: $ref("ReviewParamsSchema"),
        tags: ["Reviews"],
      },
    },
    reviewController.getById
  );
  server.get(
    "/all/:userId",
    {
      schema: {
        params: $ref("UserReviewParamsSchema"),
        tags: ["Reviews"],
      },
    },
    reviewController.getByUserId
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Reviews"],
      },
    },
    reviewController.getAll
  );
}
