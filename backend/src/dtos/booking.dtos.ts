import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddBookingFromCartSchema = z.object({
  paymentType: z.enum(["PAID_ONLINE", "PAY_ON_ARRIVAL"]),
});

export const AddBookingDirectSchema = z.object({
  paymentType: z.enum(["PAID_ONLINE", "PAY_ON_ARRIVAL"]),
  quantity: z.number().min(1, "There must be at least 1").max(99, "Too many"),
  tourId: z.string().uuid("Invalid UUID").optional(),
  customizedTourId: z.string().uuid("Invalid UUID").optional(),
  excursionId: z.string().uuid("Invalid UUID").optional(),
});

export const RemoveBookingSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const BookingParamsSchema = z.object({
    bookingId: z.string().uuid("Invalid UUID"),
});

export type AddBookingFromCartDTO = z.infer<typeof AddBookingFromCartSchema>;
export type RemoveBookingDTO = z.infer<typeof RemoveBookingSchema>;
export type AddBookingDirectDTO = z.infer<typeof AddBookingDirectSchema>;
export type BookingId = z.infer<typeof BookingParamsSchema>;

export const { schemas: bookingSchemas, $ref } = buildJsonSchemas(
  {
    AddBookingFromCartSchema,
    AddBookingDirectSchema,
    RemoveBookingSchema,
    BookingParamsSchema,
  },
  { $id: "booking" }
);
