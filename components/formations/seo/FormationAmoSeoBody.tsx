import { Check } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';
import { SITE_FORMATION_MODALITE_DETAIL } from '@/lib/site-config';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';

const sectionH2 = 'font-display text-xl font-bold text-slate-900 md:text-2xl';

const seo = getFormationCatalogueSeo('NIV-11');
const formation = getFormationByCode('NIV-11')!;

export function FormationAmoSeoBody() {
  const tarifLabel =
    formation.tarifParticipantHt != null
      ? libelleTarifParticipantCatalogue(formation.tarifParticipantHt)
      : 'Sur devis';

  return (
    <div className="max-w-none">
      <section>
        <h2 className={sectionH2}>
          Maîtres d&apos;ouvrage, conducteurs d&apos;opération, AMO : à qui s&apos;adresse cette formation ?
        </h2>
        <ul className="mt-4 space-y-2">
          {seo.publicTargets.map((target) => (
            <li key={target} className="flex gap-2 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {target}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Comment l&apos;IA aide-t-elle un AMO ?</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          L&apos;IA accélère la lecture croisée des pièces d&apos;opération et la synthèse pour le maître
          d&apos;ouvrage, sans se substituer à votre jugement.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          L&apos;assistant à maîtrise d&apos;ouvrage lit plus qu&apos;il n&apos;écrit : programmes, rendus
          APS/APD/PRO, CCTP, offres, comptes rendus, situations. Bien cadrée, l&apos;IA peut résumer un rendu
          d&apos;études, comparer une version à la précédente, relever les écarts avec le programme, structurer un
          tableau d&apos;analyse des offres et préparer un reporting — chaque livrable reste validé par l&apos;AMO et
          le maître d&apos;ouvrage.
        </p>
        <div className="mt-6 rounded-2xl border border-[#377CF3]/25 bg-slate-50 p-6">
          <p className="font-medium text-slate-800">Votre équipe AMO en Île-de-France ?</p>
          <div className="mt-4">
            <CtaVisio src="fiche-amo" />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Comment préparer un rapport d&apos;analyse des offres avec l&apos;IA ?</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          Vous structurez une trame de rapport sourcée en recoupant RC, CCTP, CCAP, DPGF, mémoires techniques et offres
          de prix.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          L&apos;IA aide à organiser les notes, comparer les éléments techniques et financiers et préparer un tableau
          comparatif avec renvoi aux pièces sources (MOE, entreprises, contrôleur technique, coordonnateur sécurité).
          Chaque point sensible est relié à un document avant envoi au maître d&apos;ouvrage.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Peut-on relire un APS, un APD ou un PRO avec l&apos;IA ?</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          Oui, pour accélérer la lecture d&apos;un rendu d&apos;études au regard du programme et lister les écarts
          apparents.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          Un skill « Revue d&apos;études » compare le document au programme fonctionnel, aux surfaces et aux exigences
          déjà actées. La conformité technique, les prescriptions réglementaires et la validation contractuelle restent
          de la responsabilité de l&apos;AMO et du maître d&apos;ouvrage.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>
          Comment préparer le reporting au maître d&apos;ouvrage avec ChatGPT ou Claude ?
        </h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          Vous transformez comptes rendus de comité, suivis budget / planning / risques et notes d&apos;alerte en
          synthèses lisibles pour le MOA.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          ChatGPT ou Claude structurent la note mensuelle, le tableau de bord et les CR de pilotage à partir de vos
          sources — chaque formulation est relue et validée avant diffusion au maître d&apos;ouvrage.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Informations pratiques</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm text-slate-700">
            <tbody>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Public
                </th>
                <td className="px-4 py-3">{formation.public}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Format
                </th>
                <td className="px-4 py-3">
                  {SITE_FORMATION_MODALITE_DETAIL} Durée : {formation.duree}.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Tarif
                </th>
                <td className="px-4 py-3">{tarifLabel}</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Financement
                </th>
                <td className="px-4 py-3">
                  Prise en charge par votre OPCO selon éligibilité, sans subrogation ; non éligible au CPF.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-600">Zone d&apos;intervention : {IDF_ZONE_INTERVENTION}.</p>
      </section>
    </div>
  );
}
