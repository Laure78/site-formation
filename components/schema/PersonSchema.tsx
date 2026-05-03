import { buildGlobalPersonLaureJsonLd } from '@/lib/schema-person-global';

/**
 * JSON-LD `Person` (Laure Olivié) — layout global.
 * Rendu en début de `<body>` (App Router) ; Google accepte JSON-LD body ou head.
 * `@id` partagé (`{base}/#person`) avec FormationMetierJsonLd pour fusion d'entité.
 */
export function PersonSchema() {
  return (
    <script
      id="schema-person-global"
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD standard ; contenu produit côté serveur
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildGlobalPersonLaureJsonLd()),
      }}
    />
  );
}
