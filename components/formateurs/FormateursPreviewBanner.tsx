import {
  FORMATEURS_DEMO_PREVIEW_BANNER,
  isFormateursDemoPreviewEnabled,
} from '@/lib/formateurs';

/** Bandeau global maquette — rendu uniquement en prévisualisation privée locale. */
export function FormateursPreviewBanner() {
  if (!isFormateursDemoPreviewEnabled()) return null;

  return (
    <div
      role="status"
      className="border-b border-amber-300/80 bg-amber-50 px-4 py-2.5 text-center text-sm font-medium text-amber-950"
    >
      {FORMATEURS_DEMO_PREVIEW_BANNER}
    </div>
  );
}
