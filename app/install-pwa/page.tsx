import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { Smartphone, Download } from 'lucide-react';

export const metadata = createPageMetadata({
  title: 'Installer l\'app — Laure Olivié',
  description: 'Installez la plateforme de formation IA BTP sur votre téléphone. Gratuit, sans app store.',
  path: '/install-pwa',
});

export default function InstallPWAPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        <Smartphone size={40} strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">
        Installer l&apos;application
      </h1>
      <p className="mt-4 text-slate-600">
        Accédez à vos formations depuis l&apos;écran d&apos;accueil de votre téléphone.
        Gratuit, sans téléchargement via l&apos;app store.
      </p>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left">
        <h2 className="font-semibold text-slate-900">Comment installer ?</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-600">
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">1</span>
            <p><strong>Android (Chrome) :</strong> Menu ⋮ → « Ajouter à l&apos;écran d&apos;accueil » ou « Installer l&apos;application »</p>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">2</span>
            <p><strong>iPhone (Safari) :</strong> Bouton Partager (carré avec flèche) → « Sur l&apos;écran d&apos;accueil »</p>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">3</span>
            <p><strong>PC :</strong> Icône d&apos;installation dans la barre d&apos;adresse du navigateur</p>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700"
      >
        <Download size={20} strokeWidth={1.5} />
        Ouvrir la plateforme
      </Link>

      <p className="mt-8 text-xs text-slate-500">
        Aucune donnée personnelle stockée sur l&apos;appareil. Connexion internet requise pour les formations.
      </p>
    </div>
  );
}
