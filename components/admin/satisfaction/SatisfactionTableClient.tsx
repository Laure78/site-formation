'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Copy, MoreHorizontal } from 'lucide-react';
import type { SatisfactionTableRow } from '@/lib/training-ops/satisfaction/queries';
import { LINKS } from '@/lib/internal-links';
import {
  GoogleStatusBadge,
  QuestionnaireStatusBadge,
} from '@/components/admin/satisfaction/SatisfactionStatusBadge';
import {
  manualSendQuestionnaireAction,
  manualSendQuestionnaireReminderAction,
} from '@/app/admin/satisfaction/actions';

export function SatisfactionTableClient({ rows }: { rows: SatisfactionTableRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const run = (fn: () => Promise<unknown>) => {
    startTransition(async () => {
      setMessage(null);
      try {
        await fn();
        router.refresh();
        setMessage('Action enregistrée.');
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Erreur');
      }
    });
  };

  const sendQuestionnaire = (rowId: string) => {
    startTransition(async () => {
      setMessage(null);
      try {
        let res = await manualSendQuestionnaireAction(rowId, false);
        if (res && 'needsConfirm' in res && res.needsConfirm) {
          if (
            !window.confirm('Un email a été envoyé il y a moins de 24 h. Confirmer un nouvel envoi ?')
          ) {
            return;
          }
          res = await manualSendQuestionnaireAction(rowId, true);
        }
        router.refresh();
        setMessage('Action enregistrée.');
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Erreur');
      }
    });
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/satisfaction/formation/${token}`;
    void navigator.clipboard.writeText(url);
    setMessage('Lien questionnaire copié.');
  };

  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Aucun participant éligible. Passez une session au statut « Terminée » pour créer les fiches.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {message ? (
        <p className="rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-900" role="status">
          {message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Participant</th>
              <th className="px-4 py-3">Formation / session</th>
              <th className="px-4 py-3">Questionnaire</th>
              <th className="px-4 py-3">Google</th>
              <th className="px-4 py-3">Prochaine action</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="text-slate-700">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{row.participantName}</p>
                  <p className="text-xs text-slate-500">{row.email}</p>
                  <p className="text-xs text-slate-400">{row.trainerName}</p>
                </td>
                <td className="px-4 py-3">
                  <p>{row.formationTitle}</p>
                  <Link
                    href={`${LINKS.adminSessions}/${row.sessionId}`}
                    className="text-xs text-[#377CF3] hover:underline"
                  >
                    {row.sessionReference}
                  </Link>
                  {row.sessionDate ? (
                    <p className="text-xs text-slate-500">{row.sessionDate}</p>
                  ) : null}
                  {row.questionnaireSentAt ? (
                    <p className="text-xs text-slate-400">
                      Envoyé {new Date(row.questionnaireSentAt).toLocaleDateString('fr-FR')}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <QuestionnaireStatusBadge status={row.questionnaireStatus} />
                  {row.questionnaireReminderCount > 0 ? (
                    <p className="mt-1 text-xs">{row.questionnaireReminderCount} relance(s)</p>
                  ) : null}
                  {row.questionnaireScore != null ? (
                    <p className="mt-1 text-xs">Note {row.questionnaireScore}/5</p>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <GoogleStatusBadge status={row.googleStatus} />
                  {row.googleSentAt ? (
                    <p className="mt-1 text-xs">
                      {new Date(row.googleSentAt).toLocaleDateString('fr-FR')}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-xs">{row.nextActionLabel}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      disabled={pending}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-50"
                      onClick={() => sendQuestionnaire(row.id)}
                    >
                      Envoyer
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-50"
                      onClick={() =>
                        run(() => manualSendQuestionnaireReminderAction(row.id, 1))
                      }
                    >
                      Relancer
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-50"
                      title="Copier le lien"
                      onClick={() => copyLink(row.accessToken)}
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <Link
                      href={`${LINKS.adminSatisfaction}/${row.id}`}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-50"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
