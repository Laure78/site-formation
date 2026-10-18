'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  formateurPrimarySpecialty,
  getFormateurHubProgrammeLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { cn } from '@/lib/cn';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

const PROGRAMMES_VISIBLE_INIT = 2;

type FormateurIntroCardProps = {
  formateur: FormateurProfile;
  portraitPriority?: boolean;
};

function FormateurIntroCard({ formateur, portraitPriority = false }: FormateurIntroCardProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const profileAnchor = `${LINKS.formateurs}#${formateur.slug}`;
  const programmes = getFormateurHubProgrammeLinks(formateur);
  const hiddenCount = Math.max(0, programmes.length - PROGRAMMES_VISIBLE_INIT);
  const visibleProgrammes = expanded
    ? programmes
    : programmes.slice(0, PROGRAMMES_VISIBLE_INIT);

  const isDemo = formateur.status === 'demo';

  return (
    <article
      className={cn(OFC_CARD, 'formateurs-intro-card flex min-w-0 flex-row gap-3 p-4 md:flex-col md:gap-4 md:p-5')}
      aria-labelledby={`${listId}-name`}
    >
      <div className="shrink-0 md:mx-0">
        <FormateurPortraitView
          portrait={formateur.portrait}
          size="xs"
          shape="circle"
          priority={portraitPriority}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          id={`${listId}-name`}
          className="font-display text-base font-bold leading-snug text-ofc-ink text-pretty"
        >
          {fullName}
        </h3>
        <p className="mt-0.5 text-sm font-medium leading-snug text-ofc-accent text-pretty">
          {formateurPrimarySpecialty(formateur)}
        </p>

        {isDemo ? (
          <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs leading-snug text-slate-700">
            Profil indicatif — intervenant à confirmer.
          </p>
        ) : null}

        {formateur.profileDraft && !isDemo ? (
          <p className="mt-2 rounded-lg border border-amber-200/80 bg-amber-50 px-2.5 py-2 text-xs leading-snug text-amber-950">
            Fiche en cours de validation.
          </p>
        ) : null}

        {programmes.length > 0 ? (
          <div className="mt-3 border-t border-ofc-border pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
              Formations animées
            </p>
            <ul className="mt-2 space-y-2">
              {visibleProgrammes.map((p) => (
                <li key={p.key} className="min-w-0 text-sm leading-snug">
                  <Link
                    href={p.href}
                    className={`${OFC_LINK} font-medium text-ofc-ink text-pretty`}
                  >
                    {p.titre}
                  </Link>
                  {p.meta ? (
                    <p className="mt-0.5 text-xs text-ofc-ink-muted">{p.meta}</p>
                  ) : null}
                </li>
              ))}
            </ul>
            {hiddenCount > 0 && !expanded ? (
              <button
                type="button"
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-ofc-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                aria-expanded={false}
                onClick={() => setExpanded(true)}
              >
                Voir les {hiddenCount} autre{hiddenCount > 1 ? 's' : ''} formation
                {hiddenCount > 1 ? 's' : ''}
              </button>
            ) : null}
            {hiddenCount > 0 && expanded ? (
              <button
                type="button"
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-ofc-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                aria-expanded
                onClick={() => setExpanded(false)}
              >
                Réduire la liste
              </button>
            ) : null}
          </div>
        ) : null}

        <p className="mt-3">
          <Link
            href={profileAnchor}
            className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm font-semibold`}
          >
            Voir le profil
          </Link>
        </p>
      </div>
    </article>
  );
}

type FormateursIntroBandProps = {
  formateurs: readonly FormateurProfile[];
};

/** Bandeau d’aperçu — sous l’intro hero, avant les fiches détaillées. */
export function FormateursIntroBand({ formateurs }: FormateursIntroBandProps) {
  return (
    <div
      id="formateurs-apercu"
      className="scroll-mt-[var(--site-header-height)]"
      aria-labelledby="formateurs-apercu-title"
    >
      <h2 id="formateurs-apercu-title" className="sr-only">
        Aperçu des formateurs
      </h2>
      <ul className="grid list-none grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {formateurs.map((f, index) => (
          <li key={f.id} className="min-w-0">
            <FormateurIntroCard formateur={f} portraitPriority={index < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
