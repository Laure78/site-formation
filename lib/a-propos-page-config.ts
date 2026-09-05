/**
 * Page `/a-propos` — contenu UX et preuves vérifiées (source unique page).
 */
import { PREUVES } from '@/lib/constants';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import {
  LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES,
} from '@/lib/laure-olivie-profile';
import { LINKEDIN_LEARNING_INSTRUCTOR_HREF } from '@/lib/linkedin-learning-a-propos-embeds';
import { PARTNER_WEBSITES, LOGO_UMB_FFB, LOGO_MONITEUR_FORMATIONS } from '@/lib/client-logos';
import type { FAQItem } from '@/lib/faq';

export const A_PROPOS_PAGE_H1 = 'Laure Olivié, formatrice IA spécialisée dans le BTP' as const;

export const A_PROPOS_PAGE_SUBTITLE =
  'J’aide les entreprises du bâtiment et des travaux publics à utiliser l’IA sur leurs devis, documents de chantier et appels d’offres.' as const;

export const A_PROPOS_PAGE_PROOF_LINE =
  'OFC certifié Qualiopi · Expérience en entreprise BTP · Instructrice LinkedIn Learning' as const;

export const A_PROPOS_PAGE_META_TITLE = 'Laure Olivié | Formatrice IA spécialisée BTP' as const;

export const A_PROPOS_PAGE_META_DESCRIPTION =
  'Découvrez le parcours de Laure Olivié, formatrice spécialisée dans l’IA appliquée aux devis, chantiers et appels d’offres des entreprises du BTP.' as const;

/** Description JSON-LD Person — page À propos uniquement (facts vérifiés). */
export function getAProposPagePersonDescription(): string {
  return `Formatrice IA spécialisée BTP. Direction d'une entreprise de travaux publics et revêtements (2017-2024). Instructrice LinkedIn Learning. OFC Création d'Entreprise est certifié Qualiopi.`;
}

export const A_PROPOS_POSITIONNEMENT = [
  `Après une expérience de chargée de formation au CNFPT Grande Couronne (2009-2019), la direction d'ALIA BTP, entreprise de travaux publics et revêtements (2017-2024), et une activité de formatrice indépendante (2019-2022) en création d'entreprise et marketing digital (CPF), j'ai structuré OFC Création d'Entreprise en 2022 autour de formations IA pour le BTP.`,
  `Je forme en présentiel en Île-de-France des dirigeants, conducteurs de travaux et fonctions support sur leurs documents réels : devis, comptes rendus, DCE et mémoires techniques. Chaque production de l'IA est relue avant envoi ou décision.`,
] as const;

export const A_PROPOS_APPORTS = [
  {
    title: 'Comprendre les métiers',
    text: 'Vocabulaire chantier, contraintes de planning, documents de marché et organisation des équipes BTP.',
  },
  {
    title: 'Former par la pratique',
    text: 'Exercices sur des situations professionnelles : structurer un devis, analyser un extrait de DCE, rédiger un compte rendu.',
  },
  {
    title: 'Encadrer les usages',
    text: 'Confidentialité des données, limites de l’outil et vérification systématique des résultats.',
  },
] as const;

export const A_PROPOS_PARCOURS = [
  {
    period: '2009 – 2019',
    title: 'Formation professionnelle — CNFPT Grande Couronne',
    text: 'Gestion et coordination de formations pour agents publics : parcours adultes, logistique et suivi administratif.',
  },
  {
    period: '2017 – 2024',
    title: 'Direction d’ALIA BTP — travaux publics & revêtements',
    text: 'Fondation et gestion d’une PME francilienne : chantiers, équipes, commercial et pilotage d’activité.',
  },
  {
    period: '2019 – 2022',
    title: 'Formatrice indépendante — création d’entreprise & marketing digital',
    text: 'Formations finançables CPF : création d’entreprise et marketing digital, en indépendante, avant la spécialisation IA BTP avec OFC.',
  },
  {
    period: '2022 – auj.',
    title: 'OFC Création d’Entreprise — formatrice IA BTP',
    text: 'Sessions courtes en présentiel pour entreprises du bâtiment et des travaux publics. Organisme certifié Qualiopi (actions de formation).',
  },
  {
    period: '2024 – 2026',
    title: 'LinkedIn Learning & réseaux BTP',
    text: 'Publication de deux cours LinkedIn Learning. Interventions pour fédérations et organismes de formation — détail sur la page références.',
  },
] as const;

