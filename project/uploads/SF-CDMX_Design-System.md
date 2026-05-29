# Sistema de Diseño · Speculative Futures CDMX
### Concepto rector: *Señal en lo oscuro*

El petróleo volcánico es el territorio del futuro aún no leído (noche urbana, sistema, profundidad). La menta es la señal que se enciende: lo emergente, la voz, el evento, el dato vivo. Esmeralda y pizarra son la infraestructura que conecta señales entre sí. Todo el sistema visual es una sola idea: **leer señales en la oscuridad y conectarlas.**

Cualquier pieza debe poder explicarse con tres preguntas: ¿qué es la señal aquí (menta)?, ¿qué es estructura (pizarra/esmeralda)?, ¿estoy leyendo o sintiendo (claro/oscuro)?

> Valores tomados directamente de los archivos de marca (logo SVG). Esta es la fuente de verdad.

---

## 1. Logo

### Construcción
Isotipo (triángulo + nodo) + logotipo en tres líneas. El triángulo apunta hacia adelante; el círculo es el **nodo** —la señal— y es el elemento que se enciende en menta. El logotipo va en **Gotham Bold**, tres líneas, alineado a la izquierda.

```
[ ◣● ]  SPECULATIVE
        FUTURES
        CDMX
```

### Variantes oficiales (4)
| Variante | Fondo | Triángulo | Nodo | Logotipo | Uso |
|---|---|---|---|---|---|
| **Positivo / primario** | Claro | Petróleo `#062424` | Blanco · contorno petróleo `#062424` | Petróleo | Uso principal sobre claro. |
| Monocromo esmeralda | Claro | Esmeralda `#439973` | Blanco · contorno esmeralda `#439973` | Esmeralda | Aplicaciones de una tinta verde. |
| **Reverso / sobre oscuro** | Petróleo `#062424` | Esmeralda `#439973` | Petróleo · **contorno esmeralda** `#439973` | Esmeralda `#439973` (como el SVG) | Uso principal sobre fondo oscuro. En aplicaciones tipo hero, el logotipo puede ir en cal `#F4F7F5` por legibilidad. |
| Sobre esmeralda | Esmeralda `#439973` | Petróleo | Petróleo · **contorno esmeralda** `#439973` | Petróleo | Bloques esmeralda. |

### Reglas de uso
- **Área de protección:** mínimo el ancho del nodo (el círculo) en los cuatro lados. Nada invade ese margen.
- **Tamaño mínimo:** isotipo legible a 24px de alto; lockup completo a 32px de alto. Por debajo, usar solo el isotipo.
- **El nodo va con contorno (anillo), no relleno sólido.** Sobre oscuro y sobre esmeralda, el contorno va en esmeralda `#439973` (relleno petróleo). Sobre claro, relleno blanco con contorno petróleo. La menta queda reservada como acento de acción (CTA, fechas, dato vivo), no para el nodo.
- **Mal uso (prohibido):** rotar, deformar, cambiar la tipografía del logotipo, recolorear fuera de las 4 variantes, aplicar sombra/glow, encimar sobre fotografía sin contraste suficiente, separar el isotipo del logotipo con proporciones distintas a las oficiales.
- Para producción digital, usar **logos con tipografía vectorizada (outlines)**, no texto vivo, para no depender de que Gotham esté instalado.

---

## 2. Fundamento cromático

Sistema **monocromático verde, dark-first.** Un solo acento vivo (menta). Sin segundo color. Hex tomados del archivo de marca.

| Token | Hex | Rol |
|---|---|---|
| `--sf-petrol-900` | `#062424` | Canvas base oscuro. La "noche". Fondo dominante de atmósfera, hero, eventos. |
| `--sf-petrol-800` | `#0B3331` | Superficie elevada sobre fondo oscuro (cards, secciones). |
| `--sf-petrol-700` | `#114442` | Borde/hover sobre superficies oscuras. |
| `--sf-slate-500` | `#547476` | Neutro estructural. Líneas, coordenadas, metadata, texto secundario. |
| `--sf-emerald-500` | `#439973` | Conector. Links, acentos de soporte, íconos de sistema, monocromo. |
| `--sf-mint-400` | `#66EBAC` | **La señal.** Acento vivo. Nodo, highlights, CTA primario, dato emergente. |
| `--sf-cal-50` | `#F4F7F5` | Blanco cal. Canvas claro (editorial/lectura) + texto sobre oscuro. |
| `--sf-cal-0` | `#FFFFFF` | Blanco puro. Máximo contraste editorial. |

