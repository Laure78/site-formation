import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { FormateursCatalogueHub } from '@/components/formateurs/FormateursCatalogueHub';
import { FormateursBottomCta } from '@/components/formateurs/FormateursBottomCta';
import { FormateursMobileStickyBar } from '@/components/formateurs/FormateursMobileStickyBar';
import { FormateursTrustStrip } from '@/components/formateurs/FormateursTrustStrip';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Section } from '@/components/ui/Section';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = 'Les formateurs qui vous accompagnent | Laure Olivié';
const PAGE_DESCRIPTION =
  'Formateurs OFC : parcours métiers BTP, expériences chantier et modules IA animés en présentiel Île-de-France. Organisme certifié Qualiopi.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Les formateurs qui vous accompagnent',
    titleAbsolute: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    descriptionFinal: true,
    path: LINKS.formateurs,
    appendAuthorSuffix: false,
    keywords: [
      'formateurs BTP',
      'formatrice IA BTP',
      'formation management chantier',
      'catalogue formations BTP',
    ],
  }),
  title: { absolute: PAGE_TITLE },
};

const FORMATEURS_HERO_SECTION = ofcSectionClasses({
  tone: 'white',
  size: 'compact',
  mesh: false,
  divide: false,
});

export default function FormateursPage() {
  const formateurs = getFormateursHubProfiles();
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formateurs OFC — domaines d’intervention BTP',
    numberOfItems: formateurs.length,
    itemListElement: formateurs.map((f, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${f.prenom} ${f.nom}`,
      url: `${base}${LINKS.formateurs}#${f.slug}`,
    })),
  };

  const personSchemas = formateurs.map((f) => {
    const image =
      f.portrait.kind === 'photo' ? `${base}${f.portrait.src}` : undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${base}${LINKS.formateurs}#${f.slug}`,
      name: `${f.prenom} ${f.nom}`,
      jobTitle: f.intitule,
      description: f.parcours,
      ...(image ? { image } : {}),
      url: `${base}${LINKS.formateurs}#${f.slug}`,
      worksFor: {
        '@type': 'Organization',
        name: 'OFC Création d’Entreprise',
      },
    };
  });

  return (
    <div>
      <JsonLd id="schema-formateurs-itemlist" schema={itemListSchema} />
      {personSchemas.map((schema, index) => (
        <JsonLd
          key={formateurs[index]?.id ?? index}
          id={`schema-formateur-person-${formateurs[index]?.slug ?? index}`}
          schema={schema}
        />
      ))}
      <BreadcrumbJsonLd
        id="schema-breadcrumb-formateurs"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Formateurs', url: `${base}${LINKS.formateurs}` },
        ]}
      />

      <section className={`${FORMATEURS_HERO_SECTION} formateurs-hub-hero`}>
        <div className={`${OFC_SECTION_INNER} formateurs-hub-hero__inner`}>
          <p className={`${OFC_EYEBROW} text-ofc-accent`}>Formation IA BTP</p>
          <h1 className={`${OFC_TYPE_HERO} formateurs-hub-hero__title`}>
            Les formateurs qui vous accompagnent
          </h1>
          <p className="formateurs-hub-hero__lead max-w-2xl text-ofc-ink-muted">
            Spécialités et formations animées pour le bâtiment et les travaux publics — présentiel
            Île-de-France.
          </p>

          <FormateursTrustStrip />

          <div className="formateurs-hub-hero__actions mt-8">
            <Link
              href="#formateurs-profiles"
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 text-base font-semibold`}
            >
              Voir l’équipe
            </Link>
          </div>
        </div>
      </section>

      <Section
        tone="muted"
        className="formateurs-hub-profiles-section ofc-section--divide-0"
        innerClassName="formateurs-hub-profiles-section__inner"
        aria-labelledby="formateurs-grille"
      >
        <h2 id="formateurs-grille" className="sr-only">
          Grille des formateurs
        </h2>
        <Suspense fallback={<p className="text-ofc-ink-muted">Chargement de l’équipe…</p>}>
          <FormateursCatalogueHub formateurs={formateurs} />
        </Suspense>
      </Section>

      <Section tone="muted" aria-labelledby="formateurs-cta">
        <FormateursBottomCta />
      </Section>

      <FormateursMobileStickyBar />
    </div>
  );
}
