import Link from 'next/link';
import { ShieldCheck, Mail, Database } from 'lucide-react';

export default async function AdminParametresPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Paramètres</h1>
      <p className="mt-2 text-slate-600">Configuration de la plateforme et conformité</p>

      <div className="mt-10 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">Sécurité & accès</h2>
              <p className="text-sm text-slate-600">Authentification, rôles et protection des routes admin</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            L&apos;espace admin est protégé par authentification Supabase. Seuls les profils avec le rôle <strong>admin</strong> ou <strong>formateur</strong> peuvent y accéder.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">Invitations</h2>
              <p className="text-sm text-slate-600">Liens d&apos;invitation par email (copier-coller)</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Les invitations génèrent un lien sécurisé valable 7 jours. L&apos;envoi automatique par email peut être configuré (Resend, SendGrid, etc.).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Database size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">Données & RGPD</h2>
              <p className="text-sm text-slate-600">Gestion des données apprenants</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>• Données stockées : Supabase (profils, inscriptions, progression, évaluations)</p>
            <p>• Politique de confidentialité : <Link href="/politique-confidentialite" className="text-[var(--accent)] hover:underline">en ligne</Link></p>
            <p>• Export des preuves Qualiopi : <Link href="/admin/qualite" className="text-[var(--accent)] hover:underline">page Qualité</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
