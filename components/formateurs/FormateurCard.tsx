import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurFormationLinks,
  getFormateurModuleLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { cn } from '@/lib/cn';
import { OFC_CARD, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formateur: FormateurProfile;
  /** Limite les liens formations affichés (page hub = tous ; compact = 3). */
  maxFormations?: number;
  /** Désactiver les liens formations (évite doublons netlinking sur parcours). */
  showFormations?: boolean;
  /** Carte hub catalogue 2027 (parcours, modules, boutons). */
  variant?: 'default' | 'catalogue-hub';
  /** Portrait chargé en priorité (première carte). */
  portraitPriority?: boolean;
};

const MAX_DOMAINES = 3;

function experienceOneLiner(formateur: FormateurProfile): string | null {
  const step = formateur.experiences?.[0];
  if (!step) return null;
  if (step.periode) {
    return `${step.periode} · ${step.titre}`;
  }
  return step.titre;
}

function hasParcoursDetaille(formateur: FormateurProfile): boolean {
  return (
    (formateur.experiences?.length ?? 0) > 0 ||
    (formateur.formationsProfessionnelles?.length ?? 0) > 0
  );
}

/** Carte formateur — portrait, intitulé, spécialités, parcours, formations. */
export function FormateurCard({
  formateur,
  maxFormations,
  showFormations = true,
  variant = 'default',
  portraitPriority = false,
}: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const hubVariant = variant === 'catalogue-hub';
  const moduleLinks =
    showFormations && (formateur.moduleCodes?.length ?? 0) > 0
      ? getFormateurModuleLinks(formateur)
      : [];
  const nivLinks =
    showFormations && moduleLinks.length === 0
      ? getFormateurFormationLinks(formateur, new Date(), { hub: hubVariant })
      : [];
  const formationsSectionTitle =
    formateur.formationsHubLabel ?? 'Formations associées';
  const portraitSize =
    hubVariant && formateur.featuredOnHub ? ('lg' as const) : ('md' as const);
  const shownNiv =
    typeof maxFormations === 'number' ? nivLinks.slice(0, maxFormations) : nivLinks;
  const remainingNiv =
    typeof maxFormations === 'number'
      ? Math.max(0, nivLinks.length - maxFormations)
      : 0;

  const experienceLine = hubVariant ? experienceOneLiner(formateur) : null;
  const domaines = formateur.specialites.slice(0, MAX_DOMAINES);
  const parcoursAccordionId = `formateur-${formateur.id}-parcours`;
  const showParcoursAccordion = hubVariant && hasParcoursDetaille(formateur);

  if (hubVariant) {
    return (
      <article
        className={cn(
          OFC_CARD,
          'formateurs-hub-card flex h-full flex-col p-5 sm:p-6',
        )}
        aria-labelledby={`formateur-${formateur.id}-name`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <FormateurPortraitView
            portrait={formateur.portrait}
            shape="portrait"
            priority={portraitPriority}
          />
          <div className="min-w-0 flex-1">
            <h3
              id={`formateur-${formateur.id}-name`}
              className="font-display text-lg font-bold tracking-tight text-ofc-ink text-pretty"
            >
              {formateur.profileHref ? (
                <Link href={formateur.profileHref} className={OFC_LINK}>
                  {fullName}
                </Link>
              ) : (
                fullName
              )}
            </h3>
            <p className="mt-1 text-base font-medium leading-snug text-ofc-accent text-pretty">
              {formateur.intitule}
            </p>
            {experienceLine ? (
              <p className="mt-2 text-sm font-medium text-ofc-ink">{experienceLine}</p>
            ) : null}
            <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted text-pretty line-clamp-3">
              {formateur.parcours}
            </p>
          </div>
        </div>

        {domaines.length > 0 ? (
          <ul
            className="mt-5 flex flex-wrap gap-2"
            aria-label={`Domaines d’intervention — ${fullName}`}
          >
            {domaines.map((s) => (
              <li
                key={s}
                className="rounded-ofc-pill border border-ofc-border bg-ofc-canvas px-3 py-1 text-sm font-medium text-ofc-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        ) : null}

        {formateur.modalite ? (
          <p className="mt-4 text-sm text-ofc-ink-muted">{formateur.modalite}</p>
        ) : null}

        {moduleLinks.length > 0 && showFormations ? (
          <div className="mt-5 border-t border-ofc-border pt-5">
            <h4 className="text-sm font-semibold text-ofc-ink">{formationsSectionTitle}</h4>
            <ul className="mt-3 space-y-3">
              {moduleLinks.map((m) => (
                <li key={m.code} className="text-base">
                  <p className="font-medium leading-snug text-ofc-ink text-pretty">{m.titre}</p>
                  <Link
                    href={m.href}
                    className={`${OFC_LINK} mt-1 inline-flex min-h-11 items-center text-sm font-semibold`}
                  >
                    {m.ctaLabel === 'Demander le programme'
                      ? 'Demander le programme'
                      : 'Voir le programme'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {shownNiv.length > 0 && showFormations && moduleLinks.length === 0 ? (
          <div className="mt-5 border-t border-ofc-border pt-5">
            <h4 className="text-sm font-semibold text-ofc-ink">{formationsSectionTitle}</h4>
            <ul className="mt-3 space-y-3">
              {shownNiv.map((f) => (
                <li key={f.code} className="text-base">
                  <p className="font-medium leading-snug text-ofc-ink text-pretty">{f.titre}</p>
                  <Link
                    href={f.href}
                    className={`${OFC_LINK} mt-1 inline-flex min-h-11 items-center text-sm font-semibold`}
                  >
                    Voir le programme
                  </Link>
                </li>
              ))}
            </ul>
            {remainingNiv > 0 ? (
              <p className="mt-2 text-sm text-ofc-ink-muted">
                + {remainingNiv} autre{remainingNiv > 1 ? 's' : ''} formation
                {remainingNiv > 1 ? 's' : ''} au catalogue
              </p>
            ) : null}
          </div>
        ) : null}

        {showParcoursAccordion ? (
          <details
            className="group mt-5 border-t border-ofc-border pt-4 motion-safe:transition-[border-color] motion-safe:duration-200"
          >
            <summary
              id={`${parcoursAccordionId}-summary`}
              aria-controls={`${parcoursAccordionId}-panel`}
              className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ofc-accent marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent [&::-webkit-details-marker]:hidden"
            >
              <span>Voir le parcours</span>
              <span className="text-ofc-ink-muted group-open:hidden" aria-hidden>
                +
              </span>
              <span className="hidden text-ofc-ink-muted group-open:inline" aria-hidden>
                −
              </span>
            </summary>
            <div
              id={`${parcoursAccordionId}-panel`}
              role="region"
              aria-labelledby={`${parcoursAccordionId}-summary`}
              className="mt-3 space-y-4 text-base leading-relaxed text-ofc-ink-muted motion-safe:animate-[ofc-hero-enter_0.25s_ease-out_both] motion-reduce:animate-none"
            >
              {formateur.experiences && formateur.experiences.length > 0 ? (
                <ol className="space-y-3">
                  {formateur.experiences.map((step) => (
                    <li key={`${step.titre}-${step.periode ?? ''}`}>
                      <p className="font-medium text-ofc-ink">
                        {step.periode ? (
                          <span className="text-ofc-ink-muted">{step.periode} · </span>
                        ) : null}
                        {step.titre}
                      </p>
                      {step.detail ? <p className="mt-0.5">{step.detail}</p> : null}
                    </li>
                  ))}
                </ol>
              ) : null}
              {formateur.formationsProfessionnelles &&
              formateur.formationsProfessionnelles.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
                    Formations professionnelles
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {formateur.formationsProfessionnelles.map((fp) => (
                      <li key={fp}>{fp}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </details>
        ) : formateur.profileHref ? (
          <p className="mt-5 border-t border-ofc-border pt-4">
            <Link
              href={formateur.profileHref}
              className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm font-semibold text-ofc-accent`}
            >
              Voir le parcours
            </Link>
          </p>
        ) : null}
      </article>
    );
  }

  const cardClass = OFC_CARD;

  return (
    <article
      className={`${cardClass} flex h-full flex-col p-6 sm:p-7 motion-safe:transition-[transform,box-shadow] motion-safe:duration-200`}
      aria-labelledby={`formateur-${formateur.id}-name`}
    >
      <div className="flex items-start gap-4">
        <FormateurPortraitView portrait={formateur.portrait} size={portraitSize} />
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

      {moduleLinks.length > 0 && showFormations ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            {formationsSectionTitle}
          </p>
          <ul className="mt-4 space-y-4">
            {moduleLinks.map((m) => (
              <li
                key={m.code}
                className="rounded-lg border border-ofc-border bg-ofc-canvas/60 p-3"
              >
                <p className="text-sm font-medium text-ofc-ink text-pretty">{m.titre}</p>
                <Link
                  href={m.href}
                  className={`${OFC_LINK} mt-2 inline-flex min-h-10 items-center text-sm font-semibold`}
                >
                  {m.ctaLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {shownNiv.length > 0 && showFormations && moduleLinks.length === 0 ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
            {formationsSectionTitle}
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
          {formateur.featuredOnHub ? (
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_SECONDARY} mt-5 inline-flex min-h-10 w-full items-center justify-center px-4 py-2 text-sm sm:w-auto`}
            >
              Voir le catalogue de formations
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
