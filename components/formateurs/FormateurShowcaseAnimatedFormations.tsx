import Link from 'next/link';
import {
  getFormateurShowcaseFormationsTeaser,
  type FormateurProfile,
} from '@/lib/formateurs';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  formateur: FormateurProfile;
};

/** Bloc « Formations animées » — carte hub /formateurs (intitulés + liens). */
export function FormateurShowcaseAnimatedFormations({ formateur }: Props) {
  const { links, voirToutesHref } = getFormateurShowcaseFormationsTeaser(formateur);
  if (links.length === 0) return null;

  const sectionLabelId = `showcase-${formateur.id}-formations-label`;

  return (
    <div
      className="mt-4 border-t border-slate-200/90 pt-4"
      role="group"
      aria-labelledby={sectionLabelId}
    >
      <p id={sectionLabelId} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Formations animées
      </p>
      <ul className="mt-2 space-y-2">
        {links.map((item) => (
          <li key={item.key} className="min-w-0">
            <Link
              href={item.href}
              className={`${OFC_LINK} text-sm font-medium leading-snug text-[#101936] text-pretty line-clamp-2`}
            >
              {item.titre}
            </Link>
          </li>
        ))}
      </ul>
      {voirToutesHref ? (
        <p className="mt-2">
          <Link
            href={voirToutesHref}
            className={`${OFC_LINK} inline-flex min-h-10 items-center text-sm font-semibold text-[#377CF3]`}
          >
            Voir toutes les formations animées
          </Link>
        </p>
      ) : null}
    </div>
  );
}