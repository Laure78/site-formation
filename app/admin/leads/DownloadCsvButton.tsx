'use client';

type Lead = {
  id: string;
  nom: string;
  email: string;
  entreprise: string | null;
  secteur: string | null;
  date_inscription: string;
};

export function DownloadCsvButton({ leads }: { leads: Lead[] }) {
  const handleExport = () => {
    const headers = ['Nom', 'Email', 'Entreprise', 'Secteur', 'Date inscription'];
    const rows = leads.map((l) => [
      l.nom,
      l.email,
      l.entreprise ?? '',
      l.secteur ?? '',
      new Date(l.date_inscription).toLocaleDateString('fr-FR'),
    ]);
    const csv = [headers.join(';'), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';'))].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-checklist-ia-btp-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-6 py-3 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
    >
      Exporter CSV
    </button>
  );
}
