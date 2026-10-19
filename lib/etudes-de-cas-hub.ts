import { LINKS } from '@/lib/internal-links';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { PHOTOS } from '@/lib/photos';
import type { SitePhotoAsset } from '@/lib/photo-seo';
import type { FAQItem } from '@/lib/faq';

/**
 * Hub `/etudes-de-cas` — faits repris des pages études (ne pas inventer de chiffres).
 * Sources : `app/etudes-de-cas/ffb-csfe/page.tsx`, `app/etudes-de-cas/compte-rendu-vocal-chantier-btp/page.tsx`.
 */

export const ETUDES_DE_CAS_HERO = {
  eyebrow: 'INTELLIGENCE ARTIFICIELLE · BTP',
  title: "Études de cas : l'IA appliquée aux métiers du BTP",
  subtitle:
    'Des exemples concrets pour découvrir comment l\'intelligence artificielle accompagne les professionnels du bâtiment dans leurs tâches quotidiennes.',
} as const;

export type EtudeDeCasHubCard = {
  href: typeof LINKS.etudesCasFfbCsfe | typeof LINKS.etudesCasCrVocalChantier;
  category: string;
  title: string;
  description: string;
  keyFacts: readonly string[];
  linkLabel: string;
  photo: SitePhotoAsset;
  /** `photo` = session réelle ; `illustration` = schéma d'usage (pas une séance client). */
  visualKind: 'photo' | 'illustration';
  formationHref: string;
  formationLabel: string;
  /** Afficher le disclaimer Qualiopi sur les ordres de grandeur chiffrés. */
  showGainsDisclaimer: boolean;
};

export const ETUDES_DE_CAS_HUB_CARDS: readonly EtudeDeCasHubCard[] = [
  {
    href: LINKS.etudesCasFfbCsfe,
    category: 'Formation IA BTP',
    title: 'Former les professionnels du bâtiment à l\'IA',
    description:
      'Sessions en présentiel pour le réseau FFB et la filière étanchéité : mémoires, dossiers marchés, devis et tâches administratives avec validation humaine.',
    keyFacts: [
      `Partenaires : FFB (Grand Paris, IDF) et ${CSFE_NOM_LIBRE}`,
      'Cinq modules — documents et administratif',
      'Ordre de grandeur observé : 3 à 5 h / semaine sur l\'administratif après mise en pratique',
    ],
    linkLabel: 'Découvrir l\'étude de cas →',
    photo: PHOTOS.accueilEtudeCasFfbLaureIntervention,
    visualKind: 'photo',
    formationHref: LINKS.formationIaBtp,
    formationLabel: 'Formation intelligence artificielle BTP',
    showGainsDisclaimer: true,
  },
  {
    href: LINKS.etudesCasCrVocalChantier,
    category: 'Conduite de travaux',
    title: 'Rédiger un compte rendu de chantier avec l\'IA',
    description:
      'Retour d\'expérience en PME gros œuvre : transformer des notes vocales en compte rendu structuré, puis relire avant diffusion aux équipes et à la MOE.',
    keyFacts: [
      'Public : conducteurs de travaux et adjoints',
      'Méthode : dictée terrain → structuration IA → relecture',
      'Rédaction observée : 45–60 min → 15–20 min ; CR souvent diffusé le jour même',
    ],
    linkLabel: 'Découvrir l\'étude de cas →',
    photo: PHOTOS.accueilCompteRenduDoePvChantier2026,
    visualKind: 'illustration',
    formationHref: LINKS.formationIaConducteurDeTravaux,
    formationLabel: 'IA et conduite de travaux',
    showGainsDisclaimer: true,
  },
] as const;

export const ETUDES_DE_CAS_METHODOLOGY_STEPS = [
  {
    title: 'Comprendre le besoin',
    description:
      'Identifier une tâche métier répétitive ou chronophage (CR, mémoire, dossier administratif).',
  },
  {
    title: 'Appliquer l\'IA',
    description:
      'Utiliser des outils appropriés pour préparer, analyser ou structurer les documents — avec des trames métier.',
  },
  {
    title: 'Vérifier et valider',
    description:
      'Contrôler les informations avant utilisation ou diffusion : l\'IA assiste, le professionnel décide.',
  },
] as const;

/** FAQ hub `/etudes-de-cas` — alignée JSON-LD FAQPage. */
export const ETUDES_DE_CAS_FAQ: readonly FAQItem[] = [
  {
    q: 'Que montrent les études de cas IA BTP publiées ici ?',
    a: `Des retours terrain documentés : problème métier, méthode avec l’IA (ChatGPT ou Claude) et contrôles humains avant diffusion. Pas de promesse de gain chiffré — voir les fiches détaillées et le <a href="${LINKS.formationIaBtp}">catalogue formations</a>.`,
  },
  {
    q: 'Les études de cas remplacent-elles une formation ?',
    a: `Non. Elles illustrent des usages ; la formation en présentiel en Île-de-France permet de pratiquer sur vos documents avec un formateur Qualiopi. <a href="${LINKS.prendreRdv}">Visio découverte gratuite</a> pour cadrer votre besoin.`,
  },
  {
    q: 'Peut-on reproduire la même méthode dans mon entreprise ?',
    a: 'Les principes (anonymisation, prompts, relecture) sont réutilisables, mais chaque dossier client ou chantier demande validation métier. Les études précisent les limites observées sur le terrain.',
  },
  {
    q: 'Où trouver une formation liée à un cas (CR chantier, appels d’offres) ?',
    a: `Compte rendu vocal : <a href="${LINKS.iaCompteRenduChantier}">IA compte rendu chantier</a>. Marchés : <a href="${LINKS.formationIaAppelsOffresBtp}">formation appels d’offres BTP</a> ou <a href="${LINKS.parcoursMetiers}">parcours métiers</a>.`,
  },
];

export const ETUDES_DE_CAS_SEO = {
  title: 'Études de cas IA BTP : retours terrain',
  description:
    'Études de cas intelligence artificielle bâtiment : FFB, CSFE, compte rendu de chantier avec l\'IA. Méthodes observées, présentiel Île-de-France, Qualiopi.',
} as const;

export const ETUDES_DE_CAS_INTERNAL_LINKS = [
  { href: LINKS.formationIaBtp, label: 'Formations IA BTP' },
  { href: LINKS.formationIaConducteurDeTravaux, label: 'IA et conduite de travaux' },
  { href: LINKS.formationIaAppelsOffresBtp, label: 'IA et appels d\'offres' },
  { href: LINKS.parcoursMetiers, label: 'Parcours métiers' },
  { href: LINKS.avisClients, label: 'Avis clients' },
] as const;
