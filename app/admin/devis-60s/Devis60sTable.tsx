'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { deleteDevis60sLeadAction } from '@/app/actions/devis60s';

type Lead = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  entreprise: string | null;
  metier: string | null;
  nb_salaries: string | null;
  problematique: string | null;
  date_creation: string;
};

interface Props {
  leads: Lead[];
  metierLabels: Record<string, string>;
  nbSalariesLabels: Record<string, string>;
  problematiqueLabels: Record<string, string>;
}

export function Devis60sTable({
  leads,
  metierLabels,
  nbSalariesLabels,
  problematiqueLabels,
}: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const ok = await deleteDevis60sLeadAction(id);
    setDeleting(null);
    if (ok) router.refresh();
  };

  const label = (val: string | null, labels: Record<string, string>) =>
    val && labels[val] ? labels[val] : val ?? '—';

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">
          Aucune demande pour l&apos;instant. Les leads apparaissent ici lorsqu&apos;un visiteur
          remplit le formulaire « Demande de devis en 60 secondes ».
        </p>
        <Link href="/#devis-60s" className="mt-4 inline-block text-[var(--accent)] hover:underline">
          Voir le module sur la homepage →
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
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Tél</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Entreprise</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Métier</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Salariés</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Problématique</th>
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
                <td className="px-4 py-3 font-medium text-slate-900">
                  {l.prenom} {l.nom}
                </td>
                <td className="px-4 py-3 text-slate-600">{l.email}</td>
                <td className="px-4 py-3 text-slate-600">{l.telephone ?? '—'}</td>
                <td className="px-4 py-3 text-slate-600">{l.entreprise ?? '—'}</td>
                <td className="px-4 py-3 text-slate-600">{label(l.metier, metierLabels)}</td>
                <td className="px-4 py-3 text-slate-600">{label(l.nb_salaries, nbSalariesLabels)}</td>
                <td className="px-4 py-3 text-slate-600">
                  {label(l.problematique, problematiqueLabels)}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(l.date_creation).toLocaleDateString('fr-FR', {
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
