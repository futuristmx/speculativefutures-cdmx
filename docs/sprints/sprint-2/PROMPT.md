# SPECULATIVE FUTURES CDMX — Prompt Sprint 2
## Membresía completa + Perfiles + Onboarding funcional
### Change Consulting · Mayo 2026 · v1.0

---

## CONTEXTO

El Sprint 1 entregó la infraestructura base: Supabase Pro configurado, auth con magic link operativo, middleware funcional, i18n, RLS de tablas, seed con curador core, CI verde, deuda técnica limpiada. Las páginas `/login`, `/onboarding` y `/dashboard` existen pero son placeholders.

Este Sprint 2 convierte esos placeholders en funcionalidad real. Al cierre del sprint, un visitante puede completar el flujo end-to-end: descubrir el proyecto en home → registrarse → recibir magic link → completar onboarding → llegar a su dashboard → ver y editar su perfil → ver perfiles de otros miembros.

Es el primer sprint con UI real de producto. Introduce shadcn/ui como librería de componentes según se decidió en Sprint 0.

---

## DOCUMENTOS DE REFERENCIA OBLIGATORIOS

Antes de iniciar, releer:

1. `CLAUDE.md` (raíz) — incluye nueva sección sobre aplicación de SQL contra DB Supabase
2. `docs/strategy/LINEAMIENTOS.md` — fuente única de verdad
3. `docs/sprints/sprint-0/ARQUITECTURA.md` — modelo de datos, RLS, roles, rutas
4. `docs/sprints/sprint-1/ENTREGABLE.md` + `REVISION.md` — estado del que partimos
5. `docs/sprints/sprint-1/PROMPT.md` — contexto de lo construido antes

Ante conflicto, prevalece `LINEAMIENTOS.md`.

---

## OBJETIVO DEL SPRINT 2

Hacer funcional el ciclo completo de miembro: registro → onboarding → dashboard → perfil propio editable → perfiles de otros miembros visibles. Convertir el sistema de "tiene infraestructura" a "tiene primera capa de producto operativa".

---

## DECISIONES ARQUITECTÓNICAS DEL CHAT ESTRATÉGICO PARA ESTE SPRINT

### D-S2-1 — Visibilidad de perfiles

Perfiles **visibles a miembros autenticados** (no a visitantes anónimos). Un miembro que entra y no puede ver a otros miembros rompe el sentido de comunidad.

Excepciones:
- **Visitantes anónimos**: no ven listas ni perfiles individuales de miembros
- **Aliados fundadores**: sus perfiles institucionales sí son públicos (visibles a anónimos) — esto se construye en Sprint 3, no en este

Campos sensibles que NUNCA se exponen a otros miembros, incluso autenticados:
- `email` (solo visible al propio miembro y a curador_core)
- `user_id` interno
- Datos de auth de Supabase

Campos visibles a otros miembros autenticados:
- Nombre, foto/avatar, disciplina, territorios de interés, motivación, bio_corta, enlaces externos, aliado fundador asociado (si lo tiene), fecha de incorporación

### D-S2-2 — Roles aditivos (resuelve O4 del Sprint 0)

Un Miembro puede acumular roles. Si tiene `rol_contribucion = curador_core` y `aliado_fundador_id` poblado, obtiene la **unión de permisos** de ambos roles, no la intersección ni una jerarquía.

Implementación: helper `lib/auth/permissions.ts` que recibe Miembro y devuelve set de permisos. La lógica de autorización en server actions consulta este helper, no campos individuales.

### D-S2-3 — Avatares

Default: iniciales generadas (componente que toma el nombre, extrae iniciales, las muestra sobre fondo de color derivado del user_id).

Upload de avatar real: incluido en este sprint. Bucket `avatars/` de Supabase Storage (RLS ya configurada en Sprint 1). Validación: imagen JPG/PNG/WebP hasta 2MB, redimensionada a max 512×512.

### D-S2-4 — Onboarding single-page

Una sola pantalla con el formulario completo. No multi-step. Los campos son pocos y el miembro completa todo en menos de 2 minutos. Multi-step añadiría fricción innecesaria.

