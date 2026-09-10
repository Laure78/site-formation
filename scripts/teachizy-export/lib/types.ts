/** Types du manifeste d’export Teachizy (sans secrets de session). */

export type DownloadStatus =
  | 'pending'
  | 'downloaded'
  | 'skipped_duplicate'
  | 'inaccessible'
  | 'invalid_file'
  | 'recorded' // lien externe enregistré (pas de téléchargement)
  | 'error';

export type AssetKind = 'pdf' | 'xlsx' | 'xls' | 'file' | 'link';

export interface TeachizyAsset {
  /** Identifiant stable côté source (id leçon + URL/kind). */
  sourceId: string;
  kind: AssetKind;
  /** Intitulé original du support si disponible. */
  originalTitle: string;
  /** URL de page Teachizy d’origine (sans paramètres de session). */
  sourcePageUrl: string;
  /** URL fichier ou lien (sans query sensible pour les fichiers ; liens externes complets sans jetons évidents). */
  sourceUrlSafe: string | null;
  localPath: string | null;
  bytes: number | null;
  sha256: string | null;
  status: DownloadStatus;
  error?: string;
  /** Métadonnées lien (caption / host) si kind=link. */
  linkHost?: string | null;
  linkCaption?: string | null;
}

/** @deprecated alias pour compat — préférer TeachizyAsset */
export type TeachizyPdfAsset = TeachizyAsset;

export interface TeachizyLesson {
  sourceId: string;
  title: string;
  order: number;
  type?: string;
  sourcePageUrl: string | null;
  /** Tous supports : PDF, Excel, autres fichiers, liens. */
  assets: TeachizyAsset[];
  /** Compat anciennes lectures manifeste */
  pdfs?: TeachizyAsset[];
}

export interface TeachizyModule {
  sourceId: string;
  title: string;
  order: number;
  lessons: TeachizyLesson[];
}

export interface TeachizyFormation {
  sourceId: string;
  title: string;
  sourcePageUrl: string | null;
  modules: TeachizyModule[];
  /** Leçons hors chapitre (racine), si présentes. */
  rootLessons: TeachizyLesson[];
}

export interface TeachizyExportManifest {
  version: 2;
  generatedAt: string;
  storeUrl: string;
  adminUrl: string;
  inventoryOnly: boolean;
  formations: TeachizyFormation[];
  bilan: TeachizyExportBilan;
}

export interface TeachizyExportBilan {
  formationsParcourues: number;
  pdfDetectes: number;
  pdfTelecharges: number;
  xlsDetectes: number;
  xlsTelecharges: number;
  liensDetectes: number;
  liensEnregistres: number;
  doublons: number;
  inaccessibles: number;
  invalidFile: number;
  erreurs: number;
  erreursDetail: string[];
}
