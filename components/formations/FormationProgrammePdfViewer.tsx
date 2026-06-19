import { catalogueNiveauLabel } from '@/lib/formations-catalogue-display';

type Props = {
  pdfHref: string;
  catalogueRef: string;
  formationTitle: string;
};

/**
 * Visionneuse du programme officiel PDF — affichée sous le hero des fiches catalogue.
 */
export function FormationProgrammePdfViewer({
  pdfHref,
  catalogueRef,
  formationTitle,
}: Props) {
  const iframeTitle = `Programme officiel — ${formationTitle}`;

  return (
    <section
      id="programme-pdf"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-10"
      aria-label="Visionneuse du programme de formation"
    >
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {catalogueNiveauLabel(catalogueRef)}
            </p>
            <h2 className="mt-1 font-display text-lg font-bold text-slate-900">
              Consulter le programme (PDF)
            </h2>
          </div>
          <iframe
            src={`${pdfHref}#view=FitH`}
            title={iframeTitle}
            className="h-[min(70vh,720px)] w-full min-h-[360px] border-0 bg-white"
          />
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-medium text-[var(--accent)] hover:bg-slate-100"
          >
            Ouvrir le PDF dans un nouvel onglet
          </a>
        </div>
      </div>
    </section>
  );
}
