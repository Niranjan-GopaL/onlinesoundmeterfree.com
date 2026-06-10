// Centralized site metadata + navigation. Single source of truth for SEO + chrome.

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

export const NAV_LINKS = [
  { label: "Meter", href: "/" },
  { label: "Decibel Chart", href: "/decibel-chart/" },
  { label: "Safe Exposure", href: "/safe-exposure-calculator/" },
  { label: "Classroom", href: "/sound-meter-for-classroom/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Tools",
    links: [
      { label: "Sound Level Meter", href: "/" },
      { label: "Decibel (dB) Chart", href: "/decibel-chart/" },
      { label: "Safe Exposure Calculator", href: "/safe-exposure-calculator/" },
      { label: "Classroom Noise Meter", href: "/sound-meter-for-classroom/" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/blog/" },
      { label: "FAQ", href: "/faq/" },
      { label: "How it works", href: "/how-it-works/" },
      { label: "Accuracy & calibration", href: "/accuracy/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About", href: "/about/" },
      { label: "Methodology", href: "/about/#methodology" },
      { label: "Privacy", href: "/privacy/" },
    ],
  },
] as const;
