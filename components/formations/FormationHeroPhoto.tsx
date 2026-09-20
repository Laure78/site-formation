import Image from 'next/image';

/** Photo héro droite (ratio naturel, bords arrondis) — sans lien externe. */
export function FormationHeroPhoto({
  src,
  alt,
  width,
  height,
  priority,
  title,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50">
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1024px) 100vw, 400px"
        priority={priority}
        quality={75}
      />
    </div>
  );
}
