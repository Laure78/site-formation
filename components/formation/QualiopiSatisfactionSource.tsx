import { PREUVES_MENTION_SOURCE } from '@/lib/constants';

export function QualiopiSatisfactionSource({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-slate-500 ${className}`}>{PREUVES_MENTION_SOURCE}</p>
  );
}
