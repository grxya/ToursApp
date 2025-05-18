import { AddRoleDTO, RoleId, RemoveRoleDTO } from "../dtos/role.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const roleService = {
  async add(data: AddRoleDTO) {
    const { name } = data;

    const existing = await prisma.role.findUnique({
      where: { name },
    });

    if (existing) {
      throw new AppError("Role with this name already exists.", 400);
    }

    await prisma.role.create({
      data: {
        name,
      },
    });

    return { status: 201, body: { message: "Role added successfully." } };
  },

  async remove(data: RemoveRoleDTO) {
    const { id } = data;

    const existing = await prisma.role.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Role not found.", 404);
    }

    await prisma.role.delete({ where: { id } });

    return { status: 201, body: { message: "Role removed successfully." } };
  },

  async getAll() {
    const all = await prisma.role.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: RoleId) {
    const { roleId } = data;

    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new AppError("Role not found.", 404);
    }

    return { status: 201, body: { role } };
  },
};
