import Link from 'next/link';
import { CheckCircle, Phone, Mail, Home, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Rendez-vous confirmé — Laure Olivié',
  description: 'Votre rendez-vous a bien été enregistré. Confirmation par email.',
};

export default function MerciRDVPage() {
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
          <p className="mt-6 text-center text-slate-600">
            Merci pour votre confiance. Vous recevrez une confirmation par email
            dans les plus brefs délais. En cas de changement, n&apos;hésitez pas
            à me contacter.
          </p>

          <div className="mt-8 rounded-xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] p-6">
            <p className="font-semibold text-slate-900">
              Une question avant notre échange ?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <a
                href="tel:+33695661818"
                className="flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
              >
                <Phone size={20} strokeWidth={1.5} />
                06 95 66 18 18
              </a>
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

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            <Home size={20} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/prendre-rdv"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto"
          >
            <Calendar size={20} strokeWidth={1.5} />
            Prendre un autre rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
