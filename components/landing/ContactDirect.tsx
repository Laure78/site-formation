import { Calendar, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG, siteHasPublicPhone } from '@/lib/seo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

interface ContactDirectProps {
  /** Ex. paramètre d’URL ?formation=… (slug ou libellé) */
  formationHint?: string | null;
}

/** Bloc sans formulaire : email, téléphone (si configuré), prise de RDV */
export function ContactDirect({ formationHint }: ContactDirectProps) {
  return (
    <div className="space-y-6">
      {formationHint ? (
        <p className="rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-slate-700">
          <span className="font-medium">Formation évoquée :</span> {formationHint}
        </p>
      ) : null}
      <p className="text-sm text-slate-600">
        Pour échanger sur votre projet de formation IA pour le BTP, écrivez-moi ou réservez un créneau de 30 minutes.
      </p>
      <a
        href={`mailto:${SITE_CONFIG.email}`}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
      >
        <Mail className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
        <span className="font-medium">{SITE_CONFIG.email}</span>
      </a>
      {siteHasPublicPhone() ? (
        <a
          href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          <Phone className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
          <span className="font-medium">{SITE_CONFIG.phoneDisplay}</span>
        </a>
      ) : null}
      <CalendlyEmbed
        type="popup"
        ctaPosition="footer"
        ctaId="contact-direct"
        utmSource="contact"
        utmMedium="cta"
        campaign="contact-direct"
        variant="unstyled"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#2d6ab8]"
      >
        <Calendar className="h-5 w-5 shrink-0" strokeWidth={1.5} />
        Réservez votre visio découverte gratuite
      </CalendlyEmbed>
    </div>
  );
}
