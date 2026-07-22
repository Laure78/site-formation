/**
 * Landing `/formation-ia-conducteur-de-travaux-btp` — métadonnées, FAQ, prompts, JSON-LD.
 * Contenu métier (cas d’usage, public, programme) aligné terrain CDT — cadre OFC Qualiopi.
 */
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH =
  '/formation-ia-conducteur-de-travaux-btp' as const;

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO = {
  title: 'Formation IA conducteur de travaux BTP',
  description:
    'Formation IA conducteur de travaux BTP : CR, CCTP, PPSPS et mails chantier. Présentiel IDF, Qualiopi, Constructys selon éligibilité. Visio découverte.',
  h1: 'Formation IA pour conducteurs de travaux dans le BTP',
  openGraphTitle: 'Formation IA conducteur de travaux BTP — CR, CCTP, PPSPS',
} as const;

/** Encadré « En bref » sous le H1. */
export const CDT_BTP_EN_BREF = [
  'Cette formation vous apprend à utiliser ChatGPT, Claude et des assistants IA comme aide opérationnelle : analyse documentaire, synthèse, rédaction, préparation de réunion et suivi chantier.',
  'L’IA ne remplace pas votre expertise terrain ni vos décisions : elle accélère la préparation, l’analyse et la formalisation — vous validez avant diffusion.',
  'Sessions en présentiel Île-de-France, organisme Qualiopi ; financement OPCO Constructys possible selon éligibilité.',
] as const;

export const CDT_BTP_USE_CASES = [
  {
    title: 'Analyse CCTP / DTU',
    body: 'Extraire points de vigilance, obligations techniques, matériaux, délais et incohérences potentielles — pour prioriser votre lecture et préparer la réunion de lancement.',
  },
  {
    title: 'Analyse CCTP / DPGF',
    body: 'Croiser descriptif et quantitatif : postes sensibles, oublis possibles, questions à poser au bureau d’études ou au MOE.',
  },
  {
    title: 'Compte rendu de chantier',
    body: 'Dictez vos notes en quittant la réunion : l’IA structure participants, avancement par lot, actions, réserves — relecture humaine avant envoi (ordre de grandeur : 90 min → quelques minutes).',
  },
  {
    title: 'Rapport d’anomalies',
    body: 'Transformer des notes terrain en rapport clair : constat, cause probable, impact, action proposée, responsable et échéance.',
  },
  {
    title: 'PPSPS et documents QSE',
    body: 'Générer la trame des chapitres réglementaires à partir du type de chantier et de vos données entreprise — validation SST obligatoire.',
  },
  {
    title: 'Mails clients, fournisseurs, sous-traitants',
    body: 'Relance planning, demande de pièces, clarification de réserve : ton factuel, références contractuelles, prêt à valider.',
  },
  {
    title: 'Appels d’offres & brouillon de mémoire technique',
    body: 'Structurer un premier jet, reformuler des arguments, capitaliser des éléments internes — sans se substituer au chiffrage ni à la validation métier.',
  },
  {
    title: 'Assistant IA interne « référent chantier »',
    body: 'Cadre pour un skill ou projet Claude alimenté par procédures, retours d’expérience et trames internes — capitaliser l’expertise des conducteurs seniors.',
  },
] as const;

export const CDT_BTP_PUBLIC = [
  'Conducteurs de travaux',
  'Chargés d’affaires',
  'Chefs de chantier',
  'Responsables travaux',
  'Dirigeants de PME BTP impliqués dans le suivi opérationnel',
  'Équipes techniques qui analysent et transmettent l’information chantier',
] as const;

export const CDT_BTP_PREREQUIS = [
  'Connaître les documents courants du BTP (CCTP, CR, mails, planning)',
  'Être impliqué dans la gestion ou le suivi de chantier',
  'Manipuler régulièrement des outils numériques (messagerie, fichiers)',
  'Aucun niveau de code requis — appétence pour tester des usages concrets',
] as const;

