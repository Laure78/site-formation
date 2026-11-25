import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { A_PROPOS_DOMAINES_FORMATION } from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';

/** Six domaines — liens catalogue vérifiés. */
export function AProposDomainesSection() {
  return (
    <section id="domaines-formation" className="scroll-mt-24" aria-labelledby="domaines-title">
      <h2
        id="domaines-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Des formations conçues pour les{' '}
        <span className="text-ofc-accent">métiers du BTP</span>
      </h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {A_PROPOS_DOMAINES_FORMATION.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="flex h-full min-h-[44px] flex-col rounded-xl border border-ofc-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none"
            >
              <h3 className="font-semibold text-[#0F172A]">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">
                {card.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ofc-accent">
                Voir le programme
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link
          href={LINKS.formations}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-ofc-accent hover:underline"
        >
          Découvrir notre catalogue
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </p>
    </section>
  );
}