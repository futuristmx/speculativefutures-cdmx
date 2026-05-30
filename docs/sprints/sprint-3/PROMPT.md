# SPECULATIVE FUTURES CDMX — Prompt Sprint 3
## Eventos + RSVP + Home dinámico + Página de aliados fundadores
### Change Consulting · Mayo 2026 · v1.0

---

## CONTEXTO

Sprints 1-2 construyeron infraestructura y membresía. Hoy un visitante puede registrarse, completar onboarding, ver su dashboard, editar su perfil, subir avatar y explorar perfiles de otros miembros. Pero el proyecto **aún no produce nada visible para la comunidad como conjunto**.

Sprint 3 cierra la Ola 1 — Fundación Operativa — añadiendo la pieza que convierte a SF CDMX en una comunidad activa: **eventos**. Un evento es la primera producción colectiva del capítulo, el primer momento donde la comunidad se manifiesta hacia afuera y hacia adentro. Sin eventos, el capítulo es un directorio de miembros. Con eventos, es una comunidad viva.

También: el home se vuelve dinámico (deja de ser estático), y se construye la página pública de aliados fundadores (Change es el primero, arquitectura preparada para sumar).

---

## DOCUMENTOS DE REFERENCIA OBLIGATORIOS

1. `CLAUDE.md` (raíz) — reglas persistentes, incluida política de aplicación de SQL
2. `docs/strategy/LINEAMIENTOS.md` — fuente única de verdad
3. `docs/sprints/sprint-0/ARQUITECTURA.md` — modelo de datos, RLS, roles, mapa de rutas
4. `docs/sprints/sprint-1/ENTREGABLE.md` + `REVISION.md`
5. `docs/sprints/sprint-2/ENTREGABLE.md` + `REVISION.md`
6. `docs/sprints/sprint-2/PROMPT.md` (contexto histórico; ignorar residuos de identidad visual ya reconciliados)

Ante conflicto, prevalece `LINEAMIENTOS.md`.

---

## OBJETIVO DEL SPRINT 3

1. **Sistema completo de eventos** con creación, edición, listado, detalle, modalidades (online/presencial/híbrido) y descarga iCal
2. **RSVP funcional** con capacidad opcional, cancelación, email de confirmación
3. **Home dinámico** que lee del backend: próximo evento, aliados fundadores, manifiesto, CTA contextual
4. **Página pública de aliados fundadores** preparada para escalar

Al cierre, SF CDMX deja de ser "infraestructura con miembros" y se convierte en "comunidad con producción visible".

---

## DECISIONES ARQUITECTÓNICAS DEL CHAT ESTRATÉGICO

### D-S3-1 — Quién puede crear eventos: solo curador_core

Eventos son producciones curadas del capítulo, no contribuciones individuales. Solo `curador_core` crea, edita o cancela eventos. La UI de creación/edición solo se muestra a miembros con ese rol. Server actions validan permiso vía helper `lib/auth/permissions.ts` (decisión D-S2-2 del Sprint 2: roles aditivos).

Si en algún momento se quiere abrir a `curador_comunidad`, se hace con feature flag. No por ahora.

### D-S3-2 — Visibilidad de eventos: públicos por default, RSVP requiere login

Visitantes anónimos pueden ver `/eventos` (listado) y `/eventos/[id]` (detalle). Esto convierte la agenda en pieza de marca y en funnel de membresía: alguien ve un evento atractivo → quiere asistir → tiene que registrarse → entra en la comunidad.

El RSVP siempre requiere login. Quien no esté autenticado, ve el evento y un CTA "Inicia sesión o regístrate para asistir".

Los **asistentes confirmados** del evento (lista de quiénes van a estar) son visibles solo a miembros autenticados, no a anónimos. Mismo principio que perfiles en Sprint 2.

### D-S3-3 — Modalidades de evento

Tres modalidades, según lineamientos:
- `online` — link de Zoom/Meet/Jitsi
- `presencial` — dirección física
- `hibrido` — ambos

