'use client';

import { useId, useState } from 'react';

const ROLES = [
  { value: '', label: '— Sélectionnez votre fonction —' },
  { value: 'conducteur-travaux', label: 'Conducteur de travaux' },
  { value: 'directeur-exploitation', label: 'Directeur d’exploitation' },
  { value: 'chef-entreprise', label: 'Chef d’entreprise BTP' },
  { value: 'autre', label: 'Autre' },
] as const;

function pushDataLayer(event: string, resource: string) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, resource });
}

export function SkillIaLeadMagnetForm() {
  const errId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const consent = fd.get('consent') === 'on';
    if (!consent) {
      setError('Vous devez accepter l’utilisation de vos données pour recevoir le guide.');
      return;
    }
    const payload = {
      firstName: String(fd.get('firstName') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim(),
      role: String(fd.get('role') ?? '').trim(),
      consentRgpd: true,
    };
    setSubmitting(true);
    try {
      const res = await fetch('/api/lead-magnet/skill-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; redirectUrl?: string; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Une erreur est survenue.');
        return;
      }
      pushDataLayer('lead_magnet_submit', 'skill-ia-conducteur-travaux');
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      setError('Réponse serveur incomplète.');
    } catch {
      setError('Réseau indisponible. Réessayez dans quelques instants.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-2 border-white/30 bg-white p-6 shadow-xl md:p-8"
      style={{ color: '#1A1A1A' }}
      noValidate
    >
      <p className="font-display text-lg font-bold" style={{ color: '#1A1A1A' }}>
        Recevoir le guide gratuitement
      </p>
      <p className="mt-1 text-sm text-slate-600">PDF · envoi immédiat par e-mail</p>

      {error ? (
        <p
          id={errId}
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="skill-firstName" className="block text-sm font-medium text-slate-800">
            Prénom <span className="text-red-600">*</span>
          </label>
          <input
            id="skill-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errId : undefined}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-[#377CF3] focus:border-[#377CF3] focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="skill-email" className="block text-sm font-medium text-slate-800">
            E-mail professionnel <span className="text-red-600">*</span>
          </label>
          <input
            id="skill-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#377CF3] focus:ring-2 focus:ring-[#377CF3]"
          />
        </div>
        <div>
          <label htmlFor="skill-company" className="block text-sm font-medium text-slate-800">
            Entreprise
          </label>
          <input
            id="skill-company"
            name="company"
            type="text"
            autoComplete="organization"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#377CF3] focus:ring-2 focus:ring-[#377CF3]"
          />
        </div>
        <div>
          <label htmlFor="skill-role" className="block text-sm font-medium text-slate-800">
            Fonction <span className="text-red-600">*</span>
          </label>
          <select
            id="skill-role"
            name="role"
            required
            aria-required="true"
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#377CF3] focus:ring-2 focus:ring-[#377CF3]"
          >
            {ROLES.map((r) => (
              <option key={r.value || 'empty'} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-start gap-3">
          <input
            id="skill-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
          />
          <label htmlFor="skill-consent" className="text-sm leading-snug text-slate-600">
            J’accepte que mes données soient utilisées pour m’envoyer ce guide et des contenus BTP &amp; IA
            pertinents. Désabonnement en 1 clic.
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-60"
        style={{ backgroundColor: '#377CF3' }}
      >
        {submitting ? 'Envoi en cours…' : '📥 Recevoir le guide gratuitement'}
      </button>
    </form>
  );
}
