/**
 * JSON-LD @graph — page pilier /claude-ai-btp (TechArticle, FAQ, HowTo, ItemList, Dataset, Service).
 * @see https://schema.org/
 */
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  breadcrumbItemsFromPaths,
  buildBreadcrumbListJsonLd,
  SITE_CONFIG,
} from '@/lib/seo';

const PATH = '/claude-ai-btp';

/** Résumé long pour TechArticle.articleBody (signal GEO / LLM) — ~320 mots. */
export const CLAUDE_AI_BTP_ARTICLE_BODY_FOR_SCHEMA = `
Ce guide professionnel présente comment utiliser Claude AI dans le BTP : conducteurs de travaux, chargés d'affaires,
dirigeants de PME et assistants administratifs y trouvent les interfaces Anthropic adaptées (Claude Chat, Cowork, Code,
application desktop, extension Chrome), des workflows concrets sur DCE et CCTP, comptes rendus de chantier, veille des
appels d'offres et relances clients. La méthode OFC — testée avec la FFB Grand Paris, la FFB Île-de-France et la CSFE —
insiste sur la validation humaine des livrables, l'anonymisation des données sensibles et le cadre Qualiopi /
financement Constructys. Les gains de temps observés en formation portent sur la rédaction de CR, l'analyse documentaire,
la décision Go/No-Go et les premiers jets de mémoires techniques. Les prompts fournis sont copiables ; les skills et
projets Claude permettent de figer le contexte entreprise (zone, métiers, certifications) pour des réponses homogènes
d'un dossier à l'autre. L'article détaille aussi les limites : expertise métier, chiffrage, jugement commercial et
conformité réglementaire restent à la charge du professionnel. Enfin, des ressources internes prolongent le parcours
vers les formations IA appliquées au bâtiment en Île-de-France et le financement OPCO.
`.trim();

export const CLAUDE_AI_BTP_WORD_COUNT = 3500;

const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
const OG_IMAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}/og-claude-ai-btp.jpg`;

const PERSON_ID = `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos#person`;
const ORG_ID = `${SITE_CONFIG.url.replace(/\/$/, '')}/#organization`;

const ANCHOR_TUTORIAL = `${CANONICAL}#tutoriel-skill-claude-btp`;

const MENTIONS = [
  { '@type': 'Thing', name: 'Anthropic', url: 'https://www.anthropic.com/' },
  { '@type': 'WebPage', name: 'Documentation Claude', url: 'https://docs.anthropic.com/' },
  { '@type': 'WebPage', name: 'Claude — application web', url: 'https://claude.ai/' },
  { '@type': 'WebPage', name: 'Tarifs Claude', url: 'https://www.anthropic.com/pricing' },
  { '@type': 'WebPage', name: 'Actualités Anthropic', url: 'https://www.anthropic.com/news' },
];

