import { Briefcase } from 'lucide-react';
import { CareerCvDownloadButton } from '@/components/admin/candidatures/CareerCvDownloadButton';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import {
  formatCareerKindLabel,
  formatCareerSubtype,
  listCareerApplications,
} from '@/lib/career-applications-admin';
import { LINKS } from '@/lib/internal-links';

export default async function AdminCandidaturesPage() {
  const rows = await listCareerApplications();

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-7xl space-y-8">
        <OrgPageHeader
          eyebrow="Administration"
          title="Candidatures carrière"
          description="Candidatures spontanées et propositions consultant-formateur reçues via le site. Accès réservé aux administrateurs — CV non publics."
          icon={<Briefcase className="h-7 w-7 text-[#377CF3]" strokeWidth={1.5} aria-hidden />}
          actions={
            <div className="flex flex-wrap gap-2 text-sm">
              <a
                href={LINKS.emplois}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
              >
                Page Emplois
              </a>
              <a
                href={LINKS.devenezConsultant}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
              >
                Devenez consultant
              </a>
            </div>
          }
        />

        <OrgCard className="overflow-x-auto p-0">
          {rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-600">Aucune candidature enregistrée pour le moment.</p>
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Reçue le</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Candidat</th>
                  <th className="px-4 py-3">Détail</th>
                  <th className="px-4 py-3">CV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="align-top text-slate-700">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {new Intl.DateTimeFormat('fr-FR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        timeZone: 'Europe/Paris',
                      }).format(new Date(row.created_at))}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{formatCareerKindLabel(row.kind)}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{formatCareerSubtype(row)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">
                        {row.first_name} {row.last_name}
                      </p>
                      <a
                        href={`mailto:${row.email}`}
                        className="text-[#377CF3] hover:underline"
                      >
                        {row.email}
                      </a>
                      {row.phone ? <p className="text-xs text-slate-500">{row.phone}</p> : null}
                    </td>
                    <td className="max-w-md px-4 py-3">
                      {row.desired_role ? (
                        <p className="text-xs font-medium text-slate-800">{row.desired_role}</p>
                      ) : null}
                      <p className="mt-1 line-clamp-4 whitespace-pre-wrap text-xs text-slate-600">
                        {row.presentation}
                      </p>
                      {row.linkedin_or_portfolio ? (
                        <a
                          href={row.linkedin_or_portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-xs text-[#377CF3] hover:underline"
                        >
                          Profil / portfolio
                        </a>
                      ) : null}
                      <p className="mt-1 text-[11px] text-slate-400">{row.source_page}</p>
                    </td>
                    <td className="px-4 py-3">
                      {row.cv_storage_path ? (
                        <CareerCvDownloadButton
                          storagePath={row.cv_storage_path}
                          fileName={row.cv_original_name}
                        />
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </OrgCard>
      </div>
    </div>
  );
}
