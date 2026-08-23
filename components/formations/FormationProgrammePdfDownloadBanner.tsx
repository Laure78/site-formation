import { Download } from 'lucide-react';

type Props = {
  pdfHref: string;
  catalogueRef: string;
  formationTitle: string;
};

function programmeDownloadDescription(catalogueRef: string, formationTitle: string): string {
  switch (catalogueRef) {
    case 'NIV-01':
      return 'Téléchargez le programme officiel (PDF) de la formation niveau 1 — bâtiment & travaux publics.';
    case 'NIV-02':
      return "Téléchargez le programme officiel (PDF) de la formation appels d'offres BTP — DCE, mémoire technique, Cowork & Skills.";
    case 'NIV-03':
      return 'Téléchargez le programme officiel (PDF) de la formation conduite de travaux — suivi chantier et skills Claude BTP.';
    case 'NIV-04':
      return 'Téléchargez le programme officiel (PDF) de la formation Maîtriser Claude AI pour le BTP — Projets, Skills, Cowork et Claude Code.';
    case 'NIV-05':
      return "Téléchargez le programme officiel (PDF) de la formation L'IA au service des maîtres d'œuvre — MOEX, DCE, CR chantier et réserves.";
    default:
      return `Téléchargez le programme officiel (PDF) — ${formationTitle}.`;
  }
}

const PDF_DOWNLOAD_NAMES: Partial<Record<string, string>> = {
  'NIV-02': 'programme_OFC_Niveau2_IA_AO_ClaudePro.pdf',
  'NIV-03': 'Programme_IA_Conduite_Travaux_OFC.pdf',
  'NIV-04': 'programme_OFC_Maitriser_Claude_BTP.pdf',
  'NIV-05': 'programme_OFC_IA_MOE_4h.pdf',
};

/**
 * Bandeau CTA téléchargement du programme PDF — sous le hero des fiches catalogue.
 */
export function FormationProgrammePdfDownloadBanner({
  pdfHref,
  catalogueRef,
  formationTitle,
}: Props) {
  const downloadName = PDF_DOWNLOAD_NAMES[catalogueRef];
  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-8"
      aria-label="Téléchargement du programme officiel PDF"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-start gap-3">
          <Download className="h-8 w-8 shrink-0 text-[var(--accent)]" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900">Programme officiel (PDF)</p>
            <p className="mt-1 text-sm text-slate-600">
              {programmeDownloadDescription(catalogueRef, formationTitle)}
            </p>
          </div>
        </div>
        <a
          href={pdfHref}
          {...(downloadName ? { download: downloadName } : { download: true })}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white hover:bg-blue-700"
        >
          Télécharger le PDF
        </a>
      </div>
    </section>
  );
}
