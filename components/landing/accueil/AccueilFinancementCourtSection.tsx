import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { RevealShell } from '@/components/motion/RevealShell';

/** Encadré financement — réponse rapide « combien / qui paie » avant la section formateurs. */
export function AccueilFinancementCourtSection() {
  return (
    <Section
      id="accueil-financement"
      tone="white"
      size="compact"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-financement-court-title"
    >
      <RevealShell>
      <div className={`${OFC_CARD} border-0 bg-[#F2F2F2] px-5 py-8 shadow-none sm:px-8 sm:py-10`}>
        <h2
          id="accueil-financement-court-title"
          className="font-display text-xl font-bold tracking-tight text-ofc-ink md:text-2xl"
        >
          Combien ça coûte et qui paie ?
        </h2>
        <ul className="mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
          <li>
            <strong className="font-semibold text-ofc-ink">Inter-entreprises</strong> — tarif par
            participant selon la formation (détail sur chaque fiche programme).
          </li>
          <li>
            <strong className="font-semibold text-ofc-ink">Intra-entreprise</strong> — devis selon
            effectif, durée et objectifs (présentiel en Île-de-France).
          </li>
          <li>
            <strong className="font-semibold text-ofc-ink">Financement</strong> — prise en charge
            OPCO/Constructys selon éligibilité, plafonds et accord du financeur. La certification
            Qualiopi ne garantit pas la prise en charge.
          </li>
        </ul>
        <p className="mt-6">
          <Link
            href={LINKS.financement}
            className={`${OFC_LINK} text-sm font-semibold md:text-base`}
          >
            Comprendre le financement Constructys et OPCO
          </Link>
        </p>
      </div>
      </RevealShell>
    </Section>
  );
}
