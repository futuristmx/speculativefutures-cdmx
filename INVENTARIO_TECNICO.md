# Inventario Técnico — Speculative Futures CDMX

> Documento de estado actual del repositorio. Inventario fiel, sin propuestas de cambio ni mejoras.
> Fecha de generación: 2026-05-30
> Repositorio: `github.com/futuristmx/speculativefutures-cdmx`
> Total de código fuente propio: ~2,193 líneas (excluyendo `node_modules`, `.next`, artefactos de diseño).

---

## 1. Stack tecnológico activo

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| Framework | Next.js | `14.2.29` | App Router (no Pages Router) |
| Librería UI | React | `^18.3.1` | |
| | React DOM | `^18.3.1` | |
| Lenguaje | TypeScript | `^5` | `strict: true` |
| Runtime de email | Resend (SDK) | `^6.12.4` | Único servicio externo en backend |
| Build tool | Next.js / Webpack (interno) | — | No hay bundler custom (sin Vite/Turbopack explícito) |
| Hosting | Vercel | — | Inferido por configuración (ver §8) |
| Gestor de paquetes | npm | — | `package-lock.json` presente |

**Tipos de desarrollo (`devDependencies`):** `@types/node@^20`, `@types/react@^18`, `@types/react-dom@^18`, `typescript@^5`.

**Scripts disponibles (`package.json`):**
```json
"dev":   "next dev"
"build": "next build"
"start": "next start"
```
No existen scripts de `lint`, `test`, `format` ni `type-check`.

---

## 2. Estructura de carpetas y arquitectura

```
/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API Route (POST) — envío de email
│   ├── globals.css               # Estilos globales + tokens CSS + animaciones
│   ├── icon.svg                  # Favicon (isotipo) — auto-servido por Next.js
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Página raíz (renderiza <SiteApp/>)
│
├── components/
│   ├── SiteApp.tsx               # Componente orquestador (estado global de UI)
│   ├── sections/                 # Secciones de página (de alto nivel)
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── NextEvent.tsx
│   │   ├── Territorios.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Footer.tsx
│   │   ├── Archive.tsx           # ⚠️ NO importado (huérfano)
│   │   └── Voces.tsx             # ⚠️ NO importado (huérfano)
│   ├── overlays/                 # Modales
│   │   ├── Overlay.tsx           # Wrapper base de modal
│   │   ├── JoinOverlay.tsx
│   │   ├── ComunidadOverlay.tsx
│   │   └── ContactFormOverlay.tsx
│   └── ui/                       # Átomos / primitivas reutilizables
│       ├── WLogo.tsx
│       ├── WIsotype.tsx
│       ├── WBtn.tsx
│       ├── WTag.tsx
│       ├── Eyebrow.tsx
│       ├── Duotone.tsx
│       ├── NodeNetwork.tsx
│       ├── Reveal.tsx
│       ├── ContactForm.tsx
│       ├── InstagramLink.tsx
│       └── TweaksWidget.tsx
│
├── lib/
│   ├── tokens.ts                 # Constantes de diseño (colores, fuente, estilos meta)
│   └── useReveal.ts              # ⚠️ Hook NO importado (huérfano)
│
├── public/
│   └── fonts/                    # Fuentes Gotham auto-hospedadas (.otf)
│       ├── Gotham-Black.otf
│       ├── Gotham-Bold.otf
│       ├── Gotham-Medium.otf
│       └── Gotham-Thin.otf
│
├── project/                      # Artefactos de diseño (ignorados en git)
├── chats/                        # Transcripciones de diseño (ignorados en git)
├── next.config.js
├── tsconfig.json
├── package.json
├── package-lock.json
├── next-env.d.ts
├── .gitignore
└── README.md                     # Instrucciones de handoff (Claude Design)
```

**Patrón arquitectónico:** Componente único de cliente (`SiteApp.tsx`) que centraliza todo el estado de UI (overlays, variantes de hero, toggles del widget) y lo distribuye por props a secciones. La página (`page.tsx`) es mínima y solo monta `SiteApp`. Arquitectura de **una sola página (SPA-like)** sobre App Router, con navegación por anclas (`#id`).

**Jerarquía de componentes:** `sections/` (composición) → `ui/` (átomos) + `overlays/` (modales). `lib/` provee tokens y un hook.

---

## 3. Componentes construidos y su estado

