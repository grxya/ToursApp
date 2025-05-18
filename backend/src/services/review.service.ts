import { AddReviewDTO, ReviewId, RemoveReviewDTO, UserId } from "../dtos/review.dtos";
import AppError from "../utils/extensions/appError";
import prisma from "../utils/prisma";

export const reviewService = {
  async add(data: AddReviewDTO) {
    const { bookingId, rating, comment } = data;
    const userId = "";

    const existing = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!existing) {
      throw new AppError("Booking not found.", 404);
    }

    await prisma.review.create({
      data: {
        bookingId,
        rating,
        comment,
        userId,
      },
    });

    return { status: 201, body: { message: "Review added successfully." } };
  },

  async remove(data: RemoveReviewDTO) {
    const { id } = data;

    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Review not found.", 404);
    }

    await prisma.review.delete({ where: { id } });

    return { status: 201, body: { message: "Review removed successfully." } };
  },

  async getAll() {
    const all = await prisma.review.findMany();
    return { status: 201, body: { all } };
  },

  async getById(data: ReviewId) {
    const { reviewId } = data;

    const Review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!Review) {
      throw new AppError("Review not found.", 404);
    }

    return { status: 201, body: { Review } };
  },

  async getByUserId(data: UserId) {
    const { userId } = data;

    const reviews = await prisma.review.findMany({
      where: { userId },
    });

    if (!reviews) {
      throw new AppError("Review not found.", 404);
    }

    return { status: 201, body: { reviews } };
  },
};
