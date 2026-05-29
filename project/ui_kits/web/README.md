# UI Kit · Comunidad (website)

A high-fidelity recreation of the Speculative Futures CDMX **community website**, built straight from the design system. One continuous page that demonstrates the dark-first atmosphere *and* the functional light "reading" mode in the signal archive.

## Run it
Open `index.html`. Sticky nav, smooth-scroll anchors, **"Únete"** opens a join overlay (email → confirmation). The **Archivo de señales** section is interactive: the territory tags filter the signal cards live.

## Files
- `index.html` — page shell (loads React + Babel + the kit).
- `components.jsx` — atoms (`WIsotype`, `WLogo`, `WBtn`, `WTag`, `Eyebrow`) + `Nav`, `Hero`, `NextEvent`, `Manifesto`.
- `sections.jsx` — `Archive` (light mode + filter), `Voces`, `Footer` + sample data (`SIGNALS`, `VOCES`, `TERRITORIES`).
- `App.jsx` — assembly + `JoinOverlay`.

## Sections / components
| Section | Notes |
|---|---|
| **Nav** | Logo reverse, meta links, mint "Únete". Translucent petrol + blur on scroll. |
| **Hero** | Petrol + coordinate hairlines. Display claim, mint emphasis, primary + ghost CTAs, coord rule. |
| **Próximo evento** | Petrol-800 band, mint topline + mint date, node/connection graphic. |
| **Manifiesto** | ~680px measure, body-lg, one mint *eje* word per line. |
| **Archivo de señales** | **Light (cal)** — long-read mode. Filterable territory tags, signal cards, emerald underlined links. |
| **Voces** | Petrol-800, duotone-green portrait avatars, territory tags. |
| **Footer** | Big mint-accented CTA, logo, coordinates as signature. |

## Notes
- Light vs dark here is **functional**: hero/events/manifesto/voces *feel the territory* (petrol); the archive is for *reading* (cal). Links are mint on dark, **emerald on light**.
- Voice avatars are duotone-green placeholders — drop in real (green-duotone) portraits.
- The button/tag/card components mirror `colors_and_type.css` tokens; reuse them as the canonical web components.
