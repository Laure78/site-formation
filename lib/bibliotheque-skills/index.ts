import manifest from './manifest.json';
import {
  getSkillCategory,
  getSkillDisplayName,
  getSkillShortDescription,
  SKILL_LIBRARY_CATEGORIES,
  type SkillLibraryCategoryId,
} from './categories';
import { RESSOURCES_TUTO_SKILLS } from './tutos-catalog';
import { SKILL_INSTALL_TUTORIAL } from './tutorial';

export type BibliothequeSkillSource = 'bework' | 'tuto-ofc';

export type BibliothequeSkillEntry = {
  id: string;
  name: string;
  summary: string;
  category: SkillLibraryCategoryId;
  source: BibliothequeSkillSource;
  mdUrl?: string;
  skillMdUrl?: string;
  skillUrl?: string;
  tutoUrl?: string;
  pdfUrl?: string;
  hasAssets?: boolean;
};

const BEWORK_SKILLS: BibliothequeSkillEntry[] = manifest.skills.map((s) => ({
  id: s.id,
  name: getSkillDisplayName(s.id, s.name),
  summary: getSkillShortDescription(s.id, s.description.slice(0, 120) + '…'),
  category: getSkillCategory(s.id),
  source: 'bework' as const,
  mdUrl: s.mdUrl,
  skillMdUrl: s.skillMdUrl,
  skillUrl: s.skillUrl,
  hasAssets: s.hasAssets,
}));

const TUTO_SKILLS: BibliothequeSkillEntry[] = RESSOURCES_TUTO_SKILLS.map((t) => ({
  id: t.id,
  name: t.name,
  summary: t.summary,
  category: t.category,
  source: t.source,
  tutoUrl: t.tutoUrl,
  pdfUrl: t.pdfUrl,
}));

export const BIBLIOTHEQUE_SKILLS: BibliothequeSkillEntry[] = [...BEWORK_SKILLS, ...TUTO_SKILLS];

export const BIBLIOTHEQUE_SKILLS_COUNT = BIBLIOTHEQUE_SKILLS.length;
export const BIBLIOTHEQUE_BEWORK_COUNT = BEWORK_SKILLS.length;
export const BIBLIOTHEQUE_TUTO_COUNT = TUTO_SKILLS.length;

export { SKILL_LIBRARY_CATEGORIES, SKILL_INSTALL_TUTORIAL, getSkillCategory };
export type { SkillLibraryCategoryId };

export function getSkillsByCategory(categoryId: SkillLibraryCategoryId): BibliothequeSkillEntry[] {
  return BIBLIOTHEQUE_SKILLS.filter((s) => s.category === categoryId);
}
