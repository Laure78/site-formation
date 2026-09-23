import { Download } from 'lucide-react';
import {
  DEV_WEB_IA_PARCOURS_14H,
  DEV_WEB_IA_PARCOURS_7H,
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PDF_7H_HREF,
} from '@/lib/formation-developpement-web-ia-content';

/**
 * Téléchargement des programmes officiels 7 h et 14 h — fiche NIV-10.
 */
export function DevWebIaProgrammesPdfSection() {
  const items = [
    {
      label: 'Parcours 7 h — 1 journée',
      href: DEV_WEB_IA_PDF_7H_HREF,
      download: 'programme-ofc-developpement-web-ia-7h.pdf',
    },
    {
      label: 'Parcours 14 h — 2 journées',
      href: DEV_WEB_IA_PDF_14H_HREF,
      download: 'programme-ofc-developpement-web-ia-14h.pdf',
    },
  ] as const;

  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-8"
      aria-label="Téléchargement des programmes officiels PDF"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-slate-900">Programmes officiels (PDF)</p>
        <p className="mt-1 text-sm text-slate-600">
          {DEV_WEB_IA_PARCOURS_7H.intitule} · {DEV_WEB_IA_PARCOURS_14H.intitule}
        </p>
        <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                download={item.download}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF]"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
