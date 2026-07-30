/**
 * Configurations pages geo « formation IA BTP » par département (GeoFormationPage).
 */

import { LINKS } from '@/lib/internal-links';
import { PROOF, formatProofFormes } from '@/lib/proof';

export type GeoFormationPageSeo = {
  title: string;
  description?: string;
};

export type GeoFormationPageProps = {
  departement: string;
  code: string;
  villes: string[];
  slug: string;
  /** Surcharge titre / description (sinon template département). */
  seo?: GeoFormationPageSeo;
  h1?: string;
  /** Chapô hero (sinon texte générique). */
  heroIntro?: string;
  /** Lien montant vers fiche conversion (ex. catalogue Paris). */
  conversionLink?: { href: string; label: string };
};

export const GEO_FORMATION_CAS_USAGE = [
  'Structurer devis et relances à partir de notes terrain — chiffrage définitif validé en interne.',
  'Accélérer comptes rendus et synthèses hebdomadaires de chantier — relecture avant envoi MOE/MOA.',
  'Préparer brouillons de mémoires techniques et réponses aux marchés — exigences CCTP listées.',
  'Rédiger courriers récurrents (fournisseurs, sous-traitants) avec un ton homogène.',
  'Reformuler tableaux de suivi et plannings à partir de vos données — sans données perso non anonymisées.',
] as const;

/** Préposition française devant le nom de département (description SEO). */
export function geoFormationDepartementLabel(departement: string, code: string): string {
  if (code === '75') return 'de Paris';
  if (departement === 'Essonne') return "de l'Essonne";
  if (departement === "Val-d'Oise") return "du Val-d'Oise";
  if (departement === 'Seine-et-Marne') return 'de Seine-et-Marne';
  if (departement === 'Seine-Saint-Denis') return 'de Seine-Saint-Denis';
  if (departement === 'Val-de-Marne') return 'du Val-de-Marne';
  if (departement === 'Hauts-de-Seine') return 'des Hauts-de-Seine';
  return `des ${departement}`;
}

export function geoFormationPath(slug: string): `/formation-ia-btp-${string}` {
  return `/formation-ia-btp-${slug}`;
}

export const GEO_FORMATION_YVELINES_78: GeoFormationPageProps = {
  departement: 'Yvelines',
  code: '78',
  slug: 'yvelines-78',
  villes: [
    'Guyancourt',
    'Versailles',
    'Rambouillet',
    'Saint-Quentin-en-Yvelines',
    'Mantes-la-Jolie',
  ],
};

export const GEO_FORMATION_ESSONNE_91: GeoFormationPageProps = {
  departement: 'Essonne',
  code: '91',
  slug: 'essonne-91',
  villes: ['Massy', 'Évry-Courcouronnes', 'Palaiseau', 'Corbeil-Essonnes', 'Savigny-sur-Orge'],
};

export const GEO_FORMATION_VAL_DOISE_95: GeoFormationPageProps = {
  departement: "Val-d'Oise",
  code: '95',
  slug: 'val-doise-95',
  villes: ['Cergy', 'Pontoise', 'Argenteuil', 'Sarcelles', 'Ermont'],
};

export const GEO_FORMATION_HAUTS_DE_SEINE_92: GeoFormationPageProps = {
  departement: 'Hauts-de-Seine',
  code: '92',
  slug: 'hauts-de-seine-92',
  villes: [
    'Nanterre',
    'Boulogne-Billancourt',
    'Issy-les-Moulineaux',
    'Courbevoie',
    'Levallois-Perret',
  ],
};

export const GEO_FORMATION_PARIS_75: GeoFormationPageProps = {
  departement: 'Paris',
  code: '75',
  slug: 'paris',
  villes: [
    'Paris 1er–4e (centre & Louvre)',
    'Paris 11e–12e (Bastille, Nation)',
    'Paris 15e–16e (Beaugrenelle, Trocadéro)',
    'Paris 18e–20e (Montmartre, Belleville)',
    'Paris 13e–14e (Montparnasse, Olympiades)',
  ],
  seo: {
    title: 'Formation IA bâtiment Paris | Laure Olivié',
    description:
      `Formation IA pour le BTP à Paris : devis, DCE et comptes rendus sur vos documents. Présentiel intra, Qualiopi. ${formatProofFormes()} pros formés, ${PROOF.note}. Visio découverte.`,
  },
  h1: 'Formation IA bâtiment et construction à Paris',
  heroIntro:
    'Pour les entreprises et chantiers parisiens (intra-muros) : devis, DCE et CR en présentiel dans vos locaux — Qualiopi, Constructys selon éligibilité.',
  conversionLink: {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    label: 'Voir la fiche formation catalogue (session 4 h, tarifs & financement)',
  },
};

export const GEO_FORMATION_PAGE_CONFIGS = [
  GEO_FORMATION_YVELINES_78,
  GEO_FORMATION_ESSONNE_91,
  GEO_FORMATION_VAL_DOISE_95,
  GEO_FORMATION_HAUTS_DE_SEINE_92,
  GEO_FORMATION_PARIS_75,
] as const;

export const GEO_FORMATION_PAGE_PATHS = GEO_FORMATION_PAGE_CONFIGS.map(
  (c) => geoFormationPath(c.slug)
);
