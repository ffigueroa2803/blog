import * as z from "zod";

export const FormLoginSchema = z.object({
  email: z.string().email({
    message: "Email es requerido",
  }),
  password: z.string().min(1, {
    message: "Mínimo 8 digitos",
  }),
});

export const FormRegisterUserSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Se requiere el email",
      invalid_type_error: "El email debe ser una cadena.",
    })
    .trim()
    .min(1, { message: "Email es requerido" })
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z.string().min(8, { message: "Mínimo 8 digitos" }),
});

export const FormRegisterPostSchema = z.object({
  title: z.string().min(1, {
    message: "Título es requerido",
  }),
  category: z.string().min(1, { message: "Categoría es requerido" }),
  // image: z.string().min(1, {
  //   message: "Imagen es requerido",
  // }),
});
