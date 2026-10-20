import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildFormationsIaNiveauHref } from '@/lib/catalogue-filter-url';
import type { FormationNiveauIaDefinition } from '@/lib/formations-niveaux-ia';
import { OFC_CARD_ARROW } from '@/lib/ofc-interaction-classes';

const ACCUEIL_NIVEAU_PHRASE: Record<1 | 2 | 3, string> = {
  1: 'Prendre en main l’IA.',
  2: 'Appliquer l’IA à vos missions BTP.',
  3: 'Créer vos assistants et vos outils métier.',
};

type Props = {
  niveau: FormationNiveauIaDefinition;
};

/** Carte compacte accueil — lien vers le catalogue filtré par niveau. */
export function AccueilFormationsNiveauCardLink({ niveau }: Props) {
  const phrase = ACCUEIL_NIVEAU_PHRASE[niveau.niveau];
  const href = buildFormationsIaNiveauHref(niveau.niveau);

  return (
    <Link
      href={href}
      className="group flex h-full min-h-11 items-start justify-between gap-3 rounded-xl border border-ofc-border bg-ofc-surface/30 px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 hover:border-ofc-accent hover:bg-ofc-accent-soft/40 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent active:border-ofc-accent active:bg-ofc-accent-soft/50"
      aria-label={`${niveau.labelComplet} — ${phrase} Voir les formations.`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-ofc-ink group-hover:text-ofc-accent">
          {niveau.labelComplet}
        </span>
        <span className="mt-1 block text-sm text-ofc-ink-muted">{phrase}</span>
      </span>
      <ArrowRight
        className={`${OFC_CARD_ARROW} h-4 w-4 shrink-0 text-ofc-ink-subtle group-hover:text-ofc-accent group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0`}
        aria-hidden
      />
    </Link>
  );
}
