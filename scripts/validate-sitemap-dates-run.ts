/**
 * Exécuté par validate-sitemap-dates.mjs — évite `tsx -e` (fragile avec Node 24 / npx).
 */
import sitemap from '../app/sitemap';

async function main() {
  const entries = await sitemap();
  const byDay = new Map<string, number>();
  for (const e of entries) {
    const d =
      e.lastModified instanceof Date
        ? e.lastModified.toISOString().slice(0, 10)
        : String(e.lastModified).slice(0, 10);
    byDay.set(d, (byDay.get(d) ?? 0) + 1);
  }
  const total = entries.length;
  const sorted = [...byDay.entries()].sort((a, b) => b[1] - a[1]);
  const [topDay, topCount] = sorted[0] ?? ['', 0];
  const ratio = total ? topCount / total : 0;
  console.log(
    JSON.stringify({
      total,
      topDay,
      topCount,
      ratio,
      distribution: Object.fromEntries(sorted.slice(0, 5)),
    }),
  );
  if (ratio > 0.2) process.exit(1);
}

void main();
