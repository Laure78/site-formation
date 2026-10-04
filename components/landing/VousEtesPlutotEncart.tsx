import Link from 'next/link';
import type { InternalLinkPath } from '@/lib/internal-links';

type Props = {
  /** Public de la page en cours. */
  currentAudience: string;
  href: InternalLinkPath;
  /** Ancre descriptive vers la page sœur. */
  linkLabel: string;
};

/** Encadré anti-cannibalisation — un seul lien vers la page sœur. */
export function VousEtesPlutotEncart({ currentAudience, href, linkLabel }: Props) {
  return (
    <aside
      className="mb-8 rounded-xl border border-[#377CF3]/20 bg-[#F2F2F2] px-4 py-4 sm:px-5"
      aria-label="Vous êtes plutôt…"
    >
      <p className="text-sm font-semibold text-slate-900">Vous êtes plutôt…</p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{currentAudience}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        Autre profil :{' '}
        <Link href={href} className="font-medium text-[#377CF3] underline hover:no-underline">
          {linkLabel}
        </Link>
        .
      </p>
    </aside>
  );
}
