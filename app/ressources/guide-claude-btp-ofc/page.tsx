import { CtaButton } from '@/components/CtaButton';
import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { SOCIAL_PROOF } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { formatProsFormesEtNoteQualiopi } from '@/lib/data/indicateurs-resultats-helpers';

const PATH = LINKS.guideClaudeBtpOfc;
const FILE_HREF = LINKS.pdfGuideClaudeBtpOfc;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;

const META_TITLE = 'Guide Claude BTP : Projets, Skills, MCP';
const META_DESCRIPTION =
  'Guide PDF Claude BTP : Projets, Skills, MCP, Cowork pour l’admin chantier. Formation IA appliquée au bâtiment, présentiel Île-de-France, Qualiopi — gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Guide Claude BTP OFC — Projets, Skills, MCP (PDF gratuit)',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'guide Claude BTP',
    'Claude AI bâtiment',
    'Projets Claude Skills MCP',
    'formation IA pour le BTP',
    'Cowork Claude chantier',
    'administratif BTP IA',
  ],
});

const CHAPITRES = [
  {
    title: 'Les Projets Claude',
    items: [
      'Espace qui connaît votre entreprise',
      'Instructions + documents de référence',
      '5 Projets types : AO, devis, chantier, admin, RH',
    ],
  },
  {
    title: 'Connecteurs (MCP)',
    items: [
      'Drive, mail, agenda, Sheets / Excel',
      'Veille data.gouv.fr',
      'Relances MOA sans copier-coller',
    ],
  },
  {
    title: 'Skills & instructions',
    items: [
      'Analyse DCE / CCTP, CR, mémoire, devis',
      'Instructions système permanentes',
      'Templates prêts à coller',
    ],
  },
  {
    title: 'Cas d’usage & Cowork',
    items: [
      'Répondre à un AO en 2 h (méthode)',
      '5 devis dictés + CR chantier',
      'Bonus 2026 : Cowork, tâches planifiées',
    ],
  },
] as const;

const PLAN_5_JOURS = [
  { jour: 'Lundi', action: 'Projet « Appels d’offres » + meilleur mémoire déposé' },
  { jour: 'Mardi', action: 'Instructions système (template du guide)' },
  { jour: 'Mercredi', action: 'Activer un Skill (CR ou analyse CCTP) sur un cas réel' },
  { jour: 'Jeudi', action: 'Connecteur mail : synthèse fil MOA + relance' },
  { jour: 'Vendredi', action: 'Cowork : confier une tâche répétitive' },
] as const;

const FAQ = [
  {
    q: 'Que contient le Guide Claude BTP OFC ?',
    a: 'Un guide pratique édition 2026 (~8 pages) : Projets Claude, connecteurs MCP, Skills, instructions système, 3 cas d’usage chantier (AO, devis dictés, CR) et un plan d’action sur 5 jours — plus les nouveautés Cowork 2026.',
  },
  {
    q: 'Est-ce le même contenu que le guide conducteur de travaux ou les assistants travaux ?',
    a: 'Non. Ce guide explique comment installer l’environnement Claude (Projets, Skills, MCP, Cowork). Les autres PDF traitent des missions métier (CR, DOE, PPSPS…) ou des packs tutos. Pas de doublon : chacun a un rôle distinct.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment aller plus loin après le guide ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, dispensées par un organisme certifié Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProsFormesEtNoteQualiopi()}`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Guide pratique Claude BTP OFC — Débloquer le vrai potentiel de Claude',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  datePublished: '2026-07-01',
  about: [
    { '@type': 'Thing', name: 'Claude AI BTP' },
    { '@type': 'Thing', name: 'Projets Claude Skills MCP' },
    { '@type': 'Thing', name: 'Administratif chantier IA' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType:
      'Dirigeants de PME BTP, conducteurs de travaux, chargés d’affaires et équipes administratives',
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
    name: 'Guide-Claude-BTP-OFC.pdf',
  },
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${CANONICAL}#howto`,
  name: 'Installer un environnement Claude calé sur le BTP en 5 jours',
  description:
    'Plan du guide OFC : Projets, instructions système, Skills, connecteurs mail, puis Cowork — trente minutes par jour.',
  totalTime: 'P5D',
  step: PLAN_5_JOURS.map((item, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: item.jour,
    text: item.action,
  })),
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideClaudeBtpOfcPage() {
  return (
    <div>
      <JsonLd id="schema-guide-claude-btp-learning" schema={learningResourceJsonLd} />
      <JsonLd id="schema-guide-claude-btp-howto" schema={howToJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-claude-btp-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-claude-btp">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · PDF · Édition 2026
          </p>
          <h1
            id="hero-guide-claude-btp"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Guide Claude BTP — débloquer le vrai potentiel de Claude
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Ce que Claude permet vraiment pour l’administratif des chantiers : Projets, connecteurs MCP,
            Skills, instructions système, cas d’usage et Cowork. Par Laure Olivié (OFC), formation IA pour
            le BTP.
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
            <CtaButton origin="ressources-guide-claude-btp-ofc-hero" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="pour-qui">
        <h2 id="pour-qui" className="font-display text-2xl font-bold text-slate-900">
          À qui s’adresse ce guide
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Dirigeants de PME du bâtiment et des travaux publics, conducteurs de travaux, chargés
          d’affaires et équipes administratives. Aucune compétence technique requise : un abonnement
          Claude Pro suffit pour appliquer la méthode. L’IA produit le premier jet ; le professionnel
          valide le fond.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="contenu-guide">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="contenu-guide" className="font-display text-2xl font-bold text-slate-900">
            Au programme du PDF
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Pas un catalogue de prompts magiques : une méthode pour installer, une fois pour toutes, un
            environnement Claude calé sur DCE, devis, CR de chantier, relances et mémoires techniques.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CHAPITRES.map((chapitre) => (
              <li
                key={chapitre.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-lg font-bold text-slate-900">{chapitre.title}</p>
                <ul className="mt-3 space-y-2">
                  {chapitre.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="plan-5-jours">
        <h2 id="plan-5-jours" className="font-display text-2xl font-bold text-slate-900">
          Plan d’action sur 5 jours
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Trente minutes par jour. Ordre recommandé du guide : Projets → instructions système → Skills →
          connecteurs → Cowork.
        </p>
        <ol className="mt-6 max-w-3xl space-y-3">
          {PLAN_5_JOURS.map((item) => (
            <li
              key={item.jour}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="w-20 shrink-0 font-semibold text-[#377CF3]">{item.jour}</span>
              <span>{item.action}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <a
            href={FILE_HREF}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
          >
            <Download className="h-4 w-4" aria-hidden />
            Télécharger le Guide Claude BTP
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-guide-claude">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-guide-claude" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-claude">
        <h2 id="cta-calendly-claude" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour installer Projets et Skills sur vos dossiers réels en présentiel Île-de-France — Qualiopi,
          Constructys selon éligibilité.
        </p>
        <CtaButton origin="ressources-guide-claude-btp-ofc-final" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]" />
      </section>
    </div>
  );
}
