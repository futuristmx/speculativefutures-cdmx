# Go-live posts delivery

_Started 2026-05-29 18:27 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Speculative Futures CDMX — Design System"
Project currently has 8 file(s)
Current date is now May 29, 2026
</system-info>

<default aesthetic_system_instructions>
The user has not attached a design system. If they have ALSO not attached references or art direction, and the project is empty, you must ASK the user what visual aesthetic they want. Use the questions_v2 tool to ask about preferred vibe, audience, colors, type, mood, etc. Do NOT just pick your own visual aesthetic without getting the user's aesthetic input -- this is how you get slop!

Once answered, use this guidance when creating designs:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic_system_instructions>

<pasted_text name="Pasted text (170 lines)">
# Playbook de Lanzamiento · Instagram @futures_mex
### Speculative Futures CDMX · go-live + estrategia de mediano plazo

---

## 0. Veredicto y ruteo

El valor no está en un bot que publique. Está en un **sistema editorial** que vuelve la producción consistente y un **motor de diseño** (plantillas) que elimina el diseño desde cero. Eso es lo automatizable y lo que sostiene una comunidad, no una cuenta.

| Frente | Herramienta | Por qué |
|---|---|---|
| Estrategia de contenidos | Este playbook + sesiones contigo | Criterio editorial, no se delega a una herramienta. |
| Diseño de publicaciones | **Claude Design** | Plantillas maestras gobernadas por el design system; cada post se *rellena*, no se diseña. |
| Publicación / programación | **Meta Business Suite** | Oficial, gratis, agenda y auto-publica imágenes y carruseles. |
| Pipeline por código (Graph API) | Claude Code — **diferido** | Solo cuando el volumen lo justifique. Hoy: sobreingeniería. |

**Requisito previo (5 min):** convierte @futures_mex a cuenta **Business/Creator** (Ajustes → Tipo de cuenta, gratis) y conéctala a una **página de Facebook** y a **Meta Business Suite**. Sin esto no hay programación.

---

## 1. Estrategia de contenidos (mediano plazo)

### Tesis editorial (la frase que ordena todo)
**Hacemos visible lo que empieza a cambiar y abrimos la conversación que normalmente ocurre en mesas separadas.**

Todo post responde a una de tres funciones: **leer** (señal), **conectar** (voces, comunidad) o **convocar** (eventos, participación). Si una pieza no hace ninguna, no se publica.

### El motor editorial: 5 formatos recurrentes
La consistencia no depende de inspiración semanal, sino de formatos fijos que se repiten y se reconocen. Cada formato tiene su plantilla (sección 2) y su receta de generación (sección 6).

1. **SEÑAL** — lectura de un cambio emergente: qué es, por qué importa, qué implica para CDMX. Es el formato firma. Demuestra la disciplina de foresight. *Frecuencia: el ancla semanal.*
2. **VOZ** — perfil breve de alguien que piensa, investiga o construye futuros. Visibiliza talento, construye red. *Frecuencia: quincenal.*
3. **PREGUNTA** — una provocación bien formulada que abre conversación en comentarios. Bajo costo de producción, alto retorno de comunidad. *Frecuencia: semanal.*
4. **EVENTO / CONVOCATORIA** — fechas, formatos, llamados a unirse o proponer. *Frecuencia: según calendario.*
5. **IDEA ANCLA** — fragmento editorial del manifiesto o un concepto de alfabetización de futuros (posible, plausible, probable, preferible; señal débil; backcasting). Construye autoridad y enseña el vocabulario. *Frecuencia: quincenal.*

### Cadencia
**3 publicaciones por semana** es el punto realista de sostenibilidad para un capítulo nuevo. Mejor 3 consistentes que 6 y abandonar.

Ritmo sugerido (ajustable): **Martes** Señal · **Jueves** Pregunta o Voz · **Sábado** Idea ancla o Evento. Stories sueltas entre medio para subir alcance sin costo de diseño.

