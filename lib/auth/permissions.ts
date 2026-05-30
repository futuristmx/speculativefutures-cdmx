import type { Miembro, RolContribucion } from '@prisma/client';

/**
 * Sistema de permisos ADITIVO (D-S2-2, resuelve O4 del Sprint 0).
 *
 * Un Miembro acumula permisos por dos vías independientes que se UNEN:
 *   1. Su `rol_contribucion` (regular | curador_comunidad | curador_core)
 *   2. Si tiene `aliado_fundador_id` poblado (rol "aliado_fundador")
 *
 * No hay jerarquía ni intersección: el set final es la unión de ambos.
 *
 * Matriz de permisos:
 *
 * | Permiso                      | regular | cur_comunidad | cur_core | aliado |
 * |------------------------------|:-------:|:-------------:|:--------:|:------:|
 * | leer_seniales_publicadas     |   ✓     |      ✓        |    ✓     |   ✓    |
 * | leer_archivo_completo        |   ✓     |      ✓        |    ✓     |   ✓    |
 * | proponer_senial              |         |      ✓        |    ✓     |        |
 * | publicar_senial_directa      |         |   ✓ (≥3)*     |    ✓     |        |
 * | editar_senial_propia         |         |      ✓        |    ✓     |        |
 * | aprobar_senial               |         |               |    ✓     |        |
 * | eliminar_senial              |         |               |    ✓     |        |
 * | crear_evento                 |         |               |    ✓     |        |
 * | rsvp_evento                  |   ✓     |      ✓        |    ✓     |   ✓    |
 * | crear_pieza                  |         |               |    ✓     |        |
 * | editar_perfil_propio         |   ✓     |      ✓        |    ✓     |   ✓    |
 * | gestionar_aliados            |         |               |    ✓     |        |
 * | editar_perfil_aliado         |         |               |    ✓     |   ✓    |
 * | leer_dossier_premium         |         |               |    ✓     |   ✓    |
 * | configurar_sistema           |         |               |    ✓     |        |
 *
 * (*) publicar_senial_directa para curador_comunidad depende además del
 * contador `seniales_publicadas_aprobadas >= 3` (calibración, Sprint 4).
 * El permiso base se concede aquí; la regla de calibración se evalúa en la
 * server action de publicación.
 */

export type Permiso =
  | 'leer_seniales_publicadas'
  | 'leer_archivo_completo'
  | 'proponer_senial'
  | 'publicar_senial_directa'
  | 'editar_senial_propia'
  | 'aprobar_senial'
  | 'eliminar_senial'
  | 'crear_evento'
  | 'rsvp_evento'
  | 'crear_pieza'
  | 'editar_perfil_propio'
  | 'gestionar_aliados'
  | 'editar_perfil_aliado'
  | 'leer_dossier_premium'
  | 'configurar_sistema';

const POR_ROL: Record<RolContribucion, Permiso[]> = {
  regular: [
    'leer_seniales_publicadas',
    'leer_archivo_completo',
    'rsvp_evento',
    'editar_perfil_propio',
  ],
  curador_comunidad: [
    'leer_seniales_publicadas',
    'leer_archivo_completo',
    'rsvp_evento',
    'editar_perfil_propio',
    'proponer_senial',
    'publicar_senial_directa',
    'editar_senial_propia',
  ],
  curador_core: [
    'leer_seniales_publicadas',
    'leer_archivo_completo',
    'rsvp_evento',
    'editar_perfil_propio',
    'proponer_senial',
    'publicar_senial_directa',
    'editar_senial_propia',
    'aprobar_senial',
    'eliminar_senial',
    'crear_evento',
    'crear_pieza',
    'gestionar_aliados',
    'editar_perfil_aliado',
    'leer_dossier_premium',
    'configurar_sistema',
  ],
};

// Permisos que aporta ser representante de un aliado fundador.
const POR_ALIADO: Permiso[] = ['editar_perfil_aliado', 'leer_dossier_premium'];

type MiembroLike = Pick<Miembro, 'rolContribucion' | 'aliadoFundadorId'>;

/** Devuelve la unión de permisos del miembro (rol de contribución + aliado). */
export function obtenerPermisos(miembro: MiembroLike): Set<Permiso> {
  const set = new Set<Permiso>(POR_ROL[miembro.rolContribucion]);
  if (miembro.aliadoFundadorId) {
    for (const p of POR_ALIADO) set.add(p);
  }
  return set;
}

/** Indica si el miembro tiene un permiso concreto. */
export function tienePermiso(miembro: MiembroLike, permiso: Permiso): boolean {
  return obtenerPermisos(miembro).has(permiso);
}
