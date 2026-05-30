# Speculative Futures CDMX — Sprint 3 · Entregable

## Eventos + RSVP + Home dinámico + Página de aliados fundadores

### Change Consulting · Mayo 2026

---

## Resumen

Sprint 3 cierra la Ola 1. SF CDMX pasa de "infraestructura con miembros" a
"comunidad con producción visible": eventos con RSVP, home dinámico según
sesión, y página pública de aliados fundadores. Construido en
`feat/sprint-3-eventos`.

Verificación local: **typecheck ✓ · lint ✓ · build ✓ · format ✓ ·
0 MISSING_MESSAGE**.

---

## Qué se construyó

### Bloque 1 — Modelo de datos
- `RSVP`: añadido `fecha_cancelacion` (DateTime?) y valor `cancelado` al enum
  `EstadoRSVP`; índice por `estado`.
- `Evento`: `ubicacion` pasa de `String?` a `Json?` (estructura por modalidad).
- Migración incremental versionada: `prisma/migrations/20260530_eventos_y_rsvp/`
  (genera `ALTER TYPE`, `ALTER TABLE`, índice). Generada offline con
  `migrate diff` (CLAUDE.md → política de SQL). **Pendiente aplicar a la DB.**

### Bloque 2 — Sistema de eventos (CRUD)
- Rutas: `/eventos` (listado público), `/eventos/[id]` (detalle público),
  `/eventos/nuevo` y `/eventos/[id]/editar` (solo curador_core),
  `/eventos/[id]/ical` (endpoint .ics público).
- Server actions `crear-evento`, `editar-evento`, `cancelar-evento`: validación
  Zod + permiso `crear_evento` vía helper aditivo (D-S3-1).
- Listado: eventos futuros, orden asc, con estado de cupo y RSVP por card.
- Detalle: fecha CDMX, modalidad, territorio, ubicación según modalidad,
  ponentes, panel de RSVP contextual y grid de asistentes (solo a miembros).

### Bloque 3 — RSVP
- `confirmar-rsvp`: valida evento/cupo/onboarding, upsert, **email vía Resend
  con .ics adjunto** (D-S3-7). `cancelar-rsvp`: estado `cancelado`,
  `fecha_cancelacion`, libera cupo, sin email (D-S3-5).
- Cupo: `lib/eventos/cupo.ts` (cuenta confirmados, calcula lleno/disponibles).
  Sin lista de espera: placeholder honesto "Te avisaremos" (D-S3-4).

### Bloque 4 — Home dinámico (D-S3-9)
- `app/[locale]/page.tsx` server component: banda dinámica (BienvenidaMiembro si
  hay sesión + EventoCardHome del próximo evento + AliadosTira) **encima** del
  landing existente (`SiteApp`: manifiesto, territorios, identidad preservada).
  Si no hay evento próximo, la banda no rompe la composición (criterio 17).

### Bloque 5 — Aliados fundadores
- `/aliados` (listado público) + `/aliados/[id]` (perfil institucional). La
  lista de miembros vinculados solo es visible a miembros autenticados
  (reutiliza `MiembroCard`).

### Bloque 6 — Endpoint iCal
- `app/eventos/[id]/ical/route.ts`: genera .ics con `ics`, fechas UTC con TZ,
  headers `text/calendar` + `Content-Disposition`. Middleware exime esta ruta
  del prefijo de locale.

### Bloque 7 — Componentes UI
- `EventoCard`, `EventoCardHome`, `ModalidadBadge`, `EstadoRsvpBadge`,
  `AsistentesGrid`, `EventoForm` (crear/editar, UI de ubicación adaptativa por
  modalidad), `RsvpPanel`, `AliadosTira`, `AliadoCard`, `BienvenidaMiembro`.
  Identidad Gotham + tokens SF CDMX. shadcn `Select` reutilizado.

### Bloque 8 — i18n
- `messages/es.json` cubre la UI; rutas privadas es-only (O10).

### Bloque 9 — Observaciones del Sprint 2
- **O15:** los toasts se disparan en páginas con `AppShell` (ToastStore). El
  toast se muestra en la página de origen antes del `router.push`. Flash
  cross-route persistente (vía searchParams) no implementado — ver nota.
- **O16:** la paginación de `/miembros` ya tenía UI (Anterior/Siguiente +
  "Página N de M"). Sin acción adicional.
- **O17:** ✅ JSDoc completo de `colorDeId` en `lib/avatar.ts`.

---

## Estado de los criterios de aceptación