### Arco de lanzamiento (8 semanas)
| Semana | Énfasis | Objetivo |
|---|---|---|
| 1 | **Go-live: los 6 posts** (regreso → evento → manifiesto → visión → qué hacemos → convocatoria) — 2 filas del feed | Reactivar, anticipar y convocar. |
| 2 | Primera SEÑAL + primera PREGUNTA | Demostrar el valor, activar comentarios. |
| 3 | Primera VOZ + Idea ancla | Construir red y enseñar el lenguaje. |
| 4 | Anuncio del **primer evento** | Convertir audiencia en comunidad presencial. |
| 5–8 | Motor en régimen (Señal/Pregunta/Voz/Evento) | Consistencia, recurrencia, pertenencia. |

### Bio de Instagram (cópiala)
> **Speculative Futures CDMX**
> Comunidad para imaginar, cuestionar y activar futuros posibles desde CDMX.
> Foresight · diseño especulativo · innovación · cultura · ciudad · tecnología.
> 📍 Ciudad de México · capítulo de @speculativefutures
> 👇 Únete / propón una conversación

Categoría sugerida: *Organización comunitaria* o *Educación*. Link: cuando la web esté lista, va ahí; mientras, un link-in-bio simple (un solo destino: formulario de "únete" o WhatsApp/Comunidad).

### Tono (no negociable)
Estratégico, sofisticado, claro, humano, accesible sin perder profundidad. **Prohibido:** futurismo cliché, misticismo, exceso de buzzwords, tono motivacional, "somos el futuro", y la estructura "no es X, es Y". Afirmaciones precisas, no contrastes decorativos.

---

## 2. Sistema de plantillas (automatizar el diseño)

Automatizar el diseño = construir **una vez** un set de plantillas maestras en Claude Design, gobernadas por el design system, y después *rellenarlas*. Seis plantillas cubren todo el motor:

| Plantilla | Base | Acento menta en |
|---|---|---|
| **Cover / Lanzamiento** | Petróleo 4:5, logo reverso, claim display | El claim o una palabra clave |
| **Señal** | Petróleo, kicker `SEÑAL · fecha`, titular, tag de territorio, implicación | Kicker + enlace/CTA |
| **Voz** | Petróleo, retrato duotono verde, nombre, rol, tag | Nombre o nodo activo |
| **Pregunta** | Petróleo, pregunta grande centrada, mucho aire | Signo de interrogación o palabra eje |
| **Evento** | Petróleo, fecha grande, título, lugar/formato, CTA | Fecha + botón |
| **Idea ancla** | Petróleo, frase editorial corta, atribución de marca | Palabra eje |

Todas comparten: fondo petróleo `#062424`, tipografía **Gotham** (Black para display, Bold para subtítulos, Medium para cuerpo), un solo acento menta `#66EBAC`, hairlines/coordenadas de CDMX como firma, logo en esquina. Formato **4:5 (1080×1350)** para feed; carruseles cuando una idea necesita respirar.

### Prompt maestro para Claude Design (genera el set)
> Pega primero el bloque de marca (abajo). Luego:
>
> "Crea un set de 6 plantillas para Instagram (4:5, 1080×1350) para Speculative Futures CDMX, todas sobre fondo petróleo `#062424` con tipografía Gotham y un solo acento menta `#66EBAC`. Plantillas: (1) Cover/Lanzamiento con el claim en display; (2) Señal con kicker 'SEÑAL · fecha', titular, tag de territorio e implicación; (3) Voz con espacio para retrato en duotono verde, nombre y rol; (4) Pregunta con una pregunta grande centrada y mucho aire; (5) Evento con fecha grande, título, lugar y botón; (6) Idea ancla con una frase editorial corta. Cada una con el isotipo (triángulo + nodo de contorno esmeralda) en una esquina y una hairline con las coordenadas 19.4326° N · 99.1332° W. Estética editorial, sobria, alto contraste. Hazlas como plantillas reutilizables que pueda rellenar."

**Bloque de marca (pégalo al inicio de cada sesión de Claude Design):**
> Marca: Speculative Futures CDMX, comunidad de futuros/foresight. Sistema monocromático verde, dark-first. Concepto "señal en lo oscuro". Paleta: fondo petróleo `#062424`, neutro pizarra `#547476`, conexión esmeralda `#439973`, acento/señal menta `#66EBAC`, texto cal `#F4F7F5`. Tipografía **Gotham** (display Black/Bold, cuerpo Medium, metadata en mayúsculas con tracking +0.08em). Un solo acento por pieza (menta). Isotipo: triángulo + nodo con contorno esmeralda. Recursos: hairlines tipo coordenadas, nodos, timestamps, coordenadas CDMX 19.43°N 99.13°W. Prohibido: cyberpunk, glow neón, gradientes saturados, segundo color, tipografía futurista, menta sobre blanco como texto.

