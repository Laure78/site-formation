'use client';

import Link from 'next/link';
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  CONTACT_COORDINATES_INTRO,
  CONTACT_LOCATION_LABEL,
  CONTACT_PAGE_H1,
  CONTACT_PAGE_PROOF_LINE,
  CONTACT_PAGE_SUBTITLE,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PRIMARY_EMAIL,
  CONTACT_RECLAMATION_LINE,
} from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';
import { trackContactCtaClick } from '@/lib/ga4-analytics';
import { TrainingDeliveryInfo } from '@/components/formations/TrainingDeliveryInfo';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';

/**
 * Intro contact + coordonnées — colonne gauche au-dessus de la ligne de flottaison (desktop).
 */
export function ContactPageIntro() {
  return (
    <header className="min-w-0 space-y-4" aria-labelledby="contact-hero-title">
      <Badge>Contact</Badge>
      <h1
        id="contact-hero-title"
        className="font-display text-[clamp(1.65rem,2.8vw,2.35rem)] font-bold leading-[1.12] tracking-tight text-ofc-ink"
      >
        {CONTACT_PAGE_H1}
      </h1>
      <p className={`${OFC_TYPE_LEAD} max-w-xl text-base text-ofc-ink-muted`}>{CONTACT_PAGE_SUBTITLE}</p>
      <p className="text-sm font-medium text-ofc-ink-subtle">{CONTACT_PAGE_PROOF_LINE}</p>

      <TrainingDeliveryInfo variant="inline" className="text-ofc-ink-muted" />

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href="?objet=devis#contact-form"
          onClick={() => trackContactCtaClick('devis')}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-5 py-2.5 text-sm`}
        >
          Demander un devis
        </Link>
        <Link
          href="#contact-rdv"
          onClick={() => trackContactCtaClick('rdv')}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
        >
          <Calendar className="h-4 w-4 shrink-0" aria-hidden />
          Choisir un créneau
        </Link>
      </div>

      <section aria-labelledby="contact-coordinates-title" className="rounded-xl border border-ofc-border bg-[#F8FAFC]/80 p-4 sm:p-5">
        <h2 id="contact-coordinates-title" className="font-display text-base font-bold text-ofc-ink">
          Coordonnées
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-ofc-ink-muted">{CONTACT_COORDINATES_INTRO}</p>
        <ul className="mt-3 space-y-2.5 text-sm text-ofc-ink-muted">
          <li className="flex items-start gap-2.5">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <span>
              <a
                href={`mailto:${CONTACT_PRIMARY_EMAIL}`}
                onClick={() => trackContactCtaClick('email')}
                className="font-medium text-[#377CF3] underline"
              >
                {CONTACT_PRIMARY_EMAIL}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <span>
              <a
                href={`tel:${CONTACT_PHONE}`}
                onClick={() => trackContactCtaClick('phone')}
                aria-label={`Appeler au ${CONTACT_PHONE_DISPLAY}`}
                className="font-medium text-[#377CF3] underline"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <span>{CONTACT_LOCATION_LABEL}</span>
          </li>
        </ul>
        <p className="mt-3 text-xs text-ofc-ink-subtle">
          {CONTACT_RECLAMATION_LINE}{' '}
          <Link href={LINKS.reclamations} className="font-medium text-[#377CF3] underline">
            Procédure de réclamation
          </Link>
          .
        </p>
      </section>
    </header>
  );
}
