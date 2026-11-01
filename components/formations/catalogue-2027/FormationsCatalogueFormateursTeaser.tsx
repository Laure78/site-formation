import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  formateurCatalogueTeaserPortraitAlt,
  formateurCatalogueTeaserSpecialty,
  getFormateursCatalogueTeaserProfiles,
} from '@/lib/formateurs/catalogue-formations-teaser';
import { LINKS } from '@/lib/internal-links';

const TEASER_LIMIT = 4;

export function FormationsCatalogueFormateursTeaser() {
  const formateurs = getFormateursCatalogueTeaserProfiles().slice(0, TEASER_LIMIT);
  if (formateurs.length === 0) return null;

  return (
    <section
      id="catalogue-formateurs"
      className="scroll-mt-28"
      aria-labelledby="catalogue-formateurs-title"
    >
      <div className="text-center">
        <h2 id="catalogue-formateurs-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          Des formateurs qui connaissent les métiers du BTP
        </h2>
        <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Des expertises métier pour accompagner les professionnels du bâtiment et des travaux publics.
        </p>
      </div>

      <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)] motion-reduce:transition-none"
                aria-labelledby={`catalogue-formateur-${formateur.id}-name`}
              >
                <FormateurPortraitView portrait={portrait} size="md" shape="square" />
                <h3
                  id={`catalogue-formateur-${formateur.id}-name`}
                  className="mt-3 font-display text-base font-bold leading-snug text-[#101936]"
                >
                  {fullName}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-snug text-slate-600">{specialty}</p>
              </article>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-center">
        <Link
          href={LINKS.formateurs}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#101936] shadow-sm transition-colors hover:border-[#377CF3]/40 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Découvrir tous nos formateurs
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </section>
  );
}
