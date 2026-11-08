import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { breadcrumbItemsFromPaths } from '@/lib/seo';

type Props = {
  formationTitle: string;
  /** Chemin canonique de la fiche (ex. `/formations/ia-appels-offre-btp`). */
  formationPath: string;
  jsonLdId?: string;
};

/**
 * Fil d’Ariane visuel + JSON-LD unique — au-dessus du hero des fiches catalogue maquette.
 */
export function TrainingFormationBreadcrumb({
  formationTitle,
  formationPath,
  jsonLdId = 'schema-breadcrumb-catalogue-formation',
}: Props) {
  const trail = [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: LINKS.formations },
    { name: formationTitle, path: formationPath },
  ];
  const jsonLdItems = breadcrumbItemsFromPaths(trail);

  return (
    <>
      <BreadcrumbJsonLd id={jsonLdId} items={jsonLdItems} />
      <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <li>
            <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
              Accueil
            </Link>
          </li>
          <li className="text-slate-400" aria-hidden>
            /
          </li>
          <li>
            <Link
              href={LINKS.formations}
              className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]"
            >
              Formations
            </Link>
          </li>
          <li className="text-slate-400" aria-hidden>
            /
          </li>
          <li className="font-medium text-[#101936]" aria-current="page">
            {formationTitle}
          </li>
        </ol>
      </nav>
    </>
  );
}
