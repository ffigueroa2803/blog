import { z } from "zod";

export const createAuthSchema = z.object({
  email: z.string().trim().min(1, { message: "Email es requerido" }),
  password: z.string().trim().min(8, { message: "Mínimo 8 digitos" }),
  username: z.string().trim().min(1, { message: "Username es requerido" }),
});
