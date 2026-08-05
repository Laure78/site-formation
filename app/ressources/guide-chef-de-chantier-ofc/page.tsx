import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.guideChefDeChantierOfc;
const FILE_HREF = LINKS.pdfGuideChefDeChantierOfc;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-guide-chef-de-chantier-ofc-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-guide-chef-de-chantier-ofc-final');

const META_TITLE = 'Guide chef de chantier : 6 skills Claude';
const META_DESCRIPTION =
  'Guide chef de chantier : 6 skills Claude (accueil, rapport, appro, réserves). Formation IA pour le BTP, présentiel Île-de-France, Qualiopi — PDF gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Guide du chef de chantier OFC — 6 skills Claude (PDF)',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'guide chef de chantier',
    'IA chantier BTP',
    'rapport journalier Claude',
    'accueil sécurité chantier',
    'formation IA pour le BTP',
    'ChatGPT BTP terrain',
  ],
});

const SKILLS = [
  {
    title: '01 · Accueil sécurité au poste',
    badge: 'IA · 5 min',
    items: ['Fiche personnalisée', 'Double émargement', 'Sortie Word imprimable'],
  },
  {
    title: '02 · Mode opératoire / fiche de tâche',
    badge: 'MIXTE · 10 min',
    items: ['Déroulé étape par étape', 'Risques / parades', 'Points d’arrêt qualité'],
  },
  {
    title: '03 · Quart d’heure sécurité',
    badge: 'IA · 5 min',
    items: ['Causerie prête à animer', 'Questions équipe', 'Feuille d’émargement'],
  },
  {
    title: '04 · Rapport journalier de chantier',
    badge: 'IA · 5 min',
    items: ['Dictée + photos', 'Aléas horodatés', 'Word pour le conducteur'],
  },
  {
    title: '05 · Demande d’approvisionnement',
    badge: 'IA · 3 min',
    items: ['Désignation + quantité', 'Date à pied d’œuvre', 'Contraintes livraison'],
  },
  {
    title: '06 · Auto-contrôle & levée de réserves',
    badge: 'MIXTE · 15 min',
    items: ['Critères CCTP', 'Photos avant / après', 'Statut de levée'],
  },
] as const;

const PHASES = [
  'Phase 1 — Démarrage : accueil sécurité, mode opératoire',
  'Phase 2 — Exécution : causerie, rapport journalier, appro',
  'Phase 3 — Contrôle : auto-contrôle et levée de réserves terrain',
] as const;

const FAQ = [
  {
    q: 'Que contient le Guide du chef de chantier ?',
    a: 'Un PDF (~18 pages) : 6 skills Claude pensés pour le téléphone (dictée, photos, Word) — accueil sécurité, mode opératoire, quart d’heure sécurité, rapport journalier, demande d’appro, auto-contrôle & levée de réserves — avec prompts à monter une fois sur ordinateur puis à utiliser sur le chantier.',
  },
  {
    q: 'Est-ce le même guide que celui du conducteur de travaux ?',
    a: 'Non. Le guide conducteur cible DCE, PPSPS, CR, DOE côté pilotage. Celui-ci vise le terrain quotidien du chef de chantier : sécurité, journal, appro et contrôles depuis le téléphone.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment monter ces skills sur vos vrais chantiers ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, certifiées Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Le Guide du chef de chantier — OFC Création d’Entreprise',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Chef de chantier BTP' },
    { '@type': 'Thing', name: 'Skills Claude chantier' },
    { '@type': 'Thing', name: 'Rapport journalier et sécurité terrain' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Chefs de chantier, encadrement terrain et conducteurs de travaux BTP',
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
    name: 'guide-chef-de-chantier-ofc.pdf',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideChefDeChantierOfcPage() {
  return (
    <div>
      <JsonLd id="schema-guide-chef-de-chantier-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-chef-de-chantier-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-chef-chantier">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · PDF
          </p>
          <h1
            id="hero-guide-chef-chantier"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Le Guide du chef de chantier
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            6 outils Claude pour tenir le chantier au quotidien depuis le téléphone — démarrage,
            exécution, contrôle. Vous dictez, vous photographiez, Claude sort le document. Par Laure
            Olivié (OFC), formation IA pour le BTP.
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="six-skills">
        <h2 id="six-skills" className="font-display text-2xl font-bold text-slate-900">
          Les 6 skills terrain
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Chaque tuto : ce qui se délègue à l’IA, ce qui reste MIXTE (votre œil terrain valide), le
          prompt à monter une fois sur ordinateur, puis l’usage quotidien au téléphone. Objectif
          indicatif du guide : récupérer du temps de bureau sans quitter le chantier.
        </p>
        <DisclaimerGains className="mt-4 max-w-3xl" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <li
              key={skill.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="font-display text-base font-bold text-slate-900">{skill.title}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                {skill.badge}
              </p>
              <ul className="mt-3 space-y-2">
                {skill.items.map((item) => (
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

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="phases-chantier">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="phases-chantier" className="font-display text-2xl font-bold text-slate-900">
            Organisé selon la chronologie du chantier
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Chaque tuto est autonome : allez directement à celui dont vous avez besoin aujourd’hui.
            Sur le téléphone : dictée, photos dans la conversation, Word partagé au conducteur ou au
            bureau.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {PHASES.map((phase) => (
              <li
                key={phase}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                {phase}
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
              Télécharger le Guide du chef de chantier
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="mode-telephone">
        <h2 id="mode-telephone" className="font-display text-2xl font-bold text-slate-900">
          Claude dans la poche : le mode chantier
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Les skills se créent une fois sur claude.ai (ordinateur). Sur le chantier, l’app mobile
          suffit : dictez, ajoutez vos photos, activez la création de fichiers pour recevoir le Word
          directement sur le téléphone. L’IA met en forme — votre signature et votre coup d’œil
          restent humains.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-chef-chantier">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-chef-chantier" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-chef">
        <h2 id="cta-calendly-chef" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour monter ces skills sur vos vrais documents de chantier en présentiel Île-de-France —
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
