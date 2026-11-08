import type { CatalogueModule } from '@/data/catalogue-2027';
import {
  libelleDureeModuleHeures,
  libelleNiveauModule,
  libellePrixModuleInter,
} from '@/lib/catalogue-2027/parcours-affichage';

type Props = {
  mod: CatalogueModule;
  numero?: string;
  titleId: string;
};

/**
 * @deprecated Remplacé par `ParcoursModuleCard` (en-tête + accordéon unifiés).
 * En-tête carte module — code, niveau, durée, prix, intitulé, objectif.
 */
export function ParcoursModuleCarteEnTete({ mod, numero, titleId }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {numero ? (
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white"
            aria-hidden
          >
            {numero}
          </span>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">{mod.code}</p>
      </div>
      <ul className="mt-2 space-y-0.5 text-xs text-slate-600">
        <li>
          <span className="font-medium text-[#101936]">Niveau — </span>
          {libelleNiveauModule(mod)}
        </li>
        <li>
          <span className="font-medium text-[#101936]">Durée — </span>
          {libelleDureeModuleHeures(mod)}
        </li>
        <li>
          <span className="font-medium text-[#101936]">Prix — </span>
          {libellePrixModuleInter(mod)}
        </li>
      </ul>
      <h3 id={titleId} className="mt-3 font-display text-base font-semibold leading-snug text-[#101936]">
        {mod.titre}
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-medium text-[#101936]">Objectif — </span>
        {mod.objectifPrincipal}
      </p>
    </>
  );
}
