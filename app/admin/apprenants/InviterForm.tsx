'use client';

import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UserPlus, X } from 'lucide-react';
import {
  inviteApprenantsBatchAction,
  type InviteBatchResult,
} from './actions';

interface Props {
  courses: { id: string; title: string }[];
}

export function InviterForm({ courses }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [emailsRaw, setEmailsRaw] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InviteBatchResult | null>(null);
  const submittingRef = useRef(false);

  const open = () => {
    setResult(null);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || loading || !courseId || !emailsRaw.trim()) return;
    submittingRef.current = true;
    setLoading(true);
    setResult(null);
    try {
      const res = await inviteApprenantsBatchAction(emailsRaw, courseId);
      if (!res) {
        setResult({
          treated: 0,
          sent: 0,
          alreadyInvited: 0,
          invalid: [],
          duplicatesInInput: [],
          errors: ['Session expirée ou droits insuffisants. Reconnectez-vous en admin.'],
        });
        return;
      }
      setResult(res);
      if (res.sent > 0) {
        setEmailsRaw('');
        router.refresh();
      }
    } catch {
      setResult({
        treated: 0,
        sent: 0,
        alreadyInvited: 0,
        invalid: [],
        duplicatesInInput: [],
        errors: ['Erreur réseau. Réessayez.'],
      });
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900">Inviter des apprenants</h3>
        <p className="mt-2 text-sm text-amber-800">
          Aucune formation publiée. Publiez au moins une formation dans{' '}
          <a href="/admin/formations" className="font-medium underline">
            Admin → Formations
          </a>{' '}
          avant d’inviter.
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
      >
        <UserPlus size={18} strokeWidth={1.5} aria-hidden />
        + Inviter des apprenants
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(100%,32rem)] rounded-2xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/40 open:flex open:flex-col"
        onClose={() => setResult(null)}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id={titleId} className="font-display text-lg font-semibold text-slate-900">
              Inviter des apprenants
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Saisissez plusieurs emails — chaque personne reçoit un lien sécurisé pour créer son mot
              de passe. Aucun mot de passe n’est envoyé en clair.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          <div>
            <label htmlFor="invite-batch-course" className="block text-sm font-medium text-slate-700">
              Formation / session
            </label>
            <select
              id="invite-batch-course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="invite-batch-emails" className="block text-sm font-medium text-slate-700">
              Emails des apprenants
            </label>
            <textarea
              id="invite-batch-emails"
              value={emailsRaw}
              onChange={(e) => setEmailsRaw(e.target.value)}
              required
              rows={8}
              placeholder={'paul@email.fr\nmarie@email.fr\nlea@email.fr'}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 font-mono text-sm text-slate-900"
            />
            <p className="mt-1 text-xs text-slate-500">
              Un email par ligne, ou séparés par des virgules / points-virgules. Max 80 adresses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading || !emailsRaw.trim() || !courseId}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 font-medium text-white disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" aria-hidden />
              ) : (
                <UserPlus size={18} aria-hidden />
              )}
              {loading ? 'Envoi en cours…' : 'Envoyer les invitations'}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Fermer
            </button>
          </div>
        </form>

        {result ? (
          <div
            className="mx-5 mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4"
            role="status"
          >
            <p className="font-semibold text-slate-900">Invitations envoyées</p>
            <p className="mt-1 text-sm text-slate-700">
              {result.treated} apprenant{result.treated > 1 ? 's' : ''} traité
              {result.treated > 1 ? 's' : ''}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {result.sent > 0 ? (
                <li>✓ {result.sent} invitation{result.sent > 1 ? 's' : ''} envoyée{result.sent > 1 ? 's' : ''}</li>
              ) : null}
              {result.alreadyInvited > 0 ? (
                <li>✓ {result.alreadyInvited} déjà inscrit{result.alreadyInvited > 1 ? 's' : ''} (invitation en attente)</li>
              ) : null}
              {result.duplicatesInInput.length > 0 ? (
                <li>⚠ {result.duplicatesInInput.length} doublon{result.duplicatesInInput.length > 1 ? 's' : ''} ignoré{result.duplicatesInInput.length > 1 ? 's' : ''}</li>
              ) : null}
              {result.invalid.length > 0 ? (
                <li>
                  ⚠ {result.invalid.length} adresse{result.invalid.length > 1 ? 's' : ''} invalide
                  {result.invalid.length > 1 ? 's' : ''}
                  <span className="mt-0.5 block text-xs text-amber-800">
                    {result.invalid.slice(0, 8).join(', ')}
                    {result.invalid.length > 8 ? '…' : ''}
                  </span>
                </li>
              ) : null}
            </ul>
            {result.errors.length > 0 ? (
              <ul className="mt-2 max-h-32 list-inside list-disc overflow-y-auto text-sm text-amber-800">
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