export const CDT_BTP_PROGRAMME = [
  {
    title: 'Comprendre l’IA générative en contexte BTP',
    body: 'Modèles de langage, limites, risques d’erreur, bonnes pratiques de vérification et validation humaine — sans déléguer aveuglément une décision technique ou contractuelle.',
  },
  {
    title: 'Configurer ChatGPT et Claude pour un usage pro',
    body: 'Compte adapté, distinction usage perso / entreprise, mémoire, données sensibles, demandes structurées et prompts réutilisables.',
  },
  {
    title: 'Prompts métier chantier',
    body: 'Bibliothèque de formulations : analyse CCTP, comparaison DTU, notes → rapport, relance fournisseur, checklist préparation, synthèse de réunion.',
  },
  {
    title: 'Analyser des documents techniques',
    body: 'CCTP, DTU, DPGF, CCAP, notices, rapports fournisseurs, mémoires — extraction des clauses clés et points de vigilance, sous votre contrôle.',
  },
  {
    title: 'Réunions, CR et suivi opérationnel',
    body: 'Préparer l’ordre du jour, structurer le CR (décisions, actions, responsables, échéances), synthèses d’anomalies et priorisation.',
  },
  {
    title: 'AO, mémoire technique et assistant interne',
    body: 'Accélérer la préparation d’offre et poser les bases d’un skill / projet Claude « référent technique chantier » sur vos documents d’entreprise.',
  },
] as const;

export const CDT_BTP_OBJECTIFS = [
  'Une méthode claire pour utiliser ChatGPT ou Claude sur le chantier',
  'Des prompts adaptés au métier de conducteur de travaux',
  'Des modèles de comptes rendus et de checklists',
  'Une méthode d’analyse CCTP / DTU',
  'Des trames de mails clients, fournisseurs et sous-traitants',
  'Une approche pour préparer un brouillon de mémoire technique',
  'Une première réflexion sur un assistant IA interne chantier',
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
    q: 'Pourquoi un conducteur de travaux devrait-il se former à l’IA ?',
    a: 'Pour gagner du temps sur la lecture documentaire, les comptes rendus, les mails, les analyses CCTP, les rapports de chantier, la préparation d’AO et la coordination — sans remplacer le jugement terrain ni la signature.',
  },
  {
    q: "L'IA va-t-elle me remplacer en tant que conducteur de travaux ?",
    a: "Non. L'IA accélère la rédaction et la structuration de documents (CR, mails, PPSPS, synthèses DCE). Le jugement terrain, la décision technique, la relation humaine avec les équipes et la signature des documents restent à votre charge — c'est ce que la formation insiste à chaque exercice.",
  },
  {
    q: 'L’IA peut-elle aider à analyser un CCTP ou le croiser avec un DTU ?',
    a: 'Oui pour extraire points clés, contraintes, obligations et zones de vigilance. Les résultats doivent toujours être vérifiés par un professionnel compétent avant toute décision.',
  },
  {
    q: 'L’IA peut-elle aider à préparer un mémoire technique ?',
    a: 'Oui pour structurer un brouillon, reformuler et réutiliser des éléments internes. Le chiffrage, l’engagement contractuel et la validation métier restent humains.',
  },
  {
    q: "L'IA peut-elle être utilisée depuis le chantier sur smartphone ?",
    a: "Oui. ChatGPT et Claude ont des applications iOS et Android. Cas d'usage fréquent : dicter ses notes en route et finaliser le CR au bureau après relecture.",
  },
  {
    q: 'Les CR et OS générés par l\'IA sont-ils valides contractuellement ?',
    a: "Ils ont la même valeur qu'un document rédigé par vous — après relecture et validation. La validation humaine reste indispensable sur tout document contractuel.",
  },
  {
    q: 'Faut-il déjà connaître ChatGPT ou Claude ? Faut-il savoir coder ?',
    a: "Non. La formation part de zéro, sans code. En session, les participants testent sur leurs documents réels (anonymisés si besoin).",
  },
  {
    q: 'Peut-on créer un assistant IA interne pour les chantiers ?',
    a: 'Oui, en posant le cadre (projets Claude, skills, documents de référence internes). La session catalogue NIV-03 approfondit ces usages sur vos dossiers.',
  },
  {
    q: 'La formation est-elle finançable Constructys ?',
    a: `Financement OPCO possible selon éligibilité et dossier eGestion (OFC certifié Qualiopi). Plafonds 24 € HT/h/participant, max 840 € HT/jour/groupe intra — voir le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
  },
  {
    q: 'Combien de temps pour être opérationnel après la session ?',
    a: "Dès le lendemain. Les participants repartent avec des prompts personnalisés ; la plupart produisent leur premier CR assisté dans la semaine.",
  },
] as const;

export function buildConducteurDeTravauxBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour conducteurs de travaux BTP',
      description: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_BTP_SEO.description,
      path,
      educationalLevel: 'Débutant',
      organizationId: `${base}/#organization`,
      instructorName: SCHEMA_PERSON_LAURE.name,
    }),
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
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
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('formation-ia-conducteur-de-travaux-btp-schema-offer'),
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
