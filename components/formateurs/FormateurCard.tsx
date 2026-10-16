import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurFormationLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formateur: FormateurProfile;
  /** Limite les liens formations affichés (page hub = tous ; compact = 3). */
  maxFormations?: number;
  /** Désactiver les liens formations (évite doublons netlinking sur parcours). */
  showFormations?: boolean;
};

/** Carte formateur — portrait, intitulé, spécialités, parcours, formations. */
export function FormateurCard({
  formateur,
  maxFormations,
  showFormations = true,
}: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const formations = showFormations
    ? getFormateurFormationLinks(formateur)
    : [];
  const shown =
    typeof maxFormations === 'number'
      ? formations.slice(0, maxFormations)
      : formations;
  const remaining =
    typeof maxFormations === 'number'
      ? Math.max(0, formations.length - maxFormations)
      : 0;

  return (
    <article
      className={`${OFC_CARD} flex h-full flex-col p-6 sm:p-7 motion-safe:transition-[transform,box-shadow] motion-safe:duration-200`}
      aria-labelledby={`formateur-${formateur.id}-name`}
    >
      <div className="flex items-start gap-4">
        <FormateurPortraitView portrait={formateur.portrait} size="md" />
        <div className="min-w-0">
          <h3
            id={`formateur-${formateur.id}-name`}
            className="font-display text-base font-bold tracking-tight text-ofc-ink text-pretty md:text-lg"
          >
            {formateur.profileHref ? (
              <Link href={formateur.profileHref} className={OFC_LINK}>
                {fullName}
              </Link>
            ) : (
              fullName
            )}
          </h3>
          <p className="mt-1 text-sm font-medium leading-snug text-ofc-accent text-pretty">
            {formateur.intitule}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Spécialités — ${fullName}`}>
        {formateur.specialites.map((s) => (
          <li
            key={s}
            className="rounded-ofc-pill border border-ofc-border bg-ofc-canvas px-3 py-1 text-xs font-medium text-ofc-ink"
          >
            {s}
          </li>
        ))}
      </ul>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-ofc-ink-muted text-pretty">
        {formateur.parcours}
      </p>

      {formateur.animatesAllPublished && showFormations ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Formations animées
          </p>
          <p className="mt-3 text-sm text-ofc-ink-muted">
            Ensemble du catalogue IA BTP publié (présentiel Île-de-France).
          </p>
        </div>
      ) : null}

      {!formateur.animatesAllPublished && shown.length > 0 ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Formations animées
          </p>
          <ul className="mt-3 space-y-2">
            {shown.map((f) => (
              <li key={f.code}>
                <Link
                  href={f.href}
                  className={`${OFC_LINK} text-sm text-pretty`}
                >
                  {f.titre}
                  <span className="text-ofc-ink-muted"> · {f.duree}</span>
                </Link>
              </li>
            ))}
          </ul>
          {remaining > 0 ? (
            <p className="mt-2 text-xs text-ofc-ink-muted">
              + {remaining} autre{remaining > 1 ? 's' : ''} formation
              {remaining > 1 ? 's' : ''} au catalogue
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
