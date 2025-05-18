import { FastifyRequest, FastifyReply, RouteGenericInterface } from "fastify";
import fp from "fastify-plugin";
import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenService } from "../services/token.service";
import { authService } from "../services/auth.service";
import AppError from "../utils/extensions/appError";
const jwtSecret = process.env.JWT_SECRET || "your_secret_key";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    if (!accessToken) {
      return;
    }

    try {
      tokenService.getTokenPayload(accessToken, true);
      return;
    } catch (err) {
      if (!refreshToken) {
        return;
      }
    }

    const tokenDTO = { accessToken, refreshToken };
    const accessInfo = await authService.refreshToken(tokenDTO);

    reply
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
      });
  } catch (err) {
    if (err instanceof AppError) {
      reply.clearCookie("accessToken");
      reply.clearCookie("refreshToken");
    }
  }
}


export function authorizeRole<T extends RouteGenericInterface = RouteGenericInterface>(...allowedRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.accessToken;
    if (!token) {
      return reply.status(401).send({ error: "No access token" });
    }

    try {
      const payload = tokenService.getTokenPayload(token, true);
      if (!allowedRoles.includes(payload.role)) {
        return reply.status(403).send({ error: "Forbidden: insufficient role" });
      }
    } catch (err) {
      return reply.status(401).send({ error: "Invalid or expired token" });
    }
  };
}
