/**
 * Contenu éditorial — recrutement formateurs IA BTP (hub /nous-rejoindre).
 */
import type { FAQItem } from '@/lib/faq';
import type { ConsultantExpertiseValue } from '@/lib/career-form-validation';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';

const RECRUITMENT_MAILTO = formateurRecruitmentMailtoHref();

/** Hero — hub /nous-rejoindre (formateurs indépendants 2027). */
export const NOUS_REJOINDRE_FORMATEUR_HERO = {
  eyebrow: 'Recrutement · Catalogue 2027',
  h1Line1: 'Vous connaissez le BTP.',
  h1Line2: 'Vous utilisez l’IA.',
  h1Line3: 'Transmettez les deux.',
  intro:
    'Notre organisme recrute des formateurs et formatrices indépendants issus du BTP pour animer des parcours métiers et des formations IA en présentiel en Île-de-France, à partir de 2027.',
  primaryCtaLabel: 'Déposer ma candidature',
  secondaryCtaLabel: 'Découvrir les missions',
  enBref:
    'Recrutement 2027 : formateurs indépendants issus du BTP (2 ans d’expérience métier minimum), pratique de ChatGPT ou Claude, missions rémunérées en présentiel en Île-de-France. Candidature en ligne ou par email à recrutement@laureolivie.fr.',
} as const;

/** Bandeau d’informations — sous le hero /nous-rejoindre. */
export const NOUS_REJOINDRE_INFO_STRIP = [
  { label: '2 ans d’expérience BTP minimum', key: 'experience' },
  { label: 'Missions indépendantes rémunérées', key: 'missions' },
  { label: 'Présentiel en Île-de-France', key: 'presentiel' },
  { label: 'À partir de 2027', key: 'catalogue' },
] as const;

export const NOUS_REJOINDRE_RECRUITMENT_CATEGORIES = {
  parcoursMetiers: {
    id: 'parcours-metiers',
    label: 'Parcours métiers BTP + IA',
  },
  formationsIaBtp: {
    id: 'formations-ia-btp',
    label: 'Formations IA BTP',
  },
} as const;

export type NousRejoindreRecruitmentCategoryId =
  (typeof NOUS_REJOINDRE_RECRUITMENT_CATEGORIES)[keyof typeof NOUS_REJOINDRE_RECRUITMENT_CATEGORIES]['id'];

/** Cartes profils — landing /nous-rejoindre (4 piliers visuels). */
export const NOUS_REJOINDRE_LANDING_PROFILS = {
  heading: 'Les profils que nous recherchons',
  subtitle:
    'Professionnels du bâtiment et des travaux publics — en activité ou retraités — avec une expérience terrain vérifiable.',
  cards: [
    {
      title: 'Conduite de travaux',
      description: 'Conducteurs de travaux, chefs de chantier et chefs d’équipe.',
    },
    {
      title: 'Affaires et études',
      description: 'Chargés d’affaires, économistes de la construction et bureaux d’études.',
    },
    {
      title: 'Artisans et dirigeants',
      description: 'Artisans et dirigeants d’entreprises du BTP, en activité ou retraités.',
    },
    {
      title: 'Gestion et support',
      description: 'Assistants de gestion et fonctions support en entreprise du BTP.',
    },
  ] as const,
} as const;

/** Bandeau missions — landing /nous-rejoindre. */
export const NOUS_REJOINDRE_MISSION_LANDING = {
  heading: 'Votre expertise métier + l’IA = des compétences utiles sur le terrain',
  casPratiques: [
    { title: 'Devis et chiffrage', key: 'devis' },
    { title: 'Appels d’offres (DCE)', key: 'dce' },
    { title: 'CCTP / CCAP', key: 'cctp' },
    { title: 'Suivi de chantier', key: 'chantier' },
    { title: 'Comptes rendus', key: 'cr' },
    { title: 'DOE', key: 'doe' },
  ] as const,
} as const;

export const NOUS_REJOINDRE_AVANTAGES = [
  {
    title: 'Supports prêts à l’emploi',
    body: 'Programmes, exercices et trames pédagogiques construits autour de documents BTP réels.',
  },
  {
    title: 'Accompagnement de proximité',
    body: 'Échanges avec l’équipe pédagogique avant les premières interventions.',
  },
  {
    title: 'Missions indépendantes en IDF',
    body: 'Prestations rémunérées en présentiel, intra ou interentreprises, selon vos disponibilités.',
  },
  {
    title: 'Organisme certifié Qualiopi',
    body: 'Formation IA spécialisée BTP — cadre Qualiopi et pédagogie ancrée terrain.',
  },
] as const;

