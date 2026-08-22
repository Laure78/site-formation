import Link from 'next/link';
import { BookOpen, Cpu, Users } from 'lucide-react';
import {
  A_PROPOS_OFFRE_CAS_USAGE,
  A_PROPOS_OFFRE_CLIENTS,
  A_PROPOS_OFFRE_FORMATIONS,
  A_PROPOS_OFFRE_OUTILS,
} from '@/lib/a-propos-eeat-content';
import { LINKS } from '@/lib/internal-links';
import { LAURE_OLIVIE_PROMPTS_DELIVERY } from '@/lib/laure-olivie-profile';

function OffreList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[15px] leading-relaxed text-[#334155]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Programmes, outils IA et cas d'usage — alignés CV Laure Olivié (juin 2026). */
export function AProposOffreSection() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          <h3 className="font-display text-lg font-bold text-[#0F172A]">Programmes OFC</h3>
        </div>
        <OffreList items={A_PROPOS_OFFRE_FORMATIONS} />
        <p className="mt-4 text-sm text-[#64748B]">{LAURE_OLIVIE_PROMPTS_DELIVERY}</p>
        <Link href={LINKS.formations} className="mt-4 inline-flex text-sm font-medium text-[#377CF3] hover:underline">
          Voir le catalogue formations →
        </Link>
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          <h3 className="font-display text-lg font-bold text-[#0F172A]">Outils enseignés</h3>
        </div>
        <OffreList items={A_PROPOS_OFFRE_OUTILS} />
        <p className="mt-4 text-sm font-medium text-[#0F172A]">Cas d&apos;usage BTP</p>
        <OffreList items={A_PROPOS_OFFRE_CAS_USAGE} />
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] bg-[#EFF6FF]/60 p-6 md:col-span-2">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          <h3 className="font-display text-lg font-bold text-[#0F172A]">Clients &amp; financement</h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155]">
          {A_PROPOS_OFFRE_CLIENTS.join(' · ')} — financement{' '}
          <Link href={LINKS.financement} className="font-medium text-[#377CF3] hover:underline">
            OPCO Constructys
          </Link>{' '}
          possible selon éligibilité.
        </p>
      </div>
    </section>
  );
}