| # | Criterio | Estado |
| --- | --- | --- |
| 1 | Anónimo ve `/eventos` sin login | ✅ Implementado |
| 2 | Anónimo ve `/eventos/[id]` con CTA login | ✅ |
| 3 | curador_core crea evento con validación Zod | ✅ |
| 4 | No-core en `/eventos/nuevo` redirigido | ✅ (redirect a /eventos) |
| 5 | RSVP envía email Resend + .ics | ✅ Implementado (depende de RESEND_API_KEY en runtime) |
| 6 | Email coherente con identidad | ✅ (template petróleo/menta/Gotham) |
| 7 | RSVP reduce cupo | ✅ |
| 8 | Cupo agotado → "Lleno" + bloqueo | ✅ |
| 9 | Cancelar RSVP libera cupo | ✅ |
| 10 | Asistentes visibles solo a miembros | ✅ |
| 11 | Descarga .ics desde detalle | ✅ |
| 12 | .ics válido en Google/Apple/Outlook | **Implementado** — validación en clientes reales es verificación de runtime del equipo |
| 13 | Ubicación según modalidad | ✅ |
| 14 | Hora siempre con "(CDMX)" | ✅ |
| 15 | Home anónimo: manifiesto+territorios+evento+aliados+CTA | ✅ |
| 16 | Home miembro: saludo+evento con RSVP+aliados+dashboard | ✅ |
| 17 | Sin eventos, home no se rompe | ✅ |
| 18 | `/aliados` lista a Change | ✅ |
| 19 | `/aliados/[id]` con miembros vinculados si hay sesión | ✅ |
| 20 | O15 toast con redirect verificado | **Parcial** — toast en origen; flash cross-route diferido (ver nota) |
| 21 | O16 paginación clara | ✅ |
| 22 | O17 JSDoc colorDeId | ✅ |
| 23 | CI verde en PR | **Pendiente** — se verifica al abrir el PR |
| 24 | Preview deployment end-to-end | **Pendiente** — se verifica al abrir el PR |

Verificados local (tsc/lint/build/format): todos los implementados.
Pendientes de CI/preview: 23-24. Verificación de runtime del equipo: 5 (email
real), 12 (.ics en clientes), 20 (flash de toast en navegador).

---

## Decisiones tomadas durante construcción

- **D-C5 — Conversión de timezone en el form.** El `datetime-local` se
  interpreta como hora CDMX (UTC-6, sin DST) y se convierte a UTC antes de
  persistir; en edición se hace la conversión inversa. CDMX no observa horario
  de verano desde 2023, por lo que el offset fijo -6 es correcto.
- **D-C6 — Email no bloquea el RSVP.** Si Resend falla o no hay API key, el
  RSVP igual se confirma (el email se intenta best-effort y se loguea el error).
- **D-C7 — `force-dynamic` en páginas con DB.** Evita que Next intente
  prerender estático con consultas Prisma (que el entorno de build no alcanza).
- **D-C8 — Ubicación como JSON.** Permitido por el prompt ("Json o campos
  separados"). JSON evita 4 columnas nullable y se valida con Zod por modalidad.

---

## Pendientes operativos (equipo Change)

- **Aplicar la migración** `20260530_eventos_y_rsvp` a la DB (vía SQL Editor o
  `prisma migrate deploy` desde máquina con acceso directo). **Sin esto, las
  páginas de eventos fallan en runtime** (faltan columna `fecha_cancelacion`,
  valor de enum `cancelado`, y `ubicacion` como JSON). El SQL está en la carpeta
  de migración.
- **TT-S2-1 (Storage/avatar)** sigue pendiente del Sprint 2: bucket `avatars` +
  RLS para que el upload funcione en runtime.
- **Verificaciones de runtime:** email real de RSVP, .ics en clientes de
  calendario, flash de toast tras redirect en navegador.

---

## Nota sobre O15 (toast + redirect)

Patrón actual: el toast se dispara en la página de origen (que monta
`AppShell`/`ToastStore`) y luego se navega con `router.push`. El usuario ve el
toast en el origen; al cambiar de ruta, el store se reinicia. Para un flash
persistente en el destino (ej. "Perfil actualizado" visible ya en
`/dashboard`), se requiere pasar un parámetro de mensaje por `searchParams` y
leerlo en el destino. Se deja documentado como mejora menor; no bloquea, y la
mayoría de flujos (edición con `router.refresh`) muestran el toast en la misma
ruta sin pérdida.

---

## Siguiente paso

1. `ENTREGABLE.md` versionado.
2. PR de `feat/sprint-3-eventos` para revisión + CI + preview.
3. Aplicar la migración a la DB para que el preview funcione end-to-end.
4. Documento regresa al chat estratégico para `REVISION.md` del Sprint 3.
5. **Sprint 4 (señales, Modelo 1.5) no inicia sin `REVISION.md` aprobada.**

---

_Speculative Futures CDMX · Sprint 3 · Entregable_
_Change Consulting · Mayo 2026_
