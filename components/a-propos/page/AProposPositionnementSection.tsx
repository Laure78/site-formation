import Link from 'next/link';
import {
  A_PROPOS_MODALITES_RESUME,
  A_PROPOS_ORGANISME_INTRO,
  A_PROPOS_POSITIONNEMENT,
} from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

export function AProposPositionnementSection() {
  const [parcours, pratique] = A_PROPOS_POSITIONNEMENT;

  return (
    <section
      aria-labelledby="organisme-title"
      className="rounded-2xl border border-ofc-border bg-white p-5 shadow-sm sm:p-7 lg:p-8"
    >
      <h2 id="organisme-title" className={OFC_TYPE_H2}>
        OFC Création d&apos;Entreprise — organisme de formation IA BTP
        <span className="mt-3 block h-1 w-14 max-w-[4rem] rounded-full bg-[#377CF3]" aria-hidden />
      </h2>
      <p className="mt-6 text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:text-base">
        {A_PROPOS_ORGANISME_INTRO}
      </p>
      <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:text-base">
        {A_PROPOS_MODALITES_RESUME}{' '}
        <Link href={LINKS.formations} className={`${OFC_LINK} font-medium`}>
          Parcourir le catalogue
        </Link>
        {' · '}
        <Link href={LINKS.formateurs} className={`${OFC_LINK} font-medium`}>
          Rencontrer les formateurs
        </Link>
        .
      </p>

      <h2 id="positionnement-title" className={`${OFC_TYPE_H2} mt-10`}>
        L’IA appliquée aux réalités du BTP
        <span
          className="mt-3 block h-1 w-14 max-w-[4rem] rounded-full bg-[#377CF3]"
          aria-hidden
        />
      </h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-8 lg:items-start">
        <p className="text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:text-base">{parcours}</p>
        <p className="rounded-xl border border-ofc-border bg-[#F8FAFC]/90 p-4 text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:p-5 sm:text-base lg:border-l-[3px] lg:border-l-[#377CF3] lg:pl-5">
          {pratique}
        </p>
      </div>
    </section>
  );
}
