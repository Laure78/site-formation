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

const PATH = '/ia-memoire-technique-btp';

const META_TITLE = "Mémoire technique BTP avec l'IA";
const META_DESCRIPTION =
  "Rédigez un mémoire technique BTP gagnant avec l'IA : plan, méthodologie, moyens et références structurés. Vous validez le contenu. Présentiel IDF. RDV gratuit.";

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-07-14',
    modifiedTime: '2026-07-14',
    author: 'Laure Olivié',
    section: 'Méthode IA BTP',
  },
  keywords: [
    'mémoire technique IA BTP',
    'rédiger mémoire technique ChatGPT',
    'mémoire technique appel offres IA',
    'Claude mémoire technique bâtiment',
  ],
});

const STEPS = [
  {
    name: 'Analyser la pondération et les attentes du RC',
    text: "Identifiez les critères d'attribution et leur poids avant de rédiger.",
    prompt:
      "À partir de ce règlement de consultation, liste les critères d'attribution, leur pondération et ce que l'évaluateur attend concrètement dans le mémoire technique. Tableau : critère | poids | preuves attendues.",
  },
  {
    name: 'Construire le plan aligné sur les critères',
    text: "Le plan du mémoire suit la grille du RC — pas un modèle générique hors-sol.",
    prompt:
      "Propose un plan de mémoire technique BTP aligné sur ces critères [coller]. Pour chaque section : objectif, volume indicatif, preuves à fournir. Interdiction des titres marketing vides.",
  },
  {
    name: 'Rédiger méthodologie / moyens humains et matériels',
    text: "L'IA accélère la rédaction ; vous injectez vos vrais moyens et contraintes chantier.",
    prompt:
      "Rédige les sections Méthodologie d'exécution, Moyens humains et Moyens matériels pour le lot [X]. Entreprise : [profil]. Contraintes : [liste]. Ton professionnel BTP, pas de superlatifs. Marque [À COMPLÉTER] partout où tu manques d'info réelle.",
  },
  {
    name: 'Intégrer références et cas similaires',
    text: "Vos références restent factuelles : l'IA aide à les formuler et à les lier aux critères.",
    prompt:
      "À partir de ces références chantier [liste factuelle], rédige 3 fiches courtes liées aux critères du RC. N'invente aucune référence, date, montant ou maître d'ouvrage.",
  },
  {
    name: "Relire à l'œil de l'évaluateur",
    text: "Faites challenger le mémoire comme le ferait un lecteur du marché.",
    prompt:
      "Tu es évaluateur d'un marché public BTP. Note ce mémoire section par section (1–5) selon le RC, liste les faiblesses et propose 5 corrections concrètes. Ne réécris pas tout le document.",
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "L'IA peut-elle écrire tout un mémoire technique ?",
    a: "Non. Elle assiste : structure, reformule et accélère. Les moyens, références et engagements restent les vôtres après validation. Un mémoire entièrement généré sans contrôle est un risque commercial et juridique.",
  },
  {
    q: 'Comment éviter un mémoire générique / hors-sol ?',
    a: "Partez du RC et de votre analyse DCE, injectez vos vraies références et vos contraintes chantier, et exigez que l'IA marque clairement les zones à compléter. Relisez toujours « à l'œil de l'évaluateur ».",
  },
  {
    q: "L'IA aide-t-elle à noter mon offre avant remise ?",
    a: "Oui, en mode critique : vous demandez une grille de notation alignée sur le RC. C'est un outil de relecture, pas une garantie de succès.",
  },
  {
    q: 'Combien de temps gagne-t-on sur un mémoire technique ?',
    a: "Selon la complexité du marché, l'IA réduit souvent la phase de trame et de premier jet — la finalisation métier reste indispensable. Les gains varient selon vos process.",
  },
  {
    q: 'Quelle formation pour rédiger des mémoires avec l\'IA ?',
    a: `La formation IA appels d'offres BTP travaille la méthode en présentiel sur vos dossiers. ${FINANCEMENT_FORMULATION_PRUDENTE}`,
  },
];

export default function IaMemoireTechniqueBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <>
      <SchemaHowTo
        name="Rédiger un mémoire technique BTP avec l'IA"
        description="Méthode en 5 étapes pour structurer et rédiger un mémoire technique d'appel d'offres BTP avec l'IA, sous validation métier."
        totalTime="PT2H"
        steps={STEPS.map((s) => ({ name: s.name, text: `${s.text} Prompt type : ${s.prompt}` }))}
      />
      {faqSchema ? <JsonLd id="schema-ia-memoire-technique-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Rédiger un mémoire technique avec l&apos;IA (BTP)
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Le mémoire technique fait souvent la différence à la note. L&apos;IA aide à structurer
              et rédiger ; l&apos;expertise, les moyens et les références restent humains — vous
              validez tout avant remise.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="ia-fait-ne-fait-pas">
          <div className="mx-auto max-w-4xl">
            <h2 id="ia-fait-ne-fait-pas" className="font-display text-2xl font-bold text-slate-900">
              Ce que l&apos;IA fait (et ne fait pas) sur un mémoire technique
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Elle <strong>structure</strong> le plan, <strong>reformule</strong> et{' '}
              <strong>accélère</strong> le premier jet. Elle <strong>n&apos;invente pas</strong> vos
              moyens ni vos références. Cette page explique la <em>méthode</em> ; la formation vend
              la session présentiel sur vos dossiers (voir bloc « Se former »).
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="methode-memoire">
          <div className="mx-auto max-w-4xl">
            <h2 id="methode-memoire" className="font-display text-2xl font-bold text-slate-900">
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
              Travailler vos mémoires en présentiel
            </h2>
            <p className="mt-3 text-blue-100">
              Appel découverte gratuit — puis session en Île-de-France sur vos AO réels.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="ia-memoire-mid"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="lien-analyse-dce">
          <div className="mx-auto max-w-4xl">
            <h2 id="lien-analyse-dce" className="font-display text-2xl font-bold text-slate-900">
              Le lien avec l&apos;analyse du DCE
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Un bon mémoire part d&apos;une analyse solide des pièces. Voir la méthode{' '}
              <Link href={LINKS.iaAnalyseDce} className={OFC_LINK}>
                analyser un DCE avec l&apos;IA
              </Link>{' '}
              avant de rédiger.
            </p>
          </div>
        </section>

        <FAQSection
          id="faq-memoire-technique"
          title="FAQ"
          subtitle="Mémoire technique et IA — ce qu'il faut savoir avant de générer."
          items={FAQ_ITEMS}
        />

        <section className={OFC_SEC.muted} aria-labelledby="se-former-memoire">
          <div className="mx-auto max-w-4xl">
            <h2 id="se-former-memoire" className="font-display text-2xl font-bold text-slate-900">
              Se former
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Pour enchaîner analyse DCE et mémoire en atelier :{' '}
              <Link href={LINKS.formationAO} className={OFC_LINK}>
                formation IA appels d&apos;offres BTP (niveau 2)
              </Link>
              . Vue d&apos;ensemble :{' '}
              <Link href={LINKS.formations} className={OFC_LINK}>
                catalogue des formations IA pour le BTP
              </Link>
              . Voir aussi la{' '}
              <Link href={LINKS.formationChargeAffairesBtp} className={OFC_LINK}>
                formation IA pour chargés d&apos;affaires BTP
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
              30 minutes pour cadrer votre besoin — présentiel Île-de-France.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="ia-memoire-footer"
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
