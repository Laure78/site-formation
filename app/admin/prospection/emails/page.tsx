import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import { listRecentEmails } from '@/lib/prospection/queries';

export default async function EmailsPage() {
  const supabase = createAdminClient();
  const emails = await listRecentEmails(supabase);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-slate-900">Emails envoyés</h2>
      <p className="text-sm text-slate-500">
        Historique enregistré dans la plateforme (prêt pour une future connexion Gmail).
      </p>
      <ul className="space-y-3">
        {emails.map((e) => {
          const p = e.prospects as
            | { prenom?: string; nom?: string; entreprise?: string | null }
            | null
            | undefined;
          return (
            <li
              key={e.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{e.subject}</p>
                  <p className="text-sm text-slate-600">
                    {p ? `${p.prenom ?? ''} ${p.nom ?? ''}` : 'Prospect'}
                    {p?.entreprise ? ` — ${p.entreprise}` : ''}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>{e.email_type}</p>
                  <p>
                    {e.sent_at
                      ? new Date(e.sent_at).toLocaleString('fr-FR')
                      : new Date(e.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
              <Link
                href={`${LINKS.adminProspectionProspects}/${e.prospect_id}`}
                className="mt-2 inline-block text-sm font-medium text-[#377CF3] hover:underline"
              >
                Voir la fiche →
              </Link>
            </li>
          );
        })}
        {emails.length === 0 ? (
          <li className="text-sm text-slate-500">Aucun email enregistré pour l’instant.</li>
        ) : null}
      </ul>
    </div>
  );
}
