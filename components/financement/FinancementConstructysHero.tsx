import Link from 'next/link';
import { CalendarClock, Star, Users } from 'lucide-react';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { SOCIAL_PROOF, formatPersonnesFormeesCount, getStatsFreshnessLabel } from '@/lib/constants';

const H1 =
  'Financer une formation IA pour le BTP avec Constructys en 2026 — guide OPCO, plafonds et dossier eGestion';

const QUICK_LINKS = [
  { href: '#tldr', label: 'En résumé' },
  { href: '#etapes', label: 'Les étapes' },
  { href: '#faq', label: 'FAQ' },
] as const;

export function FinancementConstructysHero() {
  const heroVisual = PHOTOS.financementConstructysHero2026;
  const statsFreshness = getStatsFreshnessLabel();

  return (
    <MarketingLightHero
      eyebrow="Constructys · OPCO BTP"
      title={H1}
      titleId="financement-hero-title"
      description={
        <>
          <p>
            Ce guide vous aide à comprendre les règles Constructys sans jargon administratif — que vous visiez une{' '}
            <Link href={LINKS.chatgptArtisans} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
              formation IA pour PME BTP
            </Link>
            , l&apos;
            <Link href={LINKS.iaDevis} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
              IA pour les devis bâtiment
            </Link>{' '}
            ou un{' '}
            <Link href={LINKS.formationAO} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
              programme IA appels d&apos;offres
            </Link>
            .
          </p>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Mis à jour le 1<sup>er</sup> juin 2026 · Temps de lecture : 7 min
          </p>
        </>
      }
      stats={[
        {
          icon: Users,
          value: formatPersonnesFormeesCount(),
          label: `pros formés · ${statsFreshness}`,
        },
        {
          icon: Star,
          value: SOCIAL_PROOF.AVERAGE_RATING,
          label: `note moyenne · ${statsFreshness}`,
        },
        { icon: CalendarClock, value: 'J-15', label: 'délai minimum eGestion' },
      ]}
      middle={
        <>
          <ul className="flex flex-wrap gap-2" aria-label="Thématiques de la page">
            {['Constructys', 'OPCO', 'Qualiopi', 'BTP', 'eGestion', '2026'].map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                  #{tag}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href={buildSiteCalendlyCtaUrl('financement-constructys-hero')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-6px_rgba(55,124,243,0.45)] transition hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] md:px-6"
            >
              Réservez votre visio découverte gratuite
            </a>
            <Link
              href={LINKS.formations}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#377CF3] bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] md:px-6"
            >
              Voir le programme
            </Link>
          </div>
        </>
      }
      quickLinks={QUICK_LINKS}
      heroVisual={{
        src: heroVisual.src,
        alt: heroVisual.alt,
        title: heroVisual.title,
        width: heroVisual.width,
        height: heroVisual.height,
      }}
    />
  );
}

export { H1 as FINANCEMENT_CONSTRUCTYS_H1 };
