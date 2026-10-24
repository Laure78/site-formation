'use client';

import { useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurFormationLinks,
  getFormateurModuleLinks,
  getFormateurSousDomaineLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  formateur: FormateurProfile | null;
  open: boolean;
  onClose: () => void;
};

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

function FormateurDetailBody({ formateur }: { formateur: FormateurProfile }) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const moduleLinks = getFormateurModuleLinks(formateur);
  const nivLinks = getFormateurFormationLinks(formateur, new Date(), { hub: true });
  const sousDomaines = getFormateurSousDomaineLinks(formateur);
  const modulesDispo = moduleLinks.filter((m) => m.disponibilite === 'disponible');
  const modules2027 = moduleLinks.filter((m) => m.disponibilite === 'ouverture-2027');
  const parcoursAccordionId = `detail-${formateur.id}-parcours`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <FormateurPortraitView portrait={formateur.portrait} shape="portrait" priority />
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

      {(modulesDispo.length > 0 || nivLinks.length > 0) && (
        <section aria-labelledby={`${formateur.id}-dispo-title`}>
          <h3 id={`${formateur.id}-dispo-title`} className="text-sm font-semibold text-ofc-ink">
            Disponible maintenant
          </h3>
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
                  aria-label={`Demander le programme : ${f.titre}`}
                >
                  Demander le programme : {f.titre}
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
                  Demander le programme : {m.titre}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {modules2027.length > 0 ? (
        <section aria-labelledby={`${formateur.id}-2027-title`}>
          <h3 id={`${formateur.id}-2027-title`} className="text-sm font-semibold text-ofc-ink">
            Ouverture 2027
          </h3>
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
          <h3 id={`${formateur.id}-sd-title`} className="text-sm font-semibold text-ofc-ink">
            Sous-domaines catalogue
          </h3>
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
        <details className="group border-t border-ofc-border pt-4">
          <summary
            id={`${parcoursAccordionId}-summary`}
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

/** Panneau latéral / bottom sheet — détail formateur (focus piégé, Échap). */
export function FormateurDetailDialog({ formateur, open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const node = panelRef.current;
      if (!node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !formateur) return null;

  const fullName = `${formateur.prenom} ${formateur.nom}`;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[70] bg-slate-900/45 motion-reduce:transition-none"
        aria-label="Fermer le profil"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'formateur-detail-dialog fixed z-[71] flex flex-col bg-white shadow-xl motion-reduce:transition-none',
          'inset-x-0 bottom-0 max-h-[min(92dvh,720px)] rounded-t-2xl',
          'md:inset-y-0 md:right-0 md:left-auto md:w-full md:max-w-lg md:rounded-none md:rounded-l-2xl md:max-h-none',
          'motion-safe:animate-[header-mobile-drawer-in_0.24s_var(--ofc-ease-out)_both] motion-reduce:animate-none',
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ofc-border px-4 py-3 sm:px-5">
          <h2 id={titleId} className="font-display text-lg font-bold text-ofc-ink text-pretty">
            {fullName}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ofc-ink hover:bg-ofc-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
          <FormateurDetailBody formateur={formateur} />
        </div>
      </div>
    </>
  );
}
