# SPECULATIVE FUTURES CDMX — Revisión Arquitectónica Sprint 0
## Veredicto del Chat Estratégico
### Change Consulting · Mayo 2026

---

## VEREDICTO

**APROBADO CON OBSERVACIONES.** Sprint 1 autorizado.

El documento `SPRINT-0-ARQUITECTURA.md` v1.0 cumple las 13 secciones obligatorias, el schema Prisma está validado, las decisiones técnicas están justificadas, y los conflictos con lineamientos están señalados (no resueltos unilateralmente). 

Las observaciones siguientes se integran al alcance del Sprint 1. Las marcadas como CRÍTICAS son condición de cierre del Sprint 1 (sin ellas no se autoriza Sprint 2). Las IMPORTANTES se resuelven antes del sprint que las requiere. Las DIFERIBLES se agregan a la Sección 13.

---

## OBSERVACIONES CRÍTICAS (condición de cierre del Sprint 1)

### O1 — Estrategia de asignación inicial de Curador Core

**Problema:** el sistema entero descansa en que existan curadores core para aprobar las primeras 3 señales de cada nuevo curador comunidad. El documento no especifica cómo se asigna el primer curador_core.

**Resolución:** en el `seed.ts` de Sprint 1, dejar al menos un Miembro con `rol_contribucion = curador_core` precargado, vinculado al email del fundador del capítulo. Documentar el procedimiento de promoción de futuros curadores core (server action protegida por rol existente; o SQL directo de Supabase como operación de configuración).

**Aceptación:** el seed crea al menos un Miembro con rol curador_core. Existe un mecanismo documentado y verificable para promover miembros a curador_core sin tener que editar la base de datos manualmente.

### O2 — Orquestación Prisma migrations + Supabase RLS

**Problema:** Prisma maneja schema, las políticas RLS viven en `supabase/policies/`. El documento describe ambos pero no explica cómo se sincronizan en deploy y en preview branches. Sin estrategia explícita, alta probabilidad de drift entre schema y políticas.

**Resolución:** definir y dejar funcional el flujo. Recomendación: hook `post-migrate` en `package.json` que ejecute en orden numérico los archivos SQL de `supabase/policies/`. Validar que funcione en preview branches de Vercel.

**Aceptación:** un PR de prueba que añade una migración Prisma + una política RLS nueva debe aplicar ambas correctamente en su preview deployment, sin intervención manual. Documentación del flujo en README.

### O3 — Políticas RLS de Storage en SQL ejecutable

**Problema:** §10 del documento menciona "RLS de Storage: lectura pública para avatars/, eventos/, aliados/; dossiers/ restringido". Pero a diferencia de las RLS de tablas (en SQL ejecutable), las de Storage están solo en lenguaje natural.

**Resolución:** agregar al directorio `supabase/policies/` los archivos SQL específicos para los buckets de Storage. Incluir las cuatro políticas mencionadas explícitamente como código SQL.

**Aceptación:** el directorio `supabase/policies/` contiene archivos `XX_storage_*.sql` con las políticas de los cuatro buckets, ejecutables y validados.

---

## OBSERVACIONES IMPORTANTES (resolver antes del sprint que las requiere)

### O4 — Superposición de roles Miembro (antes de Sprint 2)

**Problema:** un Miembro puede tener simultáneamente `rol_contribucion = curador_core` y `aliado_fundador_id` poblado. La matriz de permisos de §6.2 no resuelve esta superposición. En la práctica, el primer aliado (Change) coincidirá con el primer curador core.

**Resolución:** decidir y documentar: roles aditivos (la persona obtiene la unión de permisos de todos sus roles). Implementar en helper de autorización en `lib/auth/`.

**Aceptación:** documento de Sprint 2 incluye lógica de roles aditivos. Test verifica que un Miembro con ambos roles tiene los permisos de ambos.

### O5 — Cuota blanda 1/mes Curador Comunidad (antes de Sprint 4)

**Problema:** lineamientos §2 menciona "cuota blanda 1 señal/mes (límite informativo)". El documento no la modela.

**Resolución:** implementación informativa. Agregar al schema (o derivar) `fecha_ultima_publicacion_aprobada` en Miembro. En dashboard del Curador Comunidad mostrar mensaje suave ("ya publicaste este mes — puedes seguir, es solo referencia"). No enforce técnico.

**Aceptación:** dashboard del Curador Comunidad muestra estado de cuota con tono informativo. No bloquea publicación de señales adicionales.

### O6 — Campo `onboarding_completado` (Sprint 1)

**Problema:** §5.4 menciona "Middleware detecta onboarding incompleto → redirige a /onboarding". No se especifica cómo.

**Resolución:** confirmar que `schema.prisma` incluye `Miembro.onboarding_completado: Boolean @default(false)`, o documentar la condición derivada (todos los campos obligatorios poblados). El middleware usa este campo para decidir redirect.

**Aceptación:** middleware funcional verificado: un miembro sin onboarding completado intentando acceder a `/dashboard` es redirigido a `/onboarding`.

---

## OBSERVACIONES DIFERIBLES (agregar a Sección 13 del documento)

### O7 — Integridad referencial de `Conexion` (Sprint 7)

`Conexion` es polimórfica sin FK. Cuando se eliminen entidades referenciadas, las conexiones pueden quedar huérfanas. Resolver en Sprint 7: soft delete con campo `eliminada_at`, job programado de limpieza, o validación obligatoria en server action de delete. Recomendación: soft delete + filtro en queries.

### O8 — Política de degradación de Resend

Documentar comportamiento al acercarse al límite mensual del free tier (3,000 emails): logging estructurado, alerta a curador core, política de retry. Resolver antes de Ola 1 funcional con tráfico real.

### O9 — Supuestos de volumen explícitos

Agregar al documento de arquitectura nota sobre volúmenes esperados en MDP: comunidad de decenas a cientos de miembros, archivos hasta 10MB por subida, paginación de 20 elementos en listados. No condiciona arquitectura, sí condiciona decisiones tácticas.

### O10 — UI bilingüe vs contenido público bilingüe

Documentar política explícita: la UI de la app (botones, labels, errores) está en español. El bilingüismo aplica solo a contenido editorial público con `idiomas: ['es', 'en']`. Rutas privadas (`/dashboard`, `/configuracion`, `/curacion`) no tienen versión `/en/`. `messages/en.json` contiene solo strings de contenido público.

---

## SIGUIENTE PASO

1. Este documento se versiona en repo como `SPRINT-0-REVISION.md`.
2. Claude Code aplica las observaciones críticas (O1, O2, O3) al alcance del Sprint 1.
3. Las observaciones importantes (O4, O5, O6) se aplican en su sprint correspondiente.
4. Las observaciones diferibles (O7, O8, O9, O10) se integran a la Sección 13 del documento de arquitectura existente.
5. El chat estratégico genera el prompt del Sprint 1 ajustado a estas observaciones.

---

*Speculative Futures CDMX · Revisión Arquitectónica Sprint 0 · v1.0*
*Change Consulting · Mayo 2026*
