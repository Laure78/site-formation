import { Award, MapPin, Users, Wrench } from 'lucide-react';
import { getAProposFormateursPubliesCount } from '@/lib/a-propos-page-config';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const ICON_STROKE = 1.75;

/** Bandeau de réassurance — Qualiopi, équipe, pratique, présentiel IDF. */
export function AProposReperesBandeau() {
  const formateurCount = getAProposFormateursPubliesCount();

  const items = [
    {
      icon: Award,
      title: 'Qualiopi',
      detail: 'Organisme certifié',
    },
    {
      icon: Users,
      title: `${formateurCount} formateur${formateurCount > 1 ? 's' : ''}`,
      detail: 'Équipe spécialisée BTP',
    },
    {
      icon: Wrench,
      title: '70 % de pratique',
      detail: 'Pédagogie axée sur le terrain',
    },
    {
      icon: MapPin,
      title: 'Présentiel',
      detail: 'Île-de-France (75–95)',
    },
  ] as const;

  return (
    <section
      className="border-y border-ofc-border bg-[#F2F2F2] py-5 md:py-6"
      aria-label="Repères — Qualiopi, équipe, pédagogie, zone"
    >
      <div className={`${OFC_SECTION_INNER} px-4 sm:px-6 lg:px-8`}>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map(({ icon: Icon, title, detail }) => (
            <li key={detail} className="flex min-w-0 items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ofc-accent shadow-sm ring-1 ring-ofc-accent/15">
                <Icon className="h-5 w-5" strokeWidth={ICON_STROKE} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#101936] md:text-base">{title}</p>
                <p className="mt-0.5 text-xs leading-snug text-ofc-ink-muted md:text-sm">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}