### Secciones (`components/sections/`)
| Componente | Estado | Notas |
|-----------|--------|-------|
| `Nav.tsx` | **Completo** | Sticky, menú desktop + hamburguesa móvil con drawer full-screen, hover menta, Instagram, lock de scroll |
| `Hero.tsx` | **Completo** | 3 variantes (`nodes`, `duotono`, `editorial`); 3 titulares intercambiables |
| `NextEvent.tsx` | **Completo** (contenido placeholder) | "Próximamente · Online", sin fecha/tema reales — texto provisional intencional |
| `Territorios.tsx` | **Completo** | 5 territorios con datos hardcoded |
| `Manifesto.tsx` | **Completo** | 3 frases hardcoded |
| `Footer.tsx` | **Completo** | CTA + formulario de contacto inline + firma + Instagram |
| `Archive.tsx` | **Huérfano / no montado** | Construido y funcional (filtro por territorio), pero **NO importado** en `SiteApp`. Contiene 6 señales **mock** |
| `Voces.tsx` | **Huérfano / no montado** | Construido, **NO importado** en `SiteApp`. Contiene 3 voces **mock** |

### Overlays (`components/overlays/`)
| Componente | Estado | Notas |
|-----------|--------|-------|
| `Overlay.tsx` | **Completo** | Base: backdrop, cierre por click-fuera y tecla Escape |
| `JoinOverlay.tsx` | **Parcial / mock funcional** | Captura email pero **no envía a ningún backend**; muestra estado "Señal recibida" sin persistencia |
| `ComunidadOverlay.tsx` | **Mock intencional** | Login "Próximamente"; campos deshabilitados (`disabled`), no hay autenticación real |
| `ContactFormOverlay.tsx` | **Completo** | Reusa `ContactForm`; conectado a `/api/contact` |

### UI (`components/ui/`)
| Componente | Estado | Notas |
|-----------|--------|-------|
| `WLogo.tsx` | Completo | Logo SVG inline |
| `WIsotype.tsx` | Completo | Isotipo SVG (triángulo + nodo) |
| `WBtn.tsx` | Completo | Botón con variantes `primary`/`ghost`/`link`, estado hover por `useState` |
| `WTag.tsx` | Completo | Etiqueta/pill con estado activo |
| `Eyebrow.tsx` | Completo | Encabezado índice + label |
| `Duotone.tsx` | Completo | Placeholder visual de retrato (gradientes CSS, sin imagen real) |
| `NodeNetwork.tsx` | Completo | Grafo SVG animado con IntersectionObserver propio |
| `Reveal.tsx` | Completo | Wrapper de animación scroll-reveal (IO + fallback para above-fold) |
| `ContactForm.tsx` | Completo | Formulario compartido (footer inline + overlay); conectado a `/api/contact` |
| `InstagramLink.tsx` | Completo | Enlace a `@futures_mex`, abre en pestaña nueva |
| `TweaksWidget.tsx` | Completo | Panel flotante de control (variante hero, titular, retícula, movimiento); colapsa en móvil |

**Componentes de cliente vs servidor:** 17 archivos `.tsx` declaran `'use client'`. Renderizan como Server Components (sin `'use client'`): `ui/Duotone`, `ui/Eyebrow`, `ui/WIsotype`, `ui/WLogo`, `sections/Voces`, `sections/Manifesto`, `sections/Territorios`.

---

## 4. Dependencias principales y razón de instalación

### Dependencies (runtime)
| Paquete | Por qué está |
|---------|--------------|
| `next@14.2.29` | Framework base (App Router, API routes, build, optimización de fuentes/estáticos) |
| `react@^18.3.1` / `react-dom@^18.3.1` | Librería UI requerida por Next.js |
| `resend@^6.12.4` | SDK de envío de email transaccional; usado exclusivamente en `app/api/contact/route.ts` para el formulario de contacto |

### DevDependencies
| Paquete | Por qué está |
|---------|--------------|
| `typescript@^5` | Compilación/tipado del proyecto |
| `@types/node@^20` | Tipos de Node (APIs de servidor en API route) |
| `@types/react@^18` / `@types/react-dom@^18` | Tipos de React |

**No hay** dependencias de: testing, linting, formateo, gestión de estado externa (Redux/Zustand), data-fetching (React Query/SWR), CSS frameworks, ni component libraries.

---

## 5. Estado del backend

**Backend mínimo presente**, vía un único API Route de Next.js:

- **`app/api/contact/route.ts`** — Handler `POST` (serverless function, marcada `ƒ (Dynamic)` en el build).
  - Valida presencia de `RESEND_API_KEY` (devuelve `503` si falta).
  - Parsea JSON `{ nombre, email, mensaje }`; valida campos (devuelve `400` si faltan).
  - Envía email vía Resend:
    - `from`: `Speculative Futures CDMX <onboarding@resend.dev>` (remitente compartido de Resend, sin dominio verificado propio).
    - `to`: `speculativefuturescdmx@gmail.com` (hardcoded en constante `DESTINATION`).
    - `replyTo`: el email del remitente del formulario.
    - Cuerpo HTML inline construido por template string.
  - Devuelve `500` ante error de Resend, `200 {ok:true}` en éxito.