---

## 3. Los 6 posts del go-live (2 filas del feed)

Arco de pre-lanzamiento hacia un evento de go-live: **reactivación → anticipación → postura → visión → prueba → invitación.** Seis piezas = dos filas completas del grid, un solo bloque.

**Lógica de grid:** Instagram muestra lo más reciente arriba-izquierda, así que al publicar 01→06 la fila superior termina en la convocatoria (06) y la inferior en el regreso (01): el visitante aterriza en el "únete". Hilo visual: marcador de serie `01/06`…`06/06` y los seis en petróleo. En carruseles, solo la portada cuenta para el grid: mantenlas consistentes.

### 01 · Estamos de regreso — imagen 4:5 (Cover/Lanzamiento)
Slots: kicker `01 / 06` · titular **Estamos de regreso** (eje menta: *regreso*) · bajada *Volvemos a reunir a quienes imaginan, cuestionan y diseñan futuros posibles desde Ciudad de México.* · logo reverso · pie coordenadas CDMX.
> **Caption:** Estamos de regreso. / Speculative Futures CDMX vuelve a abrir el espacio para imaginar, cuestionar y activar futuros posibles desde Ciudad de México. / Volvemos como comunidad interdisciplinaria —foresight, diseño, innovación, cultura, ciudad y tecnología— y con algo concreto en el horizonte. En los próximos días te contamos qué viene. / Quédate cerca. Esto apenas empieza, otra vez.

### 02 · Próximamente: go-live — imagen 4:5 (Evento · teaser)
Slots: kicker `02 / 06` · titular **Pronto, en vivo** (eje: *en vivo*) · bajada *El reencuentro de la comunidad, en persona. Fecha y lugar muy pronto.* · logo.
> **Caption:** Algo se está cocinando. / Pronto anunciamos nuestro evento de go-live: el reencuentro de Speculative Futures CDMX, en persona —el punto donde las conversaciones que vivían en mesas separadas se juntan. / Fecha y lugar, en los próximos días. Activa las notificaciones para no perdértelo.

*(Teaser sin detalles. Cuando tengas fecha y lugar reales, va un post de Evento aparte con la plantilla Evento.)*

### 03 · Nuestro manifiesto — carrusel 3 slides (Idea ancla)
- **S1:** *La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias.* (eje: *consecuencias*)
- **S2:** *Creemos en la imaginación como infraestructura: estratégica, cultural y cívica.* (eje: *infraestructura*)
- **S3:** *Los futuros se imaginan, se disputan, se diseñan y se practican.* (eje: *se practican*) + logo
> **Caption:** Nuestra postura, en tres ideas. / La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias. Creemos en la imaginación como infraestructura estratégica, cultural y cívica. Y creemos que las voces emergentes amplían el campo de lo posible. / Los futuros se imaginan, se disputan, se diseñan y se practican. / ¿Qué idea resuena contigo? Te leemos en los comentarios.

### 04 · Visión de la comunidad — imagen 4:5 (Idea ancla / Cover)
Slots: kicker `04 / 06` · titular **Una comunidad de referencia para pensar futuros desde CDMX** (eje: *futuros*) · bajada *Y una voz relevante en Latinoamérica para explorar lo que viene de forma crítica, creativa y estratégica.*
> **Caption:** Hacia dónde vamos. / Queremos ser la comunidad de referencia en Ciudad de México —y una voz en Latinoamérica— para explorar futuros posibles con criterio: ampliar lo que somos capaces de imaginar, leer las señales del cambio y diseñar mejores formas de responder desde el presente. / Esa es la comunidad que volvemos a construir.

