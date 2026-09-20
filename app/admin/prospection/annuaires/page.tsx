import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { listDirectories } from '@/lib/prospection/directories-queries';
import { ExtractDirectoryButton } from '@/components/admin/prospection/ExtractDirectoryButton';

export default async function AnnuairesPage() {
  const supabase = createAdminClient();
  const directories = await listDirectories(supabase);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Annuaires</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bases de sourcing — distinctes du CRM. Choisissez les entreprises à prospecter.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Prochainement"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-400"
        >
          + Ajouter un annuaire
        </button>
      </div>

      <div className="grid gap-4">
        {directories.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-slate-900">{d.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{d.organism}</p>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  {[d.category, d.sector, d.geo_zone].filter(Boolean).join(' · ')}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
                  <span>
                    <strong className="font-semibold text-slate-900">
                      {d.companies_count}
                    </strong>{' '}
                    entreprises
                  </span>
                  <span>
                    <strong className="font-semibold text-slate-900">
                      {d.contacts_count}
                    </strong>{' '}
                    avec contact
                  </span>
                  <span>
                    <strong className="font-semibold text-slate-900">
                      {d.prospects_count}
                    </strong>{' '}
                    dans le CRM
                  </span>
                  {d.page_count ? (
                    <span className="text-slate-500">{d.page_count} pages</span>
                  ) : null}
                </div>
                {d.extracted_at ? (
                  <p className="mt-1 text-xs text-slate-400">
                    Extractions : {new Date(d.extracted_at).toLocaleString('fr-FR')}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-amber-700">
                    Extraction non lancée — cliquez sur Extraire les entreprises
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={d.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Ouvrir
                </a>
                <Link
                  href={`${LINKS.adminProspectionAnnuaires}/${d.id}/entreprises`}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Entreprises
                </Link>
                <ExtractDirectoryButton directoryId={d.id} />
                <Link
                  href={`${LINKS.adminProspectionAnnuaires}/${d.id}/entreprises`}
                  className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
                >
                  Créer des prospects
                </Link>
              </div>
            </div>
          </article>
        ))}

        {directories.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-slate-500">
            Aucun annuaire. Appliquez la migration 062 pour charger l’annuaire FFB 2025.
          </p>
        ) : null}
      </div>
    </div>
  );
}
