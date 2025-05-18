import { User } from "@prisma/client";
import jwt, { JwtPayload, VerifyOptions, SignOptions } from "jsonwebtoken";
import prisma from "../utils/prisma";
import { randomUUID } from "node:crypto";

const jwtSecret = process.env.JWT_SECRET || "your_secret_key";

export const tokenService = {
  async generateAccessToken(user: User) {
    const role = await prisma.role.findUnique({ where: { id: user.roleId } });

    if (!role) {
      throw new Error("User role not found");
    }

    const jwtIssuer = process.env.JWT_ISSUER;
    const jwtAudience = process.env.JWT_AUDIENCE;

    if (!jwtSecret || !jwtIssuer || !jwtAudience) {
      throw new Error("JWT settings are not properly configured.");
    }

    const claims = {
      name: user.username,
      email: user.email,
      role: role.name,
    };

    const options: SignOptions = {
      expiresIn: "30m",
      issuer: jwtIssuer,
      audience: jwtAudience,
    };

    const token = jwt.sign(claims, jwtSecret, options);

    return token;
  },

  generateRefreshToken() {
    return randomUUID();
  },

  getTokenPayload(token: string, validateLifetime = false): JwtPayload {
    const options: VerifyOptions = {
      algorithms: ["HS256"],
      ignoreExpiration: !validateLifetime,
    };

    try {
      const decoded = jwt.verify(token, jwtSecret, options);

      if (typeof decoded === "string") {
        throw new Error("Invalid token payload: expected object, got string");
      }

      return decoded as JwtPayload;
    } catch (err) {
      throw new Error(
        "Invalid token: " + (err instanceof Error ? err.message : "")
      );
    }
  },
};
