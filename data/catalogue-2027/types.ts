/**
 * Catalogue des parcours de formation 2027 — types.
 * Source éditoriale : brief « Catalogue des parcours de formation 2027 ».
 * Document joint « Markdown collé(1).md » non trouvé dans le dépôt — données consolidées du brief.
 */

export type DomaineId =
  | 'direction'
  | 'commercial'
  | 'travaux'
  | 'management'
  | 'administration'
  | 'technique-qualite-prevention'
  | 'numerique-ia';

export type ModuleCode =
  | 'DIR-01'
  | 'DIR-02'
  | 'DIR-03'
  | 'DIR-04'
  | 'DIR-05'
  | 'COM-01'
  | 'COM-02'
  | 'COM-03'
  | 'COM-04'
  | 'COM-05'
  | 'COM-06'
  | 'TRA-01'
  | 'TRA-02'
  | 'TRA-03'
  | 'TRA-04'
  | 'TRA-05'
  | 'MAN-01'
  | 'MAN-02'
  | 'MAN-03'
  | 'MAN-04'
  | 'ADM-01'
  | 'ADM-02'
  | 'ADM-03'
  | 'ADM-04'
  | 'TQP-01'
  | 'TQP-02'
  | 'TQP-03'
  | 'NUM-01'
  | 'NUM-02'
  | 'NUM-03'
  | 'NUM-04'
  | 'NUM-05'
  | 'NUM-06'
  | 'NUM-07'
  | 'NUM-08';

export type MetierId =
  | 'dirigeant'
  | 'charge-affaires'
  | 'conducteur-travaux'
  | 'chef-chantier'
  | 'chef-equipe'
  | 'assistant-gestion'
  | 'referent-ia';

export type ParcoursId =
  | 'dirigeant-pme-btp'
  | 'charge-affaires-btp'
  | 'conducteur-de-travaux'
  | 'chef-de-chantier'
  | 'chef-dequipe'
  | 'assistant-de-gestion-btp'
  | 'referent-ia-btp';

/** Disponibilité commerciale affichée au visiteur. */
export type DisponibiliteCommerciale = 'disponible' | 'ouverture-2027';

/** Statut éditorial du programme (distinct de la disponibilité commerciale). */
export type StatutEditorial = 'programme-en-preparation' | 'programme-valide';

export type ModuleDureeHeures = 4 | 7 | 14;

export type CatalogueModule = {
  code: ModuleCode;
  titre: string;
  domaineId: DomaineId;
  sousDomaine: string;
  metiers: readonly MetierId[];
  objectifPrincipal: string;
  publicCible: string;
  prerequis: string;
  /** Points de programme (synthèse). Compléments marqués « à valider » si non issus du brief. */
  programme: readonly string[];
  exercices: readonly string[];
  livrables: readonly string[];
  evaluation: string;
  /** Durée principale (heures). */
  dureeHeures: ModuleDureeHeures;
  /** Variantes de durée (ex. NUM-04). */
  variantesDureeHeures?: readonly ModuleDureeHeures[];
  disponibilite: DisponibiliteCommerciale;
  statutEditorial: StatutEditorial;
  /** URL fiche détaillée publiée — sinon null (demande de programme). */
  href: string | null;
  /** PDF programme validé — sinon null (demander le programme). */
  pdfProgramme: string | null;
  /** PDF obsolète (durée/tarif) — à régénérer, ne pas proposer en téléchargement. */
  pdfARegenerer?: boolean;
  /** Code legacy NIV-* si correspondance. */
  legacyCode?: string;
  /** Termes de recherche additionnels (DCE, DOE, Claude…). */
  motsCles: readonly string[];
  /**
   * Contenu pédagogique complémentaire proposé — identifiable comme « à valider ».
   */
  complementsAValider?: readonly string[];
};

export type ParcoursEtape = {
  moduleCode: ModuleCode;
  /** Compétence travaillée à cette étape. */
  competence: string;
  exercice: string;
  livrable: string;
  /** Variante de durée forcée pour ce parcours (ex. NUM-04 en 14 h). */
  dureeHeuresOverride?: ModuleDureeHeures;
};

export type CatalogueParcours = {
  id: ParcoursId;
  slug: string;
  metierId: MetierId;
  titre: string;
  benefice: string;
  objectif: string;
  publicCible: string;
  prerequis: string;
  competencesVisees: readonly string[];
  etapes: readonly ParcoursEtape[];
  /** Mention de disponibilité spécifique (ex. Référent IA). */
  mentionDisponibilite?: string;
  /** Variante optionnelle après positionnement (ex. retrait NUM-01). */
  varianteOptionnelle?: {
    label: string;
    modulesRetires: readonly ModuleCode[];
    dureeHeures: number;
    prixInterHt: number;
  };
  /** Initiation complémentaire éventuelle (Référent IA + NUM-01). */
  initiationComplementaire?: {
    label: string;
    moduleAjoute: ModuleCode;
    dureeHeures: number;
    prixInterHt: number;
  };
};

export type DomaineCatalogue = {
  id: DomaineId;
  numero: number;
  titre: string;
  description: string;
};
