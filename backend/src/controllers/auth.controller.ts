import type { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dtos";
import { userService } from "../services/user.service";

export const authController = {
  async register(
    request: FastifyRequest<{
      Body: RegisterDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const response = await authService.register(data);
    return reply.status(response.status).send(response.body);
  },

  async login(
    request: FastifyRequest<{
      Body: LoginDTO;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;
    const accessInfo = await authService.login(data);

    return reply
      .setCookie("accessToken", accessInfo.body.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      })
      .setCookie("refreshToken", accessInfo.body.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60,
      })
      .status(201)
      .send(accessInfo);
  },

  async logout(request: FastifyRequest, reply: FastifyReply) {

    const token = request.cookies.accessToken;
    const user = await userService.getUserByToken(token);
    await authService.logout(user.id);

    reply
      .clearCookie("accessToken", { path: "/" })
      .clearCookie("refreshToken", { path: "/" })
      .status(200)
      .send({ message: "Logged out successfully" });
  },
};
