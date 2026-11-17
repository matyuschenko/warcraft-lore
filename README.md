# A history of Azeroth

A static character timeline covering Warcraft I, Warcraft II (including Beyond the Dark Portal), Warcraft III (including The Frozen Throne), and the original World of Warcraft launch setting.

## Files

- `index.html` — complete chart content, historical faction memberships, and source links
- `styles.css` — Warcraft-inspired colors and responsive layout
- `app.js` — faction filters, enlarged portrait previews, and the fixed game header
- `assets/` — thumbnail and full-size character artwork
- `.nojekyll` — serves the project as plain static files

No package installation, build command, API key, or server application is required. Open `index.html` directly to preview. Publish these files at your GitHub Pages source root, preserving the `assets/` directory. All asset paths are relative, so repository subpaths work too.

## Behavior

Faction filters match historical allegiances across the four columns. Multiple selections show their union; deselect every button to restore all 43 characters. Empty section headings disappear with their rows.

Portraits enlarge on hover or keyboard focus. Touch users can tap a portrait. Escape, tapping elsewhere, or scrolling closes the preview. The game header remains visible while scrolling the chart, including when the narrow-screen table is scrolled horizontally.

## Editing

Edit the table directly in `index.html`. Each character row has a space-separated `data-factions` attribute (`alliance`, `horde`, `scourge`, `neutral`). Keep image paths and the full-size `data-full` path on each portrait button consistent.

`work/` contains prior drafts and local QA materials, is ignored by Git, and is not part of the publishable project or distribution ZIP.

## Sources and artwork

Individual character references and artwork sources are linked at the bottom of the chart. Warcraft and the original artwork belong to Blizzard Entertainment. This is an unofficial fan reference. Later official portraits identify the characters; they do not always depict their exact appearance during the covered era.

The summaries use established main-timeline outcomes, not every mutually exclusive RTS ending. “Background lore” indicates contextual events not played out directly in that game. Garona’s half-draenei ancestry reflects later canon.

Created by [Maxim Matyuschenko](https://github.com/matyuschenko) and ChatGPT.

Favicon: official World of Warcraft website icon, © Blizzard Entertainment. Stored locally in `assets/favicon.png` with an ICO fallback.

## Analytics

Yandex.Metrika counter `37192685` loads asynchronously near the beginning of the page, with clickmap, link tracking, and accurate bounce tracking enabled. A noscript image fallback is placed at the start of the body.
