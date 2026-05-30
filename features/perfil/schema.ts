import { z } from 'zod';

// Schema compartido entre onboarding y edición de perfil (Bloques 2 y 4).
export const perfilSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  disciplina: z
    .string()
    .trim()
    .min(2, 'La disciplina debe tener al menos 2 caracteres')
    .max(100, 'La disciplina no puede exceder 100 caracteres'),
  territorios: z
    .array(z.string().uuid('Territorio inválido'))
    .min(1, 'Selecciona al menos un territorio'),
  motivacion: z
    .string()
    .trim()
    .min(20, 'La motivación debe tener al menos 20 caracteres')
    .max(280, 'La motivación no puede exceder 280 caracteres'),
  bioCorta: z
    .string()
    .trim()
    .max(500, 'La bio no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
  enlacesExternos: z
    .array(z.string().url('URL inválida'))
    .max(3, 'Máximo 3 enlaces')
    .optional()
    .default([]),
  quiereSerCurador: z.boolean().optional().default(false),
});

export type PerfilInput = z.infer<typeof perfilSchema>;
