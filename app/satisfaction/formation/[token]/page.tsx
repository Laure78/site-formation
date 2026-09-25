import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { getQuestionnairePublicUrl, getSatisfactionSettings } from '@/lib/training-ops/satisfaction/settings';
import { QUESTIONNAIRE_SATISFACTION_LABEL } from '@/lib/questionnaire-satisfaction';
import { SatisfactionFormationCompleteForm } from '@/components/satisfaction/SatisfactionFormationCompleteForm';

export default async function SatisfactionFormationTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select(
      `questionnaire_status, questionnaire_completed_at,
      participant:training_session_participants(person:training_people(first_name))`,
    )
    .eq('access_token', token)
    .maybeSingle();

  if (!row) notFound();

  const settings = await getSatisfactionSettings();
  const tallyUrl = getQuestionnairePublicUrl(settings);
  const prenom =
    (row.participant as unknown as { person: { first_name: string } | null })?.person?.first_name ??
    '';

  const done = row.questionnaire_status === 'complete' || row.questionnaire_completed_at;

  return (
    <div className="min-h-[60vh] bg-[#F2F2F2] px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          {done ? 'Merci pour votre retour' : QUESTIONNAIRE_SATISFACTION_LABEL}
        </h1>
        {done ? (
          <p className="mt-4 text-slate-600">
            Votre questionnaire est enregistré. Merci {prenom ? `${prenom}` : ''} !
          </p>
        ) : (
          <>
            <p className="mt-4 text-slate-600">
              {prenom ? `${prenom}, ` : ''}
              merci de répondre au questionnaire de satisfaction (2–3 minutes).
            </p>
            <a
              href={tallyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#377CF3] px-6 py-3.5 font-semibold text-white hover:bg-blue-700"
            >
              Ouvrir le questionnaire
            </a>
            <SatisfactionFormationCompleteForm token={token} />
          </>
        )}
        <p className="mt-8 text-center text-xs text-slate-500">
          <Link href="/" className="text-[#377CF3] hover:underline">
            laureolivie.fr
          </Link>
        </p>
      </div>
    </div>
  );
}
