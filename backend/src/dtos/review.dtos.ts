import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddReviewSchema = z.object({
  bookingId: z
    .string()
    .uuid("Invalid UUID format for bookingId")
    .nonempty("Booking ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .nonempty("Comment is required")
    .min(10, "Comment must be at least 10 characters"),
});

export const RemoveReviewSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const ReviewParamsSchema = z.object({
  reviewId: z.string().uuid("Invalid UUID"),
});

const UserReviewParamsSchema = z.object({
  userId: z.string().uuid("Invalid UUID"),
});

export type AddReviewDTO = z.infer<typeof AddReviewSchema>;
export type RemoveReviewDTO = z.infer<typeof RemoveReviewSchema>;
export type ReviewId = z.infer<typeof ReviewParamsSchema>;
export type UserId = z.infer<typeof UserReviewParamsSchema>;

export const { schemas: reviewSchemas, $ref } = buildJsonSchemas(
  {
    AddReviewSchema,
    RemoveReviewSchema,
    ReviewParamsSchema,
    UserReviewParamsSchema,
  },
  { $id: "review" }
);
