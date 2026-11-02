import { ArrowRight } from 'lucide-react';

type Props = {
  className?: string;
};

/** Bouton fléché rond — cartes accueil maquette. */
export function AccueilMaquetteArrowButton({ className = '' }: Props) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#377CF3]/30 bg-white text-[#377CF3] transition group-hover:border-[#377CF3] group-hover:bg-[#377CF3] group-hover:text-white ${className}`}
      aria-hidden
    >
      <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}
