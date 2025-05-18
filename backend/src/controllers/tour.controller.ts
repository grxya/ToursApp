import { FastifyReply, FastifyRequest } from "fastify";
import { AddTourDTO, RemoveTourDTO, TourId } from "../dtos/tour.dtos";
import { tourService } from "../services/tour.service";

export const tourController = {
  async add(
    request: FastifyRequest<{
      Body: AddTourDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await tourService.add(data);
    return reply.status(result.status).send(result.body);
  },

  async remove(
    request: FastifyRequest<{
      Body: RemoveTourDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await tourService.remove(data);
    return reply.status(result.status).send(result.body);
  },

  async getById(
    request: FastifyRequest<{
      Params: TourId;
    }>,
    reply: FastifyReply
  ) {
    const data = request.params;
    const result = await tourService.getById(data);
    return reply.status(result.status).send(result.body);
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await tourService.getAll();
    return reply.status(result.status).send(result.body);
  },
};
