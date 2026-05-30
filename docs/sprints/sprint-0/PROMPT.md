# SPECULATIVE FUTURES CDMX — PROMPT SPRINT 0 INCREMENTAL
## Para ejecución en Claude Code
### Change Consulting · Mayo 2026 · v1.1

---

## CONTEXTO

Speculative Futures CDMX es proyecto activo. El estado actual es landing page funcional desplegado en speculativefutures.mx (Next.js 14 + React 18 + TypeScript estricto + Resend, hospedado en Vercel).

El proyecto debe evolucionar a web app completa según los lineamientos del documento `speculative-futures-lineamientos.md` que se encuentra fuera del repo como entregable de Change Consulting. El inventario del estado actual está en `INVENTARIO_TECNICO.md` versionado en repo.

Este sprint es **Sprint 0 incremental**: produce el documento de arquitectura que evoluciona lo existente hacia la web app definida en lineamientos. **No se escribe código de producto en este sprint.** Solo arquitectura.

---

## DOCUMENTOS DE REFERENCIA OBLIGATORIOS

Antes de empezar, leer en este orden:

1. **`speculative-futures-lineamientos.md`** (proporcionado fuera del repo) — fuente única de verdad del proyecto. Contiene las seis decisiones arquitectónicas cerradas, modelo conceptual de entidades, roles y olas de activación.

2. **`INVENTARIO_TECNICO.md`** (versionado en repo, raíz) — estado actual fiel del proyecto.

Si cualquier instrucción de este prompt entra en conflicto con el documento de lineamientos, **prevalece el documento de lineamientos**. Si entra en conflicto con el inventario, prevalece este prompt.

---

## STACK CONSOLIDADO (DECIDIDO, NO REABRIR)

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Next.js 14 App Router + React 18 + TypeScript estricto | Existente, sin cambio |
| Base de datos | Supabase PostgreSQL — **plan Pro activo** | No-pausing, 8GB DB, PITR 7 días |
| ORM | Prisma | Nuevo |
| Auth | Supabase Auth con Resend SMTP custom obligatorio | Pro NO elimina el límite nativo de 4 emails/hora — sigue siendo necesario SMTP custom |
| Email transaccional | Resend (free tier 3,000/mes) | Existente, se amplía como SMTP de Supabase |
| Storage | Supabase Storage (100GB en Pro) | Nuevo |
| Database branching | Supabase Pro + Vercel preview deployments | Activar en Sprint 1 |
| Backups | PITR habilitado desde día 1 | Pro feature |
| i18n | next-intl | Nuevo |
| Estilos | Identidad existente + tokens consolidados + CSS Modules para componentes nuevos | Evolución |
| Componentes | shadcn/ui con override completo de estilos a tokens del proyecto | Nuevo |
| Hosting | Vercel | Existente |
| CI/CD | GitHub Actions estándar Vercel | Existente |
| Control de versiones | GitHub | Existente |

**Restricciones de costo:** stack opera con Supabase Pro ($25/mes), Resend free, Vercel Hobby (o Pro si tráfico lo amerita). Sin servicios paid adicionales fuera de estos.

---

## OBJETIVO DEL SPRINT 0 INCREMENTAL

Producir el documento `SPRINT-0-ARQUITECTURA.md` (versionado en repo, raíz) que contiene la arquitectura completa de la web app, partiendo del estado actual y evolucionando hacia los lineamientos.

---

## ENTREGABLES OBLIGATORIOS DEL DOCUMENTO

### Sección 1 — Inventario evolutivo
Mapeo explícito de lo que el inventario técnico actual conserva, refactora, añade o elimina. Cuatro listas separadas:

- **Se conserva sin cambios:** archivos, estructura, decisiones técnicas que sobreviven al MDP.
- **Se refactora:** archivos, sistemas o patrones que evolucionan (sin reemplazo total). Especificar qué cambia y por qué.
- **Se añade desde cero:** todo lo nuevo necesario para alcanzar el MDP.
- **Se elimina antes del Sprint 1:** archivos huérfanos, componentes obsoletos, código muerto. Esto se ejecuta como tarea de limpieza, no como sprint.

