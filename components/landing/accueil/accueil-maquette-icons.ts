import {
  AppWindow,
  BrainCircuit,
  ClipboardList,
  FileSearch,
  FolderOpen,
  HardHat,
  type LucideIcon,
} from 'lucide-react';
import type { AccueilMaquetteFormationCarte } from '@/lib/accueil-config';

/** Trait homogène — icônes accueil maquette (lucide-react). */
export const ACCUEIL_MAQUETTE_ICON_STROKE = 1.875 as const;

/** Animations scroll — page d’accueil maquette uniquement. */
export const ACCUEIL_MOTION_REVEAL = {
  distance: 16,
  staggerMs: 70,
  contentDelayMs: 90,
} as const;

const FORMATION_ICONS: Record<AccueilMaquetteFormationCarte['code'], LucideIcon> = {
  'NIV-01': BrainCircuit,
  'NIV-02': FileSearch,
  'NIV-03': HardHat,
  'NIV-10': AppWindow,
};

export function accueilMaquetteFormationIcon(code: AccueilMaquetteFormationCarte['code']): LucideIcon {
  return FORMATION_ICONS[code];
}

export const ACCUEIL_EXEMPLE_ICONS = {
  dce: FileSearch,
  cr: ClipboardList,
  admin: FolderOpen,
} as const satisfies Record<string, LucideIcon>;
