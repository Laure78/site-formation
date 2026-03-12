import Link from 'next/link';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { Devis60sBlock } from '@/components/Devis60sBlock';

import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Réserver un RDV gratuit',
  description:
    'Réservez un RDV de 30 min pour votre formation IA BTP. Devis personnalisé. Formation finançable Constructys. Paris, Île-de-France.',
  path: '/prendre-rdv',
});

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
          <p className="mt-4">
            <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
              Découvrir le catalogue des formations IA BTP →
            </Link>
          </p>

          <div className="mt-10">
            <BookingCalendar />
          </div>

          {/* Backup : devis gratuit en 1 clic si pas de créneau */}
          <div className="mt-16">
            <Devis60sBlock placement="backup" />
          </div>
        </div>
      </section>
    </div>
  );
}