### 05 · Qué encontrarás aquí — carrusel 4 slides (Idea ancla)
- **S1:** *Esto vas a encontrar aquí.*
- **S2:** *Señales* — lo que empieza a cambiar. *Voces* — quienes construyen futuros. *Eventos* — para pensar en colectivo.
- **S3:** Cinco territorios: futuros y foresight · innovación y negocios · ciudad y sistemas vivos · cultura y sociedad · tecnologías emergentes.
- **S4:** + logo · *Síguenos para no perderte la primera señal.*
> **Caption:** Esto vas a encontrar aquí. / Señales: lecturas de lo que empieza a cambiar. Voces: quienes están pensando, investigando y construyendo futuros desde distintas disciplinas. Eventos: conversaciones y encuentros para imaginar en colectivo. / Cruzamos cinco territorios: futuros y foresight; innovación y negocios; ciudad y sistemas vivos; cultura y sociedad; tecnologías emergentes. / Síguenos para no perderte la primera señal.

### 06 · Búscanos para ser parte — imagen 4:5 (Evento / CTA)
Slots: kicker `06 / 06` · titular **Este es tu lugar** (eje: *tu lugar*) · bajada *Si te interesa imaginar y diseñar lo que viene desde CDMX, búscanos.* · botón menta **Únete a la comunidad**.
> **Caption:** Búscanos para ser parte. / Si te interesa imaginar, cuestionar y diseñar lo que viene desde Ciudad de México, este es tu lugar. / Únete, propón una conversación o colabora con el capítulo. Escríbenos por DM o en los comentarios. / Esto se construye en comunidad.

### Hashtags
Usa el bloque primario en los seis y rota el pool para no repetir:
`#SpeculativeFutures #FuturosPosibles #Foresight #DiseñoEspeculativo #FuturesThinking #FuturosCDMX #Innovación #PensamientoSistémico #CDMX #DesignFutures`

## 4. Publicación (Meta Business Suite)

1. Cuenta @futures_mex en **Business/Creator** + conectada a página de Facebook.
2. Entra a **business.facebook.com** → Planificador → Crear publicación.
3. Sube el diseño (imagen o carrusel), pega la caption + hashtags, agrega alt text.
4. **Programa**. Carruseles e imágenes se auto-publican; algunos formatos aún piden publicación manual con notificación (la app avisa).

### Calendario del go-live (horarios CDMX)
| Post | Día | Hora | Lógica |
|---|---|---|---|
| 01 · Regreso | Mar | 20:30 | Pico de tarde-noche; reactivación. |
| 02 · Go-live (teaser) | Jue | 20:30 | Hook de anticipación. |
| 03 · Manifiesto | Sáb | 11:00 | Lectura pausada de fin de semana. |
| 04 · Visión | Mar | 20:30 | Segunda semana, profundiza. |
| 05 · Qué encontrarás | Jue | 20:30 | Prueba de valor. |
| 06 · Búscanos | Sáb | 11:00 | Cierra el bloque con la convocatoria (queda arriba-izquierda en el grid). |

Refuerza cada post con una **Story** el mismo día (repost del feed + sticker de pregunta o "compártelo"): sube alcance sin diseñar nada nuevo.

### Realidad de la "auto-publicación por código"
Requiere cuenta Business + página FB + app de Meta + Instagram Graph API (Content Publishing) + token de larga duración (caducan) + revisión de permisos. Es mantenimiento real. **Vale la pena solo** cuando publiques a alto volumen, en varios canales, o quieras un panel propio de contenido. Cuando llegue ese punto, ahí entra Claude Code; hoy no.

---

## 5. Motor editorial: recetas de generación (automatizar lo continuo)

Para que cada semana no parta de cero, cada formato tiene una **receta** que se corre conmigo (o en cualquier sesión) y devuelve el post listo. Le das el insumo; sale copy + brief visual.

- **SEÑAL:** "Genera un post de SEÑAL sobre [tema/observación]. Estructura: qué es, por qué importa, qué implica para CDMX, una pregunta. Asigna territorio. Tono de marca."
- **PREGUNTA:** "Dame 5 preguntas-provocación sobre [tema] para abrir conversación, en tono de marca; elige la más fuerte y redáctala para slide único."
- **VOZ:** "Con estos datos de [persona], redacta un post de VOZ: nombre, disciplina, en qué trabaja, qué aporta a futuros, territorio."
- **EVENTO:** "Con [fecha, título, lugar, formato], redacta el post de evento + caption + CTA de registro."
- **IDEA ANCLA:** "Convierte [concepto de foresight] en una idea ancla de una frase, con una palabra eje para menta."

