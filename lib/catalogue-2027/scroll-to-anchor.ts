/** Défilement vers une ancre — tient compte du header via scroll-margin sur la cible. */
export function scrollToAnchor(anchorId: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(anchorId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
