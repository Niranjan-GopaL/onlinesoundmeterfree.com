// Web app manifest, generated so icon/start paths carry the deploy base.
// A static public/ manifest can't know the GitHub Pages subpath; this endpoint
// reads import.meta.env.BASE_URL and emits correct absolute paths in both
// targets, enabling "Add to Home Screen" with the right icon.
import type { APIRoute } from "astro";
import { SITE } from "../consts";

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export const GET: APIRoute = () => {
  const manifest = {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.tagline,
    start_url: `${BASE}/`,
    scope: `${BASE}/`,
    display: "standalone",
    background_color: "#010102",
    theme_color: "#5e6ad2",
    icons: [
      {
        src: `${BASE}/favicon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
};
