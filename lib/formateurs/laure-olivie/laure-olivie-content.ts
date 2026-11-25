/**
 * Contenu fiche `/formateurs/laure-olivie` — aligné sur `/a-propos` (faits vérifiés).
 */
import type { FormationNiveau } from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { A_PROPOS_REFERENCES_LOGOS } from '@/lib/a-propos-page-config';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { formationNiveauOfficielLabel } from '@/lib/formation-niveaux-officiels';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES } from '@/lib/laure-olivie-profile';
import { LINKEDIN_LEARNING_INSTRUCTOR_HREF } from '@/lib/linkedin-learning-a-propos-embeds';
import { PARTNER_WEBSITES } from '@/lib/client-logos';
import { LINKS } from '@/lib/internal-links';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';
import { SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL } from '@/lib/schema-constants';

export const LAURE_OLIVIE_SLUG = 'laure-olivie' as const;
export const LAURE_OLIVIE_PATH = `/formateurs/${LAURE_OLIVIE_SLUG}` as const;

export const LAURE_OLIVIE_METADATA = {
  title: 'Laure Olivié | Formatrice IA BTP – Île-de-France',
  description:
    'Laure Olivié, formatrice IA BTP en Île-de-France. Fondatrice OFC (Qualiopi). Ex-dirigeante ALIA BTP, instructrice LinkedIn Learning. Formations présentiel.',
} as const;

export const LAURE_OLIVIE_EN_BREF =
  'Laure Olivié est fondatrice et formatrice principale d’OFC Création d’Entreprise (marque commerciale Laure Olivié), organisme certifié Qualiopi. Formatrice en intelligence artificielle appliquée au BTP, elle anime l’ensemble du catalogue IA en présentiel en Île-de-France — instructrice LinkedIn Learning, coordinatrice pédagogique de l’équipe.';

export const LAURE_FORMATIONS_SECTION_ID = 'laure-formations' as const;

export const LAURE_EXPERTISE_CARDS = [
  {
    key: 'ao',
    title: 'Appels d’offres BTP',
    body: 'Analyse des DCE, CCTP, CCAP, DPGF et rédaction des mémoires techniques.',
  },
  {
    key: 'travaux',
    title: 'Conduite de travaux',
    body: 'Comptes rendus de chantier, plannings, PPSPS, DOE et suivi des réserves.',
  },
  {
    key: 'devis',
    title: 'Devis et chiffrage',
    body: 'Structuration des devis et assistance à la préparation des offres commerciales.',
  },
  {
    key: 'gestion',
    title: 'Direction et gestion de PME',
    body: 'Simplification des tâches administratives, commerciales et organisationnelles.',
  },
  {
    key: 'assistants',
    title: 'Assistants et agents IA',
    body: 'Création d’assistants personnalisés adaptés aux documents et processus métier.',
  },
  {
    key: 'auto',
    title: 'Automatisation et applications métier',
    body: 'Automatisation des tâches répétitives et création d’outils numériques adaptés aux entreprises du BTP.',
  },
] as const;

export type LaureTimelineStep = {
  periode: string;
  titre: string;
  intro?: string;
  bullets?: readonly string[];
  detail?: string;
};

/** Antéchronologique — source : page À propos / brief validé. */
export const LAURE_TIMELINE: readonly LaureTimelineStep[] = [
  {
    periode: 'Depuis 2022',
    titre: 'Formatrice IA BTP — OFC Création d’Entreprise',
    intro: 'Laure Olivié (marque commerciale et formatrice principale).',
    bullets: [
      'Conception et animation de formations IA BTP.',
      'Création de supports pédagogiques et de ressources métier.',
      'Accompagnement des PME du bâtiment et des travaux publics.',
      'Coordination pédagogique des formateurs.',
    ],
  },
  {
    periode: '2024 – 2026',
    titre: 'LinkedIn Learning et réseaux professionnels BTP',
    bullets: [
      'Publication de deux cours LinkedIn Learning.',
      'Interventions auprès de fédérations professionnelles et d’organismes de formation.',
    ],
  },
  {
    periode: '2017 – 2024',
    titre: 'Dirigeante d’ALIA BTP',
    intro: 'Entreprise francilienne de travaux publics et revêtements.',
    bullets: [
      'Direction et gestion de l’entreprise.',
      'Conduite et coordination de chantiers.',
      'Devis, chiffrage et appels d’offres.',
      'Organisation des équipes.',
      'Développement commercial.',
      'Pilotage de l’activité.',
    ],
  },
  {
    periode: '2019 – 2022',
    titre: 'Formatrice indépendante',
    bullets: [
      'Formation en création d’entreprise.',
      'Formation en marketing digital.',
      'Accompagnement des entrepreneurs.',
    ],
  },
  {
    periode: '2009 – 2019',
    titre: 'Chargée de formation — CNFPT Grande Couronne',
    bullets: [
      'Gestion et coordination de formations pour les agents publics.',
      'Organisation des parcours de formation.',
      'Logistique et suivi administratif.',
    ],
  },
];

