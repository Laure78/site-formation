/**
 * Injection Schema.org JSON-LD — App Router.
 * Balise native `<script type="application/ld+json">` (jamais de `<head>` manuel hors layout).
 */
type JsonLdProps = {
  /** Objet JSON-LD (`@context`, `@type`, `@graph`, etc.) */
  schema?: object | null;
  /** Alias de `schema` */
  data?: object | null;
  /** id du script (plusieurs blocs sur une même page) */
  id?: string;
};

/** Sérialise sans casser le HTML (échappement de `</` dans les chaînes). */
export function serializeJsonLd(payload: object): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

export function JsonLd({ schema, data, id }: JsonLdProps) {
  const payload = data ?? schema;
  if (payload == null) {
    return null;
  }
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD standard ; contenu serveur
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
