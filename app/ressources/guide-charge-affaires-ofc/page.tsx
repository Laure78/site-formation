import { Download, Calendar, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.guideChargeAffairesOfc;
const FILE_HREF = LINKS.pdfGuideChargeAffairesOfc;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${FILE_HREF}`;
const CALENDLY_HERO = buildSiteCalendlyCtaUrl('ressources-guide-charge-affaires-ofc-hero');
const CALENDLY_FINAL = buildSiteCalendlyCtaUrl('ressources-guide-charge-affaires-ofc-final');

const META_TITLE = 'IA chargé d’affaires BTP : 12 cas Claude';
const META_DESCRIPTION =
  'PDF chargé d’affaires BTP : 12 cas Claude (DCE, mémoire, DPGF, DGD). Formation IA pour le BTP en Île-de-France, Qualiopi — téléchargement PDF gratuit.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: 'Guide chargé d’affaires BTP × IA — 12 cas Claude (PDF)',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'guide chargé affaires BTP',
    'IA appels offres',
    'mémoire technique Claude',
    'DPGF devis BTP',
    'formation IA pour le BTP',
    'DCE Go No-Go',
  ],
});

const PARTIES = [
  {
    title: '01 · Répondre & chiffrer',
    badge: '4 cas d’usage',
    items: [
      'Analyser un DCE + décision Go / No-Go',
      'Rédiger le mémoire technique',
      'Chiffrer la DPGF / le devis',
      'Comparer les offres sous-traitants & fournisseurs',
    ],
  },
  {
    title: '02 · Exécuter & facturer',
    badge: '4 cas d’usage',
    items: [
      'Établir la situation de travaux',
      'Rédiger un avenant / travaux supplémentaires',
      'Relancer & recouvrer les impayés',
      'Rédiger un CR de rendez-vous client',
    ],
  },
  {
    title: '03 · Clôturer, piloter & développer',
    badge: '4 cas d’usage',
    items: [
      'Boucler le DGD + bilan de marge',
      'Piloter la marge avec un tableau de bord',
      'Rédiger une fiche référence chantier',
      'Relancer un prospect / suivi commercial',
    ],
  },
] as const;

const EN_BREF = [
  '12 cas d’usage Claude AI du DCE au solde du DGD',
  'Prompts à copier : mémoire, DPGF, situations, avenants, relances',
  'Méthode prompt en 7 briques + règles de confidentialité marchés publics',
  'Tuto pour créer vos compétences Claude réutilisables par affaire',
] as const;

const FAQ = [
  {
    q: 'Que contient le Guide du chargé d’affaires × IA ?',
    a: 'Un PDF (~30 pages, éd. juillet 2026) : 12 cas d’usage avec prompts Claude, gains de temps indicatifs, veille CCAG-Travaux 2021 / délais de paiement 2026, limites et validation humaine. De l’analyse DCE au DGD et au suivi commercial.',
  },
  {
    q: 'Est-ce le même guide que celui du conducteur de travaux ?',
    a: 'Non. Le guide conducteur cible CR, PPSPS, DOE et pilotage chantier. Celui-ci vise l’affaire commerciale : réponse AO, chiffrage, situations, avenants, trésorerie et marge.',
  },
  {
    q: 'Faut-il s’inscrire pour télécharger ?',
    a: 'Non. Le PDF est gratuit et téléchargeable immédiatement depuis cette page, sans inscription.',
  },
  {
    q: 'Comment monter ces usages en formation ?',
    a: `Laure Olivié (OFC Création d’Entreprise) anime des sessions de formation IA pour le BTP en présentiel Île-de-France, dispensées par un organisme certifié Qualiopi, avec financement OPCO possible selon éligibilité (Constructys). ${formatProfessionalsTrainedCount()} pros formés, note .`,
  },
] as const;

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Le Guide du chargé d’affaires BTP × IA — OFC Création d’Entreprise',
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Chargé d’affaires BTP' },
    { '@type': 'Thing', name: 'Appels d’offres et mémoire technique' },
    { '@type': 'Thing', name: 'IA generative affaires BTP' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Chargés d’affaires, conducteurs de travaux et dirigeants PME BTP',
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
    name: 'guide-charge-affaires-ofc.pdf',
  },
};

const faqSchema = getFAQSchema(FAQ);

export default function GuideChargeAffairesOfcPage() {
  return (
    <div>
      <JsonLd id="schema-guide-charge-affaires-learning" schema={learningResourceJsonLd} />
      {faqSchema ? <JsonLd id="schema-guide-charge-affaires-faq" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-charge-affaires">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Ressource gratuite · PDF
          </p>
          <h1
            id="hero-guide-charge-affaires"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl"
          >
            Le Guide du chargé d&apos;affaires BTP × IA
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            12 cas d&apos;usage Claude pour piloter une affaire, du DCE au DGD : mémoire technique,
            DPGF, situations, avenants, relances. L&apos;IA propose, vous validez — par Laure Olivié
            (OFC), formation IA pour le BTP.
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="en-bref-charge-affaires">
        <h2 id="en-bref-charge-affaires" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="trois-parties">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="trois-parties" className="font-display text-2xl font-bold text-slate-900">
            Les 3 parties du guide
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Chaque cas d&apos;usage précise le gain de temps indicatif, le prompt à coller et le livrable
            attendu. Objectif : récupérer du temps rédactionnel pour la négociation, le client et la
            marge.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              Télécharger le Guide chargé d&apos;affaires × IA
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="validation-charge-affaires">
        <h2 id="validation-charge-affaires" className="font-display text-2xl font-bold text-slate-900">
          Validation humaine &amp; confidentialité
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Tout document d&apos;affaire (prix, mémoire, avenant, situation, DGD) engage l&apos;entreprise :
          chaque sortie Claude est un brouillon avancé à relire. Le guide rappelle aussi les règles
          de confidentialité (RC, marges, plans payants) et la vérification des sources sur les
          montants et textes contractuels.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="faq-charge-affaires">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="faq-charge-affaires" className="font-display text-2xl font-bold text-slate-900">
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

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16" aria-labelledby="cta-calendly-charge-affaires">
        <h2 id="cta-calendly-charge-affaires" className="font-display text-2xl font-bold text-slate-900">
          Passer à la pratique en formation
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Pour installer ces cas d&apos;usage sur vos vrais DCE et affaires en présentiel Île-de-France —
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
