'use client';

import { useState } from 'react';
import { AUTOMATISER_TACHES_CAS_METIER } from '@/lib/formation-automatiser-ses-taches-ia-btp-content';

/** Trois cas métier BTP — onglets (relances, CR, demandes d’intervention). */
export function Niv14AutomatisationCasPratiques() {
  const [activeId, setActiveId] = useState<(typeof AUTOMATISER_TACHES_CAS_METIER)[number]['id']>(
    'devis',
  );
  const active = AUTOMATISER_TACHES_CAS_METIER.find((c) => c.id === activeId)!;

  return (
    <section
      id="cas-pratiques-metier"
      className="scroll-mt-24"
      aria-labelledby="niv14-cas-pratiques-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2
          id="niv14-cas-pratiques-title"
          className="ofc-type-h2 text-[#101936]"
        >
          Trois cas pratiques du BTP
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Choisissez un cas pour voir comment le scénario se déclenche, ce qu’il prépare et ce que
          votre équipe vérifie.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="flex flex-wrap gap-1 border-b border-slate-200 bg-[#EFF6FF] p-2"
            role="tablist"
            aria-label="Cas métier"
          >
            {AUTOMATISER_TACHES_CAS_METIER.map((cas) => {
              const selected = cas.id === activeId;
              return (
                <button
                  key={cas.id}
                  type="button"
                  role="tab"
                  id={`tab-${cas.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${cas.id}`}
                  onClick={() => setActiveId(cas.id)}
                  className={`min-h-10 flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    selected
                      ? 'border-slate-200 bg-white text-[#377CF3] shadow-sm'
                      : 'border-transparent text-slate-600 hover:bg-white/60'
                  }`}
                >
                  {cas.label}
                </button>
              );
            })}
          </div>

          <div
            key={active.id}
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="p-5 sm:p-6"
          >
            <h3 className="font-display text-lg font-semibold text-[#101936]">{active.title}</h3>
            <ol className="mt-4 space-y-3">
              {active.steps.map((step) => (
                <li
                  key={step.label}
                  className="grid gap-2 rounded-lg bg-slate-50 p-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                >
                  <strong className="text-sm text-[#101936]">{step.label}</strong>
                  <span className="text-sm leading-relaxed text-slate-600">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}