### D-S2-5 — shadcn/ui se introduce en este sprint

Configurar con override completo a tokens del proyecto. Los componentes que se introducen ahora (no antes ni después):
- Form, Input, Textarea, Label, Select, Checkbox, MultiSelect (custom o derivado), Button, Card, Avatar, Toast

Otros componentes shadcn/ui se introducen en sprints futuros cuando sean necesarios. No "instalar todo por si acaso".

---

## ENTREGABLES OBLIGATORIOS

### Bloque 1 — Setup de shadcn/ui adaptado a tokens

- Instalar y configurar shadcn/ui con `components.json` apuntando a `styles/tokens.css`
- Override completo de variables CSS de shadcn a tokens del proyecto. No usar la paleta default de shadcn.
- Instalar componentes específicos enumerados en D-S2-5 (no más)
- Crear `components/ui/index.ts` re-exportando lo instalado
- Verificar que el aspecto visual de cada componente respeta la identidad del proyecto (tipografía Plus Jakarta Sans, paleta del proyecto, sin border-radius por default — todos cuadrados según el sistema de El Capitán que SF CDMX hereda)

### Bloque 2 — Onboarding funcional

**Ruta:** `app/[locale]/onboarding/page.tsx`

**Formulario en pantalla única:**
- Nombre completo (text, required)
- Disciplina o rol profesional (text, required)
- Territorios de interés (multi-select sobre los 5, mínimo 1 requerido)
- Motivación corta (textarea, 1-2 oraciones, 280 caracteres máx, required)
- Bio corta opcional (textarea, 500 caracteres, opcional)
- Enlaces externos (array dinámico de URLs, máximo 3, opcional)
- Casilla: "Quiero contribuir como Curador Comunidad" (checkbox, opcional)

**Server action:** `features/onboarding/actions/completar-onboarding.ts`
- Valida con Zod schema
- Persiste en tabla Miembro
- Si checkbox de curador comunidad: `rol_contribucion = curador_comunidad`
- Setea `onboarding_completado = true`
- Redirige a `/dashboard`

**Validaciones:**
- Nombre y disciplina: 2-100 caracteres
- Territorios: array de UUIDs válidos de tabla Territorio, mínimo 1
- Motivación: 20-280 caracteres
- URLs externas: regex de URL válida, máximo 3

### Bloque 3 — Dashboard de miembro

**Ruta:** `app/[locale]/dashboard/page.tsx`

Pantalla de bienvenida del miembro. Server component que lee datos del miembro autenticado.

**Contenido:**
- Saludo con nombre del miembro
- Mensaje contextual según rol (regular, curador_comunidad, curador_core, con o sin aliado fundador)
- Tres cards de acción rápida:
  - "Editar mi perfil" → `/perfil/yo`
  - "Explorar miembros" → `/miembros`
  - "Próximos eventos" → placeholder por ahora (Sprint 3 construye eventos)
- Footer con dato de membresía: "Miembro desde [fecha de registro]"

### Bloque 4 — Perfil propio editable

**Ruta:** `app/[locale]/perfil/yo/page.tsx`

Vista de perfil propio del miembro autenticado. Server component con server action para edición.

**Modos:**
- **Vista**: muestra los campos como en cualquier perfil público + campos privados (email, fecha de registro completa, rol explícito)
- **Edición**: mismo formulario que onboarding + campos adicionales (foto/avatar upload)

**Server action:** `features/perfil/actions/actualizar-perfil.ts`
- Misma validación Zod que onboarding
- Permite cambiar `rol_contribucion` solo si: regular → curador_comunidad (auto-promoción), no permite degradar ni saltar a curador_core
- Upload de avatar opcional: valida tipo MIME, tamaño, redimensiona, sube a bucket `avatars/`, guarda URL en `Miembro.foto`

### Bloque 5 — Perfil de otros miembros

**Ruta:** `app/[locale]/perfil/[id]/page.tsx`

Donde `[id]` es el `user_id` del miembro.

