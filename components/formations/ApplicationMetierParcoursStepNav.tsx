import Link from 'next/link';
import { type ApplicationMetierParcoursStep } from '@/lib/application-metier-btp-parcours-nav';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  step: ApplicationMetierParcoursStep;
  className?: string;
};

/** Navigation entre étapes du parcours (le lien retour parcours est dans le hero). */
export function ApplicationMetierParcoursStepNav({ step, className = '' }: Props) {
  if (!step.prevNav && !step.nextNav) return null;

  return (
    <nav
      aria-label="Navigation entre les niveaux du parcours"
      className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between ${className}`}
    >
      {step.prevNav ? (
        <Link href={step.prevNav.href} className={`text-sm font-semibold ${OFC_LINK}`}>
          {step.prevNav.label}
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block sm:flex-1" />
      )}
      {step.nextNav ? (
        <Link href={step.nextNav.href} className={`text-sm font-semibold sm:text-right ${OFC_LINK}`}>
          {step.nextNav.label}
        </Link>
      ) : null}
    </nav>
  );
}
