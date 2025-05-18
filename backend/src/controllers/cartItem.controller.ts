import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddCartItemDTO,
  RemoveCartItemDTO,
  CartItemId,
  UpdateCartItemQuantityDTO,
} from "../dtos/cartItem.dtos";
import { cartItemService } from "../services/cartItem.service";
import { userService } from "../services/user.service";

export const cartItemController = {
  async add(
    request: FastifyRequest<{
      Body: AddCartItemDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await cartItemService.add(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async remove(
    request: FastifyRequest<{
      Body: RemoveCartItemDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await cartItemService.remove(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async getByUser(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await cartItemService.getByUser(user.id);
    return reply.status(result.status).send(result.body);
  },


  async increaseQuantity(
    request: FastifyRequest<{
      Body: UpdateCartItemQuantityDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await cartItemService.increaseQuantity(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async decreaseQuantity(
    request: FastifyRequest<{
      Body: UpdateCartItemQuantityDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await cartItemService.decreaseQuantity(user.id, data);
    return reply.status(result.status).send(result.body);
  },
};
