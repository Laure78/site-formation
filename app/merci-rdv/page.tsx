import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { CheckCircle, Mail, Home, Calendar, ClipboardList, BookOpen } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Rendez-vous confirmé',
  description:
    "Votre rendez-vous est enregistré. Vous recevez un email de confirmation avec le lieu et les horaires convenus avec Laure Olivié.",
  path: '/merci-rdv',
  keywords: ['confirmation rendez-vous formation'],
  robots: { index: false, follow: false },
});

function formatRDVDisplay(startIso: string): string {
  try {
    const d = new Date(startIso);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default async function MerciRDVPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; start?: string }>;
}) {
  const { t, start } = await searchParams;
  const hasToken = !!t?.trim();
  const rdvDisplay = start?.trim() ? formatRDVDisplay(start.trim()) : '';

  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white">
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Rendez-vous demandé avec succès !
          </h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-slate-600">
            <CheckCircle size={18} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
            Votre réservation a bien été enregistrée
          </p>
          {rdvDisplay && (
            <div className="mt-6 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-4 text-center">
              <p className="text-sm font-medium text-slate-600">Votre rendez-vous</p>
              <p className="mt-1 font-display text-lg font-bold capitalize text-slate-900">
                {rdvDisplay}
              </p>
              <p className="mt-1 text-sm text-slate-600">(30 minutes)</p>
            </div>
          )}
          <p className="mt-6 text-center text-slate-600">
            Merci pour votre confiance. Vous recevrez une confirmation par email
            dans les plus brefs délais. En cas de changement, n&apos;hésitez pas
            à me contacter.
          </p>

          {hasToken && (
            <div className="mt-8 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
              <p className="font-semibold text-slate-900">
                Complétez notre questionnaire pour mieux préparer notre échange
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Répondez en 2 minutes à quelques questions sur votre entreprise et vos besoins.
              </p>
              <Link
                href={`/questionnaire/${t}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <ClipboardList size={20} strokeWidth={1.5} />
                Remplir le questionnaire
              </Link>
            </div>
          )}

          <div className="mt-8 rounded-xl border-2 border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">
              Une question avant notre échange ?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
              >
                <Mail size={20} strokeWidth={1.5} />
                laureolivie@yahoo.fr
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/formations"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            <BookOpen size={20} strokeWidth={1.5} />
            Voir le catalogue formations
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto"
          >
            <Home size={20} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>
          <RdvLink className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto">
            <Calendar size={20} strokeWidth={1.5} />
            Prendre un autre rendez-vous
          </RdvLink>
        </div>
      </div>
    </div>
  );
}