Campo de ubicación adapta su UI según modalidad:
- online: input de URL + plataforma (texto libre: "Zoom", "Google Meet", etc.)
- presencial: texto libre de dirección + opcional Google Maps URL
- hibrido: ambos

Esto es solo display, no se restringe la creación por geolocalización ni nada complejo.

### D-S3-4 — Capacidad opcional, sin lista de espera

Eventos pueden tener `capacidad` numérica o `null` (sin límite).

Si tiene capacidad: cuando los RSVPs alcanzan ese número, el evento muestra "Lleno" y se cierra el RSVP. No hay lista de espera funcional en MDP. CTA suave: "Únete a la lista de espera" muestra mensaje "Te avisaremos si se libera un lugar" pero **no implementa ninguna lógica** todavía (es placeholder honesto que se construye en Ola 2 o 3).

Si no tiene capacidad: RSVP siempre abierto.

### D-S3-5 — Cancelación de RSVP

Miembro puede cancelar su RSVP desde el evento o desde su dashboard. La cancelación:
- Cambia estado del RSVP a `cancelado` (no se borra, queda historial)
- Libera el cupo automáticamente si el evento tenía capacidad
- No notifica al organizador (curador_core) en MDP

El miembro que canceló puede volver a hacer RSVP si hay cupo.

### D-S3-6 — Zona horaria: almacenamiento UTC, display CDMX

Eventos se almacenan en UTC en DB. Display por default: hora de CDMX con etiqueta visible "(CDMX)".

Razón: SF CDMX es capítulo local. La hora local de CDMX es la referencia natural. Miembros internacionales pueden convertir mentalmente o usar el .ics descargable que sí tiene timezone embebido.

No se implementa cambio de timezone en UI del usuario en este sprint. Diferir si se requiere después.

### D-S3-7 — Email de confirmación de RSVP

Se envía email vía Resend al confirmar RSVP:
- Asunto: "RSVP confirmado: [Título del evento]"
- Cuerpo: detalle del evento (fecha, hora CDMX, modalidad, ubicación), nombre del miembro, link al evento, archivo .ics adjunto

Esto es el primer email transaccional no-auth del proyecto. Patrón aplicable a confirmaciones futuras.

### D-S3-8 — Descarga iCal (.ics)

Cada evento expone un endpoint `app/eventos/[id]/ical/route.ts` que genera el archivo .ics dinámicamente con:
- Título, descripción, fecha en UTC con TZ embebido
- Ubicación según modalidad
- Organizador (no@speculativefutures.mx o el contacto de Change)

Útil para:
- Adjuntar al email de confirmación de RSVP
- Botón "Añadir a mi calendario" en página de detalle del evento (para miembros que ya confirmaron)

### D-S3-9 — Home dinámico: contenido por estado de sesión

**Home para visitante anónimo (no logueado):**
- Manifiesto (mantener el actual del landing)
- 5 territorios (mantener)
- Próximo evento (si hay): card destacada con CTA "Inicia sesión para asistir"
- Aliados fundadores (tira institucional con Change)
- CTA principal: "Únete a la comunidad"
- Sin lista de miembros (consistente con D-S2-1)

**Home para miembro autenticado:**
- Saludo personalizado breve
- Próximo evento (si hay): card con su estado de RSVP (confirmado / disponible / lleno) y CTA correspondiente
- Aliados fundadores
- Manifiesto y territorios (versión condensada o opcional ver completa)
- Acceso rápido al dashboard

El home es server component que decide qué renderizar según presencia de sesión.

### D-S3-10 — Página de aliados fundadores

Ruta: `/aliados` (pública, anónimos pueden ver).

Lista todos los registros de `AliadoFundador`. Por ahora: Change · Futurist.mx.

Cada aliado tiene su perfil institucional accesible en `/aliados/[id]`:
- Logo, nombre, descripción
- Tipo (academia/cultural/consultora/fundación)
- Rol específico (editorial/eventos/financiero/intelectual)
- Fecha de incorporación
- Link externo a su sitio
- Lista de miembros vinculados (si los hay; visible solo a miembros autenticados)
- Eventos en los que participó (cuando se construya el archivo de eventos en Sprint 5)

