import { FastifyReply, FastifyRequest } from "fastify";
import { AddCustomizedTourDTO, RemoveCustomizedTourDTO, CustomizedTourId } from "../dtos/customizedTour.dtos";
import { customizedTourService } from "../services/customizedTour.service";

export const customizedTourController = {
    async add(
      request: FastifyRequest<{
        Body: AddCustomizedTourDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await customizedTourService.add(data);
      return reply.status(result.status).send(result.body);
    },
  
    async remove(
      request: FastifyRequest<{
        Body: RemoveCustomizedTourDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await customizedTourService.remove(data);
      return reply.status(result.status).send(result.body);
    },
  
    async getById(
      request: FastifyRequest<{
        Params: CustomizedTourId;
      }>,
      reply: FastifyReply
    ) {
      const data = request.params;
      const result = await customizedTourService.getById(data);
      return reply.status(result.status).send(result.body);
    },

    async getAll(request: FastifyRequest, reply: FastifyReply) {
      const result = await customizedTourService.getAll();
      return reply.status(result.status).send(result.body);
    },
  };