import { QUALIOPI_SATISFACTION_SOURCING } from '@/config/qualiopi';

export function QualiopiSatisfactionSource({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-slate-500 ${className}`}>{QUALIOPI_SATISFACTION_SOURCING}</p>
  );
}
