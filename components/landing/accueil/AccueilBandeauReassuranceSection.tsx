import { Award, Coins, MapPin, Star } from 'lucide-react';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';

const ITEMS = [
  {
    icon: Award,
    title: 'Certifié Qualiopi',
    detail: 'Action de formation',
  },
  {
    icon: MapPin,
    title: 'Présentiel',
    detail: 'Île-de-France',
  },
  {
    icon: Coins,
    title: 'Financement OPCO',
    detail: 'Selon éligibilité',
  },
  {
    icon: Star,
    title: 'Satisfaction',
    detail: `${formatNoteSatisfactionSur5()} de satisfaction`,
  },
] as const;

/** Bandeau bleu clair — 4 preuves sous le hero. */
export function AccueilBandeauReassuranceSection() {
  return (
    <section
      className="border-y border-[#377CF3]/10 bg-[#EAF3FF] py-6 md:py-7"
      aria-label="Réassurance — Qualiopi, présentiel, financement, satisfaction"
    >
      <div className={OFC_SECTION_INNER}>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {ITEMS.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex min-w-0 items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#377CF3] shadow-sm ring-1 ring-[#377CF3]/15">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#101936] md:text-base">{title}</p>
                <p className="mt-0.5 text-xs leading-snug text-ofc-ink-muted md:text-sm">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ofc-ink-muted">
          <Link href={LINKS.indicateursResultats} className="font-medium text-[#377CF3] hover:underline">
            Voir les indicateurs de résultats
          </Link>
        </p>
      </div>
    </section>
  );
}
