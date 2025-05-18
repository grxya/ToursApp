import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";
import { tokenService } from "./token.service";

export const userService = {
  async getUserByToken(token: string) {
    const payload = tokenService.getTokenPayload(token);
    const username = payload.name;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },
};