**No existe:** base de datos, ORM, autenticación, persistencia, gestión de sesiones, ni otros endpoints. Los overlays `JoinOverlay` (newsletter) y `ComunidadOverlay` (login) **no tienen backend** — el primero simula éxito en cliente; el segundo es un placeholder con campos deshabilitados.

---

## 6. Sistema de routing y páginas existentes

- **Routing:** App Router de Next.js (basado en sistema de archivos bajo `app/`).
- **Páginas / rutas:**
  | Ruta | Archivo | Tipo |
  |------|---------|------|
  | `/` | `app/page.tsx` | Estática (`○ Static`) — única página de contenido |
  | `/api/contact` | `app/api/contact/route.ts` | Dinámica (`ƒ`) — serverless POST |
  | `/_not-found` | (generada por Next.js) | 404 por defecto, sin personalizar |
- **Navegación interna:** por anclas hash (`#eventos`, `#territorios`, `#manifiesto`, `#contacto`, `#top`) con `scroll-behavior: smooth`. No hay rutas anidadas, dinámicas, ni segmentos `[param]`.
- **Metadata:** definida en `app/layout.tsx` (title, description, OpenGraph con `locale: es_MX`). Favicon vía `app/icon.svg`. `<html lang="es">`.

---

## 7. Sistema de estilos

Enfoque **híbrido**, sin framework de CSS:

1. **CSS global** (`app/globals.css`, 233 líneas):
   - **35 variables CSS** en `:root` (paleta `--sf-*`, roles semánticos, tipografía, espaciado, radios, motion, layout).
   - **6 reglas `@font-face`** para la familia Gotham (pesos 300–900 mapeados a 4 archivos `.otf` auto-hospedados).
   - Animaciones `@keyframes` (`lineIn`, `dotIn`, `signalPulse`, `kickerBlink`) y clases de scroll-reveal (`.reveal`, `.in`, `.no-motion`).
   - Reglas de hover de componentes (`.signal-card`, `.voz-card`, `.terr-row`, `.nav-link`).
   - **Media queries responsive** (breakpoints en `880px` y `768px`): swap de menú desktop↔hamburguesa, apilado de grids, ajuste del widget Tweaks, prevención de overflow horizontal.

2. **Estilos inline** (`style={{ }}`): patrón dominante — **21 de los archivos `.tsx`** usan estilos inline. La mayor parte del layout, color y tipografía se aplica vía objetos `React.CSSProperties` inline.

3. **Tokens en TS** (`lib/tokens.ts`): constantes JS (`C` para colores, `FONT`, `meta`, `HAIR`) consumidas por los estilos inline. Duplican parcialmente las variables CSS.

**No se usa:** Tailwind, styled-components, Emotion, CSS Modules, Sass, ni ninguna librería de CSS-in-JS. La unidad tipográfica es Gotham (auto-hospedada); fallback a `system-ui`.

---

## 8. Configuración de deployment activa

- **`next.config.js`:** vacío — objeto `nextConfig = {}` sin opciones personalizadas.
- **Hosting:** Vercel (inferido por el flujo de trabajo y el `.gitignore` que incluye `.vercel`). **No hay `vercel.json`** — se usa la detección automática de Next.js por Vercel.
- **CI/CD:** **No hay `.github/workflows`** ni ningún archivo de CI. El despliegue depende de la integración nativa GitHub→Vercel (auto-deploy en push a `main`).
- **Variables de entorno:** se configuran en el dashboard de Vercel (no versionadas). `.gitignore` excluye `.env*`.
- **Build output (del último `next build`):**
  - `/` → estática, ~8.2 kB, First Load JS ~95 kB.
  - `/api/contact` → función serverless dinámica.
  - First Load JS compartido ~87 kB.
- **Dominio:** producción en dominio propio (configurado a nivel DNS/Vercel, fuera del repositorio).

---

## 9. Decisiones técnicas implícitas detectables en el código

