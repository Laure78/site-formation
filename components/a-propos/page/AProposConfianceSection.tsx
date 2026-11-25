import Link from 'next/link';
import { GraduationCap, Star } from 'lucide-react';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { getAProposEngagementsItems } from '@/lib/a-propos-page-config';
/** Engagements qualité — Qualiopi, NDA, satisfaction, accessibilité, équipe, financement. */
export function AProposConfianceSection() {
  const items = getAProposEngagementsItems();

  return (
    <section id="engagements-qualite" aria-labelledby="engagements-title" className="scroll-mt-24">
      <h2
        id="engagements-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Un organisme de formation certifié{' '}
        <span className="text-ofc-accent">Qualiopi</span>
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isQualiopi = item.label === 'Certification Qualiopi';
          const isNda = item.label.includes('déclaration');
          const isSatisfaction = item.label.includes('satisfaction');

          return (
            <li
              key={item.label}
              className="flex flex-col rounded-xl border border-ofc-border bg-white p-5 shadow-sm"
            >
              <div className="flex min-h-[3rem] items-center gap-3">
                {isQualiopi ? (
                  <QualiopiBadge size="default" className="max-w-[9rem]" />
                ) : isNda ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                    <GraduationCap className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : isSatisfaction ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                    <Star className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : null}
                <p className="font-semibold text-[#0F172A]">{item.label}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{item.detail}</p>
              {item.href ? (
                <p className="mt-3 text-sm">
                  <Link href={item.href} className="font-medium text-ofc-accent hover:underline">
                    En savoir plus
                  </Link>
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}