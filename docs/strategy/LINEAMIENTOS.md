# SPECULATIVE FUTURES CDMX
## Lineamientos de Proyecto y Sprint 0
### Change Consulting · Mayo 2026

---

## CONTEXTO

Speculative Futures CDMX es el capítulo Ciudad de México de la red global Speculative Futures, fundado en 2026. Opera como comunidad interdisciplinaria para imaginar, cuestionar y activar futuros desde foresight, diseño especulativo, innovación, cultura, tecnología, ciudad y sociedad.

La presencia digital actual (speculativefutures.mx) opera como pieza de marca fundacional: manifiesto, cinco territorios, contacto. Este documento define la evolución del proyecto hacia infraestructura web app completa: comunidad con membresía, eventos, perfiles, repositorio de señales y producto editorial.

Este documento es la fuente única de verdad para el proyecto. Cualquier instrucción que entre en conflicto con los lineamientos aquí definidos requiere actualización formal de este archivo antes de aplicarse en construcción.

---

## PARTE I — DECISIONES ARQUITECTÓNICAS CERRADAS

### 1. Modelo de membresía

Registro abierto sin filtro de aprobación curada. Cualquier persona puede unirse completando un formulario enriquecido en onboarding.

**Campos obligatorios del onboarding:**
- Nombre completo
- Email
- Disciplina o rol profesional
- Territorios de interés (multi-select sobre los cinco)
- Motivación corta (1-2 oraciones)
- Casilla opcional: "Quiero contribuir como Curador Comunidad (publicar señales)"

**Implicación técnica:**
- Sin entidad `Aplicación`. Registro va directo a creación de cuenta.
- Onboarding obligatorio en primer login.
- Auth recomendado: email + magic link (sin contraseña), o cuenta Google. Fricción mínima.
- Si el usuario activa la casilla de Curador Comunidad, su perfil queda en estado `curador_comunidad_pendiente_calibracion`.

### 2. Modelo de contribución de señales

**Modelo 1.5 con calibración de entrada.** Tres niveles de contribución:

**Curador Core** — equipo fundador de SF CDMX. Publican señales directamente, sin revisión. Definen el canon editorial durante los primeros 6 meses.

**Curador Comunidad** — miembros que activaron la casilla en onboarding. Sus primeras 3 señales pasan por revisión rápida (máximo 24h). Después de 3 señales aprobadas, obtienen publicación directa con auditoría post-hoc. Cuota blanda: 1 señal por mes (límite informativo, no técnico).

**Miembro regular** — lee, comenta, anota. Puede convertirse en Curador Comunidad cambiando preferencia en su perfil cuando lo desee.

**Implicación técnica:**
- Campo en perfil de miembro: `rol_contribucion` (regular | curador_comunidad | curador_core)
- Contador: `seniales_publicadas_aprobadas`
- Lógica: si `rol_contribucion = curador_comunidad` y `seniales_publicadas_aprobadas < 3`, las señales nuevas entran a cola de revisión. Si ≥ 3, publicación directa con flag `auditada: false`.
- Dashboard de curación con dos secciones: "Calibración (primeras 3)" y "Auditoría post-hoc (publicadas directas)".
- Sistema de feedback editorial: Curador Core puede comentar la propuesta antes de aprobar.
- Notificación al proponente cuando hay decisión.
- Crédito visible al proponente en cada señal publicada.

**Feature flag preparado:** `senales_publicacion_directa_modelo_2` (boolean, default false). Cuando se active, todos los Curador Comunidad obtienen publicación directa sin necesidad de calibración. Permite evolución sin refactor.

### 3. Relación con Change/Futurist.mx

**Hub neutro con Change como aliado fundador.** SF CDMX se posiciona como plataforma neutra con identidad propia. Change aparece como uno de varios aliados fundadores, con arquitectura preparada para sumar más.

