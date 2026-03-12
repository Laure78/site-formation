'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { deleteLeadAction } from '@/app/actions/leads';

type Lead = {
  id: string;
  nom: string;
  email: string;
  entreprise: string | null;
  secteur: string | null;
  date_inscription: string;
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const ok = await deleteLeadAction(id);
    setDeleting(null);
    if (ok) router.refresh();
  };

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">
          Aucun lead pour l&apos;instant. Les leads apparaissent ici lorsqu&apos;un visiteur
          télécharge la checklist via /checklist-ia-btp.
        </p>
        <Link
          href="/checklist-ia-btp"
          className="mt-4 inline-block text-[var(--accent)] hover:underline"
        >
          Voir la page checklist →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Nom</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Entreprise</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Secteur</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Date</th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr
                key={l.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">{l.nom}</td>
                <td className="px-4 py-3 text-slate-600">{l.email}</td>
                <td className="px-4 py-3 text-slate-600">{l.entreprise ?? '—'}</td>
                <td className="px-4 py-3 text-slate-600">{l.secteur ?? '—'}</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(l.date_inscription).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(l.id)}
                    disabled={deleting === l.id}
                    className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
