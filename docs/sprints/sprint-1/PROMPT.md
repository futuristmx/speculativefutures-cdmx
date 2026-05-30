# SPECULATIVE FUTURES CDMX — Prompt Sprint 1
## Infraestructura base + limpieza
### Change Consulting · Mayo 2026 · v1.0

---

## CONTEXTO

El Sprint 0 incremental fue aprobado con observaciones por el chat estratégico (ver `docs/sprints/sprint-0/REVISION.md`). El stack está consolidado, el schema Prisma está validado, las decisiones arquitectónicas están cerradas.

Este es el Sprint 1: la infraestructura base sobre la cual se construirá el resto del MDP. Es el sprint más cargado de configuración del proyecto. Su entrega marca la transición de "documento" a "código de producto operativo".

---

## DOCUMENTOS DE REFERENCIA OBLIGATORIOS

Antes de iniciar, releer:

1. `CLAUDE.md` (raíz) — reglas persistentes del repositorio
2. `docs/strategy/LINEAMIENTOS.md` — fuente única de verdad del proyecto
3. `docs/sprints/sprint-0/ARQUITECTURA.md` — arquitectura aprobada
4. `docs/sprints/sprint-0/REVISION.md` — observaciones del chat estratégico a integrar

Ante conflicto, prevalece `LINEAMIENTOS.md`. Las observaciones críticas de `REVISION.md` (O1, O2, O3) son condición de cierre de este sprint.

---

## OBJETIVO DEL SPRINT 1

Dejar funcional la infraestructura base del proyecto: base de datos migrada, autenticación operativa, internacionalización activa, deuda técnica del inventario limpiada, CI/CD verde, preview deployments con database branching. Al finalizar este sprint, el proyecto puede recibir su primer usuario real (en preview) registrándose vía magic link.

**No se construye lógica de producto en este sprint.** Membresía, eventos, señales, editorial — todo eso viene en sprints posteriores. Este sprint deja los rieles puestos.

---

## ENTREGABLES OBLIGATORIOS

### Bloque 1 — Setup de servicios externos (configuración, no código)

**1.1 Supabase Pro**
- Crear proyecto Supabase en plan Pro
- Verificar no-pausing activo
- Habilitar PITR (Point-in-Time Recovery) desde día 1
- Activar database branching (preparación para Vercel previews)
- Capturar credenciales: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Capturar strings de conexión Prisma: `DATABASE_URL` (pooled, pgbouncer) y `DIRECT_URL` (directo para migraciones)

**1.2 Resend**
- Verificar dominio `speculativefutures.mx` en Resend (DNS: SPF, DKIM, DMARC)
- Generar API key
- Crear credencial SMTP en Resend
- Capturar `RESEND_API_KEY`

**1.3 Supabase Auth + Resend SMTP custom**
- En Supabase Dashboard → Project Settings → Authentication → SMTP Settings → Enable Custom SMTP
- Configurar con credenciales de Resend (host smtp.resend.com, port 465, user `resend`, password = API key, sender `no-reply@speculativefutures.mx`)
- Personalizar templates de email transaccional (registro, magic link, recuperación) con identidad visual del proyecto
- Habilitar magic link como provider principal
- Google OAuth diferido (no habilitar en Sprint 1 — observación O6 del review previo no escalada a Sprint 1)

**1.4 Vercel**
- Conectar Vercel project con Supabase Database Branching (Vercel Marketplace integration)
- Verificar que cada PR genera preview deployment con su rama de DB
- Configurar variables de entorno en producción y preview environment

### Bloque 2 — Código de infraestructura

**2.1 Dependencias** (instalar en este sprint)
- `@prisma/client@^6`, `prisma@^6` (dev)
- `@supabase/ssr`, `@supabase/supabase-js`
- `next-intl`
- `zod` (validación)
- `resend` (mantener, ya existe)

No se instala shadcn/ui en este sprint (se introduce por feature cuando se necesite UI compleja, según observación de la arquitectura).

