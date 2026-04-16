import Script from 'next/script';

type Props = {
  /** Objet JSON-LD Course (sortie de `getDedicatedFormationCoursePageJsonLd`). */
  schema: Record<string, unknown>;
};

/**
 * Schéma JSON-LD `Course` pour les fiches formation catalogue.
 * Chargé en `afterInteractive` pour compléter le schéma Organization global injecté dans `app/layout.tsx`.
 */
export function FormationCourseScriptJsonLd({ schema }: Props) {
  return (
    <Script
      id="schema-formation-course"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
