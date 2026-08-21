/**
 * Garde Qualiopi indicateur 1 — échoue au build si une section obligatoire manque.
 */

const DATE_FR_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export type InfosReglementairesRequired = {
  formationTitle: string;
  prerequis: string | readonly string[];
  objectifs: readonly string[];
  contenu: readonly string[];
  duree: string;
  modalitesAcces: string;
  delaiAcces: string;
  tarifInter: string;
  tarifIntra: string;
  methodes: readonly string[];
  evaluation: readonly string[];
  handicap: string;
  lastUpdated: string;
  programmeRef: string;
};

function nonEmptyText(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`[InfosReglementaires] Section obligatoire manquante ou vide : ${label}`);
  }
  return value.trim();
}

function nonEmptyList(value: unknown, label: string): readonly string[] {
  const list = typeof value === 'string' ? [value] : Array.isArray(value) ? value : null;
  if (!list || list.length === 0) {
    throw new Error(`[InfosReglementaires] Section obligatoire manquante ou vide : ${label}`);
  }
  const cleaned = list.map((line, i) => {
    if (typeof line !== 'string' || !line.trim()) {
      throw new Error(`[InfosReglementaires] Entrée vide dans ${label} (index ${i})`);
    }
    return line.trim();
  });
  return cleaned;
}

/** Parse JJ/MM/AAAA — throw si format invalide. */
export function parseDateFr(value: string, label = 'lastUpdated'): Date {
  const m = DATE_FR_RE.exec(value.trim());
  if (!m) {
    throw new Error(`[InfosReglementaires] Date invalide (${label}) : « ${value} » (attendu JJ/MM/AAAA)`);
  }
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
    throw new Error(`[InfosReglementaires] Date invalide (${label}) : « ${value} »`);
  }
  return d;
}

/** Throw si la date de mise à jour a plus de 12 mois. */
export function assertLastUpdatedWithin12Months(lastUpdated: string, now = new Date()): void {
  const d = parseDateFr(lastUpdated);
  const limit = new Date(now);
  limit.setFullYear(limit.getFullYear() - 1);
  if (d < limit) {
    throw new Error(
      `[InfosReglementaires] Date de mise à jour trop ancienne (${lastUpdated}) — > 12 mois. Mettre à jour la date programme dans data/formations.ts.`,
    );
  }
}

/**
 * Valide les 11 sections audit + métadonnées programme.
 * À appeler côté serveur / au rendu (build + SSR).
 */
export function assertInfosReglementairesCompletes(
  props: Partial<InfosReglementairesRequired> & { dureeJours?: string; version?: string },
): InfosReglementairesRequired {
  const formationTitle = nonEmptyText(props.formationTitle, 'formationTitle');
  const prerequis = nonEmptyList(props.prerequis, 'Prérequis');
  const objectifs = nonEmptyList(props.objectifs, 'Objectifs');
  const contenu = nonEmptyList(props.contenu, 'Contenu de la formation');
  const duree = nonEmptyText(props.duree, 'Durée');
  const modalitesAcces = nonEmptyText(props.modalitesAcces, "Modalités d'accès");
  const delaiAcces = nonEmptyText(props.delaiAcces, "Délais d'accès");
  const tarifInter = nonEmptyText(props.tarifInter, 'Tarifs (inter)');
  const tarifIntra = nonEmptyText(props.tarifIntra, 'Tarifs (intra)');
  const methodes = nonEmptyList(props.methodes, 'Méthodes pédagogiques mobilisées');
  const evaluation = nonEmptyList(props.evaluation, "Modalités d'évaluation");
  const handicap = nonEmptyText(props.handicap, 'Accessibilité aux personnes en situation de handicap');
  const lastUpdated = nonEmptyText(props.lastUpdated, 'date de mise à jour');
  const programmeRef = nonEmptyText(props.programmeRef, 'référence programme');

  assertLastUpdatedWithin12Months(lastUpdated);

  return {
    formationTitle,
    prerequis,
    objectifs,
    contenu,
    duree,
    modalitesAcces,
    delaiAcces,
    tarifInter,
    tarifIntra,
    methodes,
    evaluation,
    handicap,
    lastUpdated,
    programmeRef,
  };
}
