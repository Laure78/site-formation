import Link from 'next/link';
import { Award, GraduationCap, Users } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { CatalogueTarifStrip } from '@/components/formations/CataloguePriceBadge';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { PERIMETRE_FORMATIONS_COURT, SESSION_DUREE_LIBELLE, libelleTarifsCarteCatalogue } from '@/lib/tarifs-sessions';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';
import { PHOTOS } from '@/lib/photos';

const QUICK_LINKS = [
  { href: '#catalogue-positionnement', label: 'Notre approche' },
  { href: '#catalogue-gammes', label: 'Choisir sa gamme' },
  { href: '#tarifs-formations-btp', label: 'Tarifs 7 h / 14 h' },
  { href: '#parcours-guide-heading', label: 'Parcours Qualiopi' },
  { href: '#formations-page-faq-heading', label: 'Questions fréquentes' },
] as const;

/**
 * Hero catalogue formations — texte SEO inchangé (H1 + paragraphe intro).
 */
export function FormationsHero({ catalogueCount = getCatalogueFormationsCount() }: { catalogueCount?: number }) {
  return (
    <MarketingLightHero
      eyebrow={`Catalogue IA BTP — organisme certifié Qualiopi`}
      title={CATALOGUE_POSITIONNEMENT.h1}
      titleId="formations-catalogue-hero-h1"
      description={
        <>
          {CATALOGUE_POSITIONNEMENT.promesseDocuments} {CATALOGUE_POSITIONNEMENT.promesseLivrables}{' '}
          Sessions en présentiel — {SESSION_DUREE_LIBELLE} · {PERIMETRE_FORMATIONS_COURT}. Intra{' '}
          {libelleTarifsCarteCatalogue(4).intra} ; inter {libelleTarifsCarteCatalogue(4).inter}
          <MentionTvaAsterisque /> — {FINANCEMENT_FORMULATION_COURTE}
        </>
      }
      stats={[
        { icon: GraduationCap, value: catalogueCount, label: 'parcours catalogue' },
        { icon: Users, value: formatNoteSatisfactionSur5(), label: 'Satisfaction (Qualiopi)' },
        { icon: Award, value: 'Qualiopi', label: 'organisme certifié' },
      ]}
      middle={
        <>
          <CatalogueTarifStrip className="max-w-3xl" />
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <CalendlyEmbed
              type="link"
              variant="primary"
              ctaPosition="hero"
              campaign="formations-hero"
              className="rounded-full px-5 py-2.5 text-sm md:px-6"
            />
            <Link
              href={LINKS.financement}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#377CF3] bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] md:px-6"
            >
              Voir le financement Constructys
            </Link>
            <FormationPlateformeConnexionButton
              variant="outline"
              label="Connexion plateforme"
              className="rounded-full px-5 py-2.5 md:px-6"
            />
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Award className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
              Organisme certifié Qualiopi
            </span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>Programmes PDF sur chaque fiche</span>
          </p>
        </>
      }
      quickLinks={QUICK_LINKS}
      heroVisual={PHOTOS.formationsCatalogueHero2026}
    />
  );
}
