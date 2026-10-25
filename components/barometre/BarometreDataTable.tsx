import type { BarometreRow } from '@/lib/barometre-2026-types';
import { barometreRowPercent } from '@/lib/barometre-2026';

type Props = {
  caption: string;
  rows: readonly BarometreRow[];
  n: number;
};

export function BarometreDataTable({ caption, rows, n }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#F2F2F2] text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Réponse
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Effectif
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Part (n={n})
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-slate-200">
              <td className="px-4 py-3 text-slate-800">{row.label}</td>
              <td className="px-4 py-3 text-right tabular-nums text-slate-700">{row.count}</td>
              <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                {barometreRowPercent(row)}&nbsp;%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
