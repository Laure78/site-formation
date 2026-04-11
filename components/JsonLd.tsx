/**
 * Injection de données structurées Schema.org (JSON-LD).
 * Compatible App Router et Pages Router — balise native <script>.
 */
type JsonLdProps = {
  /** Objet JSON-LD (@context, @type, etc.) */
  schema: object;
  /** Optionnel : id du script (plusieurs blocs sur une même page) */
  id?: string;
};

export function JsonLd({ schema, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD standard ; contenu produit côté serveur
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
