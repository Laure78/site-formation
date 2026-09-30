'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  manualSendGoogleAction,
  manualSendQuestionnaireAction,
  manualSendQuestionnaireReminderAction,
  markGoogleTermineAction,
  markQuestionnaireCompleteAction,
  toggleQuestionnaireDisabledAction,
  toggleGoogleDisabledAction,
  retryFailedEmailAction,
} from '@/app/admin/satisfaction/actions';
import type { SatisfactionEmailKind } from '@/lib/training-ops/satisfaction/types';
import { QUESTIONNAIRE_SATISFACTION_URL } from '@/lib/questionnaire-satisfaction';

export function ParticipantSatisfactionActions({
  participantSatisfactionId,
  accessToken,
  questionnaireStatus,
  googleStatus,
  questionnaireDisabled,
  googleDisabled,
}: {
  participantSatisfactionId: string;
  accessToken: string;
  questionnaireStatus?: string;
  googleStatus?: string;
  questionnaireDisabled?: boolean;
  googleDisabled?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const questionnaireUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/satisfaction/formation/${accessToken}`
      : `/satisfaction/formation/${accessToken}`;

  const run = (fn: () => Promise<unknown>) => {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  };

  const qComplete = questionnaireStatus === 'complete';
  const qBlocked = questionnaireDisabled || qComplete;
  const gBlocked =
    googleDisabled || googleStatus === 'termine' || googleStatus === 'non_eligible' || !qComplete;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending || qBlocked}
        className="rounded-lg bg-[#377CF3] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
        onClick={() => run(() => manualSendQuestionnaireAction(participantSatisfactionId))}
      >
        Envoyer questionnaire
      </button>
      <button
        type="button"
        disabled={pending || qBlocked}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:opacity-50"
        onClick={() => run(() => manualSendQuestionnaireReminderAction(participantSatisfactionId, 1))}
      >
        Relancer questionnaire
      </button>
      <button
        type="button"
        disabled={pending || qComplete}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:opacity-50"
        onClick={() => run(() => markQuestionnaireCompleteAction(participantSatisfactionId))}
      >
        Marquer complété
      </button>
      <a
        href={QUESTIONNAIRE_SATISFACTION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium"
      >
        Voir questionnaire (Tally)
      </a>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium"
        onClick={() => {
          void navigator.clipboard.writeText(questionnaireUrl);
        }}
      >
        Copier lien participant
      </button>
      <button
        type="button"
        disabled={pending || gBlocked}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:opacity-50"
        onClick={() => run(() => manualSendGoogleAction(participantSatisfactionId))}
      >
        Envoyer avis Google
      </button>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium"
        onClick={() => run(() => markGoogleTermineAction(participantSatisfactionId))}
      >
        Marquer Google terminé
      </button>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-700"
        onClick={() => run(() => toggleQuestionnaireDisabledAction(participantSatisfactionId, true))}
      >
        Désactiver relances questionnaire
      </button>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium"
        onClick={() => run(() => toggleQuestionnaireDisabledAction(participantSatisfactionId, false))}
      >
        Réactiver questionnaire
      </button>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-700"
        onClick={() => run(() => toggleGoogleDisabledAction(participantSatisfactionId, true))}
      >
        Désactiver Google
      </button>
      <button
        type="button"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium"
        onClick={() =>
          run(() => retryFailedEmailAction(participantSatisfactionId, 'questionnaire_initial' as SatisfactionEmailKind))
        }
      >
        Réessayer envoi (questionnaire)
      </button>
    </div>
  );
}
