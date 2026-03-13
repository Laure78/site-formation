/** Utilitaires pour le calendrier de prise de RDV */

export type BlockedRange = { start: string; end: string };

/** Regroupe les dates consécutives en plages pour l'affichage */
export function groupBlockedDatesIntoRanges(dates: string[]): BlockedRange[] {
  if (dates.length === 0) return [];
  const sorted = [...dates].sort();
  const ranges: BlockedRange[] = [];
  let rangeStart = sorted[0];
  let rangeEnd = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    prev.setDate(prev.getDate() + 1);
    if (prev.getTime() === curr.getTime()) {
      rangeEnd = sorted[i];
    } else {
      ranges.push({ start: rangeStart, end: rangeEnd });
      rangeStart = sorted[i];
      rangeEnd = sorted[i];
    }
  }
  ranges.push({ start: rangeStart, end: rangeEnd });
  return ranges.reverse();
}
