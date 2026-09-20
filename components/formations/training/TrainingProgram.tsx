import type { ReactNode } from 'react';
import { Download } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  children: ReactNode;
  description?: ReactNode;
  title?: string;
  pdfHref?: string;
  pdfDownloadName?: string;
};

/** Wrapper programme — conserve le contenu modules existant. */
export function TrainingProgram({
  children,
  description,
  title = 'Programme de la formation',
  pdfHref,
  pdfDownloadName,
}: Props) {
  return (
    <TrainingSection id="programme" title={title} description={description} tone="muted">
      {children}
      {pdfHref ? (
        <p className="mt-10">
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
