import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddCountrySchema = z.object({
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

  currency: z
    .string()
    .nonempty("Currency is required")
    .min(1, "Currency must be at least 1 character"),
});

export const RemoveCountrySchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const CountryParamsSchema = z.object({
  countryId: z.string().uuid("Invalid UUID"),
});

export type AddCountryDTO = z.infer<typeof AddCountrySchema>;
export type RemoveCountryDTO = z.infer<typeof RemoveCountrySchema>;
export type CountryId = z.infer<typeof CountryParamsSchema>;

export const { schemas: countrySchemas, $ref } = buildJsonSchemas(
  {
    AddCountrySchema,
    RemoveCountrySchema,
    CountryParamsSchema,
  },
  { $id: "country" }
);
