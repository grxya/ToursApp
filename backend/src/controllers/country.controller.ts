import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddCountryDTO,
  CountryId,
  RemoveCountryDTO,
} from "../dtos/country.dtos";
import { authService } from "../services/auth.service";
import { countryService } from "../services/country.service";

export const countryController = {
  async add(
    request: FastifyRequest<{
      Body: AddCountryDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await countryService.add(data);
    return reply.status(result.status).send(result.body);
  },

  async remove(
    request: FastifyRequest<{
      Body: RemoveCountryDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const result = await countryService.remove(data);
    return reply.status(result.status).send(result.body);
  },

  async getById(
    request: FastifyRequest<{
      Params: CountryId;
    }>,
    reply: FastifyReply
  ) {
    const data = request.params;
    const result = await countryService.getById(data);
    return reply.status(result.status).send(result.body);
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await countryService.getAll();
    return reply.status(result.status).send(result.body);
  },
};