- **App Router sobre Pages Router** — uso de `app/`, `route.ts`, `layout.tsx` con `Metadata` API.
- **Estado centralizado por props, sin librería de estado** — `SiteApp.tsx` mantiene todo el estado de UI con `useState` y lo pasa hacia abajo; no hay Context API ni store global.
- **Estilos inline + tokens TS como sistema de diseño principal**, relegando `globals.css` a fuentes, variables, animaciones y media queries (lo que no puede expresarse inline fácilmente).
- **Animaciones manuales con IntersectionObserver** implementadas a mano en `Reveal.tsx` y `NodeNetwork.tsx`, en lugar de una librería de animación (Framer Motion, etc.).
- **Fuentes auto-hospedadas** en `public/fonts/` con `@font-face` manual, en lugar de `next/font`.
- **Inicialización lazy del cliente Resend** dentro del handler (`new Resend(apiKey)` por request) en vez de a nivel de módulo — decisión que evita el fallo de build cuando la env var no está presente.
- **Componente "Tweaks" de previsualización embebido en producción** (`TweaksWidget`) — controles de variante de diseño expuestos en el sitio en vivo, sugiriendo una fase provisional/exploratoria.
- **Contenido bilingüe de naming** — código y commits en inglés/español; UI íntegramente en español (`lang="es"`, `locale: es_MX`).
- **Datos de contenido hardcoded** en los componentes (territorios, manifiesto, señales mock, voces mock) — sin CMS ni fuente de datos externa.
- **Patrón de componente reutilizable para formularios** — `ContactForm` compartido entre el footer inline y el overlay modal, con prop `compact`.
- **Firma de commits deshabilitada localmente** y autoría reescrita (detectable solo en historial git, no en el árbol de trabajo).

---

## 10. Tests existentes

**Ninguno.** No hay:
- Archivos `*.test.*` ni `*.spec.*`.
- Configuración de Jest, Vitest, Cypress, Playwright ni Testing Library.
- Scripts de test en `package.json`.
- Dependencias de testing instaladas.

Cobertura de pruebas automatizadas: **0%** (inexistente).

---

## 11. Variables de entorno requeridas

| Variable | Uso | Dónde | Obligatoria |
|----------|-----|-------|-------------|
| `RESEND_API_KEY` | API key de Resend para envío de email del formulario de contacto | `app/api/contact/route.ts:7` | **Sí** para que el formulario funcione. Si falta, el endpoint responde `503` y el formulario muestra error en cliente. El resto del sitio funciona sin ella. |

- Es la **única** variable de entorno referenciada en el código (`process.env`).
- No está versionada (excluida por `.gitignore`); se gestiona en el dashboard de Vercel.
- No existe archivo `.env.example` ni documentación de variables en el repo.

---

## 12. Deuda técnica visible en el código actual

1. **Componentes huérfanos (código muerto):**
   - `components/sections/Archive.tsx` — completo y funcional pero **no importado** en ningún lado.
   - `components/sections/Voces.tsx` — completo pero **no importado**.
   - `lib/useReveal.ts` — hook **no importado** por ningún componente (su lógica fue reimplementada inline en `Reveal.tsx` y `NodeNetwork.tsx`).

2. **Lógica de scroll-reveal duplicada:** el patrón de IntersectionObserver existe en tres lugares (`lib/useReveal.ts` no usado, `Reveal.tsx`, `NodeNetwork.tsx`) con implementaciones divergentes.

3. **Duplicación de tokens de diseño:** los colores y tipografía están definidos **dos veces** — como variables CSS en `globals.css` (`--sf-*`) y como constantes TS en `lib/tokens.ts` (`C`). No hay una sola fuente de verdad.

4. **Datos mock embebidos:** `Archive.tsx` (6 señales) y `Voces.tsx` (3 voces) contienen contenido placeholder hardcoded; los enlaces "Leer la señal →" / "Ver perfil →" apuntan a `href="#"`.

5. **Email del destinatario hardcoded:** `speculativefuturescdmx@gmail.com` está fijo en `route.ts` (constante `DESTINATION`), no parametrizado por env var.

6. **Remitente Resend sin dominio verificado:** se usa `onboarding@resend.dev` (remitente compartido de Resend), lo que en cuentas no verificadas limita el envío al email de registro y afecta entregabilidad/branding.

7. **Widget de previsualización en producción:** `TweaksWidget` (controles de diseño) queda expuesto en el sitio en vivo; es herramienta de desarrollo/preview, no de cara al usuario final.

8. **Ausencia de tooling de calidad:** sin ESLint, Prettier, ni `type-check` en CI; sin tests; sin `vercel.json` ni workflows de GitHub. El control de calidad depende del `next build` manual.

9. **`Reveal.tsx` con `as` tipado laxo:** usa `as = 'div'` con `React.createElement(as, ...)` y `ref` casteado, perdiendo verificación de tipos sobre el elemento renderizado (decisión tomada para evitar conflictos de tipos SVG/HTML).

10. **Sin manejo de estados de error visibles más allá del formulario:** `JoinOverlay` simula éxito sin validación real ni feedback de fallo; `ComunidadOverlay` es un placeholder no funcional.

11. **README desalineado con el estado actual:** el `README.md` sigue siendo el instructivo de handoff de "Claude Design" (cómo implementar el bundle), no documenta el proyecto ya implementado.

---

*Fin del inventario. Documento descriptivo del estado actual; no contiene recomendaciones.*
