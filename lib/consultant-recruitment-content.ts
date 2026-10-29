/**
 * Contenu éditorial — page /devenez-consultant (consultant-formateur IA BTP).
 */
import type { FAQItem } from '@/lib/faq';
import type { ConsultantExpertiseValue } from '@/lib/career-form-validation';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';

const RECRUITMENT_MAILTO = formateurRecruitmentMailtoHref();

export const CONSULTANT_HERO_H1 =
  'Recherche de formateurs — Intelligence artificielle appliquée au BTP' as const;

export const CONSULTANT_HERO_INTRO =
  'Dans le cadre du développement de mon catalogue de formations 2027, je recherche des formateurs et formatrices indépendants issus du BTP, utilisant l’IA dans leur pratique professionnelle.' as const;

/** Campagne recrutement formateurs catalogue 2027 — bandeau global et hub /nous-rejoindre. */
export const FORMATEUR_RECRUITMENT_2027_CAMPAIGN = {
  enabled: true,
  banner: {
    desktopMessage:
      'Recrutement 2027 — Vous connaissez le BTP et utilisez l’IA ? Devenez formateur indépendant en Île-de-France.',
    mobileMessage: 'Formateurs IA BTP : recrutement 2027',
    ctaLabel: 'Découvrir les missions',
  },
  hero: {
    eyebrow: 'Catalogue 2027 · Missions indépendantes rémunérées',
    h1: 'Recrutement de formateurs IA BTP en Île-de-France',
    intro:
      'Dans le cadre du développement de mon catalogue de formations 2027, je recherche des formateurs et formatrices indépendants issus du BTP, utilisant l’IA dans leur pratique professionnelle.',
    primaryCtaLabel: 'Proposer ma candidature',
    secondaryCtaLabel: 'Découvrir les profils recherchés',
  },
  sections: {
    missionsHeading: 'Les missions en bref',
    profilsHeading: 'Les profils recherchés',
    profilsHighlight: 'Une expérience concrète du BTP est requise.',
    competencesHeading: 'Les compétences recherchées',
    candidatureHeading: 'Comment candidater ?',
  },
  candidatureIntro:
    'Vous êtes intéressé(e) ? Envoyez votre CV ou une présentation de votre parcours, vos disponibilités et quelques exemples d’utilisation de l’IA à :',
  conclusion: {
    share: 'Merci de partager cette annonce avec votre réseau !',
    signature: 'Laure Olivié — Formation IA BTP',
    site: 'laureolivie.fr',
  },
} as const;

/** Bandeau recrutement — page d’accueil (catalogue 2027). */
export const ACCUEIL_RECRUTEMENT = {
  eyebrow: 'RECRUTEMENT — CATALOGUE 2027',
  title: 'Vous connaissez le BTP et utilisez l’IA ?',
  lead: 'Je recherche des formateurs et formatrices indépendants issus du BTP pour animer des formations pratiques en intelligence artificielle auprès des professionnels du secteur.',
  facts: 'Île-de-France · Présentiel · À partir de 2027 · Missions rémunérées',
  ctaLabel: 'Découvrir les missions et candidater',
  emailHint: 'Vous préférez envoyer votre candidature par email ?',
} as const;

export const CONSULTANT_ANNONCE_MODALITES = [
  { term: 'Lieu', detail: 'Île-de-France' },
  { term: 'Période', detail: 'à partir de 2027' },
  { term: 'Durée', detail: 'selon les modules et les missions' },
  {
    term: 'Public',
    detail:
      'dirigeants, conducteurs de travaux, chargés d’affaires, artisans et fonctions support',
  },
  { term: 'Modalité', detail: 'présentiel, en intra ou interentreprises' },
  { term: 'Statut', detail: 'indépendant, microentreprise ou société' },
  { term: 'Rémunération', detail: 'missions rémunérées' },
] as const;

