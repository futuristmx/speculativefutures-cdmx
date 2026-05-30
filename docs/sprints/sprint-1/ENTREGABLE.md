# Speculative Futures CDMX — Sprint 1 · Entregable

## Infraestructura base + limpieza

### Change Consulting · Mayo 2026

---

## Resumen

Sprint 1 construido en la rama `feat/sprint-1-infra` (no en `main`: producción
protegida hasta que las variables de entorno de Supabase existan en Vercel y el
PR se valide en preview). Toda la capa de código de infraestructura está
implementada y verificada localmente (build + lint + typecheck + format en
verde). La parte que requiere cuentas/dashboards externos (crear el proyecto
Supabase, DNS de Resend, toggles del dashboard, integración Vercel) y la
ejecución de migraciones/seed contra la base viva queda documentada paso a paso
y marcada como pendiente de credenciales.

---

## Qué se construyó

### Bloque 2 — Código de infraestructura

- **Dependencias** instaladas: `@prisma/client@^6`, `prisma@^6` (dev),
  `@supabase/ssr`, `@supabase/supabase-js`, `next-intl`, `zod`, y tooling
  (`eslint`, `prettier`, `eslint-config-next@14.2.29` alineado a Next 14).
  `resend` se mantiene. shadcn/ui NO se instaló (correcto, según prompt).
- **Prisma**: `lib/prisma.ts` (singleton). Schema validado con Prisma 6
  (`prisma validate` → válido). Cliente generado (`prisma generate`).
- **Seed** (`prisma/seed.ts`): capítulo `cdmx`, 5 territorios, aliado Change ·
  Futurist.mx, y (O1) Curador Core inicial vía `SEED_CURADOR_CORE_EMAIL`.
  Idempotente (upsert).
- **Trigger** (`supabase/policies/00_trigger_miembro.sql`): `handle_new_user`
  crea el Miembro base (`capitulo_id = cdmx`, `rol_contribucion = regular`,
  `onboarding_completado = false`) y **reconcilia** por email el curador core
  precargado (ver "Decisiones", D1).
- **RLS** (`supabase/policies/`): `01_helpers`, `02_senial`, `03_evento_rsvp`,
  `04_pieza_aliado`, `05_miembro`, y **(O3)** `06_storage` con los 4 buckets
  (`avatars`, `eventos`, `aliados`, `dossiers`) y sus políticas en SQL.
- **(O2) Orquestación**: scripts `db:apply-policies` (Node, cross-platform,
  aplica los `.sql` en orden numérico vía `psql` con `ON_ERROR_STOP`) y
  `db:setup` (`prisma migrate deploy && db:apply-policies`). Flujo documentado
  en README.
- **Supabase clients** (`@supabase/ssr`): `lib/supabase/server.ts`,
  `client.ts`, `middleware.ts`.
- **Middleware raíz** (`middleware.ts`): refresca sesión, aplica next-intl,
  protege rutas privadas (→ `/login`), y **(O6)** redirige a `/onboarding` si
  `onboarding_completado = false`. Excepciones `/auth` y `/api`.
- **next-intl**: `i18n/routing.ts` (`es` default, `en`), `request.ts`,
  `navigation.ts`; `messages/es.json` (completo) y `messages/en.json`
  (subconjunto público); segmento `app/[locale]/` con layout raíz mínimo +
  layout de locale con provider; `app/sitemap.ts` bilingüe básico.
- **Auth callback** (`app/auth/callback/route.ts`): intercambia code por sesión
  y redirige a `/dashboard` u `/onboarding` según estado.
- **Login** (`app/[locale]/login/page.tsx`): magic link real vía Supabase.
  Placeholders funcionales de `/onboarding` y `/dashboard`.

### Bloque 3 — Limpieza de deuda técnica

- Eliminados huérfanos: `components/sections/Archive.tsx`, `Voces.tsx`,
  `lib/useReveal.ts`.
- `TweaksWidget` movido a `components/dev/` y su render envuelto en
  `process.env.NODE_ENV === 'development'`. Verificado ausente del bundle de
  producción (build no lo incluye en las rutas).
- `app/api/contact/route.ts` parametrizado con `CONTACT_TO` / `CONTACT_FROM`.
- `README.md` reescrito al estado real (stack, setup, env, scripts, DB, preview).
- **Tokens consolidados**: `styles/tokens.ts` como source of truth único;
  `scripts/build-tokens.mjs` genera `styles/tokens.css`; `globals.css` deja de
  declarar `:root` (se importa el generado); `lib/tokens.ts` re-exporta desde
  el source of truth (sin valores duplicados).

### Bloque 4 — CI/CD

