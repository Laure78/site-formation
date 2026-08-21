/** Données obligatoires — aucun champ optionnel (Indicateur 1 Qualiopi, fiches catalogue). */
export type InfosPratiquesFormation = {
  formationTitle: string;
  programmeRef: string;
  programmeVersion: string;
  prerequis: string;
  objectifs: string[];
  contenu: string[];
  programmePdfUrl: string;
  duree: string;
  modalitesAcces: string;
  delaiAcces: string;
  tarif: string;
  methodes: string[];
  modalitesEvaluation: string[];
  modalitePedagogique: string;
  accessibiliteHandicap: string;
  dateMaj: string;
};
