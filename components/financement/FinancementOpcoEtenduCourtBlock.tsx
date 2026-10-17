import Link from 'next/link';
import {
  FINANCEMENT_OPCO_ETENDU_BLOC_COURT,
  FINANCEMENT_OPCO_ETENDU_LIEN_LABEL,
  FINANCEMENT_OPCO_ETENDU_PAGE_HREF,
} from '@/lib/financement-opco-etendu-config';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  /** Défaut `#financement` — sommaire fiches formation. */
  id?: string;
  className?: string;
};

/**
 * Version courte du bloc financement Atlas / OPCO EP — fiches et parcours concernés.
 */
export function FinancementOpcoEtenduCourtBlock({
  id = 'financement',
  className = '',
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-[calc(var(--site-header-height)+3.25rem)] ${className}`.trim()}
    >
      <h2 id={`${id}-title`} className="font-display text-2xl font-bold text-slate-900">
        Financement
      </h2>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 md:px-8 md:py-8">
        <p className="max-w-3xl text-base leading-relaxed text-slate-700">
          {FINANCEMENT_OPCO_ETENDU_BLOC_COURT}
        </p>
        <p className="mt-4">
          <Link
            href={FINANCEMENT_OPCO_ETENDU_PAGE_HREF}
            className={`${OFC_LINK} font-semibold`}
          >
            {FINANCEMENT_OPCO_ETENDU_LIEN_LABEL}
          </Link>
        </p>
      </div>
    </section>
  );
}
