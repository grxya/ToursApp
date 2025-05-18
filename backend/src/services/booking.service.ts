import {
  AddBookingDirectDTO,
  AddBookingFromCartDTO,
  BookingId,
  RemoveBookingDTO,
} from "../dtos/booking.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const bookingService = {
  async addFromCart(userId: string, data: AddBookingFromCartDTO) {
    const { paymentType } = data;

    if (!paymentType) {
      throw new AppError("Missing required fields", 400);
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        tour: true,
        customizedTour: true,
        excursion: true,
      },
    });

    if (cartItems.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    const totalPrice = cartItems.reduce((acc, item) => {
      const price = Number(
        item.tour?.price ??
          item.customizedTour?.price ??
          item.excursion?.price ??
          0
      );
      return acc + price * item.quantity;
    }, 0);

    await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({
        data: {
          userId,
          price: totalPrice,
          paymentType,
          status: "CONFIRMED",
        },
      });

      const bookingItems = await prisma.bookingItem.createMany({
        data: cartItems.map((item) => ({
          quantity: item.quantity,
          price: Number(
            (
              item.tour?.price ??
              item.customizedTour?.price ??
              item.excursion?.price
            )?.toNumber() ?? 0 * item.quantity
          ),
          tourId: item.tourId,
          customizedTourId: item.customizedTourId,
          excursionId: item.excursionId,
          bookingId: booking.id,
        })),
      });
    });

    return { status: 201, body: { message: "Booking added successfully." } };
  },

  async addDirect(userId: string, data: AddBookingDirectDTO) {
    const { quantity, paymentType, tourId, customizedTourId, excursionId } =
      data;

    const count = [tourId, customizedTourId, excursionId].filter(
      Boolean
    ).length;
    if (count != 1) {
      throw new AppError(
        "You must provide exactly one of: tour, customizedTour, or excursion.",
        400
      );
    }

    let product;
    if (tourId) {
      product = await prisma.tour.findUnique({ where: { id: tourId } });
    } else if (customizedTourId) {
      product = await prisma.customizedTour.findUnique({
        where: { id: customizedTourId },
      });
    } else if (excursionId) {
      product = await prisma.excursion.findUnique({
        where: { id: excursionId },
      });
    }

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const totalPrice = Number(product.price) * quantity;

    await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({
        data: {
          userId,
          price: totalPrice,
          paymentType,
          status: "CONFIRMED",
        },
      });

      await prisma.bookingItem.create({
        data: {
          bookingId: booking.id,
          quantity,
          price: Number(product.price) * quantity,
          tourId: tourId ?? null,
          customizedTourId: customizedTourId ?? null,
          excursionId: excursionId ?? null,
        },
      });
    });

    return { status: 201, body: { message: "Booking added successfully." } };
  },

  async remove(userId: string, data: RemoveBookingDTO) {
    const { id } = data;

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Booking not found.", 404);
    }

    if (userId != existing.userId) {
      throw new AppError(
        "Access denied: you are not the owner of this booking.",
        403
      );
    }

    await prisma.booking.delete({ where: { id } });

    return { status: 201, body: { message: "Booking removed successfully." } };
  },

  async getAll() {
    const all = await prisma.booking.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: BookingId) {
    const { bookingId } = data;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new AppError("Booking not found.", 404);
    }

    return { status: 201, body: { booking } };
  },

  async getByUser(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
    });

    return { status: 201, body: { bookings } };
  },
};
