import { buildGlobalOrganizationEducationalJsonLd } from '@/lib/schema-organization-global';

/**
 * JSON-LD Organization (EducationalOrganization) — layout global.
 * Rendu en début de `<body>` : l’App Router gère le `<head>` via Metadata API ;
 * Google accepte le JSON-LD en body ou head.
 */
export function OrganizationSchema() {
  return (
    <script
      id="schema-organization-global"
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD standard ; contenu produit côté serveur
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildGlobalOrganizationEducationalJsonLd()),
      }}
    />
  );
}
