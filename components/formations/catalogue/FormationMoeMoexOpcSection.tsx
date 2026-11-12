import Link from 'next/link';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { LINKS } from '@/lib/internal-links';

const MISSION_PHASE_ROWS = [
  {
    phase: 'ACT',
    iaPrepare:
      'Trames CCTP et DPGF, synthèse DCE, tableau comparatif d’offres et courriers de consultation',
    vousValidez: 'Références normatives, quantités, cohérence des pièces et engagements contractuels',
  },
  {
    phase: 'VISA',
    iaPrepare:
      'Grilles de lecture des plans et documents d’exécution, liste des points à viser, brouillons de visas',
    vousValidez: 'Le visa, le refus ou les réserves — acte du maître d’œuvre, signé avant diffusion',
  },
  {
    phase: 'DET',
    iaPrepare:
      'Comptes rendus de réunion, brouillons d’ordres de service, contrôles de situations, courriers aux entreprises',
    vousValidez: 'Chiffres, clauses CCAP et habilitations avant signature et envoi',
  },
  {
    phase: 'OPC',
    iaPrepare:
      'Tableaux de planning, relances, comptes rendus de coordination et constats de retard',
    vousValidez: 'Constats officiels, arbitrages MOE et communications contractuelles',
  },
  {
    phase: 'AOR',
    iaPrepare: 'PV de réception, listes de réserves, check-lists DOE et relances de levée',
    vousValidez: 'OPR, réserves définitives et clôture de mission',
  },
] as const;

/** H2 MOEX / OPC / phases mission — fiche NIV-05 (SEO exécution). */
export function FormationMoeMoexOpcSection() {
  return (
    <>
      <TrainingSection
        id="ia-moex-det"
        title="Une formation IA pensée pour la maîtrise d’œuvre d’exécution (MOEX)"
        tone="muted"
      >
        <p className="text-base leading-relaxed text-slate-700">
          En phase DET, le MOEX enchaîne réunions de chantier, visas de plans, ordres de service, situations mensuelles
          et courriers aux entreprises — souvent sur plusieurs lots en parallèle. L’IA peut faire gagner du temps sur la
          mise en forme : transformer notes vocales ou bullet points en compte rendu structuré, préparer le tableau de
          suivi des visas en cours, détecter des écarts manifestes entre situation et avancement déclaré, ou poser un
          premier jet d’ordre de service à partir du CCAP et de l’historique des OS. Elle aide aussi à tracer les
          relances et à uniformiser les courriers récurrents (réserves, demandes de pièces, convocations). Sur les
          situations, l’IA peut aussi proposer une trame de contrôle avant reprise dans votre tableur de gestion. Chaque
          sortie reste un brouillon : le MOEX recoupe les pièces sources, vérifie les montants et les délais, puis signe
          et diffuse. La formation travaille ces gestes sur vos trames et dossiers anonymisés, avec ChatGPT et Claude —
          sans automatiser la décision technique ni le visa.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Aller plus loin :{' '}
          <Link href={LINKS.blogTutoAvenantOrdreDeServiceIa} className="font-medium text-[#377CF3] underline">
            avenants et ordres de service avec l’IA
          </Link>
          {' · '}
          <Link href={LINKS.blogTutoControleSituationTravauxIa} className="font-medium text-[#377CF3] underline">
            contrôle des situations de travaux
          </Link>
          .
        </p>
      </TrainingSection>

      <TrainingSection id="ia-pilotes-opc" title="Et pour les pilotes OPC ?" tone="white">
        <p className="text-base leading-relaxed text-slate-700">
          Le pilote OPC porte le planning d’exécution, les interfaces entre lots et le rythme des réunions de
          coordination. L’IA peut aider à tenir un tableau de planning lisible, à reformuler des comptes rendus de
          coordination à partir de notes prises sur tablette, à préparer des relances standardisées quand un lot prend
          du retard et à structurer un constat de retard avant validation MOE. Elle ne remplace ni la visite de chantier
          ni le jugement sur les causes : vous confirmez les dates, les impacts et les décisions avant tout envoi. En
          session, on configure des prompts et modèles adaptés à ce flux OPC — toujours avec relecture humaine.
        </p>
      </TrainingSection>

      <TrainingSection
        id="ia-phases-mission"
        title="Phase de mission → ce que l’IA aide à préparer → ce que vous validez"
        tone="muted"
      >
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full w-full text-left text-sm md:text-base">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Phase
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  L’IA aide à préparer
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Vous validez
                </th>
              </tr>
            </thead>
            <tbody>
              {MISSION_PHASE_ROWS.map((row) => (
                <tr key={row.phase} className="border-t border-slate-100">
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                    {row.phase}
                  </th>
                  <td className="px-4 py-3 text-slate-800">{row.iaPrepare}</td>
                  <td className="px-4 py-3 text-slate-800">{row.vousValidez}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          <Link href={LINKS.blogIaMaitriseOeuvreUsages} className="font-medium text-[#377CF3] underline">
            12 usages de l’IA en maîtrise d’œuvre (PRO à AOR)
          </Link>
        </p>
      </TrainingSection>
    </>
  );
}
