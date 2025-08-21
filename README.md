## Unit Converter

Fresh + Preact project for converting measurement units (length now, extensible to weight, volume, etc.).
UI styling uses TailwindCSS + daisyUI (default theme: "nord").
This project is part of the training on: https://roadmap.sh/projects/unit-converter

Features
- Lightweight SSR + islands architecture (Fresh / Preact)
- Reusable UI components (Select, Input, Button, conversion islands)
- API route that serves available units
- DaisyUI theming (global `data-theme="nord"`)

Prerequisites
- Deno (latest stable). Install: https://docs.deno.com/getting_started/installation

Core Commands
- Development (watch + live reload):
```pwsh
deno task dev
```
- Production build:
```pwsh
deno task build
```
- Run the built server:
```pwsh
deno task start
```

Project Structure (overview)
- `routes/` — pages + handlers (e.g. `routes/length/` for length conversions)
- `components/` — reusable UI pieces
- `islands/` — interactive client-side islands
- `static/` — global styles & assets (`styles.css` includes `@plugin "daisyui"`)
- `dev.ts`, `main.ts`, `deno.json` — dev entrypoint and configuration

Notes
- If you introduce dynamic Tailwind class names (e.g. `select-${size}`), ensure they are safelisted or generated via `matchUtilities`, otherwise they may be purged in production.
- Streaming / iterator utilities can be used instead of arrays where lazy evaluation matters.

Extending
- Add more unit categories by creating new route folders (e.g. `routes/weight/`).
- Provide unit lists via an API endpoint: mirror the existing length handler.
- Add client-side validation or real-time conversion by creating additional islands.

Contributing
1. Fork the repo
2. Create a feature branch
3. Run `deno task dev`
4. Open a Pull Request

Potential Next Improvements
- Add tests for conversion logic
- Add a theme switcher (toggle different daisyUI themes)
- Persist last used units in localStorage

Need more? Ask for API docs, diagrams, or deployment instructions and they can be added here.