**2.2 Prisma**
- Aplicar `prisma migrate dev` con el schema versionado en `prisma/schema.prisma`
- Generar `PrismaClient` singleton en `lib/prisma.ts`
- Verificar que `prisma validate` y `prisma migrate diff` están limpios

**2.3 Seeds** (archivo `prisma/seed.ts`)
- Insertar capítulo único: `cdmx`
- Insertar los cinco territorios (Futuros, Innovación & Negocios, Ciudad & Sistemas Vivos, Cultura & Sociedad, Tecnologías Emergentes)
- Insertar primer aliado fundador: Change · Futurist.mx (con `tipo`, `rol_especifico`, `fecha_incorporacion`)
- **(O1) Insertar primer Curador Core**: crear un Miembro con `rol_contribucion = curador_core` vinculado al email del fundador del capítulo. Configurar el email vía variable de entorno `SEED_CURADOR_CORE_EMAIL` para evitar hardcoding
- Documentar en `README.md` cómo correr el seed y cómo modificar el email del curador core inicial

**2.4 Trigger PostgreSQL `handle_new_user`**
- Versionar en `supabase/policies/00_trigger_miembro.sql` el trigger especificado en `docs/sprints/sprint-0/ARQUITECTURA.md` §5.6
- Verificar que cualquier inserción en `auth.users` genera el `Miembro` correspondiente con `capitulo_id = cdmx` y `rol_contribucion = regular` (excepto el seed inicial del curador core, que se inserta manualmente)

**2.5 Políticas RLS** (versionadas en `supabase/policies/`)
- `01_helpers.sql` — funciones auxiliares (`current_miembro_id()`, `current_rol()`, `es_curador_core()`)
- `02_senial.sql` — políticas de tabla Senial
- `03_evento_rsvp.sql` — políticas de tablas Evento y RSVP
- `04_pieza_aliado.sql` — políticas de PiezaEditorial y AliadoFundador
- `05_miembro.sql` — políticas de Miembro
- **(O3) `06_storage.sql`** — políticas RLS de Supabase Storage para los cuatro buckets:
  - `avatars/` — lectura pública, escritura solo por el dueño del avatar
  - `eventos/` — lectura pública, escritura solo por curador_core
  - `aliados/` — lectura pública, escritura solo por curador_core o aliado dueño
  - `dossiers/` — lectura restringida (preparado para premium, dormido — por ahora solo curador_core lee y escribe)

**2.6 (O2) Orquestación Prisma + RLS Supabase**
- Crear script en `package.json`: `"db:apply-policies": "for f in supabase/policies/*.sql; do psql $DIRECT_URL -f $f; done"` (o equivalente cross-platform)
- Crear script combinado: `"db:setup": "prisma migrate deploy && npm run db:apply-policies"`
- Documentar el flujo en `README.md`: cada migración de Prisma debe ir seguida de aplicación de policies. En preview branches, ambos pasos corren automáticamente.
- Verificar que el flujo funciona en un PR de prueba

**2.7 Supabase clients (`@supabase/ssr`)**
- `lib/supabase/server.ts` — cliente server-side leyendo cookies
- `lib/supabase/client.ts` — cliente browser
- `lib/supabase/middleware.ts` — helper de refresh de sesión

**2.8 Middleware raíz (`middleware.ts`)**
- Refresca sesión Supabase
- Aplica routing de next-intl
- Protege rutas privadas: si no hay sesión, redirige a `/login`
- **(O6) Detecta onboarding incompleto**: si miembro tiene `onboarding_completado = false`, redirige a `/onboarding` desde cualquier ruta privada que no sea ella misma
- Excepciones de localización: `/auth/callback` y rutas de API no requieren prefijo `[locale]`

