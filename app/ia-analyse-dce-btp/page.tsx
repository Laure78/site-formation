import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { SchemaHowTo } from '@/components/seo/SchemaHowTo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { buildMetadata, getFAQSchema } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

export const revalidate = 3600;

const PATH = '/ia-analyse-dce-btp';

const META_TITLE = 'IA et analyse de DCE dans le BTP';
const META_DESCRIPTION =
  "Analysez un DCE (CCTP, CCAP, RC) plus vite avec l'IA : méthode pas à pas, points de vigilance et confidentialité. Formation présentiel IDF. RDV gratuit.";

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  keywords: [
    'analyser DCE avec IA',
    'analyse CCTP IA BTP',
    'ChatGPT DCE appel offres',
    'Claude analyse DCE',
    "formation IA appels d'offres BTP",
  ],
});

const STEPS = [
  {
    name: 'Préparer les pièces (CCTP, CCAP, RC)',
    text: "Regroupez CCTP, CCAP, règlement de consultation (RC) et extraits DPGF utiles. Anonymisez les données sensibles si besoin.",
    prompt:
      "Tu es assistant appels d'offres BTP. Voici la liste des pièces de mon DCE : [liste]. Indique ce qui manque (CCTP, CCAP, RC, DPGF, AE) pour une analyse GO/NO GO structurée.",
  },
  {
    name: 'Extraire les 15 infos critiques',
    text: "Faites sortir délai, pénalités, seuils, modalités de variante, critères d'attribution, lots et assujettissements.",
    prompt:
      "À partir de ces pièces DCE BTP, extrais exactement 15 infos critiques (délais, pénalités, variantes, pondération RC, lots, assurances, conditions d'exécution). Tableau : info | pièce source | impact commercial.",
  },
  {
    name: 'Repérer les clauses à risque / éliminatoires',
    text: "Ciblez ce qui peut vous sortir du marché : références exigées, capacités, certifications, clauses financières. Vous validez chaque point.",
    prompt:
      'Repère les clauses potentiellement éliminatoires ou à fort risque pour une PME BTP (références, capacité technique/financière, certifications, pénalités). Classe : critique / à vérifier / mineur. Cite la pièce.',
  },
  {
    name: 'Synthétiser les exigences pour le mémoire',
    text: "Transformez l'analyse en brief pour la rédaction du mémoire technique (méthode, moyens, QSE, planning).",
    prompt:
      "À partir de mon analyse DCE, rédige un brief mémoire technique : attentes du RC, preuves à fournir, sections priorisées, points où mon offre peut se différencier. Liste à puces actionnable.",
  },
  {
    name: 'Décider Go / No Go',
    text: "L'IA structure le scoring ; la décision commerciale reste la vôtre.",
    prompt:
      'Propose une grille GO/NO GO BTP (charge, marge probable, risques clauses, capacité à répondre). Score chaque critère 1–5 avec justification. Ne décide pas à ma place : conclus par les 3 questions à trancher en comité.',
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Peut-on analyser un CCTP avec l'IA ?",
    a: "Oui. L'IA aide à extraire exigences, incohérences et points de vigilance d'un CCTP volumineux. Vous relisez, croisez avec le CCAP/RC et validez toute décision commerciale ou technique.",
  },
  {
    q: "L'IA remplace-t-elle le chargé d'affaires ?",
    a: "Non. Elle assiste : elle accélère la lecture et la synthèse. Le GO/NO GO, le positionnement prix et la responsabilité de l'offre restent humains.",
  },
  {
    q: "Mes données d'appel d'offres sont-elles protégées ?",
    a: "Ne déposez jamais un DCE sensible dans une IA grand public sans cadre. Préférez un environnement pro (ex. Claude Pro / entreprises) ou anonymisez. La formation couvre les pratiques adaptées aux dossiers clients.",
  },
  {
    q: 'Combien de temps gagne-t-on sur un DCE ?',
    a: "Selon le volume et la qualité des pièces, beaucoup d'équipes passent d'une lecture brute longue à une première synthèse structurée en une fraction du temps — toujours avec relecture métier. Les gains dépendent du dossier.",
  },
  {
    q: "Quelle formation pour analyser un DCE avec l'IA ?",
    a: `La formation niveau 2 appels d'offres travaille sur vos vrais DCE en présentiel en Île-de-France. ${FINANCEMENT_FORMULATION_PRUDENTE}`,
  },
];

