import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, { message: "Nombre de usuario es requerido" }),
  email: z
    .string({
      required_error: "Se requiere el email",
      invalid_type_error: "El email debe ser una cadena.",
    })
    .trim()
    .min(1, { message: "Email es requerido" })
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z.string().trim().min(8, { message: "Mínimo 8 digitos" }),
});
