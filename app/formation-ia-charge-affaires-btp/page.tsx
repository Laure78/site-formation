import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_AVANCE_HT } from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';

const PATH = '/formation-ia-charge-affaires-btp';

const SEO_TITLE = 'Formation IA Chargé d\'Affaires BTP | Devis, AO, Mémoire Technique';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '');

/** Course — GEO / rich results (complète la FAQ et le fil d’Ariane). */
const COURSE_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Formation IA pour Chargé d\'Affaires BTP',
  description:
    'Formation ChatGPT et Claude AI pour chargés d\'affaires BTP : pré-chiffrage devis, mémoire technique, analyse DCE, relances prospects, argumentaires prix. Qualiopi. Financement possible selon éligibilité.',
  provider: {
    '@type': 'Organization',
    name: "OFC Création d'Entreprise",
    sameAs: BASE_URL,
    url: BASE_URL,
  },
  instructor: {
    '@type': 'Person',
    name: 'Laure Olivié',
    jobTitle: 'Formatrice IA pour le BTP',
    sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: String(TARIF_FORFAIT_AVANCE_HT),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: buildSiteCalendlyCtaUrl('formation-ia-charge-affaires-btp-schema-offer'),
  },
  timeRequired: 'PT4H',
  educationalLevel: 'Advanced',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['onsite'],
    location: {
      '@type': 'Place',
      name: 'Île-de-France',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
    },
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Chargé d\'affaires BTP',
  },
};

/** BreadcrumbList — Accueil → Formations → page courante */
const BREADCRUMB_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: `${BASE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Formations',
      item: `${BASE_URL}/formations`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Formation IA chargé d\'affaires',
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description:
    'Formation ChatGPT et Claude AI pour chargés d\'affaires BTP : devis plus rapides, mémoire technique gagnant, relances prospects. Qualiopi. RDV gratuit.',
  path: PATH,
  keywords: [
    'formation IA chargé d\'affaires BTP',
    'ChatGPT devis BTP',
    'IA mémoire technique',
    'IA avant-vente bâtiment',
  ],
  openGraphType: 'article',
  appendAuthorSuffix: false,
  article: {
    publishedTime: '2026-04-17',
    modifiedTime: '2026-04-17',
    author: 'Laure Olivié',
    section: 'Formation IA appliquée au bâtiment',
  },
  image: {
    url: '/images/og/formation-ia-charge-affaires-btp.png',
    width: 1200,
    height: 630,
    alt: 'Formation IA pour chargés d\'affaires BTP — devis, appels d\'offres, avant-vente',
  },
});

const PROMPT_PRECHIFFRAGE = `Tu es chargé d'affaires pour une entreprise de [spécialité BTP] en France.
Voici le descriptif sommaire du client pour [type de chantier] :
[Collez le descriptif — même flou]
Génère un pré-chiffrage structuré avec :

