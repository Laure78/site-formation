import { getFormationOutilsAbonnementsAvantDevis } from '@/lib/infos-pratiques-catalogue';

type Props = {
  catalogueRef: string;
  className?: string;
};

/**
 * Prérequis outils / abonnements — à placer avant le premier bouton « Demander un devis ».
 */
export function FormationHeroOutilsNote({ catalogueRef, className = '' }: Props) {
  const text = getFormationOutilsAbonnementsAvantDevis(catalogueRef);
  return (
    <p
      className={`rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-700 ${className}`}
      role="note"
    >
      <span className="font-semibold text-slate-900">Prérequis outils : </span>
      {text}
    </p>
  );
}
