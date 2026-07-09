import Link from 'next/link';
import { PARTENAIRES_FORMATION_FOOTER } from '@/lib/partenaires-content';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type FormationPartenairesMentionProps = {
  className?: string;
};

/** Rappel court — pied des fiches formation catalogue (§5 brief). */
export function FormationPartenairesMention({ className = '' }: FormationPartenairesMentionProps) {
  return (
    <aside
      className={`mx-auto max-w-6xl border-t border-slate-200 px-4 py-8 text-center md:py-10 ${className}`.trim()}
      aria-label="Références partenaires"
    >
      <p className="text-sm font-medium text-slate-700 md:text-base">{PARTENAIRES_FORMATION_FOOTER}</p>
      <p className="mt-2 text-xs text-slate-500">
        <Link href={LINKS.partenaires} className={`${OFC_LINK} font-semibold hover:underline`}>
          Découvrir les partenariats BTP
        </Link>
      </p>
    </aside>
  );
}
