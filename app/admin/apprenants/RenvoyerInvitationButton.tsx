'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';

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

export function RenvoyerInvitationButton({ invitation }: { invitation: InvitationRow }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const course = Array.isArray(invitation.courses)
    ? invitation.courses[0]
    : invitation.courses;

  const handleResend = async () => {
    if (!invitation.formation_id) {
      setMsg('Formation manquante');
      return;
    }
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
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? 'Erreur');
        return;
      }
      setMsg('Invitation renvoyée');
      router.refresh();
    } catch {
      setMsg('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        title={course?.title ? `Renvoyer — ${course.title}` : 'Renvoyer l’invitation'}
      >
        <Mail size={14} />
        {loading ? '…' : 'Renvoyer'}
      </button>
      {msg && <span className="text-xs text-slate-500">{msg}</span>}
    </div>
  );
}
