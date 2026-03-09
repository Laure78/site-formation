'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

const PROGRAMME_SECTIONS = [
  {
    id: 'section-1',
    label: 'IA & Cartographie des usages RH',
    modules: [
      {
        title: "Module 1 : Comprendre l'IA et ses applications RH dans le BTP",
        points: [
          'Cadre de vigilance : éthique, RGPD, confidentialité des données RH',
          'Risques potentiels : biais algorithmiques, hallucinations IA, discrimination en recrutement',
          'Bonnes pratiques de sécurisation des échanges avec l\'IA',
          'Principes de l\'IA générative et analytique appliqués aux RH',
          'Panorama des outils : ChatGPT, Mistral AI, Gemini, Perplexity',
          'Cas pratique : identifier les besoins IA de votre service RH',
        ],
      },
      {
        title: 'Module 2 : Maîtrise du Prompt Engineering RH',
        points: [
          'Structure d\'un bon prompt RH : contexte, rôle, tâche et format',
          'Création d\'une bibliothèque de prompts personnalisés pour le secteur du BTP',
          'Prompts spécialisés pour : grilles d\'entretien, e-mails RH, bilans annuels',
          'Exercice pratique : génération de contenus RH professionnels',
        ],
      },
      {
        title: 'Module 3 : IA au service de la Formation dans le BTP',
        points: [
          'Création de contenus pédagogiques : cas pratiques BTP, quiz et présentations',
          'Génération de plans de formation personnalisés par métier (maçon, conducteur de travaux, chef de chantier)',
          'Supports visuels générés par IA pour l\'intégration des nouveaux collaborateurs',
          'Cas pratique : concevoir un module de formation sur la sécurité en chantier avec l\'IA',
        ],
      },
    ],
  },
  {
    id: 'section-2',
    label: 'GEPP, Données & Assistant IA RH',
    modules: [
      {
        title: 'Module 4 : GEPP & Anticiper les compétences BTP',
        points: [
          'Cartographie des compétences actuelles et futures dans le BTP',
          'Identification des écarts de compétences par métier (maçon, électricien, plombier, etc.)',
          'Simulation de parcours de carrière avec l\'IA',
          'Aide à la conduite des entretiens professionnels',
          'Exercice pratique : projection d\'un plan GEPP + analyse des entretiens',
        ],
      },
      {
        title: 'Module 5 : Construire ses KPI RH avec l\'IA',
        points: [
          'Quelles données RH exploiter ? (SIRH, enquêtes internes, entretiens de sortie)',
          'Tableaux de bord RH : recrutement, absentéisme, formation, climat social, turnover',
          'Plannings de répartition de la charge de travail (PPC) pour les chantiers',
          'Cas pratique : générer un tableau de bord RH BTP + indicateurs d\'activité',
        ],
      },
      {
        title: "Module 6 : Création d'un assistant IA RH et plan d'action",
        points: [
          'Configuration de GPTs personnalisés pour le BTP',
          'Assistant recrutement : pré-sélection de candidats BTP',
          'Assistant manager : aide à la décision RH',
          'Assistant formation : génération de contenus pédagogiques',
          'Générateur de newsletter interne',
          'Création de supports de présentation avec l\'IA',
          "Formalisation du plan d'action IA RH pour chaque participant",
        ],
      },
    ],
  },
];

export function ProgrammeAccordion() {
  const [openSection, setOpenSection] = useState<string | null>('section-1');

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
            <span className="flex-1 font-display text-lg font-semibold text-slate-900">
              {section.label}
            </span>
            {openSection === section.id ? (
              <Minus size={20} strokeWidth={1.5} className="text-slate-500" />
            ) : (
              <Plus size={20} strokeWidth={1.5} className="text-slate-500" />
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
