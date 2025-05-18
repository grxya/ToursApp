import { tokenService } from "../services/token.service";
import { config } from "dotenv";
import prisma from "../utils/prisma";
import {
  AccessInfoDTO,
  LoginDTO,
  RegisterDTO,
  tokenDTO,
} from "../dtos/auth.dtos";
import AppError from "../utils/extensions/appError";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

config();

export const authService = {
  async register(data: RegisterDTO) {
    const { email, password, username } = data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new AppError("Email is already taken", 400);
      }
      if (existingUser.username === username) {
        throw new AppError("Username is already taken", 400);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await prisma.role.findFirstOrThrow({
      where: { name: "User" },
    });

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        roleId: role.id,
      },
    });

    return { status: 201, body: { message: "User registered" } };
  },

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError("Invalid credentials", 400);
    }

    var secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError("Internal server error", 500);
    }


    const refreshToken = tokenService.generateRefreshToken();
    const refreshTokenExpiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    console.log(
      await tokenService.generateAccessToken(user)
    );

    const accessInfo: AccessInfoDTO = {
      username: user.username,
      role: (
        await prisma.role.findUniqueOrThrow({ where: { id: user.roleId } })
      ).name,
      accessToken: await tokenService.generateAccessToken(user),
      refreshToken,
      refreshTokenExpiryTime: refreshTokenExpiryTime.toISOString(),
    };

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        refreshTokenExpiryTime,
      },
    });

    return { status: 200, body: accessInfo };
  },

  async logout(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
        refreshTokenExpiryTime: null,
      },
    });

    return { status: 201, body: { message: "Logged out successfully" } };
  },

  async refreshToken(tokenDTO: tokenDTO) {
    const { accessToken, refreshToken } = tokenDTO;

    if (!accessToken || !refreshToken) {
      throw new AppError("Missing access or refresh token", 400);
    }

    let payload: JwtPayload;
    try {
      payload = tokenService.getTokenPayload(accessToken); 
    } catch {
      throw new AppError("Invalid access token", 401);
    }

    const username = payload.name;
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (
      !user ||
      user.refreshToken !== refreshToken ||
      !user.refreshTokenExpiryTime ||
      user.refreshTokenExpiryTime <= new Date()
    ) {
      throw new AppError("Invalid refresh attempt", 401);
    }

    const newRefreshToken = tokenService.generateRefreshToken();
    const refreshTokenExpiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const accessInfo: AccessInfoDTO = {
      username: user.username,
      role: (
        await prisma.role.findUniqueOrThrow({ where: { id: user.roleId } })
      ).name,
      accessToken: await tokenService.generateAccessToken(user),
      refreshToken: newRefreshToken,
      refreshTokenExpiryTime: refreshTokenExpiryTime.toISOString(),
    };

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: newRefreshToken,
        refreshTokenExpiryTime,
      },
    });

    return { status: 200, body: accessInfo };
  },
};
