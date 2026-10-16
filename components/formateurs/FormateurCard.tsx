import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurFormationLinks,
  getFormateurModuleLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formateur: FormateurProfile;
  /** Limite les liens formations affichés (page hub = tous ; compact = 3). */
  maxFormations?: number;
  /** Désactiver les liens formations (évite doublons netlinking sur parcours). */
  showFormations?: boolean;
  /** Carte hub catalogue 2027 (parcours, modules, boutons). */
  variant?: 'default' | 'catalogue-hub';
};

/** Carte formateur — portrait, intitulé, spécialités, parcours, formations. */
export function FormateurCard({
  formateur,
  maxFormations,
  showFormations = true,
  variant = 'default',
}: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const moduleLinks =
    showFormations && (formateur.moduleCodes?.length ?? 0) > 0
      ? getFormateurModuleLinks(formateur)
      : [];
  const nivLinks =
    showFormations && moduleLinks.length === 0
      ? getFormateurFormationLinks(formateur)
      : [];
  const shownNiv =
    typeof maxFormations === 'number' ? nivLinks.slice(0, maxFormations) : nivLinks;
  const remainingNiv =
    typeof maxFormations === 'number'
      ? Math.max(0, nivLinks.length - maxFormations)
      : 0;

  const showExperience =
    variant === 'catalogue-hub' &&
    ((formateur.experiences?.length ?? 0) > 0 ||
      (formateur.formationsProfessionnelles?.length ?? 0) > 0);

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

      <p className="mt-5 text-sm leading-relaxed text-ofc-ink-muted text-pretty">
        {formateur.parcours}
      </p>

      {showExperience ? (
        <div className="mt-5 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Parcours professionnel
          </p>
          {formateur.experiences && formateur.experiences.length > 0 ? (
            <ol className="mt-3 space-y-3">
              {formateur.experiences.map((step) => (
                <li key={`${step.titre}-${step.periode ?? ''}`} className="text-sm">
                  <p className="font-medium text-ofc-ink">
                    {step.periode ? (
                      <span className="text-ofc-ink-muted">{step.periode} · </span>
                    ) : null}
                    {step.titre}
                  </p>
                  {step.detail ? (
                    <p className="mt-0.5 text-ofc-ink-muted">{step.detail}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
          {formateur.formationsProfessionnelles &&
          formateur.formationsProfessionnelles.length > 0 ? (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
                Formations professionnelles
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ofc-ink-muted">
                {formateur.formationsProfessionnelles.map((fp) => (
                  <li key={fp}>{fp}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : (
        <div className="flex-1" aria-hidden />
      )}

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

      {moduleLinks.length > 0 && showFormations ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Formations animées
          </p>
          <ul className="mt-4 space-y-4">
            {moduleLinks.map((m) => (
              <li
                key={m.code}
                className="rounded-lg border border-ofc-border bg-ofc-canvas/60 p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-ofc-border-strong bg-white px-2 py-0.5 font-mono text-xs font-semibold tabular-nums text-ofc-ink">
                    {m.code}
                  </span>
                  <span className="text-xs text-ofc-ink-muted">{m.disponibiliteLabel}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ofc-ink text-pretty">{m.titre}</p>
                <p className="mt-1 text-xs text-ofc-ink-muted">{m.dureeLabel}</p>
                <Link
                  href={m.href}
                  className={`${OFC_CTA_PRIMARY} mt-3 inline-flex min-h-10 w-full items-center justify-center px-4 py-2 text-sm sm:w-auto`}
                >
                  {m.ctaLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!formateur.animatesAllPublished && shownNiv.length > 0 ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            Formations animées
          </p>
          <ul className="mt-3 space-y-2">
            {shownNiv.map((f) => (
              <li key={f.code}>
                <Link href={f.href} className={`${OFC_LINK} text-sm text-pretty`}>
                  {f.titre}
                  <span className="text-ofc-ink-muted"> · {f.duree}</span>
                </Link>
              </li>
            ))}
          </ul>
          {remainingNiv > 0 ? (
            <p className="mt-2 text-xs text-ofc-ink-muted">
              + {remainingNiv} autre{remainingNiv > 1 ? 's' : ''} formation
              {remainingNiv > 1 ? 's' : ''} au catalogue
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
