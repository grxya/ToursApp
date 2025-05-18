import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../utils/extensions/appError";

export const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof AppError) {
    return reply.status(error.status).send({ message: error.message });
  }

  return reply
    .status(500)
    .send({ message: "An unexpected server error occurred." });
};
