# Speculative Futures CDMX — Sprint 0 Incremental

## Documento de Arquitectura de la Web App

### Change Consulting · Mayo 2026 · v1.2

---

## Preámbulo

Este documento evoluciona el estado actual del proyecto (landing page funcional en `speculativefutures.mx`) hacia la web app completa definida en `docs/strategy/LINEAMIENTOS.md`. No se escribe código de producto en este sprint: solo arquitectura y el esquema de datos (`prisma/schema.prisma`).

**Jerarquía de fuentes:** ante conflicto, prevalece `docs/strategy/LINEAMIENTOS.md`. Los conflictos detectados se señalan explícitamente en cada sección y se consolidan en la Sección 13; no se resuelven unilateralmente.

**Alcance del MDP:** mínimo _deseable_ de producto (no MVP). Todos los módulos de las cuatro olas entran completos. La infraestructura de multi-capítulo y monetización se prepara dormida, sin UX activa.

---

## Sección 1 — Inventario evolutivo

Mapeo del estado actual (`INVENTARIO_TECNICO.md`) contra el destino. Cuatro listas.

### 1.1 Se conserva sin cambios

| Elemento                                                                                                                  | Justificación                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Next.js 14.2.29 App Router + React 18 + TypeScript estricto                                                               | Stack base decidido, sin reabrir.                                                            |
| `app/layout.tsx` (estructura raíz, `lang`, metadata base)                                                                 | Evoluciona con i18n pero el patrón se conserva.                                              |
| `app/globals.css` como hoja global                                                                                        | Se conserva como destino de variables CSS generadas (ver §8); cambia su _origen_, no su rol. |
| Fuentes Gotham auto-hospedadas (`public/fonts/`) + `@font-face`                                                           | Identidad de marca. Sin cambio.                                                              |
| Componentes de marca: `WLogo`, `WIsotype`, `WBtn`, `WTag`, `Eyebrow`, `NodeNetwork`, `Reveal`, `Duotone`, `InstagramLink` | Sistema visual fundacional. Se reubican (ver §3) pero no se reescriben.                      |
| Secciones de marca: `Hero`, `Manifesto`, `Territorios`, `Footer`, `Nav`, `NextEvent`                                      | Se vuelven _data-driven_ en Ola 1 (leen del backend) pero conservan su diseño.               |
| `app/api/contact/route.ts` (envío vía Resend)                                                                             | Se conserva; se corrige hardcoding (ver §9).                                                 |
| Overlays `JoinOverlay`, `ComunidadOverlay`, `ContactFormOverlay`, `Overlay`                                               | Base reutilizable; `ComunidadOverlay` se sustituye por auth real (ver 1.2).                  |
| `app/icon.svg` (favicon isotipo)                                                                                          | Sin cambio.                                                                                  |
| Hosting Vercel + integración GitHub→Vercel                                                                                | Sin cambio; se amplía con database branching (§10).                                          |
| Tokens en `lib/tokens.ts` (paleta `C`, `FONT`, `meta`)                                                                    | Sobreviven como _insumo_ del source-of-truth consolidado (ver §8).                           |

### 1.2 Se refactora

