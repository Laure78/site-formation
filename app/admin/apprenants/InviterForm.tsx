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

type ApiStatus = 'cree' | 'deja_invite' | 'renvoye';

export function InviterForm({ courses }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Invitation unitaire (formulaire simple)
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [courseIdSingle, setCourseIdSingle] = useState(courses[0]?.id ?? '');
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [messageSingle, setMessageSingle] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );
  const submittingSingleRef = useRef(false);

  // Invitation en lot
  const [emailsRaw, setEmailsRaw] = useState('');
  const [courseIdBatch, setCourseIdBatch] = useState(courses[0]?.id ?? '');
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [result, setResult] = useState<InviteBatchResult | null>(null);
  const submittingBatchRef = useRef(false);

  const openBatch = () => {
    setResult(null);
    dialogRef.current?.showModal();
  };

  const closeBatch = () => {
    dialogRef.current?.close();
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingSingleRef.current || loadingSingle) return;
    if (!email.trim() || !courseIdSingle) return;
    submittingSingleRef.current = true;
    setLoadingSingle(true);
    setMessageSingle(null);
    try {
      const res = await fetch('/api/admin/apprenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          formationId: courseIdSingle,
          action: 'create',
        }),
      });
      let data: { error?: string; status?: string; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        setMessageSingle({
          type: 'err',
          text: `Réponse serveur invalide (HTTP ${res.status}). Réessayez ou rechargez la page.`,
        });
        return;
      }
      if (!res.ok) {
        setMessageSingle({ type: 'err', text: data.error ?? `Erreur HTTP ${res.status}` });
        return;
      }
      const labels: Record<ApiStatus, string> = {
        cree: `Invitation envoyée à ${email.trim().toLowerCase()} — vérifiez la boîte mail (et les spams).`,
        deja_invite:
          'Invitation déjà envoyée et encore valide. Utilisez « Renvoyer l’invitation » si besoin.',
        renvoye: `Invitation renvoyée à ${email.trim().toLowerCase()}.`,
      };
      setMessageSingle({
        type: 'ok',
        text: labels[data.status as ApiStatus] ?? data.message ?? 'OK',
      });
      if (data.status === 'cree') {
        setEmail('');
        setFirstName('');
        setLastName('');
        router.refresh();
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : '';
      setMessageSingle({
        type: 'err',
        text: detail
          ? `Connexion impossible : ${detail}`
          : 'Connexion impossible. Vérifiez le réseau puis rechargez la page (Cmd+Shift+R).',
      });
    } finally {
      setLoadingSingle(false);
      submittingSingleRef.current = false;
    }
  };

  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingBatchRef.current || loadingBatch || !courseIdBatch || !emailsRaw.trim()) return;
    submittingBatchRef.current = true;
    setLoadingBatch(true);
    setResult(null);
    try {
      const res = await inviteApprenantsBatchAction(emailsRaw, courseIdBatch);
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
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'Erreur inattendue';
      setResult({
        treated: 0,
        sent: 0,
        alreadyInvited: 0,
        invalid: [],
        duplicatesInInput: [],
        errors: [detail],
      });
    } finally {
      setLoadingBatch(false);
      submittingBatchRef.current = false;
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
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-slate-900">Ajouter un apprenant</h3>
            <p className="mt-1 text-sm text-slate-600">
              Crée le compte (identifiant = email), l’inscrit à la formation et envoie un lien
              sécurisé pour créer son mot de passe. Aucun mot de passe n’est envoyé par email.
            </p>
          </div>
          <button
            type="button"
            onClick={openBatch}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)] bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
          >
            <UserPlus size={16} aria-hidden />
            + Inviter plusieurs
          </button>
        </div>

        <form onSubmit={handleSingleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Email (identifiant)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
              placeholder="prenom.nom@email.fr"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Formation</label>
            <select
              value={courseIdSingle}
              onChange={(e) => setCourseIdSingle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loadingSingle}
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 font-medium text-white disabled:opacity-50"
            >
              {loadingSingle ? (
                <Loader2 size={18} className="animate-spin" aria-hidden />
              ) : (
                <UserPlus size={18} strokeWidth={1.5} aria-hidden />
              )}
              {loadingSingle ? 'Envoi en cours…' : 'Envoyer l’invitation'}
            </button>
          </div>
        </form>

        {messageSingle ? (
          <p
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              messageSingle.type === 'ok'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border border-red-200 bg-red-50 text-red-700'
            }`}
            role="status"
          >
            {messageSingle.text}
          </p>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(100%,32rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/40"
        onClose={() => setResult(null)}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id={titleId} className="font-display text-lg font-semibold text-slate-900">
              Inviter plusieurs apprenants
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Un email par ligne, ou séparés par des virgules / points-virgules.
            </p>
          </div>
          <button
            type="button"
            onClick={closeBatch}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleBatchSubmit} className="space-y-4 px-5 py-4">
          <div>
            <label htmlFor="invite-batch-course" className="block text-sm font-medium text-slate-700">
              Formation / session
            </label>
            <select
              id="invite-batch-course"
              value={courseIdBatch}
              onChange={(e) => setCourseIdBatch(e.target.value)}
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
          </div>
          <div className="flex flex-wrap items-center gap-3 pb-1">
            <button
              type="submit"
              disabled={loadingBatch || !emailsRaw.trim() || !courseIdBatch}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 font-medium text-white disabled:opacity-50"
            >
              {loadingBatch ? (
                <Loader2 size={18} className="animate-spin" aria-hidden />
              ) : (
                <UserPlus size={18} aria-hidden />
              )}
              {loadingBatch ? 'Envoi en cours…' : 'Envoyer les invitations'}
            </button>
            <button
              type="button"
              onClick={closeBatch}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Fermer
            </button>
          </div>
        </form>

        {result ? (
          <div className="mx-5 mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4" role="status">
            <p className="font-semibold text-slate-900">Invitations envoyées</p>
            <p className="mt-1 text-sm text-slate-700">
              {result.treated} traité{result.treated > 1 ? 's' : ''}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {result.sent > 0 ? <li>✓ {result.sent} invitation(s) envoyée(s)</li> : null}
              {result.alreadyInvited > 0 ? (
                <li>✓ {result.alreadyInvited} déjà en attente</li>
              ) : null}
              {result.invalid.length > 0 ? (
                <li>⚠ {result.invalid.length} adresse(s) invalide(s)</li>
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
