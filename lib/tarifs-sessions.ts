/**
 * Grille commerciale OFC — intra (forfait session) et inter (par participant).
 * TVA intra : art. 261-4-4° du CGI.
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
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';

/** Durées catalogue reconnues pour la grille tarifaire. */
export type TarifDureeHeures = 2 | 4 | 7 | 14;

export const SESSION_DUREE_LIBELLE = FORMATION_NIV01.duree;

/** NIV-04 — session matin uniquement */
export const SESSION_DUREE_MATIN_NIV04 = libelleDureeFormation(getFormationByCode('NIV-04')!);

/* ── Grille intra-entreprise (forfait session) ── */
export const TARIF_INTRA_SENSIBILISATION_2H_HT = 750;
export const TARIF_INTRA_4H_HT = 1200;
/** Grille catalogue 7 h générique — ne pas confondre avec le parcours applications métier (voir `lib/tarifs-applications-metier-btp.ts`). */
export const TARIF_INTRA_7H_HT = 1800;
export const TARIF_INTRA_14H_HT_FROM = 3200;

/* ── Grille interentreprises (par participant) ── */
export const TARIF_INTER_4H_HT_FROM = 300;
export const TARIF_INTER_7H_HT_FROM = 650;
export const TARIF_INTER_14H_HT_FROM = 1100;

/** @deprecated Préférer TARIF_INTRA_4H_HT — conservé pour compatibilité imports. */
export const TARIF_SESSION_DEBUTANT_HT = PRIX_NIVEAU_1_HT;

/** @deprecated Préférer TARIF_INTRA_4H_HT — conservé pour compatibilité imports. */
export const TARIF_SESSION_AVANCE_HT = PRIX_NIVEAU_2_HT;

/** @deprecated Préférer TARIF_INTRA_4H_HT. */
export const TARIF_SESSION_FORFAIT_HT = TARIF_INTRA_4H_HT;

/** @deprecated Utiliser TARIF_INTRA_4H_HT. */
export const TARIF_FORFAIT_DEBUTANT_HT = TARIF_INTRA_4H_HT;

/** @deprecated Utiliser TARIF_INTRA_4H_HT. */
export const TARIF_FORFAIT_AVANCE_HT = TARIF_INTRA_4H_HT;

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
  intraHT: number;
  intraFrom?: boolean;
  /** Absent pour la sensibilisation 2 h (intra uniquement). */
  interHT?: number;
};

export function getTarifGrille(dureeHeures: TarifDureeHeures): TarifGrille {
  switch (dureeHeures) {
    case 2:
      return { dureeHeures: 2, intraHT: TARIF_INTRA_SENSIBILISATION_2H_HT };
    case 7:
      return { dureeHeures: 7, intraHT: TARIF_INTRA_7H_HT, intraFrom: true, interHT: TARIF_INTER_7H_HT_FROM };
    case 14:
      return {
        dureeHeures: 14,
        intraHT: TARIF_INTRA_14H_HT_FROM,
        intraFrom: true,
        interHT: TARIF_INTER_14H_HT_FROM,
      };
    default:
      return { dureeHeures: 4, intraHT: TARIF_INTRA_4H_HT, interHT: TARIF_INTER_4H_HT_FROM };
  }
}

export function getTarifGrilleFromDureeLibelle(duree: string): TarifGrille {
  return getTarifGrille(parseDureeHeures(duree));
}

/** « 1 200 € HT par session » */
export function libelleTarifIntraParSession(amount: number, from = false): string {
  const prefix = from ? 'à partir de ' : '';
  return `${prefix}${formatTarifHt(amount)} € HT par session`;
}

/** « à partir de 300 € HT par participant » */
export function libelleTarifInterParParticipant(amount: number, from = true): string {
  const prefix = from ? 'à partir de ' : '';
  return `${prefix}${formatTarifHt(amount)} € HT par participant`;
}

/** @deprecated Préférer libelleTarifIntraParSession — compatibilité legacy. */
export function libelleTarifSessionForfaitaire(amount: number): string {
  return `${formatTarifHt(amount)} € HT / session forfaitaire`;
}

/** Ligne carte catalogue — intra + inter (inter absent pour 2 h). */
export function libelleTarifsCarteCatalogue(dureeHeures: TarifDureeHeures = 4): {
  intra: string;
  inter?: string;
} {
  const g = getTarifGrille(dureeHeures);
  const result = {
    intra: libelleTarifIntraParSession(g.intraHT, g.intraFrom),
  };
  if (g.interHT != null) {
    return { ...result, inter: libelleTarifInterParParticipant(g.interHT) };
  }
  return result;
}

/** Résumé court dual intra/inter — ex. fiches formation, landings. */
export function libelleTarifsDualCourt(dureeHeures: TarifDureeHeures = 4): string {
  const t = libelleTarifsCarteCatalogue(dureeHeures);
  if (t.inter) {
    return `Intra-entreprise : ${t.intra} · Interentreprises : ${t.inter}`;
  }
  return `Intra-entreprise : ${t.intra}`;
}

