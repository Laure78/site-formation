import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  formationHref,
  getFormationByCode,
  type Formation,
} from '@/data/formations';

export type CatalogueProgrammeRef = 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-05';

type RenvoiFicheCatalogueProps = {
  programmeRef: CatalogueProgrammeRef;
  /** Ex. « à Longjumeau », « en Yvelines (78) », « pour les électriciens ». */
  contexte?: string;
};

function resolveFormation(programmeRef: CatalogueProgrammeRef): Formation {
  const formation = getFormationByCode(programmeRef);
  if (!formation) {
    throw new Error(`[RenvoiFicheCatalogue] Formation introuvable pour ${programmeRef}`);
  }
  return formation;
}

/**
 * Encart Qualiopi — renvoi vers la fiche catalogue (pas de faux bloc réglementaire).
 * Les landings SEO décrivent un contexte d’intervention ; l’action de formation
 * certifiée reste la fiche NIV-xx.
 */
export function RenvoiFicheCatalogue({ programmeRef, contexte }: RenvoiFicheCatalogueProps) {
  const formation = resolveFormation(programmeRef);
  const href = formationHref(formation);
  const contextePhrase = contexte?.trim()
    ? ` ${contexte.trim().replace(/^\s+/, '')}`
    : '';

  return (
    <aside
      id="action-formation-reference"
      aria-labelledby="renvoi-fiche-catalogue-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-[#F8FAFC] px-4 py-14 md:py-16"
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-[#377CF3]/25 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#377CF3]">
            <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              Qualiopi — indicateur 1
            </p>
            <h2
              id="renvoi-fiche-catalogue-heading"
              className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Action de formation de référence
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Cette page présente l&apos;intervention de Laure Olivié{contextePhrase}. L&apos;action de
              formation correspondante au catalogue est :{' '}
              <strong className="font-semibold text-slate-900">{formation.titre}</strong>. Toutes les
              informations réglementaires (prérequis, objectifs, contenu, public, durée, modalités et
              délais d&apos;accès, tarifs, méthodes, évaluation, accessibilité handicap, contacts)
              figurent sur la fiche de cette action.
            </p>
            <p className="mt-2 text-xs text-slate-500">Référence programme : {programmeRef}</p>
            <Link
              href={href}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
            >
              Voir la fiche catalogue — {programmeRef}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
