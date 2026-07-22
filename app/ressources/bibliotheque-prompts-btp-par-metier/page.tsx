import Link from 'next/link';
import { Download, Calendar, Check, FileSpreadsheet } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const PATH = LINKS.bibliothequePromptsBtpParMetier;
const FILE_HREF = LINKS.xlsxBibliothequePromptsBtpParMetier;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-bibliotheque-prompts-btp-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-bibliotheque-prompts-btp-final');

const META_TITLE = 'Bibliothèque prompts BTP par métier';
const META_DESCRIPTION =
  'Bibliothèque prompts IA BTP par métier : Excel gratuit (dirigeant, CDT, BE, chantier). Formation IA pour le BTP Qualiopi, présentiel IDF. Téléchargez.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Bibliothèque prompts IA BTP par métier — Excel gratuit',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'prompts IA BTP',
    'prompts ChatGPT bâtiment',
    'bibliothèque prompts métier BTP',
    'formation IA pour le BTP',
    'prompts conducteur de travaux',
  ],
});

const METIERS = [
  {
    title: 'Dirigeant',
    items: ['Go / No-Go AO', 'Rentabilité prévisionnelle', 'Proposition commerciale'],
  },
  {
    title: 'Assistante travaux',
    items: ['CR de réunion', 'DICT / autorisations', 'Situation de travaux'],
  },
  {
    title: "Bureau d'études",
    items: ['Analyse de DCE', 'Postes oubliés du DQE', 'Exigences CCTP'],
  },
  {
    title: 'Conducteur de travaux',
    items: ['CR chantier', 'Relances sous-traitants', 'Reporting avancement'],
  },
  {
    title: 'Chef de chantier',
    items: ['Brief équipe', 'Points de contrôle', 'Signalement d’aléas'],
  },
] as const;

const FAQ = [
  {
    q: 'Que contient le fichier Excel ?',
    a: 'Une bibliothèque de prompts IA par métier BTP (~50 fiches) : onglets Dirigeant, Assistante travaux, Bureau d’études, Conducteur de travaux et Chef de chantier, plus un onglet « Toutes les fiches » et un mode d’emploi. Chaque ligne donne la mission, l’objectif, le prompt à coller et les variables à personnaliser.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le fichier est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Avec quels outils utiliser ces prompts ?',
    a: 'Ils fonctionnent avec ChatGPT, Claude ou un autre assistant conversationnel. Adaptez les variables entre crochets à votre chantier, puis relisez toujours le résultat avant envoi ou signature.',
  },
  {
    q: 'Comment passer de l’Excel à la pratique en entreprise ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, certifiées Qualiopi, finançables Constructys selon éligibilité. ${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Bibliothèque de prompts IA par métier — Entreprise BTP',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Spreadsheet',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Prompts IA BTP' },
    { '@type': 'Thing', name: 'ChatGPT bâtiment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Dirigeants, assistants, BET, conducteurs de travaux et chefs de chantier',
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
    encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'Bibliothèque_prompts_BTP_par_metier.xlsx',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function BibliothequePromptsBtpParMetierPage() {
  return (
    <div>
      <JsonLd id="schema-bibliotheque-prompts-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-bibliotheque-prompts-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-bibliotheque-prompts">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · Excel
          </p>
          <h1
            id="hero-bibliotheque-prompts"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Bibliothèque de prompts IA BTP par métier
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Excel prêt à l’emploi : ~50 prompts à copier-coller pour le bureau et le chantier — dirigeant,
            assistante travaux, bureau d’études, conducteur de travaux et chef de chantier. Par Laure Olivié
            (OFC), formation IA pour le BTP.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={FILE_HREF}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-slate-100"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger l’Excel
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="contenu-excel">
        <h2 id="contenu-excel" className="font-display text-2xl font-bold text-slate-900">
          Ce que contient le fichier
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Un onglet mode d’emploi, un onglet « Toutes les fiches », puis cinq onglets métier. Chaque fiche
          précise la mission, l’objectif, le prompt et les variables à personnaliser ([ACTIVITÉ], [CCTP],
          notes de réunion…).
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METIERS.map((metier) => (
            <li
              key={metier.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                <FileSpreadsheet className="h-5 w-5 text-[#377CF3]" aria-hidden />
                {metier.title}
              </p>
              <ul className="mt-3 space-y-2">
                {metier.items.map((item) => (
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

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="comment-utiliser">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="comment-utiliser" className="font-display text-2xl font-bold text-slate-900">
            Comment l’utiliser
          </h2>
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-base leading-relaxed text-slate-600">
            <li>Téléchargez le fichier Excel et ouvrez l’onglet de votre métier.</li>
            <li>Copiez le prompt, remplacez les variables entre crochets par vos données chantier.</li>
            <li>Collez dans ChatGPT ou Claude, puis relisez et validez avant tout envoi contractuel.</li>
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-500">
            L’IA aide à préparer et structurer : elle ne remplace ni le chiffrage, ni la validation métier,
            ni un conseil juridique.
          </p>
          <div className="mt-8">
            <a
              href={FILE_HREF}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger la bibliothèque Excel
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="faq-prompts">
        <h2 id="faq-prompts" className="font-display text-2xl font-bold text-slate-900">
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
      </section>

      <section className="border-t border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="aller-plus-loin">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="aller-plus-loin" className="font-display text-2xl font-bold text-slate-900">
            Aller plus loin
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Pour ancrer ces prompts dans vos documents réels en présentiel Île-de-France — Qualiopi,
            Constructys selon éligibilité.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <li>
              <Link href={LINKS.formations} className={OFC_LINK}>
                Catalogue formations IA pour le BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.guideAssistantsTravauxOfc} className={OFC_LINK}>
                Guide assistants travaux (PDF)
              </Link>
            </li>
            <li>
              <Link href={LINKS.guideConducteurTravauxIaBtp} className={OFC_LINK}>
                Guide conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href={LINKS.ressources} className={OFC_LINK}>
                Hub ressources
              </Link>
            </li>
          </ul>
          <a
            href={CALENDLY_FINAL}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Prendre un RDV découverte
          </a>
        </div>
      </section>
    </div>
  );
}
