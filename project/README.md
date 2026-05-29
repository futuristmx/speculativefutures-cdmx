# Speculative Futures CDMX — Design System

> **Concepto rector: _Señal en lo oscuro_** (a signal in the dark)
> Monochromatic green, dark-first. One living accent: mint. The brand is one idea — **read signals in the darkness and connect them.**

Speculative Futures CDMX is the Mexico City chapter of the global Speculative Futures / foresight network — an interdisciplinary community for imagining, questioning and activating possible futures from CDMX, across foresight, speculative design, innovation, culture, technology, city and society.

The visual concept is literal: **petrol** (volcanic-night dark teal) is the territory of the not-yet-read future; **mint** is the signal that lights up (the emergent, the voice, the live data); **emerald** and **slate** are the infrastructure that connects signals. Every piece should answer three questions: *What is the signal here (mint)? What is structure (slate/emerald)? Am I reading or sensing (light/dark)?*

The brand is **bilingual-leaning-Spanish** (CDMX audience) and anchored to the city by coordinates **19.4326° N · 99.1332° W**, EST. 2026.

---

## Sources provided

These are the materials this system was built from. The reader may not have access — paths are recorded in case they do.

| Source | What it is |
|---|---|
| `uploads/SF-CDMX_Design-System.md` | The canonical design-system spec (source of truth). |
| `uploads/SF-CDMX_Design-System.html` | A live HTML reference of the system, with Gotham embedded as base64 @font-face and the logo as inline SVG. |
| `uploads/SF-CDMX_Instagram_Launch_Playbook.md` | Content strategy + the 6 master Instagram templates + go-live posts. |
| `uploads/colors_Speculative-cdmx-0[1–5].svg` | Brand boards (color/logo composition studies). Copied to `assets/brand-board-0*.svg`. |
| `uploads/41. Gotham [2000 — Tobias Frere-Jones].zip` | The Gotham type family (OTF). Relevant weights extracted to `fonts/`. |

No codebase or Figma was provided — this is a brand/identity + social system, not a software product. The "products" represented are the **Instagram template engine** and the **community website**; both are recreated as UI kits.

---

## Brand foundations at a glance

| Token | Hex | Role |
|---|---|---|
| `--sf-petrol-900` | `#062424` | Canvas base · "the night" · dominant atmosphere |
| `--sf-petrol-800` | `#0B3331` | Elevated surface on dark (cards) |
| `--sf-petrol-700` | `#114442` | Border / hover on dark |
| `--sf-slate-500` | `#547476` | Structural neutral · lines, coordinates, metadata |
| `--sf-emerald-500` | `#439973` | Connector · links on light, support, mono |
| `--sf-mint-400` | `#66EBAC` | **The signal** · node, primary CTA, live data |
| `--sf-cal-50` | `#F4F7F5` | Lime white · text on dark + light canvas |

**Type:** Gotham only. Black/Bold for display, Medium for body and UI, Medium uppercase +0.08em tracking for metadata. **Never** a second accent color; **never** mint as text on white.

---

## CONTENT FUNDAMENTALS

**Language.** Primary copy is **Spanish (Mexico)**. English appears only in the brand name, "foresight," and a few discipline terms. Write for an educated CDMX audience that is curious, not credentialist.

**Voice.** Strategic, sophisticated, clear, human, accessible without losing depth. A think tank that is *open*, not academic-cold and not festival-superficial. Rigor without elitism.

**Person.** Speaks as **"nosotros"** (we — the community) and addresses the reader as **"tú"** (you, informal). Inviting, never lecturing: *"Te leemos en los comentarios." · "Síguenos." · "Este es tu lugar."*

**Editorial thesis (the line that orders everything):**
> *Hacemos visible lo que empieza a cambiar y abrimos la conversación que normalmente ocurre en mesas separadas.*

Every piece performs one of three functions — **leer** (read a signal), **conectar** (voices, community) or **convocar** (events, participation). If it does none, it isn't published.

**Casing.**
- Brand lockup: **UPPERCASE** (SPECULATIVE / FUTURES / CDMX).
- Editorial headlines: **sentence case** ("Futuros posibles desde Ciudad de México").
- Metadata / kickers / tags: **UPPERCASE** with +0.08em tracking ("SEÑAL · 2026.05.29", "FUTUROS & FORESIGHT").
- Dates often lowercase Spanish abbreviations in cards ("Jue 26 jun · 19:30"); timestamps as ISO-ish "2026.05.29".

