import Link from 'next/link';
import { Check } from 'lucide-react';
import { CONTACT, formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import {
  REJOINDRE_EQUIPE_BADGES,
  REJOINDRE_EQUIPE_CTA,
  REJOINDRE_EQUIPE_INTRO,
  REJOINDRE_EQUIPE_NOUS_OFFRONS,
  REJOINDRE_EQUIPE_VOUS_ETES,
} from '@/lib/rejoindre-equipe-content';

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-[#20262E]">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Contenu historique /rejoindre-equipe — intégré au hub /nous-rejoindre. */
export function RejoindreEquipeOfferSection() {
  const mailto = formateurRecruitmentMailtoHref();

  return (
    <section
      id="rejoindre-equipe"
      className={`${ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
      aria-labelledby="rejoindre-equipe-heading"
    >
      <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
        <h2
          id="rejoindre-equipe-heading"
          className="font-display text-2xl font-bold text-[#101936] md:text-3xl"
        >
          Rejoignez l&apos;équipe OFC : formez les pros du BTP à l&apos;IA
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[#20262E]">
          <p>{REJOINDRE_EQUIPE_INTRO.lead}</p>
          <p className="text-[#555F6D]">{REJOINDRE_EQUIPE_INTRO.organisme}</p>
          <p className="text-[#555F6D]">{REJOINDRE_EQUIPE_INTRO.recherche}</p>
        </div>

        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {REJOINDRE_EQUIPE_BADGES.map((badge) => (
            <li
              key={badge.label}
              className="inline-flex min-h-11 items-center rounded-lg border border-[#DCE8FD] bg-[#DCE8FD]/40 px-4 py-2.5 text-sm font-semibold text-[#20262E]"
            >
              {badge.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="ofc-card h-full p-6 sm:p-7">
            <h3 className="font-display text-xl font-bold text-[#20262E] sm:text-2xl">Vous êtes…</h3>
            <CheckList items={REJOINDRE_EQUIPE_VOUS_ETES} />
          </article>
          <article className="ofc-card h-full p-6 sm:p-7">
            <h3 className="font-display text-xl font-bold text-[#20262E] sm:text-2xl">
              Nous vous offrons…
            </h3>
            <CheckList items={REJOINDRE_EQUIPE_NOUS_OFFRONS} />
          </article>
        </div>

        <div className="mt-10 rounded-2xl border border-[#377CF3]/15 bg-[#EAF3FF]/50 p-6 md:p-8">
          <p className="text-base leading-relaxed text-[#555F6D] md:text-lg">
            {REJOINDRE_EQUIPE_CTA.intro}{' '}
            <a
              href={mailto}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            , {REJOINDRE_EQUIPE_CTA.outro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.nousRejoindreCandidatureFormateur}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
            >
              Formulaire formateur indépendant
            </Link>
            <a
              href={mailto}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
              aria-label={`Postuler par email à ${RECRUITMENT.email}`}
            >
              Postuler par email
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
              aria-label={`Appeler OFC au ${CONTACT.phoneDisplay}`}
            >
              Appeler
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
