'use client';

import { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';

/** Programme NIV-01 — session 4 h : fondamentaux IA, devis, documents réglementaires, communication */
const PROGRAMME_SECTIONS = [
  {
    id: 'modules',
    label: 'Programme — 4 modules (session 4 h · 70 % pratique)',
    public:
      'Fondamentaux IA, devis et chiffrage, documents réglementaires et communication digitale — ateliers sur vos cas réels, calibrés sur une demi-journée.',
    modules: [
      {
        title: 'Module 1 — Les fondamentaux de l’IA pour le BTP (1 h)',
        points: [
          'Panorama des outils IA (ChatGPT, Claude, Gemini, Perplexity) : gratuit vs payant, choix selon votre métier',
          'Méthode RTC : Rôle + Tâche + Contexte — itérer un prompt jusqu’au résultat utilisable',
          'RGPD et protection des données : anonymiser, charte d’usage IA en entreprise',
          'Cas d’usage BTP en direct : mails, devis, documents réglementaires, communication digitale',
          'Livrable : fiche-mémo méthode RTC + liste d’outils IA recommandés pour votre métier',
        ],
      },
      {
        title: 'Module 2 — Devis et chiffrage assistés par l’IA (1 h)',
        points: [
          'Générer des devis BTP : descriptions techniques, vocabulaire client, références DTU, checklist anti-oubli',
          'Créer des grilles tarifaires par type de prestation et mettre à jour vos prix matières',
          'Analyser la rentabilité d’un chantier : marge, scénarios basse / médiane / haute, écarts prévu / réalisé',
          'Livrable : kit de prompts « BTP Pro » — devis, grilles tarifaires, analyse de rentabilité',
        ],
      },
      {
        title: 'Module 3 — Documents réglementaires et gestion de chantier avec l’IA (1 h)',
        points: [
          'Rédiger des DOE conformes : fiches techniques, plans de récolement, notices d’entretien',
          'PV de réception, levée de réserves, documents de garantie (parfait achèvement, biennale, décennale)',
          'Comptes rendus de chantier à partir de notes ou dictée — niveau de détail adapté au destinataire',
          'Livrable : kit de prompts multi-usages (recrutement, vente, SEO, juridique, RH) + trames DOE / PV / CR adaptées à votre métier',
        ],
      },
      {
        title: 'Module 4 — Communication digitale et visibilité du professionnel BTP (1 h)',
        points: [
          'Réseaux sociaux : LinkedIn (B2B), Instagram (particuliers), Facebook (local) — post chantier en 2 minutes',
          'Contenu pédagogique technique : carrousels « 5 erreurs à éviter », expliquer une technique à un client',
          'Calendrier éditorial : 4 piliers (expertise, coulisses, témoignages, valeurs), planifier 1 mois en 1 h',
          'Livrable : kit de prompts « Communication Technique BTP » + calendrier éditorial type pour 1 mois',
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
