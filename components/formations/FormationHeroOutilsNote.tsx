import { getFormationOutilsAbonnementsAvantDevis } from '@/lib/infos-pratiques-catalogue';

type Props = {
  catalogueRef: string;
  className?: string;
  /** Titre de l’encadré (défaut : Prérequis outils). */
  title?: string;
};

/**
 * Prérequis outils / abonnements — à placer avant le premier bouton « Demander un devis ».
 */
export function FormationHeroOutilsNote({ catalogueRef, className = '', title }: Props) {
  const text = getFormationOutilsAbonnementsAvantDevis(catalogueRef);
  const heading =
    title ??
    (catalogueRef === 'NIV-09' ? 'Comptes et abonnements IA à prévoir' : 'Prérequis outils');
  return (
    <p
      className={`rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-700 ${className}`}
      role="note"
    >
      <span className="font-semibold text-slate-900">{heading} : </span>
      {text}
    </p>
  );
}