**2.9 next-intl**
- Configurar en `i18n.ts` los locales `es` y `en`, default `es`
- Crear `messages/es.json` con strings de UI base (login, onboarding, navegación, errores) — completo
- Crear `messages/en.json` con subconjunto: solo lo necesario para rutas públicas que se pueden visitar en inglés (manifiesto puede ser placeholder con string "Manifesto coming soon" si el contenido aún no se traduce — el render bilingüe real entra cuando se traduzca el manifiesto en sprint posterior)
- Segmento `[locale]` en `app/`
- `app/layout.tsx` raíz mínimo + `app/[locale]/layout.tsx` con provider de next-intl
- Generar `app/sitemap.ts` bilingüe básico (se enriquece en Sprint 8)

**2.10 Auth callback**
- `app/auth/callback/route.ts` — intercambia code por sesión usando `@supabase/ssr`
- Redirección post-login: si onboarding completo → `/dashboard`, si no → `/onboarding`

### Bloque 3 — Limpieza de deuda técnica (Sección 9 de ARQUITECTURA.md)

Ejecutar el bloque de limpieza completo:

1. Eliminar archivos huérfanos: `components/sections/Archive.tsx`, `components/sections/Voces.tsx`, `lib/useReveal.ts`
2. Sacar `TweaksWidget` del bundle de producción (mover a `components/dev/` y envolver render en `process.env.NODE_ENV === 'development'`)
3. Verificar dominio en Resend (parte del Bloque 1.2)
4. Parametrizar email en `app/api/contact/route.ts` con `CONTACT_TO`, `CONTACT_FROM` desde env
5. Reescribir `README.md` al estado real del proyecto (stack, setup local, variables de entorno, scripts disponibles, cómo correr en preview, cómo aplicar migraciones + policies)
6. Consolidar tokens duplicados: crear `styles/tokens.ts` como source of truth, generar `styles/tokens.css` al build, ajustar `globals.css` para consumir variables generadas, `lib/tokens.ts` re-exporta o se elimina

### Bloque 4 — CI/CD

**4.1 GitHub Actions**
- Workflow `ci.yml`: en cada PR ejecuta `prisma validate`, lint (ESLint), typecheck (`tsc --noEmit`), format check (Prettier)
- Workflow falla el PR si alguno de los pasos falla
- Configurar ESLint y Prettier con reglas estándar de Next.js + TypeScript

**4.2 `.env.example`**
- Archivo con todas las variables necesarias documentadas, sin valores reales
- Incluir cada variable mencionada en `docs/sprints/sprint-0/ARQUITECTURA.md` §10

### Bloque 5 — Integración de observaciones diferibles a ARQUITECTURA.md

Ampliar la Sección 13 de `docs/sprints/sprint-0/ARQUITECTURA.md` con las observaciones diferibles del review (O7, O8, O9, O10):

- **O7 — Integridad referencial de Conexion** (DIFERIBLE, Sprint 7)
- **O8 — Política de degradación de Resend** (DIFERIBLE, antes de tráfico real)
- **O9 — Supuestos de volumen explícitos** (DIFERIBLE, documentación)
- **O10 — UI bilingüe vs contenido público bilingüe** (DIFERIBLE, documentación)

Estas no se implementan en Sprint 1, solo se registran en el documento de arquitectura para preservar trazabilidad de decisiones.

---

## CRITERIOS DE ACEPTACIÓN DEL SPRINT 1

Este sprint se cierra cuando todos estos criterios pasan, comprobables manualmente o vía CI:

