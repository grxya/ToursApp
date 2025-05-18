import { FastifyReply, FastifyRequest } from "fastify";
import {
  RemoveBookingDTO,
  BookingId,
  AddBookingFromCartDTO,
  AddBookingDirectDTO,
} from "../dtos/booking.dtos";
import { bookingService } from "../services/booking.service";
import { userService } from "../services/user.service";

export const bookingController = {
  async addFromCart(
    request: FastifyRequest<{
      Body: AddBookingFromCartDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await bookingService.addFromCart(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async addDirect(
    request: FastifyRequest<{
      Body: AddBookingDirectDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await bookingService.addDirect(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async remove(
    request: FastifyRequest<{
      Body: RemoveBookingDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await bookingService.remove(user.id, data);
    return reply.status(result.status).send(result.body);
  },

  async getById(
    request: FastifyRequest<{
      Params: BookingId;
    }>,
    reply: FastifyReply
  ) {
    const data = request.params;
    const result = await bookingService.getById(data);
    return reply.status(result.status).send(result.body);
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await bookingService.getAll();
    return reply.status(result.status).send(result.body);
  },

  async getByUser(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);

    const result = await bookingService.getByUser(user.id);
    return reply.status(result.status).send(result.body);
  },
};
