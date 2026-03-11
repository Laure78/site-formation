'use client';

import { useState } from 'react';
import { UserPlus, Copy, Check } from 'lucide-react';
import { createInvitationAction } from './actions';

interface Props {
  courses: { id: string; title: string }[];
}

export function InviterForm({ courses }: Props) {
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !courseId) return;
    setLoading(true);
    setLink(null);
    try {
      const result = await createInvitationAction(email.trim(), courseId);
      if (result?.url) {
        setLink(result.url);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-display text-lg font-semibold text-slate-900">Inviter un apprenant</h3>
      <p className="mt-1 text-sm text-slate-600">
        Envoyez un lien d&apos;invitation. L&apos;apprenant créera son mot de passe et accédera à la formation.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
            placeholder="nom@exemple.fr"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700">Formation</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 font-medium text-white disabled:opacity-50"
        >
          <UserPlus size={18} strokeWidth={1.5} />
          {loading ? 'Génération...' : 'Générer le lien'}
        </button>
      </form>

      {link && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">Lien d&apos;invitation généré</p>
          <p className="mt-2 truncate rounded bg-white px-3 py-2 text-sm text-slate-700">{link}</p>
          <button
            type="button"
            onClick={copyLink}
            className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copié !' : 'Copier le lien'}
          </button>
          <p className="mt-3 text-xs text-emerald-700">
            Envoyez ce lien par email à l&apos;apprenant. Il expire sous 7 jours.
          </p>
        </div>
      )}
    </div>
  );
}
