import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formateurPrimarySpecialty, type FormateurProfile } from '@/lib/formateurs';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { cn } from '@/lib/cn';

type Props = {
  formateur: FormateurProfile;
  portraitPriority?: boolean;
};

const MAX_SPECIALITES_INLINE = 4;

function profileHref(formateur: FormateurProfile): string {
  if (formateur.profileHref) return formateur.profileHref;
  return `#${formateur.slug}`;
}

/** Carte formateur — photo en tête, style landing /formateurs (maquette). */
export function FormateurShowcaseCard({ formateur, portraitPriority = false }: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const specialty = formateurPrimarySpecialty(formateur);
  const portraitAlt =
    formateur.portrait.kind === 'photo'
      ? formateur.portrait.alt
      : `Portrait de ${fullName}, ${specialty}`;
  const specialitesLine = formateur.specialites.slice(0, MAX_SPECIALITES_INLINE).join(' · ');
  const href = profileHref(formateur);
  const opensDialog = href.startsWith('#');

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm',
        'motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200',
        'motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#377CF3]/25 motion-safe:hover:shadow-lg',
      )}
      aria-labelledby={`showcase-${formateur.id}-name`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAF3FF]">
        {formateur.portrait.kind === 'photo' ? (
          <Image
            src={formateur.portrait.src}
            alt={portraitAlt}
            width={formateur.portrait.width}
            height={formateur.portrait.height}
            className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
            style={
              formateur.portrait.objectPosition
                ? { objectPosition: formateur.portrait.objectPosition }
                : undefined
            }
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            priority={portraitPriority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FormateurPortraitView portrait={formateur.portrait} shape="circle" size="lg" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          id={`showcase-${formateur.id}-name`}
          className="font-display text-lg font-bold leading-snug text-[#101936] text-pretty"
        >
          {fullName}
        </h3>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-[#377CF3] text-pretty line-clamp-2">
          {specialty}
        </p>
        {specialitesLine ? (
          <p
            className="mt-3 border-l-[3px] border-[#F59E0B] pl-3 text-sm leading-snug text-slate-600 text-pretty line-clamp-3"
            aria-label={`Spécialités — ${fullName}`}
          >
            {specialitesLine}
          </p>
        ) : null}
        <div className="mt-auto pt-5">
          <Link
            href={href}
            {...(opensDialog ? { scroll: false } : {})}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm motion-safe:transition-[background-color,transform] motion-safe:duration-200 motion-safe:hover:bg-[#2d6ad8] motion-safe:hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {formateur.profileHref ? 'Voir le parcours' : 'Voir le profil'}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
