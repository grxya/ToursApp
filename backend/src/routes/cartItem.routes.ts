import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/cartItem.dtos";
import { cartItemController } from "../controllers/cartItem.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function cartItemRoutes(server: FastifyInstance) {
  server.post(
    "/add",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("AddCartItemSchema"),
        tags: ["CartItems"],
      },
    },
    cartItemController.add
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("RemoveCartItemSchema"),
        tags: ["CartItems"],
      },
    },
    cartItemController.remove
  );
  server.get(
    "/",
    {
      preHandler: authorizeRole("User"),
      schema: {
        tags: ["CartItems"],
      },
    },
    cartItemController.getByUser
  );

  server.put(
    "/increase",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("UpdateCartItemQuantitySchema"),
        tags: ["CartItems"],
      },
    },
    cartItemController.increaseQuantity
  );

  server.put(
    "/decrease",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("UpdateCartItemQuantitySchema"),
        tags: ["CartItems"],
      },
    },
    cartItemController.decreaseQuantity
  );
}
