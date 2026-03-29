import { ExternalLink } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

/** Widget Calendly en iframe (embed) + lien direct pour nouvel onglet */
export function CalendlyBooking() {
  const embedSrc = `${CALENDLY_BOOKING_URL}?embed=true`;

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Choisissez un créneau dans le calendrier ci-dessous (agenda en ligne sécurisé).
        </p>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]"
        >
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
          Ouvrir Calendly dans un nouvel onglet
        </a>
      </div>
      <iframe
        title="Calendly — Appel découverte formation IA BTP"
        src={embedSrc}
        className="h-[min(90vh,800px)] w-full min-h-[620px] rounded-2xl border border-slate-200 bg-white shadow-sm"
        loading="lazy"
      />
    </div>
  );
}