**Compromiso operativo paralelo:** sumar 2-3 aliados fundadores adicionales en los primeros 6-9 meses. Candidatos prioritarios: instituciones académicas (CENTRO, ITESM con foresight, ITESO, IBERO), instituciones culturales (Casa del Tiempo, MUAC, museos especializados), colectivos internacionales de diseño especulativo con presencia en México, fundaciones culturales.

**Si en 9 meses no se han sumado aliados adicionales:** revisar la decisión. La narrativa de "hub neutro" se degrada cuando solo aparece un aliado.

**Implicación técnica:**
- Entidad `AliadoFundador` con campos: id, nombre, logo, descripcion_corta, tipo (academia | cultural | consultora | fundacion), link, fecha_incorporacion, rol_especifico (editorial | eventos | financiero | intelectual).
- Sección visible en home: tira de aliados fundadores con dignidad institucional, no como sponsors comerciales.
- Página `/aliados`: detalle de cada aliado, contribuciones, eventos en los que participó.
- Footer global: "Una iniciativa entre Change · Futurist.mx y aliados fundadores".
- Gobernanza editorial: decisión editorial es de SF CDMX como equipo, no de Change como consultora. Esto importa cuando empiecen a sumarse más aliados.

### 4. Multi-capítulo

**CDMX ahora, modelo de datos preparado para multi-capítulo.** El sistema opera mono-capítulo en UX, pero el modelo de datos contempla escala futura sin refactor.

**Implicación técnica:**
- Campo `capitulo_id` en todas las entidades centrales: Miembro, Evento, Señal, AliadoFundador, PiezaEditorial. Valor default `cdmx` durante el MDP.
- Tabla `capitulo` con un solo registro inicial (`cdmx`). Estructura lista para sumar registros sin migración.
- Branding hardcodeado a CDMX en MDP. Cuando se active multi-capítulo, branding se vuelve dinámico desde la entidad `capitulo`.
- **No se construye en MDP:** selector de capítulo, lógica de membresía cruzada, dashboard multi-capítulo, gobernanza distribuida.

**Pendiente operativo:** conversación con Speculative Futures global sobre planes de infraestructura compartida. La decisión actual permite tanto integración futura con la red global como independencia.

### 5. Estrategia de lengua

**Español primario con bilingüismo selectivo.** Infraestructura i18n nativa desde el día uno; activación de inglés solo en piezas con vocación de circulación internacional.

**Piezas bilingues por defecto:**
- Manifiesto
- Reportes anuales
- Dossiers temáticos premium
- Anuncios de eventos con ponentes internacionales
- Perfiles de aliados fundadores institucionales

**Resto del contenido:** español solamente. Newsletter, eventos locales, señales del día a día, comentarios, propuestas de Curador Comunidad — todo en español.

**Implicación técnica:**
- Sistema i18n nativo desde Sprint 1: `next-intl` si el stack es Next.js, o equivalente del stack elegido.
- URLs con prefijo configurable (`/es/manifiesto`, `/en/manifesto`).
- Campo `idiomas` en entidades editoriales (Pieza Editorial, Evento, Señal). Tipo: array. Default `['es']`.
- Detección de idioma del navegador en home: visitante con browser en inglés ve banner sutil "Some content available in English" con link directo a piezas en inglés. Home completo siempre se sirve en español (identidad CDMX).
- SEO bilingüe desde Sprint 1: meta-tags, hreflang, sitemap separado por idioma.
- **No se traducen automáticamente las contribuciones de miembros.** Una señal queda en el idioma en que fue escrita.

### 6. Monetización

**Marco de tres horizontes:**

**Horizonte 1 (mes 0-12) — Captura indirecta.** SF CDMX es 100% gratuito. Cero pagos, cero tiers, cero paywall. Retorno se captura via posicionamiento de marca, autoridad pública, leads orgánicos hacia Change y aliados fundadores.