export default function IaAnalyseDceBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <>
      <SchemaHowTo
        name="Analyser un DCE avec l'IA — méthode BTP"
        description="Méthode en 5 étapes pour structurer l'analyse d'un DCE (CCTP, CCAP, RC) avec l'IA, sous validation métier."
        totalTime="PT45M"
        steps={STEPS.map((s) => ({ name: s.name, text: `${s.text} Prompt type : ${s.prompt}` }))}
      />
      {faqSchema ? <JsonLd id="schema-ia-analyse-dce-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Analyser un DCE avec l&apos;IA : la méthode pour le BTP
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Un DCE, c&apos;est souvent des heures de lecture — et le risque de rater une clause
              éliminatoire. L&apos;IA ne décide pas à votre place : elle structure l&apos;analyse pour
              que vous alliez plus vite, sans déléguer le GO / NO GO.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="definition-analyse-dce">
          <div className="mx-auto max-w-4xl">
            <h2 id="definition-analyse-dce" className="font-display text-2xl font-bold text-slate-900">
              Qu&apos;est-ce qu&apos;analyser un DCE avec l&apos;IA ?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              <strong>
                Analyser un DCE avec l&apos;IA, c&apos;est faire extraire, classer et croiser les
                exigences des pièces d&apos;un appel d&apos;offres BTP pour préparer une décision
                commerciale éclairée.
              </strong>
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              On travaille notamment le <strong>CCTP</strong> (technique), le <strong>CCAP</strong>{' '}
              (administratif / pénalités), le <strong>RC</strong> (critères et modalités) et, selon
              les dossiers, la <strong>DPGF</strong>. L&apos;IA accélère la synthèse ; vous validez
              chaque conclusion avant d&apos;engager l&apos;entreprise.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="methode-dce">
          <div className="mx-auto max-w-4xl">
            <h2 id="methode-dce" className="font-display text-2xl font-bold text-slate-900">
              Méthode pas à pas
            </h2>
            <ol className="mt-8 space-y-8">
              {STEPS.map((step, i) => (
                <li key={step.name} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                    Étape {i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{step.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{step.text}</p>
                  <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 whitespace-pre-wrap">
                    {step.prompt}
                  </pre>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Cadrer une session sur vos DCE
            </h2>
            <p className="mt-3 text-blue-100">
              Prendre rendez-vous (30 min) — présentiel Île-de-France ensuite, sur vos dossiers.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="ia-analyse-dce-mid"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="confidentialite-dce">
          <div className="mx-auto max-w-4xl">
            <h2 id="confidentialite-dce" className="font-display text-2xl font-bold text-slate-900">
              Confidentialité : ne jamais déposer un DCE sensible dans une IA grand public
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Les dossiers d&apos;appel d&apos;offres contiennent des données clients, des prix et
              parfois des clauses confidentielles. Privilégiez un environnement adapté (compte
              professionnel type Claude Pro / offres entreprises), anonymisez les identifiants si
              besoin, et interdisez le dépôt « ouvert » sur des outils sans cadre. En formation, on
              pose ces règles avant le premier fichier.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="vers-memoire">
          <div className="mx-auto max-w-4xl">
            <h2 id="vers-memoire" className="font-display text-2xl font-bold text-slate-900">
              De l&apos;analyse au mémoire technique
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Une fois le DCE décortiqué, la suite logique est de structurer la réponse technique.
              Voir la méthode{' '}
              <Link href={LINKS.iaMemoireTechnique} className={OFC_LINK}>
                rédiger un mémoire technique BTP avec l&apos;IA
              </Link>
              . Pour le suivi terrain (autre workflow) :{' '}
              <Link href={LINKS.iaCompteRenduChantier} className={OFC_LINK}>
                comptes rendus de chantier avec l&apos;IA
              </Link>
              .
            </p>
          </div>
        </section>

        <FAQSection
          id="faq-analyse-dce"
          title="FAQ"
          subtitle="Analyser un DCE avec l'IA — réponses concrètes pour le BTP."
          items={FAQ_ITEMS}
        />

        <section className={OFC_SEC.muted} aria-labelledby="se-former-dce">
          <div className="mx-auto max-w-4xl">
            <h2 id="se-former-dce" className="font-display text-2xl font-bold text-slate-900">
              Se former
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Pour parcourir l&apos;offre présentiel IDF :{' '}
              <Link href={LINKS.formations} className={OFC_LINK}>
                catalogue des formations IA pour le BTP
              </Link>
              . Session ciblée appels d&apos;offres :{' '}
              <Link href={LINKS.formationAO} className={OFC_LINK}>
                formation IA appels d&apos;offres BTP (niveau 2)
              </Link>
              . {FINANCEMENT_FORMULATION_PRUDENTE}
            </p>
          </div>
        </section>

        <section className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Réserver un appel découverte
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              30 minutes pour cadrer votre besoin — formation en présentiel en Île-de-France.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="ia-analyse-dce-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
