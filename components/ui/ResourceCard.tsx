import Image from 'next/image';
import { Card, CardArrow } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type ResourceCardProps = {
  href: string;
  titre: string;
  phrase: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
};

/** Carte éditoriale ressource — catégorie, titre, description courte. */
export function ResourceCard({
  href,
  titre,
  phrase,
  category = 'Ressource',
  imageSrc,
  imageAlt = '',
  ctaLabel = 'Accéder à la ressource',
}: ResourceCardProps) {
  return (
    <Card href={href} className="group flex flex-col overflow-hidden p-0">
      {imageSrc ? (
        <div className="relative aspect-[16/10] w-full bg-ofc-accent-soft">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          className="flex aspect-[16/10] w-full items-end bg-gradient-to-br from-ofc-accent-soft via-white to-[#e8f0fe] p-5"
          aria-hidden
        >
          <Badge className="border-white/60 bg-white/90">{category}</Badge>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {imageSrc ? <Badge className="mb-3 w-fit">{category}</Badge> : null}
        <h3 className={`${OFC_TYPE_H3} group-hover:text-ofc-accent`}>{titre}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{phrase}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ofc-accent">
          {ctaLabel}
          <CardArrow />
        </span>
      </div>
    </Card>
  );
}
