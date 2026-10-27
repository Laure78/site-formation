import Link from 'next/link';
import { ContactForm } from '@/components/contact/ContactForm';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  formationHint?: string | null;
  initialObjet?: string | null;
};

export function FormationsContact2027({
  formationHint = null,
  initialObjet = 'devis',
}: Props) {
  return (
    <section
      id="contact-catalogue"
      className="mt-12 scroll-mt-24 border-t border-[#E2E8F0] pt-10"
      aria-labelledby="contact-catalogue-title"
    >
      <h2 id="contact-catalogue-title" className="ofc-type-h2 text-ofc-ink">
        Demander un programme ou un devis
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Précisez le parcours ou le module concerné. Pas de pièces confidentielles de chantier dans ce
        formulaire.
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <ContactForm
          initialObjet={initialObjet}
          formationHint={formationHint}
          density="compact"
          steppedCatalogue
        />
        <aside className="border border-[#E2E8F0] bg-[#F8FAFC] p-5 lg:sticky lg:top-24 lg:self-start">
          <h3 className="font-semibold text-ofc-ink">Contact direct</h3>
          <p className="mt-3 text-sm text-ofc-ink-muted">Laure OLIVIÉ</p>
          <p className="mt-2 text-sm">
            <a href={`mailto:${CONTACT.email}`} className="text-[#377CF3] underline">
              {CONTACT.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`tel:${CONTACT.phone}`} className="text-[#377CF3] underline">
              {CONTACT.phoneDisplay}
            </a>
          </p>
          <Link
            href={LINKS.prendreRdv}
            className={`${OFC_CTA_SECONDARY} mt-5 inline-flex min-h-11 w-full items-center justify-center px-4 py-2 text-sm`}
          >
            {CTA_RDV_LABEL}
          </Link>
        </aside>
      </div>
    </section>
  );
}
