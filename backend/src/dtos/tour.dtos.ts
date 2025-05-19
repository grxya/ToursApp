import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddTourSchema = z.object({
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
  excursionIds: z.array(z.string().uuid()).min(1),
});

export const RemoveTourSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const TourParamsSchema = z.object({
  tourId: z.string().uuid("Invalid UUID"),
});

const TourCountryParamsSchema = z.object({
    countryId: z.string().uuid("Invalid UUID"),
  });

export type AddTourDTO = z.infer<typeof AddTourSchema>;
export type RemoveTourDTO = z.infer<typeof RemoveTourSchema>;
export type TourId = z.infer<typeof TourParamsSchema>;
export type TourCountryId = z.infer<typeof TourCountryParamsSchema>;


export const { schemas: tourSchemas, $ref } = buildJsonSchemas(
  {
    AddTourSchema,
    RemoveTourSchema,
    TourParamsSchema,
    TourCountryParamsSchema
  },
  { $id: "tour" }
);
