'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updatePipelineEtapeAction } from '@/app/actions/prospects';

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

type Etape = { id: string; label: string; color: string };
type Prospect = { id: string; prenom: string; nom: string; entreprise?: string | null; secteur?: string | null; score: number; pipeline_etape?: string | null; date_creation: string };

interface Props {
  etapes: readonly Etape[];
  byEtape: Record<string, Prospect[] | undefined>;
  rdvByProspect: Record<string, string>;
}

export function PipelineKanban({ etapes, byEtape, rdvByProspect }: Props) {
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('ring-2', 'ring-[var(--accent)]');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('ring-2', 'ring-[var(--accent)]');
  };

  const handleDrop = async (e: React.DragEvent, etapeId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-[var(--accent)]');
    const prospectId = e.dataTransfer.getData('prospect-id');
    if (!prospectId) return;
    await updatePipelineEtapeAction(prospectId, etapeId);
    router.refresh();
  };

  const handleDragStart = (e: React.DragEvent, prospectId: string) => {
    e.dataTransfer.setData('prospect-id', prospectId);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
      {etapes.map((etape) => (
        <div
          key={etape.id}
          className="min-w-[260px] max-w-[260px] rounded-2xl border border-slate-200 bg-white"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, etape.id)}
        >
          <div className={`border-b border-slate-200 px-4 py-3 ${etape.color} rounded-t-2xl`}>
            <h3 className="font-semibold text-slate-900">{etape.label}</h3>
            <p className="text-sm text-slate-600">{(byEtape[etape.id] ?? []).length} prospect(s)</p>
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-2">
            {((byEtape[etape.id] ?? []).length === 0) ? (
              <p className="py-8 text-center text-sm text-slate-400">Aucun prospect</p>
            ) : (
              (byEtape[etape.id] ?? []).map((p) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, p.id)}
                  className="group cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
                >
                  <Link href={`/admin/prospects/${p.id}`} className="block" onClick={(e) => e.stopPropagation()}>
                    <p className="font-medium text-slate-900">{p.prenom} {p.nom}</p>
                    {p.entreprise && <p className="text-sm text-slate-600">{p.entreprise}</p>}
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      (p.score ?? 0) >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      (p.score ?? 0) >= 50 ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      Score {p.score ?? 0}
                    </span>
                    {rdvByProspect[p.id] && (
                      <span className="text-xs text-slate-500">
                        RDV {new Date(rdvByProspect[p.id]).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