export function buildClaudeAiBtpJsonLdGraph(): Record<string, unknown> {
  const breadcrumbRaw = buildBreadcrumbListJsonLd(
    breadcrumbItemsFromPaths([
      { name: 'Accueil', path: '/' },
      { name: 'Claude AI BTP', path: PATH },
    ])
  );

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${CANONICAL}#breadcrumb`,
    itemListElement: (breadcrumbRaw.itemListElement as unknown[]) ?? [],
  };

  const techArticle = {
    '@type': 'TechArticle',
    '@id': `${CANONICAL}#techarticle`,
    headline: 'Formation Claude AI BTP : guide complet 2026 — Paris, Île-de-France, Yvelines',
    description:
      'Claude AI BTP : guide Chat, Cowork, Code et Chrome — chantier, DCE, comptes rendus, administratif. Formation IA Qualiopi, Île-de-France, Constructys. Laure Olivié, OFC.',
    image: OG_IMAGE,
    inLanguage: 'fr-FR',
    wordCount: CLAUDE_AI_BTP_WORD_COUNT,
    articleBody: CLAUDE_AI_BTP_ARTICLE_BODY_FOR_SCHEMA,
    proficiencyLevel: 'Beginner',
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    datePublished: '2026-04-13',
    dateModified: '2026-04-18',
    url: CANONICAL,
    mainEntityOfPage: { '@id': `${CANONICAL}#webpage` },
    keywords: [
      'formation Claude AI BTP',
      'formation Claude BTP',
      'formation Claude bâtiment',
      'formation Claude travaux publics',
      'Claude Cowork conducteur de travaux',
      'Claude bâtiment',
      'Claude travaux publics',
      'Claude AI chantier',
      'IA BTP',
      'Anthropic',
      'appels d\'offres BTP',
    ],
    about: [
      { '@type': 'SoftwareApplication', name: 'Claude AI', applicationCategory: 'BusinessApplication' },
      { '@type': 'Thing', name: 'BTP' },
      { '@type': 'Thing', name: 'Construction' },
    ],
    mentions: MENTIONS,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#claude-btp-hero-title', '#en-chiffres', '#en-bref', '.tldr'],
    },
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${CANONICAL}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Claude AI est-il adapté aux petites entreprises du BTP ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. La version gratuite de Claude Chat suffit pour commencer — rédiger des emails, structurer des comptes rendus, analyser un document PDF uploadé. L\'abonnement Pro (20 $/mois) devient pertinent dès que vous analysez régulièrement des DCE ou CCTP, ou souhaitez configurer des tâches automatisées avec Cowork.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle interface Claude choisir pour un conducteur de travaux ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un conducteur de travaux tire le meilleur parti de Claude Cowork pour les missions récurrentes — CR de chantier, analyse de DCE, veille AO automatisée. Claude Chat avec un Projet configuré complète Cowork pour les tâches ponctuelles. Les deux interfaces sont complémentaires.',
        },
      },
      {
        '@type': 'Question',
        name: "Peut-on utiliser Claude AI pour répondre à des appels d'offres publics ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Oui. Claude est utilisé lors des sessions OFC avec la FFB Grand Paris pour la totalité du workflow AO : veille et détection des AO pertinents, analyse du DCE et décision Go/No-Go, rédaction du mémoire technique, vérification de conformité administrative.",
        },
      },
      {
        '@type': 'Question',
        name: 'Les données de chantier confiées à Claude sont-elles confidentielles ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "L'abonnement Claude Pro ne transmet pas les données des conversations pour l'entraînement des modèles. Désactivez l'option Améliorer le modèle dans les paramètres. Pour les données sensibles, anonymisez les éléments confidentiels avant soumission.",
        },
      },
      {
        '@type': 'Question',
        name: "Claude AI est-il finançable dans le cadre d'une formation BTP ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "La formation à son usage peut faire l'objet d'une prise en charge selon éligibilité. OFC Création d'Entreprise propose une formation IA pour les pro du BTP éligible Constructys (plafond indicatif : 24 € HT/heure/stagiaire) dans le cadre du Plan de Développement des Compétences 2026.",
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps faut-il pour être opérationnel sur Claude AI ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Une demi-journée suffit pour maîtriser Claude Chat. La configuration de Claude Cowork demande environ 1 heure. Dans les formations OFC avec la FFB, les participants produisent leur premier CR de chantier ou leur première analyse de DCE le jour même.',
        },
      },
      {
        '@type': 'Question',
        name: 'Où suivre une formation Claude AI BTP en Île-de-France (Paris, Yvelines, Essonne) ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "OFC Création d'Entreprise anime des formations IA pour le BTP en présentiel en Île-de-France (Paris, Yvelines, Essonne, Hauts-de-Seine, etc.) et en distanciel. Les sessions inter sont planifiées selon le calendrier Qualiopi ; les entreprises peuvent aussi organiser une formation intra sur leur site ou en salle partenaire.",
        },
      },
      {
        '@type': 'Question',
        name: 'Proposez-vous une formation Claude AI BTP à Paris, Saint-Quentin-en-Yvelines ou en Essonne (Les Ulis, Morangis, Longjumeau) ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Oui : le même programme formation Claude AI BTP (Claude Chat, Cowork, Code, Chrome) s'adapte aux équipes du bâtiment et des travaux publics partout en Île-de-France. Paris et la communauté d'agglomération de Saint-Quentin-en-Yvelines sont des zones d'intervention fréquentes ; en Essonne, les entreprises des Ulis, Morangis, Longjumeau et environs peuvent rejoindre une session inter ou demander une date intra.",
        },
      },
    ],
  };

  const howTo = {
    '@type': 'HowTo',
    '@id': `${CANONICAL}#howto-skill`,
    name: 'Créer un skill dans Claude AI pour le BTP',
    description:
      'Comment créer une consigne réutilisable dans Claude AI pour automatiser les tâches BTP récurrentes (CR, devis, emails).',
    totalTime: 'PT10M',
    tool: [{ '@type': 'HowToTool', name: 'Claude AI (Chat ou Projects)' }],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Définir un rôle précis',
        text: 'Indiquez la fonction et le périmètre : le modèle adapte le ton (chantier vs bureau).',
        url: ANCHOR_TUTORIAL,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Ajouter le contexte terrain',
        text: "Décrivez l'entreprise, la zone, le chantier ou le dossier pour éviter les réponses génériques.",
        url: ANCHOR_TUTORIAL,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Formuler la mission',
        text: "Une phrase sur le livrable attendu — ce que vous validerez après relecture.",
        url: ANCHOR_TUTORIAL,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Fixer le format de sortie',
        text: 'Structure imposée (puces, tableau, mail) : gain de temps à la relecture.',
        url: ANCHOR_TUTORIAL,
      },
    ],
  };

  const interfacesItemList = {
    '@type': 'ItemList',
    '@id': `${CANONICAL}#interfaces-claude`,
    name: 'Les 5 interfaces Claude AI pour le BTP',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Claude Chat',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          url: 'https://claude.ai',
          creator: { '@type': 'Organization', name: 'Anthropic' },
          description:
            'Interface conversationnelle pour emails, comptes rendus de chantier, analyse de DCE et devis.',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Claude Cowork',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Desktop (app Anthropic)',
          url: 'https://claude.ai',
          creator: { '@type': 'Organization', name: 'Anthropic' },
          description: 'Missions autonomes sur fichiers locaux, veille AO et livrables dans un dossier de sortie.',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Claude Code',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          url: 'https://docs.anthropic.com/en/docs/claude-code',
          creator: { '@type': 'Organization', name: 'Anthropic' },
          description: 'Automatisation de traitements PDF, tableurs et scripts pour devis et relances.',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Claude Desktop App',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'macOS, Windows',
          url: 'https://claude.ai/download',
          creator: { '@type': 'Organization', name: 'Anthropic' },
          description: 'Accès natif à Cowork et aux projets depuis le poste de travail.',
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Claude for Chrome',
          applicationCategory: 'BrowserExtension',
          operatingSystem: 'Chrome',
          url: 'https://chromewebstore.google.com/',
          creator: { '@type': 'Organization', name: 'Anthropic' },
          description: 'Analyse de pages web ouvertes, fiches marchés publics et rédaction dans Gmail.',
        },
      },
    ],
  };

  const dataset = {
    '@type': 'Dataset',
    '@id': `${CANONICAL}#dataset-gains-temps`,
    name: 'Gains de temps avec Claude AI dans le BTP (mesures OFC 2026)',
    description: `Mesures de gain de temps sur 8 tâches BTP, établies lors des sessions OFC avec la FFB Grand Paris, FFB IDF, CSFE, CNAM (${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}).`,
    creator: { '@type': 'Organization', name: "OFC Création d'Entreprise", '@id': ORG_ID },
    datePublished: '2026-04-15',
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    variableMeasured: [
      'Temps compte rendu chantier (sans IA vs avec Claude)',
      'Temps analyse CCTP / DCE',
      'Temps décision Go/No-Go',
      'Temps mémoire technique',
      'Temps devis',
      'Temps email client',
      'Temps veille appels d\'offres',
      'Temps extraction normes DTU',
    ],
    citation: 'OFC Création d\'Entreprise — sessions FFB Grand Paris, FFB Île-de-France, 2025-2026',
  };

  const service = {
    '@type': 'Service',
    '@id': `${CANONICAL}#service-formation-claude`,
    name: 'Formation Claude AI BTP',
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Paris' },
      { '@type': 'AdministrativeArea', name: 'Yvelines' },
      { '@type': 'AdministrativeArea', name: 'Essonne' },
      { '@type': 'State', name: 'Île-de-France' },
    ],
    serviceType: 'Formation professionnelle IA',
    description:
      'Formation pratique à Claude Chat, Projets, Cowork, Code et Chrome appliquée au BTP — Qualiopi, financement possible selon éligibilité.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tarifs indicatifs formation IA appliquée au bâtiment',
      itemListElement: [
        {
          '@type': 'Offer',
          description: 'Tarif référence Constructys PDC 2026 (plafond horaire indicatif)',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: 24,
            priceCurrency: 'EUR',
            unitText: 'HEURE',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
          },
        },
      ],
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: 100,
      highPrice: 175,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };

  const caseStudyArticle = {
    '@type': 'Article',
    '@id': `${CANONICAL}#cas-ffb-grand-paris`,
    headline: 'Cas FFB Grand Paris — réduction du temps de mémoire technique',
    description:
      'Session de 8 conducteurs de travaux (mars 2026) : après 3 semaines, temps moyen de premier jet de mémoire technique ramené d’environ 2 jours à 3 h 30 sur des dossiers comparables, avec relecture MOA jugée équivalente ou supérieure sur 4 dossiers remis.',
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    datePublished: '2026-03-15',
    inLanguage: 'fr-FR',
    articleSection: 'Étude de cas BTP',
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${CANONICAL}#webpage`,
    url: CANONICAL,
    name: 'Claude AI pour le BTP — guide OFC',
    isPartOf: { '@id': `${SITE_CONFIG.url.replace(/\/$/, '')}/#website` },
    inLanguage: 'fr-FR',
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    mainEntity: { '@id': `${CANONICAL}#techarticle` },
    breadcrumb: { '@id': `${CANONICAL}#breadcrumb` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage,
      techArticle,
      faqPage,
      breadcrumbList,
      howTo,
      interfacesItemList,
      dataset,
      service,
      caseStudyArticle,
    ],
  };
}
