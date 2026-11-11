import { CtaVisio } from '@/components/CtaVisio';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { formationMoeQuiFormeHtml } from '@/lib/catalogue-formation-faq-niv05';
import { LINKS } from '@/lib/internal-links';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';

const sectionH2 = 'font-display text-xl font-bold text-slate-900 md:text-2xl';
const sectionH3 = 'mt-6 font-display text-lg font-semibold text-slate-900';

export function FormationMoeSeoBody() {
  return (
    <>
      <section>
        <h2 className={sectionH2}>Le problème : un maître d&apos;œuvre passe ses journées dans l&apos;administratif</h2>
        <p className="mt-4 leading-relaxed">
          Sur une opération, la mission DET et la réception génèrent une masse de documents répétitifs : lettres de
          commande par lot, avenants, ordres de service, demandes d&apos;agrément, situations mensuelles à contrôler,
          courriers de pénalités, convocations, PV de levée des réserves, suivi des DOE. Chaque document reprend les
          mêmes données (opération, lot, entreprise, montants, articles du CCAP), ressaisies à la main d&apos;une trame à
          l&apos;autre. C&apos;est là que naissent les erreurs : une pièce d&apos;une autre opération, un montant en lettres
          faux, un cumul d&apos;avenants mal calculé.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>La solution : l&apos;IA calibrée sur vos trames et vos phases de mission</h2>
        <p className="mt-4 leading-relaxed">
          L&apos;IA générative ne remplace ni votre signature ni votre responsabilité de maître d&apos;œuvre. Elle peut en
          revanche préparer les brouillons, contrôler la cohérence des pièces et extraire les clauses utiles, à partir
          de <strong>vos</strong> trames internes. La formation est organisée selon les phases d&apos;une opération :
          PRO-DCE, ACT, VISA, DET, OPC, AOR.
        </p>
        <div className="mt-6 rounded-2xl border border-[#377CF3]/25 bg-slate-50 p-6">
          <p className="font-medium text-slate-800">Votre équipe MOE en Île-de-France ?</p>
          <div className="mt-4">
            <CtaVisio src="fiche-moe" />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Programme en deux niveaux</h2>
        <h3 className={sectionH3}>Niveau 1 — L&apos;IA appliquée à l&apos;administratif d&apos;une opération (4 h)</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Interface, littératie IA et limites</strong> : fonctionnalités de Claude, AI Act (art. 4 du règlement
            UE 2024/1689), confidentialité des pièces de marché, ce que l&apos;IA ne fait pas (pas de valeur contractuelle,
            pas d&apos;accès aux normes et DTU payants, pas de lecture des fichiers DWG, calculs à vérifier).
          </li>
          <li>
            <strong>Méthode CRAFT et Projet « Affaire »</strong> : un espace de travail par opération, alimenté par le
            récapitulatif d&apos;opération et le tableau de gestion, avec la règle « ne rien inventer ».
          </li>
          <li>
            <strong>Contractualisation</strong> : lettres de commande, avenants (cumul et part du marché initial,
            incidence sur les délais), ordres de service.
          </li>
          <li>
            <strong>Sous-traitance et situations</strong> : demande d&apos;agrément (loi n° 75-1334 du 31/12/1975),
            délégation de paiement, contrôle d&apos;une situation de travaux, mise à jour des tableaux de gestion,
            estimatif d&apos;honoraires par phase.
          </li>
          <li>
            <strong>Courriers et veille</strong> : courriers de retard et pénalités, convocation à la réception, garantie
            de parfait achèvement (art. 1792-6 du Code civil), veille réglementaire sourcée.
          </li>
        </ul>

        <h3 className={sectionH3}>Niveau 2 — Créer vos Skills IA, de la consultation à la réception (4 h)</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Skills et connecteurs</strong> : différence entre prompt, Projet et Skill ; créer, tester et
            partager un Skill avec l&apos;équipe.
          </li>
          <li>
            <strong>Consultation</strong> : Skill « Analyse CCTP / CCAP » (clauses avec n° d&apos;article, incohérences
            CCTP–CCAP–DPGF), contrôle des DPGF et tableau de dépouillement des offres.
          </li>
          <li>
            <strong>Chantier et réception</strong> : tableau de bord de visite, relances, contrôle de complétude d&apos;un
            PPSPS reçu (l&apos;analyse de fond reste celle du CSPS), PV de levée des réserves, check-list DOE.
          </li>
          <li>
            <strong>Automatiser</strong> (démonstrations) : Claude Desktop, tâches planifiées (veille, point des
            situations, relances DOE), Claude in Chrome, Claude Code, Claude Design.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          Chaque niveau se termine par un QCM. Entre les deux sessions, chaque participant applique la méthode sur une
          affaire en cours.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Méthode pas à pas : ce que vous repartez avec</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Un Projet « Affaire » type</strong> qui contient le contexte de l&apos;opération.
          </li>
          <li>
            <strong>Une base de prompts CRAFT</strong> pour lettres de commande, avenants, OS, agréments, situations et
            courriers.
          </li>
          <li>
            <strong>Une bibliothèque de Skills</strong> construits en séance ou préparés à partir de vos trames, puis
            testés ensemble.
          </li>
          <li>
            <strong>Une tâche planifiée</strong> de veille réglementaire par participant.
          </li>
          <li>
            <strong>Une fiche « Limites de l&apos;IA en maîtrise d&apos;œuvre »</strong> et des règles d&apos;usage (référent,
            confidentialité, relecture).
          </li>
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
                  Maîtres d&apos;œuvre, MOEX, OPC, chefs de projet, économistes, bureaux d&apos;études, assistant(e)s
                  d&apos;opération
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Format
                </th>
                <td className="px-4 py-3">
                  Intra-entreprise, présentiel dans vos locaux en Île-de-France — par exemple 2 sessions de 4 h
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Pratique
                </th>
                <td className="px-4 py-3">70 % pratique / 30 % théorie, sur vos propres dossiers d&apos;affaire</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Outils
                </th>
                <td className="px-4 py-3">
                  Claude AI (abonnement Team recommandé, non inclus) ou ChatGPT
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Prérequis
                </th>
                <td className="px-4 py-3">Un ordinateur portable par participant, questionnaire de positionnement</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Tarif
                </th>
                <td className="px-4 py-3">Sur devis</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Financement
                </th>
                <td className="px-4 py-3">
                  Prise en charge OPCO selon éligibilité (OPCO Atlas pour l&apos;ingénierie et les bureaux d&apos;études), sans
                  subrogation ; non éligible au CPF
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  Accessibilité
                </th>
                <td className="px-4 py-3">Adaptations étudiées avec la référente handicap</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-600">Zone d&apos;intervention : {IDF_ZONE_INTERVENTION}.</p>
      </section>

      <section className="mt-10">
        <h2 className={sectionH2}>Qui forme ?</h2>
        <div className="mt-4 leading-relaxed text-slate-700">
          <FAQAnswer content={formationMoeQuiFormeHtml()} />
        </div>
      </section>
    </>
  );
}

export const FORMATION_MOE_VOIR_AUSSI = [
  { href: LINKS.blogIaMaitriseOeuvreUsages, label: 'IA et maîtrise d’œuvre : les usages de PRO-DCE à AOR' },
  { href: LINKS.formationIaAssistanceMaitriseOuvrage, label: 'Formation IA pour AMO' },
  { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Maîtriser Claude AI dans le BTP' },
] as const;
