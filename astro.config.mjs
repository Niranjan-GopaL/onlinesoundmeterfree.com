// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { LOCALES, DEFAULT_LOCALE } from './src/i18n/config.mjs';

// ---------------------------------------------------------------------------
// Deploy targets
//
// We ship to two places with ONE codebase, switched by the DEPLOY_ENV env var:
//
//   1. GitHub *project* Pages (temporary, while testing/sharing):
//        https://niranjan-gopal.github.io/onlinesoundmeterfree.com/
//      `base` puts the whole site under that subpath, so every internal link
//      and asset must go through src/lib/path.ts (`url()`), which prepends the
//      base. This build is also marked noindex + robots-disallow (see
//      src/pages/robots.txt.ts and Layout.astro) so Google never indexes the
//      github.io copy and we avoid duplicate-content penalties on the real
//      domain. `canonical` always points at the real domain regardless, so any
//      stray crawl consolidates to onlinesoundmeterfree.com.
//
//   2. The real domain (after you buy it):
//        npm run build            →  base '/', indexable, robots Allow.
//      Then add public/CNAME with `onlinesoundmeterfree.com` and point DNS.
//      `url()` becomes a no-op (base '/') — no other code changes needed.
//
// Build commands:
//   npm run build            → production (real domain, indexable)
//   npm run build:ghpages    → GitHub Pages (subpath, noindex)  [CI uses this]
// ---------------------------------------------------------------------------
const isGitHubPages = process.env.DEPLOY_ENV === 'gh-pages';

// Canonical/SEO domain is ALWAYS the real one (drives <link rel=canonical>,
// hreflang and sitemap), so search engines consolidate to it.
const SITE = 'https://onlinesoundmeterfree.com';

export default defineConfig({
  site: SITE,
  base: isGitHubPages ? '/onlinesoundmeterfree.com' : '/',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES.map((l) => l.code),
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Tell Google about every language version of each page.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l.code, l.hreflang])),
      },
      // The github.io build is noindex; never expose its sitemap to crawlers.
      filter: () => !isGitHubPages,
    }),
  ],
});
