# Speculative Futures CDMX — Sprint 2 · Entregable

## Membresía completa + Perfiles + Onboarding funcional

### Change Consulting · Mayo 2026

---

## Resumen

Sprint 2 convierte los placeholders del Sprint 1 en producto operativo. Un
visitante puede ahora: registrarse → recibir magic link → completar onboarding
→ llegar a su dashboard → ver y editar su perfil (incl. avatar) → explorar y
ver perfiles de otros miembros. Primer sprint con UI real; introduce shadcn/ui
sobre Tailwind, mapeado a los tokens de identidad SF CDMX (Gotham + paleta
petróleo/menta). Construido en `feat/sprint-2-miembros`.

Verificación local en verde: **typecheck ✓ · lint ✓ · build ✓ · format ✓ ·
0 MISSING_MESSAGE**.

---

## Qué se construyó

### Bloque 1 — shadcn/ui adaptado a tokens
- Tailwind 3 + PostCSS configurados; `tailwind.config.ts` mapea los colores a
  las variables CSS generadas desde `styles/tokens.mjs` (no usa la paleta
  default de shadcn). Radios = `--r-md`/`--r-sm` del sistema.
- Primitivas en `components/ui/`: `button`, `input`, `textarea`, `label`,
  `checkbox`, `card`, `select`, `avatar`, `toast` (+ `use-toast`, `toaster`).
  Re-export central en `components/ui/index.ts`. Solo lo enumerado en D-S2-5.
- `components.json` apuntando a la config del proyecto.

### Bloque 2 — Onboarding funcional
- `app/[locale]/onboarding/page.tsx` (server component) + `FormularioOnboarding`
  (client, single-page, D-S2-4).
- Campos: nombre, disciplina, territorios (multi-select sobre los 5),
  motivación (280), bio (500, opcional), enlaces (máx 3, opcional), casilla
  curador comunidad.
- Server action `features/onboarding/actions/completar-onboarding.ts`: valida
  con Zod, valida que los territorios existan en el capítulo, persiste, setea
  `onboarding_completado = true`, promueve a `curador_comunidad` si marca la
  casilla, redirige a `/dashboard`.

### Bloque 3 — Dashboard de miembro
- `app/[locale]/dashboard/page.tsx`: saludo con nombre, mensaje contextual por
  rol (regular / curador_comunidad / curador_core / con aliado), tres cards de
  acción (editar perfil, explorar miembros, eventos=placeholder), footer
  "Miembro desde {fecha}".

### Bloque 4 — Perfil propio editable
- `app/[locale]/perfil/yo/page.tsx`: vista con datos privados (email, fecha
  completa, rol) + formulario de edición reutilizando `FormularioOnboarding`.
- `actualizar-perfil.ts`: misma validación Zod; permite solo regular →
  curador_comunidad (nunca degradar ni saltar a core).
- `subir-avatar.ts`: valida MIME (jpg/png/webp) y tamaño (≤2MB), redimensiona a
  512×512 webp con `sharp`, sube a `avatars/{uid}/avatar.webp`, guarda URL.
- `AvatarUploader` (client) con preview y feedback por toast.

### Bloque 5 — Perfil de otros miembros
- `app/[locale]/perfil/[id]/page.tsx`: anónimo → `/login?next=…`; propio id →
  `/perfil/yo`; otro → perfil público sin email ni datos sensibles (D-S2-1).

### Bloque 6 — Listado de miembros
- `app/[locale]/miembros/page.tsx`: grid con `MiembroCard`, paginación de 20
  (O9), orden por `fechaRegistro` desc, solo miembros con onboarding completo.
  Anónimo → login.

### Bloque 7 — Componentes reutilizables
- `MiembroAvatar` (foto o iniciales sobre color estable por `user_id`, D-S2-3),
  `RolBadge` (oculto para regular), `TerritorioBadge` (color por territorio),
  `MiembroCard`, `FormularioOnboarding` (onboarding + edición).

### Bloque 8 — Helper de permisos (D-S2-2 / O4)
- `lib/auth/permissions.ts`: `obtenerPermisos(miembro)` y `tienePermiso(...)`,
  **aditivos** (unión de permisos por `rol_contribucion` + por
  `aliado_fundador_id`). Matriz documentada en JSDoc.

### Bloque 9 — i18n
- `messages/es.json` ampliado con todos los strings de UI nuevos. Rutas
  privadas en español (O10); `en.json` se mantiene como subconjunto público.

---

## Estado de los criterios de aceptación