**Horizonte 2 (mes 12-24) — Producto editorial premium.** Cuando hay archivo maduro (50+ señales, 8-10 eventos, 3-4 dossiers temáticos publicados), se activan tres líneas paid en evolución según madurez del archivo:
- Reportes trimestrales por suscripción (modelo Stratechery)
- Dossier anual de tendencias (compra única)
- Programas formativos / workshops pagados

La membresía sigue siendo gratuita. El premium es producto adicional opcional.

**Horizonte 3 (mes 24+) — Eventos pagados y sponsors específicos.** Sponsors aparecen como patrocinio explícito de pieza o evento específico, nunca como dilución de marca SF CDMX.

**Restricciones permanentes (no negociables):**
- No cobrar por membresía básica
- No mostrar publicidad de terceros
- No producir sponsored content disfrazado de editorial
- No vender, ceder o monetizar datos de miembros
- No convertir señales en producto pagado individualmente — las señales son bien común del capítulo

**Implicación técnica MDP:**
- No se construye: módulo de pagos, integración Stripe/MercadoPago, tiers de membresía, paywall, gestión de suscripciones.
- Sí se prepara dormido: entidad `Plan` (vacía), entidad `Suscripcion` (sin lógica activa), entidad `Sponsor` separada de `AliadoFundador` desde el día uno, campo `acceso_premium` en piezas editoriales (default false).

---

## PARTE II — ARQUITECTURA INICIAL DEL SISTEMA

### Entidades principales

**Miembro** — persona registrada. Campos: id, capitulo_id, nombre, email, foto, disciplina, territorios_interes, motivacion, rol_contribucion, bio_corta, enlaces_externos, fecha_registro, estado (activo | inactivo).

**Territorio** — taxonomía fija. Cinco registros: Futuros, Innovación & Negocios, Ciudad & Sistemas Vivos, Cultura & Sociedad, Tecnologías Emergentes. No editable por miembros, solo por Curador Core a nivel arquitectura.

**Señal** — unidad de inteligencia. Campos: id, capitulo_id, titulo, descripcion, fuente_url, fuente_descripcion, territorio_id, curador_id, tipo (tendencia | anomalia | contradiccion | hack | extremo | debilidad), horizonte_temporal, interpretacion_estrategica, fecha_captura, fecha_publicacion, estado (borrador | en_revision | aprobada | rechazada | publicada), idiomas, auditada.

**Evento** — producción de la comunidad. Campos: id, capitulo_id, titulo, descripcion, territorio_id, modalidad (online | presencial | hibrido), fecha_inicio, fecha_fin, ubicacion, capacidad, idiomas, ponentes, recursos_post_evento, señales_discutidas.

**RSVP** — relación Miembro × Evento. Campos: id, miembro_id, evento_id, estado (registrado | asistio | no_asistio), fecha_registro.

**PiezaEditorial** — ensayos, dossiers, reportes. Campos: id, capitulo_id, tipo (ensayo | dossier | reporte | briefing), titulo, contenido, autor_id, territorio_id, fecha_publicacion, idiomas, acceso_premium, señales_referenciadas.

**AliadoFundador** — entidad institucional. Campos descritos en sección 3.

**Conexion** — entidad transversal para mapear relaciones. Campos: id, entidad_origen_tipo, entidad_origen_id, entidad_destino_tipo, entidad_destino_id, tipo_relacion (convergencia | contradiccion | derivacion | referencia).

**Capítulo** — tabla con un solo registro inicial (`cdmx`).

### Roles

**Visitante** — sin login. Ve home, manifiesto, eventos públicos, piezas editoriales públicas, porción curada de señales destacadas.

**Miembro** — login completo. Acceso a archivo de señales completo, perfiles de otros miembros, archivo de eventos, comentarios y anotaciones, newsletter.

**Curador Comunidad** — miembro con permiso de publicación. Puede proponer señales (revisión inicial 3 piezas, después publicación directa).

**Curador Core** — equipo fundador. Publica señales directamente, aprueba/rechaza propuestas de Curador Comunidad, crea eventos, publica piezas editoriales, gestiona aliados fundadores, configura sistema.

