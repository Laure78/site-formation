'use client';

interface ChartItem {
  title: string;
  avg: number;
  count: number;
}

interface Props {
  data: ChartItem[];
}

export function DashboardCharts({ data }: Props) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-sm text-slate-500">Aucune donnée pour l&apos;instant</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {data.map((item) => (
        <div key={item.title}>
          <div className="flex justify-between text-sm">
            <span className="truncate font-medium text-slate-700" title={item.title}>
              {item.title}
            </span>
            <span className="text-slate-500">
              {item.avg}% · {item.count} inscrit{item.count > 1 ? 's' : ''}
            </span>
          </div>
          <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${Math.min(100, item.avg)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
