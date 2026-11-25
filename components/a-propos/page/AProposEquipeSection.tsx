import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import {
  A_PROPOS_EQUIPE_INTRO,
  A_PROPOS_LAURE_EQUIPE_ROLE,
} from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';

/** Équipe pédagogique publiée — cartes hub, sans liste formations. */
export function AProposEquipeSection() {
  const formateurs = getFormateursHubProfiles();

  return (
    <section id="equipe" className="scroll-mt-24" aria-labelledby="equipe-title">
      <h2
        id="equipe-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Une équipe de formateurs aux{' '}
        <span className="text-ofc-accent">expertises complémentaires</span>
      </h2>
      <div className="mt-4 max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
        {A_PROPOS_EQUIPE_INTRO.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 lg:gap-6">
        {formateurs.map((formateur, index) => (
          <li key={formateur.id} className="min-w-0">
            {formateur.id === 'laure-olivie' ? (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ofc-accent">
                {A_PROPOS_LAURE_EQUIPE_ROLE}
              </p>
            ) : null}
            <FormateurCard
              formateur={formateur}
              showFormations={false}
              portraitPriority={index === 0}
            />
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link
          href={LINKS.formateurs}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-ofc-accent hover:underline"
        >
          Découvrir tous nos formateurs
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </p>
    </section>
  );
}