| Elemento                                                                 | Qué cambia                                                                                         | Por qué                                                                                                    |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Sistema de tokens** (`lib/tokens.ts` + variables CSS en `globals.css`) | Unificar en un único source-of-truth TS que genera las variables CSS al build.                     | El inventario documenta duplicación de tokens (deuda #3). Lineamientos §estilos exige tokens consolidados. |
| **`app/layout.tsx` y enrutado**                                          | Introducir segmento `[locale]` y proveedor de `next-intl`; mover la home actual a ruta localizada. | i18n nativo desde Sprint 1 (lineamientos §5).                                                              |
| **Componentes de sección de marca**                                      | Pasan de contenido hardcodeado a props alimentadas desde Prisma/Supabase.                          | Lineamientos Ola 1: "Home dinámico (lee del backend)".                                                     |
| **`ComunidadOverlay`**                                                   | De placeholder "Próximamente" a flujo real de login (magic link / Google).                         | Lineamientos §1: auth email + magic link.                                                                  |
| **`JoinOverlay`**                                                        | De simulación de éxito a alta real de miembro + disparo de onboarding.                             | Lineamientos §1: registro abierto.                                                                         |
| **`api/contact/route.ts`**                                               | Parametrizar destinatario/remitente por entorno; verificar dominio en Resend.                      | Deuda #5/#6 del inventario.                                                                                |
| **`Reveal.tsx` / `NodeNetwork.tsx`**                                     | Consolidar la lógica triplicada de IntersectionObserver en un único hook.                          | Deuda #2 del inventario (la versión limpia reemplaza a `lib/useReveal.ts`, hoy huérfano).                  |
| **`Territorios.tsx`**                                                    | Lee los cinco territorios desde la tabla `territorio` (seed) en vez de array local.                | Entidad `Territorio` (lineamientos).                                                                       |
| **`README.md`**                                                          | Reescribir al estado real del proyecto.                                                            | Deuda #11 del inventario.                                                                                  |

### 1.3 Se añade desde cero

| Categoría           | Elementos                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Datos               | Supabase PostgreSQL (Pro), Prisma ORM, `prisma/schema.prisma` (este sprint), migraciones (Sprint 1), seeds (capítulo `cdmx`, 5 territorios, aliado Change). |
| Auth                | Supabase Auth + `@supabase/ssr`, Resend como SMTP custom, middleware de protección, trigger de sincronización `auth.users → miembro`, templates de email.   |
| Permisos            | Row Level Security (SQL) + verificación en server actions.                                                                                                  |
| i18n                | `next-intl`, `messages/es.json`, `messages/en.json`, routing `[locale]`, hreflang, sitemap bilingüe.                                                        |
| Storage             | Buckets de Supabase Storage (`avatars/`, `eventos/`, `dossiers/`, `aliados/`).                                                                              |
| Módulos de producto | Membresía/perfiles/onboarding, eventos/RSVP, señales + dashboard de curación, piezas editoriales, aliados, conexiones, dashboards por rol, configuración.   |
| UI                  | shadcn/ui con override total a tokens; CSS Modules para componentes nuevos.                                                                                 |
| Tooling             | ESLint/Prettier, GitHub Actions (lint + `prisma validate` + typecheck), `.env.example`.                                                                     |
| Infra dormida       | Entidades `Plan`, `Suscripcion`, `Sponsor`; campo `acceso_premium`; feature flag `senales_publicacion_directa_modelo_2`.                                    |

### 1.4 Se elimina antes del Sprint 1 (tarea de limpieza, no sprint)

| Elemento                             | Acción                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| `components/sections/Archive.tsx`    | Eliminar (huérfano; se reconstruye data-driven en Ola 2).                      |
| `components/sections/Voces.tsx`      | Eliminar (huérfano; perfiles de miembros lo sustituyen en Ola 1).              |
| `lib/useReveal.ts`                   | Eliminar (huérfano; lógica consolidada en el hook refactorizado).              |
| `TweaksWidget` en producción         | Sacar del render de producción; dejar tras flag de entorno solo en desarrollo. |
| Hardcoding de email en `api/contact` | Reemplazar por variables de entorno.                                           |

Detalle operativo con criterios de "hecho" en la **Sección 9**.

---

## Sección 2 — Modelo de datos (Prisma)

El esquema completo y **validado** vive en `prisma/schema.prisma`. Validación verificada con **Prisma 6.18** (`npx prisma@6 validate` → _"The schema is valid"_, exit 0).

> **Versión de Prisma (decisión):** se fija **Prisma 6.x** para el MDP. Prisma 7 (lanzado recientemente) introdujo un cambio incompatible: `url`/`directUrl` salen del bloque `datasource` del schema y pasan a `prisma.config.ts`. La combinación Supabase + Prisma 6 con `datasource { url, directUrl }` es la documentada y estable hoy. La migración a Prisma 7 se registra como decisión DIFERIBLE (Sección 13).

Resumen de entidades:

| Entidad                          | Propósito                                                | Notas clave                                                                                                                                                                                                     |
| -------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Capitulo`                       | Capítulo de la red; un registro `cdmx` en MDP.           | `capitulo_id` en todas las entidades centrales.                                                                                                                                                                 |
| `Miembro`                        | Persona registrada; extiende `auth.users` por `user_id`. | `rol_contribucion`, `seniales_publicadas_aprobadas` (derivado de `RevisionSenial` con `estado=aprobada`), `email` único por capítulo, `aliado_fundador_id` + `rol_en_aliado` (afiliación, sin rol especial).    |
| `Territorio`                     | Taxonomía fija de cinco.                                 | Seed inicial; `@@unique([capitulo_id, codigo])`.                                                                                                                                                                |
| `Senial`                         | Unidad de inteligencia.                                  | Enums `tipo`/`estado`, `idiomas[]`, `auditada`, índices por territorio/estado/fecha.                                                                                                                            |
| `RevisionSenial`                 | Feedback + decisión editorial de curación, por ronda.    | Entidad separada (confirmada). Campos: `senial_id`, `revisor_id` (curador_core), `estado` (aprobada/rechazada/requiere_edicion), `comentario_editorial`, `ronda`, `fecha_revision`. Múltiples rondas por señal. |
| `Evento`                         | Producción de la comunidad.                              | `modalidad`, `ponentes` (JSON), `idiomas[]`, m2m con señales discutidas.                                                                                                                                        |
| `RSVP`                           | Miembro × Evento.                                        | `@@unique([miembro_id, evento_id])`.                                                                                                                                                                            |
| `PiezaEditorial`                 | Ensayo/dossier/reporte/briefing.                         | `acceso_premium` default false, m2m con señales referenciadas.                                                                                                                                                  |
| `AliadoFundador`                 | Institución aliada.                                      | Seed Change · Futurist.mx; `representantes` (miembros).                                                                                                                                                         |
| `Conexion`                       | Relaciones tipadas y polimórficas.                       | Sin FK (entidades heterogéneas); integridad en aplicación.                                                                                                                                                      |
| `Plan`, `Suscripcion`, `Sponsor` | Monetización dormida.                                    | Sin lógica en MDP; presentes desde día uno.                                                                                                                                                                     |

**Enums de estado** definidos: `RolContribucion`, `EstadoMiembro`, `TipoSenial`, `EstadoSenial`, `HorizonteTemporal`, `DecisionRevision`, `ModalidadEvento`, `EstadoEvento`, `EstadoRSVP`, `TipoPieza`, `EstadoPieza`, `TipoAliado`, `RolAliado`, `TipoRelacion`, `EntidadTipo`, `EstadoSuscripcion`.

**Vínculo con Supabase Auth:** Supabase gestiona `auth.users`. `Miembro.user_id` (UUID) referencia ese registro. No se crea tabla de tokens de magic link (Supabase la gestiona). La creación del `Miembro` se resuelve por **trigger PostgreSQL** (ver §5).

**Decisiones resueltas por el chat estratégico (correcciones aprobadas, incorporadas):**

1. **`RevisionSenial` — entidad separada (confirmada).** No es un campo en `Senial`. Soporta múltiples rondas (`ronda: Int`), feedback (`comentario_editorial`) y decisión (`estado`: aprobada | rechazada | requiere_edicion). El revisor es un Miembro con rol `curador_core`. El contador `Miembro.seniales_publicadas_aprobadas` se calcula contra los registros de `RevisionSenial` con `estado = aprobada`. Constraint `@@unique([senial_id, ronda])`.
2. **`HorizonteTemporal` (valores confirmados):** `ahora | emergente | mediano | largo | horizonte`.
3. **`EstadoEvento` (valores confirmados):** `borrador | programado | lleno | en_curso | realizado | cancelado | pospuesto`.
4. **`Miembro.aliado_fundador_id` (confirmado):** FK opcional muchos-a-uno + `rol_en_aliado` (texto libre). **No** otorga `rol_contribucion` especial — es afiliación institucional; el rol de permisos `aliado_fundador` se deriva del vínculo a nivel de aplicación.

**Decisión diferida (registrada en Sección 13 y en el registro de deuda):**

5. **Notificaciones** — se resuelven por email transaccional (Resend), sin entidad `Notificacion` en el MDP. _DIFERIBLE._

---

## Sección 3 — Estructura de carpetas evolucionada

Organización **por feature/dominio** dentro de `app/`, con capas compartidas (`lib/`, `components/`, `styles/`, `messages/`, `prisma/`). Justificación: el MDP tiene dominios claros (señales, eventos, editorial, miembros) que conviene aislar; lo transversal (UI, tokens, clientes) se comparte.

```
/
├── app/
│   ├── [locale]/                      # segmento de idioma (next-intl)
│   │   ├── layout.tsx                  # provider i18n + shell
│   │   ├── page.tsx                    # home dinámico
│   │   ├── manifiesto/page.tsx
│   │   ├── territorios/page.tsx
│   │   ├── eventos/
│   │   │   ├── page.tsx                # listado
│   │   │   └── [slug]/page.tsx         # detalle + RSVP
│   │   ├── senales/
│   │   │   ├── page.tsx                # archivo (miembros)
│   │   │   └── [id]/page.tsx
│   │   ├── editorial/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── aliados/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── miembros/[id]/page.tsx      # perfil público de miembro
│   │   ├── (auth)/                     # grupo sin layout de marca
│   │   │   ├── login/page.tsx
│   │   │   └── onboarding/page.tsx
│   │   └── (app)/                      # grupo privado (requiere login)
│   │       ├── dashboard/page.tsx      # dashboard de miembro
│   │       ├── curacion/page.tsx       # dashboard de curación (curadores)
│   │       └── configuracion/page.tsx
│   ├── api/
│   │   └── contact/route.ts            # existente (se parametriza)
│   ├── auth/callback/route.ts          # callback de Supabase Auth (añadir)
│   ├── icon.svg
│   ├── sitemap.ts                      # sitemap bilingüe (añadir)
│   └── globals.css                     # variables CSS generadas + base
│
├── components/
│   ├── brand/                          # WLogo, WIsotype, WBtn, WTag, Eyebrow…
│   ├── sections/                       # Hero, Manifesto, Territorios, Footer, Nav…
│   ├── overlays/                       # Overlay, Join, ContactForm…
│   ├── ui/                             # shadcn/ui (override a tokens)
│   └── dev/                            # TweaksWidget (solo desarrollo, tras flag)
│
├── features/                           # lógica de dominio (server actions, queries)
│   ├── miembros/
│   ├── eventos/
│   ├── senales/
│   ├── editorial/
│   ├── aliados/
│   └── conexiones/
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts                   # cliente server (@supabase/ssr)
│   │   ├── client.ts                   # cliente browser
│   │   └── middleware.ts               # helper de sesión
│   ├── prisma.ts                       # singleton de PrismaClient
│   ├── auth/                           # helpers de rol/permiso
│   └── reveal.ts                       # hook consolidado (sustituye useReveal)
│
├── prisma/
│   ├── schema.prisma                   # ESTE SPRINT
│   ├── migrations/                     # Sprint 1+
│   └── seed.ts                         # capítulo, territorios, aliado (Sprint 1)
│
├── messages/
│   ├── es.json
│   └── en.json
│
├── styles/
│   ├── tokens.ts                       # source-of-truth de diseño
│   └── tokens.css                      # variables CSS generadas desde tokens.ts
│
├── public/fonts/                       # Gotham (existente)
├── supabase/                           # migraciones SQL de RLS, triggers, storage
│   └── policies/                       # .sql versionados
├── middleware.ts                       # i18n + protección de rutas (raíz)
├── components.json                     # config shadcn/ui
└── .env.example                        # plantilla de variables
```

**Decisiones estructurales:**

- `features/` separa la lógica de dominio (queries Prisma, server actions, validaciones) de la presentación en `app/` y `components/`. Evita server actions dispersas.
- `components/dev/` aísla herramientas de desarrollo (TweaksWidget) fuera del bundle de producción.
- `supabase/` versiona el SQL que Prisma no gestiona (RLS, triggers, buckets) — fuente de verdad de la capa DB-nativa.
- Grupos de ruta `(auth)` y `(app)` separan layouts (marca vs. aplicación) sin afectar el path.

---

## Sección 4 — Mapa de rutas

Todas las rutas bajo prefijo `[locale]`. "Idiomas" indica si la ruta sirve contenido bilingüe (es+en) o solo español; toda la app _navega_ en es por defecto.

| Path                          | Tipo                                          | Idiomas                            | Ola                        |
| ----------------------------- | --------------------------------------------- | ---------------------------------- | -------------------------- |
| `/[locale]` (home)            | Pública                                       | Home siempre es; banner a en       | 1                          |
| `/[locale]/manifiesto`        | Pública                                       | es + en                            | 1                          |
| `/[locale]/territorios`       | Pública                                       | es (en diferible)                  | 1                          |
| `/[locale]/eventos`           | Pública                                       | es (en si ponente intl.)           | 1                          |
| `/[locale]/eventos/[slug]`    | Pública (RSVP requiere login)                 | es / es+en                         | 1                          |
| `/[locale]/aliados`           | Pública                                       | es + en (perfiles institucionales) | 1                          |
| `/[locale]/aliados/[slug]`    | Pública                                       | es + en                            | 1                          |
| `/[locale]/login`             | Pública                                       | es                                 | 1                          |
| `/[locale]/onboarding`        | Requiere login                                | es                                 | 1                          |
| `/[locale]/dashboard`         | Requiere login (miembro)                      | es                                 | 1                          |
| `/[locale]/configuracion`     | Requiere login (miembro)                      | es                                 | 1                          |
| `/[locale]/miembros/[id]`     | Requiere login                                | es                                 | 1                          |
| `/[locale]/senales`           | Requiere login (archivo completo)             | es                                 | 2                          |
| `/[locale]/senales/[id]`      | Pública si destacada; completa requiere login | es                                 | 2                          |
| `/[locale]/curacion`          | Requiere rol curador_comunidad/core           | es                                 | 2                          |
| `/[locale]/eventos/archivo`   | Pública                                       | es                                 | 2                          |
| `/[locale]/editorial`         | Pública (premium dormido)                     | es / es+en                         | 3                          |
| `/[locale]/editorial/[slug]`  | Pública                                       | es / es+en                         | 3                          |
| `/[locale]/conexiones`        | Requiere login                                | es                                 | 3                          |
| `/auth/callback`              | Sistema (OAuth/magic link)                    | —                                  | 1                          |
| `/sitemap.xml`, `/robots.txt` | Sistema                                       | bilingüe                           | 1 (SEO base), 4 (completo) |

Porción curada de señales destacadas en home/`senales/[id]` es pública (lineamientos: visitante ve "porción curada de señales destacadas").

---

## Sección 5 — Arquitectura de autenticación

**Stack:** Supabase Auth (magic link + Google OAuth opcional) + Resend como SMTP custom + `@supabase/ssr` para App Router.

### 5.1 Providers

- **Magic link (email OTP)** — método primario, sin contraseña (lineamientos §1: fricción mínima).
- **Google OAuth** — opcional, habilitado en Supabase Dashboard (Auth → Providers).

### 5.2 Resend como SMTP custom (obligatorio)

Supabase Pro **no** elimina el límite nativo de 4 emails/hora del SMTP integrado; por eso Resend como SMTP custom es obligatorio. Configuración (Sprint 1, Supabase Dashboard):

1. **Resend:** verificar dominio `speculativefutures.mx` (DNS: SPF, DKIM, DMARC). Crear API key. Crear credencial SMTP en Resend (host `smtp.resend.com`, puerto `465`, usuario `resend`, contraseña = API key).
2. **Supabase Dashboard → Project Settings → Authentication → SMTP Settings → Enable Custom SMTP:**
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: `<RESEND_API_KEY>`
   - Sender email: `no-reply@speculativefutures.mx`
   - Sender name: `Speculative Futures CDMX`
3. **Rate limits:** ajustar en Auth → Rate Limits acorde al free tier de Resend (3,000/mes).
4. **Templates:** Auth → Email Templates → personalizar (registro, magic link, recuperación, cambio de email).

### 5.3 Templates de email

Coherentes con la identidad: fondo petróleo `#062424`, acento menta `#66EBAC`, isotipo, tipografía de sistema (email-safe). Cuerpo en español. Tres templates mínimos: **Confirmar acceso (magic link)**, **Registro/bienvenida**, **Recuperación**. Diseño análogo al HTML ya usado en `api/contact`.

### 5.4 Flujo de onboarding (landing → primer login)

1. Visitante envía email en `JoinOverlay` / `/login`.
2. Supabase Auth envía magic link (vía Resend).
3. Click → `/auth/callback` intercambia el code por sesión (`@supabase/ssr`).
4. Trigger crea el `Miembro` base (ver 5.6).
5. Middleware detecta onboarding incompleto → redirige a `/onboarding`.
6. Miembro completa campos obligatorios (nombre, disciplina, territorios, motivación, casilla curador).
7. Si activa casilla → `rol_contribucion = curador_comunidad` con `seniales_publicadas_aprobadas = 0` (estado de calibración derivado).
8. Redirige a `/dashboard`.

### 5.5 Sesiones en App Router

- **Server Components / server actions:** cliente server de `@supabase/ssr` leyendo cookies (`lib/supabase/server.ts`).
- **Client Components:** cliente browser (`lib/supabase/client.ts`) solo para interacciones reactivas.
- **`middleware.ts` (raíz):** refresca sesión, aplica i18n y protege rutas privadas (redirige a `/login` si no hay sesión; a `/onboarding` si falta).

### 5.6 Sincronización auth.users → Miembro: **trigger PostgreSQL** (decisión)

Opciones consideradas:

- **(A) Trigger PostgreSQL** `on auth.users insert` que inserta `miembro`.
- **(B) Lógica de aplicación** en el callback/server action.

**Recomendación: (A) trigger.** Garantiza que todo `auth.users` tenga su `miembro` aunque el alta ocurra por OAuth, panel admin o cualquier vía, sin depender de que la app ejecute código. Reduce estados inconsistentes.

```sql
-- supabase/policies/00_trigger_miembro.sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  cdmx_id uuid;
begin
  select id into cdmx_id from public.capitulo where codigo = 'cdmx' limit 1;
  insert into public.miembro (id, user_id, capitulo_id, nombre, email, rol_contribucion, estado, fecha_registro, updated_at)
  values (gen_random_uuid(), new.id, cdmx_id,
          coalesce(new.raw_user_meta_data->>'full_name', ''),
          new.email, 'regular', 'activo', now(), now());
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

Los campos de onboarding (disciplina, territorios, motivación) se completan después vía server action; el trigger solo crea el registro base.

---

## Sección 6 — Sistema de roles y permisos

Dos capas: **RLS en la DB** (protege el acceso del cliente Supabase `anon`/`authenticated`) + **verificación en server actions** (Prisma se conecta con rol privilegiado que _bypassa_ RLS, por lo que la autorización de las mutaciones server-side se valida explícitamente en aplicación). Ambas capas son obligatorias.

### 6.1 Roles

`visitante` (sin login) · `miembro` · `curador_comunidad` · `curador_core` · `aliado_fundador`. `curador_*` derivan de `rol_contribucion`; `aliado_fundador` deriva de `Miembro.aliado_fundador_id` no nulo.

### 6.2 Matriz Rol × Acción × Recurso

| Recurso · Acción                  | visitante |  miembro   | curador_comunidad | curador_core | aliado_fundador |
| --------------------------------- | :-------: | :--------: | :---------------: | :----------: | :-------------: |
| Señales · leer (destacadas)       |     ✓     |     ✓      |         ✓         |      ✓       |        ✓        |
| Señales · leer (archivo completo) |     —     |     ✓      |         ✓         |      ✓       |        ✓        |
| Señales · proponer                |     —     |     —      |         ✓         |      ✓       |        —        |
| Señales · publicar directo        |     —     |     —      | ✓ (si ≥3 aprob.)  |      ✓       |        —        |
| Señales · aprobar propuestas      |     —     |     —      |         —         |      ✓       |        —        |
| Señales · editar propias          |     —     |     —      |         ✓         |      ✓       |        —        |
| Señales · eliminar                |     —     |     —      |         —         |      ✓       |        —        |
| Eventos · leer                    |     ✓     |     ✓      |         ✓         |      ✓       |        ✓        |
| Eventos · RSVP                    |     —     |     ✓      |         ✓         |      ✓       |        ✓        |
| Eventos · crear/editar/cancelar   |     —     |     —      |         —         |      ✓       |        —        |
| Piezas · leer                     |     ✓     |     ✓      |         ✓         |      ✓       |  ✓ (+premium)   |
| Piezas · crear/editar/publicar    |     —     |     —      |         —         |      ✓       |        —        |
| Aliados · leer                    |     ✓     |     ✓      |         ✓         |      ✓       |        ✓        |
| Aliados · editar perfil propio    |     —     |     —      |         —         |      ✓       |   ✓ (el suyo)   |
| Aliados · gestionar (alta/baja)   |     —     |     —      |         —         |      ✓       |        —        |
| Configuración · ver/editar        |     —     | ✓ (propia) |    ✓ (propia)     | ✓ (sistema)  |   ✓ (propia)    |

**Calibración de señales (lineamientos §2):** `curador_comunidad` con `seniales_publicadas_aprobadas < 3` → la señal entra en `estado = en_revision`; con `≥ 3` → `estado = publicada` con `auditada = false`. Lógica en server action (no en RLS, por requerir conteo + reglas de negocio). Feature flag `senales_publicacion_directa_modelo_2` (default false) salta la calibración cuando se active.

### 6.3 Políticas RLS (SQL ejecutable)

Helper de rol (lee `rol_contribucion` del miembro autenticado):

```sql
-- supabase/policies/01_helpers.sql
create or replace function public.current_miembro_id()
returns uuid language sql stable as $$
  select id from public.miembro where user_id = auth.uid()
$$;

create or replace function public.current_rol()
returns text language sql stable as $$
  select rol_contribucion::text from public.miembro where user_id = auth.uid()
$$;

create or replace function public.es_curador_core()
returns boolean language sql stable as $$
  select coalesce(public.current_rol() = 'curador_core', false)
$$;
```

```sql
-- supabase/policies/02_senial.sql
alter table public.senial enable row level security;

-- Lectura: señales publicadas para todos; borradores/revisión solo autor o core.
create policy senial_select_publicada on public.senial
  for select using (estado = 'publicada');

create policy senial_select_propia_o_core on public.senial
  for select using (curador_id = public.current_miembro_id() or public.es_curador_core());

-- Inserción: solo curadores.
create policy senial_insert_curadores on public.senial
  for insert with check (
    public.current_rol() in ('curador_comunidad','curador_core')
    and curador_id = public.current_miembro_id()
  );

-- Edición: autor (propias) o core (cualquiera).
create policy senial_update_autor_o_core on public.senial
  for update using (curador_id = public.current_miembro_id() or public.es_curador_core());

-- Borrado: solo core.
create policy senial_delete_core on public.senial
  for delete using (public.es_curador_core());
```

```sql
-- supabase/policies/03_evento_rsvp.sql
alter table public.evento enable row level security;
alter table public.rsvp   enable row level security;

create policy evento_select_publicos on public.evento
  for select using (
    estado in ('programado','lleno','en_curso','realizado','pospuesto')
    or public.es_curador_core()
  );
create policy evento_cud_core on public.evento
  for all using (public.es_curador_core()) with check (public.es_curador_core());

create policy rsvp_select_propio on public.rsvp
  for select using (miembro_id = public.current_miembro_id() or public.es_curador_core());
create policy rsvp_insert_propio on public.rsvp
  for insert with check (miembro_id = public.current_miembro_id());
create policy rsvp_delete_propio on public.rsvp
  for delete using (miembro_id = public.current_miembro_id());
```

```sql
-- supabase/policies/04_pieza_aliado.sql
alter table public.pieza_editorial enable row level security;
alter table public.aliado_fundador enable row level security;

create policy pieza_select_publicada on public.pieza_editorial
  for select using (estado = 'publicada');
create policy pieza_cud_core on public.pieza_editorial
  for all using (public.es_curador_core()) with check (public.es_curador_core());

create policy aliado_select_todos on public.aliado_fundador
  for select using (true);
create policy aliado_update_core_o_propio on public.aliado_fundador
  for update using (
    public.es_curador_core()
    or id = (select aliado_fundador_id from public.miembro where user_id = auth.uid())
  );
create policy aliado_insert_delete_core on public.aliado_fundador
  for all using (public.es_curador_core()) with check (public.es_curador_core());
```

```sql
-- supabase/policies/05_miembro.sql
alter table public.miembro enable row level security;

-- Cada quien lee/edita su propio registro; los demás perfiles son visibles a miembros logueados.
create policy miembro_select_logueados on public.miembro
  for select using (auth.uid() is not null);
create policy miembro_update_propio on public.miembro
  for update using (user_id = auth.uid());
```

> Nota: las mutaciones críticas (calibración de señales, transición de estados, conteos) se ejecutan vía server actions con Prisma + verificación de rol en aplicación; RLS es la red de seguridad para accesos directos del cliente. Las políticas anteriores son la base mínima; cada sprint que toque una tabla añade/afsina sus políticas.

---

## Sección 7 — Estrategia de i18n (next-intl)

- **Archivos:** `messages/es.json` (completo), `messages/en.json` (subconjunto: manifiesto, reportes, dossiers premium, eventos con ponente internacional, perfiles de aliados).
- **Routing con prefijo:** `/es/...` y `/en/...` vía segmento `[locale]` + `middleware.ts`. Locale por defecto `es`.
- **Detección de navegador en home:** si `Accept-Language` es inglés, mostrar banner sutil _"Some content available in English"_ con link a las piezas en inglés. **La home siempre se sirve en español** (identidad CDMX) — no se redirige por idioma.
- **Contenido por pieza:** campo `idiomas` (`['es']` o `['es','en']`). Una pieza con un solo idioma muestra solo ese idioma; **no** se traduce automáticamente ni se fuerza redirección (lineamientos §5).
- **SEO bilingüe:** `hreflang` recíprocos por par de URLs, `<html lang>` dinámico, `app/sitemap.ts` genera entradas por idioma disponible de cada pieza, `og:locale` por ruta.
- **Contribuciones de miembros:** quedan en su idioma original; nunca se traducen automáticamente.

---

## Sección 8 — Sistema de estilos

- **Source of truth único:** `styles/tokens.ts` (colores, espaciado, tipografía, breakpoints, radios, motion). Consolida `lib/tokens.ts` + las 35 variables de `globals.css`, eliminando la duplicación (deuda #3).
- **Generación de variables CSS:** un script de build deriva `styles/tokens.css` (`:root { --sf-* }`) desde `tokens.ts`, importado por `globals.css`. Una sola edición propaga a JS y CSS.
- **Componentes nuevos:** **CSS Modules** por componente (`Componente.module.css`) consumiendo las variables generadas.
- **Componentes existentes:** se mantienen con su estilo actual (inline) salvo refactor explícito por feature; no hay reescritura masiva.
- **shadcn/ui:** se instala con `components.json` apuntando a las variables del proyecto; **override completo** del tema de shadcn a los tokens SF (no se usan los defaults de shadcn). Se adoptan primitivas accesibles (dialog, dropdown, form, toast) re-vestidas con la identidad.

---

## Sección 9 — Plan de limpieza de deuda técnica (antes del Sprint 1)

| #   | Tarea                                                   | Criterio de "hecho"                                                                                                                     |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Eliminar `Archive.tsx`, `Voces.tsx`, `lib/useReveal.ts` | Archivos borrados; `next build` y typecheck pasan; sin imports rotos.                                                                   |
| 2   | Sacar `TweaksWidget` de producción                      | No se renderiza con `NODE_ENV=production`; visible solo en dev tras flag; ausente del bundle de prod (verificable en `next build`).     |
| 3   | Verificar dominio en Resend                             | `speculativefutures.mx` en estado "Verified" en Resend; envío de prueba desde `no-reply@speculativefutures.mx` recibido.                |
| 4   | Parametrizar email en `api/contact`                     | Destinatario/remitente leídos de env (`CONTACT_TO`, `CONTACT_FROM`); sin literales en el código; formulario sigue entregando.           |
| 5   | Actualizar `README.md`                                  | README describe stack, setup local, variables y scripts reales; sin texto de handoff de diseño.                                         |
| 6   | Consolidar tokens duplicados                            | Existe `styles/tokens.ts` único; `globals.css` consume variables generadas; `lib/tokens.ts` deja de duplicar (re-exporta o se elimina). |

Estas tareas se ejecutan como bloque de limpieza dentro del Sprint 1 (no como sprint propio), antes de construir módulos nuevos.

---

## Sección 10 — Configuración Supabase Pro y Vercel

- **No-pausing:** DB siempre activa (Pro). Sin cold starts por pausa.
- **PITR:** habilitado desde día 1 (recuperación a cualquier punto de los últimos 7 días).
- **Database branching + Vercel previews:** cada PR genera preview deployment en Vercel con su rama de DB Supabase; las migraciones Prisma se prueban en la rama antes de merge a `main`/producción. Activar en Sprint 1.
- **Storage (100GB):** buckets/carpetas `avatars/`, `eventos/`, `dossiers/`, `aliados/`. RLS de Storage: lectura pública para `avatars/`, `eventos/`, `aliados/`; `dossiers/` con lectura restringida (preparado para premium, dormido).
- **Edge Functions:** no se anticipa necesidad en el MDP. Caso de uso potencial documentado: webhooks de terceros o jobs de notificación a escala — diferido; las necesidades actuales se cubren con server actions + Resend.
- **Variables de entorno** (`.env.local` y Vercel):

| Variable                        | Uso                                            |
| ------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Endpoint del proyecto Supabase.                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente público (RLS aplica).                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Operaciones server privilegiadas.              |
| `DATABASE_URL`                  | Prisma (pooled, pgbouncer).                    |
| `DIRECT_URL`                    | Prisma (directo, migraciones).                 |
| `RESEND_API_KEY`                | Email transaccional + SMTP de Supabase.        |
| `CONTACT_TO`, `CONTACT_FROM`    | Parametrización del formulario de contacto.    |
| `NEXT_PUBLIC_SITE_URL`          | URLs absolutas (callbacks, sitemap, hreflang). |

---

## Sección 11 — Mapa de sprints por olas

### Ola 1 — Fundación operativa

**Sprint 1 — Infraestructura + limpieza**

- Entregables: Supabase Pro configurado (no-pausing, PITR); Prisma + primera migración del schema; seeds (capítulo `cdmx`, 5 territorios, aliado Change); Supabase Auth + Resend SMTP; `@supabase/ssr`; middleware i18n + protección; `next-intl` con `es/en`; database branching activo; bloque de limpieza (Sección 9); ESLint/Prettier + GitHub Action (lint, typecheck, `prisma validate`); `.env.example`.
- Dependencias: ninguna previa (sprint base).
- Aceptación: `prisma migrate` aplica sin error en rama de preview; un usuario recibe magic link vía Resend y obtiene sesión; rutas privadas redirigen a `/login`; `/es` y `/en` resuelven; CI verde en un PR de prueba; los archivos huérfanos ya no existen y `TweaksWidget` no está en el bundle de producción.

**Sprint 2 — Membresía, perfiles, onboarding**

- Entregables: alta de miembro (trigger), flujo de onboarding completo, edición de perfil, perfil público `/miembros/[id]`, página de configuración, activación de casilla Curador Comunidad.
- Dependencias: Sprint 1 (auth, schema, i18n).
- Aceptación: registro→magic link→onboarding completable en <3 min; activar casilla deja `rol_contribucion = curador_comunidad`; perfil editable persiste; RLS de `miembro` verificada (un miembro no edita el perfil de otro).

**Sprint 3 — Eventos + RSVP + home dinámico + aliados**

- Entregables: CRUD de eventos (Curador Core), listado/detalle, RSVP con email de confirmación (Resend), home leyendo del backend, página `/aliados` con Change.
- Dependencias: Sprints 1-2.
- Aceptación: Core crea evento y aparece público; miembro hace RSVP y recibe email; home renderiza datos reales; `/aliados` muestra a Change con su rol.

### Ola 2 — Activación intelectual

**Sprint 4 — Señales (Modelo 1.5) + dashboard de curación**

- Entregables: CRUD de señales, flujo de calibración (3 primeras en revisión; luego directa con `auditada=false`), `RevisionSenial` (feedback + decisión), notificaciones por email, dashboard de curación (secciones "Calibración" y "Auditoría post-hoc"), crédito visible al proponente, archivo de señales para miembros, porción destacada pública.
- Dependencias: Sprints 1-2 (miembros/roles), Sprint 3 (patrón de listados).
- Aceptación: Curador Comunidad con <3 aprobadas ve su señal en cola; con ≥3 publica directo marcada no auditada; Core aprueba/comenta y el proponente recibe email; feature flag `modelo_2` salta la calibración cuando se activa.

**Sprint 5 — Archivo de eventos + conexión eventos↔señales**

- Entregables: archivo de eventos pasados con recursos post-evento, vínculo de señales discutidas en cada evento.
- Dependencias: Sprint 3 (eventos), Sprint 4 (señales).
- Aceptación: un evento pasado muestra sus señales discutidas y recursos; navegación evento→señal funcional.

### Ola 3 — Producto editorial

**Sprint 6 — Piezas editoriales + bilingüismo activado**

- Entregables: CRUD de piezas (ensayo/dossier/reporte/briefing), archivo editorial, render bilingüe en piezas con `idiomas=['es','en']`, `acceso_premium` presente y dormido (default false).
- Dependencias: Sprints 1 (i18n), 4 (señales para referenciar).
- Aceptación: Core publica pieza y aparece en archivo; pieza bilingüe alterna es/en; pieza solo-es no ofrece en; ninguna pieza queda tras paywall (premium dormido).

**Sprint 7 — Conexiones + mapas de relación + archivo editorial**

- Entregables: entidad `Conexion` activa (UI para relacionar señales/eventos/piezas), visualización de relaciones, archivo editorial enriquecido.
- Dependencias: Sprints 4-6.
- Aceptación: Core crea una conexión convergencia/contradicción entre dos señales y se visualiza; piezas muestran señales referenciadas.

### Ola 4 — Cierre del MDP

**Sprint 8 — Pulido**

- Entregables: pulido visual, performance (Core Web Vitals), SEO bilingüe completo (hreflang, sitemap), accesibilidad (WCAG AA en flujos clave), página de aliados expandida, verificación de infraestructura dormida (multi-capítulo, monetización) sin UX activa.
- Dependencias: todas las anteriores.
- Aceptación: Lighthouse ≥90 en performance/SEO/accesibilidad en rutas clave; hreflang válido; auditoría de teclado/lector de pantalla en login, onboarding, RSVP y lectura de señal; entidades dormidas presentes y sin endpoints activos.

---

## Sección 12 — Criterios de aceptación del MDP completo

1. Un visitante se registra con email, recibe magic link y completa onboarding en menos de 3 minutos.
2. El magic link se entrega vía Resend desde `no-reply@speculativefutures.mx` (dominio verificado), no por el SMTP nativo de Supabase.
3. Al crearse un `auth.users`, existe automáticamente su `Miembro` (trigger), con `capitulo_id = cdmx`.
4. Un miembro que activa la casilla queda como `curador_comunidad` con `seniales_publicadas_aprobadas = 0`.
5. Un Curador Comunidad con <3 señales aprobadas ve su propuesta entrar en `en_revision`.
6. Un Curador Comunidad con ≥3 aprobadas publica su 4ª señal directo, marcada `auditada = false`, sin pasar por cola.
7. Un Curador Core aprueba/rechaza/comenta una propuesta y el proponente recibe email con la decisión.
8. Cada señal publicada muestra crédito visible a su proponente.
9. El dashboard de curación separa "Calibración (primeras 3)" de "Auditoría post-hoc".
10. Activar el feature flag `senales_publicacion_directa_modelo_2` elimina la cola para todos los Curador Comunidad sin desplegar código nuevo.
11. Un miembro hace RSVP a un evento y recibe email de confirmación.
12. Un evento no puede recibir RSVP duplicado del mismo miembro (constraint único).
13. La home se sirve siempre en español; un navegador en inglés ve el banner "Some content available in English".
14. La página de manifiesto se muestra en español y permite cambio a inglés.
15. Una pieza con `idiomas=['es']` no ofrece versión en inglés ni se traduce automáticamente.
16. Un Curador Core publica una pieza editorial y queda visible en el archivo editorial.
17. Ninguna pieza editorial queda tras paywall en el MDP (`acceso_premium` siempre false en UX).
18. La página `/aliados` muestra a Change · Futurist.mx con su `rol_especifico`; el footer dice "Una iniciativa entre Change · Futurist.mx y aliados fundadores".
19. Un visitante (sin login) ve home, manifiesto, eventos públicos, piezas públicas y la porción curada de señales destacadas, pero no el archivo completo de señales.
20. Un miembro sin permisos no puede acceder a `/curacion` (middleware + RLS lo impiden).
21. Las cinco entidades centrales tienen `capitulo_id = cdmx`; agregar otro capítulo no requiere migración de esquema.
22. Las entidades `Plan`, `Suscripcion`, `Sponsor` existen en la DB sin ningún flujo que las escriba.
23. Cada PR genera un preview en Vercel con su rama de DB Supabase; las migraciones se validan antes de merge.
24. `prisma validate` y el typecheck pasan en CI en cada PR.
25. PITR está activo: es posible restaurar a un punto de los últimos 7 días.

---

## Sección 13 — Decisiones arquitectónicas pendientes

### RESUELTAS por el chat estratégico (correcciones aprobadas, ya incorporadas)

1. **Entidad `RevisionSenial`.** ✅ Resuelta: entidad separada con `estado` (aprobada/rechazada/requiere_edicion), `comentario_editorial`, `ronda`, `fecha_revision`; múltiples rondas por señal; revisor = `curador_core`. El contador `seniales_publicadas_aprobadas` se calcula contra `RevisionSenial` con `estado=aprobada`.
2. **Vínculo Miembro ↔ AliadoFundador.** ✅ Resuelta: FK opcional `aliado_fundador_id` (muchos-a-uno) + `rol_en_aliado` (texto libre). No otorga `rol_contribucion` especial.
3. **`HorizonteTemporal`.** ✅ Resuelta: `ahora | emergente | mediano | largo | horizonte`.
4. **`EstadoEvento`.** ✅ Resuelta: `borrador | programado | lleno | en_curso | realizado | cancelado | pospuesto`.

### CRÍTICA (bloquea Sprint 1)

5. **Estrategia de conexión Prisma con RLS.** Confirmar que Prisma usa rol que bypassa RLS y que toda mutación server-side valida rol en aplicación. **Recomendación:** Prisma con `DATABASE_URL` privilegiada + autorización en server actions; RLS como red de seguridad para el cliente Supabase. Requerida desde Sprint 1.

### IMPORTANTE (bloquea un sprint posterior)

6. **Google OAuth: ¿se habilita en el MDP?** Lineamientos lo marcan opcional. Decisión antes de Sprint 1 (config de Supabase). **Recomendación:** habilitar solo magic link en MDP; OAuth diferible sin costo de refactor.
7. **Modelo de notificaciones.** MDP: email transaccional (Resend), sin bandeja in-app. Reabrir si se requiere centro de notificaciones (post-MDP).

### DIFERIBLE (resoluble durante construcción)

8. **`slug` vs `id` en rutas de detalle.** Eventos/editorial usan `[slug]`; señales usan `[id]`. Definir generación de slugs (campo `slug` único) durante Sprint 3/6. No bloquea el schema (se añade campo en su migración).
9. **Estructura fina de `ponentes` (JSON) y `recursos_post_evento` (JSON).** Forma del JSON se fija en Sprint 3/5.
10. **Política de Storage para `dossiers/`.** Lectura restringida preparada para premium; reglas finas se definen cuando se active Horizonte 2.
11. **Re-vestido de primitivas shadcn/ui.** Qué componentes se adoptan se decide por feature, no globalmente.
12. **Migración a Prisma 7.** El MDP se fija en Prisma 6.x (datasource con `url`/`directUrl` en el schema, validado). Prisma 7 mueve esas URLs a `prisma.config.ts` y cambia la construcción del cliente. **Recomendación:** permanecer en Prisma 6.x durante el MDP; evaluar Prisma 7 post-MDP cuando el ecosistema Supabase lo documente plenamente. Migración acotada (mover URLs a config + ajustar instanciación), sin impacto en el modelo de datos.

### Observaciones diferibles del review de Sprint 0 (REVISION.md)

Registradas aquí para trazabilidad; no se implementan en Sprint 1.

13. **O7 — Integridad referencial de `Conexion` (Sprint 7).** `Conexion` es polimórfica sin FK; al eliminar entidades referenciadas, las conexiones pueden quedar huérfanas. Resolver en Sprint 7. **Recomendación:** soft delete (campo `eliminada_at`) + filtro en queries, o validación obligatoria en la server action de delete. Sprint que la requiere: 7.
14. **O8 — Política de degradación de Resend (antes de tráfico real).** Documentar el comportamiento al acercarse al límite del free tier (3,000 emails/mes): logging estructurado, alerta a curador core, política de retry/cola. Resolver antes de que la Ola 1 reciba tráfico real.
15. **O9 — Supuestos de volumen explícitos (documentación).** Volúmenes esperados en el MDP: comunidad de decenas a cientos de miembros; archivos de hasta 10 MB por subida; paginación de 20 elementos en listados. No condiciona la arquitectura; sí condiciona decisiones tácticas (índices, límites de Storage, tamaño de página).
16. **O10 — UI bilingüe vs. contenido público bilingüe (documentación).** La UI de la app (botones, labels, errores) está en español. El bilingüismo aplica solo a contenido editorial público con `idiomas: ['es','en']`. Las rutas privadas (`/dashboard`, `/configuracion`, `/curacion`) no tienen versión `/en/`. `messages/en.json` contiene solo strings de contenido público.

---

## Registro de deuda técnica y decisiones diferidas

Funcionalidades y decisiones diferidas de forma explícita (no ocultas), conforme al principio de "deuda técnica explícita" de los lineamientos.

- **Módulo de pagos:** diferido a Horizonte 2 (mes 12+). Entidades `Plan`, `Suscripcion`, `Sponsor` y campo `acceso_premium` presentes pero dormidos.
- **Activación multi-capítulo:** diferida hasta evidencia de demanda. `capitulo_id` presente en entidades centrales; sin selector ni gobernanza distribuida en MDP.
- **Modelo 2 de señales** (publicación directa para todos los Curador Comunidad): diferido, controlado por feature flag `senales_publicacion_directa_modelo_2` (default false).
- **Migración Prisma 6.x → 7.x:** diferida. Reevaluar en mes 6-12 cuando Prisma 7 tenga al menos 2 versiones minor estables y el ecosystem lo soporte oficialmente. El cambio es acotado (mover `url`/`directUrl` a `prisma.config.ts` + ajustar instanciación del cliente), sin impacto en el modelo de datos.
- **Modelo de notificaciones in-app:** diferido. MDP usa email transaccional (Resend); sin entidad `Notificacion` ni bandeja in-app.
- **Google OAuth:** diferible sin costo de refactor (decisión IMPORTANTE, Sección 13).
- **Integración con CRM externo:** no contemplada en MDP.

---

## Cierre

Este documento y `prisma/schema.prisma` constituyen el entregable del Sprint 0 incremental, con las correcciones del chat estratégico incorporadas (RevisionSenial como entidad separada con rondas; enums `HorizonteTemporal` y `EstadoEvento` confirmados; vínculo Miembro↔AliadoFundador con `rol_en_aliado` sin rol especial; Prisma 6.x como decisión consciente). El schema está validado con Prisma 6 (`The schema at prisma/schema.prisma is valid`, exit 0, con variables de entorno presentes). No se escribió código de producto, no se instalaron dependencias (la validación se ejecutó vía `npx`, sin modificar `package.json`), no se ejecutaron migraciones ni se configuraron servicios externos.

Conforme al proceso definido en los lineamientos (Parte III), este entregable regresa al chat estratégico para revisión arquitectónica. **Ningún sprint de construcción inicia sin aprobación explícita.**

---

_Speculative Futures CDMX · Documento de Arquitectura Sprint 0 Incremental · v1.2_
_Change Consulting · Mayo 2026_
