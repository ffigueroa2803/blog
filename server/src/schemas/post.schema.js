import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Nombre del titulo es requerido" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Nombre del contenido es requerido" }),
});
