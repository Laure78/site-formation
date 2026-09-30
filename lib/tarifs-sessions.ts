/**
 * Grille commerciale OFC — tarifs HT par participant (catalogue).
 * TVA : art. 261-4-4° du CGI (formations).
 */
import { formatNumberFr } from '@/lib/format-number-fr';
import {
  EFFECTIF_CATALOGUE_MAX,
  FORMATION_NIV01,
  FORMATION_NIV02,
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifFormation,
  libelleEffectifMaxFormation,
  PRIX_NIVEAU_1_HT,
  PRIX_NIVEAU_2_HT,
} from '@/data/formations';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { getCatalogueFormationsCount } from '@/lib/formation-catalogue-visibility';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_HT,
} from '@/lib/tarifs-catalogue-participant';

/** Durées catalogue reconnues pour la grille tarifaire. */
export type TarifDureeHeures = 2 | 4 | 7 | 14;

export const SESSION_DUREE_LIBELLE = FORMATION_NIV01.duree;

/** NIV-04 — session matin uniquement */
export const SESSION_DUREE_MATIN_NIV04 = libelleDureeFormation(getFormationByCode('NIV-04')!);

/* ── Tarifs HT par participant (référence durée) ── */
/** @deprecated Préférer les constantes par formation dans `lib/tarifs-catalogue-participant.ts`. */
export const TARIF_PARTICIPANT_4H_BASE_HT = TARIF_PARTICIPANT_NIV01_HT;
/** @deprecated Préférer TARIF_PARTICIPANT_NIV02_HT. */
export const TARIF_PARTICIPANT_4H_METIER_HT = TARIF_PARTICIPANT_NIV02_HT;
/** @deprecated Préférer TARIF_PARTICIPANT_NIV10_HT. */
export const TARIF_PARTICIPANT_7H_HT = TARIF_PARTICIPANT_NIV10_HT;

/** @deprecated Ancien forfait session — ne plus afficher. */
export const TARIF_INTRA_SENSIBILISATION_2H_HT = 750;
/** @deprecated Ancien forfait session 4 h — remplacé par tarif / participant. */
export const TARIF_INTRA_4H_HT = TARIF_PARTICIPANT_NIV02_HT;
/** @deprecated Ancien forfait session 7 h. */
export const TARIF_INTRA_7H_HT = TARIF_PARTICIPANT_NIV10_HT;
/** @deprecated Ancien forfait session 14 h. */
export const TARIF_INTRA_14H_HT_FROM = 600;

/* ── Alias historiques (inter) — désormais = tarif participant catalogue ── */
/** @deprecated Préférer TARIF_PARTICIPANT_NIV10_HT ou la formation concernée. */
export const TARIF_INTER_4H_HT_FROM = TARIF_PARTICIPANT_NIV01_HT;
/** @deprecated Préférer TARIF_PARTICIPANT_NIV10_HT. */
export const TARIF_INTER_7H_HT_FROM = TARIF_PARTICIPANT_NIV10_HT;
/** @deprecated */
export const TARIF_INTER_14H_HT_FROM = 600;

/** @deprecated Préférer PRIX_NIVEAU_1_HT. */
export const TARIF_SESSION_DEBUTANT_HT = PRIX_NIVEAU_1_HT;

/** @deprecated Préférer PRIX_NIVEAU_2_HT. */
export const TARIF_SESSION_AVANCE_HT = PRIX_NIVEAU_2_HT;

/** @deprecated Ne plus utiliser — ancien forfait. */
export const TARIF_SESSION_FORFAIT_HT = TARIF_PARTICIPANT_NIV02_HT;

/** @deprecated */
export const TARIF_FORFAIT_DEBUTANT_HT = PRIX_NIVEAU_1_HT;

/** @deprecated */
export const TARIF_FORFAIT_AVANCE_HT = PRIX_NIVEAU_2_HT;

export type NiveauTarif = 'debutant' | 'avance';

/** Montant HT affiché (espace milliers FR) — ex. 1 200 */
export function formatTarifHt(amount: number): string {
  return formatNumberFr(amount);
}

/** Extrait les heures depuis « 4 h », « 7 h », etc. — défaut 4 h catalogue. */
export function parseDureeHeures(duree: string): TarifDureeHeures {
  const match = duree.match(/(\d+)/);
  const h = match ? Number.parseInt(match[1], 10) : 4;
  if (h === 2) return 2;
  if (h === 7) return 7;
  if (h === 14) return 14;
  return 4;
}

