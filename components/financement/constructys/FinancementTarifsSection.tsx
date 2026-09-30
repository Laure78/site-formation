import Link from 'next/link';
import { FINANCEMENT_TARIFS_BLOC } from '@/lib/financement-constructys-page-config';
import { LINKS } from '@/lib/internal-links';

export function FinancementTarifsSection() {
  return (
    <section aria-labelledby="tarifs-ofc-title" className="scroll-mt-24">
      <h2
        id="tarifs-ofc-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Tarifs OFC (distincts des plafonds Constructys)
      </h2>
      <p className="mt-3 text-sm text-[#64748B]">
        Le tarif facturé par OFC, la participation estimée par Constructys et le reste à charge
        éventuel sont trois montants distincts. Les formations catalogue sont facturées HT par
        participant.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-[#0F172A]">Les bases de l&apos;IA (4 h)</h3>
          <p className="mt-2 text-2xl font-bold text-[#377CF3]">{FINANCEMENT_TARIFS_BLOC.bases}</p>
          <p className="mt-2 text-sm text-[#64748B]">
            {FINANCEMENT_TARIFS_BLOC.duree} · 6 à 12 participants
          </p>
        </article>
        <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-[#0F172A]">Sessions métier (4 h)</h3>
          <p className="mt-2 text-2xl font-bold text-[#377CF3]">{FINANCEMENT_TARIFS_BLOC.metier}</p>
          <p className="mt-2 text-sm text-[#64748B]">
            {FINANCEMENT_TARIFS_BLOC.duree} · 6 à 12 participants
          </p>
        </article>
      </div>
      <p className="mt-4 text-sm text-[#64748B]">
        {FINANCEMENT_TARIFS_BLOC.tva} · {FINANCEMENT_TARIFS_BLOC.perimetre}
      </p>
      <p className="mt-3 text-sm">
        <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline">
          Voir le catalogue des formations IA BTP
        </Link>
      </p>
    </section>
  );
}
