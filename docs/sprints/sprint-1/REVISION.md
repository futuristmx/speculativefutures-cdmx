# SPECULATIVE FUTURES CDMX — Revisión Arquitectónica Sprint 1
## Veredicto del Chat Estratégico
### Change Consulting · Mayo 2026

---

## VEREDICTO

**APROBADO CON OBSERVACIONES.** Sprint 2 autorizado.

El Sprint 1 entrega el código de infraestructura completo y verificado localmente. 13 de 19 criterios están cumplidos y verificados (incluyendo verificación en DB viva de los criterios 5 y 8). Los 6 criterios restantes están en parcial o pendiente por dependencias operativas externas (configuración de dashboards, DNS, integraciones de marketplace), no por fallas técnicas.

DESV-1 fue correctamente revertida siguiendo la decisión del chat estratégico. Las nuevas desviaciones descubiertas durante construcción (DESV-3 sandbox sin puertos DB; DESV-4 Storage RLS por permisos) están documentadas honestamente y no comprometen el alcance del sprint.

---

## CONDICIONES DE TRANSICIÓN A SPRINT 2

Estas tres condiciones se cumplen antes o durante las primeras tareas del Sprint 2. No bloquean su inicio formal, pero son condición de su éxito.

### T1 — Resolver baseline de migraciones Prisma

**Problema:** el schema se aplicó en DB vía SQL generado con `prisma migrate diff`, no con `prisma migrate dev`. La carpeta `prisma/migrations/` está vacía aunque el schema vive en DB. Cuando se ejecute `prisma migrate dev` desde una máquina con acceso directo a la DB, va a detectar drift y fallar.

**Resolución:** desde máquina local con acceso directo a la DB (acceso a puertos 5432/6543), ejecutar:

```bash
# Generar la baseline en prisma/migrations/0_init/migration.sql
mkdir -p prisma/migrations/0_init
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

# Marcar como aplicada (el schema ya existe en DB)
npx prisma migrate resolve --applied 0_init

# Verificar que el historial está consistente
npx prisma migrate status
```

Después de esto, cualquier migración del Sprint 2 (agregar columnas, índices, etc.) puede correrse con `prisma migrate dev --name <descriptor>` normalmente.

**Responsable:** equipo Change Consulting (operación desde máquina local).

### T2 — Configurar integración Vercel ↔ Supabase + primer preview deployment

Sin esto, el flujo de previews no existe y los sprints siguen siendo verificables solo localmente. Cierra criterios 3 y 6 del Sprint 1.

Pasos: Vercel Marketplace → Supabase integration → conectar proyecto → variables de entorno sincronizadas en production y preview environment → abrir PR de prueba (puede ser un cambio trivial en docs/) → verificar que se genera preview deployment con su rama de DB.

**Responsable:** equipo Change Consulting (operación desde dashboards).

### T3 — Decidir sobre RLS de Storage (DESV-4)

Dos caminos válidos:

- **A:** aplicar las políticas de `supabase/policies/06_storage.sql` manualmente desde el panel Storage → Policies del dashboard de Supabase. Cierra criterio 10 ahora.
- **B:** aceptar formalmente la postergación al sprint que use Storage (probablemente Sprint 3 cuando se construyan eventos con imágenes, o Sprint 6 cuando lleguen dossiers premium). El SQL queda versionado para ejecutarlo entonces.

Recomendación: **B**, porque aplicar políticas hoy sobre buckets que no se usan introduce riesgo de configuración incorrecta sin posibilidad de validar. Mejor aplicarlas cuando se diseñe el flujo de subida de archivos.

---

## OBSERVACIONES — Reglas persistentes a añadir al CLAUDE.md

### O11 — Política de aplicación manual de SQL

**Problema descubierto en DESV-3:** el sandbox de Claude Code no tiene acceso a puertos PostgreSQL. Esto afecta TODOS los sprints futuros que requieran migraciones, seeds o políticas RLS.

