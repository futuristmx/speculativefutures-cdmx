# UI Kit · Instagram template engine — @futures_mex

A high-fidelity recreation of the **6 master Instagram templates** described in the launch playbook. The whole point of the system: build the templates **once**, then *fill them in* — every post is filled, not designed from scratch.

All templates: **4:5 · 1080×1350**, petrol `#062424` ground, Gotham, exactly **one** mint `#66EBAC` accent, the corner isotype (triangle + emerald-ring node), and a coordinate hairline footer (`19.4326° N · 99.1332° W` · timestamp).

## Run it
Open `index.html`. Left rail switches between the 6 templates (rendered at native size, scaled to ~46%). **"Vista de feed"** shows the `@futures_mex` profile mock with the live grid — tap any post to open its template.

## Files
- `index.html` — interactive shell (rail + stage + feed mock).
- `templates.jsx` — the templates + shared atoms. Exports to `window`.
- `App.jsx` — gallery / feed interaction.

## Components (`templates.jsx`)
| Export | Role | Key fillable props |
|---|---|---|
| `CoverTemplate` | Launch / claim cover | `claim`, `sub` |
| `SenalTemplate` | Signal reading (firma format) | `date`, `title`, `territory`, `implication` |
| `VozTemplate` | Voice profile (duotone portrait slot) | `name`, `role`, `territory`, `bio` |
| `PreguntaTemplate` | Centered provocation | `question`, `eje` (mint word) |
| `EventoTemplate` | Event with big mint date + CTA | `day`, `month`, `time`, `title`, `place`, `cta` |
| `IdeaTemplate` | One-line manifesto fragment | `phrase`, `eje`, `attribution` |
| `TemplateFrame` | Shared shell: petrol + hairlines + corner isotype + coord bar | `corner`, `coords`, `pad` |
| `Isotype` · `TerritoryTag` · `CoordBar` | Shared atoms | — |

## Notes
- The **Voz** portrait is a duotone-green placeholder (`RETRATO · duotono`). Drop the subject's photo in and apply a green duotone — do not generate portraits.
- `PreguntaTemplate` / `IdeaTemplate` highlight one **eje** word in mint; everything else stays cal. One accent only.
- Carousels (manifesto, "esto encontrarás aquí") = sequences of `IdeaTemplate` / `EventoTemplate` slides.
- Captions, hashtags and the go-live calendar live in `uploads/SF-CDMX_Instagram_Launch_Playbook.md`, not here — this kit is the visual layer.