/** Modalités — section compétences & conditions (/nous-rejoindre). */
export const NOUS_REJOINDRE_MODALITES = [
  {
    title: 'Statut indépendant',
    body: 'Micro-entreprise ou société — prestations rémunérées selon les modules confiés.',
  },
  {
    title: 'Présentiel en Île-de-France',
    body: 'Interventions auprès des entreprises du bâtiment et des travaux publics.',
  },
  {
    title: 'Intra ou interentreprises',
    body: 'Missions adaptées au calendrier et au périmètre convenus avec l’équipe pédagogique.',
  },
  {
    title: 'À partir de 2027',
    body: 'Profils en activité et retraités acceptés, sous réserve des critères requis.',
  },
] as const;

/** Parcours de candidature — hub /nous-rejoindre. */
export const NOUS_REJOINDRE_CANDIDATURE_PATHS = {
  heading: 'Parcours de candidature',
  subtitle: 'Deux voies distinctes : missions de formation indépendantes et emploi salarié.',
  formateur: {
    title: 'Formateurs indépendants',
    description:
      'Candidature pour animer les formations IA appliquées aux métiers du BTP (catalogue 2027).',
    ctaLabel: 'Candidater comme formateur indépendant',
  },
  salarie: {
    title: 'Emplois salariés et candidatures spontanées',
    description:
      'Consultez les offres publiées ou déposez une candidature spontanée — sans poste garanti tant qu’aucune offre n’est en ligne.',
    ctaOffersLabel: 'Voir les offres d’emploi',
    ctaSpontaneeLabel: 'Candidature spontanée',
  },
} as const;

/** Bloc conversion — landing /nous-rejoindre. */
export const NOUS_REJOINDRE_CONVERSION = {
  heading: 'Prêt à transmettre votre expertise BTP ?',
  lead: 'Rejoignez le réseau de formateurs indépendants pour le catalogue 2027 — missions en présentiel en Île-de-France.',
  ctaLabel: 'Proposer ma candidature',
} as const;

/** @deprecated Préférer `NOUS_REJOINDRE_FORMATEUR_HERO`. */
export const DEVENEZ_CONSULTANT_HERO = NOUS_REJOINDRE_FORMATEUR_HERO;

/** @deprecated Préférer les lignes `h1Line1`…`h1Line3` de `NOUS_REJOINDRE_FORMATEUR_HERO`. */
export const CONSULTANT_HERO_H1 = `${NOUS_REJOINDRE_FORMATEUR_HERO.h1Line1} ${NOUS_REJOINDRE_FORMATEUR_HERO.h1Line2}`;

/** @deprecated Préférer `NOUS_REJOINDRE_FORMATEUR_HERO.intro`. */
export const CONSULTANT_HERO_INTRO = NOUS_REJOINDRE_FORMATEUR_HERO.intro;

export const DEVENEZ_CONSULTANT_BTP_REQUIREMENT = {
  heading: 'Une expérience professionnelle du BTP indispensable',
  lead:
    'Au moins 2 ans d’expérience dans une entreprise du BTP sont obligatoires.',
  body: [
    'Une bonne maîtrise de ChatGPT, de Claude ou des techniques d’animation de formation ne remplace pas l’expérience métier.',
    'Les candidats doivent connaître les réalités du terrain, les documents professionnels, le vocabulaire technique et les contraintes des entreprises du BTP.',
  ] as const,
  reassuranceTitle: 'Vous n’avez jamais animé de formation ? Ce n’est pas bloquant.',
  reassuranceBody:
    'L’expérience pédagogique est un plus. L’expérience professionnelle dans le BTP est indispensable.',
} as const;

export type ConsultantRecruitmentProfilCard = {
  title: string;
  roles: readonly string[];
};

