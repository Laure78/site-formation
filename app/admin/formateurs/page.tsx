import Link from 'next/link';
import { requireAdminAccess } from '@/lib/admin-access';
import { InviteTrainerForm } from '@/components/admin/formateurs/InviteTrainerForm';
import { fetchAllTrainersForAdmin, fetchCurrentCharter } from '@/lib/extranet-formateurs/queries';
import { createAdminClient } from '@/lib/supabase/admin';
import { summarizeTrainerForAdmin } from '@/lib/extranet-formateurs/admin-summary';
import { NDA_STATUS_LABELS } from '@/lib/extranet-formateurs/document-types';
import { FormateursAdminSubnav } from '@/components/admin/formateurs/FormateursAdminSubnav';
import { LINKS } from '@/lib/internal-links';

export const metadata = {
  title: 'Formateurs extranet | Admin',
};

export default async function AdminFormateursPage() {
  const access = await requireAdminAccess();
  if (!access.ok) return null;

  const trainers = await fetchAllTrainersForAdmin();
  const charter = await fetchCurrentCharter();
  const admin = createAdminClient();

  const rows = await Promise.all(
    trainers.map(async (t) => {
      const { data: docs } = await admin
        .from('extranet_trainer_documents')
        .select('*')
        .eq('trainer_id', t.id);
      const { count: missionCount } = await admin
        .from('extranet_missions')
        .select('id', { count: 'exact', head: true })
        .eq('trainer_id', t.id)
        .neq('status', 'cancelled');
      let charterOk = false;
      if (charter) {
        const { data: acc } = await admin
          .from('extranet_charter_acceptances')
          .select('id')
          .eq('trainer_id', t.id)
          .eq('charter_version_id', charter.id)
          .maybeSingle();
        charterOk = Boolean(acc);
      }
      return { ...summarizeTrainerForAdmin(t, docs ?? [], charterOk), missionCount: missionCount ?? 0 };
    })
  );

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <FormateursAdminSubnav activePath={LINKS.adminFormateurs} />
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Extranet formateurs</h1>
        <p className="mt-2 text-sm text-slate-600">
          Dossiers administratifs, charte et préparation aux audits Qualiopi (ind. 21, 27).
        </p>
      </header>

      <InviteTrainerForm />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Spécialité</th>
              <th className="px-4 py-3">NDA</th>
              <th className="px-4 py-3">CV</th>
              <th className="px-4 py-3">Charte</th>
              <th className="px-4 py-3">Compétences</th>
              <th className="px-4 py-3">Dossier</th>
              <th className="px-4 py-3">Missions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                  Aucun formateur invité pour le moment.
                </td>
              </tr>
            ) : (
              rows.map(({ trainer, completenessPercent, cvOk, charteOk, missionCount }) => (
                <tr key={trainer.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium">
                    <Link href={`${LINKS.adminFormateurs}/${trainer.id}`} className="text-[#377CF3] hover:underline">
                      {[trainer.first_name, trainer.last_name].filter(Boolean).join(' ') || trainer.email}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{trainer.specialty ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{NDA_STATUS_LABELS[trainer.nda_status]}</td>
                  <td className="px-4 py-3">{cvOk ? '✓' : '—'}</td>
                  <td className="px-4 py-3">{charteOk ? '✓' : '—'}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {trainer.btp_experience_summary ? 'Profil saisi' : '—'}
                  </td>
                  <td className="px-4 py-3">{completenessPercent} %</td>
                  <td className="px-4 py-3 text-slate-700">{missionCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
