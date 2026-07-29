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

/** Overrides slug → miniature dédiée (1 image hero). */
const SLUG_OVERRIDES: Record<string, BlogIllustration> = {
  'memoire-reclamation-btp-ia': {
    src: '/images/ressources/miniatures/miniature-memoire-reclamation.jpg',
    alt: 'Mémoire de réclamation BTP — récupérer ce que le marché vous doit',
    width: 1200,
    height: 675,
  },
  'analyser-ccap-ia-btp': {
    src: '/images/ressources/miniatures/miniature-tuto-analyse-ccap.jpg',
    alt: 'Analyse express du CCAP — skill Claude pour appels d’offres BTP',
    width: 1200,
    height: 675,
  },
};

/**
 * Pools thématiques (ordre = préférence de rotation).
 * Visuels blog 2026 (chantier, salle « L'IA dans le BTP », convention / flipchart, équipes BTP)
 * : voir PHOTOS.blog* dans lib/photos.ts.
 */
const POOLS: Record<BlogCategoryId, PhotoKey[]> = {
  'appels-offres': [
    'blogFormationIaDansLeBtpSalle2026',
    'formationIAAppelsOffres2026',
    'blogBtpChantierPlansEchange2026',
    'btpFormationChantierPlans2026',
    'formationIABtpVisioBureau2026',
    'btpFormationEcranIABTP2026',
    'btpFormationSalleIntervention2026',
    'interventionClaude',
  ],
  devis: [
    'blogBtpChantierPlansEchange2026',
    'blogFormationIaBtpHandshakeFlipchart2026',
    'blogIaAuServiceArtisansBatiment2026',
    'formationIAArtisans2026',
    'heroAccueilFormationIABtpEchange2026',
    'btpFormationSalleIntervention2026',
    'ouvrierPlan',
    'formationEntreprise',
    'btpFormationBureauConseil2026',
  ],
  financement: [
    'blogFormationIaBtpHandshakeFlipchart2026',
    'formationIAArtisans2026',
    'formationIASensibilisation2026',
    'portraitPro2026',
    'formatriceLowerThird',
    'btpFormationSalleIntervention2026',
  ],
  chatgpt: [
    'blogFormationIaDansLeBtpSalle2026',
    'blogIaAuServiceArtisansBatiment2026',
    'interventionClaude',
    'formatriceLowerThird',
    'coursRecrutementVideo1',
    'linkedinSommaireCours',
    'studioLight',
    'btpFormationChantierPlans2026',
  ],
  metiers: [
    'blogFormationIaDansLeBtpSalle2026',
    'blogBtpChantierEncadrement2026',
    'blogBtpChantierPlansEchange2026',
    'formationIATP2026',
    'interventionClaude',
    'formationIASensibilisation2026',
    'architecteConcentration',
    'formationIABtpArchiClaudePresentielGroupe2026',
    'btpFormationChantierEquipe2026',
  ],
  rh: [
    'blogFormationIaBtpHandshakeFlipchart2026',
    'btpFormationSalleIntervention2026',
    'bannerRecrutement',
    'linkedinLeconFideliser',
    'coursRecrutementVideo1',
    'linkedinPlayerRecrutement',
  ],
  productivite: [
    'blogBtpChantierPlansEchange2026',
    'blogFormationIaDansLeBtpSalle2026',
    'btpFormationBureauConseil2026',
    'btpFormationChantierPlans2026',
    'studioLight',
    'formationEntreprise',
    'heroAccueilFormationIABtpEchange2026',
  ],
};

const DEFAULT_POOL: PhotoKey[] = [
  'blogFormationIaDansLeBtpSalle2026',
  'blogBtpChantierPlansEchange2026',
  'blogIaAuServiceArtisansBatiment2026',
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
 * Un seul visuel par article (hero sous le chapô) — rotation selon le slug et la catégorie.
 */
export function getBlogArticleIllustrations(slug: string, _articleTitle?: string): BlogIllustration[] {
  const override = SLUG_OVERRIDES[slug];
  if (override) return [override];

  const cat = getArticleCategory(slug);
  const pool = POOLS[cat] ?? DEFAULT_POOL;
  const h = hashSlug(slug);
  const n = pool.length;
  const idx = h % n;
  return [fromPhoto(pool[idx])];
}
