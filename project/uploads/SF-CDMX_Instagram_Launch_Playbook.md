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
| 1 | **Go-live: los 3 posts** (identidad → postura → invitación) | Establecer quiénes somos y por qué existimos. |
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

## 3. Los 3 posts del go-live

Secuencia narrativa (tensión → tesis → invitación): **identidad → postura → convocatoria.** Los tres en petróleo: el feed se ve intencional desde la primera fila.

---

### POST 1 — Presentación · "Futuros posibles desde Ciudad de México"
**Formato:** imagen única 4:5. Plantilla *Cover/Lanzamiento*.

**Visual:** panel petróleo. Isotipo (nodo contorno esmeralda) arriba. Claim en Gotham Black, menta: *Futuros posibles desde Ciudad de México.* Bajada en cal: *Comunidad interdisciplinaria de foresight, diseño, innovación, cultura, tecnología y sociedad.* Hairline + coordenadas abajo.

**Caption:**
> **Speculative Futures CDMX**
>
> Una comunidad interdisciplinaria para imaginar, cuestionar y activar futuros posibles desde Ciudad de México.
>
> Somos el capítulo local de una red global dedicada a explorar lo que viene: foresight, diseño especulativo, innovación, cultura, tecnología, ciudad y sociedad, en la misma conversación.
>
> La Ciudad de México llega a sus futuros como crisis climática, inteligencia artificial, nuevas economías, tensiones urbanas y culturas emergentes. Hace falta una comunidad capaz de leer esas señales, conectar disciplinas y formular mejores preguntas.
>
> Eso empezamos a construir aquí. Síguenos.

**Alt text:** Logo de Speculative Futures CDMX sobre fondo verde petróleo con el texto "Futuros posibles desde Ciudad de México".

**Prompt Claude Design:** "Con la plantilla Cover/Lanzamiento: claim 'Futuros posibles desde Ciudad de México' en menta, bajada 'Comunidad interdisciplinaria de foresight, diseño, innovación, cultura, tecnología y sociedad'. Logo reverso arriba a la izquierda."

---

### POST 2 — Postura · Manifiesto
**Formato:** carrusel 3 slides. Plantilla *Idea ancla* (una idea por slide).

- **Slide 1:** *La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias.* (palabra eje en menta: *consecuencias*)
- **Slide 2:** *Creemos en la imaginación como infraestructura: estratégica, cultural y cívica.* (menta: *infraestructura*)
- **Slide 3:** *Los futuros se imaginan, se disputan, se diseñan y se practican.* (menta: *se practican*) + logo.

**Caption:**
> Nuestra postura, en tres ideas.
>
> La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias. Creemos en la imaginación como infraestructura estratégica, cultural y cívica. Y creemos que las voces emergentes amplían el campo de lo posible.
>
> Los futuros se imaginan, se disputan, se diseñan y se practican.
>
> ¿Qué idea resuena contigo? Te leemos en los comentarios.

**Alt text:** Tres frases del manifiesto de Speculative Futures CDMX en blanco y menta sobre fondo verde petróleo.

**Prompt Claude Design:** "Con la plantilla Idea ancla, genera un carrusel de 3 slides 4:5, cada uno con una frase grande en Gotham y una palabra clave en menta. Frases: [las tres de arriba]. Logo en el último slide."

---

### POST 3 — Convocatoria · "Esto encontrarás aquí"
**Formato:** carrusel 4 slides. Plantillas *Idea ancla* + *Evento/CTA*.

- **Slide 1:** *Esto vas a encontrar aquí.*
- **Slide 2:** *Señales* — lo que empieza a cambiar en la ciudad y el mundo. *Voces* — quienes piensan y construyen futuros. *Eventos* — para pensar en colectivo.
- **Slide 3:** Cinco territorios: futuros y foresight · innovación y negocios · ciudad y sistemas vivos · cultura y sociedad · tecnologías emergentes.
- **Slide 4:** *Únete a la comunidad.* (botón menta) + Propón una conversación · Colabora.

**Caption:**
> Esto vas a encontrar aquí.
>
> Señales: lecturas de lo que empieza a cambiar. Voces: quienes están pensando, investigando y construyendo futuros desde distintas disciplinas. Eventos: conversaciones y encuentros para imaginar en colectivo.
>
> Cruzamos cinco territorios: futuros y foresight; innovación y negocios; ciudad y sistemas vivos; cultura y sociedad; tecnologías emergentes.
>
> Si te interesa imaginar y diseñar lo que viene desde Ciudad de México, este es tu lugar.
>
> Únete, propón una conversación o colabora con el capítulo. Escríbenos por DM.

**Alt text:** Carrusel que describe los formatos (señales, voces, eventos) y los cinco territorios temáticos de Speculative Futures CDMX, con invitación a unirse.

**Prompt Claude Design:** "Con las plantillas Idea ancla y Evento, genera un carrusel de 4 slides 4:5 con el contenido [arriba]; último slide con botón menta 'Únete a la comunidad'."

### Hashtags (bloque primario, ~10)
`#SpeculativeFutures #FuturosPosibles #Foresight #DiseñoEspeculativo #FuturesThinking #FuturosCDMX #Innovación #PensamientoSistémico #CDMX #DesignFutures`

Pool de rotación (alterna para no repetir): `#SpeculativeDesign #FuturosUrbanos #AlfabetizaciónDeFuturos #CiudadDeMéxico #ComunidadCreativa #Sostenibilidad #CulturaDigital #Anticipación #Prospectiva #FutureStudies`

---

## 4. Publicación (Meta Business Suite)

1. Cuenta @futures_mex en **Business/Creator** + conectada a página de Facebook.
2. Entra a **business.facebook.com** → Planificador → Crear publicación.
3. Sube el diseño (imagen o carrusel), pega la caption + hashtags, agrega alt text.
4. **Programa**. Carruseles e imágenes se auto-publican; algunos formatos aún piden publicación manual con notificación (la app avisa).

### Calendario del go-live (horarios CDMX)
| Post | Día | Hora | Lógica |
|---|---|---|---|
| 1 · Presentación | Martes | 20:30 | Pico de tarde-noche entre semana. |
| 2 · Postura | Jueves | 20:30 | Mantiene ritmo, audiencia ya activada. |
| 3 · Convocatoria | Sábado | 11:00 | Mañana de fin de semana, lectura pausada. |

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