Es página pública orientada a comunicar legitimidad institucional del capítulo. La regla de "hub neutro con Change como aliado fundador" (Lineamientos §3) gana visibilidad pública aquí.

---

## ENTREGABLES OBLIGATORIOS

### Bloque 1 — Modelo de datos y migraciones

**Nuevos campos / ajustes al schema** (si requeridos):
- Confirmar que `Evento` ya tiene: titulo, descripcion, modalidad, fecha_inicio (DateTime UTC), fecha_fin (DateTime UTC), ubicacion (Json o campos separados), capacidad (Int nullable), ponentes, territorio_id, capitulo_id, idiomas, recursos_post_evento, estado
- Confirmar que `RSVP` tiene: miembro_id, evento_id, estado (registrado | cancelado | asistio), fecha_registro, fecha_cancelacion (DateTime nullable)
- Si falta algún campo crítico (estado de cancelación, timestamps), añadirlo en una migración nueva

**Migración:** `prisma migrate dev --name eventos_y_rsvp` desde máquina con acceso directo a DB. Si no hay campos nuevos, omitir.

### Bloque 2 — Sistema de eventos (CRUD)

**Rutas:**
- `app/[locale]/eventos/page.tsx` (lista, pública)
- `app/[locale]/eventos/[id]/page.tsx` (detalle, pública)
- `app/[locale]/eventos/nuevo/page.tsx` (creación, solo curador_core)
- `app/[locale]/eventos/[id]/editar/page.tsx` (edición, solo curador_core)
- `app/eventos/[id]/ical/route.ts` (endpoint .ics, público)

**Server actions:**
- `features/eventos/actions/crear-evento.ts` — valida con Zod, persiste, valida permiso curador_core
- `features/eventos/actions/editar-evento.ts`
- `features/eventos/actions/cancelar-evento.ts` — solo si no hay RSVPs confirmados o si curador_core confirma cancelación masiva

**Listado de eventos:**
- Eventos futuros (fecha_inicio > now), ordenados por fecha ascendente
- Filtros opcionales: por territorio, por modalidad (estructura preparada, lógica simple)
- Paginación de 12 eventos por página (o sin paginación si <20 en MDP)
- Cada evento muestra: título, fecha (CDMX), modalidad, territorio (badge), card con estado de RSVP si el miembro está logueado

**Detalle de evento:**
- Header: título grande, fecha/hora CDMX, modalidad con icono
- Descripción
- Ponentes (lista)
- Territorio (badge)
- Ubicación según modalidad
- Card de RSVP:
  - Anónimo: CTA "Inicia sesión para asistir"
  - Miembro sin RSVP: botón "Confirmar asistencia" (deshabilitado si lleno)
  - Miembro con RSVP confirmado: estado "Confirmado" + botón "Cancelar mi RSVP" + botón "Añadir a mi calendario" (descarga .ics)
- Asistentes (visible solo a miembros): grid mini de avatares de los confirmados, con count

### Bloque 3 — Sistema de RSVP

**Server actions:**
- `features/rsvp/actions/confirmar-rsvp.ts` — valida que el evento existe, no está lleno, no canceló, miembro tiene onboarding completo. Crea RSVP. Envía email vía Resend con .ics adjunto.
- `features/rsvp/actions/cancelar-rsvp.ts` — cambia estado a `cancelado`. Libera cupo. No envía email.

**Email transaccional:**
- Template HTML mínimo con identidad visual del proyecto (tokens, Gotham, paleta SF CDMX)
- Asunto: "RSVP confirmado: [Título]"
- Cuerpo: nombre del miembro, detalles del evento, link al evento, .ics adjunto
- Sender: `eventos@speculativefutures.mx` (o el sender único `no-reply@` si no se quiere fragmentar)

### Bloque 4 — Home dinámico

**Ruta:** `app/[locale]/page.tsx`

Server component que detecta sesión y renderiza una de las dos variantes (D-S3-9). El home actual estático se reemplaza por esta versión.

