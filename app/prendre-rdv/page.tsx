import Link from 'next/link';
import { BookingCalendar } from '@/components/booking/BookingCalendar';

export const metadata = {
  title: 'Prendre rendez-vous — Laure Olivié',
  description:
    "Réservez un créneau pour échanger sur votre projet de formation IA BTP. 30 minutes gratuites pour discuter de vos besoins.",
};

export default function PrendreRDVPage() {
  return (
    <div className="min-h-[80vh]">
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Réservez un créneau de 30 minutes pour discuter de votre projet de
            formation IA et obtenir un devis personnalisé. Choisissez le jour et
            l&apos;heure qui vous conviennent.
          </p>

          <div className="mt-10">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </div>
  );
}