export const NOUS_REJOINDRE_PROFILS = {
  heading: 'Profils recherchés',
  cards: [
    {
      title: 'Encadrement de chantier',
      roles: ['Conducteur de travaux', 'Chef de chantier', 'Chef d’équipe'],
    },
    {
      title: 'Études et affaires',
      roles: ['Chargé d’affaires', 'Économiste de la construction', 'Responsable d’études de prix'],
    },
    {
      title: 'Bureau d’études et maîtrise d’œuvre',
      roles: ['Technicien d’études', 'Projeteur', 'Ingénieur ou chargé d’études MOE'],
    },
    {
      title: 'Artisans et dirigeants',
      roles: ['Artisan du bâtiment', 'Dirigeant d’entreprise du BTP', 'Ancien dirigeant'],
    },
    {
      title: 'Gestion et fonctions support',
      roles: [
        'Assistant de gestion BTP',
        'Assistant administratif BTP',
        'Fonction support en entreprise du BTP',
      ],
    },
  ] as const satisfies readonly ConsultantRecruitmentProfilCard[],
  conditionLead:
    'Condition obligatoire : justifier d’au moins 2 ans d’expérience professionnelle au sein d’une entreprise du BTP.',
  conditionDetail:
    'Une expertise en IA ou en formation ne remplace pas cette expérience métier.',
  footnote:
    'Les professionnels en activité comme les retraités peuvent candidater, sous réserve de remplir les critères requis et de disposer d’un statut permettant d’effectuer des prestations indépendantes.',
} as const;

/** @deprecated Préférer `NOUS_REJOINDRE_PROFILS`. */
export const DEVENEZ_CONSULTANT_PROFILS = NOUS_REJOINDRE_PROFILS;

export const DEVENEZ_CONSULTANT_MISSION = {
  heading: 'Former les professionnels du BTP à l’IA sur des cas concrets',
  intro:
    'Les formateurs accompagnent les professionnels du BTP dans l’utilisation de l’IA appliquée à leurs tâches et documents métier.',
  domains: [
    {
      num: '01',
      title: 'Devis et appels d’offres',
      body: 'Exploiter l’IA pour préparer des devis, analyser des DCE et structurer des mémoires techniques.',
    },
    {
      num: '02',
      title: 'Documents techniques',
      body: 'Faciliter la lecture et l’analyse des CCTP, documents contractuels et pièces de chantier.',
    },
    {
      num: '03',
      title: 'Conduite de travaux',
      body: 'Préparer des comptes rendus de chantier, organiser les actions et faciliter le suivi documentaire.',
    },
    {
      num: '04',
      title: 'Gestion administrative et clients',
      body: 'Rédiger des courriers, préparer des relances, structurer des e-mails et améliorer le suivi administratif.',
    },
  ] as const,
  conclusion:
    'Notre approche pédagogique privilégie la pratique, les situations réelles du BTP et la vérification systématique des productions de l’IA.',
} as const;

export const NOUS_REJOINDRE_COMPETENCES = {
  heading: 'Les compétences attendues',
  bullets: [
    'Connaissance concrète des méthodes et documents du BTP.',
    'Utilisation régulière de ChatGPT, Claude ou d’autres outils d’IA.',
    'Capacité à appliquer l’IA à des situations professionnelles réelles.',
    'Capacité à expliquer et transmettre ses méthodes.',
    'Respect de la confidentialité et vérification des résultats produits par l’IA.',
  ] as const,
  reassuranceTitle: 'Vous n’êtes pas formateur professionnel ?',
  reassuranceBody:
    'Une expérience en animation de formation est appréciée, mais elle n’est pas obligatoire. L’expérience terrain, la maîtrise des usages de l’IA et l’envie de transmettre sont essentielles.',
} as const;

/** @deprecated Préférer `NOUS_REJOINDRE_COMPETENCES`. */
export const DEVENEZ_CONSULTANT_COMPETENCES = NOUS_REJOINDRE_COMPETENCES;

