import {
  AddCartItemDTO,
  RemoveCartItemDTO,
  UpdateCartItemQuantityDTO,
} from "../dtos/cartItem.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const cartItemService = {
  async add(userId: string, data: AddCartItemDTO) {
    const { quantity, tourId, customizedTourId, excursionId } = data;

    const count = [tourId, customizedTourId, excursionId].filter(
      Boolean
    ).length;
    if (count != 1) {
      throw new AppError(
        "You must provide exactly one of: tour, customizedTour, or excursion.",
        400
      );
    }

    const existing = await prisma.cartItem.findFirst({
      where: { userId, tourId, customizedTourId, excursionId },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity ?? 1) },
      });

      return {
        status: 200,
        body: { message: "Item updated successfully." },
      };
    }

    await prisma.cartItem.create({
      data: {
        quantity: quantity ?? 1,
        userId,
        tourId,
        customizedTourId,
        excursionId,
      },
    });

    return {
      status: 201,
      body: { message: "Item added to cart successfully." },
    };
  },

  async remove(userId: string, data: RemoveCartItemDTO) {
    const { id } = data;

    const existing = await prisma.cartItem.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("CartItem not found.", 404);
    }

    if (userId != existing.userId) {
      throw new AppError(
        "Access denied: you are not the owner of this cart.",
        403
      );
    }

    await prisma.cartItem.delete({ where: { id } });

    return {
      status: 200,
      body: { message: "Item removed from cart successfully." },
    };
  },

  async getByUser(userId: string) {
    const cartItem = await prisma.cartItem.findMany({
      where: { userId },
    });

    return { status: 201, body: { cartItem } };
  },

  async increaseQuantity(userId: string, data: UpdateCartItemQuantityDTO) {
    const { id } = data;

    const existing = await prisma.cartItem.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("CartItem not found.", 404);
    }

    if (userId != existing.userId) {
      throw new AppError(
        "Access denied: you are not the owner of this cart.",
        403
      );
    }

    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });

    return {
      status: 200,
      body: { message: "Item updated successfully." },
    };
  },

  async decreaseQuantity(userId: string, data: UpdateCartItemQuantityDTO) {
    const { id } = data;

    const existing = await prisma.cartItem.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("CartItem not found.", 404);
    }

    if (userId != existing.userId) {
      throw new AppError(
        "Access denied: you are not the owner of this cart.",
        403
      );
    }

    if (existing.quantity <= 1) {
      await prisma.cartItem.delete({ where: { id } });

      return {
        status: 200,
        body: { message: "Item removed from cart successfully." },
      };
    }

    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity - 1 },
    });

    return {
      status: 200,
      body: { message: "Item updated successfully." },
    };
  },
};
