'use client';

import { useRef, useState } from 'react';
import { UserPlus } from 'lucide-react';

interface Props {
  courses: { id: string; title: string }[];
}

type ApiStatus = 'cree' | 'deja_invite' | 'renvoye';

export function InviterForm({ courses }: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const submittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || loading) return;
    if (!email.trim() || !courseId || !firstName.trim() || !lastName.trim()) return;
    submittingRef.current = true;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/apprenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          formationId: courseId,
          action: 'create',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'err', text: data.error ?? 'Erreur' });
        return;
      }
      const labels: Record<ApiStatus, string> = {
        cree: `✅ Invitation envoyée à ${email.trim().toLowerCase()} — lien pour créer le mot de passe.`,
        deja_invite:
          '⏳ Invitation déjà envoyée et encore valide. Utilisez « Renvoyer l’invitation » si besoin.',
        renvoye: `✅ Invitation renvoyée à ${email.trim().toLowerCase()}.`,
      };
      setMessage({
        type: 'ok',
        text: labels[data.status as ApiStatus] ?? data.message ?? 'OK',
      });
      if (data.status === 'cree') {
        setEmail('');
        setFirstName('');
        setLastName('');
      }
    } catch {
      setMessage({ type: 'err', text: 'Erreur réseau' });
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-display text-lg font-semibold text-slate-900">Ajouter un apprenant</h3>
      <p className="mt-1 text-sm text-slate-600">
        Crée le compte (identifiant = email), l’inscrit à la formation et envoie un lien sécurisé pour
        créer son mot de passe. Aucun mot de passe n’est envoyé par email.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
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
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 font-medium text-white disabled:opacity-50"
          >
            <UserPlus size={18} strokeWidth={1.5} />
            {loading ? 'Envoi en cours…' : 'Envoyer l’invitation'}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            message.type === 'ok'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
