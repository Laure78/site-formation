import Link from 'next/link';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { formationCatalogueVersionLine } from '@/lib/formations-catalogue-display';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type FormationCatalogueTitleProps = {
  entry: Pick<FormationCatalogueEntry, 'title' | 'href' | 'programmeVersion' | 'programmeUpdatedAt'>;
  /** Classes de la ligne version · date. */
  versionClassName?: string;
  linkClassName?: string;
};

/**
 * Titre formation catalogue — titre officiel + version et date de mise à jour du programme.
 */
export function FormationCatalogueTitle({
  entry,
  versionClassName = 'mt-1 block text-sm font-normal leading-snug text-[#64748B]',
  linkClassName = OFC_LINK,
}: FormationCatalogueTitleProps) {
  const versionLine = formationCatalogueVersionLine(entry);

  return (
    <>
      <Link href={entry.href} className={linkClassName}>
        {entry.title}
      </Link>
      <span className={versionClassName}>{versionLine}</span>
    </>
  );
}
