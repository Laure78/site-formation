import { ArrowRight } from 'lucide-react';

type Props = {
  className?: string;
};

/** Bouton fléché rond — cartes accueil maquette. */
export function AccueilMaquetteArrowButton({ className = '' }: Props) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#377CF3]/30 bg-white text-[#377CF3] motion-safe:transition-[border-color,background-color,color,transform] motion-safe:duration-200 group-hover:border-[#377CF3] group-hover:bg-[#377CF3] group-hover:text-white motion-reduce:transition-none ${className}`}
      aria-hidden
    >
      <ArrowRight
        className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={1.875}
      />
    </span>
  );
}
