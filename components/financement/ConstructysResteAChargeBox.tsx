/**
 * Encadré pédagogique — prise en charge Constructys partielle (reste à charge indicatif).
 * À placer juste sous l’affichage des plafonds (home, page financement).
 */

import {
  FORMATION_NIV01,
  FORMATION_NIV02,
  formatPrixHt,
  libelleEffectifMaxFormation,
} from '@/data/formations';

/** Plafond Constructys pédagogique indicatif : 24 € HT/h × 4 h */
const PLAFOND_HT_PAR_STAGIAIRE_4H = 24 * 4;

function plafondGroupe(effectifMax: number): number {
  return PLAFOND_HT_PAR_STAGIAIRE_4H * effectifMax;
}

const ROWS = [
  {
    formation: `Niveau 1 — ${formatPrixHt(FORMATION_NIV01.prixHT)} € HT`,
    effectif: libelleEffectifMaxFormation(FORMATION_NIV01),
    priseEnCharge: (() => {
      const plafond = plafondGroupe(FORMATION_NIV01.effectifMax);
      return `jusqu’à ${formatPrixHt(plafond)} € HT → prise en charge possible du coût pédagogique`;
    })(),
  },
  {
    formation: `Niveau 2 — ${formatPrixHt(FORMATION_NIV02.prixHT)} € HT`,
    effectif: libelleEffectifMaxFormation(FORMATION_NIV02),
    priseEnCharge: (() => {
      const plafond = plafondGroupe(FORMATION_NIV02.effectifMax);
      const reste = FORMATION_NIV02.prixHT - plafond;
      return `jusqu’à ${formatPrixHt(plafond)} € HT → reste à charge indicatif ${formatPrixHt(reste)} € HT`;
    })(),
  },
] as const;

export function ConstructysResteAChargeBox() {
  return (
    <aside
      className="mt-6 rounded-lg border-l-4 border-[#377CF3] bg-[#F2F2F2] p-4 text-sm leading-relaxed text-slate-800 md:p-5"
      aria-labelledby="constructys-reste-a-charge-titre"
    >
      <h4
        id="constructys-reste-a-charge-titre"
        className="font-display text-base font-semibold text-slate-900"
      >
        Prise en charge partielle — ce qu’il reste à votre charge
      </h4>
      <p className="mt-3 text-sm text-slate-700">
        Le plafond Constructys s’applique par stagiaire et par heure : 24 € HT × 4 h ={' '}
        {formatPrixHt(PLAFOND_HT_PAR_STAGIAIRE_4H)} € HT pris en charge par participant, sous réserve
        d’éligibilité.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Prise en charge Constructys indicative selon niveau et effectif (barèmes 2026)
          </caption>
          <thead>
            <tr className="border-b border-slate-300 text-slate-900">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Formation
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold">
                Effectif
              </th>
              <th scope="col" className="py-2 font-semibold">
                Prise en charge indicative
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.formation} className="border-b border-slate-200/80 align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-slate-900">
                  {row.formation}
                </th>
                <td className="py-2.5 pr-3 text-slate-700">{row.effectif}</td>
                <td className="py-2.5 text-slate-700">{row.priseEnCharge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Barèmes 2026 indicatifs, susceptibles d’évoluer. Le montant exact figure sur votre devis
        après vérification de votre éligibilité auprès de Constructys.
      </p>
    </aside>
  );
}
