import type { APIRoute } from "astro";

// The GitHub Pages preview must NOT be indexed (avoids duplicate content vs the
// real domain). The authoritative signal is the per-page `noindex` meta tag in
// Layout.astro — GitHub serves its own /robots.txt at the github.io root, so a
// subpath robots.txt can't fully gate that host. This still disallows on the
// preview as belt-and-suspenders, and emits a proper Allow + sitemap for prod.
const isGitHubPages = process.env.DEPLOY_ENV === "gh-pages";

export const GET: APIRoute = ({ site }) => {
  const body = isGitHubPages
    ? [
        "# Temporary GitHub Pages preview. Indexing is disabled here so the",
        "# real domain (onlinesoundmeterfree.com) stays the only indexed copy.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