Flujo semanal real: eliges los temas del lunes → corres 3 recetas → rellenas 3 plantillas en Claude Design → programas en Meta Business Suite. **30–45 min para la semana completa.** Eso es la automatización que importa.

---

## 6. Qué medir (sin métricas de vanidad)
No persigas likes. Persigue señales de comunidad: **guardados y compartidos** (relevancia real), **comentarios con sustancia** (conversación), **DMs de "quiero participar"** (conversión a comunidad), y crecimiento de seguidores *cualificados*. Revisa cada 2 semanas qué formato genera más guardados/compartidos y dale más espacio. El objetivo no es audiencia; es pertenencia.
</pasted_text>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: questions_v2]_

This is a beautifully complete system — design tokens, Gotham, the 6 master Instagram templates, and now the full launch playbook with exact copy for the 6 go-live posts. Before I build, let me confirm scope so I don't guess wrong (you pasted the playbook with no specific instruction).

## User

Questions answered:
- deliverable: The 6 go-live posts, filled with the real copy from §3 (incl. the two carousels) — ready to publish
- presentation: An @futures_mex feed mock (2 rows of the grid) + click any post to open it full-size with its carousel slides
- carousels: Build every carousel slide as its own 4:5 frame, swipeable in the feed view
- export: Yes — I want to download each post as a 1080×1350 PNG
- captions: Yes — show the ready-to-paste caption + hashtags next to each post
- tweaks: Dates / timestamps

## Assistant

_[tool: read_file]_

_[tool: read_file]_

Let me look at the existing feed/gallery interaction and the logo assets so I build consistently with what's there.

_[tool: read_file]_

_[tool: update_todos]_

_[tool: copy_starter_component]_

