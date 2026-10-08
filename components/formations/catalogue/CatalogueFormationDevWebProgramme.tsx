'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { Download } from 'lucide-react';
import { OFC_CTA_SECONDARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';
import {
  DEV_WEB_IA_MODULES,
  DEV_WEB_IA_MODULES_JOUR2,
  DEV_WEB_IA_PARCOURS_14H_SECTION,
  DEV_WEB_IA_PARCOURS_7H_SECTION,
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PDF_7H_HREF,
  DEV_WEB_IA_PROGRAMME_SECTION,
  PROGRAMME_PDF_14H,
  PROGRAMME_PDF_7H,
} from '@/lib/formation-developpement-web-ia-content';

type ParcoursId = '7h' | '14h';

function WorkflowSteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-3 flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <li key={step} className="inline-flex items-center gap-2">
          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#377CF3]">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span className="text-slate-300" aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Etape7hCard({
  etape,
}: {
  etape: (typeof DEV_WEB_IA_MODULES)[number];
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">
          Étape {etape.number}
        </span>
      </div>
      <h4 className={`${OFC_TYPE_H3} mt-2`}>{etape.title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        <span className="font-semibold text-slate-900">Objectif : </span>
        {etape.objective}
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {etape.activities.map((item) => (
          <li
            key={item}
            className="text-sm leading-relaxed text-slate-600 before:mr-2 before:text-[#377CF3] before:content-['·']"
          >
            {item}
          </li>
        ))}
      </ul>
      {etape.examples?.length ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Exemples</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {etape.examples.map((ex) => (
              <li
                key={ex}
                className="rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1 text-xs font-medium text-slate-700"
              >
                {ex}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {etape.filRougeSteps?.length ? (
        <div className="mt-4 rounded-xl border border-[#377CF3]/20 bg-[#EFF6FF]/50 p-4">
          <p className="text-sm font-semibold text-slate-800">{etape.filRougeLabel}</p>
          <WorkflowSteps steps={etape.filRougeSteps} />
        </div>
      ) : null}
      {etape.processExample?.length ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Exemple</p>
          <ul className="mt-2 space-y-1.5">
            {etape.processExample.map((line) => (
              <li key={line} className="text-sm text-slate-700">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-4 rounded-xl bg-[#F2F2F2] px-4 py-3 text-sm font-medium text-slate-800">
        Résultat attendu : {etape.result}
      </p>
    </article>
  );
}

function EtapeJour2Card({
  etape,
}: {
  etape: (typeof DEV_WEB_IA_MODULES_JOUR2)[number];
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">
        Étape {etape.number}
      </span>
      <h4 className={`${OFC_TYPE_H3} mt-2`}>{etape.title}</h4>
      {etape.objective ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          <span className="font-semibold text-slate-900">Objectif : </span>
          {etape.objective}
        </p>
      ) : null}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {etape.points.map((item) => (
          <li
            key={item}
            className="text-sm leading-relaxed text-slate-600 before:mr-2 before:text-[#377CF3] before:content-['·']"
          >
            {item}
          </li>
        ))}
      </ul>
      {etape.flow?.length ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Cas d&apos;usage — enchaînement
          </p>
          <WorkflowSteps steps={etape.flow} />
        </div>
      ) : null}
      {etape.useCaseItems?.length ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-[#F2F2F2] p-4">
          {etape.useCaseIntro ? (
            <p className="text-sm font-medium text-slate-800">{etape.useCaseIntro}</p>
          ) : null}
          <ul className="mt-2 flex flex-wrap gap-2">
            {etape.useCaseItems.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function Parcours7hPanel() {
  const { title, intro } = DEV_WEB_IA_PARCOURS_7H_SECTION;
  return (
    <div id="parcours-7h" className="scroll-mt-28">
      <h3 className={OFC_TYPE_H3}>{title}</h3>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{intro}</p>
      <div className="mt-8 space-y-4">
        {DEV_WEB_IA_MODULES.map((etape) => (
          <Etape7hCard key={etape.number} etape={etape} />
        ))}
      </div>
      <p className="mt-6">
        <a
          href={DEV_WEB_IA_PDF_7H_HREF}
          download={PROGRAMME_PDF_7H}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-5 py-3`}
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Télécharger le programme officiel 7 h (PDF)
        </a>
      </p>
    </div>
  );
}

function Parcours14hPanel() {
  const s = DEV_WEB_IA_PARCOURS_14H_SECTION;
  return (
    <div id="parcours-14h" className="scroll-mt-28">
      <h3 className={OFC_TYPE_H3}>{s.title}</h3>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{s.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#377CF3]/30 bg-[#EFF6FF]/40 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">{s.jour1Duree}</p>
          <p className="mt-2 font-display text-lg font-bold text-slate-900">{s.jour1Label}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">{s.jour2Duree}</p>
          <p className="mt-2 font-display text-lg font-bold text-slate-900">{s.jour2Label}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
        <h4 className={`${OFC_TYPE_H3}`}>Jour 1 — Reprendre le parcours 7 h</h4>
        <ul className="mt-4 flex flex-wrap gap-2">
          {s.jour1Resume.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Le détail des 4 étapes figure dans l&apos;onglet{' '}
          <a href="#parcours-7h" className="font-semibold text-[#377CF3] hover:underline">
            Parcours 7 h
          </a>
          .
        </p>
      </div>

      <div className="mt-10">
        <h4 className={OFC_TYPE_H3}>Jour 2 — Approfondir et préparer le déploiement</h4>
        <div className="mt-6 space-y-4">
          {DEV_WEB_IA_MODULES_JOUR2.map((etape) => (
            <EtapeJour2Card key={etape.number} etape={etape} />
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-4 text-sm font-medium leading-relaxed text-slate-800">
          Résultat attendu : {s.outcome}
        </p>
      </div>

      <p className="mt-6">
        <a
          href={DEV_WEB_IA_PDF_14H_HREF}
          download={PROGRAMME_PDF_14H}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-5 py-3`}
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Télécharger le programme complet 14 h (PDF)
        </a>
      </p>
    </div>
  );
}

export function CatalogueFormationDevWebProgramme() {
  const baseId = useId();
  const [parcours, setParcours] = useState<ParcoursId>('7h');

  const selectParcours = useCallback((id: ParcoursId) => {
    setParcours(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', id === '7h' ? '#parcours-7h' : '#parcours-14h');
    }
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'parcours-14h' || hash === 'programme-14h') {
        setParcours('14h');
      } else if (hash === 'parcours-7h') {
        setParcours('7h');
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <div className="mt-2">
      <div className="max-w-3xl space-y-3 text-base leading-relaxed text-slate-600">
        {DEV_WEB_IA_PROGRAMME_SECTION.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <ul className="space-y-1.5 pt-1">
          {DEV_WEB_IA_PROGRAMME_SECTION.formats.map((f) => (
            <li key={f.id} className="flex flex-wrap gap-x-2">
              <span className="font-semibold text-slate-900">{f.label}</span>
              <span className="text-slate-500">—</span>
              <span>{f.summary}</span>
            </li>
          ))}
        </ul>
        <p className="rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm leading-relaxed text-slate-700">
          {DEV_WEB_IA_PROGRAMME_SECTION.disclaimer}
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Choisir un parcours de formation"
        className="mt-8 flex flex-col gap-2 sm:flex-row"
      >
        {DEV_WEB_IA_PROGRAMME_SECTION.formats.map((f) => {
          const selected = parcours === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${f.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${f.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectParcours(f.id)}
              className={cn(
                'min-h-12 flex-1 rounded-xl border px-4 py-3 text-left transition-colors',
                selected
                  ? 'border-[#377CF3] bg-[#377CF3] text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-[#377CF3]/50',
              )}
            >
              <span className="block font-display text-base font-bold">{f.label}</span>
              <span
                className={cn(
                  'mt-0.5 block text-sm',
                  selected ? 'text-white/90' : 'text-slate-600',
                )}
              >
                {f.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${parcours}`}
        aria-labelledby={`${baseId}-tab-${parcours}`}
        className="mt-8"
      >
        {parcours === '7h' ? <Parcours7hPanel /> : <Parcours14hPanel />}
      </div>
    </div>
  );
}
