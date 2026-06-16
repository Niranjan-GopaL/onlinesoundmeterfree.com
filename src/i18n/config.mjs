// Single source of truth for the languages the site ships in.
// Imported by astro.config.mjs (build), the Layout (hreflang/og), the language
// switcher and the url() helper. Add a language here + a dictionary in ui.ts
// and it lights up everywhere — no other wiring needed.
//
// `code`     — URL/route segment + Astro locale id (e.g. /ko/…). en has no prefix.
// `label`    — endonym shown in the language switcher (its own language).
// `hreflang` — BCP-47 value for <link rel="alternate" hreflang> + sitemap.
// `ogLocale` — Open Graph locale (underscored).
// `dir`      — text direction (all current langs are ltr; future-proofing).

/** @typedef {{ code: string, label: string, hreflang: string, ogLocale: string, dir: 'ltr' | 'rtl' }} Locale */

/** @type {Locale[]} */
export const LOCALES = [
  { code: 'en', label: 'English',    hreflang: 'en',      ogLocale: 'en_US', dir: 'ltr' },
  { code: 'zh', label: '中文',        hreflang: 'zh-Hans', ogLocale: 'zh_CN', dir: 'ltr' },
  { code: 'es', label: 'Español',    hreflang: 'es',      ogLocale: 'es_ES', dir: 'ltr' },
  { code: 'de', label: 'Deutsch',    hreflang: 'de',      ogLocale: 'de_DE', dir: 'ltr' },
  { code: 'ja', label: '日本語',      hreflang: 'ja',      ogLocale: 'ja_JP', dir: 'ltr' },
  { code: 'ko', label: '한국어',      hreflang: 'ko',      ogLocale: 'ko_KR', dir: 'ltr' },
  { code: 'fr', label: 'Français',   hreflang: 'fr',      ogLocale: 'fr_FR', dir: 'ltr' },
  { code: 'pt', label: 'Português',  hreflang: 'pt',      ogLocale: 'pt_BR', dir: 'ltr' },
];

export const DEFAULT_LOCALE = 'en';

export const LOCALE_CODES = LOCALES.map((l) => l.code);

/** Locales that get a URL prefix (everything except the default). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);

/** @param {string} code */
export const getLocale = (code) =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0];
