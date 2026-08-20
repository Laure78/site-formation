import Image from 'next/image';
import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.guideRepondreAoBtpOfc2026;
const FILE_HREF = LINKS.pdfGuideRepondreAoBtpOfc2026;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-guide-repondre-ao-btp-ofc-2026-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-guide-repondre-ao-btp-ofc-2026-final');
const THUMB = RESSOURCES_MINIATURES.guideRepondreAo;

const META_TITLE = 'IA appels d’offres BTP : méthode en 5 étapes';
const META_DESCRIPTION =
  'Guide AO BTP 2026 : méthode 5 étapes, 4 prompts IA et contrôles. Formation IA appliquée au bâtiment, présentiel Île-de-France, Qualiopi — PDF gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Répondre à un AO BTP — méthode en 5 étapes (PDF 2026)',
  openGraphDescription: META_DESCRIPTION,
  image: {
    url: THUMB.src,
    width: THUMB.width,
    height: THUMB.height,
    alt: THUMB.alt,
  },
  keywords: [
    'répondre appel offres BTP',
    'méthode AO DCE',
    'mémoire technique IA',
    'Go No-Go marché public',
    'formation IA pour le BTP',
    'DPGF CCAP',
  ],
});

const ETAPES = [
  {
    title: '01 · Décoder le DCE',
    badge: '20 min',
    items: [
      'Les 8 informations à extraire en premier',
      'Pondération, clauses, postes oubliés',
      'Prompt IA pour accélérer la lecture',
    ],
  },
  {
    title: '02 · Décider Go ou No Go',
    badge: 'Grille 8 critères',
    items: [
      'N’engager 3 jours que sur les dossiers gagnables',
      'Réflexe rentabilité avant chiffrage',
      'Prompt pour formaliser l’avis Go / No-Go',
    ],
  },
  {
    title: '03 · Chiffrer juste',
    badge: '3 contrôles',
    items: [
      'DPGF croisée avec le CCTP',
      'Sujétions cachées',
      '5 clauses du CCAP qui rongent la marge',
    ],
  },
  {
    title: '04 · Rédiger le mémoire technique',
    badge: 'Valeur technique',
    items: [
      'Plan calé sur la grille de l’acheteur',
      'Spécifique au chantier, prouvé par des faits',
      'Prompt mémoire prêt à coller',
    ],
  },
  {
    title: '05 · Contrôler et remettre',
    badge: 'J-2 / J-1',
    items: [
      'Revue finale avec l’œil de l’évaluateur',
      'Dépôt à J-1 — jamais la dernière heure',
      'Check-list dossier AO à imprimer',
    ],
  },
] as const;

const EN_BREF = [
  'Méthode complète en 5 étapes, du DCE reçu à l’offre remise',
  '4 prompts IA prêts à copier + 6 contrôles non négociables sur les sorties IA',
  'Cadre réglementaire 2026 : seuils, avance, retenue, pénalités (sources citées)',
  'Check-list imprimable pour les 2–3 jours du dossier',
] as const;

const FAQ = [
  {
    q: 'Que contient le guide « Répondre à un appel d’offres dans le BTP » ?',
    a: 'Un PDF (~12 pages, éd. 2026) : méthode en 5 étapes (DCE, Go/No-Go, chiffrage, mémoire technique, remise), 4 prompts IA, cadre réglementaire vérifié au 29 juillet 2026, 6 contrôles sur les sorties IA et une check-list dossier.',
  },
  {
    q: 'Est-ce le même document que le guide du chargé d’affaires ?',
    a: 'Non. Le guide chargé d’affaires couvre 12 cas d’usage du DCE au DGD (situations, avenants, relances…). Celui-ci se concentre sur la réponse AO : méthode courte, contrôles et prompts pour remettre une offre solide.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment passer de la méthode à la pratique en formation ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, dispensées par un organisme certifié Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Répondre à un appel d’offres dans le BTP — méthode en 5 étapes (OFC 2026)',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Appels d’offres BTP' },
    { '@type': 'Thing', name: 'Analyse DCE et mémoire technique' },
    { '@type': 'Thing', name: 'IA generative marchés publics' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Dirigeants, chargés d’affaires et conducteurs de travaux BTP',
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
  image: `${SITE_CONFIG.url.replace(/\/$/, '')}${THUMB.src}`,
  associatedMedia: {
    '@type': 'MediaObject',
    contentUrl: FILE_URL,
    encodingFormat: 'application/pdf',
    name: 'guide-repondre-ao-btp-ofc-2026.pdf',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideRepondreAoBtpOfc2026Page() {
  return (
    <div>
      <JsonLd id="schema-guide-repondre-ao-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-repondre-ao-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-repondre-ao">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:items-center md:gap-12 md:py-16 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
              Ressource gratuite · PDF · Édition 2026
            </p>
            <h1
              id="hero-guide-repondre-ao"
              className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
            >
              Répondre à un appel d&apos;offres dans le BTP
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              La méthode en 5 étapes pour remettre une offre solide — DCE, Go/No-Go, chiffrage, mémoire
              technique, contrôles IA. Par Laure Olivié (OFC), formation IA pour le BTP.
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
          <figure className="mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl bg-white/95 p-1 shadow-[0_20px_48px_-16px_rgba(0,0,0,0.25)] ring-4 ring-white/30">
              <Image
                src={THUMB.src}
                alt={THUMB.alt}
                width={THUMB.width}
                height={THUMB.height}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 90vw, 520px"
                priority
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="en-bref-repondre-ao">
        <h2 id="en-bref-repondre-ao" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="cinq-etapes">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="cinq-etapes" className="font-display text-2xl font-bold text-slate-900">
            Les 5 étapes du guide
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Du dossier reçu à l&apos;offre remise : chaque étape a ses points de contrôle et son prompt.
            L&apos;IA accélère la lecture et la structuration — la responsabilité de l&apos;offre reste
            humaine.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ETAPES.map((etape) => (
              <li
                key={etape.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-base font-bold text-slate-900">{etape.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                  {etape.badge}
                </p>
                <ul className="mt-3 space-y-2">
                  {etape.items.map((item) => (
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
              Télécharger le guide AO BTP 2026
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="garde-fou-ia">
        <h2 id="garde-fou-ia" className="font-display text-2xl font-bold text-slate-900">
          Garde-fou : contrôler ce que l&apos;IA produit
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Une page dédiée rappelle six vérifications systématiques : sources des chiffres, articles
          cités, quantités (métré humain), références chantiers réelles, et tout ce qui engage
          l&apos;acte d&apos;engagement. L&apos;IA divise le temps de lecture d&apos;un DCE, pas la
          responsabilité de l&apos;offre.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-repondre-ao">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-repondre-ao" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-repondre-ao">
        <h2 id="cta-calendly-repondre-ao" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour appliquer la méthode sur vos vrais DCE, DPGF et mémoires en présentiel Île-de-France —
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
