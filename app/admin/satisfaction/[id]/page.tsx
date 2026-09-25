import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import { createAdminClient } from '@/lib/supabase/admin';
import { getEmailDeliveriesForParticipant, getTimeline } from '@/lib/training-ops/satisfaction/queries';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import {
  GoogleStatusBadge,
  QuestionnaireStatusBadge,
} from '@/components/admin/satisfaction/SatisfactionStatusBadge';
import { ParticipantSatisfactionActions } from '@/components/admin/satisfaction/ParticipantSatisfactionActions';

export default async function ParticipantSatisfactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select(
      `*,
      participant:training_session_participants(
        person:training_people(first_name, last_name, email),
        session:training_sessions(reference, id)
      )`,
    )
    .eq('id', id)
    .maybeSingle();
  if (!row) notFound();

  const person = (row.participant as { person: { first_name: string; last_name: string; email: string } })
    .person;
  const session = (row.participant as { session: { reference: string; id: string } }).session;
  const [timeline, deliveries] = await Promise.all([
    getTimeline(id).catch(() => []),
    getEmailDeliveriesForParticipant(id).catch(() => []),
  ]);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <OrgPageHeader
          title={`${person.first_name} ${person.last_name}`}
          description={`Session ${session.reference} · ${person.email}`}
          actions={
            <Link
              href={LINKS.adminSatisfaction}
              className="text-sm font-medium text-[#377CF3] hover:underline"
            >
              Retour au tableau
            </Link>
          }
        />

        <OrgCard>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-slate-500">Questionnaire</p>
              <QuestionnaireStatusBadge status={row.questionnaire_status} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Avis Google</p>
              <GoogleStatusBadge status={row.google_status} />
            </div>
          </div>
          <ParticipantSatisfactionActions participantSatisfactionId={id} accessToken={row.access_token} />
        </OrgCard>

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Emails envoyés</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Statut</th>
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2">Origine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deliveries.map((d) => (
                  <tr key={d.id}>
                    <td className="py-2 pr-3 font-mono text-xs">{d.email_kind}</td>
                    <td className="py-2 pr-3">
                      <span
                        className={
                          d.status === 'failed'
                            ? 'text-red-600'
                            : d.status === 'sent'
                              ? 'text-emerald-700'
                              : 'text-slate-600'
                        }
                      >
                        {d.status}
                      </span>
                      {d.last_error ? (
                        <p className="text-xs text-red-500">{d.last_error}</p>
                      ) : null}
                    </td>
                    <td className="py-2 pr-3 text-xs">
                      {(d.sent_at ?? d.created_at)
                        ? new Date(d.sent_at ?? d.created_at).toLocaleString('fr-FR')
                        : '—'}
                    </td>
                    <td className="py-2 text-xs">{d.triggered_by}</td>
                  </tr>
                ))}
                {deliveries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-slate-500">
                      Aucun email enregistré.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </OrgCard>

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Historique satisfaction</h2>
          <ol className="mt-4 space-y-3">
            {timeline.map((ev) => (
              <li key={ev.id} className="border-l-2 border-slate-200 pl-4 text-sm">
                <p className="font-medium text-slate-900">{ev.event_label}</p>
                <p className="text-xs text-slate-500">
                  {new Date(ev.created_at).toLocaleString('fr-FR')} · {ev.origin}
                </p>
              </li>
            ))}
            {timeline.length === 0 ? (
              <li className="text-sm text-slate-500">Aucun événement enregistré.</li>
            ) : null}
          </ol>
        </OrgCard>
      </div>
    </div>
  );
}
