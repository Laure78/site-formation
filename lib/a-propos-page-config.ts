/**
 * Page `/a-propos` — contenu UX et preuves vérifiées (source unique page).
 */
import { PREUVES } from '@/lib/constants';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { OFC_IDENTITE, QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import {
  LAURE_OLIVIE_BIO_REFERENCE,
  LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES,
} from '@/lib/laure-olivie-profile';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { MENTION_MARQUE_EXPLOITANTE } from '@/lib/marque-identite';
import { LINKEDIN_LEARNING_INSTRUCTOR_HREF } from '@/lib/linkedin-learning-a-propos-embeds';
import { PARTNER_WEBSITES, LOGO_UMB_FFB, LOGO_MONITEUR_FORMATIONS } from '@/lib/client-logos';
import type { FAQItem } from '@/lib/faq';

export const A_PROPOS_PAGE_H1 = 'Organisme de formation IA pour les PME du BTP' as const;

export const A_PROPOS_PAGE_SUBTITLE =
  'Laure Olivié forme les dirigeants et les équipes du bâtiment et des travaux publics à l’intelligence artificielle — fondatrice et formatrice principale, organisme certifié Qualiopi.' as const;

export const A_PROPOS_PAGE_PROOF_LINE =
  'Organisme certifié Qualiopi · Spécialisation IA BTP · Instructrice LinkedIn Learning' as const;

/** Page principale « organisme de formation IA BTP » (≠ `/formateur-ia-btp` → « formateur »). */
export const A_PROPOS_PAGE_META_TITLE = 'Organisme de formation IA BTP | Laure Olivié' as const;

export const A_PROPOS_PAGE_META_DESCRIPTION =
  'Laure Olivié forme les PME du BTP à l’IA : devis, appels d’offres et conduite de travaux. En présentiel en Île-de-France. Qualiopi.' as const;

/** Introduction éditoriale — identité organisme (hero / positionnement). */
export const A_PROPOS_ORGANISME_INTRO =
  'Laure Olivié accompagne les dirigeants et les équipes des PME du bâtiment et des travaux publics dans l’utilisation de l’intelligence artificielle. Les formations portent sur les documents et les tâches du quotidien : devis, appels d’offres, comptes rendus et suivi de chantier. Elles se déroulent en présentiel en Île-de-France.' as const;

/** Bloc GEO « En bref » — page organisme / entité. */
export const A_PROPOS_PAGE_EN_BREF =
  "Laure Olivié, organisme de formation certifié Qualiopi (OFC Création d'Entreprise), est spécialisé en intelligence artificielle appliquée au bâtiment et aux travaux publics. Les sessions (Claude, ChatGPT) couvrent devis, DCE, mémoires techniques et comptes rendus — en présentiel en Île-de-France, pour dirigeants, conducteurs de travaux et fonctions support.";

/** Description JSON-LD Person — page À propos uniquement (facts vérifiés). */
export function getAProposPagePersonDescription(): string {
  return `Formatrice IA spécialisée BTP. Direction d'une entreprise de travaux publics et revêtements (2017-2024). Instructrice LinkedIn Learning. Organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale}).`;
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
    text: 'Formations finançables CPF : création d’entreprise et marketing digital, en indépendante, avant la spécialisation IA pour le BTP avec OFC.',
  },
  {
    period: '2022 – auj.',
    title: 'Laure Olivié — formatrice IA pour le BTP',
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
      detail: `Organisme certifié Qualiopi — actions de formation · certificat n° ${QUALIOPI_LEGAL.certificatNumero} · validité ${QUALIOPI_LEGAL.certificatValidite}`,
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
    q: 'Laure Olivié est-elle un organisme de formation IA pour le BTP ?',
    a: `Oui. Laure Olivié est la marque commerciale de OFC Création d'Entreprise, organisme certifié Qualiopi qui dispense les formations en intelligence artificielle pour les entreprises du bâtiment et des travaux publics — devis, appels d'offres, conduite de travaux — en présentiel en ${IDF_ZONE_INTERVENTION}. Laure Olivié en est la fondatrice. <a href="${LINKS.formations}">Découvrir les formations IA pour le BTP</a> · <a href="${LINKS.formateurs}">Voir l'équipe de formateurs</a>.`,
  },
  {
    q: 'Qui est Laure Olivié ?',
    a: `Laure Olivié est une formatrice en intelligence artificielle appliquée aux entreprises du bâtiment et des travaux publics, en présentiel en Île-de-France. ${LAURE_OLIVIE_BIO_REFERENCE} Elle intervient aussi comme instructrice LinkedIn Learning (deux cours sur l’IA et les TPE). Parcours détaillé sur cette page ; programmes : <a href="${LINKS.formations}">catalogue des formations IA BTP</a>.`,
  },
  {
    q: 'Quelle est son expérience dans le BTP ?',
    a: `Laure Olivié s’appuie sur ${formatAnneesExperienceBTP()} dans le BTP, dont la direction d’ALIA BTP, PME de travaux publics et revêtements (2017-2024), et une expérience antérieure de chargée de formation au CNFPT (2009-2019). Elle connaît le vocabulaire chantier (DCE, CCTP, CR, mémoires techniques, devis) et forme depuis 2022 sur des documents métier réels. Références : <a href="${LINKS.partenaires}">partenaires et réseaux BTP</a>.`,
  },
  {
    q: 'Quel est le lien entre Laure Olivié et OFC Création d’Entreprise ?',
    a: `${MENTION_MARQUE_EXPLOITANTE} Les formations sont délivrées au nom de l’organisme certifié Qualiopi (certificat n° ${QUALIOPI_LEGAL.certificatNumero}, NDA ${SCHEMA_CONTACT.nda}) ; Laure Olivié en est la fondatrice et la formatrice principale. ${MODALITE_FORMATIONS_PRESENTIEL} — zone : ${IDF_ZONE_INTERVENTION}.`,
  },
];

export function getFaqAProposPage(): readonly FAQItem[] {
  return FAQ_A_PROPOS_PAGE;
}