Server component que valida:
- Visitante anónimo → redirige a `/login` con mensaje "Inicia sesión para ver perfiles de la comunidad"
- Miembro autenticado → ve perfil con campos públicos (sin email, sin datos sensibles)
- Si `id === miembro_actual.user_id` → redirige a `/perfil/yo`

**Contenido:**
- Avatar
- Nombre, disciplina
- Territorios de interés (badges)
- Motivación
- Bio corta si existe
- Enlaces externos si existen
- Aliado fundador asociado si lo tiene (con link a su perfil institucional cuando se construya en Sprint 3)
- Fecha de incorporación (formato natural: "Miembro desde mayo 2026")
- Rol mostrado de forma sutil (badge "Curador Comunidad" o "Curador Core" si aplica; no se muestra "Regular" — es el default invisible)

### Bloque 6 — Listado de miembros

**Ruta:** `app/[locale]/miembros/page.tsx`

Vista de descubrimiento de la comunidad. Solo accesible a miembros autenticados.

**Contenido:**
- Grid de miembros con: avatar, nombre, disciplina, primer territorio de interés
- Filtros opcionales (sin implementar lógica aún, pero estructura preparada): por territorio, por rol
- Paginación de 20 miembros por página (asunción de volumen del review O9)
- Cada card lleva a `/perfil/[id]`
- Cliente: ordenamiento default por fecha de incorporación (más recientes primero)

### Bloque 7 — Componentes UI reutilizables

Crear en `components/`:

- `Avatar.tsx` — recibe Miembro, muestra foto si existe o iniciales generadas
- `RolBadge.tsx` — muestra badge según rol, oculta si rol es regular
- `TerritorioBadge.tsx` — muestra territorio con color asociado (definir en tokens)
- `MiembroCard.tsx` — card resumen para usar en listado y en cualquier contexto donde se muestre un miembro
- `FormularioOnboarding.tsx` — reutilizado en onboarding y en edición de perfil propio

### Bloque 8 — Helper de permisos (D-S2-2)

`lib/auth/permissions.ts` — exporta:

```typescript
type Permiso = 'leer_seniales_publicadas' | 'proponer_senial' | 
               'publicar_senial_directa' | 'aprobar_senial' | 
               'crear_evento' | 'editar_perfil_propio' | 
               'editar_perfil_aliado' | 'leer_dossier_premium' |
               ... etc

function obtenerPermisos(miembro: Miembro): Set<Permiso>
function tienePermiso(miembro: Miembro, permiso: Permiso): boolean
```

La lógica es aditiva: union de permisos según `rol_contribucion` Y según si tiene `aliado_fundador_id`.

Documentar la matriz de permisos en JSDoc dentro del archivo.

### Bloque 9 — i18n strings

Ampliar `messages/es.json` con todos los strings UI nuevos: formulario de onboarding, dashboard, mensajes de perfil, validaciones, botones, toasts de éxito/error.

`messages/en.json` se mantiene como subconjunto. Las rutas privadas (onboarding, dashboard, perfil) **no requieren traducción al inglés** según observación O10 del Sprint 0 — solo el contenido público se traduce selectivamente.

---

## CRITERIOS DE ACEPTACIÓN DEL SPRINT 2

