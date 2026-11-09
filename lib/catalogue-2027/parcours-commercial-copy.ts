/**
 * Règles commerciales communes — parcours métiers BTP (5 parcours + hub).
 * Parcours complet ≠ module unitaire (voir `disponibilite` sur chaque module catalogue).
 */
import type { CatalogueModule } from '@/data/catalogue-2027';
import { SITE_FORMATION_MODALITE_ENCART, SITE_FORMATION_MODALITE_DETAIL } from '@/lib/site-config';

/** Parcours métier complet (séquence ordonnée) — pas les modules à la carte. */
export const PARCOURS_COMPLET_DISPONIBILITE_LIBELLE =
  'Parcours complet : ouverture en 2027' as const;

export const PARCOURS_DISPONIBILITE_LIBELLE =
  'Parcours complets : ouverture en 2027. Les modules unitaires déjà au catalogue peuvent être programmés à la carte, sous réserve des prérequis et du calendrier.' as const;

/** Libellé calendrier hub / cartes parcours (parcours complet). */
export function libelleDisponibiliteParcoursMetier(): string {
  return PARCOURS_COMPLET_DISPONIBILITE_LIBELLE;
}

/** Disponibilité affichée sur une carte module dans une fiche parcours. */
export function libelleDisponibiliteModuleUnitaire(
  mod: Pick<CatalogueModule, 'disponibilite'>,
): string {
  if (mod.disponibilite === 'disponible') {
    return 'Module unitaire : sur programmation (fiche catalogue)';
  }
  return 'Module : ouverture en 2027';
}

/** @deprecated Préférer `libelleDisponibiliteModuleUnitaire(mod)`. */
export function libelleDisponibiliteModuleDansParcours(
  mod?: Pick<CatalogueModule, 'disponibilite'>,
): string {
  if (mod) return libelleDisponibiliteModuleUnitaire(mod);
  return PARCOURS_COMPLET_DISPONIBILITE_LIBELLE;
}

export const PARCOURS_MODALITE_GEO = SITE_FORMATION_MODALITE_ENCART;

export const PARCOURS_MODALITE_GEO_DETAIL = SITE_FORMATION_MODALITE_DETAIL;

export const PARCOURS_MODULARITE_DETAIL =
  'Parcours complet ou modules à la carte : chaque module peut être suivi individuellement, sous réserve des prérequis pédagogiques et du positionnement.' as const;

export const PARCOURS_QUALIOPI_ORGANISME =
  'Formation dispensée par OFC Création d’Entreprise, organisme certifié Qualiopi au titre des actions de formation.' as const;

export const PARCOURS_MARQUE_COMMERCIALE =
  'Laure Olivié est la marque commerciale d’OFC Création d’Entreprise.' as const;

export const PARCOURS_NON_CERTIFIANT =
  'Formations non certifiantes : pas de certification professionnelle ni de diplôme d’État à l’issue.' as const;

export const PARCOURS_EVALUATION_RESUME =
  'Évaluation des acquis intégrée à la durée annoncée de chaque module (exercices métier, livrables, grille de contrôle — validation humaine obligatoire).';

export const PARCOURS_INSCRIPTION_RESUME =
  'Modalités d’inscription : après étude de votre demande (devis ou prise de contact). Aucune date de session fixée sur cette page sans confirmation écrite.';

export const PARCOURS_ACCESSIBILITE_RESUME =
  'Accessibilité : contactez-nous pour étudier l’accueil et les modalités adaptées (référent handicap).';

export const PARCOURS_ORGANISATION_RESUME =
  'Organisation : cas pratiques BTP, documents anonymisés, livrables réutilisables ; outils IA (ChatGPT, Claude) selon le module.';

export const PARCOURS_ADAPTATION_INTRA =
  'Adaptation en intra-entreprise : ordre des modules, documents d’entreprise, effectif et calendrier — sur devis.';
