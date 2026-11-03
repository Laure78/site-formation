import Link from 'next/link';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { fetchOpenQualityActions } from '@/lib/extranet-formateurs/queries-phase3';
import { fetchAllTrainersForAdmin } from '@/lib/extranet-formateurs/queries';
import { createQualityActionAction, updateQualityActionStatusAction } from '@/app/admin/formateurs/phase3-actions';
import { LINKS } from '@/lib/internal-links';

export const metadata = { title: 'Qualité formateurs | Admin' };

function QualityActionStatusButton({
  actionId,
  status,
}: {
  actionId: string;
  status: 'open' | 'in_progress' | 'closed';
}) {
  return (
    <form
      action={async () => {
        'use server';
        await updateQualityActionStatusAction(actionId, status);
      }}
    >
      <button type="submit" className="text-xs font-medium text-[#377CF3] hover:underline">
        {status === 'closed' ? 'Clôturer' : status === 'in_progress' ? 'En cours' : 'Rouvrir'}
      </button>
    </form>
  );
}

export default async function AdminFormateursQualitePage() {
  const [actions, trainers] = await Promise.all([fetchOpenQualityActions(), fetchAllTrainersForAdmin()]);

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateursQualite} />
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Qualité & audit</h1>
        <p className="mt-2 text-sm text-slate-600">
          Plans d&apos;action (ind. 31–32), exports dossier. Évaluations et fiches sous-traitance sur chaque
          fiche formateur.
        </p>
      </header>

      <form
        className="max-w-2xl space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        action={async (formData) => {
          'use server';
          await createQualityActionAction(formData);
        }}
      >
        <h2 className="font-display text-lg font-bold text-slate-900">Nouveau plan d&apos;action</h2>
        <label className="block text-sm">
          Indicateur Qualiopi
          <input name="qualiopi_indicator" placeholder="ex. 21, 27, 30" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Titre
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Formateur (optionnel)
          <select name="trainer_id" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            <option value="">—</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {[t.first_name, t.last_name].filter(Boolean).join(' ') || t.email}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Responsable
          <input name="responsible_name" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Échéance
          <input type="date" name="due_date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm">
          Description
          <textarea name="description" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <button type="submit" className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
          Créer
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Ind.</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Échéance</th>
              <th className="px-4 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {actions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  Aucun plan d&apos;action ouvert.
                </td>
              </tr>
            ) : (
              actions.map((a) => (
                <tr key={a.id} className="border-b border-slate-100">
                  <td className="px-4 py-3">{a.qualiopi_indicator}</td>
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3">
                    {a.due_date ? new Date(a.due_date).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {a.status}
                    {a.status !== 'closed' ? (
                      <span className="ml-2">
                        <QualityActionStatusButton actionId={a.id} status="closed" />
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">Exports audit (par formateur)</h2>
        <p className="mt-1">Depuis la fiche formateur : JSON ou ZIP (dossier + pièces administratives).</p>
        <Link href={LINKS.adminFormateurs} className="mt-2 inline-block font-medium text-[#377CF3] hover:underline">
          Liste des dossiers →
        </Link>
      </section>
    </div>
  );
}
