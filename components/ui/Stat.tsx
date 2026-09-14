import { cn } from '@/lib/cn';

type StatProps = {
  value: string;
  label: string;
  className?: string;
};

/** Indicateur de preuve sociale compact. */
export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn('ofc-stat', className)}>
      <p className="ofc-stat__value">{value}</p>
      <p className="ofc-stat__label">{label}</p>
    </div>
  );
}