**Regla a añadir a CLAUDE.md (raíz):**

```
## Política de aplicación de SQL contra DB Supabase

El entorno de construcción de Claude Code no tiene acceso a los puertos 5432 
(directo) ni 6543 (pooler) de Supabase. Solo tráfico web (443) está habilitado.

Flujo obligatorio para cambios de schema o políticas:

1. Code escribe schema en prisma/schema.prisma y políticas en supabase/policies/
2. Code genera SQL offline vía `prisma migrate diff --from-schema-datasource ...`
   y deja el SQL listo en supabase/policies/ o en la migración correspondiente
3. El equipo Change Consulting aplica el SQL manualmente, en orden numérico, 
   desde el SQL Editor de Supabase (web, 443) o desde máquina local con 
   acceso directo a la DB
4. Code verifica el resultado con queries SELECT vía Supabase JS client 
   (fetch, edge-safe, port 443)
5. Una vez aplicado, ejecutar `prisma migrate resolve --applied <nombre>` 
   desde máquina con acceso directo para sincronizar el historial de migraciones

Excepción: el seed (`prisma/seed.ts`) usa Supabase JS via fetch para llamar 
Admin API; este sí funciona desde el sandbox de Code una vez configurada 
SUPABASE_SERVICE_ROLE_KEY en .env.local.
```

### O12 — Inconsistencia textual menor en ENTREGABLE.md

Líneas 50-52 del entregable describen el trigger como "reconcilia por email"; DESV-1 (líneas 234-235) lo describe como simple INSERT idempotente sin reconciliación. El comportamiento real coincide con DESV-1; el texto del bloque "Qué se construyó" quedó residual de la versión previa. Pulir cuando haya commit menor de docs, no bloquea nada.

### O13 — Verificación del dominio Resend antes del primer deploy productivo

Code reporta que se conectó SMTP de Resend con sender de prueba `onboarding@resend.dev` mientras `speculativefutures.mx` termina de verificarse. Para preview deployments es aceptable. Para deploy a producción real (main → speculativefutures.mx), el dominio debe estar verificado antes.

Estado actual: pendiente de DNS (SPF, DKIM, DMARC). Cerrar antes del primer deploy productivo, no antes de Sprint 2.

### O14 — Sender de email en producción

Una vez verificado el dominio, actualizar en Supabase Auth → SMTP Settings el sender de `onboarding@resend.dev` a `no-reply@speculativefutures.mx`. Esto se hace junto con O13.

---

## RECONOCIMIENTOS

Tres decisiones técnicas durante construcción que merecen señalarse positivamente:

- **D2 — middleware edge-safe.** Detectar proactivamente que Prisma 6 no funciona en edge runtime y resolver usando Supabase client (fetch) es exactamente el tipo de juicio técnico que el proceso valora.
- **Trigger idempotente con `ON CONFLICT DO NOTHING`.** Resuelve elegantemente el caso edge del seed (Admin API dispara el trigger, seed luego hace upsert). Sin esta idempotencia, habría doble-insert.
- **Disciplina con archivos históricos.** Cuando Prettier reformateó archivos en `docs/sprints/sprint-0/` y `docs/strategy/`, Code los restauró + añadió a `.prettierignore`. Mantener la regla de "no editar registro histórico" sin recordatorio.

---

## SIGUIENTE PASO

1. Este documento se versiona automáticamente en `docs/sprints/sprint-1/REVISION.md` según la convención establecida.
2. Las observaciones O11, O13, O14 se integran al `CLAUDE.md` (raíz) cuando Code procese este review.
3. Las condiciones T1, T2, T3 se atienden en paralelo al inicio del Sprint 2.
4. El chat estratégico emite el prompt del Sprint 2 (membresía completa, perfiles, onboarding funcional) cuando se solicite.

**Sprint 2 autorizado.** El ciclo continúa.

---

*Speculative Futures CDMX · Revisión Arquitectónica Sprint 1 · v1.0*
*Change Consulting · Mayo 2026*
