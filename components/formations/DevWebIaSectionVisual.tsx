import Image from 'next/image';

type DevWebIaSectionVisualProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Cadre visuel portrait cohérent pour les illustrations NIV-10
 * (carrousel « Développement web avec l’IA — sans savoir coder »).
 */
export function DevWebIaSectionVisual({
  src,
  alt,
  width,
  height,
  title,
  priority,
  className = '',
  sizes = '(max-width: 768px) 92vw, 360px',
}: DevWebIaSectionVisualProps) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes={sizes}
        priority={priority}
        quality={82}
      />
    </figure>
  );
}