**Aliado Fundador** — perfil institucional con visibilidad específica. Acceso a reportes editoriales premium cuando se activen, dashboard de su contribución al capítulo.

### Activación progresiva del MDP por olas

**Ola 1 — Fundación operativa (Sprint 1-3):**
Home dinámico (lee del backend), sistema de membresía con login y onboarding, perfiles, sistema completo de eventos con RSVP, página de manifiesto, página de aliados fundadores con Change como primer registro, newsletter básica.

**Ola 2 — Activación intelectual (Sprint 4-5):**
Sistema de señales con Modelo 1.5 (curador core publica + dashboard de curación + flujo de calibración para Curador Comunidad), conexión de eventos con señales discutidas y artefactos resultantes, página de archivo de eventos.

**Ola 3 — Producto editorial (Sprint 6-7):**
Sistema completo de piezas editoriales (ensayos, dossiers, reportes), bilingüismo activado en piezas seleccionadas, entidad Conexión para mapear relaciones entre señales, página de archivo editorial.

**Ola 4 — Cierre del MDP (Sprint 8):**
Pulido visual, performance, SEO bilingüe, accesibilidad, página de aliados fundadores expandida, infraestructura preparada para futuras activaciones (multi-capítulo, monetización).

---

## PARTE III — LINEAMIENTOS DE PROCESO DE TRABAJO

### Arquitectura del proceso

Tres herramientas, tres funciones, sin solapamiento:

**Chat estratégico** — donde se toman decisiones, se estructuran prompts arquitectónicos, se revisan entregables, se gestiona la dirección del proyecto. No construye; dirige.

**Claude Code** — donde se construye. Recibe instrucciones precisas, produce entregables (arquitectura, código, schemas, componentes), reporta avances. No decide arquitectura por sí solo en puntos críticos sin confirmación previa.

**Cowork** — automatización entre el sistema y la máquina local cuando aplique. No interviene en construcción ni decisión estratégica.

### Flujo operativo estándar

```
Decisión estratégica (chat)
       ↓
Prompt arquitectónico estructurado (chat → Code)
       ↓
Construcción del sprint (Code)
       ↓
Entrega de sprint a chat para revisión
       ↓
Revisión arquitectónica + correcciones (chat)
       ↓
Aprobación → siguiente sprint  |  Correcciones → vuelta a Code
```

### Principios no negociables

**Ningún sprint inicia sin revisión arquitectónica previa.** Cuando Code entrega Sprint 0 o cualquier sprint posterior, el documento regresa al chat estratégico antes de avanzar. Se identifican riesgos, huecos, decisiones mal planteadas. Solo entonces se autoriza el siguiente sprint.

**MDP no MVP.** Todos los módulos definidos en la arquitectura van en la primera salida, completos y deseables. Sin placeholders, sin "esto se agrega después", sin funcionalidades a medias.

**Deuda técnica explícita, no oculta.** Cualquier funcionalidad diferida (módulo de pagos, activación de multi-capítulo, integración con CRM externo) se registra en lista de deuda visible. No se oculta dentro de "lo veremos después".

**Cada sprint trae entregables verificables.** Criterios de aceptación concretos y comprobables. "Login con magic link enviado a email funcional" en lugar de "Sistema de autenticación funciona".

**Correcciones consolidadas antes del siguiente sprint.** Cuando hay cambios al Sprint 0 (decisiones nuevas que aparecen durante construcción), se genera un documento de correcciones que prevalece sobre el original. Code lo aplica al iniciar el siguiente sprint. Las decisiones nuevas no se pierden en el chat.

**Documentos del proyecto sin atribución a herramientas de IA.** Todos los entregables formales (arquitectura, correcciones, lineamientos, reportes) se producen como producto de Change Consulting. Sin co-autoría visible, sin firmas automáticas, sin metadata que revele proceso de generación.

### Función del chat estratégico por fase del proyecto

