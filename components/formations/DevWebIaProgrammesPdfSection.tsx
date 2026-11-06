import { Download } from 'lucide-react';
import {
  DEV_WEB_IA_PARCOURS_14H,
  DEV_WEB_IA_PDF_14H_HREF,
  PROGRAMME_PDF_14H,
} from '@/lib/formation-developpement-web-ia-content';

/**
 * Téléchargement du programme officiel 14 h — fiche NIV-10 (offre catalogue inter).
 */
export function DevWebIaProgrammesPdfSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-8"
      aria-label="Téléchargement du programme officiel PDF"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-slate-900">Programme officiel (PDF)</p>
        <p className="mt-1 text-sm text-slate-600">{DEV_WEB_IA_PARCOURS_14H.intitule}</p>
        <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <li>
            <a
              href={DEV_WEB_IA_PDF_14H_HREF}
              download={PROGRAMME_PDF_14H}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF]"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Parcours 14 h — 2 journées (PDF)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