export const LAURE_DIPLOMES = [
  {
    id: 'cnam',
    title: 'Master Stratégie d’entreprise',
    body: 'CNAM Paris — 2021.',
  },
  {
    id: 'linkedin',
    title: 'Instructrice LinkedIn Learning',
    body: 'Deux cours publiés sur l’intelligence artificielle appliquée au BTP et aux TPE/PME.',
    href: SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
    external: true,
  },
  {
    id: 'francenum',
    title: 'Activateur France Num',
    body: 'Accompagnement numérique des entreprises.',
    href: PARTNER_WEBSITES.franceNumActivateur,
    external: true,
  },
] as const;

export const LAURE_REFERENCES_LOGOS = A_PROPOS_REFERENCES_LOGOS;

export const LAURE_LINKEDIN_COURSES = LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES;
export const LAURE_LINKEDIN_INSTRUCTOR_HREF = LINKEDIN_LEARNING_INSTRUCTOR_HREF;

export const LAURE_PEDAGOGIE = [
  'Exercices sur des documents métier.',
  'Environ 70 % de pratique.',
  'Méthodes et ressources réutilisables.',
  'Confidentialité et vérification humaine des productions IA.',
] as const;

export const LAURE_FORMATIONS_INTRO =
  'Laure Olivié intervient sur l’ensemble des formations en intelligence artificielle appliquée au BTP proposées par son organisme, du niveau débutant au niveau approfondi.';

const TARIF_PAR_NIVEAU: Record<FormationNiveau, number> = {
  1: TARIF_PARTICIPANT_NIV01_HT,
  2: TARIF_PARTICIPANT_NIV02_HT,
  3: TARIF_PARTICIPANT_NIV10_14H_HT,
};

export function laureFormationsNiveauResume(niveau: FormationNiveau): string {
  const def = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === niveau);
  const duree = def?.accueilDuree ?? (niveau === 3 ? '14 h' : '4 h');
  return `${formationNiveauOfficielLabel(niveau)} — ${duree} — ${TARIF_PAR_NIVEAU[niveau]} € HT / participant`;
}

export function getLaureOlivieFaqItems(): readonly FAQItem[] {
  return [
    {
      q: 'Qui est Laure Olivié ?',
      a: 'Laure Olivié est une formatrice spécialisée en intelligence artificielle appliquée au bâtiment et aux travaux publics. Ancienne dirigeante d’ALIA BTP, elle est fondatrice d’OFC Création d’Entreprise, organisme certifié Qualiopi.',
    },
    {
      q: 'Quelle est son expérience dans le BTP ?',
      a: 'Elle dispose de sept années d’expérience dans le BTP, notamment à la direction d’ALIA BTP entre 2017 et 2024.',
    },
    {
      q: 'Quelle est son expérience dans la formation professionnelle ?',
      a: 'Elle a exercé pendant dix ans au CNFPT Grande Couronne dans la gestion et la coordination de formations professionnelles, avant de devenir formatrice indépendante puis de se spécialiser dans l’intelligence artificielle appliquée au BTP.',
    },
    {
      q: 'Quelles formations dispense-t-elle ?',
      a: 'Elle intervient sur l’ensemble des formations IA BTP du catalogue publié, de l’initiation aux assistants IA, agents IA et automatisations.',
    },
    {
      q: 'Où intervient-elle ?',
      a: 'En présentiel, exclusivement en Île-de-France, auprès des dirigeants et collaborateurs des PME du bâtiment et des travaux publics.',
    },
    {
      q: 'Quel est le lien entre Laure Olivié et OFC Création d’Entreprise ?',
      a: 'Laure Olivié est la fondatrice et la formatrice principale d’OFC Création d’Entreprise. Son nom constitue également la marque commerciale de l’organisme.',
    },
    {
      q: 'Les formations sont-elles finançables par Constructys ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE} Voir le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
    },
  ];
}