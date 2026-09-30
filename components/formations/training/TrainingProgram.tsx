import type { ReactNode } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

type ProgramLink = {
  prefix: string;
  href: string;
  label: string;
};

type Props = {
  /** Contenu modules (prioritaire) ou children legacy. */
  modules?: readonly CatalogueProgramModule[];
  children?: ReactNode;
  description?: ReactNode;
  title?: string;
  pdfHref?: string;
  pdfDownloadName?: string;
  programLinks?: readonly ProgramLink[];
};

/** Wrapper programme — accordéon modules ou contenu custom. */
export function TrainingProgram({
  modules,
  children,
  description,
  title = 'Programme de la formation',
  pdfHref,
  pdfDownloadName,
  programLinks,
}: Props) {
  return (
    <TrainingSection id="programme" title={title} description={description} tone="white">
      {modules && modules.length > 0 ? (
        <TrainingProgramAccordion modules={modules} />
      ) : (
        children
      )}

      {programLinks && programLinks.length > 0 ? (
        <div className="mt-6 max-w-2xl space-y-2 text-base text-slate-700">
          {programLinks.map((link) => (
            <p key={link.href}>
              {link.prefix}{' '}
              <Link href={link.href} className={OFC_LINK}>
                {link.label}
              </Link>
              .
            </p>
          ))}
        </div>
      ) : null}

      {pdfHref ? (
        <p className="mt-8">
          <a
            href={pdfHref}
            download={pdfDownloadName ?? true}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            Télécharger le programme PDF
          </a>
        </p>
      ) : null}
    </TrainingSection>
  );
}
