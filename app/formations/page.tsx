import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { FormationsCatalogueMaquetteHero } from '@/components/formations/catalogue-2027/FormationsCatalogueMaquetteHero';
import { FormationsCatalogueFormatsBar } from '@/components/formations/catalogue-2027/FormationsCatalogueFormatsBar';
import { FormationsIaDisponibles } from '@/components/formations/catalogue-2027/FormationsIaDisponibles';
import { FormationsCatalogueMenuiserieBanner } from '@/components/formations/catalogue-2027/FormationsCatalogueMenuiserieBanner';
import { FormationsCatalogueMethodePedagogique } from '@/components/formations/catalogue-2027/FormationsCatalogueMethodePedagogique';
import { FormationsCatalogueModalitesBar } from '@/components/formations/catalogue-2027/FormationsCatalogueModalitesBar';
import { FormationsCatalogueEntrepriseCompact } from '@/components/formations/catalogue-2027/FormationsCatalogueEntrepriseCompact';
import { FormationsCatalogueFormateursTeaser } from '@/components/formations/catalogue-2027/FormationsCatalogueFormateursTeaser';
import { FormationsCatalogueFinancementEncadre } from '@/components/formations/catalogue-2027/FormationsCatalogueFinancementEncadre';
import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { FormationsCatalogueConversionRdv } from '@/components/formations/catalogue-2027/FormationsCatalogueConversionRdv';
import { FormationsCatalogueFaqSection } from '@/components/formations/catalogue-2027/FormationsCatalogueFaqSection';
import { FormationsCatalogueMobileBar } from '@/components/formations/catalogue-2027/FormationsCatalogueMobileBar';
import { FormationsCatalogueTerrainBar } from '@/components/formations/catalogue-2027/FormationsCatalogueTerrainBar';
import { FormationsCatalogueBottomCta } from '@/components/formations/catalogue-2027/FormationsCatalogueBottomCta';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import { parseFormationsCataloguePageFilters } from '@/lib/catalogue-filter-url';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const CATALOGUE_TITLE = 'Catalogue des formations IA BTP | Laure Olivié';
const CATALOGUE_DESCRIPTION =
  'Formations IA pour les professionnels du BTP : devis, appels d’offres, conduite de travaux. Programmes en présentiel en Île-de-France. Réservez une visio découverte gratuite ou demandez un devis.';

export const revalidate = 3600;

type FormationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function hasCatalogueFilterParams(
  sp: Record<string, string | string[] | undefined>,
): boolean {
  const filters = parseFormationsCataloguePageFilters(sp);
  if (filters.niveau || filters.segment) return true;
  const get = (key: string): string | undefined => {
    const raw = sp[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };
  /** Variantes d’URL historiques — ne pas indexer les variantes filtrées. */
  return Boolean(get('duree') || get('thematique') || get('domaine') || get('metier') || get('q'));
}

export async function generateMetadata({ searchParams }: FormationsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const hasCatalogueFilters = hasCatalogueFilterParams(sp);

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
  };
}

export default async function FormationsPage({ searchParams }: FormationsPageProps) {
  const sp = await searchParams;
  const catalogueFilters = parseFormationsCataloguePageFilters(sp);

  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsCatalogueMaquetteHero />

      <div className="mx-auto max-w-[80rem] space-y-12 px-4 pb-10 pt-8 sm:px-6 md:space-y-14 lg:px-8 lg:pb-12">
        <FormationsCatalogueFormatsBar />
        <FormationsIaDisponibles filters={catalogueFilters} />
        <FormationsCatalogueTerrainBar />

        <div className="space-y-10 rounded-2xl border border-dashed border-[#E2E8F0] bg-[#FAFBFC] p-5 sm:p-6 md:space-y-12 md:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Compléments d’information
          </p>
          <FormationsCatalogueMenuiserieBanner />
          <FormationsCatalogueMethodePedagogique />
          <FormationsCatalogueModalitesBar />
          <FormationsCatalogueEntrepriseCompact />
          <FormationsCatalogueFormateursTeaser />
          <FormationsCatalogueFinancementEncadre />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-10">
            <FormationsCatalogueConversionRdv />
            <FormationsCatalogueFaqSection />
          </div>
        </div>

        <FormationsContact2027 formationHint={null} />
      </div>

      <FormationsCatalogueBottomCta />

      <FormationsCatalogueMobileBar />
    </>
  );
}
