import { cn } from '@/lib/cn';

type ProcessStepProps = {
  number: string;
  title: string;
  className?: string;
};

/** Étape numérotée — parcours / méthode. */
export function ProcessStep({ number, title, className }: ProcessStepProps) {
  return (
    <li className={cn('ofc-process-step', className)}>
      <span className="ofc-process-step__n">{number}</span>
      <p className="mt-3 text-sm leading-relaxed text-ofc-ink md:text-base">{title}</p>
    </li>
  );
}
