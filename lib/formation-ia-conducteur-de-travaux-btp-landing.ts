/**
 * Landing `/formation-ia-conducteur-de-travaux-btp` — métadonnées, FAQ, prompts, JSON-LD.
 */
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH =
  '/formation-ia-conducteur-de-travaux-btp' as const;

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO = {
  title: 'Formation IA Conducteur de Travaux BTP Île-de-France — Laure Olivié',
  description:
    'Formation IA pour conducteurs de travaux BTP : CR en 5 min, analyse DCE, PPSPS. Qualiopi, Constructys. Île-de-France. Visio découverte gratuite 30 min.',
  h1: 'Formation IA pour conducteurs de travaux BTP — Gagnez 2 h par jour',
} as const;

export const CDT_BTP_USE_CASES = [
  {
    title: 'Compte rendu de chantier (CR)',
    body: 'Dictez vos notes en quittant la réunion : l’IA structure participants, avancement par lot, actions et réserves — 90 min → 8 min après relecture.',
  },
  {
    title: 'PPSPS et documents QSE',
    body: 'À partir du type de chantier et de vos données entreprise, générez la trame des 8 chapitres réglementaires — 4 h → 45 min (+ validation SST).',
  },
  {
    title: 'Mail de relance sous-traitant ou MOE',
    body: 'Relance planning, demande de pièces manquantes ou confirmation de levée de réserve : ton factuel, références contractuelles — 25 min → 4 min.',
  },
  {
    title: 'Analyse DCE / CCTP (extrait)',
    body: 'Identifiez en quelques minutes les clauses sensibles, interfaces lots et points de vigilance avant réunion de cadrage — sans relire 80 pages.',
  },
  {
    title: 'Ordre de service (OS) et courriers formels',
    body: 'Formalisez un OS ou un courrier MOA/MOE à partir de vos notes : objet, fondement, délai, conséquences — prêt à valider et envoyer.',
  },
] as const;

export const PROMPT_CR_CDT = `Tu es conducteur de travaux sur un chantier de [type de chantier] à [ville].

Voici mes notes brutes de la réunion du [date] (dictée vocale, abréviations acceptées) :
[Collez vos notes]

Rédige un CR de chantier structuré avec :
1. Participants
2. Avancement par lot
3. Points bloquants et actions (responsable + délai)
4. Réserves et non-conformités
5. Date de la prochaine réunion

Ton professionnel. Format standard CR de chantier BTP.`;

export const PROMPT_DCE_CDT = `Tu es conducteur de travaux pour [entreprise], marché [intitulé].

Voici un extrait du CCTP / CCAP (ou résumé du DCE) :
[Collez le texte — max 3 000 mots]

Produis une synthèse opérationnelle en 5 blocs :
1. Points de vigilance planning (3 max)
2. Interfaces lots / coordination
3. Exigences techniques atypiques
4. Risques financiers ou pénalités
5. Questions à poser en réunion de lancement

Format puces. Indique [À VÉRIFIER] sur tout point incertain.`;

export const CDT_BTP_FAQ = [
  {
    q: "L'IA va-t-elle me remplacer en tant que conducteur de travaux ?",
    a: "Non. L'IA accélère la rédaction et la structuration de documents (CR, mails, PPSPS, synthèses DCE). Le jugement terrain, la décision technique, la relation humaine avec les équipes et la signature des documents restent à votre charge — c'est ce que la formation insiste à chaque exercice.",
  },
  {
    q: "L'IA peut-elle être utilisée depuis le chantier sur smartphone ?",
    a: "Oui. ChatGPT et Claude ont des applications iOS et Android. Cas d'usage le plus fréquent : dicter ses notes en route et envoyer le CR avant d'arriver au bureau.",
  },
  {
    q: 'Les CR et OS générés par l\'IA sont-ils valides contractuellement ?',
    a: "Ils ont la même valeur qu'un document rédigé par vous — après relecture et validation. La validation humaine reste indispensable sur tout document contractuel.",
  },
  {
    q: 'Faut-il déjà connaître ChatGPT ou Claude ?',
    a: "Non. La formation part de zéro. En 30 minutes, les participants comprennent le principe et testent sur leurs documents réels.",
  },
  {
    q: 'La formation est-elle finançable Constructys ?',
    a: `Oui, selon éligibilité et dossier eGestion (OFC certifié Qualiopi). Plafonds 24 € HT/h/participant, max 840 € HT/jour/groupe intra — voir le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
  },
  {
    q: 'Combien de temps pour être opérationnel après la session ?',
    a: "Dès le lendemain. Les participants repartent avec des prompts personnalisés ; la plupart produisent leur premier CR assisté dans la semaine.",
  },
] as const;

export function buildConducteurDeTravauxBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Formation IA pour conducteurs de travaux BTP',
    description: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.description,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'certification',
      },
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
      sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
    },
    timeRequired: 'PT4H',
    courseMode: 'onsite',
    inLanguage: 'fr',
    educationalLevel: 'Débutant',
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('formation-ia-conducteur-de-travaux-btp-schema-offer'),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: 'PT4H',
      location: {
        '@type': 'Place',
        name: 'Île-de-France — intra ou inter, en présentiel',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Île-de-France',
          addressCountry: 'FR',
        },
      },
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Conducteur de travaux BTP',
    },
  };
}

export function buildConducteurDeTravauxBtpBreadcrumbJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${base}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Formations',
        item: `${base}${LINKS.formations}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Formation IA Conducteur de Travaux',
        item: `${base}${FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH}`,
      },
    ],
  };
}
