# Online Sound Meter

A free, private, browser-based **sound level meter**. Measure ambient noise in
real time — dBA / dBC / dBZ weighting, IEC 61672 Fast/Slow time response, LAeq,
live spectrum and history, CSV/PDF export — entirely on-device. No app, no
upload, no sign-up.

🔗 **Live preview (temporary):** https://niranjan-gopal.github.io/onlinesoundmeterfree.com/
🌐 **Production domain (planned):** https://onlinesoundmeterfree.com

> The GitHub Pages preview above is intentionally **not indexable** (noindex +
> `robots.txt` Disallow) so it never competes with the real domain in search.

---

## Highlights

- **Real measurement, not a toy** — A/C/Z frequency weighting, Fast (125 ms) /
  Slow (1 s) time-weighting, energy-average and LAeq (the metric noise
  regulations use), plus a NIOSH 85 dB reference line.
- **100% private** — audio is analysed locally with the Web Audio API and
  discarded frame by frame. Nothing is recorded, stored, or uploaded.
- **8 languages** — English, 中文, Español, Deutsch, 日本語, 한국어, Français,
  Português. Each gets its own indexable URL (`/ko/`, `/zh/`, …) with correct
  `hreflang` + canonical for international SEO.
- **Keyboard-first** — power users never need the mouse. Press <kbd>?</kbd>
  anywhere for the full cheat-sheet.
- **Installable** — static site + web manifest, works on any phone, tablet or
  laptop.

## Keyboard shortcuts

| Key | Action | | Key | Action |
|-----|--------|-|-----|--------|
| <kbd>Space</kbd> | Start / stop measuring | | <kbd>?</kbd> | Show / hide help |
| <kbd>R</kbd> | Reset statistics | | <kbd>D</kbd> | Toggle dark / light |
| <kbd>W</kbd> | Cycle A / C / Z weighting | | <kbd>L</kbd> | Open language menu |
| <kbd>S</kbd> | Toggle Fast / Slow response | | <kbd>Esc</kbd> | Close dialog / menu |
| <kbd>E</kbd> | Export CSV | | | |

**Navigation** — press <kbd>G</kbd> then: <kbd>H</kbd> meter · <kbd>D</kbd>
decibel chart · <kbd>E</kbd> exposure calculator · <kbd>C</kbd> classroom ·
<kbd>B</kbd> blog · <kbd>F</kbd> FAQ.

## Tech

- [Astro](https://astro.build) (static output) + TypeScript
- Tailwind CSS v4
- Web Audio API DSP (`src/scripts/meter-engine.ts`)
- Astro built-in i18n routing (build-time, no backend)

## Develop

```sh
npm install        # Node >= 22.12
npm run dev        # local dev server
npm run build      # production build  → dist/  (real domain, indexable)
npm run preview    # preview the production build
```

## Deploy

Two targets from one codebase, switched by the `DEPLOY_ENV` env var:

| Command | `base` | Indexable? | Use |
|---------|--------|-----------|-----|
| `npm run build` | `/` | ✅ yes | the real domain |
| `npm run build:ghpages` | `/onlinesoundmeterfree.com` | 🚫 noindex | GitHub Pages preview |

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the
GitHub Pages build and publishes it. `canonical`, `hreflang` and the sitemap
always point at the **real domain**, so any stray crawl consolidates there.

### Going live on the real domain

When the domain is registered, no code changes are needed beyond:

1. Deploy with `npm run build` (base `/`, indexable).
2. Add `public/CNAME` containing `onlinesoundmeterfree.com` (if hosting on
   Pages) and point DNS.

The `url()` helper (`src/lib/path.ts`) becomes a no-op at base `/`.

## Adding a language

1. Add an entry to `LOCALES` in `src/i18n/config.mjs`.
2. Add its dictionary block to `src/i18n/ui.ts` (English is the canonical set;
   any missing key falls back to English automatically).

That's it — routing, the switcher, hreflang and the localized home all light up.

## License

All rights reserved.