**The five territories** (a fixed taxonomy — always tagged consistently):
`FUTUROS & FORESIGHT` · `INNOVACIÓN & NEGOCIOS` · `CIUDAD & SISTEMAS VIVOS` · `CULTURA & SOCIEDAD` · `TECNOLOGÍAS EMERGENTES`

**The five recurring formats** (the editorial engine): **SEÑAL** (reading an emergent change), **VOZ** (profile of a futures thinker), **PREGUNTA** (a provocation that opens conversation), **EVENTO / CONVOCATORIA**, **IDEA ANCLA** (a one-line manifesto fragment).

**Emoji.** Essentially none in editorial pieces. The Instagram **bio** uses two utilitarian markers only — 📍 (location) and 👇 (call-to-action) — never decoratively, never inside designed pieces.

**Forbidden in copy.** Futurism cliché, mysticism, buzzword soup, motivational tone, "we are the future," and the rhetorical crutch **"no es X, es Y."** Make precise affirmations, not decorative contrasts. Chase *guardados, compartidos, comentarios con sustancia, DMs* — not vanity likes.

**Specimen copy.**
- Claim: *"Futuros posibles desde Ciudad de México."*
- Manifesto: *"Creemos en la imaginación como infraestructura: estratégica, cultural y cívica."* / *"Los futuros se imaginan, se disputan, se diseñan y se practican."*
- Signal: *"Microfábricas de barrio — manufactura distribuida a escala de cuadra. Implicación: nuevas economías locales y tensión con la zonificación."*
- CTA: *"Únete a la comunidad" · "Propón una conversación →" · "Escríbenos por DM."*

---

## VISUAL FOUNDATIONS

**Overall vibe.** Editorial, urban, sober. An *archive of signals* / open think tank. High contrast, lots of air, disciplined monochrome green. The opposite of generic SaaS and the opposite of cyberpunk.

**Color.** Strictly monochromatic green, **dark-first**. Petrol `#062424` is *ink, not void* — it is the dominant ground. **One** living accent per piece: mint `#66EBAC`, reserved for action / emergence / the live datum (node, primary CTA, the date that matters, links on dark). Emerald `#439973` is connection/support (links on light, system icons, one-ink applications). Slate `#547476` is silent structure (coordinates, timestamps, grid lines, service text). **No second color, ever.** If everything glows, nothing is a signal.

**Light vs dark is functional, not a toggle.** Dark (petrol) = atmosphere, hero, events, manifesto — where you want to *feel the territory*. Light (cal) = long reads, the signal archive, voice profiles — where you want to *read without fatigue*. Rule of thumb: reading >30s → light; sensing/scanning → dark. Links are **mint on dark, emerald on light** (mint is ~1.3:1 on white — illegible), always underlined, **regular weight, never bold**.

**Type.** Gotham only — geometric, sober, urban, editorial authority. Display in Black/Bold with slightly negative tracking (-0.02em) at large sizes; body in Medium (Book is too thin for this set); metadata in Medium uppercase +0.08em. Editorial scale on a 16px base: display clamp 48→72 / h1 44 / h2 32 / h3 24 / h4 20 / body 16–18 / meta 12–13.

**Spacing & grid.** Base **4px** (4·8·12·16·24·32·48·64·96·128). 12-column editorial grid, 24–32px gutters. Container max 1280px; long-read measure ~680px. Vertical rhythm: sections 96–128px desktop, 64px mobile. Everything is a reusable card or block.

**Backgrounds.** Flat petrol fields — **no photographic hero backgrounds, no saturated gradients.** The only "texture" is the **coordinate-hairline grid**: 1px slate lines at ~5% opacity running like a map/axis across sections (`repeating-linear-gradient(... 96px)`). Optional very-low-opacity concrete/paper/grain. Duotone-green portraits for voices. Imagery, when present, is cool and green-cast (duotone), never warm or full-color.

