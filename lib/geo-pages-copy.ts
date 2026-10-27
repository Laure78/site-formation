/**
 * Textes GEO partagés — réponses directes, sans duplication de tarifs (voir `data/formations`, `lib/tarifs-catalogue-participant`).
 */
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_CATALOGUE } from '@/lib/financement-copy';
import { formatOrganismeQualiopiCourt } from '@/lib/marque-identite';

/** Accueil — activité, publics, usages, zone (HTML autorisé dans FAQ ; ici texte brut). */
export const ACCUEIL_EN_BREF =
  'Laure Olivié forme les dirigeants et les équipes des entreprises du bâtiment et des travaux publics à utiliser l’intelligence artificielle sur leurs documents métier : devis, appels d’offres et suivi de chantier. Les formations se déroulent en présentiel en Île-de-France, dispensées par OFC Création d’Entreprise (organisme certifié Qualiopi).';

/** Catalogue `/formations` — choix par niveau + financement prudent. */
export function getFormationsCatalogueEnBref(): string {
  return `Catalogue OFC : formations IA pour le BTP en présentiel en Île-de-France (niveaux 1 à 3, usages devis à maîtrise d’œuvre). Les sessions ci-dessous sont ouvertes à l’inscription ; les parcours métiers 2027 sont présentés plus bas. ${FINANCEMENT_FORMULATION_CATALOGUE} ${formatOrganismeQualiopiCourt()}.`;
}

/** Six contrôles sur les sorties IA — guide AO BTP (synthèse HTML, alignée PDF 2026). */
export const GUIDE_AO_CONTROLES_IA = [
  {
    title: 'Sources et citations',
    text: 'Chaque chiffre, délai ou clause citée dans une synthèse IA doit être recoupé avec le RC, le CCTP, le CCAP ou la DPGF d’origine.',
  },
  {
    title: 'Articles et références contractuelles',
    text: 'Vérifier numéros d’articles, renvois entre pièces et définitions — l’IA peut fusionner ou déplacer des obligations.',
  },
  {
    title: 'Quantités et métrés',
    text: 'Les unités et quantités de l’offre restent sous contrôle humain ; l’IA prépare des listes, pas le métré définitif.',
  },
  {
    title: 'Références chantiers et moyens',
    text: 'Dans le mémoire technique, n’inscrire que des références réelles de l’entreprise — pas de chantiers ou effectifs inventés par l’IA.',
  },
  {
    title: 'Engagements et prix',
    text: 'Aucun prix, pénalité acceptée ou engagement contractuel ne part sans relecture du signataire habilité.',
  },
  {
    title: 'Confidentialité',
    text: 'Ne pas déposer de DCE nominatif ou de données personnelles dans un outil IA sans cadre entreprise (paramètres, compte pro, charte interne).',
  },
] as const;

/** Étapes courtes — analyser un DCE avec ChatGPT ou Claude (exemple pédagogique BTP). */
export const GUIDE_AO_METHODE_DCE_ETAPES = [
  {
    step: '1. Cadrer la question',
    detail:
      'Indiquer le lot, le type de marché (public ou privé) et demander une réponse structurée avec citation des pièces (RC, CCTP, CCAP, DPGF).',
  },
  {
    step: '2. Organiser les fichiers',
    detail:
      'Regrouper les PDF dans un Projet Claude ou une conversation dédiée ; en intra, n’utiliser que des extraits anonymisés si le DCE est sensible.',
  },
  {
    step: '3. Extraire les exigences',
    detail:
      'Lister délais, pénalités, prestations imposées, interfaces avec d’autres lots et documents à remettre — avec renvoi à la page source.',
  },
  {
    step: '4. Croiser CCTP et DPGF',
    detail:
      'Repérer écarts entre descriptif technique et bordereau (postes absents, unités incohérentes) avant d’ouvrir le chiffrage.',
  },
  {
    step: '5. Formaliser Go / No-Go',
    detail:
      'Décider si l’affaire est jouable (marge, délais, moyens) avant d’investir plusieurs jours sur le dossier.',
  },
  {
    step: '6. Contrôler avant usage',
    detail:
      'Appliquer la check-list des six contrôles ci-dessous avant d’intégrer une synthèse IA dans l’offre ou le mémoire.',
  },
] as const;

export const GUIDE_AO_FORMATION_RELATED = {
  href: LINKS.formationAO,
  label: 'Formation IA appels d’offres BTP (NIV-02, 7 h, présentiel Île-de-France)',
} as const;

export const GUIDE_AO_ETUDE_CAS_RELATED = {
  href: LINKS.etudesCasFfbCsfe,
  label: 'Étude de cas FFB & CSFE — mémoires et dossiers marchés en formation',
} as const;
