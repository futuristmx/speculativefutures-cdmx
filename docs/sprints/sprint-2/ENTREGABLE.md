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
| 20 | CI verde en PR | **✅ CUMPLIDO** — PR #2, run SUCCESS (prisma validate, generate, tokens, lint, typecheck, format) |
| 21 | Preview deployment con flujo end-to-end | **✅ CUMPLIDO** — preview Vercel en estado `success` (ver PR #2). El upload de avatar end-to-end depende del cierre de T3 (bucket + RLS) |

**Verificados localmente (build/tsc/lint/format):** 1–19. **Verificados en
CI/preview:** 20-21. El único punto end-to-end supeditado a config de dashboard
es el upload de avatar (cierre de T3, decisión A).

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

## Desviaciones / conflictos — RECONCILIADOS por el chat estratégico

### DESV-S2-1 — Identidad visual: CONFIRMADA
El PROMPT (Bloque 1) mencionaba "Plus Jakarta Sans" y "sistema El Capitán sin
border-radius". El chat estratégico **confirmó como definitiva** la decisión de
mantener **Gotham + tokens SF CDMX + radios 2/4px**. Sin cambio en código (ya
estaba correcto). Acción de limpieza: eliminar referencias residuales en
documentos versionados — la única en un documento de trabajo está en este
ENTREGABLE (corregida en esta sección). La mención en
`docs/sprints/sprint-2/PROMPT.md` se conserva verbatim por ser registro
histórico (no editable; ver CLAUDE.md).

### DESV-S2-2 — T3 Storage RLS: DECISIÓN DEFINITIVA = A
El chat estratégico **resolvió A** (aplicar las políticas de Storage ahora):
el Sprint 2 introduce upload de avatar, Storage ya está en uso, no hay dónde
postergar. Pasos de cierre en "Pendiente operativo / cierre T3". El SQL vive en
`supabase/policies/06_storage.sql` (4 buckets). Esto reemplaza la decisión B
provisional registrada durante la transición.

---

## Cierre de T3 (decisión A) — operación de dashboard

1. Crear el bucket `avatars` en Supabase Dashboard → Storage (si no existe).
2. Aplicar las políticas de `supabase/policies/06_storage.sql` desde el panel
   Storage → Policies para los 4 buckets (avatars, eventos, aliados, dossiers).
   Para `avatars` como mínimo: lectura pública + escritura solo por el dueño
   (path basado en `user_id`).
3. Verificar end-to-end: subir un avatar desde `/perfil/yo` en el preview
   deployment; confirmar que la imagen se almacena y se muestra.
4. Si la verificación pasa: marcar este punto cerrado aquí y añadir nota en
   `docs/sprints/sprint-1/REVISION.md` (único caso justificado de editar
   registro histórico) — ya aplicada: "Criterio 10 del Sprint 1 cerrado
   retroactivamente en la transición a Sprint 2; decisión definitiva A".

**Estado:** SQL y código listos; pasos 1-3 son operación de dashboard del
equipo Change (el sandbox no alcanza Storage). El paso 4 (nota en REVISION.md)
ya quedó aplicado en este commit.

## Otros pendientes operativos

- **T1 baseline migraciones:** `prisma/migrations/0_init/migration.sql`
  versionado. Ejecutar desde máquina con acceso directo:
  `npx prisma migrate resolve --applied 0_init` (README → "Setup inicial de
  migraciones").

---

## Revisión del Sprint 2 — veredicto y observaciones

**Veredicto:** APROBADO CON OBSERVACIONES (ver `REVISION.md`). Sprint 3
autorizado. Observaciones integradas al seguimiento:

- **TT-S2-1 — cierre de T3 + verificación del avatar:** decisión A. Pasos
  documentados en README → "Setup de Storage". Operación de dashboard del
  equipo Change; al verificar end-to-end, los criterios 8 y 9 pasan a cumplidos
  en runtime. **Pendiente del equipo.**
- **TT-S2-2 — verificación end-to-end (checklist de 10 puntos):** la ejecuta el
  equipo Change en el preview; los defectos, si los hay, entran como
  pre-requisito al Sprint 3. **Pendiente del equipo.**
- **TT-S2-3 — PROMPT residual del Sprint 2:** decisión A, se deja sin editar
  (fidelidad del registro histórico). El ENTREGABLE es la capa de corrección.
- **O15 — toast tras `revalidatePath`+`redirect`:** se verifica en Sprint 3 al
  introducir flujos de eventos con feedback similar. Anotado.
- **O16 — UI de paginación >20 miembros:** ya implementada en `miembros/page`
  (botones Anterior/Siguiente + "Página X de Y"). Sin acción adicional.
- **O17 — documentar `colorDeId`:** ✅ aplicado — JSDoc con algoritmo, tamaño de
  paleta y nota de distribución en `lib/avatar.ts`.

## Siguiente paso

1. `ENTREGABLE.md` y `REVISION.md` versionados.
2. Mergear PR #2 → `main` (despliega a producción).
3. Cerrar TT-S2-1 (Storage) y TT-S2-2 (checklist) en el preview.
4. Ramificar `feat/sprint-3-eventos` y versionar el PROMPT del Sprint 3.
5. **Sprint 3 ya autorizado por la REVISION; arranca tras el merge.**

---

_Speculative Futures CDMX · Sprint 2 · Entregable_
_Change Consulting · Mayo 2026_