1. `prisma migrate deploy` aplica sin errores en preview branch y en main
2. `npm run db:setup` aplica schema + policies en orden, en cualquier rama, sin intervención manual
3. Un PR de prueba dispara: preview deployment en Vercel + branch de Supabase + ambos sincronizados con migraciones + policies aplicadas
4. Un nuevo usuario completa flujo: `JoinOverlay` → email → magic link recibido vía Resend desde `no-reply@speculativefutures.mx` → `/auth/callback` → sesión activa
5. Trigger `handle_new_user` crea `Miembro` con `capitulo_id = cdmx`, `rol_contribucion = regular`, `onboarding_completado = false` al insertar en `auth.users`
6. Middleware redirige a `/onboarding` si miembro logueado intenta acceder a `/dashboard` sin onboarding completo
7. Middleware redirige a `/login` si visitante anónimo intenta acceder a ruta privada
8. Seed crea: 1 capítulo `cdmx`, 5 territorios, 1 aliado fundador Change, 1 Miembro con rol `curador_core`
9. RLS de tabla Senial: cliente anónimo solo ve señales con `estado = 'publicada'`; cliente autenticado como curador_core ve borradores y en_revision
10. RLS de Storage: bucket `avatars/` permite lectura pública; bucket `dossiers/` rechaza lectura desde cliente anónimo
11. `/es` resuelve a home en español; `/en` resuelve a home con banner "Some content available in English" y navegación en español (UI bilingüe no implementada en este sprint, solo rutas)
12. Archivos huérfanos eliminados: `Archive.tsx`, `Voces.tsx`, `useReveal.ts` no existen en el repo
13. `next build` en modo producción no incluye `TweaksWidget` en el bundle (verificable con bundle analyzer o grep)
14. `app/api/contact` lee destinatario y remitente desde env, sin literales hardcoded
15. `README.md` describe stack real, setup, variables de entorno, scripts; sin texto residual de handoff de diseño
16. `styles/tokens.ts` existe como único source of truth; `globals.css` consume variables generadas; sin duplicación con `lib/tokens.ts`
17. CI verde: `prisma validate`, lint, typecheck, format check pasan en main y en cualquier PR abierto
18. `.env.example` documenta todas las variables sin valores reales
19. Sección 13 de `ARQUITECTURA.md` ampliada con O7, O8, O9, O10

---

## RESTRICCIONES DE EJECUCIÓN

- **No construir UI de módulos** (membresía, eventos, señales, editorial, perfiles, dashboards). Solo lo mínimo para verificar auth: el `JoinOverlay` existente evoluciona a captura real de email, `/onboarding` puede ser placeholder funcional, `/dashboard` puede ser placeholder con texto "bienvenido" — nada más.
- **No habilitar Google OAuth** (queda diferido a sprint posterior si se solicita explícitamente)
- **No construir componentes shadcn/ui** todavía
- **No traducir el manifiesto al inglés** ni crear contenido bilingüe real (eso es Sprint 6)
- **No tocar archivos en `docs/sprints/sprint-0/`** salvo la ampliación de Sección 13 en `ARQUITECTURA.md`. Mantener la regla de no editar registro histórico.

---

## ENTREGABLES Y VERSIONADO

Al cierre del sprint, generar en `docs/sprints/sprint-1/`:

- `ENTREGABLE.md` — reporte estructurado del sprint:
  - Qué se construyó
  - Decisiones tomadas durante construcción (si las hubo)
  - Desviaciones del plan (si las hubo) con justificación
  - Estado de cada criterio de aceptación (cumplido / parcial / no cumplido + motivo)
  - Configuración de servicios externos documentada (sin credenciales reales)
  - Variables de entorno requeridas para correr el proyecto

- Si surgieron conflictos con el prompt o con `ARQUITECTURA.md`, señalarlos explícitamente en `ENTREGABLE.md` sin resolverlos unilateralmente.

Commit final con prefijo `feat(sprint-1):` para los cambios de código y `docs(sprint-1): add entregable` para el documento.

---

## SIGUIENTE PASO OBLIGATORIO

Cuando el sprint termine:

1. `ENTREGABLE.md` queda versionado en `docs/sprints/sprint-1/`
2. El documento regresa al chat estratégico para revisión arquitectónica
3. **Sprint 2 NO inicia sin `REVISION.md` aprobada del Sprint 1**, conforme a `CLAUDE.md`

---

*Speculative Futures CDMX · Prompt Sprint 1 · v1.0*
*Change Consulting · Mayo 2026*
