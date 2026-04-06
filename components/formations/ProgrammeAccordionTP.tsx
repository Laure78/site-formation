'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

/** Programme 21 h — 3 jours : AO/DCE, documents chantier & QSE, industrialisation (templates + assistants). */
const PROGRAMME_SECTIONS = [
  {
    id: 'jour-1',
    label: 'Jour 1 — AO / DCE et préparation opérationnelle (Travaux Publics)',
    public:
      'Introduction, lecture DCE/CCTP, préparation chantier et cas pratiques orientés réponse aux consultations',
    modules: [
      {
        title: 'Introduction à la formation',
        points: [
          'Objectifs, déroulement, règles de sécurité des données (confidentialité, RGPD)',
          "Comprendre l'IA générative : limites, hallucinations, méthode de validation humaine",
          'Panorama des usages TP : études, méthode, travaux, QSE, administratif, relation MOA / MOE',
        ],
      },
      {
        title: 'Lire un DCE / CCTP plus vite et sans oublier l’essentiel',
        points: [
          'Extraction des exigences : techniques, délais, contraintes, pièces, pénalités, livrables',
          'Liste de questions pour clarifications, hypothèses, variantes',
          'Trame de réponse : plan, preuves, éléments différenciants (sans promesses non maîtrisées)',
        ],
      },
      {
        title: 'Préparation chantier : anticiper risques et dépendances',
        points: [
          'Checklists démarrage : interfaces, DICT/DT, phasage, accès, approvisionnement, matériel, sous-traitance',
          'Planning : jalons, dépendances, points de contrôle, risques et actions',
          'Réunion de lancement : ordre du jour, relevé de décisions et suivi',
        ],
      },
      {
        title: 'Cas d’usage Travaux Publics (atelier)',
        points: [
          'DCE : synthèse « exigences / risques / questions » + checklist de conformité',
          'Prépa : passer d’un CCTP ou de notes à un plan « phasage / risques / actions »',
          'Lancement : ordre du jour + compte rendu + tableau d’actions (responsables / échéances)',
        ],
      },
    ],
  },
  {
    id: 'jour-2',
    label: 'Jour 2 — Documents de chantier, reporting et QSE (rigueur & traçabilité)',
    public: 'CR, courriers, reporting, QSE et prévention — toujours avec protocole de validation',
    modules: [
      {
        title: 'Écrits chantier : gagner du temps sans perdre la rigueur',
        points: [
          'Comptes rendus : décisions, faits marquants, points bloquants, actions',
          'Courriers et relances : demandes d’info, constats, retards, aléas, réserves',
          'Rapports : avancement, moyens, incidents, synthèses à partir de notes ou photos décrites',
        ],
      },
      {
        title: 'Reporting et pilotage',
        points: [
          'Tableaux de suivi : avancement, écarts, risques, actions correctives',
          'Reporting hebdomadaire : format direction et format MOA / MOE',
          'Capitalisation : retours d’expérience, bonnes pratiques, base « cas & solutions »',
        ],
      },
      {
        title: 'QSE / prévention (selon contexte)',
        points: [
          'Briefings sécurité : messages clairs, quarts d’heure sécurité',
          'Checklists prévention : co-activité, signalisation, EPI, points de vigilance',
          'Procédures et modes opératoires : structure, clarté, contrôles',
        ],
      },
      {
        title: 'Cas d’usage Travaux Publics (atelier)',
        points: [
          'Compte rendu chantier : livrable « prêt à envoyer » + tableau d’actions',
          'Reporting : reporting hebdo (avancement / risques / actions) à partir de notes',
          'QSE : fiche briefing sécurité 5 minutes + checklist de contrôle',
        ],
      },
    ],
  },
  {
    id: 'jour-3',
    label: 'Jour 3 — Industrialisation (templates, assistants et méthode de validation)',
    public: 'Templates TP, assistants par rôle, charte d’usage et plan de déploiement',
    modules: [
      {
        title: 'Bibliothèque de templates TP',
        points: [
          'Pack documents : CR, courriers, relances, constats, reporting, REX, trames appels d’offres',
          'Règles de rédaction : structure, vocabulaire, niveaux de détail',
          'Workflow : collecte → production IA → relecture → validation → diffusion',
        ],
      },
      {
        title: 'Assistants IA par rôle (Travaux Publics)',
        points: [
          'Assistant « Conduite de travaux » : CR, actions, relances, reporting',
          'Assistant « Méthodes / BE » : DCE, synthèses, questions, trames',
          'Assistant « QSE » : procédures, checklists, REX, plans d’actions',
        ],
      },
      {
        title: 'Maîtrise des risques : fiabilité et responsabilité',
        points: [
          'Checklist anti-erreurs : faits, sources, versions, cohérence',
          "Cadre d'usage : ce que l'IA prépare vs ce que l'humain valide",
          'Charte IA en entreprise : règles, limites, confidentialité, responsabilités',
        ],
      },
      {
        title: 'Cas d’usage Travaux Publics (atelier)',
        points: [
          'Industrialisation : enchaînement réunion → CR → actions → relances → reporting',
          'QSE : pack de checklists par type d’opération + protocole de contrôle',
          'Déploiement : plan d’actions 30 jours (équipe, templates, règles, indicateurs temps gagné)',
        ],
      },
    ],
  },
];

export function ProgrammeAccordionTP() {
  const [openSection, setOpenSection] = useState<string | null>('jour-1');

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
