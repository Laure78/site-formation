import { Calendar, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';
import { CONTACT } from '@/lib/constants';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

interface ContactDirectProps {
  /** Ex. paramètre d’URL ?formation=… (slug ou libellé) */
  formationHint?: string | null;
}

const PHONE_ARIA_LABEL = `Appeler Laure Olivié au ${CONTACT.phoneDisplay}`;

/** Bloc sans formulaire : email, téléphone, prise de RDV */
export function ContactDirect({ formationHint }: ContactDirectProps) {
  return (
    <div className="space-y-6">
      {formationHint ? (
        <p className="rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-slate-700">
          <span className="font-medium">Formation évoquée :</span> {formationHint}
        </p>
      ) : null}
      <p className="text-sm text-slate-600">
        Pour échanger sur votre projet de formation IA pour le BTP, écrivez-moi, appelez-moi ou
        réservez un créneau de 30 minutes.
      </p>
      <a
        href={`mailto:${SITE_CONFIG.email}`}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
      >
        <Mail className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
        <span className="font-medium">{SITE_CONFIG.email}</span>
      </a>
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label={PHONE_ARIA_LABEL}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
      >
        <Phone className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
        <span className="font-medium">{CONTACT.phoneDisplay}</span>
      </a>
      <CalendlyEmbed
        type="link"
        ctaPosition="footer"
        ctaId="contact-direct"
        utmSource="contact"
        utmMedium="cta"
        campaign="contact-direct"
        variant="primary"
        className="w-full gap-2"
       />
    </div>
  );
}
