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
  | 'NUM-08'
  | 'NUM-09'
  | 'NUM-10';

export type MetierId =
  | 'dirigeant'
  | 'charge-affaires'
  | 'conducteur-travaux'
  | 'chef-chantier'
  | 'chef-equipe'
  | 'assistant-gestion'
  | 'referent-ia'
  | 'maitre-oeuvre'
  | 'amo-btp';

export type ParcoursId =
  | 'dirigeant-pme-btp'
  | 'charge-affaires-btp'
  | 'conducteur-de-travaux'
  | 'assistant-de-gestion-btp'
  | 'referent-ia-btp'
  | 'maitre-oeuvre'
  | 'amo-btp';

/** Disponibilité commerciale affichée au visiteur. */
export type DisponibiliteCommerciale = 'disponible' | 'ouverture-2027';

/** Statut éditorial du programme (distinct de la disponibilité commerciale). */
export type StatutEditorial = 'programme-en-preparation' | 'programme-valide';

export type ModuleDureeHeures = 4 | 14;

export type ModuleNiveau = 1 | 2 | 3;

/** Séquence horaire d’un programme module (minutes incluses dans la durée publiée). */
export type ProgrammeSequence = {
  ordre: number;
  titre: string;
  minutes: number;
  contenu: string;
};

/** Programme pédagogique structuré (sections A–J). */
export type ModuleProgrammePedagogique = {
  code: ModuleCode;
  /** A — Intitulé (aligné sur le module catalogue). */
  intitule: string;
  /** B — Niveau, durée et tarif (contrôle référentiel). */
  niveau: ModuleNiveau;
  dureeMinutes: number;
  prixInterHt: number;
  /** C */
  publicCible: string;
  prerequis: string;
  /** D — Formulés en résultats observables en session. */
  objectifsMesurables: readonly string[];
  /** E — Somme = dureeMinutes. */
  sequences: readonly ProgrammeSequence[];
  /** F */
  exercicePratique: string;
  /** G */
  usageIa: {
    outil: 'chatgpt' | 'claude' | 'claude-et-chatgpt';
    description: string;
    documents: string;
    controleHumain: string;
  };
  /** H */
  livrables: readonly string[];
  /** I */
  evaluation: {
    modalites: string;
    criteres: readonly string[];
  };
  /** J */
  verificationHumaineEtConfidentialite: string;
};

export type CatalogueModule = {
  /** Identifiant référentiel (slug dérivé du code). */
  id: string;
  code: ModuleCode;
  /** Niveau pédagogique — fixe durée et tarif inter. */
  niveau: ModuleNiveau;
  /** Année de disponibilité catalogue parcours (référentiel 2027). */
  anneeDisponibilite: 2027;
  titre: string;
  domaineId: DomaineId;
  sousDomaine: string;
  metiers: readonly MetierId[];
  objectifPrincipal: string;
  /** D — Objectifs mesurables (programme harmonisé si présent). */
  objectifsMesurables?: readonly string[];
  publicCible: string;
  prerequis: string;
  /** Points de programme (synthèse ou dérivés des séquences chronologiques). */
  programme: readonly string[];
  /** E — Détail horaire (source de vérité si défini). */
  programmeSequences?: readonly ProgrammeSequence[];
  exercices: readonly string[];
  livrables: readonly string[];
  evaluation: string;
  /** Durée principale (heures) — alignée sur `niveau`. */
  dureeHeures: ModuleDureeHeures;
  /** Tarif inter HT / participant — aligné sur `niveau`. */
  prixInterHt: number;
  /** Parcours métiers qui référencent ce module (dérivé à l’export, voir enrichissement). */
  parcoursIds?: readonly ParcoursId[];
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
    /** Calculé — contrôle interne, pas d’affichage prix parcours global. */
    dureeHeures?: number;
    prixInterHt?: number;
  };
  /** Initiation complémentaire éventuelle (Référent IA + NUM-01). */
  initiationComplementaire?: {
    label: string;
    moduleAjoute: ModuleCode;
    dureeHeures?: number;
    prixInterHt?: number;
  };
};

export type DomaineCatalogue = {
  id: DomaineId;
  numero: number;
  titre: string;
  description: string;
};