export type AProposConfianceItem = {
  label: string;
  detail: string;
  href?: string;
  external?: boolean;
};

export function getAProposConfianceItems(): AProposConfianceItem[] {
  return [
    {
      label: 'Qualiopi',
      detail: `OFC certifié — actions de formation · certificat n° ${QUALIOPI_LEGAL.certificatNumero} · validité ${QUALIOPI_LEGAL.certificatValidite}`,
      href: LINKS.certificatQualiopi,
    },
    {
      label: 'NDA',
      detail: `${SCHEMA_CONTACT.nda} — Cet enregistrement ne vaut pas agrément de l'État.`,
      href: LINKS.qualiopi,
    },
    {
      label: 'Satisfaction',
      detail: `${PREUVES.satisfaction} · ${PREUVES.repondants} répondants · période ${PREUVES.periode}`,
      href: LINKS.indicateursResultats,
    },
    {
      label: 'Master Stratégie d’entreprise',
      detail: 'CNAM Paris — 2021',
    },
    {
      label: 'LinkedIn Learning',
      detail: 'Instructrice — 2 cours publiés sur l’IA appliquée au BTP et aux TPE',
      href: LINKEDIN_LEARNING_INSTRUCTOR_HREF,
      external: true,
    },
    {
      label: 'Activateur France Num',
      detail: 'Référencée sur francenum.gouv.fr pour l’accompagnement numérique TPE/PME',
      href: PARTNER_WEBSITES.franceNumActivateur,
      external: true,
    },
  ];
}

export const A_PROPOS_REFERENCES_LOGOS = [
  {
    id: 'ffb-gp',
    name: 'FFB Grand Paris',
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    alt: 'Logo FFB Grand Paris — fédération du bâtiment Île-de-France',
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    name: 'CSFE',
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: "Logo CSFE — Chambre Syndicale Française de l'Étanchéité",
    width: 360,
    height: 120,
  },
  {
    id: 'umb',
    name: 'UMB-FFB',
    src: LOGO_UMB_FFB.src,
    alt: LOGO_UMB_FFB.alt,
    width: LOGO_UMB_FFB.width,
    height: LOGO_UMB_FFB.height,
  },
  {
    id: 'cnam',
    name: 'CNAM Entreprise',
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    alt: 'Logo CNAM Entreprises',
    width: 220,
    height: 72,
  },
  {
    id: 'moniteur-formations',
    name: 'Le Moniteur Formations',
    src: LOGO_MONITEUR_FORMATIONS.src,
    alt: LOGO_MONITEUR_FORMATIONS.alt,
    width: LOGO_MONITEUR_FORMATIONS.width,
    height: LOGO_MONITEUR_FORMATIONS.height,
  },
] as const;

export const A_PROPOS_METHODE = [
  'Partir d’un besoin métier concret (devis, CR, dossier marché, mail client).',
  'Pratiquer sur des exemples adaptés au groupe, avec anonymisation des données sensibles.',
  'Structurer des prompts et trames réutilisables dans l’entreprise.',
  'Vérifier chaque résultat avant envoi, signature ou décision.',
] as const;

export const A_PROPOS_MODALITES_RESUME =
  `${MODALITE_FORMATIONS_PRESENTIEL} Catalogue détaillé sur la page formations du site.` as const;

export const A_PROPOS_LINKEDIN_COURSES = LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES;

export const FAQ_A_PROPOS_PAGE: FAQItem[] = [
  {
    q: 'Quels professionnels du BTP formez-vous ?',
    a: 'Dirigeants de TPE/PME, conducteurs de travaux, chefs de chantier, fonctions support et équipes administratives — selon le programme choisi dans le catalogue formations IA BTP.',
  },
  {
    q: 'Où se déroulent les formations ?',
    a: `En présentiel en Île-de-France (${IDF_ZONE_INTERVENTION}) : sessions intra-entreprise dans vos locaux ou interventions convoquées par un réseau.`,
  },
  {
    q: 'Comment choisir une formation ?',
    a: 'Parcourez le catalogue (lien en tête de page), identifiez le parcours adapté à votre métier ou réservez un échange de cadrage via le formulaire Calendly en bas de page.',
  },
];

export function getFaqAProposPage(): readonly FAQItem[] {
  return FAQ_A_PROPOS_PAGE;
}
