'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { IaDevisPromptMetier } from '@/lib/ia-devis-batiment-prompts';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

type Props = {
  prompts: readonly IaDevisPromptMetier[];
};

/** Accordéons prompts par métier — un seul panneau ouvert à la fois. */
export function IaDevisPromptsAccordion({ prompts }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {prompts.map((bloc, i) => {
        const panelId = `ia-devis-prompt-panel-${i}`;
        const buttonId = `ia-devis-prompt-btn-${i}`;
        const isOpen = open === i;

        return (
          <div key={bloc.label} className={`${OFC_CARD} overflow-hidden rounded-xl`}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full min-h-12 items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <span className="font-display text-base font-semibold text-slate-900 md:text-lg">
                  {bloc.label}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={isOpen ? 'border-t border-slate-100 px-5 pb-5 pt-4' : undefined}
            >
              {isOpen ? (
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Prompt
                    </p>
                    <p className="mt-2 rounded-xl bg-slate-50 p-4 text-slate-800">{bloc.prompt}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Résultat attendu
                    </p>
                    <p className="mt-2">{bloc.resultat}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Précautions
                    </p>
                    <p className="mt-2">{bloc.precautions}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
