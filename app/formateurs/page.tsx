import type { Metadata } from 'next';
import Link from 'next/link';
import { FormateursCatalogueHub } from '@/components/formateurs/FormateursCatalogueHub';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Section } from '@/components/ui/Section';
import { getCatalogueFormateurs } from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = 'Nos formateurs par domaine d’expertise | Laure Olivié';
const PAGE_DESCRIPTION =
  'Formateurs BTP par domaine : travaux, commercial, direction, management et administration. Modules catalogue 2027 en présentiel Île-de-France — OFC Qualiopi.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Nos formateurs par domaine d’expertise',
    titleAbsolute: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    descriptionFinal: true,
    path: LINKS.formateurs,
    appendAuthorSuffix: false,
    keywords: [
      'formateurs BTP',
      'formation management chantier',
      'formation chargé d’affaires',
      'catalogue formations BTP',
    ],
  }),
  title: { absolute: PAGE_TITLE },
};

export default function FormateursPage() {
  const formateurs = getCatalogueFormateurs();
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formateurs catalogue parcours métiers BTP',
    numberOfItems: formateurs.length,
    itemListElement: formateurs.map((f, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: `${f.prenom} ${f.nom}`,
        jobTitle: f.intitule,
        description: f.parcours,
        url: `${base}${LINKS.formateurs}#${f.slug}`,
      },
    })),
  };

  return (
    <div>
      <JsonLd id="schema-formateurs-itemlist" schema={itemListSchema} />
      <BreadcrumbJsonLd
        id="schema-breadcrumb-formateurs"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'À propos', url: `${base}${LINKS.aPropos}` },
          { name: 'Nos formateurs', url: `${base}${LINKS.formateurs}` },
        ]}
      />

      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER}>
          <h1 className={OFC_TYPE_H2}>Nos formateurs par domaine d’expertise</h1>
          <p className={`${OFC_TYPE_LEAD} mt-4 max-w-2xl text-base text-ofc-ink-muted md:text-lg`}>
            Cinq intervenants issus du terrain BTP animent les modules du catalogue parcours
            métiers en présentiel en Île-de-France. Chaque profil est relié aux formations de son
            domaine — ouverture des modules annoncée au catalogue pour 2027.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-ofc-ink-muted md:text-base">
            Les formations IA (ChatGPT, Claude) sont animées par{' '}
            <Link href={LINKS.aPropos} className={OFC_LINK}>
              Laure Olivié
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Voir le catalogue complet
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
            Une question sur l’animation d’une session&nbsp;?
          </h2>
          <p className="mt-3 text-ofc-ink-muted">
            Échangeons sur votre besoin et le formateur le plus adapté à votre équipe.
          </p>
          <Link
            href={LINKS.prendreRdv}
            data-cta="rdv"
            className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Réservez votre visio découverte gratuite
          </Link>
        </div>
      </Section>
    </div>
  );
}