### Sección 2 — Modelo de datos en Prisma schema
Schema Prisma completo (`schema.prisma`) con todas las entidades de los lineamientos:

- `Capitulo` (con un registro inicial: `cdmx`)
- `Miembro` (con `capitulo_id`, `rol_contribucion`, `seniales_publicadas_aprobadas`, territorios de interés como relación, motivación, disciplina, etc.)
- `Territorio` (taxonomía fija de cinco, seed inicial)
- `Senial` (con `capitulo_id`, curador, territorio, tipo, estados, idiomas, auditada)
- `Evento` (con modalidad, ponentes como JSON o relación, idiomas, capacidad)
- `RSVP` (relación Miembro × Evento)
- `PiezaEditorial` (ensayo, dossier, reporte, briefing, con `acceso_premium` default false)
- `AliadoFundador` (con tipo, rol específico, fecha de incorporación; primer registro: Change · Futurist.mx)
- `Conexion` (entidad transversal para mapear relaciones entre señales, eventos, piezas)
- `Plan` y `Suscripcion` (dormidas, sin lógica activa, preparadas para Horizonte 2 de monetización)
- `Sponsor` (separada de AliadoFundador, dormida)

**Nota sobre auth:** Supabase Auth maneja `auth.users` internamente. La tabla `Miembro` de Prisma extiende con datos de aplicación y se vincula por `user_id` (UUID de Supabase Auth). No crear tabla de tokens de magic link — Supabase lo gestiona.

Incluir:
- Enums para todos los campos de estado
- Constraints únicos (email de miembro único por capítulo)
- Índices para consultas frecuentes (señales por territorio, eventos próximos, etc.)
- Relaciones explícitas con `@relation` y cascada apropiada
- Comentarios `///` en cada entidad explicando su propósito

### Sección 3 — Estructura de carpetas evolucionada
Árbol completo de carpetas del proyecto después de la evolución. Justificar cada decisión estructural. Considerar:

- Separación por feature/dominio vs por tipo (recomendado: por feature)
- Carpeta `lib/` para utilidades compartidas (incluyendo cliente Supabase)
- Carpeta `components/` para componentes UI reutilizables
- Carpeta `app/` con rutas organizadas por dominio
- Carpeta `prisma/` para schema y migraciones
- Carpeta `messages/` para archivos i18n de next-intl
- Carpeta `styles/` para tokens consolidados y globals
- Cualquier carpeta adicional necesaria

### Sección 4 — Mapa de rutas (públicas y privadas)
Tabla completa de rutas del MDP con:
- Path
- Tipo (pública / requiere login / requiere rol específico)
- Idiomas (es / es+en)
- Ola del MDP en la que se construye

Cubrir todas las rutas necesarias para los módulos definidos en lineamientos: home, manifiesto, territorios, eventos, señales, editorial, aliados, perfiles de miembros, login, onboarding, dashboard de miembro, dashboard de curación, área de configuración.

### Sección 5 — Arquitectura de autenticación
Diseño completo de Supabase Auth + Resend SMTP:

- Configuración de Supabase Auth (providers: magic link email + Google OAuth opcional)
- **Conexión obligatoria de Resend como SMTP custom en Supabase** — incluir paso a paso de configuración en Supabase Dashboard
- Templates de email transaccional (registro, magic link, recuperación) — diseño coherente con identidad visual del proyecto
- Flujo completo de onboarding desde landing hasta primer login
- Manejo de sesiones en App Router (server components vs client components) usando `@supabase/ssr`
- Middleware de protección de rutas
- Integración con tabla `Miembro` de Prisma (Supabase Auth maneja `auth.users`, Miembro extiende con datos de aplicación, sincronización vía trigger o via aplicación)
- Decisión arquitectónica explícita: ¿cómo se crea el registro de `Miembro` cuando se crea el `auth.users` correspondiente? (Trigger PostgreSQL vs lógica de aplicación en server action)

