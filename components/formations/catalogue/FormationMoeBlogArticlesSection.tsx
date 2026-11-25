import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { LINKS } from '@/lib/internal-links';

const MOE_BLOG_LINKS = [
  {
    href: LINKS.blogIaMaitriseOeuvreUsages,
    title: 'IA et maîtrise d’œuvre : usages concrets',
  },
  {
    href: LINKS.blogTutoAvenantOrdreDeServiceIa,
    title: 'Tutoriel — avenant et ordre de service avec l’IA',
  },
  {
    href: LINKS.blogTutoControleSituationTravauxIa,
    title: 'Tutoriel — contrôle des situations de travaux',
  },
  {
    href: LINKS.blogTutoDepouillementOffresIa,
    title: 'Tutoriel — dépouillement des offres',
  },
  {
    href: LINKS.blogTutoSkillClaudeMaitriseOeuvre,
    title: 'Tutoriel — skill Claude pour la maîtrise d’œuvre',
  },
] as const;

export function FormationMoeBlogArticlesSection() {
  return (
    <TrainingSection
      id="articles-moe"
      title="Articles pour la maîtrise d’œuvre"
      description="Guides et tutoriels MOE / MOEX — méthodes terrain, prompts et relecture humaine."
      tone="muted"
      icon={BookOpen}
    >
      <ul className="space-y-3 text-slate-700">
        {MOE_BLOG_LINKS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-medium text-[#377CF3] underline hover:no-underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}