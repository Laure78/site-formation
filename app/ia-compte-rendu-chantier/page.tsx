import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { SchemaHowTo } from '@/components/seo/SchemaHowTo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

export const revalidate = 3600;

const PATH = '/ia-compte-rendu-chantier';

const META_TITLE = 'Compte rendu de chantier avec l\'IA | Laure Olivié';
/** 151 car. — brief à 162, allégée pour ≤160 */
const META_DESCRIPTION =
  "Rédigez vos comptes rendus de chantier avec l'IA à partir de notes ou d'une dictée : méthode et prompts BTP. Vous validez. Présentiel IDF. RDV gratuit.";

const pageMetadataBase = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-07-14',
    modifiedTime: '2026-07-14',
    author: 'Laure Olivié',
    section: 'Méthode IA BTP',
  },
  keywords: [
    'compte rendu chantier IA',
    'CR chantier ChatGPT',
    'rédiger CR chantier Claude',
    'compte rendu réunion de chantier IA',
  ],
});

export const metadata: Metadata = {
  ...pageMetadataBase,
  title: { absolute: META_TITLE },
  alternates: {
    ...pageMetadataBase.alternates,
    canonical: PATH,
  },
};

const STEPS = [
  {
    name: "Capter l'info (notes, dictée)",
    text: 'Notes brutes, dictée vocale transcrite ou puces prises en réunion : l’important est de capturer l’essentiel sans rédiger au propre sur place.',
    prompt:
      'Tu es assistant conducteur de travaux. Voici mes notes brutes de réunion de chantier : [coller]. Trie : faits, décisions, points ouverts, risques. N’invente rien.',
  },
  {
    name: "Structurer par lot / corps d'état",
    text: 'Le CR devient lisible quand chaque sujet est rangé par lot ou intervenant.',
    prompt:
      'Structure ce compte rendu de chantier par lot / corps d’état. Format : titre lot, avancement, points bloquants, prochaine échéance. Vocabulaire BTP, phrases courtes.',
  },
  {
    name: 'Reprendre les points non soldés',
    text: 'Les points ouverts d’une réunion précédente doivent réapparaître jusqu’à clôture documentée.',
    prompt:
      'Compare ce CR avec la liste des points non soldés précédente : [liste]. Indique soldé / en cours / reporté. Signale tout point oublié dans les notes du jour.',
  },
  {
    name: 'Formuler les actions (qui / quoi / quand)',
    text: 'Chaque action a un responsable et une date — sinon le CR ne pilote rien.',
    prompt:
      'Transforme les décisions en plan d’actions : Qui | Quoi | Quand | Comment vérifier. Si une info manque, écris [À COMPLÉTER] — n’invente pas de nom ni de date.',
  },
  {
    name: 'Relire et diffuser',
    text: 'Vous relisez, signez le sens métier, puis diffusez (PDF, mail, GED).',
    prompt:
      'Relis ce CR avant envoi à la MOE : clair, factuel, sans jugement, actions traçables. Liste 5 corrections de formulation. Ne change pas les faits.',
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'Peut-on faire un CR à partir d\'une note vocale ?',
    a: 'Oui. Vous dictez ou déposez une transcription, puis l’IA structure le document. Vous validez les faits, les responsabilités et les dates avant diffusion.',
  },
  {
    q: 'L\'IA invente-t-elle des informations ?',
    a: 'Elle peut « combler » si le prompt est flou. La règle : fournir des notes réelles, interdire l’invention, et valider chaque action (qui / quoi / quand) avant envoi.',
  },
  {
    q: 'Est-ce adapté aux réunions de chantier MOE ?',
    a: 'Oui, à condition d’une trame claire (lots, décisions, points non soldés) et d’une relecture par la personne responsable du suivi. L’IA accélère la rédaction ; la responsabilité du compte rendu reste humaine.',
  },
  {
    q: 'Combien de temps gagne-t-on sur un CR de chantier ?',
    a: 'Beaucoup d’équipes passent de plusieurs heures de mise au propre à une relecture courte — selon la qualité des notes. Les gains varient ; la validation reste obligatoire.',
  },
  {
    q: 'Quelle formation pour automatiser les CR de chantier ?',
    a: `Le catalogue formations IA pour le BTP couvre les cas chantier en présentiel en Île-de-France. ${FINANCEMENT_FORMULATION_PRUDENTE}`,
  },
];

