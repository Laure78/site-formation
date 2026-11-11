/**
 * Visuels cartes catalogue `/formations` — photos existantes par ref formation.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { PHOTOS } from '@/lib/photos';
import {
  Bot,
  Briefcase,
  Building2,
  FileSearch,
  Hammer,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

type CataloguePhoto = (typeof PHOTOS)[keyof typeof PHOTOS];

export type CatalogueCardVisual = {
  photo: CataloguePhoto;
  Icon: LucideIcon;
};

const REF_VISUALS: Partial<Record<FormationCatalogueCode, CatalogueCardVisual>> = {
  'NIV-01': { photo: PHOTOS.formationsCatalogueCarteBasesIa2026, Icon: Sparkles },
  'NIV-02': { photo: PHOTOS.formationsCatalogueCarteAppelsOffres2026, Icon: FileSearch },
  'NIV-03': { photo: PHOTOS.formationsCatalogueCarteConduiteTravaux2026, Icon: Hammer },
  'NIV-04': { photo: PHOTOS.formationsCatalogueCarteClaudeAssistants2026, Icon: Bot },
  'NIV-05': { photo: PHOTOS.formationsCatalogueCarteMaitriseOeuvre2026, Icon: Building2 },
  'NIV-11': { photo: PHOTOS.formationsCatalogueCarteAssistanceMaitriseOuvrage2026, Icon: FileSearch },
  'NIV-12': { photo: PHOTOS.formationsCatalogueCarteMaitriseOeuvreCctpDpgf2026, Icon: Building2 },
  'NIV-09': { photo: PHOTOS.formationsCatalogueCarteAssistantsIa2026, Icon: Layers },
  'NIV-10': { photo: PHOTOS.formationsCatalogueCarteApplicationsMetier2026, Icon: Briefcase },
  'NIV-13': { photo: PHOTOS.formationNiv13AgentsIaAutonomesBtp2026, Icon: Bot },
};

export function getCatalogueFormationCardVisual(ref: string): CatalogueCardVisual | null {
  const visual = REF_VISUALS[ref as FormationCatalogueCode];
  return visual ?? null;
}
