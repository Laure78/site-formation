import { CtaButton } from '@/components/CtaButton';
import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { SOCIAL_PROOF } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { formatProsFormesEtNoteQualiopi } from '@/lib/data/indicateurs-resultats-helpers';

const PATH = LINKS.guideDirigeantBtpOfc;
const FILE_HREF = LINKS.pdfGuideDirigeantBtpOfc;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;

const META_TITLE = 'Guide dirigeant BTP : 6 leviers IA';
const META_DESCRIPTION =
  'Guide PDF dirigeant BTP : 6 leviers IA (Go/No-Go, marge, litiges, RH) + 24 prompts. Formation IA pour le BTP, présentiel Île-de-France, Qualiopi — gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Guide du dirigeant BTP OFC — 6 leviers + 24 prompts (PDF)',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'guide dirigeant BTP',
    'IA pilotage PME bâtiment',
    'Go No-Go appel d’offres',
    'formation IA pour le BTP',
    'prompts Claude direction BTP',
    'rentabilité chantier IA',
  ],
});

const LEVIERS = [
  {
    title: '01 · Go / No-Go sur appel d’offres',
    items: ['Grille à 9 critères', 'Score /100 + reco', 'Décision finale humaine'],
  },
  {
    title: '02 · Clauses à risque',
    items: ['Extraction CCAP / CCAG', 'Impact chiffré', 'Questions de mise au point'],
  },
  {
    title: '03 · Rentabilité & trésorerie',
    items: ['Vendu / réalisé', 'Dérives de marge', 'Consolidation multi-chantiers'],
  },
  {
    title: '04 · Réclamation & juridique',
    items: ['Mémoire en réclamation', 'Impayés', 'Mise en demeure structurée'],
  },
  {
    title: '05 · Tableau de bord direction',
    items: ['Synthèse multi-chantiers', 'Alertes prioritaires', 'Décisions urgentes'],
  },
  {
    title: '06 · Recrutement & marque employeur',
    items: ['Annonces qui convertissent', 'Tri de candidatures', 'Approche candidats'],
  },
] as const;

const PROMPT_RUBRIQUES = [
  'A · Appels d’offres & Go/No-Go',
  'B · Marchés & contrats',
  'C · Rentabilité & trésorerie',
  'D · Réclamations & litiges',
  'E · Pilotage & reporting',
  'F · Recrutement & équipes',
] as const;

const FAQ = [
  {
    q: 'Que contient le Guide du dirigeant BTP ?',
    a: 'Un PDF (~20 pages) : les 6 leviers de pilotage d’une PME BTP (Go/No-Go, clauses, rentabilité, réclamations, tableau de bord, recrutement), chacun avec tâches IA / mixte / humain, prompt Claude et aperçu de livrable — plus une base de 24 prompts ponctuels classés par rubrique.',
  },
  {
    q: 'Est-ce le même contenu que la bibliothèque Excel prompts par métier ?',
    a: 'Non. Ce guide cible la direction (leviers de décision + skills à installer). L’Excel couvre des prompts métier bureau/chantier. Complémentaires, pas en doublon.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment former toute la direction ensuite ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, dispensées par un organisme certifié Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProsFormesEtNoteQualiopi()}`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Le Guide du Dirigeant BTP — OFC Création d’Entreprise',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Dirigeant PME BTP' },
    { '@type': 'Thing', name: 'Pilotage chantier IA' },
    { '@type': 'Thing', name: 'Go/No-Go appels d’offres' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Dirigeants et directions de PME du bâtiment et des travaux publics',
  },
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.aPropos}`,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
  associatedMedia: {
    '@type': 'MediaObject',
    contentUrl: FILE_URL,
    encodingFormat: 'application/pdf',
    name: 'Guide_Dirigeant_BTP_OFC.pdf',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideDirigeantBtpOfcPage() {
  return (
    <div>
      <JsonLd id="schema-guide-dirigeant-btp-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-dirigeant-btp-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-dirigeant">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · PDF
          </p>
          <h1
            id="hero-guide-dirigeant"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Le Guide du dirigeant BTP
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Là où se joue la rentabilité de vos chantiers : 6 leviers de pilotage — du tri des appels
            d’offres au recrutement — et comment construire, avec Claude, vos propres skills de
            direction. Par Laure Olivié (OFC), formation IA pour le BTP.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={FILE_HREF}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-slate-100"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger le PDF
            </a>
            <CtaButton origin="ressources-guide-dirigeant-btp-ofc-hero" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              RDV découverte formation
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="six-leviers">
        <h2 id="six-leviers" className="font-display text-2xl font-bold text-slate-900">
          Les 6 leviers outillés
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Pour chaque levier : ce qui se délègue à l’IA, ce qui reste MIXTE ou HUMAIN, le prompt Claude
          prêt à coller, la matière à fournir et le livrable obtenu. Objectif indicatif du guide :
          récupérer du temps de direction sur les décisions récurrentes.
        </p>
        <DisclaimerGains className="mt-4 max-w-3xl" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVIERS.map((levier) => (
            <li
              key={levier.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="font-display text-base font-bold text-slate-900">{levier.title}</p>
              <ul className="mt-3 space-y-2">
                {levier.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="prompts-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="prompts-24" className="font-display text-2xl font-bold text-slate-900">
            Base de 24 prompts ponctuels
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            En complément des skills permanents : 24 prompts à copier-coller, classés par rubrique et
            badgés par fonction (DG, BE, FIN, JUR, EXP, RH).
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROMPT_RUBRIQUES.map((rubrique) => (
              <li
                key={rubrique}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                {rubrique}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href={FILE_HREF}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger le Guide du dirigeant
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="limites-ia">
        <h2 id="limites-ia" className="font-display text-2xl font-bold text-slate-900">
          Les 5 limites à connaître
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Claude n’est ni juriste, ni économiste, ni signataire. Le guide rappelle hallucinations
          juridiques, données datées, interdiction de chiffrage final / signature, confidentialité des
          dossiers et responsabilité du dirigeant. L’IA structure et prépare — la décision reste
          humaine.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-dirigeant">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-dirigeant" className="font-display text-2xl font-bold text-slate-900">
            FAQ
          </h2>
          <dl className="mt-6 max-w-3xl space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <MaillageRessourceFromConfig
        config={getMaillageRessourceConfig(PATH)!}
        currentPath={PATH}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-dirigeant">
        <h2 id="cta-calendly-dirigeant" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour caler ces skills sur vos vrais dossiers en présentiel Île-de-France — Qualiopi,
          Constructys selon éligibilité.
        </p>
        <CtaButton origin="ressources-guide-dirigeant-btp-ofc-final" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
        >
          <Calendar className="h-4 w-4" aria-hidden />
          Prendre un RDV découverte
        </CtaButton>
      </section>
    </div>
  );
}
