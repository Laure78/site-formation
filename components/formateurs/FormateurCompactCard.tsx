'use client';

import {
  formateurPrimarySpecialty,
  getFormateurHubProgrammeLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { formateurExperiencePeriode } from '@/lib/formateurs/hub-display';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

const MAX_TAGS = 3;

type Props = {
  formateur: FormateurProfile;
  onOpenProfil: () => void;
  portraitPriority?: boolean;
};

/** Carte compacte — grille hub ; le détail s’ouvre dans le panneau. */
export function FormateurCompactCard({
  formateur,
  onOpenProfil,
  portraitPriority = false,
}: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const periode = formateurExperiencePeriode(formateur);
  const formationsCount = getFormateurHubProgrammeLinks(formateur).length;
  const tags = formateur.specialites.slice(0, MAX_TAGS);
  const portraitAlt =
    formateur.portrait.kind === 'photo'
      ? formateur.portrait.alt
      : `Portrait de ${fullName}, ${formateurPrimarySpecialty(formateur)}`;

  return (
    <article
      className={cn(
        OFC_CARD,
        'formateurs-compact-card flex h-full flex-col p-4 motion-reduce:transition-none sm:p-5',
      )}
      aria-labelledby={`compact-${formateur.id}-name`}
    >
      <div className="flex min-w-0 flex-1 gap-3 sm:flex-col sm:gap-4">
        <div className="shrink-0">
          <FormateurPortraitView
            portrait={
              formateur.portrait.kind === 'photo'
                ? { ...formateur.portrait, alt: portraitAlt }
                : formateur.portrait
            }
            shape="square"
            priority={portraitPriority}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id={`compact-${formateur.id}-name`}
            className="font-display text-base font-bold leading-snug text-ofc-ink text-pretty"
          >
            {fullName}
          </h3>
          <p className="mt-0.5 text-sm font-medium leading-snug text-ofc-accent text-pretty">
            {formateurPrimarySpecialty(formateur)}
          </p>
          {periode ? (
            <p className="mt-1 text-sm text-ofc-ink-muted">{periode} d’expérience BTP</p>
          ) : null}
          {tags.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`Domaines — ${fullName}`}>
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-ofc-pill border border-ofc-border bg-ofc-canvas px-2.5 py-0.5 text-xs font-medium text-ofc-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-2 text-sm text-ofc-ink-muted">
            {formationsCount} formation{formationsCount > 1 ? 's' : ''} animée
            {formationsCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-ofc-border pt-4">
        <button
          type="button"
          onClick={onOpenProfil}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ofc-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent motion-reduce:transition-none"
          aria-label={`Voir le profil de ${fullName}`}
        >
          Voir le profil
        </button>
      </div>
    </article>
  );
}
