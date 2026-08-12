import Link from 'next/link';
import { Award, GraduationCap, LogIn, Star, Users } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { CatalogueTarifStrip } from '@/components/formations/CataloguePriceBadge';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { CATALOGUE_FORMATIONS_COUNT } from '@/lib/formations-catalogue-display';
import { PERIMETRE_FORMATIONS_COURT, formatTarifHt, TARIF_SESSION_FORFAIT_HT } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';

const QUICK_LINKS = [
  { href: '#parcours-guide-heading', label: 'Choisir sa formation' },
  { href: '#comparatif-formations-heading', label: 'Comparer les parcours' },
  { href: '#formations-page-faq-heading', label: 'Questions fréquentes' },
] as const;

/**
 * Hero catalogue formations — texte SEO inchangé (H1 + paragraphe intro).
 */
export function FormationsHero() {
  return (
    <MarketingLightHero
      eyebrow={`Catalogue 2026 · ${CATALOGUE_FORMATIONS_COUNT} formations Qualiopi`}
      title={`Catalogue formation IA pour le BTP : ${CATALOGUE_FORMATIONS_COUNT} formations Qualiopi de 4 h (niveau 1 et niveau 2), programmes PDF`}
      titleId="formations-catalogue-hero-h1"
      description={
        <>
          Sessions Qualiopi de 4 h en présentiel — {PERIMETRE_FORMATIONS_COURT}. Devis, appels d&apos;offres,
          conduite de travaux, Claude AI : forfait unique {formatTarifHt(TARIF_SESSION_FORFAIT_HT)}&nbsp;€&nbsp;HT
          par session, financement possible selon éligibilité (Constructys).
        </>
      }
      stats={[
        { icon: GraduationCap, value: CATALOGUE_FORMATIONS_COUNT, label: 'formations Qualiopi' },
        { icon: Users, value: formatProfessionalsTrainedCount(), label: 'pros formés' },
        { icon: Star, value: SOCIAL_PROOF.AVERAGE_RATING, label: 'satisfaction clients' },
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
            <Link
              href={LINKS.authConnexion}
              title="Connexion espace apprenant OFC"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3] md:px-6"
            >
              <LogIn className="h-4 w-4 shrink-0" aria-hidden />
              Connexion plateforme
            </Link>
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Award className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
              Qualiopi certifié
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
