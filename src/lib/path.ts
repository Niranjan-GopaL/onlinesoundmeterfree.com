// Base-aware + locale-aware internal links.
//
// Why this exists: on GitHub Pages the whole site lives under a subpath
// (/onlinesoundmeterfree.com/…), and non-English pages live under a locale
// prefix (/ko/…). Hard-coded `href="/decibel-chart/"` would 404 in both cases.
// Every internal link goes through url() so it always resolves correctly,
// and the helper becomes a near no-op once the real domain (base '/') is live.

import { DEFAULT_LOCALE, LOCALE_CODES } from "../i18n/config.mjs";

// import.meta.env.BASE_URL is derived from `base` in astro.config.mjs:
//   prod      → "/"
//   gh-pages  → "/onlinesoundmeterfree.com/"
const RAW_BASE = import.meta.env.BASE_URL || "/";
// Normalized, no trailing slash: "" (prod) or "/onlinesoundmeterfree.com" (gh-pages).
const BASE = RAW_BASE.replace(/\/+$/, "");

const PASS_THROUGH = /^(#|https?:|mailto:|tel:|\/\/)/;

/**
 * Build an internal URL with the deploy base + (optional) locale prefix.
 * @param path  Logical path, e.g. "/decibel-chart/" or "/about/#methodology".
 * @param lang  Target locale code (default locale gets no prefix).
 */
export function url(path: string = "/", lang: string = DEFAULT_LOCALE): string {
  if (PASS_THROUGH.test(path)) return path;

  // Separate ?query / #hash so we only transform the pathname.
  const match = path.match(/^([^?#]*)([?#].*)?$/);
  const suffix = match?.[2] ?? "";
  let pathname = "/" + (match?.[1] ?? "").replace(/^\/+/, "");

  const localePrefix = lang && lang !== DEFAULT_LOCALE ? `/${lang}` : "";
  let out = `${BASE}${localePrefix}${pathname}`;
  out = out.replace(/\/{2,}/g, "/"); // collapse accidental double slashes
  if (out === "") out = "/";
  return out + suffix;
}

/**
 * Strip the deploy base and any locale prefix from a runtime pathname,
 * yielding the logical path (e.g. "/onlinesoundmeterfree.com/ko/faq/" → "/faq/").
 * Used to build hreflang alternates and the language switcher.
 */
export function logicalPath(pathname: string): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  if (!p.startsWith("/")) p = "/" + p;
  for (const code of LOCALE_CODES) {
    if (code === DEFAULT_LOCALE) continue;
    if (p === `/${code}` || p.startsWith(`/${code}/`)) {
      p = p.slice(code.length + 1) || "/";
      break;
    }
  }
  if (!p.startsWith("/")) p = "/" + p;
  return p;
}

/** The current absolute base prefix (no trailing slash). Handy for assets. */
export const BASE_PATH = BASE;
