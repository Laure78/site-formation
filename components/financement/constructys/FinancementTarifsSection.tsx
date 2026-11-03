import Link from 'next/link';
import { FINANCEMENT_TARIFS_BLOC } from '@/lib/financement-constructys-page-config';
import { LINKS } from '@/lib/internal-links';
import { FC_CARD, FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

export function FinancementTarifsSection() {
  return (
    <section id="tarifs-ofc" aria-labelledby="tarifs-ofc-title" className={FC_SECTION}>
      <h2 id="tarifs-ofc-title" className={FC_TITLE}>
        Tarifs OFC (distincts des plafonds Constructys)
      </h2>
      <p className={FC_SUBTITLE}>
        Le tarif facturé par l’organisme, la participation estimée par Constructys et le reste à
        charge éventuel sont trois montants distincts. Formations catalogue facturées HT par
        participant.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className={`${FC_CARD} text-center sm:text-left`}>
          <h3 className="font-semibold text-[#081943]">Les bases de l&apos;IA (4 h)</h3>
          <p className="mt-2 text-2xl font-bold text-[#377CF3]">{FINANCEMENT_TARIFS_BLOC.bases}</p>
          <p className="mt-2 text-sm text-ofc-ink-muted">
            {FINANCEMENT_TARIFS_BLOC.duree} · 6 à 12 participants
          </p>
        </article>
        <article className={`${FC_CARD} text-center sm:text-left`}>
          <h3 className="font-semibold text-[#081943]">Sessions métier (4 h)</h3>
          <p className="mt-2 text-2xl font-bold text-[#377CF3]">{FINANCEMENT_TARIFS_BLOC.metier}</p>
          <p className="mt-2 text-sm text-ofc-ink-muted">
            {FINANCEMENT_TARIFS_BLOC.duree} · 6 à 12 participants
          </p>
        </article>
      </div>
      <p className="mt-4 text-center text-sm text-ofc-ink-muted sm:text-left">
        {FINANCEMENT_TARIFS_BLOC.tva} · {FINANCEMENT_TARIFS_BLOC.perimetre}
      </p>
      <p className="mt-3 text-center text-sm sm:text-left">
        <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline underline-offset-2">
          Voir le catalogue des formations IA BTP
        </Link>
      </p>
    </section>
  );
}