**The graphic "signal" layer.** Coordinate hairlines (map-like axes), **nodes** (echo of the logo's node — one mint node = active signal; nodes joined by emerald lines = a network), real timestamps and coordinates (`19.4326° N · 99.1332° W`, `2026.05.29`), territory tags, and the triangle+node isotype cropped to an edge as composition. Used with intent, never as ornament.

**Motion.** Sober, "a signal appearing." Reveal = fade + 8px rise, 400ms ease-out on viewport entry. Connection = lines drawing between nodes via `stroke-dashoffset`, 600–800ms. Hover 150–200ms. **Forbidden:** heavy parallax, aggressive autoplay, constant loops, particles.

**Hover states.** Cards: subtle lift (`translateY(-3/-4px)`) + border turns mint. Buttons (primary): mint brightens slightly + small lift. Links: underline with offset. Tags: border + text shift to mint, node dot mint. **Press:** no shrink convention specified — keep transitions calm; primary stays high-contrast mint-on-petrol.

**Borders, radii, elevation.** Mostly square — editorial/archive feel. Buttons & inputs **4px**, cards **6–8px**, tags **pill**. Borders are 1px: petrol-700 on dark, `#D8E2DF` on light. **No drop shadows / no glow** — elevation is communicated by surface step (petrol-900 → petrol-800) and a 1px border, plus the hover lift. A 2px mint "topline" rule marks event cards.

**Transparency & blur.** Minimal. Secondary buttons on dark use a 40% cal border on transparent fill. Textures sit at very low opacity. No glassmorphism / no backdrop blur.

**Cards.** Flat petrol-800 surface, 1px petrol-700 border, 6–8px radius, generous padding (~26px), no shadow. Three canonical types: **Evento** (mint topline, mint date, h3 title, slate place-meta, short desc, CTA), **Voz** (duotone-green portrait, name h4, role meta, territory tag, connection line), **Señal** (kicker `SEÑAL` + timestamp, h3 headline, territory tag, 1–2 lines of implication, "leer →" link — an archive-card aesthetic).

---

## ICONOGRAPHY

The brand is **glyph-light and system-driven** — there is no decorative icon set and no icon font in the source.

- **Primary mark / "icon" vocabulary:** the **isotype** (triangle that points forward + the **node** circle that lights up). It is the brand's recurring graphic atom — used cropped to edges, as bullet nodes, and as the favicon-scale mark. Provided as `assets/isotype-reverse.svg` and `assets/isotype-positive.svg`. The node is always an **outline (ring), never solid fill**; mint is reserved for action, so the node ring is **emerald on dark/emerald, white-with-petrol-stroke on light**.
- **Nodes & connectors** (small circles + thin emerald lines) act as the de-facto iconography: one mint node = active signal; slate nodes = inactive structure.
- **Coordinate hairlines** (map/axis ticks) and **timestamps** are graphic signatures, not icons.
- **Emoji:** none in designed pieces; only 📍 and 👇 in the Instagram bio, utilitarian.
- **Unicode glyphs as icons:** sparing use of `·` (middle dot) as a separator, `→` for "leer/ver" links, `°` `′` in coordinates. These are typographic, set in Gotham.

**If a UI genuinely needs functional icons** (e.g. share, calendar, close in a web product), use a thin-stroke, geometric, single-weight set that matches Gotham's geometry — **[Lucide](https://lucide.dev)** (1.5–2px stroke, rounded joins) is the recommended CDN substitute, rendered in slate `#547476` (or mint when the icon is the active signal). **This is a substitution, not a brand-native set — flagged below.** Keep icons monoline, never filled, never multicolor.

---

## Index / manifest

Root files:
- **`README.md`** — this file: context, sources, content + visual foundations, iconography.
- **`colors_and_type.css`** — production tokens (CSS custom properties) + `@font-face` for Gotham + semantic type/color classes. Import this into any artifact.
- **`SKILL.md`** — Agent-Skills-compatible entry point.
- **`fonts/`** — Gotham OTFs: Thin, Medium, Book, Bold, Black.
- **`assets/`** — logo lockups (`logo-{reverse,positive,emerald,on-emerald}.svg`), isotypes (`isotype-{reverse,positive}.svg`), brand boards (`brand-board-0[1-5].svg`).
- **`preview/`** — design-system cards (swatches, type specimens, components) shown in the Design System tab.

UI kits (high-fidelity recreations):
- **`ui_kits/instagram/`** — the 6 master Instagram templates (4:5, 1080×1350): Cover, Señal, Voz, Pregunta, Evento, Idea ancla — plus a feed view.
- **`ui_kits/web/`** — the community website: hero, próximo evento, manifiesto, archivo de señales (light), voces, footer.

See each UI kit's own `README.md` for component inventories.

---

*Source of truth for social, web and materials. Brand coordinates: 19.4326° N · 99.1332° W · CDMX · EST. 2026.*