export const DEVENEZ_CONSULTANT_MODALITES = {
  heading: 'Comment se déroule la collaboration ?',
  items: [
    {
      title: 'Missions indépendantes',
      body: 'Micro-entreprise ou autre structure — prestations rémunérées selon les modules confiés.',
    },
    {
      title: 'Formations en présentiel',
      body: 'Interventions en Île-de-France auprès des entreprises du bâtiment et des travaux publics.',
    },
    {
      title: 'Selon vos disponibilités',
      body: 'Périmètre, calendrier et conditions de mission convenus avec notre équipe pédagogique.',
    },
  ] as const,
  footnote:
    'Pour candidater : précisez vos postes tenus dans le BTP, un usage concret de l’IA et votre département d’intervention.',
} as const;

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
      'Dans le cadre du développement du catalogue de formations 2027, notre organisme recherche des formateurs et formatrices indépendants issus du BTP, utilisant l’IA dans leur pratique professionnelle.',
    primaryCtaLabel: 'Déposer ma candidature',
    secondaryCtaLabel: 'Découvrir les profils recherchés',
  },
  sections: {
    missionsHeading: 'Les missions en bref',
    profilsHeading: 'Les profils recherchés',
    profilsHighlight: 'Au moins 2 ans d’expérience dans une entreprise du BTP sont obligatoires.',
    competencesHeading: 'Les compétences recherchées',
    candidatureHeading: 'Formulaire de candidature',
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
  lead: 'Notre organisme recrute des formateurs et formatrices indépendants issus du BTP pour animer des formations pratiques en intelligence artificielle auprès des professionnels du secteur.',
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
  'Encadrement de chantier, études et affaires, dirigeants et artisans du bâtiment, gestion et fonctions support — en activité ou retraités, avec au moins 2 ans d’expérience en entreprise du BTP.' as const;

export const CONSULTANT_COMPETENCES_RECHERCHEES = [
  'Au moins 2 ans d’expérience professionnelle dans une entreprise du BTP.',
  'Expérience concrète des métiers et des documents du BTP.',
  'Pratique régulière de ChatGPT, Claude ou d’autres outils d’IA.',
  'Capacité à appliquer l’IA à des situations professionnelles réelles.',
  'Aptitude à expliquer et transmettre des méthodes.',
  'Respect de la confidentialité et vérification des productions de l’IA.',
] as const;

export const CONSULTANT_CANDIDATURE_INTRO_BEFORE_EMAIL =
  'Envoyez votre CV ou une présentation de votre parcours, vos disponibilités et quelques exemples d’utilisation de l’IA à' as const;

export const CONSULTANT_CANDIDATURE_INTRO_AFTER_EMAIL =
  ', ou complétez le formulaire de candidature ci-dessous.' as const;

export const CONSULTANT_ANNONCE_CONCLUSION =
  'Vous connaissez une personne qui correspond à ce profil ? Partagez-lui cette annonce.' as const;

/** FAQ — hub /nous-rejoindre (formateurs indépendants + sélection). */
export const NOUS_REJOINDRE_RECRUTEMENT_FAQ: readonly FAQItem[] = [
  {
    q: 'Qui peut devenir formateur IA BTP ?',
    a: 'Des professionnels issus du bâtiment ou des travaux publics, avec au moins 2 ans d’expérience en entreprise, une pratique régulière de l’IA et l’envie de transmettre leurs méthodes en formation.',
  },
  {
    q: 'Quelle expérience professionnelle est obligatoire ?',
    a: 'Au minimum 2 ans d’expérience au sein d’une entreprise du BTP. Sans cette expérience métier, la candidature n’est pas retenue.',
  },
  {
    q: 'Faut-il déjà avoir animé des formations ?',
    a: 'Non. Une expérience pédagogique est un plus, pas une condition absolue. L’essentiel est de partir de situations réelles et d’expliquer simplement.',
  },
  {
    q: 'Quels outils d’IA faut-il maîtriser ?',
    a: 'Une utilisation régulière de ChatGPT, Claude ou d’outils équivalents dans votre activité professionnelle, avec des exemples concrets à partager.',
  },
  {
    q: 'Peut-on candidater en étant retraité ?',
    a: 'Oui, si vous remplissez les critères d’expérience BTP et disposez d’un statut permettant d’effectuer des prestations indépendantes rémunérées.',
  },
  {
    q: 'Où se déroulent les formations ?',
    a: `En présentiel en Île-de-France — ${PERIMETRE_FORMATIONS_COURT}. Les missions sont en intra ou interentreprises.`,
  },
  {
    q: 'Quel statut professionnel faut-il avoir ?',
    a: 'Intervenant indépendant : micro-entreprise ou société. Les missions sont rémunérées selon les modules confiés.',
  },
  {
    q: 'Comment candidater ?',
    a: `Complétez le <a href="${LINKS.nousRejoindreCandidatureFormateur}">formulaire de candidature formateur</a> ou envoyez CV, parcours BTP, exemple d’usage de l’IA et disponibilités à <a href="${RECRUITMENT_MAILTO}">${RECRUITMENT.email}</a>.`,
  },
  {
    q: 'Comment se déroule la sélection ?',
    a: 'Nous analysons votre parcours BTP et votre pratique IA, puis un échange peut être proposé si un besoin correspond. Les modalités sont définies en cas d’intérêt mutuel.',
  },
  {
    q: 'S’agit-il d’un emploi salarié ou d’une mission indépendante ?',
    a: `Le recrutement formateur vise des missions indépendantes. Pour un emploi salarié, consultez la section « Emploi salarié » sur cette page ou déposez une <a href="${LINKS.nousRejoindreCandidatureSpontanee}">candidature spontanée</a>.`,
  },
];

/** @deprecated Préférer `NOUS_REJOINDRE_RECRUTEMENT_FAQ`. */
export const NOUS_REJOINDRE_FORMATEUR_FAQ = NOUS_REJOINDRE_RECRUTEMENT_FAQ;

/** @deprecated Fusionnée dans `NOUS_REJOINDRE_RECRUTEMENT_FAQ`. */
export const CONSULTANT_FAQ_ITEMS = NOUS_REJOINDRE_RECRUTEMENT_FAQ;

export const NOUS_REJOINDRE_WHY_ORGANISME = {
  heading: 'Pourquoi rejoindre notre organisme ?',
  intro:
    'Nous construisons des parcours de formation IA pour les entreprises du bâtiment et des travaux publics, avec une pédagogie ancrée dans les documents et situations réelles du secteur.',
  cards: [
    {
      title: 'Spécialisation IA × BTP',
      body: 'Un organisme certifié Qualiopi dédié à l’intelligence artificielle appliquée aux métiers du bâtiment et des travaux publics.',
    },
    {
      title: 'Situations réelles d’entreprise',
      body: 'Des formations construites autour des tâches, documents et contraintes des PME et équipes de terrain.',
    },
    {
      title: 'Pédagogie pratique',
      body: 'Exercices sur devis, DCE, comptes rendus, CCTP et outils du quotidien — avec vérification métier des productions de l’IA.',
    },
    {
      title: 'Compétences exploitables',
      body: 'Transmission de méthodes que les participants peuvent réutiliser dès leur retour en entreprise.',
    },
    {
      title: 'Réseau de professionnels du terrain',
      body: 'Collaboration avec des intervenants qui connaissent les réalités des chantiers, des études et de la gestion BTP.',
    },
  ],
} as const;

/** @deprecated Préférer `NOUS_REJOINDRE_WHY_ORGANISME`. */
export const CONSULTANT_WHY_OFC = NOUS_REJOINDRE_WHY_ORGANISME;

export type ConsultantExpertiseCard = {
  id: ConsultantExpertiseValue;
  title: string;
  description: string;
  iaExample: string;
};

export const CONSULTANT_EXPERTISE_CARDS: readonly ConsultantExpertiseCard[] = [
  {
    id: 'conduite-travaux',
    title: 'Conduite de travaux',
    description:
      'Comptes rendus de chantier, planning, suivi des réserves, DOE et gestion documentaire.',
    iaExample: 'Ex. : structurer un CR ou un plan d’actions à partir de notes terrain.',
  },
  {
    id: 'etudes-prix-ao',
    title: 'Études de prix et appels d’offres',
    description: 'Analyse de DCE, CCTP, CCAP, DPGF, chiffrage et mémoire technique.',
    iaExample: 'Ex. : lister les pièces d’un mémoire technique à partir d’un DCE.',
  },
  {
    id: 'bureau-etudes-moe',
    title: 'Bureau d’études et maîtrise d’œuvre',
    description: 'Analyse documentaire, préparation de réunions, suivi des études et documents techniques.',
    iaExample: 'Ex. : comparer des pièces techniques et préparer une note de synthèse.',
  },
  {
    id: 'gestion-admin-commerciale',
    title: 'Gestion administrative et commerciale',
    description: 'Devis, relances clients, courriers, suivi des affaires et organisation.',
    iaExample: 'Ex. : relire un devis ou un courrier client avant envoi.',
  },
  {
    id: 'direction-entreprise-btp',
    title: 'Direction d’entreprise',
    description:
      'Organisation interne, analyse d’informations, création d’assistants IA et automatisation de tâches.',
    iaExample: 'Ex. : cadrer un protocole d’usage IA adapté à la taille de l’entreprise.',
  },
];

export const CONSULTANT_SELECTION_STEPS = [
  { title: 'Candidature', body: 'Dépôt du dossier en ligne ou par email.' },
  { title: 'Analyse du profil', body: 'Étude du parcours BTP et des usages IA.' },
  { title: 'Échange', body: 'Entretien en visio ou sur site si un besoin correspond.' },
  { title: 'Collaboration', body: 'Intégration au réseau formateurs pour 2027.' },
] as const;

export const CONSULTANT_SELECTION_DISCLAIMER =
  'Le dépôt d’une candidature ne garantit pas l’attribution d’une mission.' as const;
