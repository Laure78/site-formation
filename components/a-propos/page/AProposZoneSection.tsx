import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { A_PROPOS_MODALITES_LIST, A_PROPOS_ZONE_TEXTE } from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';

export function AProposZoneSection() {
  return (
    <section id="zone-intervention" className="scroll-mt-24" aria-labelledby="zone-title">
      <h2
        id="zone-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Des formations IA BTP en présentiel en{' '}
        <span className="text-ofc-accent">Île-de-France</span>
      </h2>
      <div className="mt-4 max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
        {A_PROPOS_ZONE_TEXTE.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-[#0F172A]">Modalités</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ofc-ink-muted">
        {A_PROPOS_MODALITES_LIST.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href={LINKS.formationIaIntraEntrepriseBtp}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-ofc-accent hover:underline"
        >
          Organiser une formation pour votre équipe
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </p>
    </section>
  );
}