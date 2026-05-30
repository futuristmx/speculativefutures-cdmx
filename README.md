# Speculative Futures CDMX

Plataforma web del capítulo Ciudad de México de la red Speculative Futures:
comunidad interdisciplinaria para imaginar, cuestionar y activar futuros.

Producción: [speculativefutures.mx](https://speculativefutures.mx)

---

## Stack

| Capa          | Tecnología                                                              |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | Next.js 14 (App Router) + React 18 + TypeScript estricto                |
| Base de datos | Supabase PostgreSQL (plan Pro)                                          |
| ORM           | Prisma 6.x                                                              |
| Auth          | Supabase Auth (magic link) + Resend SMTP custom                         |
| i18n          | next-intl (`es` primario, `en` selectivo)                               |
| Email         | Resend                                                                  |
| Estilos       | Tokens en `styles/tokens.ts` → variables CSS generadas + estilos inline |
| Hosting       | Vercel                                                                  |

La arquitectura completa está en `docs/sprints/sprint-0/ARQUITECTURA.md`.
Las reglas del repositorio (versionado de documentos, disciplina de ramas y
de branching de Supabase) están en `CLAUDE.md`.

---

## Setup local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar variables de entorno y rellenarlas:
   ```bash
   cp .env.example .env.local
   ```
3. Generar el cliente Prisma y los tokens CSS:
   ```bash
   npx prisma generate
   npm run tokens:build
   ```
4. Desarrollo:
   ```bash
   npm run dev
   ```

---

## Variables de entorno

Ver `.env.example` para la lista completa. Resumen:

| Variable                                                     | Uso                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente Supabase (browser/server)                            |
| `SUPABASE_SERVICE_ROLE_KEY`                                  | Operaciones server privilegiadas                             |
| `DATABASE_URL`                                               | Prisma — conexión pooled (pgbouncer, 6543)                   |
| `DIRECT_URL`                                                 | Prisma — conexión directa (5432) para migraciones y policies |
| `RESEND_API_KEY`                                             | Email transaccional + SMTP de Supabase Auth                  |
| `CONTACT_TO` / `CONTACT_FROM`                                | Destinatario/remitente del formulario de contacto            |
| `NEXT_PUBLIC_SITE_URL`                                       | URLs absolutas (callbacks, sitemap, hreflang)                |
| `SEED_CURADOR_CORE_EMAIL`                                    | Email del primer Curador Core (seed)                         |

Ninguna se versiona: `.env*` está en `.gitignore`. En Vercel se configuran por
environment (production y preview).

---

## Base de datos: migraciones + políticas RLS

El schema lo gestiona Prisma; las políticas RLS y el trigger viven en
`supabase/policies/` (SQL versionado). **Cada migración debe ir seguida de la
aplicación de políticas** — el orden importa.

```bash
# Desarrollo (crea migración + aplica):
npx prisma migrate dev
npm run db:apply-policies

# Deploy (preview/producción): aplica migraciones pendientes + políticas:
npm run db:setup

# Seed (capítulo, territorios, aliado, curador core inicial):
npm run db:seed
```

`db:setup` ejecuta `prisma migrate deploy && npm run db:apply-policies`.
`db:apply-policies` corre, en orden numérico, los archivos de
`supabase/policies/` contra `DIRECT_URL`.

### Curador Core inicial

El seed crea el Curador Core vía **Admin API de Supabase**: con
`SEED_CURADOR_CORE_EMAIL` llama a `auth.admin.createUser` (lo que dispara el
trigger `handle_new_user` y crea el Miembro con rol `regular`), y luego lo
promueve a `curador_core` por `upsert` sobre `user_id`. Así `Miembro.user_id`
es siempre obligatorio y todo Miembro corresponde a un `auth.users`. Para
promover otros curadores core después: actualizar `rol_contribucion` del
Miembro (server action protegida por rol existente, o SQL de configuración en
Supabase). Requiere `SUPABASE_SERVICE_ROLE_KEY` en el entorno.

---

## Preview deployments

Cada PR genera un preview en Vercel con su propia rama de Supabase
(database branching). El flujo `db:setup` aplica schema + políticas en la rama
antes de validar. La disciplina de costos y limpieza de ramas está en
`CLAUDE.md` (Política de Supabase Database Branching).

---

## Scripts

| Script                            | Acción                                                           |
| --------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desarrollo                                           |
| `npm run build`                   | Build de producción (corre `prebuild`: tokens + prisma generate) |
| `npm run start`                   | Servir build                                                     |
| `npm run lint`                    | ESLint (next lint)                                               |
| `npm run typecheck`               | `tsc --noEmit`                                                   |
| `npm run format` / `format:check` | Prettier                                                         |
| `npm run tokens:build`            | Genera `styles/tokens.css` desde `styles/tokens.ts`              |
| `npm run db:setup`                | `prisma migrate deploy` + políticas                              |
| `npm run db:apply-policies`       | Aplica SQL de `supabase/policies/`                               |
| `npm run db:seed`                 | Seed inicial                                                     |

---

## Estructura

```
app/               Rutas (App Router) bajo segmento [locale]
  [locale]/        Páginas localizadas (home, login, onboarding, dashboard)
  auth/callback/   Intercambio de code → sesión
  api/contact/     Formulario de contacto (Resend)
components/        UI: brand, sections, overlays, ui, dev
features/          Lógica de dominio (se llena por sprint)
i18n/              Config de next-intl (routing, request, navigation)
lib/               Clientes Supabase, Prisma singleton, tokens (compat)
messages/          Strings i18n (es.json completo, en.json subconjunto)
prisma/            schema.prisma, seed.ts, migrations
styles/            tokens.ts (source of truth) + tokens.css (generado)
supabase/policies/ Trigger + RLS (tablas y Storage) en SQL
docs/              Estrategia y entregables por sprint
```
