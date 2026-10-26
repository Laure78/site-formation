/**
 * Contenu éditorial — page /devenez-consultant (consultant-formateur IA BTP).
 */
import type { FAQItem } from '@/lib/faq';
import type { ConsultantExpertiseValue } from '@/lib/career-form-validation';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';

const RECRUITMENT_MAILTO = formateurRecruitmentMailtoHref();

export const CONSULTANT_HERO_SUBTITLE =
  'Vous avez une expérience dans le BTP et utilisez l’IA dans votre métier ? Présentez votre candidature pour animer les parcours métiers de notre catalogue en présentiel en Île-de-France.' as const;

export const CONSULTANT_HERO_TAGLINE =
  'Collaboration indépendante · Expérience BTP · Pratique concrète de l’IA' as const;

export const CONSULTANT_WHY_OFC = {
  heading: 'Informations utiles sur la collaboration',
  intro:
    'Laure Olivié développe des parcours métiers pratiques en intelligence artificielle pour les entreprises du bâtiment et des travaux publics. Nous étudions les propositions de professionnels capables d’animer ces parcours et de relier l’IA aux réalités du terrain.',
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

export const CONSULTANT_COMPETENCE_GROUPS = [
  {
    title: 'Expertise métier',
    items: [
      'Expérience professionnelle dans le BTP.',
      'Compréhension des documents et processus de chantier.',
      'Connaissance des contraintes opérationnelles des entreprises.',
      'Capacité à adapter les exemples aux publics formés.',
    ],
  },
  {
    title: 'IA et pédagogie',
    items: [
      'Utilisation concrète de ChatGPT ou Claude.',
      'Capacité à construire des exercices pratiques.',
      'Pédagogie claire et accessible.',
      'Vérification humaine systématique.',
      'Respect de la confidentialité des documents.',
    ],
  },
] as const;

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
    a: `Les formations OFC sont animées en présentiel — ${PERIMETRE_FORMATIONS_COURT}. La mobilité en Île-de-France est un critère d’étude pour les propositions de consultant-formateur.`,
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
