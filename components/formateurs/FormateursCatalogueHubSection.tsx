import { FormateurCompactCardServer } from '@/components/formateurs/FormateurCompactCardServer';
import { FormateursCatalogueHubClient } from '@/components/formateurs/FormateursCatalogueHubClient';
import { FormateursLaureHeroServer } from '@/components/formateurs/FormateursLaureHeroServer';
import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEUR_LAURE_ID,
  type FormateursFiltreId,
} from '@/lib/formateurs/hub-filtres';
import { formateurMatchesHubFiltre } from '@/lib/formateurs/hub-display';
import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type Props = {
  formateurs: readonly FormateurProfile[];
  filtreId: FormateursFiltreId;
};

function formatFormateursHubCount(count: number): string {
  if (count === 0) return 'Aucun formateur affiché';
  if (count === 1) return '1 formateur affiché';
  return `${count} formateurs affichés`;
}

/** Hub formateurs — grille SSR ; filtres et dialog en îlot client. */
export function FormateursCatalogueHubSection({ formateurs, filtreId }: Props) {
  const laure = formateurs.find((f) => f.id === FORMATEUR_LAURE_ID);
  const equipe = formateurs.filter((f) => f.id !== FORMATEUR_LAURE_ID);
  const filtered = equipe.filter((f) => formateurMatchesHubFiltre(f, filtreId));
  const countLabel = formatFormateursHubCount(filtered.length);

  return (
    <div id="formateurs-profiles" className="scroll-mt-[var(--site-header-height)]">
      {laure ? <FormateursLaureHeroServer laure={laure} /> : null}

      <div className="formateurs-hub-profiles__head mt-10">
        <h2 className={`${OFC_TYPE_H3} text-ofc-ink`}>Intervenants métiers</h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          Filtrez par domaine pour repérer qui anime quoi — ouvrez un profil pour le programme
          détaillé.
        </p>
        <FormateursCatalogueHubClient
          key={filtreId}
          formateurs={formateurs}
          initialFiltreId={filtreId}
        />
      </div>

      <p className="mt-4 text-sm text-ofc-ink-muted" aria-live="polite">
        {countLabel}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-base text-ofc-ink-muted">
          Aucun formateur pour ce domaine. Choisissez un autre filtre ou{' '}
          <a
            href="/formateurs#formateurs-profiles"
            className="font-semibold text-ofc-accent underline-offset-2 hover:underline"
          >
            afficher tous
          </a>
          .
        </p>
      ) : (
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-5">
          {filtered.map((f, index) => (
            <li
              key={f.id}
              id={f.slug}
              className="scroll-mt-[var(--site-header-height)] min-w-0"
            >
              <FormateurCompactCardServer formateur={f} portraitPriority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