- `.github/workflows/ci.yml`: en cada PR/push a main corre `prisma validate`,
  `prisma generate`, `tokens:build`, lint, typecheck, format:check.
- ESLint (`.eslintrc.json`), Prettier (`.prettierrc.json`, `.prettierignore`).
- `.env.example` con todas las variables de §10 de ARQUITECTURA, sin valores.

### Bloque 5 — Observaciones diferibles

- Sección 13 de `ARQUITECTURA.md` ampliada con O7, O8, O9, O10 (documento
  pasa a v1.2). Es el único archivo de `sprint-0/` modificado, según lo
  permitido por el prompt.

---

## Verificación local (en verde)

| Check | Resultado |
| --- | --- |
| `npm run tokens:build` | OK (43 variables generadas) |
| `prisma validate` | The schema is valid |
| `prisma generate` | OK |
| `npm run build` | OK — rutas `/es`, `/en`, login, dashboard, onboarding, callback, sitemap; middleware 94 kB |
| `npm run typecheck` | 0 errores |
| `npm run lint` | 0 warnings/errores |
| `npm run format:check` | OK |

---

## Estado de cada criterio de aceptación

| # | Criterio | Estado |
| --- | --- | --- |
| 1 | `prisma migrate deploy` en preview y main | **Pendiente DB viva** — migración inicial se genera al correr `migrate dev` contra Supabase (requiere credenciales) |
| 2 | `npm run db:setup` aplica schema + policies en orden | **Código listo**; ejecución pendiente de DB viva |
| 3 | PR dispara preview + branch Supabase sincronizados | **Pendiente** — requiere integración Vercel↔Supabase (config externa) |
| 4 | Flujo magic link end-to-end | **Código listo** (login + callback + SMTP documentado); verificación pendiente de Supabase+Resend configurados |
| 5 | Trigger crea Miembro con valores correctos | **SQL listo**; verificación pendiente de DB viva |
| 6 | Middleware redirige a `/onboarding` sin onboarding | **Implementado**; verificación end-to-end pendiente de DB viva |
| 7 | Middleware redirige a `/login` anónimo en ruta privada | **Implementado y compilado** |
| 8 | Seed crea capítulo, 5 territorios, aliado, curador core | **Código listo**; ejecución pendiente de DB viva |
| 9 | RLS senial: anónimo solo ve publicadas; core ve borradores | **SQL listo**; verificación pendiente de DB viva |
| 10 | RLS Storage: avatars lectura pública; dossiers rechaza anónimo | **SQL listo (O3)**; verificación pendiente de DB viva |
| 11 | `/es` y `/en` resuelven; banner inglés | **Implementado y compilado** (banner: string i18n presente; render en home se conecta en Sprint siguiente de UI) |
| 12 | Huérfanos eliminados | **Cumplido** |
| 13 | `TweaksWidget` fuera del bundle de producción | **Cumplido** (movido a dev + guard de entorno) |
| 14 | `api/contact` lee email desde env | **Cumplido** |
| 15 | README al estado real | **Cumplido** |
| 16 | `styles/tokens.ts` único source of truth | **Cumplido** |
| 17 | CI verde | **Workflow listo**; corre al abrir el PR |
| 18 | `.env.example` completo | **Cumplido** |
| 19 | Sección 13 ampliada con O7–O10 | **Cumplido** |

**Resumen:** criterios 7, 12, 13, 14, 15, 16, 18, 19 cumplidos y verificados
localmente. Criterios 1–6, 8–10 tienen el código/SQL completo pero su
verificación requiere la base Supabase viva (credenciales). Criterios 3, 17
dependen de abrir el PR y de la integración Vercel↔Supabase.

---

## Pasos pendientes que requieren tus cuentas (Bloque 1 + ejecución DB)

Estos pasos no son ejecutables desde el entorno de construcción; requieren
acceso a dashboards y DNS.

### 1.1 Supabase Pro
1. Crear proyecto en plan Pro.
2. Confirmar no-pausing (Pro lo trae por defecto).
3. Database → Backups → habilitar **PITR**.
4. Branches → habilitar **database branching** y la **auto-destrucción al
   cierre de PR** (CLAUDE.md → Política de Branching).
