import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.guideRhBtpIaOfc;
const FILE_HREF = LINKS.pdfGuideRhBtpIaOfc;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-guide-rh-btp-ia-ofc-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-guide-rh-btp-ia-ofc-final');

const META_TITLE = 'Guide RH BTP : 18 cas d’usage IA';
const META_DESCRIPTION =
  'Guide RH BTP : 18 cas d’usage IA (recrutement, onboarding, droit social). Formation IA pour les pros du BTP, présentiel Île-de-France, Qualiopi — PDF gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Guide RH du BTP × IA OFC — 18 cas d’usage (PDF)',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'guide RH BTP',
    'IA recrutement bâtiment',
    'fiche de poste Claude',
    'onboarding BTP',
    'formation IA pour le BTP',
    'droit social BTP IA',
  ],
});

const PARTIES = [
  {
    title: '01 · Recruter',
    badge: '5 cas d’usage',
    items: [
      'Fiche de poste & offre d’emploi',
      'Scoring CV anonymisé',
      'Trame d’entretien métier BTP',
      'Promesse d’embauche & réponses candidats',
    ],
  },
  {
    title: '02 · Intégrer & monter en compétence',
    badge: '4 cas d’usage',
    items: [
      'Parcours d’onboarding / livret d’accueil',
      'Plan de formation Constructys',
      'Entretiens annuels & EPP',
      'Cartographie des compétences (GEPP)',
    ],
  },
  {
    title: '03 · Gérer, sécuriser & communiquer',
    badge: '6 cas d’usage',
    items: [
      'Assistant droit social BTP',
      'Courriers RH & procédures internes',
      'Marque employeur & FAQ salariés',
      'Reporting RH (turnover, bilan social)',
    ],
  },
  {
    title: '04 · Former, piloter, automatiser',
    badge: '3 cas d’usage',
    items: [
      'Supports de formation interne',
      'KPI RH & tableaux de bord',
      'Assistant RH sur-mesure (compétences Claude)',
    ],
  },
] as const;

const EN_BREF = [
  '18 cas d’usage Claude / ChatGPT pour le service RH d’une PME BTP',
  'De la fiche de poste au bilan social — prompts prêts à coller',
  'Règles RGPD, AI Act 2026 et veille réglementaire RH',
  'Annexe : 11 compétences RH à créer + 5 prompts avancés',
] as const;

const FAQ = [
  {
    q: 'Que contient le Guide RH du BTP × IA ?',
    a: 'Un PDF (~36 pages, éd. juillet 2026) : 18 cas d’usage (recruter, intégrer, gérer, piloter) avec prompts à coller dans Claude ou ChatGPT, règles RGPD, veille réglementaire RH 2026, tableau des gains de temps et annexes pour créer vos compétences IA RH.',
  },
  {
    q: 'Est-ce le même guide que celui du dirigeant BTP ?',
    a: 'Non. Le guide dirigeant couvre six leviers de pilotage (Go/No-Go, marge, litiges, recrutement…). Celui-ci cible le service RH au quotidien : fiches de poste, CV, onboarding, droit social BTP, reporting et formation interne.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment monter ces usages RH en formation ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, dispensées par un organisme certifié Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProfessionalsTrainedCount()} pros formés, note .`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Le Guide RH du BTP × IA — OFC Création d’Entreprise',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'RH BTP' },
    { '@type': 'Thing', name: 'Recrutement et onboarding bâtiment' },
    { '@type': 'Thing', name: 'IA generative service RH PME' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'RH, responsables administratifs et dirigeants de PME BTP',
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
    name: 'guide-rh-btp-ia-ofc.pdf',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideRhBtpIaOfcPage() {
  return (
    <div>
      <JsonLd id="schema-guide-rh-btp-ia-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-rh-btp-ia-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-rh-btp">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · PDF
          </p>
          <h1
            id="hero-guide-rh-btp"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Le Guide RH du BTP × IA
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            18 cas d’usage Claude et ChatGPT pour le service RH d’une PME du BTP — de la fiche de
            poste au bilan social. L’IA propose, vous validez. Par Laure Olivié (OFC), formation IA
            pour le BTP.
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
            <a
              href={CALENDLY_HERO}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              RDV découverte formation
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="en-bref-rh">
        <h2 id="en-bref-rh" className="font-display text-2xl font-bold text-slate-900">
          En bref
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {EN_BREF.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <DisclaimerGains className="mt-6 max-w-3xl" />
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="quatre-parties">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="quatre-parties" className="font-display text-2xl font-bold text-slate-900">
            Les 4 parties du guide
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Chaque cas d’usage précise le gain de temps indicatif, le prompt à coller et le livrable
            attendu. Objectif : récupérer du temps rédactionnel pour le consacrer aux personnes et au
            climat social.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {PARTIES.map((partie) => (
              <li
                key={partie.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-base font-bold text-slate-900">{partie.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                  {partie.badge}
                </p>
                <ul className="mt-3 space-y-2">
                  {partie.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
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
              Télécharger le Guide RH du BTP × IA
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="rgpd-rh">
        <h2 id="rgpd-rh" className="font-display text-2xl font-bold text-slate-900">
          RGPD &amp; supervision humaine
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Le guide rappelle les trois règles non négociables en RH : jamais de données nominatives
          sensibles dans un prompt, CV anonymisés avant analyse, décision finale humaine. En 2026,
          l’IA en recrutement est un système à haut risque au sens de l’AI Act : transparence et
          supervision restent de votre côté.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-rh-btp">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-rh-btp" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-rh">
        <h2 id="cta-calendly-rh" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour installer ces cas d’usage RH sur vos vrais documents en présentiel Île-de-France —
          Qualiopi, Constructys selon éligibilité.
        </p>
        <a
          href={CALENDLY_FINAL}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
        >
          <Calendar className="h-4 w-4" aria-hidden />
          Prendre un RDV découverte
        </a>
      </section>
    </div>
  );
}
