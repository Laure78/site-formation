import { FileDown } from 'lucide-react';
import {
  CHARTE_IA_BTP_DOC_FILENAME,
  CHARTE_IA_BTP_DOC_HREF,
  CHARTE_IA_BTP_DOWNLOAD_LABEL,
} from '@/lib/charte-ia-btp-ressource';

const btnClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

type Props = {
  className?: string;
  /** Texte sous le bouton (intro article). */
  hint?: string;
};

/** Bouton de téléchargement direct — modèle Word charte IA BTP. */
export function CharteIaBtpDownloadButton({ className = '', hint }: Props) {
  return (
    <div className={`my-8 ${className}`.trim()}>
      <a href={CHARTE_IA_BTP_DOC_HREF} className={btnClass} download={CHARTE_IA_BTP_DOC_FILENAME}>
        <FileDown className="h-5 w-5 shrink-0" aria-hidden />
        {CHARTE_IA_BTP_DOWNLOAD_LABEL}
      </a>
      {hint ? (
        <p className="mt-3 text-sm text-slate-600">{hint}</p>
      ) : (
        <p className="mt-3 text-sm text-slate-600">
          Modèle modifiable à adapter aux pratiques de votre entreprise.
        </p>
      )}
    </div>
  );
}