**Pre-código** — Estructurar decisiones críticas. Generar prompt del Sprint 0 con toda la decisión arquitectónica. Definir criterios de aceptación.

**Durante Sprint 0** — Esperar entrega de Code. Revisar arquitectura producida en cuatro dimensiones: completitud, coherencia interna, decisiones de alto costo, supuestos ocultos. Emitir veredicto: aprobado / aprobado con observaciones / requiere revisión.

**Sprint 1 en adelante** — Generar prompt autocontenido de cada sprint para Code. Revisar entregables sprint por sprint. Registrar deuda técnica acumulada. Mantener visión estratégica sobre el proyecto completo.

**Post-MDP** — Definir activaciones progresivas (cuándo prender Modelo 2 de señales, cuándo activar monetización Horizonte 2, cuándo abrir multi-capítulo). Reportes de salud del proyecto.

---

## PARTE IV — PRÓXIMOS PASOS OPERATIVOS

### Paso 1 — Auditoría de lo construido

Antes de generar Sprint 0 incremental, se audita el estado actual del proyecto en Claude Code:
- Stack tecnológico ya elegido y desplegado
- Estructura de carpetas y arquitectura del proyecto
- Decisiones técnicas implícitas en lo construido
- Funcionalidades activas en speculativefutures.mx
- Gaps entre lo construido y las decisiones de este documento

Responsable: chat estratégico, con input desde Claude Code sobre estado actual.

### Paso 2 — Sprint 0 incremental

Documento de arquitectura que **evoluciona lo existente** en lugar de pretender que el proyecto empieza desde cero. Incluye:
- Inventario de lo ya construido
- Modelo de datos completo (todas las entidades de este documento)
- Stack consolidado (lo existente más lo que falte)
- Plan de migración si algún componente actual debe cambiar
- Mapa de sprints por olas (descrito en Parte II)
- Criterios de aceptación por sprint

### Paso 3 — Compromisos paralelos no-técnicos

Durante construcción del MDP, se ejecutan en paralelo:

**Curación inicial de señales (Curador Core).** Para que la Ola 2 entregue valor real, debe existir un primer corpus de 20-30 señales de calidad publicadas por Curador Core el día del lanzamiento. Trabajo editorial que arranca antes del go-live.

**Conversación con potenciales aliados fundadores.** Iniciar contacto con 4-5 candidatos institucionales. Objetivo: 2-3 aliados sumados en los primeros 6-9 meses.

**Diálogo con Speculative Futures global.** Sondear posición sobre infraestructura compartida. Compartir el roadmap de SF CDMX como caso piloto regional.

**Estrategia de lanzamiento público.** Definir momento y narrativa de relanzamiento del sitio cuando el MDP esté listo. Incluye: comunicado de relanzamiento, presencia en redes, evento de fundación de la comunidad.

### Paso 4 — Ciclo de sprints

Una vez aprobado el Sprint 0 incremental, comienza el ciclo de sprints según olas. Cada sprint genera entregables verificables, regresa al chat estratégico para revisión, y solo después se autoriza el siguiente.

---

## REGISTRO DE DEUDA TÉCNICA Y DECISIONES DIFERIDAS

A medida que avance la construcción, esta sección se actualiza con:
- Funcionalidades diferidas explícitamente
- Decisiones pendientes de resolución
- Pendientes operativos no-técnicos

**Estado inicial:**

- Módulo de pagos: diferido a Horizonte 2 (mes 12+)
- Activación multi-capítulo: diferida hasta evidencia de demanda
- Modelo 2 de señales (publicación directa para todos los Curador Comunidad): diferido, controlado por feature flag
- Integración con CRM externo: no contemplada en MDP
- Sumar 2-3 aliados fundadores adicionales: compromiso operativo paralelo
- Conversación formal con Speculative Futures global sobre infraestructura: pendiente

---

*Speculative Futures CDMX · Lineamientos de Proyecto y Sprint 0 · v1.0*
*Change Consulting · Mayo 2026*
