import type { TutoData } from './types';

/** Résout les id DOM (#…) pour les liens « Ce que tu vas apprendre ». */
export function computeHeroLearnAnchorIds(tuto: TutoData): string[] {
  const { slug, heroLearnPoints, steps } = tuto;
  const n = heroLearnPoints.length;
  const lastNum = Math.max(1, steps.length);

  if (
    tuto.heroLearnPointTargets?.length === n &&
    tuto.heroLearnPointTargets.every((id) => id.length > 0)
  ) {
    return tuto.heroLearnPointTargets.map((raw) => (raw === 'intro' ? `intro-${slug}` : raw));
  }

  const promptStepNum =
    steps.find((s) => s.blocks.some((b) => b.kind === 'prompt'))?.number ?? Math.min(3, lastNum);

  return heroLearnPoints.map((_, i) => {
    if (i === 0) return `intro-${slug}`;
    if (i === 1) return 'etape-1';
    if (i === n - 1) return `etape-${lastNum}`;
    if (n >= 4 && i === 2) return `etape-${promptStepNum}`;
    if (n === 3 && i === 2) return `etape-${lastNum}`;
    return `etape-${Math.min(Math.max(1, i), lastNum)}`;
  });
}
