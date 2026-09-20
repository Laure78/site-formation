import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { getDirectory } from '@/lib/prospection/directories-queries';
import { ExtractDirectoryButton } from '@/components/admin/prospection/ExtractDirectoryButton';

export default async function AnnuaireDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const directory = await getDirectory(supabase, id);
  if (!directory) notFound();

  return (
    <div className="space-y-6">
      <Link
        href={LINKS.adminProspectionAnnuaires}
        className="text-sm font-medium text-[#377CF3] hover:underline"
      >
        ← Annuaires
      </Link>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-900">{directory.name}</h2>
        <p className="mt-2 text-sm text-slate-600">{directory.organism}</p>
        <p className="mt-3 text-sm text-slate-500">{directory.description}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Année</dt>
            <dd className="font-medium">{directory.year ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Catégorie</dt>
            <dd className="font-medium">{directory.category ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Zone</dt>
            <dd className="font-medium">{directory.geo_zone ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Fichier</dt>
            <dd className="font-medium">{directory.file_name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Pages</dt>
            <dd className="font-medium">{directory.page_count ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Ajouté le</dt>
            <dd className="font-medium">
              {new Date(directory.created_at).toLocaleDateString('fr-FR')}
            </dd>
          </div>
        </dl>
        {directory.tags?.length ? (
          <p className="mt-4 flex flex-wrap gap-1.5">
            {directory.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
              >
                {t}
              </span>
            ))}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={directory.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
          >
            Ouvrir le PDF
          </a>
          <Link
            href={`${LINKS.adminProspectionAnnuaires}/${id}/entreprises`}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
          >
            Entreprises
          </Link>
          <ExtractDirectoryButton directoryId={id} />
        </div>
      </div>
    </div>
  );
}