export type TarifGrille = {
  dureeHeures: TarifDureeHeures;
  /** Tarif HT / participant de référence pour cette durée. */
  participantHT: number;
  /** @deprecated Alias — même valeur que participantHT. */
  intraHT: number;
  intraFrom?: boolean;
  /** @deprecated Alias — même valeur que participantHT. */
  interHT?: number;
};

export function getTarifGrille(dureeHeures: TarifDureeHeures): TarifGrille {
  switch (dureeHeures) {
    case 2:
      return {
        dureeHeures: 2,
        participantHT: TARIF_PARTICIPANT_NIV01_HT,
        intraHT: TARIF_PARTICIPANT_NIV01_HT,
      };
    case 7:
      return {
        dureeHeures: 7,
        participantHT: TARIF_PARTICIPANT_NIV10_HT,
        intraHT: TARIF_PARTICIPANT_NIV10_HT,
        interHT: TARIF_PARTICIPANT_NIV10_HT,
      };
    case 14:
      return {
        dureeHeures: 14,
        participantHT: 600,
        intraHT: 600,
        interHT: 600,
      };
    default:
      return {
        dureeHeures: 4,
        participantHT: TARIF_PARTICIPANT_NIV02_HT,
        intraHT: TARIF_PARTICIPANT_NIV02_HT,
        interHT: TARIF_PARTICIPANT_NIV02_HT,
      };
  }
}

export function getTarifGrilleFromDureeLibelle(duree: string): TarifGrille {
  return getTarifGrille(parseDureeHeures(duree));
}

/** @deprecated Préférer libelleTarifParticipantCatalogue. */
export function libelleTarifIntraParSession(amount: number, _from = false): string {
  return libelleTarifParticipantCatalogue(amount);
}

/** « 170 € HT / participant » — sans « à partir de ». */
export function libelleTarifInterParParticipant(amount: number, _from = false): string {
  return libelleTarifParticipantCatalogue(amount);
}

/** @deprecated */
export function libelleTarifSessionForfaitaire(amount: number): string {
  return libelleTarifParticipantCatalogue(amount);
}

/** Ligne carte catalogue — tarif HT / participant uniquement. */
export function libelleTarifsCarteCatalogue(dureeHeures: TarifDureeHeures = 4): {
  intra: string;
  inter?: string;
  participant: string;
} {
  const g = getTarifGrille(dureeHeures);
  const participant = libelleTarifParticipantCatalogue(g.participantHT);
  return { intra: participant, inter: participant, participant };
}

/** Résumé court — tarif HT / participant. */
export function libelleTarifsDualCourt(dureeHeures: TarifDureeHeures = 4): string {
  return libelleTarifsCarteCatalogue(dureeHeures).participant;
}

/** Ligne grille — ex. « 4 heures : 170 € HT / participant ». */
export function libelleTarifsGrilleLigne(dureeHeures: TarifDureeHeures): string {
  const t = libelleTarifsCarteCatalogue(dureeHeures);
  const label = dureeHeures === 2 ? '2 heures' : `${dureeHeures} heures`;
  return `${label} : ${t.participant}`;
}

/** Durées affichées sur la grille catalogue `/formations`. */
export const GRILLE_TARIFS_CATALOGUE_DUREES: readonly TarifDureeHeures[] = [4, 7];

/** Mention abonnements IA non inclus dans le tarif. */
export const MENTION_ABONNEMENTS_IA_HORS_FORFAIT =
  'Les éventuels abonnements payants aux outils d\u2019intelligence artificielle ne sont pas inclus, sauf mention contraire dans le devis.';

/**
 * @deprecated Sessions inter historiques CGV — ne pas afficher seul.
 */
export const MENTIONS_TVA_INTER_COURTE = 'TVA non applicable, article 293 B du CGI.';

export const MENTIONS_TVA_INTRA_COURTE = 'TVA exonérée, article 261-4-4° du CGI.';

export const MENTIONS_TVA_REGIMES_COURT = MENTIONS_TVA_INTRA_COURTE;

export const MENTIONS_TVA_EXONERATION = `Prix nets — ${MENTIONS_TVA_REGIMES_COURT}`;

/** @deprecated Préférer MENTIONS_TVA_INTER_COURTE ou MENTIONS_TVA_INTRA_COURTE. */
export const MENTIONS_TVA_EXONERATION_COURTE = MENTIONS_TVA_INTER_COURTE;

export function libelleTarifIntraEntreprise(amount: number, effectifLabel: string): string {
  return `${libelleTarifParticipantCatalogue(amount)} (${effectifLabel}). ${MENTIONS_TVA_INTRA_COURTE}`;
}

