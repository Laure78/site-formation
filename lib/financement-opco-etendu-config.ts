/**
 * Atlas, OPCO EP et encadrés MOEX — financement selon branche (hors Constructys seul).
 * Textes centralisés pour la page financement et les blocs courts fiches / parcours.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { ParcoursId } from '@/data/catalogue-2027/types';
import { LINKS } from '@/lib/internal-links';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { FORMATION_IA_BUREAU_ETUDES_BTP_PATH } from '@/lib/formation-ia-bureau-etudes-btp-landing';
import { FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH } from '@/lib/formation-ia-metreur-economiste-construction-landing';
import { ETUDES_PRIX_CHIFFRAGE_PATH } from '@/lib/formation-ia-etudes-prix-chiffrage-btp-content';

export const FINANCEMENT_OPCO_ATLAS = {
  titre: 'Atlas — Bureaux d’études et ingénierie',
  texte:
    'Atlas accompagne notamment les entreprises relevant de la branche des bureaux d’études techniques, cabinets d’ingénieurs-conseils et sociétés de conseils. Selon le rattachement de votre entreprise, la formation de vos salariés peut faire l’objet d’une demande de prise en charge.',
  bouton: 'Consulter les critères de financement Atlas',
  href: EXTERNAL_SITE_URLS.opcoAtlasBureauxEtudes,
  lienSecondaireLabel: 'Comprendre les démarches de financement',
  lienSecondaireHref: EXTERNAL_SITE_URLS.opcoAtlasFinancerProjet,
} as const;

export const FINANCEMENT_OPCO_EP = {
  titre: 'OPCO EP — Entreprises d’architecture',
  texte:
    'OPCO EP couvre notamment la branche des entreprises d’architecture. Si votre entreprise en relève, consultez les critères applicables à la formation de vos salariés.',
  bouton: 'Consulter les critères de financement OPCO EP',
  href: EXTERNAL_SITE_URLS.opcoEpCriteresFinancement,
  indicationSousBouton:
    'Sélectionnez votre branche, notamment « Entreprises d’architecture » si votre entreprise en relève.',
} as const;

export const FINANCEMENT_MOEX_QUEL_OPCO = {
  titre: 'MOEX : quel OPCO contacter ?',
  texte:
    'Votre activité de maîtrise d’œuvre d’exécution ne suffit pas à déterminer votre OPCO. Vérifiez le rattachement de votre entreprise selon sa convention collective et sa branche professionnelle, auprès de votre service RH, de votre expert-comptable ou de l’OPCO concerné.',
} as const;

/** Mention commune — une seule fois sur la page financement (pas sous chaque carte). */
export const FINANCEMENT_PRISE_EN_CHARGE_CONDITIONS_COMMUNES =
  'La prise en charge dépend notamment de votre branche, de l’effectif de votre entreprise, du statut de la personne formée, de la formation choisie et des fonds disponibles. Elle reste soumise à l’accord du financeur. Consultez ses critères en vigueur et ses délais de dépôt avant le début de la formation. Le financement des dirigeants non salariés peut relever d’un autre fonds que celui des salariés.';

/** Bloc court — fiches formation et parcours orientés MOEX / ingénierie / BE / architecture. */
export const FINANCEMENT_OPCO_ETENDU_BLOC_COURT =
  'Selon le rattachement de votre entreprise et votre statut, une prise en charge peut être étudiée auprès de votre financeur. Consultez les modalités d’Atlas, d’OPCO EP et des autres organismes présentés sur notre page financement.';

export const FINANCEMENT_OPCO_ETENDU_LIEN_LABEL =
  'Consulter les possibilités de financement' as const;

export const FINANCEMENT_OPCO_ETENDU_PAGE_SECTION = {
  titre: 'Autres financeurs selon votre branche',
  intro:
    'Constructys couvre une large part des entreprises du Bâtiment et des Travaux Publics, mais votre OPCO dépend du rattachement conventionnel de l’entreprise. Les organismes ci-dessous concernent notamment l’ingénierie, les bureaux d’études et l’architecture.',
} as const;

/** Fiches catalogue avec bloc court Atlas / OPCO EP. */
export const FINANCEMENT_OPCO_ETENDU_CATALOGUE_REFS = [
  'NIV-02',
  'NIV-05',
] as const satisfies readonly FormationCatalogueCode[];

/** Parcours métiers avec bloc court. */
export const FINANCEMENT_OPCO_ETENDU_PARCOURS_IDS = [
  'charge-affaires-btp',
] as const satisfies readonly ParcoursId[];

/** Landings SEO métier (hors template catalogue). */
export const FINANCEMENT_OPCO_ETENDU_LANDING_PATHS = [
  FORMATION_IA_BUREAU_ETUDES_BTP_PATH,
  FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH,
  ETUDES_PRIX_CHIFFRAGE_PATH,
] as const;

export function catalogueRefShowsFinancementOpcoEtendu(
  ref: string,
): ref is (typeof FINANCEMENT_OPCO_ETENDU_CATALOGUE_REFS)[number] {
  return (FINANCEMENT_OPCO_ETENDU_CATALOGUE_REFS as readonly string[]).includes(ref);
}

export function parcoursIdShowsFinancementOpcoEtendu(
  id: string,
): id is (typeof FINANCEMENT_OPCO_ETENDU_PARCOURS_IDS)[number] {
  return (FINANCEMENT_OPCO_ETENDU_PARCOURS_IDS as readonly string[]).includes(id);
}

export function landingPathShowsFinancementOpcoEtendu(path: string): boolean {
  return (FINANCEMENT_OPCO_ETENDU_LANDING_PATHS as readonly string[]).includes(path);
}

/** Lien interne vers la page financement du site. */
export const FINANCEMENT_OPCO_ETENDU_PAGE_HREF = LINKS.financement;
