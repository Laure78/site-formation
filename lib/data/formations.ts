/**
 * Catalogue formations — façade typée pour SEO / llms / schema.
 *
 * Source opérationnelle actuelle : `data/formations.ts` + `lib/tarifs-catalogue-participant.ts`.
 * Toute modification de tarif ou durée → mettre à jour aussi `public/llms.txt`.
 *
 * TODO (Laure) : valider / compléter `tarifIntraSessionHT` et les PDF si besoin.
 */
import { FORMATIONS, type Formation } from '@/data/formations';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';

export type FormationCatalogueEntry = {
  code: string;
  slug: string;
  titre: string;
  niveau: number;
  dureeHeures: number;
  tarifInterParticipantHT: number;
  /** Forfait intra session — null = sur devis. */
  tarifIntraSessionHT: number | null;
  participantsMin: number;
  participantsMax: number;
  version: string;
  dateMaj: string;
  programmePdf: string;
};

function parseDureeHeures(duree: string): number {
  const match = duree.match(/(\d+)\s*h/i);
  return match ? Number(match[1]) : 0;
}

function mapFormation(f: Formation): FormationCatalogueEntry {
  const dureeHeures = parseDureeHeures(f.duree);
  const tarifInter =
    f.tarifParticipantHt ??
    (f.code === 'NIV-01'
      ? TARIF_PARTICIPANT_NIV01_HT
      : dureeHeures >= 14
        ? TARIF_PARTICIPANT_NIV10_14H_HT
        : TARIF_PARTICIPANT_NIV02_HT);

  return {
    code: f.code,
    slug: f.slug,
    titre: f.titre,
    niveau: f.niveau,
    dureeHeures,
    tarifInterParticipantHT: tarifInter,
    tarifIntraSessionHT: null, // TODO Laure : forfait intra si publié
    participantsMin: f.effectifMin,
    participantsMax: f.effectifMax,
    version: f.programmeVersion ?? '',
    dateMaj: f.programmeUpdatedAt ?? '',
    programmePdf: f.pdfProgramme ?? '',
  };
}

/** Tableau typé — une entrée par programme catalogue publié. */
export const FORMATIONS_CATALOGUE: readonly FormationCatalogueEntry[] =
  FORMATIONS.map(mapFormation);

export function getFormationCatalogueByCode(
  code: string,
): FormationCatalogueEntry | undefined {
  return FORMATIONS_CATALOGUE.find((f) => f.code === code);
}

export function getFormationCatalogueBySlug(
  slug: string,
): FormationCatalogueEntry | undefined {
  return FORMATIONS_CATALOGUE.find((f) => f.slug === slug);
}
