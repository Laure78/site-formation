import Link from 'next/link';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { LINKS } from '@/lib/internal-links';

/** Encart recrutement formateurs indépendants — page /formateurs. */
export function FormateursRecruitmentEncart() {
  return (
    <aside
      className="formateurs-recruitment-encart rounded-xl border border-[#377CF3]/25 bg-[#F2F8FF] p-5 sm:p-6"
      aria-labelledby="formateurs-recruitment-encart-title"
    >
      <h2
        id="formateurs-recruitment-encart-title"
        className="font-display text-lg font-bold text-ofc-ink md:text-xl"
      >
        Vous connaissez le BTP et utilisez l’IA dans votre métier ?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
        Nous recherchons des formateurs indépendants pour le catalogue 2027, en présentiel en
        Île-de-France.
      </p>
      <Link
        href={LINKS.nousRejoindre}
        className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
      >
        Découvrir les missions
      </Link>
    </aside>
  );
}
