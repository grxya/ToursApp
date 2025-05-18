import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const AddCustomizedTourSchema = z.object({
  price: z.number().min(0, "Price must be at least 0"),
  duration: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) return date;
      }
      return undefined;
    },
    z.date({ required_error: "Duration is required" })
  ),
  countryId: z.string().uuid("Invalid UUID"),
  baseTourId: z.string().uuid("Invalid UUID"),
  excursionIds: z.array(z.string().uuid()).min(1),
});

export const RemoveCustomizedTourSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});

const CustomizedTourParamsSchema = z.object({
    customizedTourId: z.string().uuid("Invalid UUID"),
});

export type AddCustomizedTourDTO = z.infer<typeof AddCustomizedTourSchema>;
export type RemoveCustomizedTourDTO = z.infer<typeof RemoveCustomizedTourSchema>;
export type CustomizedTourId = z.infer<typeof CustomizedTourParamsSchema>;

export const { schemas: customizedTourSchemas, $ref } = buildJsonSchemas(
  {
    AddCustomizedTourSchema,
    RemoveCustomizedTourSchema,
    CustomizedTourParamsSchema,
  },
  { $id: "customizedTour" }
);
