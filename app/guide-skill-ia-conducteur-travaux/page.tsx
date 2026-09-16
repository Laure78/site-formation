import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon Skill IA — 301 vers l’article blog canonique. */
export default function GuideSkillIaConducteurTravauxLegacyRedirect() {
  redirect(LINKS.blogGuideSkillIaConducteurTravaux);
}
