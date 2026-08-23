import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_HAUTS_DE_SEINE_92: DepartementPageData = {
  code: '92',
  nom: 'Hauts-de-Seine',
  article: 'les',
  prepositionLocative: 'dans les',
  path: '/formation-ia-btp-hauts-de-seine-92',
  slug: 'hauts-de-seine-92',
  accroche:
    "Formation IA pour le BTP en présentiel dans les Hauts-de-Seine (92), intra-entreprise, dans vos locaux. Département de donneurs d'ordre et de tertiaire : la session cible la productivité sur l'écrit contractuel, les mémoires techniques et la conduite de travaux — Nanterre, La Défense, Boulogne, Issy.",
  villes: [
    'Nanterre',
    'Boulogne-Billancourt',
    'Issy-les-Moulineaux',
    'Courbevoie',
    'Levallois-Perret',
    'Colombes',
    'Asnières-sur-Seine',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, Nanterre / La Défense sont à environ 40 minutes à une heure selon le trafic (temps indicatifs). Boulogne, Issy et le bord de Seine se planifient en demi-journée courante pour une intra. Colombes, Asnières et Levallois suivent le même schéma logistique — créneau confirmé au devis.",
  tissuLocal:
    "Le 92 concentre sièges sociaux, opérations tertiaires et rénovation lourde, avec de nombreuses entreprises générales et maîtres d'œuvre sur des marchés exigeants et très formalisés. Proximité de Paris et de La Défense : délais courts, documentation lourde, coordination multi-lots. Les PME du bâtiment de proximité y répondent souvent aux mêmes exigences que les grands comptes. La formation travaille vos modèles réels (mails, devis, extraits CCTP) pour sécuriser conformité et relecture humaine. Les équipes y cherchent surtout un format court, sans anglicismes, utilisable dès la semaine suivante sur les dossiers en cours — pas une formation théorique hors chantier.",
  casUsageLocaux: [
    "Traiter des appels d'offres tertiaires denses : extraire les exigences du CCTP, sécuriser la conformité de l'offre avant dépôt — typique des consultations La Défense / Boulogne.",
    "Fiabiliser les comptes rendus et courriers de maîtrise d'œuvre sur des chantiers à forte coordination (La Défense, Boulogne, Issy).",
  ],
  faqLocale: [
    {
      q: 'Faites-vous des sessions à La Défense ou Boulogne-Billancourt ?',
      a: 'Oui, en intra dans vos locaux, partout dans les Hauts-de-Seine — Nanterre, Issy, Courbevoie et Levallois inclus. Depuis Guyancourt, une demi-journée se planifie sans difficulté majeure.',
    },
    {
      q: "La formation convient-elle à un maître d'œuvre ?",
      a: "Oui — un parcours dédié existe pour les MOE/MOEX (DCE, CR, OS, suivi des réserves). Sur le 92, c’est souvent le public le plus demandeur d’une méthode courte sur l’écrit contractuel.",
    },
    {
      q: 'Peut-on former une équipe tertiaire support (admin, com) ?',
      a: 'Oui, les fonctions support font partie des publics visés, avec exercices sur vos modèles de courriers et de reporting — utiles aussi pour les sièges et directions travaux du département.',
    },
  ],
  metierPertinent: {
    href: LINKS.formationIaMaitriseOeuvre,
    label: "L'IA au service des maîtres d'œuvre",
    description: 'DCE, CR chantier, réserves — cœur de métier du 92 tertiaire.',
  },
  metaTitle: buildIdfDeptPageTitle('Hauts-de-Seine', '92'),
  metaDescription: buildDeptMetaDescription(
    'Hauts-de-Seine',
    '92',
    'Nanterre, Boulogne-Billancourt et Issy-les-Moulineaux',
  ),
  keywords: [
    'formation IA pour les pros du BTP 92',
    'formation ChatGPT Hauts-de-Seine',
    'formation IA Nanterre',
    'formation IA Boulogne',
  ],
};
