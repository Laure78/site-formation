import { Download, ExternalLink } from 'lucide-react';
import {
  CHARTE_IA_BTP_CONSULT_PDF_LABEL,
  CHARTE_IA_BTP_DOWNLOAD_LABEL,
  CHARTE_IA_BTP_PDF_DOWNLOAD_AS,
  CHARTE_IA_BTP_PDF_HREF,
} from '@/lib/charte-ia-btp-ressource';

const primaryBtn =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

const secondaryBtn =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:border-[#377CF3]/40 hover:bg-[#F8FAFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

type Props = {
  className?: string;
  hint?: string;
};

export function CharteIaBtpDownloadBlock({
  className = '',
  hint = 'Modèle à personnaliser selon vos outils, vos usages et votre organisation.',
}: Props) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`.trim()}>
      <a
        href={CHARTE_IA_BTP_PDF_HREF}
        download={CHARTE_IA_BTP_PDF_DOWNLOAD_AS}
        className={primaryBtn}
        aria-label={`${CHARTE_IA_BTP_DOWNLOAD_LABEL} (${CHARTE_IA_BTP_PDF_DOWNLOAD_AS})`}
      >
        <Download className="h-5 w-5 shrink-0" aria-hidden />
        {CHARTE_IA_BTP_DOWNLOAD_LABEL}
      </a>
      <a
        href={CHARTE_IA_BTP_PDF_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={secondaryBtn}
        aria-label={`${CHARTE_IA_BTP_CONSULT_PDF_LABEL} dans un nouvel onglet`}
      >
        <ExternalLink className="h-5 w-5 shrink-0" aria-hidden />
        {CHARTE_IA_BTP_CONSULT_PDF_LABEL}
      </a>
      {hint ? <p className="w-full text-sm text-slate-600">{hint}</p> : null}
    </div>
  );
}
