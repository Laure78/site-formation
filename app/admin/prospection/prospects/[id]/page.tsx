import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import {
  getProspect,
  listProspectActions,
  listProspectEmails,
  listTemplates,
} from '@/lib/prospection/queries';
import { typeStructureLabel } from '@/lib/prospection/constants';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';
import { ProspectQuickActions } from '@/components/admin/prospection/ProspectQuickActions';
import { ProspectForm } from '@/components/admin/prospection/ProspectForm';
import { DeleteProspectButton } from '@/components/admin/prospection/DeleteProspectButton';

export default async function ProspectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const prospect = await getProspect(supabase, id);
  if (!prospect) notFound();

  const [emails, actions, templates] = await Promise.all([
    listProspectEmails(supabase, id),
    listProspectActions(supabase, id),
    listTemplates(supabase),
  ]);

  type TimelineItem = {
    at: string;
    title: string;
    details?: string | null;
    kind: string;
  };

  const timeline: TimelineItem[] = [
    ...actions.map((a) => ({
      at: a.created_at,
      title: a.title,
      details: a.details,
      kind: a.action_type,
    })),
    ...emails.map((e) => ({
      at: e.sent_at ?? e.created_at,
      title: `Email — ${e.subject}`,
      details: e.body.slice(0, 280),
      kind: 'email',
    })),
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href={LINKS.adminProspectionProspects}
            className="text-sm font-medium text-[#377CF3] hover:underline"
          >
            ← Prospects
          </Link>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
            {prospect.prenom} {prospect.nom}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {[prospect.fonction, prospect.entreprise].filter(Boolean).join(' · ') || '—'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatutBadge statut={prospect.statut} />
          <DeleteProspectButton prospectId={id} />
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <Info label="Email" value={prospect.email} href={`mailto:${prospect.email}`} />
        <Info label="Téléphone" value={prospect.telephone} href={prospect.telephone ? `tel:${prospect.telephone}` : undefined} />
        <Info label="LinkedIn" value={prospect.linkedin_url} href={prospect.linkedin_url ?? undefined} />
        <Info label="Type" value={typeStructureLabel(prospect.type_structure)} />
        <Info label="Type de prospect" value={prospect.prospect_type} />
        <Info label="Département" value={prospect.departement} />
        <Info label="Nom département" value={prospect.department_name} />
        <Info label="Ville" value={prospect.ville} />
        <Info label="Région" value={prospect.region} />
        <Info label="Source" value={prospect.source_prospect} />
        <Info
          label="Dernier contact"
          value={
            prospect.dernier_contact_at
              ? new Date(prospect.dernier_contact_at).toLocaleString('fr-FR')
              : null
          }
        />
        <Info
          label="Prochaine relance"
          value={
            prospect.prochaine_relance_at
              ? `${new Date(prospect.prochaine_relance_at).toLocaleString('fr-FR')}${
                  prospect.relance_motif ? ` — ${prospect.relance_motif}` : ''
                }`
              : null
          }
        />
      </div>

      {prospect.source_metadata && Object.keys(prospect.source_metadata).length > 0 ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="font-display text-base font-semibold text-slate-900">
            Source de l’import
          </h3>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {prospect.source_metadata.event ? (
              <>
                <dt className="text-slate-500">Événement</dt>
                <dd className="font-medium text-slate-800">
                  {String(prospect.source_metadata.event)}
                </dd>
              </>
            ) : null}
            {prospect.source_metadata.organizer ? (
              <>
                <dt className="text-slate-500">Organisateur</dt>
                <dd className="font-medium text-slate-800">
                  {String(prospect.source_metadata.organizer)}
                </dd>
              </>
            ) : null}
            {prospect.source_metadata.location ? (
              <>
                <dt className="text-slate-500">Lieu</dt>
                <dd className="font-medium text-slate-800">
                  {String(prospect.source_metadata.location)}
                </dd>
              </>
            ) : null}
            {prospect.source_metadata.event_date ? (
              <>
                <dt className="text-slate-500">Date</dt>
                <dd className="font-medium text-slate-800">
                  {new Date(String(prospect.source_metadata.event_date)).toLocaleDateString(
                    'fr-FR'
                  )}
                </dd>
              </>
            ) : null}
          </dl>
          {prospect.tags && prospect.tags.length > 0 ? (
            <p className="mt-3 text-xs text-slate-500">
              Tags : {prospect.tags.join(' · ')}
            </p>
          ) : null}
        </section>
      ) : null}

      <ProspectQuickActions prospect={prospect} templates={templates} />

      <section>
        <h3 className="font-display text-lg font-semibold text-slate-900">Suivi</h3>
        <ol className="mt-4 space-y-4 border-l-2 border-slate-200 pl-4">
          {timeline.length === 0 ? (
            <li className="text-sm text-slate-500">Aucun historique pour l’instant.</li>
          ) : (
            timeline.map((item, i) => (
              <li key={`${item.at}-${i}`} className="relative">
                <span className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[#377CF3]" />
                <p className="text-xs font-medium text-slate-500">
                  {new Date(item.at).toLocaleString('fr-FR')}
                </p>
                <p className="font-medium text-slate-900">{item.title}</p>
                {item.details ? (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{item.details}</p>
                ) : null}
              </li>
            ))
          )}
        </ol>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold text-slate-900">
          Historique des emails
        </h3>
        <ul className="mt-4 space-y-3">
          {emails.map((e) => (
            <li
              key={e.id}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{e.subject}</p>
                <span className="text-xs text-slate-500">
                  {e.sent_at
                    ? new Date(e.sent_at).toLocaleString('fr-FR')
                    : new Date(e.created_at).toLocaleString('fr-FR')}
                  {' · '}
                  {e.email_type} · {e.status}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-slate-600">{e.body}</p>
            </li>
          ))}
          {emails.length === 0 ? (
            <li className="text-sm text-slate-500">Aucun email enregistré.</li>
          ) : null}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 font-display text-lg font-semibold text-slate-900">
          Modifier la fiche
        </h3>
        <ProspectForm initial={prospect} prospectId={id} />
      </section>
    </div>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      {href && value ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-medium text-[#377CF3] hover:underline">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium text-slate-800">{value || '—'}</p>
      )}
    </div>
  );
}
