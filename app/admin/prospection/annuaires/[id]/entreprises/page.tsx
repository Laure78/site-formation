import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import {
  getDirectory,
  listDirectoryCompanies,
  directoryStats,
} from '@/lib/prospection/directories-queries';
import { DirectoryCompaniesTable } from '@/components/admin/prospection/DirectoryCompaniesTable';
import { ExtractDirectoryButton } from '@/components/admin/prospection/ExtractDirectoryButton';

export default async function AnnuaireEntreprisesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const directory = await getDirectory(supabase, id);
  if (!directory) notFound();

  const companies = await listDirectoryCompanies(supabase, id);
  const stats = directoryStats(companies);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={LINKS.adminProspectionAnnuaires}
          className="text-sm font-medium text-[#377CF3] hover:underline"
        >
          ← Annuaires
        </Link>
        <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
          Entreprises — {directory.name}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {stats.total} entreprises · {stats.withEmail} avec email · {stats.inCrm} dans le CRM
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">
            Aucune entreprise extraite. Lancez l’extraction depuis le PDF (pages liste).
          </p>
          <div className="mt-4 flex justify-center">
            <ExtractDirectoryButton directoryId={id} />
          </div>
        </div>
      ) : (
        <DirectoryCompaniesTable
          directoryId={id}
          companies={companies}
          directoryName={directory.name}
        />
      )}
    </div>
  );
}
