import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  formateurCatalogueTeaserPortraitAlt,
  formateurCatalogueTeaserSpecialty,
  getFormateursCatalogueTeaserProfiles,
} from '@/lib/formateurs/catalogue-formations-teaser';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsCatalogueFormateursTeaser() {
  const formateurs = getFormateursCatalogueTeaserProfiles();
  if (formateurs.length === 0) return null;

  return (
    <section
      id="catalogue-formateurs"
      className="scroll-mt-28 border-t border-[#E2E8F0] pt-10"
      aria-labelledby="catalogue-formateurs-title"
    >
      <h2 id="catalogue-formateurs-title" className="ofc-type-h2 text-ofc-ink">
        Les formateurs qui vous accompagnent
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
        Découvrez les intervenants et leurs domaines d&apos;expertise pour vos formations BTP.
      </p>

      <ul className="mt-6 grid list-none grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        {formateurs.map((formateur) => {
          const fullName = `${formateur.prenom} ${formateur.nom}`;
          const specialty = formateurCatalogueTeaserSpecialty(formateur);
          const portrait =
            formateur.portrait.kind === 'photo'
              ? {
                  ...formateur.portrait,
                  alt: formateurCatalogueTeaserPortraitAlt(formateur),
                }
              : formateur.portrait;

          return (
            <li key={formateur.id}>
              <article
                className="flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 sm:gap-4 sm:p-4"
                aria-labelledby={`catalogue-formateur-${formateur.id}-name`}
              >
                <FormateurPortraitView portrait={portrait} size="sm" shape="circle" />
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3
                    id={`catalogue-formateur-${formateur.id}-name`}
                    className="font-display text-base font-bold leading-snug text-ofc-ink text-pretty"
                  >
                    {fullName}
                  </h3>
                  <p className="mt-1 text-base leading-snug text-ofc-ink-muted text-pretty">
                    {specialty}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <p className="mt-6">
        <Link
          href={LINKS.formateurs}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
        >
          Découvrir nos formateurs
        </Link>
      </p>
    </section>
  );
}
