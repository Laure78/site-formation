/**
 * Skills issus des tutos PDF /ressources — méthode Laure Olivié (OFC).
 * Pas de fichier .skill : tuto en ligne + PDF à télécharger.
 */
import type { TutoCategoryId } from '@/lib/tutos/types';
import { TUTOS } from '@/lib/tutos';
import { LINKS } from '@/lib/internal-links';
import type { SkillLibraryCategoryId } from './categories';

const TUTO_CATEGORY_MAP: Record<TutoCategoryId, SkillLibraryCategoryId> = {
  'marches-et-veille': 'marches-publics',
  'chantier-livrables': 'chantier',
  'qse-conformite': 'qse',
  productivite: 'productivite',
};

export type TutoSkillEntry = {
  id: string;
  name: string;
  summary: string;
  category: SkillLibraryCategoryId;
  source: 'tuto-ofc';
  tutoUrl: string;
  pdfUrl: string;
};

export const TUTO_SKILLS_CATALOG: TutoSkillEntry[] = TUTOS.map((t) => ({
  id: t.slug,
  name: t.shortTitle,
  summary: t.cardSummary,
  category: TUTO_CATEGORY_MAP[t.category],
  source: 'tuto-ofc' as const,
  tutoUrl: `${LINKS.ressources}/${t.slug}`,
  pdfUrl: `${LINKS.ressources}/pdf/${t.pdfFile}`,
}));

/** Pack texte 3 skills Claude (lead magnet existant). */
export const PACK_3_SKILLS_ENTRY = {
  id: 'ofc-pack-3-skills-claude',
  name: 'Pack 3 skills Claude BTP',
  summary: 'CR chantier, devis client et emails pro — 3 modèles prêts à copier dans Claude.',
  category: 'productivite' as SkillLibraryCategoryId,
  source: 'tuto-ofc' as const,
  tutoUrl: LINKS.claudeAiBtp,
  pdfUrl: LINKS.downloadClaudeSkillsBtp,
};

export const RESSOURCES_TUTO_SKILLS: TutoSkillEntry[] = [
  ...TUTO_SKILLS_CATALOG,
  PACK_3_SKILLS_ENTRY,
];
