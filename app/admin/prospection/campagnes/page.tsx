export default function CampagnesPage() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Campagnes</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600">
        Structure prête en base (<code className="text-xs">prospecting_campaigns</code>). L’interface
        de constitution de listes (ex. « Entreprises BTP Yvelines ») arrive en V2, après la V1
        prospects / emails / relances.
      </p>
    </div>
  );
}
