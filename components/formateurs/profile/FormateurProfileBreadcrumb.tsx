import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  currentName: string;
};

export function FormateurProfileBreadcrumb({ currentName }: Props) {
  return (
    <nav aria-label="Fil d’Ariane" className="text-sm text-ofc-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href={LINKS.home} className={OFC_LINK}>
            Accueil
          </Link>
        </li>
        <li aria-hidden>·</li>
        <li>
          <Link href={LINKS.formateurs} className={OFC_LINK}>
            Formateurs
          </Link>
        </li>
        <li aria-hidden>·</li>
        <li className="font-medium text-ofc-ink">{currentName}</li>
      </ol>
    </nav>
  );
}