export const CONSULTANT_PROFILS_RECHERCHES =
  'Conducteurs de travaux, chefs de chantier, chargés d’affaires, responsables d’études de prix, dirigeants ou assistants de gestion BTP, en activité ou retraités.' as const;

export const CONSULTANT_COMPETENCES_RECHERCHEES = [
  'Expérience concrète des métiers et des documents du BTP.',
  'Pratique régulière de ChatGPT, Claude ou d’autres outils d’IA dans un contexte professionnel.',
  'Capacité à appliquer l’IA à des tâches métier : devis, analyse de DCE, comptes rendus, préparation de chantier, suivi des travaux ou gestion administrative.',
  'Capacité à transmettre simplement et à animer des exercices pratiques.',
  'Vérification des résultats produits par l’IA et respect de la confidentialité des données.',
] as const;

export const CONSULTANT_CANDIDATURE_INTRO_BEFORE_EMAIL =
  'Envoyez votre CV ou une présentation de votre parcours, vos disponibilités et quelques exemples d’utilisation de l’IA à' as const;

export const CONSULTANT_CANDIDATURE_INTRO_AFTER_EMAIL =
  ', ou complétez le formulaire de candidature ci-dessous.' as const;

export const CONSULTANT_ANNONCE_CONCLUSION =
  'Vous connaissez une personne qui correspond à ce profil ? Partagez-lui cette annonce.' as const;

/** FAQ visible — page /nous-rejoindre (HTML initial, sans schema FAQPage dédié). */
export const NOUS_REJOINDRE_FORMATEUR_FAQ: readonly FAQItem[] = [
  {
    q: 'Quels profils peuvent candidater ?',
    a: 'Les professionnels issus du BTP ayant une pratique régulière de l’IA et la capacité de transmettre leurs usages à travers des exercices pratiques.',
  },
  {
    q: 'Où se déroulent les missions ?',
    a: 'En présentiel en Île-de-France, en intra ou interentreprises.',
  },
  {
    q: 'Quand commencent les missions ?',
    a: 'À partir de 2027. Leur durée dépend des modules et des missions.',
  },
  {
    q: 'Quel statut est recherché ?',
    a: 'Des intervenants indépendants, en microentreprise ou en société, pour des missions rémunérées.',
  },
  {
    q: 'Comment envoyer ma candidature ?',
    a: `Envoyez votre CV ou une présentation de votre parcours, vos disponibilités et quelques exemples d’utilisation de l’IA à ${RECRUITMENT.email}.`,
  },
];

export const CONSULTANT_WHY_OFC = {
  heading: 'Informations utiles sur la collaboration',
  intro:
    'Laure Olivié structure des parcours métiers pratiques en intelligence artificielle pour les entreprises du bâtiment et des travaux publics. Les collaborations portent sur l’animation de ces parcours et la transmission de méthodes reliées au terrain.',
  cards: [
    {
      title: 'Une expertise métier valorisée',
      body: 'Transmettre des méthodes adaptées aux pratiques des entreprises du BTP.',
    },
    {
      title: 'Des parcours orientés terrain',
      body: 'Modules structurés par métier : devis, chantiers, appels d’offres, gestion et organisation.',
    },
    {
      title: 'Des interventions en Île-de-France',
      body: 'Animer des formations en présentiel selon les besoins et les modalités convenues.',
    },
  ],
} as const;

export type ConsultantExpertiseCard = {
  id: ConsultantExpertiseValue;
  title: string;
  description: string;
  iaExample: string;
};

