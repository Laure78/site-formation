/**
 * Illustrations automatiques pour les articles du blog — cohérentes avec le thème (catégorie SEO).
 * Basé sur les visuels officiels (lib/photos.ts) : formation, terrain BTP, formatrice.
 */

import { PHOTOS } from '@/lib/photos';
import { getArticleCategory } from '@/lib/blog';
import type { BlogCategoryId } from '@/lib/blog';

export type BlogIllustration = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PhotoKey = keyof typeof PHOTOS;

function fromPhoto(key: PhotoKey): BlogIllustration {
  const p = PHOTOS[key];
  return { src: p.src, alt: p.alt, width: p.width, height: p.height };
}

/** Pools thématiques (ordre = préférence de rotation) */
const POOLS: Record<BlogCategoryId, PhotoKey[]> = {
  'appels-offres': [
    'formationIAAppelsOffres2026',
    'btpFormationChantierPlans2026',
    'formationIABtpVisioBureau2026',
    'btpFormationEcranIABTP2026',
    'btpFormationSalleIntervention2026',
    'interventionClaude',
  ],
  devis: [
    'formationIAArtisans2026',
    'heroAccueilFormationIABtpEchange2026',
    'btpFormationSalleIntervention2026',
    'ouvrierPlan',
    'formationEntreprise',
    'btpFormationBureauConseil2026',
  ],
  financement: [
    'formationIAArtisans2026',
    'formationIASensibilisation2026',
    'portraitPro2026',
    'formatriceLowerThird',
    'btpFormationSalleIntervention2026',
  ],
  chatgpt: [
    'interventionClaude',
    'formatriceLowerThird',
    'coursRecrutementVideo1',
    'linkedinSommaireCours',
    'studioLight',
    'btpFormationChantierPlans2026',
  ],
  metiers: [
    'formationIATP2026',
    'formationIAClaude2026',
    'formationIASensibilisation2026',
    'architecteConcentration',
    'formationIABtpArchiClaudePresentielGroupe2026',
    'btpFormationChantierEquipe2026',
  ],
  rh: [
    'formationIARH2026',
    'bannerRecrutement',
    'linkedinLeconFideliser',
    'coursRecrutementVideo1',
    'linkedinPlayerRecrutement',
  ],
  productivite: [
    'btpFormationBureauConseil2026',
    'btpFormationChantierPlans2026',
    'studioLight',
    'formationEntreprise',
    'heroAccueilFormationIABtpEchange2026',
  ],
  regions: [
    'accueilReferencePartenairesLaureOFC2026',
    'btpFormationSalleIntervention2026',
    'heroAccueilFormationIABtpEchange2026',
    'formationIAArtisans2026',
    'btpFormationChantierPlans2026',
  ],
  formateurs: [
    'portraitPro2026',
    'linkedinPanel',
    'studioLight',
    'formatriceLowerThird',
    'interventionClaude',
  ],
};

const DEFAULT_POOL: PhotoKey[] = [
  'btpFormationSalleIntervention2026',
  'btpFormationChantierPlans2026',
  'heroAccueilFormationIABtpEchange2026',
  'formationIAArtisans2026',
  'btpFormationBureauConseil2026',
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 33 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Trois visuels distincts par article : hero + deux intercalaires (rotation selon le slug).
 */
export function getBlogArticleIllustrations(slug: string): BlogIllustration[] {
  const cat = getArticleCategory(slug);
  const pool = POOLS[cat] ?? DEFAULT_POOL;
  const h = hashSlug(slug);
  const n = pool.length;
  const indices: number[] = [];
  let step = h % n;
  for (let k = 0; k < 3; k++) {
    let idx = (step + k * (1 + (h % 3))) % n;
    let guard = 0;
    while (indices.includes(idx) && guard < n) {
      idx = (idx + 1) % n;
      guard++;
    }
    indices.push(idx);
  }
  return indices.map((i) => fromPhoto(pool[i]));
}

/** Indices de sections après lesquels insérer la 2e et 3e image (évite articles trop courts). */
export function getIllustrationSectionIndices(sectionCount: number): {
  afterFirst: number | null;
  afterSecond: number | null;
} {
  if (sectionCount <= 1) {
    return { afterFirst: null, afterSecond: null };
  }
  if (sectionCount === 2) {
    return { afterFirst: 0, afterSecond: null };
  }
  const i1 = Math.max(0, Math.min(sectionCount - 2, Math.floor(sectionCount * 0.38)));
  let i2 = Math.max(0, Math.min(sectionCount - 2, Math.floor(sectionCount * 0.72)));
  if (i2 <= i1) {
    i2 = Math.min(i1 + 1, sectionCount - 1);
  }
  return { afterFirst: i1, afterSecond: i2 };
}
