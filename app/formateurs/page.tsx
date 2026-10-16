import type { Metadata } from 'next';
import Link from 'next/link';
import { FormateursCatalogueHub } from '@/components/formateurs/FormateursCatalogueHub';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Section } from '@/components/ui/Section';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE =
  'Les formateurs et leurs domaines d’intervention | Laure Olivié';
const PAGE_DESCRIPTION =
  'Spécialités des formateurs BTP : IA, travaux, commercial, direction, management et administration. Programmes en présentiel en Île-de-France — OFC Qualiopi.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Les formateurs et leurs domaines d’intervention',
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

  return (
    <div>
      <JsonLd id="schema-formateurs-itemlist" schema={itemListSchema} />
      <BreadcrumbJsonLd
        id="schema-breadcrumb-formateurs"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Formateurs', url: `${base}${LINKS.formateurs}` },
        ]}
      />

      <section className={`${OFC_SEC.heroWhite} ofc-section--compact`}>
        <div className={OFC_SECTION_INNER}>
          <h1 className={OFC_TYPE_H2}>
            Les formateurs et leurs domaines d’intervention
          </h1>
          <p
            className={`${OFC_TYPE_LEAD} mt-3 max-w-2xl text-base text-ofc-ink-muted md:text-lg`}
          >
            Découvrez les spécialités de nos intervenants et les programmes associés à vos
            besoins dans le BTP.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#formateurs-profiles"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
            >
              Découvrir les profils
            </Link>
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>

      <Section tone="canvas" aria-labelledby="formateurs-grille">
        <h2 id="formateurs-grille" className="sr-only">
          Grille des formateurs
        </h2>
        <FormateursCatalogueHub formateurs={formateurs} />
      </Section>

      <Section tone="muted" aria-labelledby="formateurs-cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="formateurs-cta" className={OFC_TYPE_H2}>
            Quelle formation pour votre équipe&nbsp;?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted">
            Présentez vos besoins&nbsp;: devis, appels d’offres, conduite de travaux, gestion
            ou usages de l’IA. Échangeons sur le programme adapté à votre entreprise en
            présentiel en Île-de-France.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href={LINKS.contact}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
            >
              Échanger sur mon besoin
            </Link>
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
            >
              Consulter le catalogue
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