Everything I need is here. Plan: a dedicated go-live deliverable that reuses the design system — all six posts in petrol (the playbook's grid logic), the two carousels built slide-by-slide, a feed mock, a click-to-open lightbox with captions + hashtags, PNG export at 1080×1350, and a date/timestamp tweak driven by the go-live calendar.

_[tool: write_file]_

Now the post components, filled with the §3 copy.

_[tool: write_file]_

Now the interactive shell — feed mock, lightbox with swipeable carousels, caption/hashtag panel, PNG export, and the date tweak.Now the HTML shell:

_[tool: write_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors. Let me screenshot the feed and the lightbox.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

Feed looks excellent — correct IG grid order, carousel badges on 03 & 05, editorial covers. Now let me check the lightbox on a carousel.

_[tool: view_image]_

_[tool: done]_

The lightbox is exactly right — slide counter, dots, schedule chip (Sáb 6 jun · 11:00 driven by the calendar), full caption, hashtags, and export controls. Let me surface it and verify export works.

_[tool: fork_verifier_agent]_

The six go-live posts are built and live. Quick summary:

**What's there** — `ui_kits/instagram/Go-Live Posts.html`
- **Feed mock** of @futures_mex in true Instagram grid order (06 top-left → 01 bottom-right, so the convocatoria lands top-left as the playbook intends), with carousel badges on posts 03 and 05.
- **All 6 posts filled** with the verbatim §3 copy, all on petrol with the `0X/06` series marker and the mint eje word per post.
- **Both carousels built slide-by-slide** — manifesto (3) and "qué encontrarás aquí" (4, incl. the Señales/Voces/Eventos and five-territories layouts) — swipeable in the lightbox with arrows, dots, and keyboard nav.
- **Caption + hashtag panel** beside each post with a one-click copy and the scheduled date/time chip.
- **PNG export** at native 1080×1350 (single slide or "descargar las 3/4" for carousels).
- **Tweak**: go-live start date recalculates all six timestamps off the playbook calendar (+ a show/hide timestamp toggle).

A verifier is checking the export path and carousel behavior in the background — I'll flag anything it turns up. Two notes: PNG export embeds the self-hosted Gotham OTFs, which can be marginally slower on first capture; and the Voz template isn't part of this go-live set (no profile post in §3), so it stays in the master-template kit.

## User

Verifier agent check completed

## Assistant

Verifier passed — PNG export, carousel navigation, and the date tweak all check out. The go-live set is ready to publish.

## User

Regenerate "Go-Live Posts": 1- Quita las fechas de los posts

## Assistant

_[tool: str_replace_edit]_

Dates removed from the posts by default — the footer now shows only the coordinates. The scheduling date still lives in the caption panel (planning info, not on the artwork), and the timestamp can be turned back on anytime via Tweaks.

_[tool: show_to_user]_

Listo — quité las fechas del pie de los seis posts. Ahora el pie solo muestra las coordenadas `19.4326° N · 99.1332° W`. La fecha programada sigue en el panel de caption (info de planeación, no en el arte) y puedes reactivar el timestamp cuando quieras desde Tweaks.

## User

dame la profile pic con el marco menta

## Assistant

_[tool: write_file]_

Te armo la foto de perfil como archivo aparte, lista para exportar (1080×1080, cuadrada — Instagram la recorta a círculo, así que el marco menta va integrado en la imagen).

_[tool: done]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

Lista la foto de perfil — `ui_kits/instagram/Profile Pic.html`:

- **Cuadrada 1080×1080** con fondo petróleo, hairlines de coordenadas sutiles, marco menta integrado en la imagen y el isotipo (triángulo esmeralda + nodo) centrado.
- Preview en vivo de cómo se ve ya **recortada al círculo** de Instagram.
- Botón **Descargar PNG · 1080×1080** listo para subir.

El marco menta queda dentro del recorte circular, así que se ve completo al subirla. Un verificador la revisa en segundo plano.

## User

Regenerate "Profile Pic": dame el icon + marco en color menta para que sea más llamativa la imagen

## Assistant

_[tool: str_replace_edit]_

Hago el isotipo completo en menta (triángulo + nodo) junto con el marco, para que resalte más.

_[tool: show_to_user]_

_[tool: save_screenshot]_

_[tool: view_image]_

Listo — el isotipo (triángulo + nodo) y el marco ahora van en menta `#66EBAC` sobre el fondo petróleo. Mucho más llamativa y con buen contraste para el avatar circular. El PNG de descarga ya refleja el cambio.

## User

Regenerate "Profile Pic": el isotipo necesita estar mas grande,  200%

## Assistant

_[tool: str_replace_edit]_

El isotipo del cuadrado exportable se ve pequeño dentro del marco; lo subo al doble.

_[tool: str_replace_edit]_

_[tool: show_to_user]_

_[tool: save_screenshot]_

_[tool: view_image]_

Listo — el isotipo ahora va al doble de tamaño, llenando el marco menta con buen aire alrededor y sin salirse del recorte circular. El PNG de 1080×1080 ya exporta con este tamaño.

## User

Regenerate "Profile Pic": visualmente se ve desequilibrado. Ajustalo a que visualmente se vea correcto

## Assistant

_[tool: str_replace_edit]_

El desequilibrio viene de que el viewBox del isotipo tiene márgenes desiguales, así que al centrarlo queda corrido. Lo recorto al bounding box real del símbolo para que el centrado sea óptico, y ajusto el tamaño a una proporción equilibrada dentro del marco.

_[tool: show_to_user]_

_[tool: save_screenshot]_

_[tool: view_image]_

Ahora el isotipo queda centrado ópticamente dentro del marco menta — recorté el viewBox al contorno real del símbolo, así que el peso visual del triángulo y el nodo se balancea con márgenes parejos. Se ve equilibrado tanto en el cuadrado exportable como en el recorte circular. El PNG ya refleja el ajuste.

## User

Regenerate "Go-Live Posts": ajusta a que estos sean los 5 hashtags: #SpeculativeFutures #FuturosPosibles #Foresight #FuturesThinking #FuturosCDMX

## Assistant

_[tool: str_replace_edit]_

Listo — actualicé el bloque a esos 5 hashtags: `#SpeculativeFutures #FuturosPosibles #Foresight #FuturesThinking #FuturosCDMX`. Aparecen en el panel de cada post y en el botón de copiar caption + hashtags.

_[tool: show_to_user]_

Hashtags actualizados a los 5 que indicaste. El panel de caption de cada post y el botón "Copiar caption + hashtags" ya los reflejan.

