import { string, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const RegisterSchema = z
  .object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (data) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            data ?? ""
          ),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm);

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const AccessInfoSchema = z.object({
  username: z.string().min(1),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  refreshTokenExpiryTime: z.string().datetime(),
  role: z.string().min(1),
});

export type tokenDTO = {
  accessToken: string,
  refreshToken: string,
};

export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type AccessInfoDTO = z.infer<typeof AccessInfoSchema>;

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    RegisterSchema,
    LoginSchema,
    AccessInfoSchema,
  },
  { $id: "auth" }
);