export function libelleTarifsCatalogueComplets(amount: number, effectifLabel: string): string {
  return libelleTarifIntraEntreprise(amount, effectifLabel);
}

/** @deprecated */
export function libelleTarifInterEntreprise(amount: number, effectifLabel: string): string {
  return `${libelleTarifParticipantCatalogue(amount)} (${effectifLabel}). ${MENTIONS_TVA_INTER_COURTE}`;
}

export const MENTION_TVA_ANCHOR_ID = 'mention-tva' as const;

export const EFFECTIF_GROUPE_MAX = EFFECTIF_CATALOGUE_MAX;

/** @deprecated Préférer libelleTarifsCarteCatalogue. */
export function libelleTarifParticipant(level?: 'DÉBUTANT' | 'AVANCÉ'): string {
  const amount = level === 'DÉBUTANT' ? PRIX_NIVEAU_1_HT : PRIX_NIVEAU_2_HT;
  return `${libelleTarifParticipantCatalogue(amount)} — ${MENTIONS_TVA_REGIMES_COURT}`;
}

export function tarifHtPourNiveau(niveau?: NiveauTarif): number {
  return niveau === 'debutant' ? PRIX_NIVEAU_1_HT : PRIX_NIVEAU_2_HT;
}

export function tarifHtDepuisBadgeCatalogue(level?: 'DÉBUTANT' | 'AVANCÉ'): number {
  return level === 'DÉBUTANT' ? PRIX_NIVEAU_1_HT : PRIX_NIVEAU_2_HT;
}

export const LIBELLE_EFFECTIF_GROUPE_COURT = libelleEffectifMaxFormation(FORMATION_NIV01);
export const LIBELLE_EFFECTIF_GROUPE_NIV02 = libelleEffectifFormation(FORMATION_NIV02);
export const LIBELLE_EFFECTIF_GROUPE_NIV03 = libelleEffectifMaxFormation(getFormationByCode('NIV-03')!);
export const LIBELLE_EFFECTIF_GROUPE = `Groupe de ${EFFECTIF_GROUPE_MAX} participants maximum`;

export const MODALITE_POSITIONNEMENT = 'présentiel uniquement · Île-de-France uniquement';

export const MODALITE_INTRA_ENTREPRISE = 'intra (dans vos locaux) ou inter' as const;

export const PERIMETRE_FORMATIONS_COURT = MODALITE_POSITIONNEMENT;

/** Référence commerciale : présentiel IDF, sessions collectives. */
export const PERIMETRE_FORMATIONS_STANDARD =
  `Présentiel uniquement en Île-de-France (${IDF_ZONE_INTERVENTION}) — sessions collectives, dans les locaux de l’entreprise ou en inter-entreprises selon les dates programmées et les places disponibles. Vous pouvez vous inscrire à une session collective. Aucun accompagnement individuel n’est proposé. Pas de formation à distance ou hors Île-de-France.`;

export const MODALITE_FORMATIONS_STANDARD = PERIMETRE_FORMATIONS_STANDARD;

export const MODALITE_FORMATIONS_PRESENTIEL =
  `Sessions collectives, en ${MODALITE_INTRA_ENTREPRISE} ou en interentreprises — ${MODALITE_POSITIONNEMENT}.`;

export const EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE =
  'Un abonnement Claude AI Pro actif par participant, à souscrire par l\'entreprise avant la session — non inclus dans le tarif (abonnement payant selon l\'outil utilisé).';

export const PREREQUIS_NIVEAU_2 = [
  'Ordinateur portable par participant + connexion internet',
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  'Avoir suivi le niveau 1 ou pratiquer déjà l\'IA générative au quotidien',
] as const;

export const COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT =
  'Niveau 1 : un compte gratuit Claude AI ou ChatGPT suffit. Niveaux 2 : un abonnement Claude AI Pro par participant est requis (non inclus dans le tarif).';

export function getEncartTarifsCommerciaux(at: Date = new Date()): string {
  const count = getCatalogueFormationsCount(at);
  return `Formations catalogue (${count} parcours) — tarifs HT par participant selon le programme (ex. ${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT)} pour les bases, ${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT)} pour les sessions métier 4 h). ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${MODALITE_FORMATIONS_PRESENTIEL}`;
}

/** @deprecated Préférer getEncartTarifsCommerciaux() — évaluation paresseuse (évite cycle d'import). */
export function getEncartTarifsCommerciauxLazy(): string {
  return getEncartTarifsCommerciaux();
}

/** Texte financement canonique — source unique pages tarifs. */
export { FINANCEMENT_FORMULATION_PRUDENTE };