1. Un miembro recién creado vía magic link puede completar onboarding en menos de 3 minutos
2. Onboarding falla con mensaje claro si campos requeridos están vacíos o mal formateados
3. Casilla "Curador Comunidad" en onboarding actualiza correctamente `rol_contribucion` a `curador_comunidad`
4. Después de completar onboarding, el miembro es redirigido a `/dashboard` automáticamente
5. `/dashboard` muestra nombre del miembro, mensaje contextual por rol, y tres cards de acción
6. `/perfil/yo` muestra los datos del miembro autenticado, incluidos campos privados (email, fecha completa)
7. `/perfil/yo` permite editar todos los campos del onboarding + foto de avatar
8. Upload de avatar funciona: validación de tipo/tamaño, redimensionamiento, persistencia en `avatars/` bucket
9. Avatar se muestra correctamente en perfil propio, perfil de otros, y MiembroCard
10. Si miembro no tiene foto, se muestran iniciales generadas con fondo de color consistente (mismo color para el mismo user_id)
11. `/perfil/[id]` muestra perfil público de otro miembro sin exponer email ni datos sensibles
12. Visitante anónimo intentando acceder a `/perfil/[id]` es redirigido a `/login`
13. Si miembro accede a su propio `/perfil/[id]`, es redirigido a `/perfil/yo`
14. `/miembros` lista todos los miembros con paginación de 20, ordenados por fecha de incorporación descendente
15. Visitante anónimo intentando acceder a `/miembros` es redirigido a `/login`
16. Cambio de rol regular → curador_comunidad funciona desde edición de perfil
17. Intentar cambiar rol a curador_core desde la UI falla (solo se asigna vía seed o server action protegida)
18. Helper `obtenerPermisos` retorna union correcta de permisos para miembros con curador_core + aliado_fundador
19. shadcn/ui componentes muestran identidad visual del proyecto (tokens, no defaults)
20. CI verde en PR del Sprint 2
21. Preview deployment funcional con flujo end-to-end verificable

---

## RESTRICCIONES DE EJECUCIÓN

- **No construir** sistema de eventos, RSVP, señales, editorial — esos son Sprints 3-7
- **No construir** página de aliados fundadores (Sprint 3)
- **No construir** home dinámico — se mantiene el home actual estático hasta Sprint 3
- **No habilitar** Google OAuth (sigue diferido)
- **No traducir** contenido al inglés más allá de lo público (manifiesto, etc., que ni siquiera se actualiza en este sprint)
- **No tocar** archivos de sprints anteriores salvo el `ENTREGABLE.md` de Sprint 1 si aún hay pulidos pendientes de la transición

---

## TAREAS DE TRANSICIÓN DEL SPRINT 1

Estas son las tareas de cierre del Sprint 1 que se ejecutan al INICIO del Sprint 2, antes de empezar el código de producto:

1. **T1 — Baseline Prisma migrations** (desde máquina local con acceso directo)
2. **T2 — Integración Vercel↔Supabase + primer preview deployment funcional**
3. **T3 — Aplicar RLS de Storage desde panel** (decisión A confirmada)
4. **Versionar `docs/sprints/sprint-1/REVISION.md`** con el documento entregado por el chat
5. **Añadir nueva sección al `CLAUDE.md`** sobre política de aplicación de SQL (O11 del review)
6. **Pulir inconsistencia textual** en `ENTREGABLE.md` del Sprint 1 (O12 del review)

Estas tareas pueden hacerse en paralelo con la construcción del Sprint 2 si no bloquean (T2 puede tardar por configuración externa). T1 sí debe completarse antes de cualquier `prisma migrate dev` del Sprint 2.

---

## ENTREGABLES Y VERSIONADO

Al cierre del sprint, generar en `docs/sprints/sprint-2/`:

- `PROMPT.md` (este documento, versionado al inicio del sprint)
- `ENTREGABLE.md` — reporte estructurado:
  - Qué se construyó
  - Decisiones tomadas durante construcción
  - Desviaciones del plan
  - Estado de cada criterio de aceptación
  - Capturas o evidencia del flujo end-to-end funcional (link al preview deployment funcional)

Commits con prefijo `feat(sprint-2):` para código y `docs(sprint-2):` para documentos.

---

## SIGUIENTE PASO OBLIGATORIO

Cuando el sprint termine:

1. `ENTREGABLE.md` versionado en `docs/sprints/sprint-2/`
2. PR de `feat/sprint-2-miembros` listo para revisión
3. Preview deployment funcional con flujo end-to-end verificable
4. Documento regresa al chat estratégico para `REVISION.md` del Sprint 2
5. **Sprint 3 NO inicia sin `REVISION.md` aprobada del Sprint 2**

---

*Speculative Futures CDMX · Prompt Sprint 2 · v1.0*
*Change Consulting · Mayo 2026*
