/**
 * SEO & GEO — fiches catalogue NIV-01 à NIV-05.
 * Titres orientés métier (pas « niveau 1 / 2 » en H1), blocs « En bref » citables par les IA.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  formatNoteSatisfactionAffichageComplet,
  formatVolumeProsFormesBtpLibelle,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';

export type FormationIaLimitRow = {
  iaAide: string;
  validationHumaine: string;
};

export type FormationCatalogueSeoConfig = {
  /** Title balise `<title>` — max ~65 car. */
  metaTitle: string;
  /** H1 page catalogue. */
  h1: string;
  /** Sous-titre hero. */
  subtitle: string;
  /** Meta description — max ~160 car., contient une expression clé formation IA BTP. */
  metaDescription: string;
  /** Bloc « En bref » — réponse factuelle pour moteurs génératifs. */
  enBref: string;
  /** Public cible — liste précise. */
  publicTargets: readonly string[];
  /** Tableau « Ce que l'IA peut / ne peut pas faire ». */
  iaLimits: readonly FormationIaLimitRow[];
};

const QUALIOPI_MENTION =
  'OFC Création d\'Entreprise, organisme certifié Qualiopi, présentiel Île-de-France';

export const FORMATION_CATALOGUE_SEO: Record<FormationCatalogueCode, FormationCatalogueSeoConfig> = {
  'NIV-01': {
    metaTitle: 'Formation IA BTP : devis & productivité',
    h1: 'Formation IA BTP : devis, emails et productivité',
    subtitle:
      'Automatisez devis, comptes rendus, DOE et communication avec ChatGPT et Claude — sur vos documents réels.',
    metaDescription:
      'Formation IA pour le BTP en 4 h : devis, emails, DOE et réseaux sociaux avec ChatGPT. Présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La formation IA BTP pour artisans et PME apprend à utiliser ChatGPT et Claude pour rédiger des devis, des comptes rendus, des DOE et du contenu professionnel. Session ${SESSION_DUREE_LIBELLE} en présentiel en Île-de-France par ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Artisans et dirigeants de TPE/PME du bâtiment et des travaux publics',
      'Conducteurs de travaux et chefs de chantier',
      'Chargés d\'affaires et techniciens bureau d\'études',
      'Assistantes administratives et fonctions support du BTP',
    ],
    iaLimits: [
      { iaAide: 'Structurer un premier devis', validationHumaine: 'Valider prix, quantités et conformité DTU' },
      { iaAide: 'Rédiger un compte rendu ou un email', validationHumaine: 'Confirmer les faits et engagements' },
      { iaAide: 'Préparer une trame de DOE ou PV', validationHumaine: 'Contrôler les pièces et signatures' },
      { iaAide: 'Proposer des posts réseaux sociaux', validationHumaine: 'Valider le ton et les informations publiées' },
    ],
  },
  'NIV-02': {
    metaTitle: 'Formation IA appels d\'offres BTP | DCE & MT',
    h1: 'Formation IA appels d\'offres BTP : DCE, chiffrage et mémoire technique',
    subtitle:
      'Analysez un DCE complet, préparez le chiffrage assisté et structurez votre mémoire technique — sur vos dossiers réels avec Claude Cowork.',
    metaDescription:
      'Formation ChatGPT appels d\'offres BTP : analyse DCE, CCTP, DPGF, chiffrage assisté et mémoire technique. 4 h, Qualiopi, Constructys selon éligibilité.',
    enBref: `La formation IA appels d'offres BTP apprend à analyser un DCE (RC, CCTP, CCAP, DPGF), préparer une checklist de chiffrage, comparer un devis et structurer un mémoire technique avec Claude AI Pro et Cowork. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}. L'IA assiste l'analyse ; le chiffrage final reste à valider par le professionnel.`,
    publicTargets: [
      'Chargés d\'affaires et responsables appels d\'offres',
      'Conducteurs de travaux impliqués dans les réponses aux marchés',
      'Dirigeants PME BTP et artisans du second œuvre',
      'Assistants commerciaux et chargés d\'études',
    ],
    iaLimits: [
      { iaAide: 'Synthétiser un DCE et extraire les prestations', validationHumaine: 'Valider l\'interprétation contractuelle et le chiffrage' },
      { iaAide: 'Comparer CCTP et DPGF', validationHumaine: 'Confirmer les postes oubliés et les quantités' },
      { iaAide: 'Rédiger des désignations de devis', validationHumaine: 'Valider prix et périmètre des ouvrages' },
      { iaAide: 'Structurer un mémoire technique', validationHumaine: 'Vérifier références, moyens et engagements réels' },
    ],
  },
  'NIV-03': {
    metaTitle: 'Formation IA conducteur de travaux | Chantier',
    h1: 'Formation IA conducteur de travaux : suivi chantier, CR et DOE',
    subtitle:
      'Analysez vos CCTP, produisez vos comptes rendus et organisez le suivi du chantier jusqu\'à la réception avec ChatGPT et Claude.',
    metaDescription:
      'Formation pratique 4 h : IA conduite de travaux BTP — CCTP, comptes rendus, PPSPS, réserves et DOE. Présentiel Île-de-France, Qualiopi.',
    enBref: `La formation IA pour conducteurs de travaux apprend à utiliser ChatGPT et Claude pour analyser un CCTP, préparer un compte rendu, suivre les actions, gérer les réserves et structurer un DOE. Session ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Conducteurs de travaux',
      'Assistants travaux',
      'Chargés d\'affaires',
      'Responsables travaux',
      'Chefs de chantier amenés à produire des documents',
    ],
    iaLimits: [
      { iaAide: 'Structurer un compte rendu', validationHumaine: 'Valider les faits et responsabilités' },
      { iaAide: 'Extraire les clauses d\'un CCTP', validationHumaine: 'Confirmer l\'interprétation contractuelle' },
      { iaAide: 'Préparer une trame de PPSPS', validationHumaine: 'Valider les mesures de prévention' },
      { iaAide: 'Classer les réserves', validationHumaine: 'Contrôler leur levée sur le terrain' },
    ],
  },
  'NIV-04': {
    metaTitle: 'Formation Claude AI BTP | Cowork & Skills',
    h1: 'Formation Claude AI BTP : Cowork, Skills et automatisations',
    subtitle:
      'Industrialisez Claude dans votre entreprise : Projets, bibliothèque de Skills, Cowork et connecteurs — sur vos documents réels.',
    metaDescription:
      'Formation IA pour les pros du BTP : maîtriser Claude AI Pro, Cowork, Skills et Claude Code. 4 h présentiel IDF, Qualiopi, OPCO selon éligibilité.',
    enBref: `La formation Claude AI BTP apprend à structurer des Projets Claude, créer des Skills métier réutilisables, déléguer la production documentaire à Cowork et connecter Claude à la messagerie et au drive. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Référents IA et responsables digitaux',
      'Dirigeants souhaitant industrialiser l\'usage de Claude',
      'Chargés d\'affaires et conducteurs de travaux avancés',
    ],
    iaLimits: [
      { iaAide: 'Créer des Skills réutilisables', validationHumaine: 'Valider les instructions et les sorties métier' },
      { iaAide: 'Automatiser la production de CR ou dossiers', validationHumaine: 'Relire avant envoi ou remise client' },
      { iaAide: 'Connecter Claude à ses outils', validationHumaine: 'Contrôler la confidentialité des données' },
      { iaAide: 'Générer des documents en lot', validationHumaine: 'Vérifier chaque livrable avant diffusion' },
    ],
  },
  'NIV-05': {
    metaTitle: 'Formation IA maîtrise d\'œuvre | CR & réception',
    h1: 'Formation IA maîtrise d\'œuvre : CR, OS et réception chantier',
    subtitle:
      'Analysez les DCE, rédigez vos comptes rendus en quelques minutes et pilotez réserves et réception avec ChatGPT et Claude.',
    metaDescription:
      'Formation IA appliquée au bâtiment pour maîtres d\'œuvre : analyse DCE, CR chantier, OS et suivi GPA. 4 h, Qualiopi, Île-de-France.',
    enBref: `La formation IA pour maîtres d'œuvre apprend à analyser un DCE, rédiger un compte rendu de chantier, produire ordres de service et courriers MOE, et organiser le suivi des réserves avec l'IA. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Maîtres d\'œuvre d\'exécution (MOEX)',
      'Conducteurs de travaux MOE',
      'OPC et BET',
      'Assistant(e)s de gestion travaux',
    ],
    iaLimits: [
      { iaAide: 'Rédiger un CR à partir de notes vocales', validationHumaine: 'Valider observations et décisions' },
      { iaAide: 'Analyser un DCE MOE', validationHumaine: 'Confirmer conformité et alertes contractuelles' },
      { iaAide: 'Préparer un OS ou courrier type', validationHumaine: 'Valider le fond juridique et technique' },
      { iaAide: 'Suivre les réserves et la GPA', validationHumaine: 'Contrôler les levées sur le terrain' },
    ],
  },
};

export function getFormationCatalogueSeo(ref: FormationCatalogueCode): FormationCatalogueSeoConfig {
  return FORMATION_CATALOGUE_SEO[ref];
}

/** Bloc autorité E-E-A-T — harmonisé sur toutes les fiches catalogue. */
export function getFormationCatalogueAutoriteParagraph(programmeUpdatedAt: string): string {
  return `Laure Olivié, formatrice IA générative spécialisée BTP (+10 ans de terrain en travaux publics et conduite de chantier), dispense cette formation via OFC Création d'Entreprise (organisme certifié Qualiopi). ${formatVolumeProsFormesBtpLibelle()} — satisfaction ${formatNoteSatisfactionAffichageComplet()} (${indicateursResultats.periodeReference}). Programme mis à jour le ${programmeUpdatedAt}. Références : FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Entreprise, Lefebvre Dalloz.`;
}
