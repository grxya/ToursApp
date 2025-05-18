import { FastifyRequest } from "fastify/types/request";
import { AddRoleDTO, RemoveRoleDTO, RoleId } from "../dtos/role.dtos";
import { FastifyReply } from "fastify/types/reply";
import { roleService } from "../services/role.service";

export const roleController = {
    async add(
      request: FastifyRequest<{
        Body: AddRoleDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await roleService.add(data);
      return reply.status(result.status).send(result.body);
    },
  
    async remove(
      request: FastifyRequest<{
        Body: RemoveRoleDTO;
      }>,
      reply: FastifyReply
    ) {
      const data = request.body;
      const result = await roleService.remove(data);
      return reply.status(result.status).send(result.body);
    },
  
    async getById(
      request: FastifyRequest<{
        Params: RoleId;
      }>,
      reply: FastifyReply
    ) {
      const data = request.params;
      const result = await roleService.getById(data);
      return reply.status(result.status).send(result.body);
    },
  
    async getAll(request: FastifyRequest, reply: FastifyReply) {
      const result = await roleService.getAll();
      return reply.status(result.status).send(result.body);
    },
  };