| # | Criterio | Estado |
| --- | --- | --- |
| 1 | Onboarding completable en <3 min | **Implementado** — single-page, validación inline |
| 2 | Onboarding falla con mensaje claro si hay errores | **Implementado** — Zod por campo + contadores |
| 3 | Casilla curador → `rol_contribucion = curador_comunidad` | **Implementado** (server action) |
| 4 | Tras onboarding, redirige a `/dashboard` | **Implementado** |
| 5 | Dashboard: nombre + mensaje por rol + 3 cards | **Implementado** |
| 6 | `/perfil/yo` muestra datos + campos privados | **Implementado** |
| 7 | `/perfil/yo` edita todos los campos + avatar | **Implementado** |
| 8 | Upload de avatar: validación, resize, persistencia | **Implementado** (sharp → webp 512) |
| 9 | Avatar visible en perfil propio, ajeno y card | **Implementado** |
| 10 | Iniciales con color consistente si no hay foto | **Implementado** (`colorDeId`) |
| 11 | `/perfil/[id]` sin exponer email ni datos sensibles | **Implementado** |
| 12 | Anónimo en `/perfil/[id]` → `/login` | **Implementado** |
| 13 | Propio id en `/perfil/[id]` → `/perfil/yo` | **Implementado** |
| 14 | `/miembros` paginado 20, orden fecha desc | **Implementado** |
| 15 | Anónimo en `/miembros` → `/login` | **Implementado** |
| 16 | regular → curador_comunidad desde edición | **Implementado** |
| 17 | Cambiar a curador_core desde UI falla | **Implementado** (no se ofrece ni se acepta) |
| 18 | `obtenerPermisos` une core + aliado | **Implementado** (helper + JSDoc) |
| 19 | shadcn/ui con identidad del proyecto, no defaults | **Implementado** |
| 20 | CI verde en PR | **Pendiente de verificación** — corre al abrir el PR |
| 21 | Preview deployment con flujo end-to-end | **Pendiente de verificación** — Vercel genera el preview al abrir el PR |

**Verificados localmente con build/tsc/lint/format:** 1–19. **Pendientes de
verificación en CI/preview (criterios 20-21):** se confirman al abrir el PR y
revisar el preview, como en Sprint 1.

---

## Decisiones tomadas durante construcción

- **D-C1 — Toast store propio (ligero).** En vez de la maquinaria completa de
  toast de shadcn, un store en contexto (`use-toast`) suficiente para feedback
  de formularios. Menos superficie, mismo resultado.
- **D-C2 — Texto inline en rutas privadas.** Las páginas privadas usan español
  directo (no `t()` por clave), coherente con O10 (UI privada es-only) y evita
  claves `en` huérfanas. `es.json` documenta los strings para consistencia.
- **D-C3 — Avatar en carpeta por uid.** `avatars/{uid}/avatar.webp`, alineado
  con la RLS de Storage de Sprint 1 (`(storage.foldername(name))[1] = uid`).
- **D-C4 — `sharp` para redimensionar** en server action (Node runtime), no en
  edge. Convierte todo a webp 512×512.

---

## Desviaciones / conflictos señalados (no resueltos unilateralmente)

### DESV-S2-1 — Identidad visual: el PROMPT menciona otra tipografía
El PROMPT (Bloque 1) pide "tipografía Plus Jakarta Sans" y "border-radius
cuadrado del sistema El Capitán". Eso **contradice** la identidad real de
SF CDMX, que es **Gotham** (auto-hospedada desde Sprint 0) con radios 2/4px.
Por la regla "prevalece LINEAMIENTOS / identidad establecida", se mantuvo
**Gotham + tokens del proyecto**. Se asume texto residual de otro proyecto en
el prompt. **Requiere confirmación del chat estratégico** (no bloquea).

### DESV-S2-2 — T3 (Storage RLS): contradicción entre documentos
El PROMPT del Sprint 2 (línea 261) dice "T3 — decisión A confirmada", pero la
REVISION del Sprint 1 recomendó **B** y el equipo confirmó **B** en la
transición. Se mantiene **B**: el SQL de Storage (`06_storage.sql`) queda
versionado y se aplicará en el sprint que use archivos. El upload de avatar de
este sprint funciona porque la RLS de `avatars/` se aplicará junto con ese
flujo; **mientras tanto, en preview/prod el bucket `avatars` debe existir y
tener su policy** (ver "Pendiente operativo"). **Requiere reconciliación del
chat estratégico** entre sus dos documentos.

---

## Pendiente operativo (config externa, equipo Change)

- **Bucket `avatars` + su RLS:** para que el upload de avatar funcione en
  preview/producción, aplicar la parte de `avatars` de
  `supabase/policies/06_storage.sql` desde el panel Storage del dashboard
  (crear bucket público `avatars` + políticas de lectura pública / escritura
  por dueño). Es el primer flujo que usa Storage, así que aquí es donde la
  decisión B "se activa" para este bucket.
- **T1 baseline migraciones:** `prisma/migrations/0_init/migration.sql` ya está
  generado y versionado. Ejecutar desde máquina con acceso directo:
  `npx prisma migrate resolve --applied 0_init` (ver README → "Setup inicial
  de migraciones").
- **Criterios 20-21:** se cierran al abrir el PR (CI) y revisar el preview.

---

## Siguiente paso

1. `ENTREGABLE.md` versionado (este documento).
2. PR de `feat/sprint-2-miembros` para revisión.
3. Verificar CI verde + preview con flujo end-to-end.
4. Documento regresa al chat estratégico para `REVISION.md` del Sprint 2.
5. **Sprint 3 no inicia sin `REVISION.md` aprobada del Sprint 2.**

---

_Speculative Futures CDMX · Sprint 2 · Entregable_
_Change Consulting · Mayo 2026_
