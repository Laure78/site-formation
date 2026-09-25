import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { LINKS } from '@/lib/internal-links';
import {
  GoogleStatusBadge,
  QuestionnaireStatusBadge,
} from '@/components/admin/satisfaction/SatisfactionStatusBadge';

export async function SessionSatisfactionPanel({ sessionId }: { sessionId: string }) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('training_participant_satisfaction')
    .select(
      `*,
      participant:training_session_participants(
        person:training_people(first_name, last_name, email)
      )`,
    )
    .eq('session_id', sessionId);

  const rows = data ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-slate-900">Satisfaction</h2>
        <Link
          href={LINKS.adminSatisfaction}
          className="text-sm font-medium text-[#377CF3] hover:underline"
        >
          Ouvrir le cockpit
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          Passez la session au statut « Terminée » pour créer les fiches participants.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-4">Participant</th>
                <th className="py-2 pr-4">Questionnaire</th>
                <th className="py-2 pr-4">Google</th>
                <th className="py-2">Détail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const person = (
                  row.participant as {
                    person: { first_name: string; last_name: string; email: string };
                  }
                ).person;
                return (
                  <tr key={row.id}>
                    <td className="py-3 pr-4">
                      <p className="font-medium">
                        {person.first_name} {person.last_name}
                      </p>
                      <p className="text-xs text-slate-500">{person.email}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <QuestionnaireStatusBadge status={row.questionnaire_status} />
                    </td>
                    <td className="py-3 pr-4">
                      <GoogleStatusBadge status={row.google_status} />
                    </td>
                    <td className="py-3">
                      <Link
                        href={`${LINKS.adminSatisfaction}/${row.id}`}
                        className="text-[#377CF3] hover:underline"
                      >
                        Fiche
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
