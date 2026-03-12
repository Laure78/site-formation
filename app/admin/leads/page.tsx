import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import { LeadsTable } from './LeadsTable';
import { DownloadCsvButton } from './DownloadCsvButton';

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) redirect('/admin');

  const { data: leads } = await supabase
    .from('leads_checklist')
    .select('id, nom, email, entreprise, secteur, date_inscription')
    .order('date_inscription', { ascending: false });

  const count = (leads ?? []).length;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Leads Checklist IA BTP
          </h1>
          <p className="mt-1 text-slate-600">
            {count} téléchargement{count > 1 ? 's' : ''} de la checklist
          </p>
        </div>
        <DownloadCsvButton leads={leads ?? []} />
      </div>

      <LeadsTable leads={leads ?? []} />
    </div>
  );
}
