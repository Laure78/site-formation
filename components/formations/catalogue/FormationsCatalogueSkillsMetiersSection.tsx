import Link from 'next/link';
import {
  SKILLS_METIERS_BENEFICES,
  SKILLS_METIERS_CTA_FORMATION_ANCHOR,
  SKILLS_METIERS_GROUPES,
  SKILLS_METIERS_INTRO,
} from '@/lib/formations-catalogue-skills-metiers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/**
 * Exemples pédagogiques de Skills métiers — envie de formation, sans téléchargement.
 * CTA formation → ancre carte NIV-04 (Maîtriser Claude AI / Skills).
 */
export function FormationsCatalogueSkillsMetiersSection() {
  return (
    <section
      id="skills-metiers-btp"
      className="mt-16 scroll-mt-28"
      aria-labelledby="catalogue-skills-metiers"
    >
      <h2
        id="catalogue-skills-metiers"
        className="font-display text-2xl font-bold text-ofc-ink md:text-2xl"
      >
        Créez vos Skills métiers BTP
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
        {SKILLS_METIERS_INTRO}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-sm">
        Exemples pédagogiques illustrés en formation — à adapter à vos méthodes et à valider
        avant usage professionnel.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {SKILLS_METIERS_GROUPES.map((groupe) => (
          <div
            key={groupe.id}
            className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6"
          >
            <h3 className="font-display text-base font-bold text-ofc-ink md:text-lg">
              {groupe.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {groupe.examples.map((exemple) => (
                <li key={exemple.title}>
                  <p className="text-sm font-semibold text-slate-900">{exemple.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                    {exemple.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-2xl border border-[#377CF3]/25 bg-[#EFF6FF] p-5 md:p-6"
        role="note"
      >
        <h3 className="font-display text-base font-bold text-ofc-ink md:text-lg">
          {SKILLS_METIERS_BENEFICES.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
          {SKILLS_METIERS_BENEFICES.text}
        </p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-slate-600">
        Formations en présentiel en Île-de-France — création et organisation de Skills dans le
        parcours Maîtriser Claude AI.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={SKILLS_METIERS_CTA_FORMATION_ANCHOR}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-sm`}
        >
          Apprendre à créer mes Skills
        </a>
        <Link
          href={LINKS.prendreRdv}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-sm`}
        >
          Former mon équipe
        </Link>
      </div>
    </section>
  );
}
