'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

const PROGRAMME_SECTIONS = [
  {
    id: 'section-1',
    label: "L'IA au service des Travaux Publics : comprendre, pratiquer, appliquer",
    public: 'Dirigeants, encadrants, conducteurs de travaux, bureaux d\'études, fonctions support TP',
    modules: [
      {
        title: 'Module 1 : Introduction à l\'IA dans les Travaux Publics',
        points: [
          'Introduction aux usages de l\'IA dans les Travaux Publics : enjeux, bénéfices et limites',
          'Cadre de vigilance : éthique, RGPD, confidentialité des données chantier',
          'Risques potentiels : hallucinations IA, biais algorithmiques, erreurs de données techniques',
          'Panorama des outils : ChatGPT, Mistral AI, Gemini, Perplexity, outils métier TP',
          'Cartographie des usages IA dans les TP : recrutement, suivi chantier, QSE, appels d\'offres, communication',
          'Cas pratique : identifier les besoins IA de votre entreprise TP',
        ],
      },
      {
        title: 'Module 2 : Analyse automatisée de documents techniques TP',
        points: [
          'Analyse de DCE et CCTP avec l\'IA : extraction automatique des exigences clés',
          'Traitement des comptes rendus de chantier et rapports d\'avancement',
          'Synthèse de dossiers techniques volumineux en quelques minutes',
          'Extraction d\'informations pertinentes pour les réponses aux appels d\'offres',
          'Cas pratique : analyser un DCE réel avec l\'IA',
        ],
      },
      {
        title: 'Module 3 : Rédaction assistée et prompt engineering TP',
        points: [
          'Structure d\'un bon prompt TP : contexte, rôle, tâche, format, contraintes techniques',
          'Exercices de prompting : synthèse, extraction d\'informations, rédaction professionnelle',
          'Rédaction assistée : emails, notes techniques, rapports de chantier, PV de réunion',
          'Création d\'une bibliothèque de prompts personnalisés pour les métiers TP',
          'Atelier pratique : application sur documents réels et cartographie d\'opportunités IA',
        ],
      },
    ],
  },
  {
    id: 'section-2',
    label: 'Créer votre assistant IA personnalisé (GPTs)',
    public: 'Chefs de projet, responsables QSE, RH, communication, encadrants, bureaux d\'études',
    modules: [
      {
        title: 'Module 4 : Comprendre et concevoir un assistant IA métier',
        points: [
          'Introduction aux modèles de langage et principes des assistants IA',
          'Définition du périmètre et des usages de l\'assistant IA selon les besoins TP',
          'Définir les cas d\'usage pertinents pour les métiers des Travaux Publics',
          'Architecture d\'un GPT personnalisé : instructions système, base de connaissances, comportements',
          'Cas pratique : concevoir le cahier des charges de votre assistant IA TP',
        ],
      },
      {
        title: 'Module 5 : Créer et configurer votre assistant IA',
        points: [
          'Apprentissage pas à pas de la création d\'un assistant IA personnalisé (GPT)',
          'Intégration de votre base documentaire TP (CCTP types, procédures QSE, référentiels)',
          'Supervision et optimisation : cohérence des réponses, sécurité, qualité',
        ],
      },
      {
        title: 'Module 6 : Atelier final & plan d\'action IA TP',
        points: [
          'Mise en place de garde-fous pour la confidentialité des données chantier',
          'Atelier final : création d\'un assistant opérationnel adapté à un cas réel TP',
          'Cas au choix : suivi de chantier, QSE, analyse documentaire ou réponse à appel d\'offres',
          'Démonstration et partage entre participants',
          'Évaluation des performances de l\'assistant et pistes d\'amélioration',
          'Formalisation du plan d\'action IA pour chaque participant et son entreprise',
        ],
      },
    ],
  },
];

export function ProgrammeAccordionTP() {
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
            <div className="flex-1">
              <span className="block font-display text-lg font-semibold text-slate-900">
                {section.label}
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Public : {section.public}
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
