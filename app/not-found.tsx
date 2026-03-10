import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page non trouvée',
  description: 'La page demandée n\'existe pas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
        Page non trouvée
      </h1>
      <p className="mt-4 text-slate-600">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
