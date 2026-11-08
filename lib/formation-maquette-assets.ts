/**
 * Visuels héro et bandeau pédagogie — fiches catalogue maquette (réf. NIV-02).
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { NIV01_MAQUETTE_HERO } from '@/lib/formation-niv01-maquette-assets';
import { NIV02_MAQUETTE_HERO, NIV02_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv02-maquette-assets';
import { NIV03_MAQUETTE_HERO, NIV03_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv03-maquette-assets';
import { NIV04_MAQUETTE_HERO, NIV04_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv04-maquette-assets';
import { NIV05_MAQUETTE_HERO, NIV05_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv05-maquette-assets';
import { NIV11_MAQUETTE_HERO, NIV11_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv11-maquette-assets';
import { getFormationByCode } from '@/data/formations';

export type MaquetteHeroImage = { src: string; alt: string; width?: number; height?: number };

const DEFAULT_PEDAGOGY_BG = NIV02_MAQUETTE_PEDAGOGIE_BG;

const ASSETS: Partial<
  Record<FormationCatalogueCode, { hero: MaquetteHeroImage; pedagogyBg: string }>
> = {
  'NIV-01': { hero: NIV01_MAQUETTE_HERO, pedagogyBg: DEFAULT_PEDAGOGY_BG },
  'NIV-02': { hero: NIV02_MAQUETTE_HERO, pedagogyBg: NIV02_MAQUETTE_PEDAGOGIE_BG },
  'NIV-03': { hero: NIV03_MAQUETTE_HERO, pedagogyBg: NIV03_MAQUETTE_PEDAGOGIE_BG },
  'NIV-04': { hero: NIV04_MAQUETTE_HERO, pedagogyBg: NIV04_MAQUETTE_PEDAGOGIE_BG },
  'NIV-05': { hero: NIV05_MAQUETTE_HERO, pedagogyBg: NIV05_MAQUETTE_PEDAGOGIE_BG },
  'NIV-09': {
    hero: {
      src: '/images/formations/assistants-ia-btp.webp',
      alt: 'Professionnels du BTP configurant des assistants IA sur ordinateur — formation présentiel',
    },
    pedagogyBg: '/images/formation-ia-chantier-conducteur-travaux.webp',
  },
  'NIV-10': {
    hero: {
      src: '/images/formation-ia-architecture-claude-presentiel-groupe.jpg',
      alt: 'Groupe en formation présentiel autour d’ordinateurs — création d’application métier BTP avec l’IA',
    },
    pedagogyBg: DEFAULT_PEDAGOGY_BG,
  },
  'NIV-11': { hero: NIV11_MAQUETTE_HERO, pedagogyBg: NIV11_MAQUETTE_PEDAGOGIE_BG },
};

export function getFormationMaquetteAssets(code: FormationCatalogueCode): {
  hero: MaquetteHeroImage;
  pedagogyBg: string;
} {
  const preset = ASSETS[code];
  if (preset) return preset;
  const formation = getFormationByCode(code);
  return {
    hero: {
      src: formation?.image ?? '/images/formation-ia-batiment-travaux-publics.webp',
      alt: formation?.titre ?? 'Formation IA BTP — Laure Olivié',
    },
    pedagogyBg: DEFAULT_PEDAGOGY_BG,
  };
}
