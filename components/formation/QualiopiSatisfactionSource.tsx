import { PROOF } from '@/lib/proof';

export function QualiopiSatisfactionSource({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-slate-500 ${className}`}>{PROOF.mentionSource}</p>
  );
}
