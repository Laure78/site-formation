import Link from 'next/link';
import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  FAQ_GUIDE_ASSISTANTS_TRAVAUX,
  GUIDE_ASSISTANTS_TRAVAUX_H1,
  GUIDE_ASSISTANTS_TRAVAUX_PATH,
  GUIDE_ASSISTANTS_TRAVAUX_PDF_PATH,
  MISSIONS_ASSISTANTS_TRAVAUX,
  type MissionAssistantTag,
} from '@/lib/guide-assistants-travaux-content';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const PATH = GUIDE_ASSISTANTS_TRAVAUX_PATH;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-guide-assistants-travaux-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-guide-assistants-travaux-final');

/** Title ≤ 65 car. */
const META_TITLE = 'Guide assistants travaux IA — 12 missions | Laure Olivié';
/** Meta ≤ 160 car. + expression clé formation IA */
const META_DESCRIPTION =
  'Guide PDF gratuit : 12 missions d’assistant travaux (PPSPS, CR, DOE, DGD) outillées à l’IA. Formation IA pour le BTP Qualiopi, Île-de-France.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PATH,
  keywords: [
    'guide assistant travaux BTP',
    'IA administratif chantier',
    'formation IA pour le BTP',
    'skills Claude BTP',
    'PPSPS CR DOE DGD',
    'assistant gestion travaux',
  ],
  openGraphType: 'article',
  openGraphTitle: 'Guide des Assistants Travaux — 12 missions IA (PDF gratuit)',
  openGraphDescription:
    'De la prise en main du marché au DGD : missions classées IA / mixte / humain, prompts Claude et checklist de contrôle.',
  appendAuthorSuffix: false,
});

const TAG_STYLES: Record<MissionAssistantTag, string> = {
  IA: 'bg-[#377CF3] text-white',
  MIXTE: 'bg-[#D4E3FC] text-[#377CF3]',
  HUMAIN: 'bg-[#F2F2F2] text-[#666666]',
};

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Guide des Assistants Travaux OFC — 12 missions de marché outillées à l’IA',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  about: [
    { '@type': 'Thing', name: 'Assistant travaux BTP' },
    { '@type': 'Thing', name: 'IA appliquée au bâtiment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Assistants travaux, assistants de gestion et encadrement PME BTP',
  },
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
  associatedMedia: {
    '@type': 'MediaObject',
    contentUrl: `${SITE_CONFIG.url.replace(/\/$/, '')}${GUIDE_ASSISTANTS_TRAVAUX_PDF_PATH}`,
    encodingFormat: 'application/pdf',
    name: 'Le Guide des Assistants Travaux OFC (PDF)',
  },
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${CANONICAL}#howto`,
  name: 'Créer un skill Claude pour une mission d’assistant travaux',
  description:
    'Méthode du guide OFC : identifier les tâches HUMAIN, créer le skill avec le prompt fourni, alimenter la matière, vérifier avec la checklist, puis signer.',
  totalTime: 'PT1D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Repérer les tâches HUMAIN',
      text: 'Sur la fiche mission, identifiez ce qui ne se délègue jamais (signature, constat terrain, arbitrage).',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Créer le skill avec le prompt',
      text: 'Collez le prompt Claude fourni dans le guide et adaptez le rôle à votre entreprise.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fournir la matière',
      text: 'Alimentez le skill avec vos pièces marché, trames et notes (ce que « Vous fournissez »).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Vérifier avant signature',
      text: 'Passez la checklist de contrôle (3 à 5 min) : factuel, technique, contractuel, diffusion.',
    },
  ],
};

export default function GuideAssistantsTravauxOfcPage() {
  const faqSchema = getFAQSchema([...FAQ_GUIDE_ASSISTANTS_TRAVAUX]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <JsonLd id="schema-guide-assistants-learning" schema={learningResourceJsonLd} />
      <JsonLd id="schema-guide-assistants-howto" schema={howToJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-assistants-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-assistants">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
            PDF gratuit · OFC Qualiopi · {formatProfessionalsTrainedCount()} pros formés · note{' '}
            {SOCIAL_PROOF.AVERAGE_RATING}
          </p>
          <h1
            id="hero-guide-assistants"
            className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.35rem]"
          >
            {GUIDE_ASSISTANTS_TRAVAUX_H1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/95">
            Là où se gagne la marge de vos marchés : les 12 missions administratives d&apos;un marché de travaux, tous
            corps d&apos;état — et comment construire, avec l&apos;IA, les skills qui allègent votre bureau.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={GUIDE_ASSISTANTS_TRAVAUX_PDF_PATH}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              <Download className="h-5 w-5 shrink-0" aria-hidden />
              Télécharger le guide (PDF)
            </a>
            <a
              href={CALENDLY_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF]"
            >
              <Calendar className="h-5 w-5 shrink-0" aria-hidden />
              Visio découverte formation
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F8FAFC] py-10" aria-labelledby="ce-que-vous-trouvez">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="ce-que-vous-trouvez" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Ce que vous y trouverez
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Les 12 missions d’exécution, de la prise en main du marché au DGD',
              'Pour chacune : ce qui se délègue, ce que vous fournissez, ce que vous obtenez',
              'Le prompt Claude prêt à coller + un aperçu du livrable',
              'Checklist de contrôle avant signature (3 à 5 min)',
              'FAQ responsabilité, confidentialité et rythme de déploiement',
              'Piste formation OFC pour construire vos skills sur vos documents',
            ].map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2">
            <p className="text-sm leading-relaxed text-slate-600">
              Gains de temps d&apos;encadrement illustrés dans le PDF (ordre de grandeur observé) — toujours avec
              relecture humaine.
            </p>
            <DisclaimerGains />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16" aria-labelledby="missions-heading">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="missions-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les 12 missions outillées
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Fil d&apos;un marché de travaux du point de vue de l&apos;entreprise qui exécute. Chaque mission est
            décomposée en tâches IA, MIXTE ou HUMAIN dans le PDF.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONS_ASSISTANTS_TRAVAUX.map((mission, index) => (
              <li
                key={mission.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${TAG_STYLES[mission.tag]}`}
                  >
                    {mission.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{mission.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{mission.hint}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-guide-assistants">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="faq-guide-assistants" className="font-display text-2xl font-bold text-slate-900">
            FAQ
          </h2>
          <dl className="mt-8 space-y-6">
            {FAQ_GUIDE_ASSISTANTS_TRAVAUX.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 md:py-16" aria-labelledby="aller-plus-loin">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="aller-plus-loin" className="font-display text-2xl font-bold text-slate-900">
            Aller plus loin
          </h2>
          <ul className="mt-6 flex flex-col gap-3 text-base text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li>
              <Link href={LINKS.formationIaAssistanteGestionBtp} className={OFC_LINK}>
                Formation IA assistante de gestion BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationIaAssistanteBtp} className={OFC_LINK}>
                Formation IA assistante administrative BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.guideConducteurTravauxIaBtp} className={OFC_LINK}>
                Guide conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href={LINKS.ressources} className={OFC_LINK}>
                Tous les guides et tutos Ressources
              </Link>
            </li>
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={GUIDE_ASSISTANTS_TRAVAUX_PDF_PATH}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#377CF3] bg-white px-6 py-3.5 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger le PDF
            </a>
            <a
              href={CALENDLY_FINAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2d66d6]"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Prendre un rendez-vous découverte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