### Sección 6 — Sistema de roles y permisos
Matriz Rol × Acción × Recurso:

Roles: visitante, miembro, curador_comunidad, curador_core, aliado_fundador.

Acciones por recurso:
- Señales: leer, proponer, publicar directo, aprobar propuestas, editar propias, eliminar
- Eventos: leer, RSVP, crear, editar, cancelar
- Piezas editoriales: leer, crear, editar, publicar
- Aliados fundadores: leer, editar perfil propio, gestionar
- Configuración: ver, editar

Implementación: **Row Level Security de Supabase a nivel DB** + verificación en server actions a nivel aplicación. Documentar ambas capas, la jerarquía y las políticas RLS específicas por tabla (en SQL, no solo en lenguaje natural).

### Sección 7 — Estrategia de i18n con next-intl
- Estructura de archivos `messages/es.json`, `messages/en.json`
- Rutas con prefijo: `/es/manifiesto`, `/en/manifesto`
- Detección de idioma del navegador en home
- Banner sutil "Some content available in English" para visitantes con browser en inglés
- Manejo de piezas con campo `idiomas: ['es']` o `['es', 'en']`
- Generación de hreflang y sitemap bilingüe
- Política: piezas con un solo idioma muestran solo ese idioma, no redirigen ni fuerzan traducción automática

### Sección 8 — Sistema de estilos
Plan de consolidación de tokens:

- Source of truth único: archivo TypeScript con tokens (colores, espacios, tipografía, breakpoints)
- Generación automática de variables CSS desde tokens TS al build
- Eliminación de duplicación entre `globals.css` y tokens TS
- Estrategia para componentes nuevos: CSS Modules por componente
- Estrategia para componentes existentes: se mantienen como están salvo refactor explícito por feature
- Integración de shadcn/ui: configuración de `components.json` con override completo a tokens del proyecto

### Sección 9 — Plan de limpieza de deuda técnica
Lista ordenada de tareas de limpieza a ejecutar **antes del Sprint 1**, no como parte de sprints regulares:

- Eliminar archivos huérfanos: `Archive.tsx`, `Voces.tsx`, `lib/useReveal.ts`
- Sacar `TweaksWidget` de producción (mantenerlo solo en desarrollo con flag de entorno)
- Verificar dominio `speculativefutures.mx` en Resend
- Reemplazar hardcoding de destinatario/remitente de email en `/api/contact`
- Actualizar `README.md` al estado real del proyecto
- Consolidar tokens duplicados entre CSS y TS

Cada tarea con criterio de "hecho" verificable.

### Sección 10 — Configuración Supabase Pro y Vercel
Aprovechamiento de capacidades Pro desde Sprint 1:

