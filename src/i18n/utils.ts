// i18n runtime helpers used by .astro components and the layout.
import { ui } from "./ui";
import {
  DEFAULT_LOCALE,
  LOCALE_CODES,
  getLocale,
} from "./config.mjs";

type Lang = keyof typeof ui;
type Dict = (typeof ui)["en"];

export { DEFAULT_LOCALE, LOCALE_CODES, getLocale };

/** Narrow an arbitrary string to a supported language, falling back to default. */
export function asLang(code: string | undefined): Lang {
  return (code && (LOCALE_CODES as readonly string[]).includes(code)
    ? code
    : DEFAULT_LOCALE) as Lang;
}

/**
 * Derive the active language from a request URL's pathname.
 * Mirrors Astro's i18n routing (prefixDefaultLocale: false) but is base-aware
 * because we read the first *meaningful* segment after the deploy base.
 */
export function getLangFromUrl(url: URL): Lang {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  let path = url.pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length);
  const seg = path.split("/").filter(Boolean)[0];
  return asLang(seg);
}

/**
 * Build a translator bound to a language. Missing keys fall back to English,
 * then to the key itself, so a partial translation never breaks the page.
 * Supports {placeholder} interpolation.
 */
export function useTranslations(lang: Lang) {
  const dict = ui[lang] as Partial<Dict>;
  const fallback = ui[DEFAULT_LOCALE];
  return function t(
    key: keyof Dict,
    vars?: Record<string, string | number>,
  ): string {
    let out: string = (dict[key] as string) ?? (fallback[key] as string) ?? String(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return out;
  };
}

/**
 * The full string table for a language (English-filled for any gaps).
 * Serialized into the meter island so its client script can localize the
 * dynamic readouts (zones, errors, screen-reader summary) without a backend.
 */
export function dictFor(lang: Lang): Record<string, string> {
  return { ...(ui[DEFAULT_LOCALE] as Record<string, string>), ...(ui[lang] as Record<string, string>) };
}