**Neutros de texto derivados (legibilidad fina):**

| Token | Hex | Uso |
|---|---|---|
| `--sf-ink-900` | `#062424` | Texto sobre fondo claro (es el mismo petróleo: el sistema no introduce un negro ajeno). |
| `--sf-ink-700` | `#1E3B39` | Cuerpo sobre claro, más suave que petróleo puro. |
| `--sf-ink-500` | `#5A716F` | Texto secundario/metadata sobre claro. |
| `--sf-line-light` | `#D8E2DF` | Hairlines y bordes en modo claro. |

### Regla cromática (no negociable)
- **Un solo acento dominante por pantalla/pieza.** La menta ordena la jerarquía; si todo brilla, nada es señal.
- **Menta = acción, emergencia y señal.** Nodo (contorno), botón primario, dato que importa, fecha de evento, enlaces sobre fondo oscuro. Nunca relleno decorativo.
- **Esmeralda = conexión y soporte.** Líneas que conectan, estados secundarios, aplicaciones de una tinta y enlaces sobre fondo claro (donde la menta no es legible).
- **Pizarra = estructura silenciosa.** Coordenadas, timestamps, líneas de grid, texto de servicio.
- El petróleo no es "fondo gris oscuro": es tinta, no vacío.

### Contraste / accesibilidad (AA)
- Menta `#66EBAC` sobre petróleo `#062424`: contraste alto → válido para títulos, acentos y texto grande.
- **Botón primario:** relleno menta + texto petróleo (contraste excelente, alta presencia).
- Esmeralda y pizarra **no se usan para cuerpo pequeño sobre oscuro** (riesgo de fallar AA). Reservar para líneas, metadata grande y acentos. Cuerpo sobre oscuro siempre en cal.
- Texto sobre claro: `--sf-ink-700` o `--sf-ink-900`.
- **Enlaces:** solo colores de paleta, **peso regular, nunca bold**, subrayados. Sobre oscuro van en **menta** `#66EBAC` (contraste alto). Sobre claro van en **esmeralda** `#439973` (el color de enlace del sistema), subrayados para identificarlos por más que el color. Nota: la menta pura no es legible sobre blanco (~1.3:1), por eso sobre claro el enlace es esmeralda, no menta.

### Modo oscuro vs. claro (función, no estética alternable)
- **Oscuro (petróleo):** atmósfera, hero, eventos, manifiesto, momentos de marca. Donde se quiere *sentir el territorio.*
- **Claro (cal):** lectura larga, archivo de señales, perfiles de voces, contenido editorial. Donde se quiere *leer sin fatiga.*
- Regla práctica: si el usuario va a **leer** más de ~30 s → claro. Si va a **sentir o escanear** → oscuro.

---

## 3. Tipografía — Gotham

La tipografía oficial de la marca es **Gotham** (la misma del logotipo). Geométrica, sobria, urbana, con autoridad editorial. Confirmada en los archivos de marca (`Gotham-Bold`).

| Uso | Corte | Notas |
|---|---|---|
| Display / Lockup / Títulos de impacto | **Gotham Bold / Black** | Mayúsculas en lockup de marca; sentence case en titulares editoriales. Tracking ligeramente negativo en tamaños grandes. |
| Subtítulos / H3–H4 | **Gotham Medium / Bold** | |
| Cuerpo / UI | **Gotham Medium** | Corte de texto legible. Book es demasiado delgada y pobre; este set de Gotham no incluye Regular/Book sharp, así que el cuerpo va en **Medium** (más cuerpo, mejor lectura). |
| Metadata / señal | **Gotham Medium**, mayúsculas, tracking +0.08em | Coordenadas, timestamps, etiquetas, kickers. La "voz de sistema". |

**Archivos y producción:** Gotham (sharp) ya está disponible en el proyecto. En el HTML del sistema va **embebida vía @font-face** (Gotham Medium, Bold, Black en base64), así que se renderiza Gotham real, no un sustituto. Para producción web conviene convertir los OTF a **woff2** y auto-hospedarlos. Cadena de respaldo (por si la fuente no carga): `'Gotham', system-ui, 'Helvetica Neue', Arial, sans-serif`. Pesos disponibles en este set sharp: Thin, Medium, Bold, Black.

