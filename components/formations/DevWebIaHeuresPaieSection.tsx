import { Check } from 'lucide-react';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import {
  DEV_WEB_IA_HEURES_FONCTIONS,
  DEV_WEB_IA_HEURES_PARCOURS,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaHeuresPaieSection() {
  return (
    <section
      id="heures-paie"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="heures-paie-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Module prioritaire fréquent</p>
        <h2 id="heures-paie-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Relever les heures du chantier pour préparer la paie
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
          Le chef d&apos;équipe ou le salarié renseigne les heures par jour et par chantier depuis un écran
          adapté au téléphone. Le responsable contrôle et valide les relevés. Le bureau dispose ensuite d&apos;un
          récapitulatif pour préparer les éléments à transmettre au gestionnaire de paie.
        </p>

        <div className="mt-8 overflow-x-auto">
          <ol className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {DEV_WEB_IA_HEURES_PARCOURS.map((step, index) => (
              <li key={step} className="flex min-w-0 items-center gap-2 sm:gap-3">
                <span className="inline-flex min-h-10 items-center rounded-xl bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white">
                  {step}
                </span>
                {index < DEV_WEB_IA_HEURES_PARCOURS.length - 1 ? (
                  <span className="hidden text-[#377CF3] sm:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <h3 className={`${OFC_TYPE_H3} mt-10`}>Fonctions possibles (exemple pédagogique)</h3>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {DEV_WEB_IA_HEURES_FONCTIONS.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-4 text-sm leading-relaxed text-slate-700">
          L&apos;outil prépare les données. Les règles de calcul et les éléments de paie restent à paramétrer et
          à valider avec le gestionnaire de paie. Ce module ne produit pas automatiquement des bulletins
          conformes.
        </p>
      </div>
    </section>
  );
}
