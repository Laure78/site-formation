import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { FormationsCatalogueMaquetteHero } from '@/components/formations/catalogue-2027/FormationsCatalogueMaquetteHero';
import { FormationsCatalogueInfoBanner } from '@/components/formations/catalogue-2027/FormationsCatalogueInfoBanner';
import { FormationsIaDisponibles } from '@/components/formations/catalogue-2027/FormationsIaDisponibles';
import { FormationsCatalogueEntrepriseCompact } from '@/components/formations/catalogue-2027/FormationsCatalogueEntrepriseCompact';
import { FormationsCatalogueFormateursTeaser } from '@/components/formations/catalogue-2027/FormationsCatalogueFormateursTeaser';
import { FormationsCatalogueFinancementEncadre } from '@/components/formations/catalogue-2027/FormationsCatalogueFinancementEncadre';
import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { FormationsCatalogueFaqSection } from '@/components/formations/catalogue-2027/FormationsCatalogueFaqSection';
import { FormationsCatalogueMobileBar } from '@/components/formations/catalogue-2027/FormationsCatalogueMobileBar';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import { siteMetadataGeoOther } from '@/lib/site-config';
import { parseFormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const CATALOGUE_TITLE = 'Catalogue des formations IA BTP | Laure Olivié';
const CATALOGUE_DESCRIPTION =
  'Formations IA pour les PME du BTP : programmes, niveaux et durées en présentiel en Île-de-France. Réservez une visio découverte gratuite ou demandez un devis.';

export const revalidate = 3600;

type FormationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: FormationsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const niveauRaw = sp.niveau;
  const niveauParam = Array.isArray(niveauRaw) ? niveauRaw[0] : niveauRaw;
  const hasCatalogueFilters = Boolean(niveauParam?.trim());

  return {
    ...createPageMetadata({
      title: CATALOGUE_TITLE,
      titleAbsolute: CATALOGUE_TITLE,
      description: CATALOGUE_DESCRIPTION,
      descriptionFinal: true,
      path: '/formations',
      appendAuthorSuffix: false,
      openGraphTitle: CATALOGUE_TITLE,
      openGraphDescription: CATALOGUE_DESCRIPTION,
      keywords: [
        'formation IA pour le BTP',
        'catalogue formation IA BTP',
        'formation IA Île-de-France',
        'ChatGPT BTP',
        'Claude AI BTP',
      ],
      robots: hasCatalogueFilters ? { index: false, follow: true } : { index: true, follow: true },
      image: {
        url: PHOTOS.formationsCatalogueHero2026.src,
        width: PHOTOS.formationsCatalogueHero2026.width,
        height: PHOTOS.formationsCatalogueHero2026.height,
        alt: PHOTOS.formationsCatalogueHero2026.alt,
      },
    }),
    alternates: {
      canonical: `${baseUrl}/formations`,
      languages: { 'fr-FR': `${baseUrl}/formations` },
    },
    other: siteMetadataGeoOther(),
  };
}

export default async function FormationsPage({ searchParams }: FormationsPageProps) {
  const sp = await searchParams;
  const catalogueFilters = parseFormationsCataloguePageFilters(sp);

  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsCatalogueMaquetteHero />

      <div className="mx-auto max-w-[80rem] space-y-12 px-4 pb-16 pt-6 sm:px-6 md:space-y-14 lg:px-8 lg:pb-20">
        <FormationsCatalogueInfoBanner />
        <FormationsIaDisponibles filters={catalogueFilters} />
        <FormationsCatalogueEntrepriseCompact />
        <FormationsCatalogueFormateursTeaser />
        <FormationsCatalogueFinancementEncadre />
        <FormationsContact2027 formationHint={null} />
        <FormationsCatalogueFaqSection />
      </div>

      <FormationsCatalogueMobileBar />
    </>
  );
}
