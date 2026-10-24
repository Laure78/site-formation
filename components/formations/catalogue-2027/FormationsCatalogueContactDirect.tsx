import Link from 'next/link';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsCatalogueContactDirect() {
  return (
    <section
      id="contact-direct-catalogue"
      className="mt-12 scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8"
      aria-labelledby="contact-direct-catalogue-title"
    >
      <h2 id="contact-direct-catalogue-title" className="ofc-type-h2 text-ofc-ink">
        Contact direct
      </h2>
      <p className="mt-2 text-sm text-ofc-ink-muted">Laure OLIVIÉ — OFC Création d&apos;Entreprise</p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] underline">
            {CONTACT.email}
          </a>
        </li>
        <li>
          <a href={`tel:${CONTACT.phone}`} className="font-medium text-[#377CF3] underline">
            {CONTACT.phoneDisplay}
          </a>
        </li>
      </ul>
      <Link
        href={LINKS.prendreRdv}
        className={`${OFC_CTA_SECONDARY} mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold`}
      >
        {CTA_RDV_LABEL}
      </Link>
    </section>
  );
}
