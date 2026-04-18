import { buildGlobalSitelinksGraphJsonLd } from '@/lib/schema-global-sitelinks';

/**
 * JSON-LD global : WebSite (hasPart) + SiteNavigationElement — injecté une fois dans le layout racine.
 */
export function GlobalSitelinksJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGlobalSitelinksGraphJsonLd()) }}
    />
  );
}
