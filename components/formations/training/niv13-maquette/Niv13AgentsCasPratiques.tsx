'use client';

import { useState } from 'react';
import { AGENTS_IA_CAS_METIER } from '@/lib/formation-agents-ia-autonomes-btp-content';

/** Trois cas métier — onglets (devis, CR chantier, demandes d’intervention). */
export function Niv13AgentsCasPratiques() {
  const [activeId, setActiveId] = useState<(typeof AGENTS_IA_CAS_METIER)[number]['id']>('devis');
  const active = AGENTS_IA_CAS_METIER.find((c) => c.id === activeId)!;

  return (
    <section
      id="cas-pratiques-agents-ia"
      className="scroll-mt-24"
      aria-labelledby="niv13-cas-pratiques-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="niv13-cas-pratiques-title" className="ofc-type-h2 text-[#101936]">
          Trois cas pratiques au choix
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Chaque participant approfondit un cas sur des exemples anonymisés ou fictifs — devis,
          compte rendu de chantier ou demande d’intervention.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="flex flex-wrap gap-1 border-b border-slate-200 bg-[#EFF6FF] p-2"
            role="tablist"
            aria-label="Cas métier"
          >
            {AGENTS_IA_CAS_METIER.map((cas) => {
              const selected = cas.id === activeId;
              return (
                <button
                  key={cas.id}
                  type="button"
                  role="tab"
                  id={`tab-niv13-${cas.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-niv13-${cas.id}`}
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
            id={`panel-niv13-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-niv13-${active.id}`}
            className="p-5 sm:p-6"
          >
            <h3 className="font-display text-lg font-semibold text-[#101936]">{active.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{active.summary}</p>
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