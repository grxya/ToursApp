import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddExcursionSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(5, "Description must be at least 5 characters"),

  nameAz: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  descriptionAz: z
    .string()
    .nonempty("Description is required")
    .min(5, "Description must be at least 5 characters"),

  nameRu: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  descriptionRu: z
    .string()
    .nonempty("Description is required")
    .min(5, "Description must be at least 5 characters"),

  nameJa: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  descriptionJa: z
    .string()
    .nonempty("Description is required")
    .min(5, "Description must be at least 5 characters"),

  price: z.number().min(0, "Price must be at least 0"),
  duration: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date({ required_error: "Duration is required" })),
  countryId: z.string().uuid("Invalid UUID"),
});

export const RemoveExcursionSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const ExcursionParamsSchema = z.object({
    excursionId: z.string().uuid("Invalid UUID"),
});

const ExcursionCountryParamsSchema = z.object({
    countryId: z.string().uuid("Invalid UUID"),
  });

export type AddExcursionDTO = z.infer<typeof AddExcursionSchema>;
export type RemoveExcursionDTO = z.infer<typeof RemoveExcursionSchema>;
export type ExcursionId = z.infer<typeof ExcursionParamsSchema>;
export type ExcursionCountryId = z.infer<typeof ExcursionCountryParamsSchema>;


export const { schemas: excursionSchemas, $ref } = buildJsonSchemas(
  {
    AddExcursionSchema,
    RemoveExcursionSchema,
    ExcursionParamsSchema,
    ExcursionCountryParamsSchema
  },
  { $id: "excursion" }
);
