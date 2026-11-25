import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurFormationLinks,
  getFormateurModuleLinks,
  getFormateurSousDomaineLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

function DisponibiliteBadge({ kind }: { kind: 'disponible' | 'ouverture-2027' }) {
  if (kind === 'disponible') {
    return (
      <span className="inline-flex rounded-md bg-[#377CF3] px-2 py-0.5 text-xs font-semibold text-white">
        Disponible maintenant
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-md bg-[#F2F2F2] px-2 py-0.5 text-xs font-semibold text-ofc-ink">
      Ouverture 2027
    </span>
  );
}

type Props = {
  formateur: FormateurProfile;
  /** `false` sur la page dédiée — intro déjà dans le héros. */
  includeIntro?: boolean;
  portraitPriority?: boolean;
};

/** Programmes, spécialités et parcours — hub dialog ou fiche `/formateurs/[slug]`. */
export function FormateurProfileDetail({
  formateur,
  includeIntro = true,
  portraitPriority = false,
}: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const moduleLinks = getFormateurModuleLinks(formateur);
  const nivLinks = getFormateurFormationLinks(formateur, new Date(), { hub: true });
  const sousDomaines = getFormateurSousDomaineLinks(formateur);
  const modulesDispo = moduleLinks.filter((m) => m.disponibilite === 'disponible');
  const modules2027 = moduleLinks.filter((m) => m.disponibilite === 'ouverture-2027');
  const parcoursAccordionId = `detail-${formateur.id}-parcours`;
  const formationsSectionTitle =
    formateur.formationsHubLabel ?? 'Formations associées à ses spécialités';

  const hasProgrammes =
    modulesDispo.length > 0 || nivLinks.length > 0 || modules2027.length > 0;

  return (
    <div className="space-y-5">
      {includeIntro ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <FormateurPortraitView
            portrait={formateur.portrait}
            shape="portrait"
            priority={portraitPriority}
          />
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-ofc-accent text-pretty">{formateur.intitule}</p>
            {formateur.profileDraft ? (
              <p className="mt-2 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                Fiche en cours de validation — identité et associations à confirmer.
              </p>
            ) : null}
            <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted text-pretty">
              {formateur.parcours}
            </p>
            {formateur.modalite ? (
              <p className="mt-3 text-sm text-ofc-ink-muted">{formateur.modalite}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {formateur.specialites.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label={`Spécialités — ${fullName}`}>
          {formateur.specialites.map((s) => (
            <li
              key={s}
              className="rounded-ofc-pill border border-ofc-border bg-ofc-canvas px-3 py-1 text-sm font-medium text-ofc-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}

      {formateur.animatesAllPublished && hasProgrammes ? (
        <p className="text-sm leading-relaxed text-ofc-ink-muted text-pretty">
          Il intervient sur l’ensemble du catalogue des formations intelligence artificielle BTP
          publiées — présentiel en Île-de-France.
        </p>
      ) : null}

      {(modulesDispo.length > 0 || nivLinks.length > 0) && (
        <section aria-labelledby={`${formateur.id}-dispo-title`}>
          <h2 id={`${formateur.id}-dispo-title`} className="text-lg font-semibold text-ofc-ink">
            {formationsSectionTitle}
          </h2>
          <ul className="mt-3 space-y-4">
            {nivLinks.map((f) => (
              <li key={f.code} className="rounded-lg border border-ofc-border bg-white p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <DisponibiliteBadge kind="disponible" />
                  {f.tarifLabel ? (
                    <span className="text-sm font-medium text-ofc-ink">{f.tarifLabel}</span>
                  ) : null}
                </div>
                <p className="mt-2 font-medium text-ofc-ink text-pretty">{f.titre}</p>
                <p className="mt-0.5 text-sm text-ofc-ink-muted">{f.duree}</p>
                <Link
                  href={f.href}
                  className={`${OFC_LINK} mt-2 inline-flex min-h-11 items-center text-sm font-semibold`}
                  aria-label={`Voir la formation : ${f.titre}`}
                >
                  Voir la formation
                </Link>
              </li>
            ))}
            {modulesDispo.map((m) => (
              <li key={m.code} className="rounded-lg border border-ofc-border bg-white p-3">
                <DisponibiliteBadge kind="disponible" />
                <p className="mt-2 font-medium text-ofc-ink text-pretty">{m.titre}</p>
                <p className="mt-0.5 text-sm text-ofc-ink-muted">
                  {m.disponibiliteLabel}
                  <span aria-hidden> · </span>
                  {m.dureeLabel}
                </p>
                <Link
                  href={m.href}
                  className={`${OFC_LINK} mt-2 inline-flex min-h-11 items-center text-sm font-semibold`}
                  aria-label={`Demander le programme : ${m.titre}`}
                >
                  Demander le programme
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {modules2027.length > 0 ? (
        <section aria-labelledby={`${formateur.id}-2027-title`}>
          <h2 id={`${formateur.id}-2027-title`} className="text-lg font-semibold text-ofc-ink">
            Ouverture 2027
          </h2>
          <ul className="mt-3 space-y-4">
            {modules2027.map((m) => (
              <li key={m.code} className="rounded-lg border border-ofc-border bg-[#F2F2F2]/40 p-3">
                <DisponibiliteBadge kind="ouverture-2027" />
                <p className="mt-2 font-medium text-ofc-ink text-pretty">{m.titre}</p>
                <p className="mt-0.5 text-sm text-ofc-ink-muted">
                  {m.disponibiliteLabel}
                  <span aria-hidden> · </span>
                  {m.dureeLabel}
                </p>
                <Link
                  href={m.href}
                  className={`${OFC_LINK} mt-2 inline-flex min-h-11 items-center text-sm font-semibold`}
                >
                  {m.ctaLabel}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {sousDomaines.length > 0 ? (
        <section aria-labelledby={`${formateur.id}-sd-title`}>
          <h2 id={`${formateur.id}-sd-title`} className="text-lg font-semibold text-ofc-ink">
            Sous-domaines catalogue
          </h2>
          <ul className="mt-3 space-y-3">
            {sousDomaines.map((sd) => (
              <li key={sd.id}>
                <p className="font-medium text-ofc-ink text-pretty">{sd.titre}</p>
                {sd.note ? <p className="mt-1 text-sm text-ofc-ink-muted">{sd.note}</p> : null}
                <Link
                  href={sd.href}
                  className={`${OFC_LINK} mt-1 inline-flex min-h-11 items-center text-sm font-semibold`}
                >
                  Voir sur le catalogue
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {(formateur.experiences?.length ?? 0) > 0 ||
      (formateur.formationsProfessionnelles?.length ?? 0) > 0 ? (
        <details className="group border-t border-ofc-border pt-4" open={!includeIntro}>
          <summary
            id={`${parcoursAccordionId}-summary`}
            className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ofc-accent marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent [&::-webkit-details-marker]:hidden"
          >
            <span>Parcours professionnel</span>
            <span className="text-ofc-ink-muted group-open:hidden" aria-hidden>
              +
            </span>
            <span className="hidden text-ofc-ink-muted group-open:inline" aria-hidden>
              −
            </span>
          </summary>
          <div className="mt-3 space-y-4 text-base leading-relaxed text-ofc-ink-muted motion-reduce:animate-none">
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
      ) : null}
    </div>
  );
}