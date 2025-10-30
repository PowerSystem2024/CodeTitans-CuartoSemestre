import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es obligatorio",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" }),
  description: z
    .string({
      required_error: "La descripción es obligatoria",
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .min(0, { message: "La descripción debe tener al menos 1 caracter" })
    .max(255, {
      message: "La descripción no puede exceder los 255 caracteres",
    })
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es obligatorio",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" })
    .optional(),
  description: z
    .string({
      required_error: "La descripción es obligatoria",
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .min(0, { message: "La descripción debe tener al menos 1 caracter" })
    .max(255, {
      message: "La descripción no puede exceder los 255 caracteres",
    })
    .optional(),
});
