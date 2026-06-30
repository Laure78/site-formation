import { SITE_CONFIG } from '@/lib/seo';
import { buildPromoVideoSitemapXmlEntry } from '@/lib/schema-promo-video';

export const revalidate = 3600;

export function GET() {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const entry = buildPromoVideoSitemapXmlEntry(baseUrl);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entry}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
