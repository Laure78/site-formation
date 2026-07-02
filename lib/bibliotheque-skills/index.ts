import manifest from './manifest.json';
import { getSkillCategory, getSkillDisplayName, SKILL_LIBRARY_CATEGORIES, type SkillLibraryCategoryId } from './categories';
import { SKILL_INSTALL_TUTORIAL } from './tutorial';

export type BibliothequeSkillEntry = {
  id: string;
  name: string;
  description: string;
  mdUrl: string;
  skillMdUrl: string;
  skillUrl: string;
  hasAssets: boolean;
  category: SkillLibraryCategoryId;
};

export const BIBLIOTHEQUE_SKILLS: BibliothequeSkillEntry[] = manifest.skills.map((s) => ({
  ...s,
  name: getSkillDisplayName(s.id, s.name),
  description: s.description.replace(/^"|"$/g, '').trim(),
  category: getSkillCategory(s.id),
}));

export const BIBLIOTHEQUE_SKILLS_COUNT = BIBLIOTHEQUE_SKILLS.length;

export { SKILL_LIBRARY_CATEGORIES, SKILL_INSTALL_TUTORIAL, getSkillCategory };
export type { SkillLibraryCategoryId };

export function getSkillsByCategory(categoryId: SkillLibraryCategoryId): BibliothequeSkillEntry[] {
  return BIBLIOTHEQUE_SKILLS.filter((s) => s.category === categoryId);
}
