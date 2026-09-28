import { cn } from '@/lib/cn';

type ProcessStepProps = {
  number: string;
  title: string;
  description?: string;
  className?: string;
};

/** Étape numérotée — parcours / méthode. */
export function ProcessStep({ number, title, description, className }: ProcessStepProps) {
  return (
    <li className={cn('ofc-process-step', className)}>
      <span className="ofc-process-step__n">{number}</span>
      <p className="mt-3 font-semibold leading-snug text-ofc-ink md:text-base">{title}</p>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{description}</p>
      ) : null}
    </li>
  );
}
