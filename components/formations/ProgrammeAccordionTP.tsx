'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

/** Programme session unique 4 h — thèmes TP condensés (consultations, chantier, industrialisation). */
const PROGRAMME_SECTIONS = [
  {
    id: 'session-4h',
    label: 'Session 4 h — Travaux publics (consultations, chantier, industrialisation)',
    public:
      'Format catalogue : une demi-journée. Ateliers pratiques et trames réutilisables — même exigence Qualiopi.',
    modules: [
      {
        title: 'Bloc 1 — Réponse aux consultations (DCE / CCTP, synthèses)',
        points: [
          'Lecture rapide des pièces : exigences, risques, questions et trame de réponse',
          'Cas pratique : d’un extrait DCE à une synthèse « go / no go »',
        ],
      },
      {
        title: 'Bloc 2 — Documents de chantier & reporting',
        points: [
          'Comptes rendus, courriers et relances : structure, ton, validation humaine',
          'Reporting et pilotage : à partir de notes ou bullet points',
        ],
      },
      {
        title: 'Bloc 3 — QSE / prévention (selon contexte)',
        points: [
          'Briefings, checklists et messages courts adaptés au terrain TP',
        ],
      },
      {
        title: 'Bloc 4 — Industrialisation (templates, assistants, charte)',
        points: [
          'Templates TP réutilisables et règles de rédaction',
          'Esquisse d’assistants par rôle + charte d’usage IA en entreprise',
        ],
      },
    ],
  },
];

export function ProgrammeAccordionTP() {
  const [openSection, setOpenSection] = useState<string | null>('session-4h');

  return (
    <div className="mt-12 space-y-4">
      {PROGRAMME_SECTIONS.map((section, idx) => (
        <div
          key={section.id}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={() =>
              setOpenSection(openSection === section.id ? null : section.id)
            }
            className="flex w-full items-center gap-4 p-5 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-lg font-bold text-white">
              {idx + 1}
            </span>
            <div className="flex-1">
              <span className="block font-display text-lg font-semibold text-slate-900">
                {section.label}
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                {section.public}
              </span>
            </div>
            {openSection === section.id ? (
              <Minus size={20} strokeWidth={1.5} className="shrink-0 text-slate-500" />
            ) : (
              <Plus size={20} strokeWidth={1.5} className="shrink-0 text-slate-500" />
            )}
          </button>
          {openSection === section.id && (
            <div className="border-t border-slate-100 px-5 pb-6 pt-2">
              {section.modules.map((mod) => (
                <div
                  key={mod.title}
                  className="mt-6 rounded-lg bg-slate-50 p-5 first:mt-0"
                >
                  <h4 className="flex items-center gap-2 font-semibold text-slate-900">
                    <ChevronRight size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
                    {mod.title}
                  </h4>
                  <ul className="mt-3 space-y-2 pl-6">
                    {mod.points.map((point) => (
                      <li key={point} className="flex gap-2 text-slate-600">
                        <span className="text-[var(--accent)]">►</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
