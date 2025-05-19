import { FastifyReply, FastifyRequest } from "fastify";
import { AddExcursionDTO, RemoveExcursionDTO, ExcursionId, ExcursionCountryId } from "../dtos/excursion.dtos";
import { excursionService } from "../services/excursion.service";

export const excursionController = {
    async add(
      request: FastifyRequest<{
        Body: AddExcursionDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await excursionService.add(data);
      return reply.status(result.status).send(result.body);
    },
  
    async remove(
      request: FastifyRequest<{
        Body: RemoveExcursionDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await excursionService.remove(data);
      return reply.status(result.status).send(result.body);
    },
  
    async getById(
      request: FastifyRequest<{
        Params: ExcursionId;
      }>,
      reply: FastifyReply
    ) {
      const data = request.params;
      const result = await excursionService.getById(data);
      return reply.status(result.status).send(result.body);
    },

    async getAll(request: FastifyRequest, reply: FastifyReply) {
      const result = await excursionService.getAll();
      return reply.status(result.status).send(result.body);
    },

      async getByCountry(
        request: FastifyRequest<{
          Params: ExcursionCountryId;
        }>,
        reply: FastifyReply
      ) {
        const data = request.params;
        const result = await excursionService.getByCountry(data);
        return reply.status(result.status).send(result.body);
      },
  };