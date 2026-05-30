import { z } from 'zod';

// Ubicación estructurada según modalidad (D-S3-3).
export const ubicacionSchema = z.object({
  urlOnline: z.string().url('URL inválida').optional().or(z.literal('')),
  plataforma: z.string().max(60).optional().or(z.literal('')),
  direccion: z.string().max(300).optional().or(z.literal('')),
  mapsUrl: z.string().url('URL de mapa inválida').optional().or(z.literal('')),
});

export const ponenteSchema = z.object({
  nombre: z.string().min(1).max(120),
  bio: z.string().max(300).optional().or(z.literal('')),
  enlace: z.string().url().optional().or(z.literal('')),
});

export const eventoSchema = z
  .object({
    titulo: z.string().trim().min(3, 'Título muy corto').max(160),
    descripcion: z
      .string()
      .trim()
      .min(20, 'La descripción debe tener al menos 20 caracteres'),
    modalidad: z.enum(['online', 'presencial', 'hibrido']),
    territorioId: z.string().uuid().optional().or(z.literal('')),
    // Fechas en ISO (el form envía datetime-local convertido a UTC).
    fechaInicio: z.string().datetime({ message: 'Fecha de inicio inválida' }),
    fechaFin: z.string().datetime().optional().or(z.literal('')),
    capacidad: z.number().int().positive().nullable().optional(),
    ubicacion: ubicacionSchema.optional(),
    ponentes: z.array(ponenteSchema).max(10).optional().default([]),
    idiomas: z
      .array(z.enum(['es', 'en']))
      .min(1)
      .default(['es']),
    estado: z
      .enum([
        'borrador',
        'programado',
        'lleno',
        'en_curso',
        'realizado',
        'cancelado',
        'pospuesto',
      ])
      .default('programado'),
  })
  .refine(
    (d) =>
      !d.fechaFin || d.fechaFin === '' || new Date(d.fechaFin) >= new Date(d.fechaInicio),
    { message: 'La fecha de fin no puede ser anterior al inicio', path: ['fechaFin'] }
  )
  .refine(
    (d) => {
      // Validación de ubicación coherente con la modalidad.
      const u = d.ubicacion;
      if (d.modalidad === 'online') return !!u?.urlOnline;
      if (d.modalidad === 'presencial') return !!u?.direccion;
      if (d.modalidad === 'hibrido') return !!u?.urlOnline && !!u?.direccion;
      return true;
    },
    { message: 'Completa la ubicación según la modalidad elegida', path: ['ubicacion'] }
  );

export type EventoInput = z.infer<typeof eventoSchema>;
export type UbicacionData = z.infer<typeof ubicacionSchema>;
export type PonenteData = z.infer<typeof ponenteSchema>;
