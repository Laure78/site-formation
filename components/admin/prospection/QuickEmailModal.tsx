'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { markEmailSentAction } from '@/app/admin/prospection/actions';
import { EMAIL_TYPES } from '@/lib/prospection/constants';
import type { ProspectRow } from '@/lib/prospection/types';

const QUICK_TYPES = [
  { value: 'premier_contact', label: 'Premier contact' },
  { value: 'relance_1', label: 'Relance' },
  { value: 'reprise_contact', label: 'Reprise de contact' },
  { value: 'apres_rencontre', label: 'Après rendez-vous' },
  { value: 'proposition_formation', label: 'Proposition de formation' },
  { value: 'autre', label: 'Partenariat' },
] as const;

export function QuickEmailModal({
  prospect,
  onClose,
  onSent,
}: {
  prospect: ProspectRow;
  onClose: () => void;
  onSent?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [emailType, setEmailType] = useState('premier_contact');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [askRelance, setAskRelance] = useState(false);

  const generate = async (type: string) => {
    setAiLoading(true);
    setError(null);
    setEmailType(type);
    try {
      const res = await fetch('/api/admin/prospection/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId: prospect.id, emailType: type }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Génération impossible');
        return;
      }
      setSubject(data.subject);
      setBody(data.body);
    } catch {
      setError('Génération impossible');
    } finally {
      setAiLoading(false);
    }
  };

  const markSent = (days: number | null) => {
    startTransition(async () => {
      const res = await markEmailSentAction({
        prospectId: prospect.id,
        subject,
        body,
        emailType,
        scheduleRelanceDays: days ?? undefined,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
      onSent?.();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-slate-900">Créer un email</h3>
            <p className="text-sm text-slate-500">
              {prospect.prenom} {prospect.nom}
              {prospect.entreprise ? ` — ${prospect.entreprise}` : ''}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-500" aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              disabled={aiLoading}
              onClick={() => generate(t.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                emailType === t.value
                  ? 'bg-[#377CF3] text-white'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {aiLoading ? <p className="mt-3 text-sm text-slate-500">Adaptation IA…</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Objet"
          className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          placeholder="Corps de l’email"
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        {!askRelance ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`mailto:${prospect.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
            >
              Ouvrir messagerie
            </a>
            <button
              type="button"
              disabled={pending || !subject.trim() || !body.trim()}
              onClick={() => setAskRelance(true)}
              className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Marquer comme envoyé
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-800">Programmer la prochaine relance</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[3, 5, 7, 15].map((d) => (
                <button
                  key={d}
                  type="button"
                  disabled={pending}
                  onClick={() => markSent(d)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
                >
                  {d} jours
                </button>
              ))}
              <button
                type="button"
                disabled={pending}
                onClick={() => markSent(null)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
              >
                Aucune
              </button>
            </div>
          </div>
        )}

        <p className="mt-3 text-[11px] text-slate-400">
          Types supportés : {EMAIL_TYPES.map((t) => t.label).join(' · ')}
        </p>
      </div>
    </div>
  );
}