export default function IaCompteRenduChantierPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <>
      <SchemaHowTo
        name="Rédiger un compte rendu de chantier avec l'IA"
        description="Méthode en 5 étapes pour transformer notes ou dictée en compte rendu de chantier structuré, sous validation métier."
        totalTime="PT20M"
        steps={STEPS.map((s) => ({ name: s.name, text: `${s.text} Prompt type : ${s.prompt}` }))}
      />
      {faqSchema ? <JsonLd id="schema-ia-cr-chantier-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: LINKS.home },
                { label: 'Compte rendu de chantier avec l\'IA', href: PATH },
              ]}
            />
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Rédiger ses comptes rendus de chantier avec l&apos;IA
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Trois à cinq heures par semaine perdues sur les CR : l&apos;IA transforme des notes
              brutes en document clair. Vous validez et signez le sens métier avant diffusion —
              cette page est la méthode transactionnelle, pas un article de blog.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="comment-ia-cr">
          <div className="mx-auto max-w-4xl">
            <h2 id="comment-ia-cr" className="font-display text-2xl font-bold text-slate-900">
              Comment l&apos;IA rédige un CR de chantier ?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              <strong>
                Rédiger un compte rendu de chantier avec l&apos;IA, c&apos;est passer de notes ou
                d&apos;une dictée à un document structuré (faits, décisions, actions), sous
                validation humaine avant envoi.
              </strong>
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Le flux type : capture terrain → structuration par lot → points non soldés → plan
              d&apos;actions → relecture → diffusion. L&apos;outil accélère ; le responsable de
              chantier reste garant du contenu.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="methode-cr">
          <div className="mx-auto max-w-4xl">
            <h2 id="methode-cr" className="font-display text-2xl font-bold text-slate-900">
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
              Former vos équipes chantier à cette méthode
            </h2>
            <p className="mt-3 text-blue-100">
              Appel découverte gratuit — sessions présentiel Île-de-France sur vos cas réels.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="ia-cr-chantier-mid"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="aller-plus-loin-cr">
          <div className="mx-auto max-w-4xl">
            <h2 id="aller-plus-loin-cr" className="font-display text-2xl font-bold text-slate-900">
              Aller plus loin
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Pour des exemples d&apos;usages terrain et le panorama des cas ChatGPT côté chantier,
              lire l&apos;article{' '}
              <Link href={LINKS.blog5CasUsageChatgptBtp} className={OFC_LINK}>
                5 cas d&apos;usage ChatGPT pour le BTP
              </Link>
              . Cette page reste la porte d&apos;entrée <strong>méthode + formation</strong> — distincte
              du guide métier conducteur et des tutos PDF, et complémentaire de l&apos;article
              informationnel sur l&apos;automatisation des CR.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Côté appels d&apos;offres (autre famille de documents) :{' '}
              <Link href={LINKS.iaAnalyseDce} className={OFC_LINK}>
                analyser un DCE avec l&apos;IA
              </Link>
              .
            </p>
          </div>
        </section>

        <FAQSection
          id="faq-cr-chantier"
          title="FAQ"
          subtitle="Comptes rendus de chantier et IA — validation métier obligatoire."
          items={FAQ_ITEMS}
        />

        <section className={OFC_SEC.muted} aria-labelledby="se-former-cr">
          <div className="mx-auto max-w-4xl">
            <h2 id="se-former-cr" className="font-display text-2xl font-bold text-slate-900">
              Se former
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Parcourir le{' '}
              <Link href={LINKS.formations} className={OFC_LINK}>
                catalogue des formations IA pour le BTP
              </Link>{' '}
              (présentiel Île-de-France). Pour le métier chantier, voir aussi la{' '}
              <Link href={LINKS.formationConducteurTravaux} className={OFC_LINK}>
                formation IA conducteur de travaux
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
                campaign="ia-cr-chantier-footer"
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
