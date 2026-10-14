import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import {
  DEV_WEB_IA_ACCESSIBLE,
  DEV_WEB_IA_AUTONOMIE,
  DEV_WEB_IA_AVANT_APRES,
  DEV_WEB_IA_COMPARATIF,
  DEV_WEB_IA_CTA_FINAL,
  DEV_WEB_IA_CTA_FINAL_LABEL,
  DEV_WEB_IA_ECONOMIQUE,
  DEV_WEB_IA_RESULTATS,
  devWebIaPrimaryCtaHref,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

/** Comparatif logiciels standards vs outil métier. */
export function DevWebIaPourquoiOutilSection() {
  const { title, standards, metier, closing } = DEV_WEB_IA_COMPARATIF;

  return (
    <section
      id="pourquoi-outil-metier"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="pourquoi-outil-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Pourquoi créer son propre outil ?</p>
        <h2 id="pourquoi-outil-title" className={`${FORMATION_CATALOGUE_H2} mt-3 max-w-3xl`}>
          {title}
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
            <h3 className={OFC_TYPE_H3}>{standards.title}</h3>
            <ul className="mt-5 space-y-3">
              {standards.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#377CF3] bg-white p-5 shadow-[0_8px_28px_rgba(55,124,243,0.1)] md:p-6">
            <h3 className={OFC_TYPE_H3}>{metier.title}</h3>
            <ul className="mt-5 space-y-3">
              {metier.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-800 md:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium leading-relaxed text-slate-800">
          {closing}
        </p>
      </div>
    </section>
  );
}

/** Autonomie : méthode pour faire évoluer l’outil. */
export function DevWebIaAutonomieSection() {
  const { title, lead, steps, highlight } = DEV_WEB_IA_AUTONOMIE;

  return (
    <section
      id="autonomie"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="autonomie-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Autonomie</p>
        <h2 id="autonomie-title" className={`${FORMATION_CATALOGUE_H2} mt-3 max-w-3xl`}>
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">{lead}</p>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {steps.map((step) => (
            <li
              key={step}
              className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <p
          role="note"
          className="mt-8 max-w-3xl rounded-2xl border-2 border-[#377CF3]/25 bg-[#EFF6FF] px-5 py-4 text-base font-semibold leading-relaxed text-slate-900"
        >
          {highlight}
        </p>
      </div>
    </section>
  );
}

/** Argument économique prudent. */
export function DevWebIaEconomiqueSection() {
  const e = DEV_WEB_IA_ECONOMIQUE;

  return (
    <section
      id="logiciels-multiples"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="economique-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Argument économique</p>
        <h2 id="economique-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          {e.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">{e.lead}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {e.outils.map((outil) => (
            <li
              key={outil}
              className="rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              {outil}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-base font-medium text-slate-800">{e.coutsLead}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {e.couts.map((cout) => (
            <li
              key={cout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              {cout}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-700">{e.body}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">{e.caution}</p>
        <p className="mt-6 max-w-3xl font-display text-xl font-bold text-slate-900 md:text-2xl">
          {e.punchline}
        </p>
      </div>
    </section>
  );
}

/** Avant / après formation. */
export function DevWebIaAvantApresSection() {
  const { title, avant, apres } = DEV_WEB_IA_AVANT_APRES;

  return (
    <section
      id="avant-apres"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="avant-apres-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <h2 id="avant-apres-title" className={FORMATION_CATALOGUE_H2}>
          {title}
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h3 className={`${OFC_TYPE_H3} text-slate-500`}>Avant</h3>
            <ul className="mt-5 space-y-3">
              {avant.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 md:text-base">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#377CF3] bg-white p-5 shadow-[0_8px_28px_rgba(55,124,243,0.1)] md:p-6">
            <h3 className={`${OFC_TYPE_H3} text-[#377CF3]`}>Après</h3>
            <ul className="mt-5 space-y-3">
              {apres.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-800 md:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Accessible sans compétence technique. */
export function DevWebIaAccessibleSection() {
  const { title, lead, prerequis, loop } = DEV_WEB_IA_ACCESSIBLE;

  return (
    <section
      id="accessible-sans-coder"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="accessible-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Sans compétence technique</p>
        <h2 id="accessible-title" className={`${FORMATION_CATALOGUE_H2} mt-3 max-w-3xl`}>
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">{lead}</p>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
          Prérequis
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {prerequis.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm font-medium text-slate-800"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl rounded-2xl bg-[#377CF3] px-5 py-5 font-display text-lg font-bold leading-relaxed text-white md:text-xl">
          {loop}
        </p>
      </div>
    </section>
  );
}

/** Résultats en fin de formation. */
export function DevWebIaResultatsSection() {
  const { title, items, closing, prudence } = DEV_WEB_IA_RESULTATS;

  return (
    <section
      id="resultats-formation"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="resultats-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <h2 id="resultats-title" className={FORMATION_CATALOGUE_H2}>
          {title}
        </h2>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
          {closing}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">{prudence}</p>
      </div>
    </section>
  );
}

/** CTA final de conversion. */
export function DevWebIaFinalConversionSection() {
  const { title, lead, closing, facts } = DEV_WEB_IA_CTA_FINAL;

  return (
    <section
      id="construire-mon-projet"
      className="scroll-mt-24 border-b border-slate-200 bg-[#377CF3] px-4 py-12 md:py-16"
      aria-labelledby="cta-final-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="cta-final-title" className="font-display text-2xl font-bold text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/95 md:text-lg">{lead}</p>
        <p className="mt-3 text-base font-medium text-white">{closing}</p>

        <div className="mt-8 flex justify-center">
          <Link
            href={devWebIaPrimaryCtaHref()}
            className="inline-flex min-h-12 w-full max-w-md items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#377CF3] transition-colors hover:bg-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            {DEV_WEB_IA_CTA_FINAL_LABEL}
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/90">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
