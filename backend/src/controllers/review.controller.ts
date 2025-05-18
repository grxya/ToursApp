import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddReviewDTO,
  RemoveReviewDTO,
  ReviewId,
  UserId,
} from "../dtos/review.dtos";
import { reviewService } from "../services/review.service";

export const reviewController = {
  async add(
    request: FastifyRequest<{
      Body: AddReviewDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await reviewService.add(data);
    return reply.status(result.status).send(result.body);
  },

  async remove(
    request: FastifyRequest<{
      Body: RemoveReviewDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await reviewService.remove(data);
    return reply.status(result.status).send(result.body);
  },

  async getById(
    request: FastifyRequest<{
      Params: ReviewId;
    }>,
    reply: FastifyReply
  ) {
    const data = request.params;
    const result = await reviewService.getById(data);
    return reply.status(result.status).send(result.body);
  },

  async getByUserId(
    request: FastifyRequest<{
      Params: UserId;
    }>,
    reply: FastifyReply
  ) {
    const data = request.params;
    const result = await reviewService.getByUserId(data);
    return reply.status(result.status).send(result.body);
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await reviewService.getAll();
    return reply.status(result.status).send(result.body);
  },
};
