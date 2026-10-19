import type { Metadata } from 'next';
import Link from 'next/link';
import { FormateursCatalogueHub } from '@/components/formateurs/FormateursCatalogueHub';
import { FormateursIntroBand } from '@/components/formateurs/FormateursIntroBand';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Section } from '@/components/ui/Section';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_H2,
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

const FORMATEURS_CTA =
  'inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-[transform,background-color,border-color] duration-200 sm:w-auto';

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

          <div className="formateurs-hub-hero__intro">
            <FormateursIntroBand formateurs={formateurs} />
          </div>

          <div className="formateurs-hub-hero__actions flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#formateurs-profiles"
              className={`${OFC_CTA_PRIMARY} ${FORMATEURS_CTA} !rounded-xl shadow-none hover:shadow-sm`}
            >
              Profils et programmes détaillés
            </Link>
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_SECONDARY} ${FORMATEURS_CTA} !rounded-xl border-ofc-border-strong bg-white text-ofc-ink shadow-none hover:border-ofc-accent/35`}
            >
              Voir les formations
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
