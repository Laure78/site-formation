/**
 * Illustrations automatiques pour les articles du blog — cohérentes avec le thème (catégorie SEO).
 * Basé sur les visuels officiels (lib/photos.ts) : formation, terrain BTP, formatrice.
 */

import { PHOTOS } from '@/lib/photos';
import { getArticleCategory } from '@/lib/blog';
import type { BlogCategoryId } from '@/lib/blog';

/** Corps de métier / thème BTP pour l’alt SEO des illustrations d’article */
const METIER_PAR_CATEGORIE: Record<BlogCategoryId, string> = {
  'appels-offres': 'appels d’offres et mémoires techniques BTP',
  devis: 'devis et chiffrage BTP',
  financement: 'financement formation Constructys BTP',
  chatgpt: 'ChatGPT et IA générative BTP',
  metiers: 'entreprises et métiers du BTP',
  rh: 'RH et recrutement BTP',
  productivite: 'productivité et organisation chantier BTP',
};

function truncate125(s: string): string {
  if (s.length <= 125) return s;
  return `${s.slice(0, 122)}…`;
}

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

function buildArticleIllustrationAlt(articleTitle: string, slug: string): string {
  const cat = getArticleCategory(slug);
  const metier = METIER_PAR_CATEGORIE[cat];
  return truncate125(
    `${articleTitle} — ${metier} — formation IA BTP Laure Olivié`
  );
}

/**
 * Pools thématiques (ordre = préférence de rotation).
 * Visuels blog 2026 (chantier, salle « L'IA dans le BTP », convention / flipchart, artisans)
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
    'formationSensibilisationAssistantsIaBtp2026',
    'blogBtpChantierEncadrement2026',
    'blogBtpChantierPlansEchange2026',
    'formationIATP2026',
    'formationIAClaude2026',
    'formationIASensibilisation2026',
    'architecteConcentration',
    'formationIABtpArchiClaudePresentielGroupe2026',
    'btpFormationChantierEquipe2026',
  ],
  rh: [
    'blogFormationIaBtpHandshakeFlipchart2026',
    'formationIARH2026',
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
export function getBlogArticleIllustrations(slug: string, articleTitle?: string): BlogIllustration[] {
  const cat = getArticleCategory(slug);
  const pool = POOLS[cat] ?? DEFAULT_POOL;
  const h = hashSlug(slug);
  const n = pool.length;
  const idx = h % n;
  const ill = fromPhoto(pool[idx]);
  if (!articleTitle?.trim()) return [ill];
  return [
    {
      ...ill,
      alt: buildArticleIllustrationAlt(articleTitle.trim(), slug),
    },
  ];
}