**Componentes nuevos:**
- `EventoCardHome` — variante compacta del card de evento, para destacar en home
- `AliadosTira` — tira institucional con logos de aliados fundadores
- `BienvenidaMiembro` — saludo personalizado para miembros logueados

**Importante:** preservar la identidad visual y el manifiesto del landing actual. No reemplazar todo el contenido, sino añadir capas dinámicas sobre la estructura existente.

### Bloque 5 — Página de aliados fundadores

**Rutas:**
- `app/[locale]/aliados/page.tsx` — listado público
- `app/[locale]/aliados/[id]/page.tsx` — perfil institucional público

**Contenido:** descrito en D-S3-10. Server components que leen de la entidad `AliadoFundador`.

**Importante:** la lista de miembros vinculados al aliado (visible solo a miembros autenticados) requiere consultar `Miembro.aliado_fundador_id`. Reutilizar el componente `MiembroCard` del Sprint 2.

### Bloque 6 — Endpoint iCal

**Ruta:** `app/eventos/[id]/ical/route.ts`

GET handler que genera el archivo .ics dinámicamente. Usar librería `ics` de npm (estándar). Headers correctos: `Content-Type: text/calendar; charset=utf-8`, `Content-Disposition: attachment; filename="evento-{slug}.ics"`.

### Bloque 7 — Componentes UI nuevos

- `EventoCard` (listado) + `EventoCardHome` (variante compacta)
- `ModalidadBadge` (online/presencial/híbrido con icono)
- `EstadoRsvpBadge` (confirmado / lleno / cancelado / abierto)
- `AsistentesGrid` (grid mini de avatares de asistentes)
- `EventoForm` (formulario de creación/edición, reutilizado)
- `BienvenidaMiembro` (home logueado)
- `AliadosTira` (home + página de aliados)
- `AliadoCard` (página de aliados)

Todos respetan tokens del proyecto, identidad Gotham + paleta SF CDMX. shadcn/ui se extiende con los componentes que falten (Select para territorio si no estaba, DatePicker para fecha del evento).

### Bloque 8 — i18n

Ampliar `messages/es.json` con strings de eventos, RSVP, modalidades, aliados, home dinámico. Rutas privadas (creación/edición de eventos) son es-only conforme a O10. Solo home y listados públicos consideran versión en (placeholder por ahora si el contenido no se traduce; el menú de navegación y CTAs sí en ambos).

### Bloque 9 — Integración de observaciones del Sprint 2

- **O15** — Verificar que el toast persiste correctamente cuando un server action hace `revalidatePath` + `redirect`. Si se pierde, ajustar el store o usar `searchParams` para mensaje flash entre rutas.
- **O16** — Si el listado de miembros (Sprint 2) no tiene UI clara de paginación más allá de 20, añadir botones "anterior/siguiente" con indicador "Página N de M". Pequeña tarea, hacer de paso.
- **O17** — Añadir JSDoc completo a la función `colorDeId` en `MiembroAvatar`: algoritmo, número de colores en el set, garantía de distribución.

---

## CRITERIOS DE ACEPTACIÓN DEL SPRINT 3

