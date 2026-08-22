import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
};

/**
 * Visuel héro cohérent sur les fiches formation (ratio 16:9, bordure légère).
 */
export function FormationPageHeroImage({ src, alt, priority }: Props) {
  return (
    <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 896px) 100vw, 896px"
        priority={priority}
        quality={priority ? 75 : 70}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