### Escala (editorial, base 16px)
| Token | px / line-height | Uso |
|---|---|---|
| `display-xl` | clamp 48→72 / 1.02 | Hero. Bold/Black. Tracking -0.02em. |
| `h1` | 44 / 1.08 | Encabezado de sección mayor. Bold. |
| `h2` | 32 / 1.12 | Subsección. Bold. |
| `h3` | 24 / 1.2 | Título de card / bloque. Medium/Bold. |
| `h4` | 20 / 1.3 | Subtítulo. Medium. |
| `body-lg` | 18 / 1.6 | Lectura editorial, manifiesto. Medium. |
| `body` | 16 / 1.6 | Cuerpo general. Medium. |
| `small` | 14 / 1.5 | Apoyo. |
| `meta` | 12–13 / 1.4 | Mayúsculas, tracking +0.08em. Coordenadas, fechas, tags. Medium. |

---

## 4. Espaciado y grilla
- **Base 4px.** Escala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- **Grid editorial de 12 columnas**, gutters 24–32px desktop.
- **Contenedor máximo:** 1280px. Lectura larga restringida a ~680px de medida.
- **Ritmo vertical:** secciones a 96–128px desktop, 64px mobile.
- Composición modular: todo es card o bloque reutilizable, pensado para crecer sin rediseñar.

---

## 5. Sistema gráfico (la capa de "señales")
- **Hairlines de coordenadas:** 1px pizarra, tipo mapa/eje. Pueden cruzar secciones como rejilla sutil.
- **Nodos:** puntos/círculos (eco del nodo del logo). Un nodo menta = señal activa; nodos unidos por líneas esmeralda = red.
- **Timestamps y coordenadas reales:** `19.4326° N · 99.1332° W` (CDMX), `2026.05.29`, en pizarra/meta. Anclan la marca a la ciudad.
- **Etiquetas de territorio:** los 5 territorios como tags consistentes (§7).
- **Texturas urbanas sutiles:** concreto, papel, grano fino, sombra. Baja opacidad. Nunca saturar.
- **Triángulo + nodo** del isotipo: pueden vivir recortados al borde como elementos de composición.

**Prohibido:** glow cyberpunk, gradientes neón saturados, líneas de circuito, hexágonos tech, partículas, datos flotando. El futuro aquí se ve sobrio.

---

## 6. Movimiento
Sobrio, con sentido de "señal que aparece". Nunca decorativo.
- **Reveal:** fade + 8px de subida, 400ms, ease-out, al entrar en viewport.
- **Conexión:** líneas que se dibujan entre nodos (stroke-dashoffset), 600–800ms.
- **Hover:** 150–200ms. Cards: elevación sutil + borde menta. Links: subrayado con offset.
- **Prohibido:** parallax pesado, autoplay agresivo, loops constantes, partículas.

---

## 7. Componentes

### Botones
| Variante | Estilo |
|---|---|
| **Primario** | Relleno menta `#66EBAC`, texto petróleo `#062424`, Gotham Medium. Radio 4px. Hover: menta más brillante + leve elevación. |
| **Secundario (sobre oscuro)** | Borde 1px cal 40%, texto cal, fondo transparente. Hover: borde + texto menta. |
| **Secundario (sobre claro)** | Borde 1px petróleo, texto petróleo. Hover: relleno petróleo + texto cal. |
| **Texto/link** | Menta (sobre oscuro) / esmeralda `#439973` (sobre claro), siempre subrayado. **Peso regular, nunca bold.** |

Radios: botones/inputs 4px, cards 6–8px, tags pill (full). Sistema mayormente cuadrado (editorial/archivo), esquinas apenas suavizadas.

### Cards canónicas (3)
1. **Evento** — fecha (meta menta) · título (h3) · formato + lugar (meta pizarra) · descripción corta · CTA. Hairline superior. Superficie petróleo-800.
2. **Voz** — retrato (duotono verde) · nombre (h4) · rol/disciplina (meta) · territorio-tag · línea de conexión a otras voces.
3. **Señal** — kicker `SEÑAL` + timestamp (meta) · titular (h3) · territorio-tag · 1–2 líneas de implicación · enlace "leer". Estética de ficha de archivo.