export const CONSULTANT_EXPERTISE_CARDS: readonly ConsultantExpertiseCard[] = [
  {
    id: 'conduite-travaux',
    title: 'Conduite de travaux et suivi de chantier',
    description: 'Pilotage documentaire, coordination et suivi opérationnel sur chantier.',
    iaExample: 'Ex. : structurer un compte rendu ou un tableau d’actions à partir de notes terrain.',
  },
  {
    id: 'etudes-prix-ao',
    title: 'Études de prix, chiffrage et appels d’offres',
    description: 'Analyse de DCE, préparation de chiffrage et réponses aux marchés.',
    iaExample: 'Ex. : extraire les exigences d’un CCTP avec relecture métier systématique.',
  },
  {
    id: 'bureau-etudes-moe',
    title: 'Bureau d’études et maîtrise d’œuvre',
    description: 'Études, synthèses techniques et coordination projet.',
    iaExample: 'Ex. : comparer des pièces techniques et préparer une note de synthèse.',
  },
  {
    id: 'gestion-admin-commerciale',
    title: 'Gestion administrative et commerciale BTP',
    description: 'Devis, relances, courriers et organisation du quotidien d’entreprise.',
    iaExample: 'Ex. : relire un devis ou un courrier client avant envoi.',
  },
  {
    id: 'direction-entreprise-btp',
    title: 'Direction et organisation d’entreprise BTP',
    description: 'Pilotage, priorités et déploiement des usages IA en équipe.',
    iaExample: 'Ex. : cadrer un protocole d’usage IA adapté à la taille de l’entreprise.',
  },
];

export const CONSULTANT_SELECTION_STEPS = [
  'Vous présentez votre parcours et vos compétences.',
  'Nous étudions l’adéquation avec les besoins pédagogiques.',
  'Un échange peut être proposé si votre profil correspond à un besoin.',
  'Les modalités d’une collaboration sont définies en cas d’intérêt mutuel.',
] as const;

export const CONSULTANT_SELECTION_DISCLAIMER =
  'La candidature ne garantit pas de mission ni de délai de réponse.' as const;

export const CONSULTANT_FAQ_ITEMS: readonly FAQItem[] = [
  {
    q: 'Comment proposer mon expertise de formateur IA BTP ?',
    a: `Utilisez le questionnaire en haut de cette page (section « Présentez votre candidature ») ou envoyez votre CV et votre présentation à <a href="${RECRUITMENT_MAILTO}">${RECRUITMENT.email}</a>. Précisez votre parcours BTP, votre pratique de l’IA et les parcours métiers du catalogue sur lesquels vous souhaitez intervenir.`,
  },
  {
    q: 'Quelles compétences recherchez-vous ?',
    a: `Une expérience concrète dans le bâtiment ou les travaux publics, une utilisation régulière de ChatGPT ou Claude, et la capacité à animer des exercices pratiques avec vérification humaine des productions de l’IA.`,
  },
  {
    q: 'Faut-il déjà avoir animé des formations ?',
    a: `Une expérience pédagogique est un plus, mais ce n’est pas une condition absolue. L’important est de savoir expliquer simplement et de partir de situations métier réelles.`,
  },
  {
    q: 'Où se déroulent les interventions ?',
    a: `Les formations Laure Olivié sont animées en présentiel — ${PERIMETRE_FORMATIONS_COURT}. La mobilité en Île-de-France est un critère d’étude pour les propositions de consultant-formateur.`,
  },
  {
    q: 'Proposez-vous des missions sur les modules isolés du catalogue ?',
    a: `Non. Cette page vise l’animation des parcours métiers (7 filières). Pour une collaboration sur d’autres sujets, utilisez la candidature spontanée en précisant votre proposition.`,
  },
  {
    q: 'Comment se déroule l’étude de mon profil ?',
    a: `Après réception du formulaire, OFC examine l’adéquation entre votre expertise et les besoins pédagogiques des parcours métiers. Un échange peut être proposé si un besoin correspond à votre profil.`,
  },
  {
    q: 'S’agit-il d’un emploi salarié ?',
    a: `Non. Cette page s’adresse aux professionnels qui souhaitent proposer une expertise de consultant-formateur indépendant. Pour un emploi salarié, consultez la page <a href="${LINKS.emplois}">Nous rejoindre</a> ou déposez une <a href="${LINKS.candidaturesSpontanees}">candidature spontanée</a>.`,
  },
];
