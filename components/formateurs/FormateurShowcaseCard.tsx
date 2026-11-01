import Image from 'next/image';
import Link from 'next/link';
import { formateurPrimarySpecialty, type FormateurProfile } from '@/lib/formateurs';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { cn } from '@/lib/cn';

type Props = {
  formateur: FormateurProfile;
  portraitPriority?: boolean;
};

/** Carte formateur — photo en tête, style landing /formateurs. */
export function FormateurShowcaseCard({ formateur, portraitPriority = false }: Props) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const specialty = formateurPrimarySpecialty(formateur);
  const portraitAlt =
    formateur.portrait.kind === 'photo'
      ? formateur.portrait.alt
      : `Portrait de ${fullName}, ${specialty}`;

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm',
        'motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#377CF3]/25 motion-safe:hover:shadow-md',
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
            className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
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
        <p className="mt-1.5 text-sm font-medium leading-snug text-[#377CF3] text-pretty line-clamp-3">
          {specialty}
        </p>
        <div className="mt-4 h-0.5 w-10 rounded-full bg-[#377CF3]" aria-hidden />

        <div className="mt-auto pt-5">
          <Link
            href={`#${formateur.slug}`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#377CF3]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] motion-reduce:transition-none"
            aria-label={`Voir le profil de ${fullName}`}
          >
            Voir le profil
          </Link>
        </div>
      </div>
    </article>
  );
}
