// Centralized site metadata + navigation. Single source of truth for SEO + chrome.
// Labels are i18n keys (see src/i18n/ui.ts), resolved at render time per locale.

import type { UIKey } from "./i18n/ui";

export const SITE = {
  name: "Online Sound Meter",
  shortName: "SoundMeter",
  // Production domain (to be registered): onlinesoundmeterfree.com
  url: "https://onlinesoundmeterfree.com",
  tagline: "Free online sound level meter — measure noise in decibels",
  description:
    "A free, accurate online sound level meter. Measure ambient noise in real time with dBA, LAeq, A/C/Z weighting and Fast/Slow response — right in your browser. No app, no upload, fully private.",
  locale: "en_US",
  twitter: "@onlinesoundmeter",
} as const;

export interface NavLink {
  /** i18n key for the visible label. */
  key: UIKey;
  /** Locale-less path. */
  href: string;
  /**
   * True when a localized version of this page exists at /{lang}{href}.
   * Currently only the home/meter page; everything else links to the English
   * page (with hreflang) until those pages are translated too.
   */
  localized?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { key: "nav.meter", href: "/", localized: true },
  { key: "nav.decibelChart", href: "/decibel-chart/" },
  { key: "nav.safeExposure", href: "/safe-exposure-calculator/" },
  { key: "nav.classroom", href: "/sound-meter-for-classroom/" },
  { key: "nav.blog", href: "/blog/" },
  { key: "nav.faq", href: "/faq/" },
];

export interface FooterSection {
  titleKey: UIKey;
  links: NavLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    titleKey: "footer.tools",
    links: [
      { key: "nav.meter", href: "/", localized: true },
      { key: "nav.decibelChart", href: "/decibel-chart/" },
      { key: "nav.safeExposure", href: "/safe-exposure-calculator/" },
      { key: "nav.classroom", href: "/sound-meter-for-classroom/" },
    ],
  },
  {
    titleKey: "footer.learn",
    links: [
      { key: "nav.blog", href: "/blog/" },
      { key: "nav.faq", href: "/faq/" },
      { key: "nav.howItWorks", href: "/how-it-works/" },
      { key: "nav.accuracy", href: "/accuracy/" },
    ],
  },
  {
    titleKey: "footer.about",
    links: [
      { key: "nav.about", href: "/about/" },
      { key: "nav.methodology", href: "/about/#methodology" },
      { key: "nav.privacy", href: "/privacy/" },
    ],
  },
];
