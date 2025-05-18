import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddRoleSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
});

export const RemoveRoleSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const RoleParamsSchema = z.object({
  roleId: z.string().uuid("Invalid UUID"),
});

export type AddRoleDTO = z.infer<typeof AddRoleSchema>;
export type RemoveRoleDTO = z.infer<typeof RemoveRoleSchema>;
export type RoleId = z.infer<typeof RoleParamsSchema>;

export const { schemas: roleSchemas, $ref } = buildJsonSchemas(
  {
    AddRoleSchema,
    RemoveRoleSchema,
    RoleParamsSchema,
  },
  { $id: "role" }
);
