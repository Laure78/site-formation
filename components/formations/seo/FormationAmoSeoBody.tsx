import { CtaVisio } from '@/components/CtaVisio';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';

const sectionH2 = 'font-display text-xl font-bold text-slate-900 md:text-2xl';
const sectionH3 = 'mt-6 font-display text-lg font-semibold text-slate-900';

export function FormationAmoSeoBody() {
  return (
    <>
      <section>
        <h2 className={sectionH2}>Le problème : l&apos;AMO synthétise tout, pour tout le monde</h2>
        <p className="mt-4 leading-relaxed">
          L&apos;assistant à maîtrise d&apos;ouvrage lit plus qu&apos;il n&apos;écrit : programmes, études de faisabilité, rendus
          APS/APD/PRO, CCTP, offres, comptes rendus, situations. Il doit ensuite en tirer une note claire pour un maître
          d&apos;ouvrage qui n&apos;a pas le temps de tout lire. Ce travail de synthèse et de contrôle de cohérence occupe une
          grande partie de la semaine.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>La solution : l&apos;IA comme assistant de lecture et de synthèse</h2>
        <p className="mt-4 leading-relaxed">
          Bien cadrée, l&apos;IA peut résumer un rendu d&apos;études, comparer une version à la précédente, relever les écarts
          avec le programme, structurer un tableau d&apos;analyse des offres et préparer un reporting. La décision et la
          validation restent celles de l&apos;AMO et du maître d&apos;ouvrage.
        </p>
        <div className="mt-6 rounded-2xl border border-[#377CF3]/25 bg-slate-50 p-6">
          <p className="font-medium text-slate-800">Votre équipe AMO en Île-de-France ?</p>
          <div className="mt-4">
            <CtaVisio src="fiche-amo" />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Contenu de la formation (adapté à vos missions)</h2>
        <h3 className={sectionH3}>Niveau 1 — Les bases sur vos documents d&apos;opération (4 h)</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            Interface Claude / ChatGPT, AI Act (art. 4 du règlement UE 2024/1689), confidentialité des données du maître
            d&apos;ouvrage, limites de l&apos;IA.
          </li>
          <li>
            Méthode CRAFT et Projet « Opération » : un espace par opération avec programme, planning et budget.
          </li>
          <li>Programmation : structurer un programme fonctionnel, un tableau de surfaces, une liste d&apos;exigences à partir de notes d&apos;entretien.</li>
          <li>
            Consultation de maîtrise d&apos;œuvre : trame de règlement de consultation et de critères, grille d&apos;analyse des
            candidatures et des offres.
          </li>
          <li>
            Reporting : note mensuelle au maître d&apos;ouvrage, tableau de bord budget / planning / risques, comptes rendus
            de comité.
          </li>
        </ul>

        <h3 className={sectionH3}>Niveau 2 — Skills et automatisation (4 h)</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            Skill « Revue d&apos;études » : relire un rendu APS, APD ou PRO au regard du programme et lister les écarts.
          </li>
          <li>Skill « Analyse des offres » : tableau comparatif, écarts en € et en %, questions de négociation.</li>
          <li>Suivi de travaux pour le compte du MOA : lecture des comptes rendus de chantier, suivi des réserves et des DOE.</li>
          <li>Tâches planifiées : veille réglementaire, point hebdomadaire des documents reçus.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Ce que vous repartez avec</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed">
          <li>Un Projet « Opération » type.</li>
          <li>Une base de prompts CRAFT AMO (programme, consultation, revue d&apos;études, reporting).</li>
          <li>Des Skills testés sur vos dossiers.</li>
          <li>Une fiche « Limites et confidentialité » pour l&apos;équipe.</li>
        </ol>
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
                <td className="px-4 py-3">
                  AMO, chargés d&apos;opération, responsables de programmes, directions techniques et immobilières
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Format
                </th>
                <td className="px-4 py-3">
                  Intra, présentiel dans vos locaux en Île-de-France — par exemple 2 sessions de 4 h
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Tarif
                </th>
                <td className="px-4 py-3">Sur devis</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Financement
                </th>
                <td className="px-4 py-3">
                  Prise en charge OPCO selon éligibilité, sans subrogation ; non éligible au CPF
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-600">Zone d&apos;intervention : {IDF_ZONE_INTERVENTION}.</p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Qui forme ?</h2>
        <p className="mt-4 leading-relaxed">
          Laure Olivié, fondatrice d&apos;OFC Création d&apos;Entreprise (certifié Qualiopi), {formatAnneesExperienceBTP()} dans le
          BTP comme ex-dirigeante d&apos;ALIA BTP, instructrice LinkedIn Learning.
        </p>
      </section>
    </>
  );
}
