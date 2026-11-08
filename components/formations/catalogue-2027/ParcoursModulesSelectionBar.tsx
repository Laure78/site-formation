'use client';

import { CTA_DEVIS_LABEL } from '@/lib/cta-devis-label';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import {
  PARCOURS_CONTACT_SECTION_ID,
  PARCOURS_MODULES_SECTION_ID,
} from '@/lib/catalogue-2027/parcours-contact-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import {
  useParcoursModuleSelection,
  useSelectedModulePriceLines,
} from './parcours-module-selection-context';
import { ParcoursScrollLink } from './ParcoursScrollLink';

export function ParcoursModulesSelectionBar() {
  const { demandeType, setDemandeType, selectComplet, clearModules, selectedModules, parcours } =
    useParcoursModuleSelection();
  const priceLines = useSelectedModulePriceLines();

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5"
      aria-live="polite"
      data-testid="parcours-modules-selection-bar"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#101936]">Votre sélection</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={selectComplet}
              className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                demandeType === 'complet'
                  ? 'border-[#377CF3] bg-[#EFF6FF] text-[#1D4ED8]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]'
              }`}
              aria-pressed={demandeType === 'complet'}
            >
              Parcours complet ({parcours.moduleCount} modules)
            </button>
            <button
              type="button"
              onClick={() => setDemandeType('modules')}
              className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                demandeType === 'modules'
                  ? 'border-[#377CF3] bg-[#EFF6FF] text-[#1D4ED8]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]'
              }`}
              aria-pressed={demandeType === 'modules'}
            >
              Modules à la carte
            </button>
            {selectedModules.length > 0 && demandeType === 'modules' ? (
              <button
                type="button"
                onClick={clearModules}
                className="min-h-10 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 underline hover:text-[#377CF3]"
              >
                Tout désélectionner
              </button>
            ) : null}
          </div>

          {selectedModules.length > 0 ? (
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              {priceLines.map((line) => (
                <li key={line.code} className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <span className="font-semibold text-[#377CF3]">{line.code}</span>
                  <span className="min-w-0">{line.titre}</span>
                  <span className="text-slate-500">— {line.prix}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Cochez un ou plusieurs modules ci-dessous, ou choisissez le parcours complet.
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">Tarifs unitaires HT / participant — pas de forfait parcours.</p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col">
          <ParcoursScrollLink
            anchorId={PARCOURS_MODULES_SECTION_ID}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm`}
          >
            Choisir mes modules
          </ParcoursScrollLink>
          <button
            type="button"
            onClick={() => scrollToAnchor(PARCOURS_CONTACT_SECTION_ID)}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm`}
          >
            {CTA_DEVIS_LABEL}
          </button>
        </div>
      </div>
    </div>
  );
}