5. Capturar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY` (Settings → API) y `DATABASE_URL` (pooled,
   6543) + `DIRECT_URL` (directo, 5432) (Settings → Database).

### 1.2 Resend
1. Verificar dominio `speculativefutures.mx` (SPF, DKIM, DMARC en DNS).
2. Generar API key → `RESEND_API_KEY`.
3. Crear credencial SMTP.

### 1.3 Supabase Auth + Resend SMTP
1. Auth → SMTP Settings → Enable Custom SMTP: host `smtp.resend.com`, port
   `465`, user `resend`, password = API key, sender
   `no-reply@speculativefutures.mx`.
2. Personalizar templates (registro, magic link, recuperación) con identidad.
3. Habilitar magic link como provider. **No** habilitar Google OAuth.

### 1.4 Vercel
1. Integrar Vercel ↔ Supabase Database Branching (Marketplace).
2. Configurar variables de entorno en production y preview.
3. Verificar que un PR genera preview + branch de DB.

### Ejecución de base de datos (una vez con credenciales en `.env.local`)
```bash
npx prisma migrate dev --name init   # crea la migración inicial
npm run db:apply-policies            # trigger + RLS (tablas y storage)
npm run db:seed                      # capítulo, territorios, aliado, curador core
```
En preview/producción: `npm run db:setup` (migrate deploy + policies).

---

## Decisiones tomadas durante la construcción

- **D1 — `Miembro.user_id` pasa a opcional.** (Ver Desviaciones.)
- **D2 — Lectura de onboarding en middleware vía Supabase, no Prisma.** El
  middleware corre en edge runtime y Prisma 6 no es edge-compatible. Se lee
  `onboarding_completado` con el cliente Supabase (fetch, edge-safe). Prisma se
  reserva para server components/actions/route handlers (Node runtime).
- **D3 — Generación de tokens con Node `--experimental-strip-types`.** Evita
  añadir `ts-node`/`tsx` como dependencia. Mismo enfoque para `seed.ts`.
- **D4 — `eslint-config-next` alineado a `14.2.29`.** El prompt no fijó versión;
  se alinea a Next 14 para coherencia (la 16 apuntaba a otro major).
- **D5 — Layout raíz mínimo + layout por locale.** Requerido por el patrón de
  `[locale]` de next-intl con App Router; `<html lang>` se fija por locale.

---

## Desviaciones del plan (señaladas, no resueltas unilateralmente)

### DESV-1 — `Miembro.user_id` opcional (tensión O1 ↔ vínculo auth.users)

**Conflicto.** El schema de Sprint 0 define `Miembro.user_id` como obligatorio
y único (`String @unique`). La observación **O1** exige precargar en el seed un
Miembro `curador_core` **antes** de que el fundador haga login — momento en el
que aún no existe su `auth.users.id`. Ambas condiciones no pueden cumplirse a
la vez con `user_id` NOT NULL.

**Resolución aplicada (provisional, sujeta a revisión del chat estratégico):**
`user_id` pasa a `String?` (opcional). Un Miembro puede existir como registro
de aplicación sin cuenta de auth; el trigger `handle_new_user` reconcilia el
`user_id` por email en el primer login, preservando el rol. La unicidad se
mantiene (`@unique` sobre nullable permite múltiples NULL en PostgreSQL pero un
solo valor real por user). Las RLS filtran por `user_id = auth.uid()`, así que
un registro con `user_id` NULL nunca es visible/editable por ningún cliente
autenticado hasta reconciliarse.

**Por qué se señala:** cambia una restricción del schema aprobado en Sprint 0.
Alternativas no elegidas: (a) crear el `auth.users` del fundador
programáticamente en el seed vía Admin API (acopla el seed a credenciales de
auth y a la red); (b) tabla separada de "invitaciones de rol". Se eligió la
opción de menor acoplamiento. **Requiere validación del chat estratégico.**

### DESV-2 — Criterios dependientes de servicios externos

Los criterios 1–6, 8–10 (y 3, 17 parcialmente) no pueden verificarse en el
entorno de construcción porque dependen de la base Supabase viva y de la
configuración de dashboards/DNS. El código y el SQL están completos; la
ejecución y verificación quedan pendientes de credenciales. No se marcan como
"cumplidos" para no reportar falsamente.

---

## Variables de entorno requeridas

Ver `.env.example`. Para correr el proyecto en local hace falta, como mínimo:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`,
`NEXT_PUBLIC_SITE_URL`, `SEED_CURADOR_CORE_EMAIL`. Opcionales con default:
`CONTACT_TO`, `CONTACT_FROM`.

---

## Siguiente paso

1. Configurar Bloque 1 (cuentas/dashboards) y cargar `.env.local`.
2. Correr `migrate dev` + `db:apply-policies` + `db:seed` y verificar
   criterios 1–6, 8–10.
3. Abrir PR de `feat/sprint-1-infra` → validar CI (criterio 17) y preview
   (criterio 3).
4. Este documento regresa al chat estratégico para revisión. **Sprint 2 no
   inicia sin `REVISION.md` aprobada del Sprint 1** (CLAUDE.md). La DESV-1
   requiere veredicto explícito.

---

_Speculative Futures CDMX · Sprint 1 · Entregable_
_Change Consulting · Mayo 2026_
