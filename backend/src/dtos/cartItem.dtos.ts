import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddCartItemSchema = z.object({
  quantity: z
    .number()
    .min(1, "There must be at least 1")
    .max(99, "Too many"),

  tourId: z.string().uuid("Invalid UUID").optional(),
  customizedTourId: z.string().uuid("Invalid UUID").optional(),
  excursionId: z.string().uuid("Invalid UUID").optional(),
});

export const RemoveCartItemSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const UpdateCartItemQuantitySchema = z.object({
    id: z.string().uuid("Invalid UUID"),
  });

const CartItemParamsSchema = z.object({
    cartItemId: z.string().uuid("Invalid UUID"),
});

export type AddCartItemDTO = z.infer<typeof AddCartItemSchema>;
export type RemoveCartItemDTO = z.infer<typeof RemoveCartItemSchema>;
export type UpdateCartItemQuantityDTO = z.infer<typeof UpdateCartItemQuantitySchema>;
export type CartItemId = z.infer<typeof CartItemParamsSchema>;

export const { schemas: cartItemSchemas, $ref } = buildJsonSchemas(
  {
    AddCartItemSchema,
    RemoveCartItemSchema,
    UpdateCartItemQuantitySchema,
    CartItemParamsSchema,
  },
  { $id: "cartItem" }
);
