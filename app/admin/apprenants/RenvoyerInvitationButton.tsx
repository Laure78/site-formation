'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail } from 'lucide-react';

type InvitationRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  formation_id: string | null;
  status: string;
  sent_count: number;
  expires_at: string;
  courses?: { title?: string } | { title?: string }[] | null;
};

type Props = {
  invitation: InvitationRow;
  /** Style plus visible (bandeau « à renvoyer »). */
  variant?: 'default' | 'primary';
};

export function RenvoyerInvitationButton({ invitation, variant = 'default' }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const course = Array.isArray(invitation.courses) ? invitation.courses[0] : invitation.courses;

  const handleResend = async () => {
    if (submittingRef.current || loading) return;
    if (!invitation.formation_id) {
      setMsg('Formation manquante');
      return;
    }
    submittingRef.current = true;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/apprenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: invitation.email,
          firstName: invitation.first_name || 'Apprenant',
          lastName: invitation.last_name || '—',
          formationId: invitation.formation_id,
          action: 'resend',
          invitationId: invitation.id,
        }),
      });
      let data: { error?: string; status?: string } = {};
      try {
        data = await res.json();
      } catch {
        setMsg(`Réponse invalide (HTTP ${res.status})`);
        return;
      }
      if (!res.ok) {
        setMsg(data.error ?? `Erreur HTTP ${res.status}`);
        return;
      }
      setMsg(`Invitation renvoyée à ${invitation.email}`);
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Connexion impossible');
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const btnClass =
    variant === 'primary'
      ? 'inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50'
      : 'inline-flex items-center gap-1.5 rounded-lg border border-[var(--accent)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:opacity-50';

  return (
    <div className={`flex flex-col gap-1 ${variant === 'primary' ? 'items-start' : 'items-end'}`}>
      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className={btnClass}
        title={course?.title ? `Renvoyer — ${course.title}` : 'Renvoyer l’invitation'}
      >
        {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Mail size={16} aria-hidden />}
        {loading ? 'Envoi en cours…' : 'Renvoyer l’invitation'}
      </button>
      {msg ? (
        <span
          className={`max-w-[280px] text-xs ${
            msg.startsWith('Invitation renvoyée') ? 'text-emerald-700' : 'text-rose-700'
          } ${variant === 'primary' ? 'text-left' : 'text-right'}`}
          role="status"
        >
          {msg}
        </span>
      ) : null}
    </div>
  );
}