1. Visitante anónimo entra a `/eventos` y ve el listado público sin necesidad de login
2. Visitante anónimo entra a `/eventos/[id]` y ve detalle completo con CTA "Inicia sesión para asistir"
3. Curador_core crea un evento desde `/eventos/nuevo`: formulario valida con Zod, persiste correctamente
4. Curador_comunidad o miembro regular intentando acceder a `/eventos/nuevo` es redirigido o ve mensaje de permiso denegado
5. Miembro logueado confirma RSVP a un evento, recibe email vía Resend con detalles + .ics adjunto
6. El email de confirmación se ve coherente con la identidad visual del proyecto
7. RSVP de un miembro reduce cupo disponible en eventos con capacidad
8. Cuando capacidad se agota, el evento muestra "Lleno" y bloquea más RSVPs
9. Miembro cancela su RSVP, el cupo se libera automáticamente
10. Asistentes confirmados son visibles solo a miembros autenticados (no a anónimos)
11. Descarga de .ics funciona desde botón en página de detalle del evento
12. .ics se abre correctamente en Google Calendar, Apple Calendar y Outlook con hora UTC y zona horaria embebida
13. Eventos con modalidad online muestran URL + plataforma; presencial muestra dirección; híbrido muestra ambos
14. Hora del evento se muestra siempre con etiqueta "(CDMX)"
15. Home dinámico para anónimo muestra: manifiesto + territorios + próximo evento (si hay) + aliados + CTA unirse
16. Home dinámico para miembro logueado muestra: saludo + próximo evento con su estado de RSVP + aliados + acceso a dashboard
17. Si no hay eventos próximos, home muestra mensaje contextual sin romper la composición
18. `/aliados` lista a Change · Futurist.mx con su perfil institucional accesible
19. `/aliados/[id]` muestra perfil completo del aliado y, si hay sesión activa, lista de miembros vinculados
20. Observación O15 verificada: toast persiste correctamente con server action + redirect
21. Observación O16 cerrada: paginación de miembros tiene UI clara
22. Observación O17 cerrada: JSDoc de `colorDeId` documentado
23. CI verde en PR del Sprint 3
24. Preview deployment funcional con flujo end-to-end verificable

---

## RESTRICCIONES DE EJECUCIÓN

- **No construir** sistema de señales (Sprint 4)
- **No construir** archivo de eventos pasados (Sprint 5)
- **No construir** lista de espera funcional para eventos llenos (placeholder honesto con "Te avisaremos" sin lógica real)
- **No construir** recordatorios automáticos pre-evento (requiere job scheduler; diferir)
- **No construir** sistema de comentarios/anotaciones en eventos (Sprint 5+ si aplica)
- **No habilitar** Google OAuth todavía
- **No traducir** descripciones de eventos al inglés salvo que el evento mismo se marque como bilingüe (`idiomas: ['es', 'en']` en su entidad)

---

## TAREAS DE TRANSICIÓN DEL SPRINT 2

Estas tareas se cierran al INICIO del Sprint 3 antes de empezar el código de producto. Algunas son responsabilidad del equipo Change (dashboard), otras de Code:

1. **TT-S2-1** — Cerrar T3 (operación de dashboard del equipo Change): aplicar políticas RLS de Storage + verificar upload de avatar end-to-end en preview. Sin esto, criterios 8/9 del Sprint 2 quedan en limbo.
2. **TT-S2-2** — Verificación end-to-end del flujo Sprint 2 (10 min del equipo Change). Cualquier defecto encontrado se integra como pre-requisito antes de código de producto del Sprint 3.
3. **TT-S2-3** — PROMPT.md del Sprint 2 se mantiene sin cambios (decisión A confirmada).
4. **Versionar `docs/sprints/sprint-2/REVISION.md`** con el documento del chat estratégico.
5. **Atender O15, O16, O17** como parte del Bloque 9 de este sprint.

---

## ENTREGABLES Y VERSIONADO

Al cierre del sprint, generar en `docs/sprints/sprint-3/`:

- `PROMPT.md` (este documento, versionado al inicio del sprint)
- `ENTREGABLE.md` — reporte estructurado completo

Commits con prefijo `feat(sprint-3):` para código y `docs(sprint-3):` para documentos.

---

## SIGUIENTE PASO OBLIGATORIO

Cuando el sprint termine:

1. `ENTREGABLE.md` versionado en `docs/sprints/sprint-3/`
2. PR de `feat/sprint-3-eventos` listo para revisión
3. Preview deployment funcional con flujo end-to-end verificable
4. Documento regresa al chat estratégico para `REVISION.md` del Sprint 3
5. **Sprint 4 (señales con Modelo 1.5) NO inicia sin `REVISION.md` aprobada del Sprint 3**

---

*Speculative Futures CDMX · Prompt Sprint 3 · v1.0*
*Change Consulting · Mayo 2026*