Liste des postes à prévoir (DPGF sommaire par corps d'état)
Quantités estimées (unité + valeur indicative) avec hypothèses explicites
Prix unitaires moyens constatés en Île-de-France en 2026
Total HT approximatif, fourchette basse/haute
Liste des 5 questions à poser au client avant devis définitif

Format tableau. Précise toujours les hypothèses prises.`;

const PROMPT_MEMOIRE_AO = `Marché : [objet], maître d'ouvrage [nom], lot [numéro + intitulé].
Entreprise : [nom], [CA annuel], [effectif], [3 références comparables].
Génère la trame de mémoire technique en 5 sections :

Méthodologie d'exécution (phasage, points de vigilance)
Moyens humains affectés (profils, pas de noms)
Moyens matériels (liste, propres vs location)
Démarche QSE (PPSPS, PAQ, PAE sommaire)
Planning directeur Gantt à préciser

Pour chaque section, 200-300 mots exploitables.
Ton : professionnel, pas commercial. Pas de superlatifs.
Les critères d'attribution du marché sont : [lister critères DCE].
Oriente le contenu pour maximiser le score sur ces critères.`;

const PROMPT_RELANCE = `Prospect : [fonction] chez [entreprise BTP], rencontré le [date] au sujet de [projet].
Devis envoyé le [date], valeur [€ HT], aucun retour depuis [X jours].
Concurrence pressentie : [2-3 noms éventuels].
Rédige une séquence de 3 emails de relance espacés de 5-7 jours :
Email 1 (J+10) : relance douce, valeur ajoutée (ex : lien vers une ressource pertinente)
Email 2 (J+17) : relance ciblée, 1 question ouverte sur son hésitation
Email 3 (J+25) : break-up email pro (vous fermez le dossier sauf retour)
Chaque email : 80-120 mots max. Pas de "j'espère que vous allez bien".
Ton : direct, respectueux du temps du prospect, centré sur son intérêt.`;

const FAQ_ITEMS = [
  {
    q: 'Peut-on chiffrer un devis BTP avec ChatGPT en toute confidentialité ?',
    a: "Oui, avec ChatGPT Team ou Claude Enterprise, ou en anonymisant les données sensibles (noms, adresses, montants exacts). La formation couvre les trois options pour travailler sans exposer vos dossiers.",
  },
  {
    q: "L'IA peut-elle rédiger un mémoire technique qui remporte des AO publics ?",
    a: "Elle ne remplace pas votre expertise : elle produit une trame personnalisée et des sections exploitables en quelques heures au lieu de plusieurs jours. La valeur différenciante — références, moyens réels, cohérence prix/méthode — reste la vôtre après relecture et validation.",
  },
  {
    q: 'Comment l\'IA aide-t-elle à augmenter le taux de transformation des devis BTP ?',
    a: "En réduisant le délai de réponse (effet fraîcheur) et en systématisant les relances. Une grande partie des dossiers se joue après le premier envoi : relancer proprement et vite augmente le taux de signature sans alourdir la charge.",
  },
  {
    q: "Peut-on utiliser l'IA pour analyser la DPGF d'un AO public ?",
    a: "Oui. Claude AI est particulièrement performant pour lire des DPGF Excel volumineuses (200 lignes et plus) et en extraire les postes stratégiques, les écarts de quantités et les points de vigilance pour votre chiffrage.",
  },
  {
    q: "L'IA connaît-elle les seuils des marchés publics français (MAPA, procédure formalisée) ?",
    a: "Oui : les seuils 2026 sont intégrés dans les contenus de formation (notamment 40 k€ HT, 90 k€ HT et références européennes selon les typologies de marchés). Un récap à jour est fourni en session.",
  },
  {
    q: 'Comment former un chargé d\'affaires déjà bien outillé (CRM, Excel, template mémoire) ?',
    a: "La formation complète l'outillage existant sans le remplacer. L'IA s'insère dans votre workflow — nous travaillons sur vos modèles, vos grilles et vos exemples de mémoires pour gagner du temps sans tout reconstruire.",
  },
];

const SOMMAIRE = [
  { href: '#goulot', label: 'Le chargé d\'affaires BTP est un goulot d\'étranglement commercial' },
  { href: '#cycle-vente', label: 'Ce que l\'IA fait dans un cycle de vente BTP' },
  { href: '#usages', label: 'Les 8 usages commerciaux les plus impactants' },
  { href: '#prompts', label: '3 prompts prêts à l\'emploi' },
  { href: '#resultats', label: 'Gains mesurés : taux de transformation et temps/AO' },
  { href: '#programme', label: 'Programme catalogue : BTP-02 (appels d\'offre, avancé)' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: 'FAQ chargés d\'affaires' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA commercial gratuit' },
];

export default function FormationIaChargeAffairesBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={COURSE_JSON_LD} id="jsonld-course-charge-affaires" />
      {faqSchema ? <JsonLd data={faqSchema} id="jsonld-faq-charge-affaires" /> : null}
      <JsonLd data={BREADCRUMB_JSON_LD} id="jsonld-breadcrumb-charge-affaires" />

      <nav className="mb-8 text-sm text-slate-600" aria-label="Fil d'Ariane">
        <Link href="/" className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA chargé d&apos;affaires</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour Chargé d&apos;Affaires BTP —{' '}
          <span className="text-[#377CF3]">Transformez 2x plus d&apos;appels d&apos;offres</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Laure Olivié · OFC Création d&apos;Entreprise · Qualiopi · Finançable Constructys
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            Un chargé d&apos;affaires BTP consacre 25 à 35 % de son temps à produire des devis et des
            mémoires techniques. Avec l&apos;IA, il divise ce temps par 5 et augmente son taux de
            transformation sur les appels d&apos;offres de 20 à 40 %. Formation certifiée{' '}
            <strong>Qualiopi</strong>, éligible <strong>Constructys</strong>.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[#377CF3] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="goulot" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le chargé d&apos;affaires BTP est un goulot d&apos;étranglement commercial
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le chargé d&apos;affaires porte la pression du chiffre : devis, dossiers d&apos;appel
            d&apos;offres, relances et négociation. Sur une semaine de 40 h, il consacre souvent{' '}
            <strong>10 à 14 h à l&apos;avant-vente</strong> (production commerciale, pas l&apos;exécution
            chantier) — soit environ <strong>25 à 35 % du temps</strong> sur des livrables qui
            conditionnent directement le carnet de commandes.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Trois douleurs reviennent systématiquement en entreprise — et ce ne sont pas des sujets de
            compte rendu de réunion ou de CCTP opérationnel (réservés au conducteur de travaux sur le
            terrain) :
          </p>
          <ul className="mt-4 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Devis quantitatifs.</strong> Chiffrer proprement avec DPGF et hypothèses claires
                prend souvent 2 à 4 h par dossier — alors que le client attend vite une fourchette ou une
                réponse à un AO.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Mémoires techniques.</strong> Les plis publics ou exigeants absorbent 2 à 3 jours,
                et beaucoup de mémoires se ressemblent : peu différenciants au regard des critères de
                notation.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Relances prospects.</strong> Faute de temps, les séquences de suivi ne partent pas —
                alors qu&apos;une partie du potentiel de CA se joue après le premier envoi, quand le
                prospect est encore chaud.
              </span>
            </li>
          </ul>
        </section>

        <section id="cycle-vente" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que l&apos;IA fait dans un cycle de vente BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            De la prospection au closing, l&apos;IA accélère la production de contenus structurés et la
            lecture de documents lourds — toujours sous votre validation.
          </p>
          <ul className="mt-6 space-y-3 list-disc pl-6 text-slate-700 leading-relaxed">
            <li>
              <strong>Prospection :</strong> qualifier un contact, rédiger un message LinkedIn ou un email
              froid adapté à un décideur BTP (chantier, contraintes, ton pro).
            </li>
            <li>
              <strong>Qualification :</strong> lire un CCTP ou un extrait de DCE et en tirer les trois
              points clés pour une décision GO / NO GO commerciale (charge, risques, positionnement prix).
            </li>
            <li>
              <strong>Chiffrage :</strong> produire une DPGF préremplie ou un pré-chiffrage à partir d&apos;un
              descriptif, avec hypothèses explicites et fourchettes.
            </li>
            <li>
              <strong>Mémoire technique :</strong> générer la trame et les sections attendues — méthode,
              moyens, références, QSE, planning — alignées sur les critères d&apos;attribution.
            </li>
            <li>
              <strong>Relance :</strong> enchaîner trois emails espacés adaptés au cycle long BTP, sans ton
              insistant ni formules creuses.
            </li>
            <li>
              <strong>Closing :</strong> répondre aux objections récurrentes (« c&apos;est trop cher », « on
              attend d&apos;autres devis ») avec un argumentaire court et des propositions d&apos;ajustement
              crédibles.
            </li>
          </ul>
          <blockquote className="mt-8 rounded-xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
            <p className="font-medium text-slate-900">
              Réservez votre diagnostic IA commercial gratuit — 30 minutes en visio.
            </p>
            <a
              href={buildSiteCalendlyCtaUrl('formation-ia-charge-affaires-btp-contact-rdv-page-calendly')}
              className="mt-2 inline-block font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre rendez-vous →
            </a>
          </blockquote>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Les 8 usages commerciaux les plus impactants
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Pré-chiffrage rapide</strong> à partir d&apos;un descriptif — 30 min → 5 min.
            </li>
            <li>
              <strong>Trame de mémoire technique personnalisée</strong> — 2 jours → 3 h.
            </li>
            <li>
              <strong>Analyse GO / NO GO d&apos;un DCE</strong> avec angle commercial : scoring de
              rentabilité et de charge vendable (vs faisabilité purement opérationnelle côté conducteur de
              travaux) — 1 h 30 → 10 min.
            </li>
            <li>
              <strong>Séquence de trois emails de relance</strong> — 30 min par séquence → 3 min.
            </li>
            <li>
              <strong>Lettre d&apos;offre commerciale structurée</strong> — 1 h → 10 min.
            </li>
            <li>
              <strong>Variante d&apos;optimisation technique</strong> (justification pour ajuster prix et
              marge) — 2 h → 20 min.
            </li>
            <li>
              <strong>Préparation d&apos;un RDV commercial</strong> (contexte prospect, questions à poser) —
              45 min → 10 min.
            </li>
            <li>
              <strong>Argumentaire de closing sur objection prix</strong> — 30 min → 5 min.
            </li>
          </ol>
        </section>

        <section id="prompts" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">3 prompts prêts à l&apos;emploi</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — Pré-chiffrage rapide à partir d&apos;un descriptif client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_PRECHIFFRAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Trame de mémoire technique AO public BTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_MEMOIRE_AO}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 3 — Séquence de 3 emails de relance prospect BTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RELANCE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains mesurés — données formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA pour chargé d&apos;affaires BTP</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Usage commercial</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Pré-chiffrage devis', '2-3 h', '20-30 min', '−85 %'],
                  ['Mémoire technique complet', '2-3 jours', '3-4 h', '−85 %'],
                  ['Séquence de relances prospect', '30 min/email', '3 min/email', '−90 %'],
                  ['Analyse GO/NO GO (scoring rentabilité)', '1h30', '10 min', '−90 %'],
                  ['Lettre d\'offre commerciale', '1 h', '10 min', '−85 %'],
                  ['Variante d\'optimisation technique', '2 h', '20 min', '−85 %'],
                  ['Préparation RDV commercial', '45 min', '10 min', '−78 %'],
                  ['Argumentaire objection prix', '30 min', '5 min', '−85 %'],
                ].map(([u, sans, avec, gain]) => (
                  <tr key={u as string}>
                    <td className="border border-slate-200 p-3">{u}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Au-delà du temps gagné, les chargés d&apos;affaires formés par OFC rapportent une augmentation
            moyenne de leur taux de transformation sur les AO de{' '}
            <strong>+20 à +40 % dans les 3 mois</strong> — grâce à la qualité des mémoires techniques, à la
            vitesse de réponse, et à la systématisation des relances.
          </p>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programme catalogue : formation BTP-02
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Formation BTP-02 — IA et appels d&apos;offres BTP : avancé
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Référence : BTP-02 · Avancé · 4 h · {TARIF_FORFAIT_AVANCE_HT} € HT/session ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Axée sur les <strong>AO publics</strong> : analyse de DCE, lecture CCTP, mémoire technique,
            cohérence avec la DPGF et critères d&apos;attribution.
          </p>

          <p className="mt-6 font-medium text-slate-900">Les formations se déroulent exclusivement en présentiel, en Île-de-France :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              En <strong>intra</strong> dans vos locaux (Île-de-France)
            </li>
            <li>
              En <strong>inter</strong> en Île-de-France (Paris, Versailles, Nanterre, Créteil)
            </li>
          </ul>
          <p className="mt-6">
            <a
              href="https://www.laureolivie.fr/formations"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir les programmes détaillés →
            </a>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys 2026</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Entreprise</th>
                  <th className="border border-slate-200 p-3 font-semibold">Coût pédagogique</th>
                  <th className="border border-slate-200 p-3 font-semibold">Salaires</th>
                  <th className="border border-slate-200 p-3 font-semibold">Max intra/jour</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 p-3">&lt; 11 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">15 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3">11 à 50 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">10 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Condition :</strong> demande déposée sur eGestion (services.constructys.fr) au minimum
            15 jours avant la formation. OFC accompagne chaque client dans la constitution du dossier.
          </p>
          <p className="mt-4">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Guide complet du financement Constructys
            </Link>
            {' · '}
            <Link
              href="/blog/dossier-constructys-2026-etapes"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Monter son dossier en 20 min
            </Link>
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ chargés d&apos;affaires</h2>
          <dl className="mt-8 space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Laure Olivié est formatrice IA et ChatGPT pour les entreprises du bâtiment et des travaux
            publics. Elle a dirigé ALIA BTP pendant sept ans : en tant que dirigeante, elle a porté la
            relation commerciale au quotidien — signatures de devis, réponses à des appels d&apos;offres,
            négociations avec les donneurs d&apos;ordre et arbitrages prix / risques.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Cette expérience « avant-vente » complète sa connaissance du terrain : elle forme les chargés
            d&apos;affaires sur des cas concrets (DCE, mémoires, relances) avec des prompts calibrés pour
            le cycle de vente BTP, pas pour un discours générique sur l&apos;IA.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-800">
            +{formatProfessionalsTrainedCount()} professionnels formés · Note {SOCIAL_PROOF.AVERAGE_RATING} · Certifiée
            Qualiopi · LinkedIn Learning · FFB Grand Paris · FFB Île-de-France · CSFE · CNAM IDF
          </p>
          <p className="mt-4">
            <Link href="/a-propos" className="font-semibold text-[#377CF3] underline hover:no-underline">
              Voir le parcours complet →
            </Link>
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Articles liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href="/blog/chatgpt-devis-btp-methode-2026" className="text-[#377CF3] underline">
                ChatGPT pour générer un devis BTP : méthode pas à pas (2026)
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-memoire-technique-appel-offres-guide-2026" className="text-[#377CF3] underline">
                Mémoire technique BTP avec l&apos;IA : le guide complet pour gagner vos appels d&apos;offres
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-memoire-technique-appel-offres-guide-2026" className="text-[#377CF3] underline">
                Comment rédiger un mémoire technique BTP avec l&apos;IA — Guide complet 2026
              </Link>
            </li>
            <li>
              <Link href="/formations/ia-appels-offre-btp" className="text-[#377CF3] underline">
                Formation « Répondre aux appels d&apos;offres avec l&apos;IA »
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-dirigeant-btp" className="text-[#377CF3] underline">
                Formation IA dirigeant BTP
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-conducteur-travaux" className="text-[#377CF3] underline">
                Formation IA conducteur de travaux BTP — chantier, CR, CCTP
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-assistante-gestion-btp" className="text-[#377CF3] underline">
                Formation IA assistante de gestion BTP — facturation, relances, DGD
              </Link>
            </li>
          </ul>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre diagnostic IA commercial gratuit
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            30 minutes en visio pour identifier les leviers avant-vente (devis, AO, relances) qui
            augmenteront le plus votre taux de transformation. Gratuit, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]">
              Réserver mon diagnostic IA commercial
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <a
              href="https://www.laureolivie.fr/formations"
              className="text-[#377CF3] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Catalogue des formations IA appliquées au bâtiment
            </a>
            {' · '}
            <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA pour les pro du BTP, OFC Création d&apos;Entreprise</p>
          <p>Certifiée Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            laureolivie@yahoo.fr ·{' '}
            <a href="https://www.laureolivie.fr" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
