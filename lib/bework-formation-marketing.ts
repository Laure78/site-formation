/**
 * Contenus marketing BeWork — alignés sur bework.fr (formation créer avec l’IA).
 * Affichés sur la fiche catalogue OFC NIV-10 (design site laureolivie.fr conservé).
 */

export const BEWORK_HERO_PILLARS = [
  { title: 'Une pratique concrète', desc: 'Vous manipulez les outils et avancez sur votre idée.' },
  { title: 'Un accompagnement direct', desc: 'En petit groupe, avec un formateur à vos côtés.' },
  { title: 'Une première création', desc: 'Dès le Jour 1 — une version fonctionnelle à tester.' },
] as const;

export const BEWORK_PROJECT_EXAMPLES = [
  { title: 'Messagerie', desc: 'Échanges et suivi de conversations.' },
  { title: 'Agenda', desc: 'Organisation des rendez-vous et de la semaine type.' },
  { title: 'Réservation', desc: 'Créneaux et demandes clients.' },
  { title: 'Tableau de bord', desc: 'Indicateurs et suivi d’activité.' },
  { title: 'Espace client', desc: 'Documents partagés et validations.' },
] as const;

export const BEWORK_METIERS_IDEES = [
  'Artisan',
  'Indépendant',
  'Commerce',
  'Restaurant',
  'Agence',
  'Immobilier',
  'Entreprise',
  'Porteur de projet',
] as const;

export const BEWORK_IA_ETAPES = [
  {
    step: '01',
    title: 'IA de conception',
    desc: 'Clarifier l’ambition, les usages et les priorités.',
    tags: ['Besoin', 'Idées', 'Priorités'],
  },
  {
    step: '02',
    title: 'IA de structuration',
    desc: 'Organiser le projet pour avancer étape par étape.',
    tags: ['Parcours', 'Écrans', 'Fonctions'],
  },
  {
    step: '03',
    title: 'IA de création',
    desc: 'Transformer le plan en résultat visible et manipulable.',
    tags: ['Interface', 'Contenu', 'Actions'],
  },
  {
    step: '04',
    title: 'IA de vérification',
    desc: 'Tester, repérer les incohérences et sécuriser les évolutions.',
    tags: ['Tests', 'Cohérence', 'Corrections'],
  },
  {
    step: '05',
    title: 'IA d’amélioration',
    desc: 'Affiner l’expérience et préparer les prochaines versions.',
    tags: ['Clarté', 'Fluidité', 'Progression'],
  },
] as const;

export const BEWORK_JOUR1_FLOW = [
  'Comprendre',
  'Préparer',
  'Créer',
  'Modifier',
  'Tester',
] as const;

export const BEWORK_JOUR2_FLOW = [
  'Structurer',
  'Ajouter des fonctions',
  'Approfondir',
  'Tester',
  'Corriger',
  'Améliorer',
] as const;

/** Sous-titre unique — ne pas dupliquer ailleurs dans la section Jour 1 (ex. photo + titre). */
export const BEWORK_JOUR1_EYEBROW = 'Jour 1 · Parcours commun' as const;

export const BEWORK_JOUR1_LEAD =
  'Le Jour 1, vous cadrez votre idée, manipulez les outils, construisez une première version et la testez — avec un accompagnement en petit groupe.' as const;

export type BeworkJourneePratiqueTone = 'blue' | 'violet' | 'peach' | 'mint';

export const BEWORK_JOURNEE_PRATIQUE: ReadonlyArray<{
  title: string;
  desc: string;
  tone: BeworkJourneePratiqueTone;
}> = [
  {
    title: 'Cadrer son idée',
    desc: 'Clarifier le besoin, les usages et ce que vous visez à l’issue de la journée.',
    tone: 'blue',
  },
  {
    title: 'Construire sur son ordinateur',
    desc: 'Manipuler les outils et avancer sur votre projet, pas sur un exemple générique.',
    tone: 'violet',
  },
  {
    title: 'Tester et corriger',
    desc: 'Vérifier ce qui fonctionne, repérer les écarts et ajuster avec le formateur.',
    tone: 'peach',
  },
  {
    title: 'Repartir avec une méthode',
    desc: 'Une feuille de route pour continuer après la session, à votre rythme.',
    tone: 'mint',
  },
];

export const BEWORK_COMPETENCES_REPARTIE = [
  {
    title: 'Structurer une idée',
    desc: 'Transformer un besoin en projet clair.',
  },
  {
    title: 'Formuler une demande',
    desc: 'Expliquer précisément ce que vous voulez obtenir.',
  },
  {
    title: 'Lancer une première création',
    desc: 'Passer de l’idée à une première version concrète.',
  },
  {
    title: 'Tester et corriger',
    desc: 'Identifier ce qui fonctionne et ce qui doit évoluer.',
  },
  {
    title: 'Améliorer',
    desc: 'Ajouter, modifier et affiner progressivement.',
  },
  {
    title: 'Continuer',
    desc: 'Poursuivre son projet après la formation.',
  },
] as const;

export const BEWORK_MODALITES = [
  {
    title: 'Inter-entreprises',
    desc: 'Sessions programmées en petit groupe — présentiel en Île-de-France uniquement (inter ou intra).',
  },
  {
    title: 'Intra-entreprise',
    desc: 'Session dédiée sur devis, dans vos locaux en Île-de-France.',
  },
] as const;

export const BEWORK_FAQ = [
  {
    q: 'Faut-il savoir coder ?',
    a: 'Non. La formation est conçue pour des personnes qui ne viennent pas du développement informatique.',
  },
  {
    q: 'Est-ce adapté aux débutants ?',
    a: 'Oui. Vous partez de zéro et repartez avec une méthode, un environnement prêt et une première création fonctionnelle.',
  },
  {
    q: 'Puis-je commencer par 1 jour et prolonger ensuite ?',
    a: 'Oui. Commencez par la journée de 7 h (300 €), puis ajoutez le deuxième jour (300 € supplémentaires) pour le parcours 14 h si vous souhaitez aller plus loin.',
  },
] as const;

export const BEWORK_CLOSING_LINE =
  'Une journée pour apprendre à commencer. Deux pour construire plus loin.' as const;
