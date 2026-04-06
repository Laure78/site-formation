'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

/** Programme BTP-01 — 4 h ou 7 h : devis, emails, CR/DOE, administratif */
const PROGRAMME_SECTIONS = [
  {
    id: 'modules',
    label: 'Programme — 4 modules (4 h ou 7 h)',
    public:
      'Devis et chiffrage, relation client, documentation chantier et administratif — ateliers sur vos cas réels. Le format 7 h approfondit chaque module.',
    modules: [
      {
        title: 'Module 1 — Devis et chiffrage avec l’IA',
        points: [
          'Structurer un devis clair à partir de notes, bons de commande ou descriptifs',
          'Variantes, options et formulations professionnelles adaptées au bâtiment',
          'Relire et sécuriser les montants, unités et conditions avant envoi',
          'Cas pratique : passer d’un besoin client à un devis « prêt à envoyer »',
        ],
      },
      {
        title: 'Module 2 — Emails et relation client',
        points: [
          'Rédiger des emails professionnels (relances, réponses, réclamations)',
          'Modèles par situation : fournisseurs, sous-traitants, MOA / clients',
          'Ton et niveau de formalité adaptés au contexte BTP',
        ],
      },
      {
        title: 'Module 3 — Comptes rendus, DOE et documentation chantier',
        points: [
          'Comptes rendus de réunion et de chantier à partir de notes ou dictée',
          'Structurer rapports d’avancement et synthèses pour la direction ou le client',
          'Pistes pour DOE / dossiers selon votre organisation (sans remplacer la validation métier)',
        ],
      },
      {
        title: 'Module 4 — Gestion administrative et automatisation',
        points: [
          'Prioriser et traiter les tâches administratives récurrentes',
          'Modèles de courriers, relances et check-lists internes',
          'Bonnes pratiques : confidentialité, relecture humaine, traçabilité',
        ],
      },
    ],
  },
];

export function ProgrammeAccordionBatiment() {
  const [openSection, setOpenSection] = useState<string | null>('modules');

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
              <span className="mt-1 block text-sm text-slate-600">{section.public}</span>
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
