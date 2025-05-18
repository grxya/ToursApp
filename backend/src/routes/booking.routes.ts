import { FastifyInstance } from "fastify/types/instance";
import { $ref } from "../dtos/booking.dtos";
import { bookingController } from "../controllers/booking.controller";
import { authorizeRole } from "../middlewares/jwt.middleware";

export async function bookingRoutes(server: FastifyInstance) {
  server.post(
    "/addFromCart",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("AddBookingFromCartSchema"),
        tags: ["Bookings"],
      },
    },
    bookingController.addFromCart
  );
  server.post(
    "/addDirect",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref('AddBookingDirectSchema'),
        tags: ["Bookings"],
      },
    },
    bookingController.addDirect
  );
  server.delete(
    "/remove",
    {
      preHandler: authorizeRole("User"),
      schema: {
        body: $ref("RemoveBookingSchema"),
        tags: ["Bookings"],
      },
    },
    bookingController.remove
  );
  server.get(
    "/:bookingId",
    {
      schema: {
        params: $ref("BookingParamsSchema"),
        tags: ["Bookings"],
      },
    },
    bookingController.getById
  );
  server.get(
    "/all",
    {
      schema: {
        tags: ["Bookings"],
      },
    },
    bookingController.getAll
  );

  server.get(
    "/",
    {
      schema: {
        tags: ["Bookings"],
      },
    },
    bookingController.getByUser
  );


}