/** Ligne grille — ex. « 7 heures : 1 800 € HT par session (intra) · dès 650 € HT/participant (inter) ». */
export function libelleTarifsGrilleLigne(dureeHeures: TarifDureeHeures): string {
  const t = libelleTarifsCarteCatalogue(dureeHeures);
  const label = dureeHeures === 2 ? '2 heures' : `${dureeHeures} heures`;
  if (t.inter) {
    return `${label} : ${t.intra} (intra) · ${t.inter} (inter)`;
  }
  return `${label} : ${t.intra} (intra uniquement)`;
}

/** Durées affichées sur la grille catalogue `/formations`. */
export const GRILLE_TARIFS_CATALOGUE_DUREES: readonly TarifDureeHeures[] = [4, 7, 14];

/** Mention abonnements IA hors forfait. */
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
  return `Intra-entreprise : ${libelleTarifIntraParSession(amount)} (${effectifLabel}), ${MODALITE_INTRA_ENTREPRISE}. ${MENTIONS_TVA_INTRA_COURTE}`;
}

export function libelleTarifsCatalogueComplets(amount: number, effectifLabel: string): string {
  return libelleTarifIntraEntreprise(amount, effectifLabel);
}

/** @deprecated Ne plus utiliser seul — dual intra/inter. */
export function libelleTarifInterEntreprise(amount: number, effectifLabel: string): string {
  return `${libelleTarifInterParParticipant(amount)} (${effectifLabel}). ${MENTIONS_TVA_INTER_COURTE}`;
}

export const MENTION_TVA_ANCHOR_ID = 'mention-tva' as const;

export const EFFECTIF_GROUPE_MAX = EFFECTIF_CATALOGUE_MAX;

/** @deprecated Préférer libelleTarifsCarteCatalogue. */
export function libelleTarifParticipant(level?: 'DÉBUTANT' | 'AVANCÉ'): string {
  const g = getTarifGrille(4);
  const lines = libelleTarifsCarteCatalogue(g.dureeHeures);
  return `Intra-entreprise : ${lines.intra}${lines.inter ? ` · Interentreprises : ${lines.inter}` : ''} — ${MENTIONS_TVA_REGIMES_COURT}`;
}

export function tarifHtPourNiveau(_niveau?: NiveauTarif): number {
  return TARIF_INTRA_4H_HT;
}

export function tarifHtDepuisBadgeCatalogue(_level?: 'DÉBUTANT' | 'AVANCÉ'): number {
  return TARIF_INTRA_4H_HT;
}

export const LIBELLE_EFFECTIF_GROUPE_COURT = libelleEffectifMaxFormation(FORMATION_NIV01);
export const LIBELLE_EFFECTIF_GROUPE_NIV02 = libelleEffectifFormation(FORMATION_NIV02);
export const LIBELLE_EFFECTIF_GROUPE_NIV03 = libelleEffectifMaxFormation(getFormationByCode('NIV-03')!);
export const LIBELLE_EFFECTIF_GROUPE = `Groupe de ${EFFECTIF_GROUPE_MAX} participants maximum`;

export const MODALITE_POSITIONNEMENT = 'présentiel uniquement · Île-de-France uniquement';

export const MODALITE_INTRA_ENTREPRISE = 'intra-entreprise, dans vos locaux' as const;

export const PERIMETRE_FORMATIONS_COURT = MODALITE_POSITIONNEMENT;

export const PERIMETRE_FORMATIONS_STANDARD =
  `Sessions ${MODALITE_INTRA_ENTREPRISE} (${IDF_ZONE_INTERVENTION}) — ${MODALITE_POSITIONNEMENT}.`;

export const MODALITE_FORMATIONS_STANDARD = PERIMETRE_FORMATIONS_STANDARD;

export const MODALITE_FORMATIONS_PRESENTIEL =
  `Sessions ${MODALITE_INTRA_ENTREPRISE} et interentreprises en présentiel — ${MODALITE_POSITIONNEMENT}.`;

export const EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE =
  'Un abonnement Claude AI Pro actif par participant, à souscrire par l\'entreprise avant la session — non inclus dans le forfait (abonnement payant selon l\'outil utilisé).';

export const PREREQUIS_NIVEAU_2 = [
  'Ordinateur portable par participant + connexion internet',
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  'Avoir suivi le niveau 1 ou pratiquer déjà l\'IA générative au quotidien',
] as const;

export const COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT =
  'Niveau 1 : un compte gratuit Claude AI ou ChatGPT suffit. Niveaux 2 : un abonnement Claude AI Pro par participant est requis (non inclus dans le forfait).';

export function getEncartTarifsCommerciaux(at: Date = new Date()): string {
  const count = getCatalogueFormationsCount(at);
  const tarifs = libelleTarifsCarteCatalogue(4);
  return `Formations catalogue (${count} parcours, ${SESSION_DUREE_LIBELLE}) — intra-entreprise : ${tarifs.intra} ; interentreprises : ${tarifs.inter}. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${MODALITE_FORMATIONS_PRESENTIEL}`;
}

/** @deprecated Préférer getEncartTarifsCommerciaux() — évaluation paresseuse (évite cycle d'import). */
export function getEncartTarifsCommerciauxLazy(): string {
  return getEncartTarifsCommerciaux();
}

/** Texte financement canonique — source unique pages tarifs. */
export { FINANCEMENT_FORMULATION_PRUDENTE };
