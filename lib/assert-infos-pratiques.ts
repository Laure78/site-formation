/**
 * Garde Qualiopi indicateur 1 — bloc « Informations pratiques » des fiches catalogue.
 */

import { assertLastUpdatedWithin12Months, parseDateFr } from '@/lib/assert-infos-reglementaires';
import type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';

function nonEmptyText(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`[InfosPratiques] Section obligatoire manquante ou vide : ${label}`);
  }
  return value.trim();
}

function nonEmptyList(value: unknown, label: string): readonly string[] {
  const list = Array.isArray(value) ? value : null;
  if (!list || list.length === 0) {
    throw new Error(`[InfosPratiques] Section obligatoire manquante ou vide : ${label}`);
  }
  return list.map((line, i) => {
    if (typeof line !== 'string' || !line.trim()) {
      throw new Error(`[InfosPratiques] Entrée vide dans ${label} (index ${i})`);
    }
    return line.trim();
  });
}

/** Valide les 11 sections audit + métadonnées programme. */
export function assertInfosPratiquesCompletes(
  props: Partial<InfosPratiquesFormation>,
): InfosPratiquesFormation {
  const formationTitle = nonEmptyText(props.formationTitle, 'formationTitle');
  const programmeRef = nonEmptyText(props.programmeRef, 'référence programme');
  const programmeVersion = nonEmptyText(props.programmeVersion, 'version programme');
  const prerequis = nonEmptyText(props.prerequis, 'Prérequis');
  const objectifs = nonEmptyList(props.objectifs, 'Objectifs');
  const contenu = nonEmptyList(props.contenu, 'Contenu de la formation');
  const programmePdfUrl = nonEmptyText(props.programmePdfUrl, 'programme PDF');
  const duree = nonEmptyText(props.duree, 'Durée');
  const modalitesAcces = nonEmptyText(props.modalitesAcces, "Modalités d'accès");
  const delaiAcces = nonEmptyText(props.delaiAcces, "Délais d'accès");
  const tarif = nonEmptyText(props.tarif, 'Tarif');
  const methodes = nonEmptyList(props.methodes, 'Méthodes pédagogiques mobilisées');
  const modalitesEvaluation = nonEmptyList(props.modalitesEvaluation, "Modalités d'évaluation");
  const modalitePedagogique = nonEmptyText(props.modalitePedagogique, 'Modalité pédagogique');
  const accessibiliteHandicap = nonEmptyText(
    props.accessibiliteHandicap,
    'Accessibilité aux personnes en situation de handicap',
  );
  const dateMaj = nonEmptyText(props.dateMaj, 'date de mise à jour');

  parseDateFr(dateMaj, 'dateMaj');
  assertLastUpdatedWithin12Months(dateMaj);

  return {
    formationTitle,
    programmeRef,
    programmeVersion,
    prerequis,
    objectifs: [...objectifs],
    contenu: [...contenu],
    programmePdfUrl,
    duree,
    modalitesAcces,
    delaiAcces,
    tarif,
    methodes: [...methodes],
    modalitesEvaluation: [...modalitesEvaluation],
    modalitePedagogique,
    accessibiliteHandicap,
    dateMaj,
  };
}
