import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  CONTACT_COORDINATES_INTRO,
  CONTACT_LOCATION_LABEL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PRIMARY_EMAIL,
  CONTACT_RECLAMATION_LINE,
} from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';

export function ContactCoordinates() {
  return (
    <section aria-labelledby="contact-coordinates-title">
      <h2
        id="contact-coordinates-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Autres moyens de contact
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">{CONTACT_COORDINATES_INTRO}</p>
      <ul className="mt-6 space-y-4 text-sm text-[#475569]">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
          <span>
            <span className="font-semibold text-[#0F172A]">Email</span>
            <br />
            <a
              href={`mailto:${CONTACT_PRIMARY_EMAIL}`}
              className="font-medium text-[#377CF3] underline"
            >
              {CONTACT_PRIMARY_EMAIL}
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
          <span>
            <span className="font-semibold text-[#0F172A]">Téléphone</span>
            <br />
            <a
              href={`tel:${CONTACT_PHONE}`}
              aria-label={`Appeler au ${CONTACT_PHONE_DISPLAY}`}
              className="font-medium text-[#377CF3] underline"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
          <span>
            <span className="font-semibold text-[#0F172A]">Localisation</span>
            <br />
            {CONTACT_LOCATION_LABEL}
          </span>
        </li>
      </ul>
      <p className="mt-6 text-sm text-[#64748B]">
        {CONTACT_RECLAMATION_LINE}{' '}
        <Link href={LINKS.reclamations} className="font-medium text-[#377CF3] underline">
          Procédure de réclamation
        </Link>
        .
      </p>
    </section>
  );
}