- **No-pausing confirmado** — DB siempre activa
- **PITR habilitado** — backups continuos, recuperación a cualquier punto de 7 días
- **Database branching integrado con Vercel** — cada PR en GitHub crea preview deployment con su propia copia de DB
- **Storage 100GB** — política de carpetas: `/avatars/`, `/eventos/`, `/dossiers/`, `/aliados/`
- **Edge Functions** — disponibles si se necesitan en el MDP (probablemente no, pero documentar caso de uso)
- **Variables de entorno necesarias** en `.env.local` y en Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` (Prisma), `RESEND_API_KEY`, `NEXTAUTH_URL` (si aplica), etc.

### Sección 11 — Mapa de sprints por olas
Plan completo de sprints siguiendo las olas definidas en lineamientos:

**Ola 1 — Fundación operativa (Sprint 1-3)**
- Sprint 1: infraestructura (Supabase Pro setup, Prisma migrations, Supabase Auth + Resend SMTP, i18n, database branching, limpieza de deuda)
- Sprint 2: membresía, perfiles, onboarding
- Sprint 3: eventos y RSVP, home dinámico, página de aliados

**Ola 2 — Activación intelectual (Sprint 4-5)**
- Sprint 4: señales (Modelo 1.5 con calibración), dashboard de curación
- Sprint 5: archivo de eventos, conexión eventos-señales

**Ola 3 — Producto editorial (Sprint 6-7)**
- Sprint 6: piezas editoriales, bilingüismo activado en piezas seleccionadas
- Sprint 7: entidad Conexión activa, archivo editorial, mapas de relaciones

**Ola 4 — Cierre del MDP (Sprint 8)**
- Pulido visual, performance, SEO bilingüe, accesibilidad, infraestructura dormida para activaciones futuras

Para cada sprint:
- Entregables concretos
- Dependencias técnicas con sprints anteriores
- Criterios de aceptación verificables (no narrativos)

### Sección 12 — Criterios de aceptación del MDP completo
Lista de comportamientos verificables que definen "MDP terminado". Ejemplos:

- "Visitante puede registrarse con email, recibir magic link y completar onboarding en menos de 3 minutos"
- "Curador Comunidad con 3 señales aprobadas publica su 4ta señal sin pasar por cola de revisión"
- "Miembro hace RSVP a evento y recibe email de confirmación"
- "Página de manifiesto se muestra en español por defecto y permite cambio a inglés"
- "Curador Core publica pieza editorial y queda visible en archivo editorial"

Mínimo 20 criterios. Cada uno debe ser comprobable manualmente o vía test.

### Sección 13 — Decisiones arquitectónicas pendientes
Lista clasificada por criticidad:

- **CRÍTICA** (bloquea Sprint 1): decisiones que deben resolverse antes de empezar a construir
- **IMPORTANTE** (bloquea un sprint posterior): decisiones que pueden esperar pero tienen sprint específico que las requiere
- **DIFERIBLE** (puede resolverse durante construcción): decisiones tácticas menores

Cada decisión: opciones consideradas, recomendación con justificación, sprint que la requiere.

---

## CRITERIOS DE ACEPTACIÓN DE ESTE SPRINT 0

El documento `SPRINT-0-ARQUITECTURA.md` se considera entregado correctamente si:

1. Contiene las 13 secciones obligatorias completas
2. El schema Prisma es ejecutable (`prisma validate` pasa sin errores) — incluirlo como archivo separado en `prisma/schema.prisma` además de en el documento
3. Cada decisión técnica está justificada, no solo enunciada
4. El mapa de sprints tiene criterios de aceptación verificables por sprint
5. No se escribe código de producto (componentes, server actions, API routes nuevos). Solo arquitectura y schema.
6. Cualquier conflicto con los lineamientos se señala explícitamente con justificación; no se resuelve unilateralmente
7. Las decisiones diferidas están registradas con criterio de cuándo retomarlas
8. Documento producido sin atribución a herramientas de IA en metadata, encabezado o pie
9. Las políticas RLS están escritas en SQL ejecutable, no solo en lenguaje natural

---

## RESTRICCIONES DE EJECUCIÓN

- **No instalar dependencias** en este sprint. Solo definir cuáles se instalarán en Sprint 1.
- **No crear archivos de código** salvo `prisma/schema.prisma` y el documento de arquitectura.
- **No ejecutar migraciones** de base de datos.
- **No configurar servicios externos** (Supabase, Resend) — solo documentar cómo se configurarán en Sprint 1.
- **No tocar archivos existentes del proyecto actual** salvo crear los dos archivos nuevos mencionados.

---

## SIGUIENTE PASO OBLIGATORIO

Cuando este sprint termine:

1. El documento `SPRINT-0-ARQUITECTURA.md` y el archivo `prisma/schema.prisma` quedan versionados en repo (commit + push a main).
2. El documento regresa al chat estratégico de Change Consulting para revisión arquitectónica.
3. **Ningún sprint de construcción inicia sin aprobación explícita del chat estratégico.** No proceder a Sprint 1 por iniciativa propia.

---

*Speculative Futures CDMX · Prompt Sprint 0 Incremental · v1.1*
*Change Consulting · Mayo 2026*
