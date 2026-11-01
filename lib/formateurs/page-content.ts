import { LINKS } from '@/lib/internal-links';

/** Contenu éditorial — page institutionnelle /formateurs. */
export const FORMATEURS_PAGE_HERO = {
  eyebrow: 'NOTRE ÉQUIPE · FORMATION IA BTP',
  titleBefore: 'Les ',
  titleHighlight: 'formateurs',
  titleAfter: ' qui vous accompagnent',
  intro:
    'Une expertise métier et une pédagogie concrète pour les professionnels du bâtiment et des travaux publics.',
  badges: ['Expertise BTP', 'IA appliquée aux métiers', 'Présentiel Île-de-France'] as const,
  primaryCtaLabel: 'Découvrir les formateurs',
  primaryCtaHash: '#notre-equipe',
  secondaryCtaLabel: 'Trouver ma formation',
  imageBadge: 'IA + expertise terrain',
} as const;

export const FORMATEURS_INFO_STRIP = [
  { key: 'metier', label: 'Formations métier' },
  { key: 'cas', label: 'Cas concrets' },
  { key: 'presentiel', label: 'Présentiel' },
  { key: 'idf', label: 'Île-de-France' },
] as const;

export const FORMATEURS_TEAM_SECTION = {
  id: 'notre-equipe',
  heading: 'Découvrez notre équipe',
  intro:
    'Des intervenants issus ou proches du terrain BTP et Laure Olivié, référente IA et coordinatrice pédagogique, pour des formations ancrées dans vos documents et vos métiers.',
} as const;

export const FORMATEURS_METIERS_SECTION = {
  heading: 'Des formations ancrées dans vos métiers',
  items: [
    {
      key: 'devis',
      title: 'Devis et chiffrage',
      href: LINKS.formationIaEtudesPrixChiffrageBtp,
    },
    {
      key: 'dce',
      title: 'DCE et appels d’offres',
      href: LINKS.formationAO,
    },
    {
      key: 'conduite',
      title: 'Conduite de travaux',
      href: LINKS.formationConduiteTravauxSuiviChantier,
    },
    {
      key: 'doc',
      title: 'Gestion documentaire',
      href: LINKS.formationIaAssistanteBtp,
    },
    {
      key: 'ia',
      title: 'IA appliquée au BTP',
      href: LINKS.formationIaBtp,
    },
  ],
} as const;

export const FORMATEURS_PEDAGOGIE_SECTION = {
  heading: 'Une pédagogie concrète, adaptée au terrain',
  body:
    'Les participants travaillent sur des cas pratiques liés à leurs fonctions : devis, DCE, CCTP, comptes rendus, planning, DOE ou PPSPS — selon le programme choisi, avec relecture et vérification des productions de l’IA.',
  points: [
    'Exercices sur documents métier',
    'Vérification des résultats produits avec l’IA',
    'Formations en présentiel en Île-de-France',
  ] as const,
} as const;

export const FORMATEURS_PRIMARY_CTA = {
  heading: 'Trouvons la formation adaptée à votre équipe',
  body: 'Un échange pour définir vos besoins, vos objectifs et le format le plus adapté.',
  visioSrc: 'formateurs-cta-bandeau',
} as const;

export const FORMATEURS_RECRUTEMENT_BAND = {
  heading: 'Vous êtes professionnel du BTP et souhaitez former ?',
  body: 'Découvrez comment rejoindre notre réseau de formateurs et partager votre expertise.',
  ctaLabel: 'Rejoindre notre réseau',
} as const;
