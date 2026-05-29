---
name: sf-cdmx-design
description: Use this skill to generate well-branded interfaces and assets for Speculative Futures CDMX (foresight community, CDMX), either for production or throwaway prototypes/mocks. Contains the design system, colors, type, Gotham fonts, logos, Instagram templates and a website UI kit. Concept "señal en lo oscuro": monochromatic green, dark-first, one mint accent.
user-invocable: true
---

# Speculative Futures CDMX — design skill

Read `README.md` first — it holds the full context, content fundamentals, visual foundations and iconography. Then explore the other files.

## What's here
- `README.md` — brand context, voice, visual rules, iconography, manifest.
- `colors_and_type.css` — drop-in tokens (`@font-face` Gotham + CSS custom properties + semantic classes). Import this into any artifact.
- `fonts/` — Gotham OTFs (Thin, Medium, Book, Bold, Black + italics + rounded).
- `assets/` — logo lockups, isotypes, brand boards (SVG).
- `preview/` — design-system specimen cards.
- `ui_kits/instagram/` — the 6 master 4:5 post templates + feed mock (React).
- `ui_kits/web/` — the community website (React).

## Non-negotiables
- **Monochromatic green, dark-first.** Petrol `#062424` ground. **One** mint `#66EBAC` accent per piece (action / signal). Emerald `#439973` = connection (and links on light). Slate `#547476` = structure/metadata. Cal `#F4F7F5` = text on dark + light canvas. **Never** a second color.
- **Gotham only.** Black/Bold display, Medium body & UI, Medium uppercase +0.08em for metadata.
- **Links:** mint on dark, emerald on light, underlined, regular weight — never bold. Never mint as text on white (illegible).
- **Light vs dark is functional:** read >30s → light; sense/scan → dark.
- **Graphic signatures:** coordinate hairlines, nodes (logo echo; node is an outline ring, never filled), timestamps, the CDMX coordinates `19.4326° N · 99.1332° W`.
- **Forbidden:** cyberpunk, neon glow, saturated gradients, a second accent, "futuristic" type, drop shadows, particles. Sober futures.
- **Voice (Spanish, Mexico):** strategic, clear, human; "nosotros"/"tú"; no buzzword soup, no "we are the future," no "no es X, es Y." Five territories + five formats (Señal/Voz/Pregunta/Evento/Idea ancla).

## How to work
- **Visual artifacts** (slides, mocks, social posts, throwaway prototypes): copy the needed assets out, import `colors_and_type.css`, and produce static/interactive HTML for the user to view. Reuse the UI-kit React components where useful.
- **Production code:** read the rules here and use the tokens/components to become an expert in designing with this brand.
- If invoked with no guidance, ask what they want to build, ask a few focused questions, then act as an expert designer who outputs HTML artifacts **or** production code as needed.