### Tags de territorio (sistema fijo)
Pill, meta mayúsculas, borde 1px. Todas dentro del verde; diferenciar por intensidad/ícono-nodo, **no** por colores ajenos:
`FUTUROS & FORESIGHT` · `INNOVACIÓN & NEGOCIOS` · `CIUDAD & SISTEMAS VIVOS` · `CULTURA & SOCIEDAD` · `TECNOLOGÍAS EMERGENTES`

### Inputs
Fondo transparente o petróleo-800, borde 1px pizarra, foco con borde menta. Labels en meta. Mínima fricción.

---

## 8. Tokens de producción

### CSS Custom Properties
```css
:root {
  --sf-petrol-900:#062424; --sf-petrol-800:#0B3331; --sf-petrol-700:#114442;
  --sf-slate-500:#547476;  --sf-emerald-500:#439973; --sf-mint-400:#66EBAC;
  --sf-cal-50:#F4F7F5;     --sf-cal-0:#FFFFFF;
  --sf-ink-900:#062424; --sf-ink-700:#1E3B39; --sf-ink-500:#5A716F; --sf-line-light:#D8E2DF;

  --bg:var(--sf-petrol-900); --surface:var(--sf-petrol-800); --border:var(--sf-petrol-700);
  --text:var(--sf-cal-50); --text-muted:var(--sf-slate-500);
  --accent:var(--sf-mint-400); --link:var(--sf-emerald-500);

  --font-display:'Gotham','Montserrat','Inter',sans-serif;
  --font-body:'Gotham','Montserrat','Inter','Helvetica Neue',Arial,sans-serif;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-6:24px;
  --s-8:32px; --s-12:48px; --s-16:64px; --s-24:96px; --s-32:128px;
  --r-sm:4px; --r-md:8px; --r-pill:999px;
  --container-max:1280px; --measure:680px;
  --ease:cubic-bezier(.2,.6,.2,1); --dur-fast:180ms; --dur:400ms; --dur-slow:700ms;
}
```

### Tailwind (theme.extend)
```js
colors:{
  petrol:{900:'#062424',800:'#0B3331',700:'#114442'},
  slate:{500:'#547476'}, emerald:{500:'#439973'}, mint:{400:'#66EBAC'},
  cal:{50:'#F4F7F5',0:'#FFFFFF'}, ink:{900:'#062424',700:'#1E3B39',500:'#5A716F'},
},
fontFamily:{
  display:['Gotham','Montserrat','Inter','sans-serif'],
  body:['Gotham','Montserrat','Inter','Helvetica Neue','Arial','sans-serif'],
},
```

---

## 9. Aplicación rápida por contexto
| Contexto | Fondo | Acento | Notas |
|---|---|---|---|
| Hero / portada | Petróleo 900 | Menta | Display, un solo CTA menta. Logo reverso. |
| Próximo evento | Petróleo 800 | Menta (fecha + CTA) | Hairline superior, meta pizarra. |
| Manifiesto | Petróleo 900 | Menta puntual | Body-lg, medida ~680px, mucho aire. |
| Archivo de señales | Cal 50 | Esmeralda (enlaces) | Lectura larga, fichas, timestamps pizarra. Enlaces en esmeralda subrayada, peso regular. Logo positivo. |
| Voces | Cal 50 o Petróleo 800 | Menta en nombres activos | Retratos duotono verde. |
| Footer / CTA final | Petróleo 900 | Menta | Repetir "únete", coordenadas CDMX como gráfico. |

---

## 10. Tono visual — síntesis sí / no
**Sí:** editorial, urbano, sobrio, sistema vivo, archivo de señales, think tank abierto, alto contraste, mucho aire, monocromo verde disciplinado, Gotham.

**No:** SaaS genérico, académico frío, festival creativo superficial, cyberpunk, futurismo decorativo, saturación, glow neón, tipografía "futurista", gradientes arcoíris, segundo acento cromático.

---

*Fuente de verdad para redes, web y materiales. Coordenadas de marca: 19.4326° N · 99.1332° W · CDMX · EST. 2026.*
