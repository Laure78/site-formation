'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { CtaVisio } from '@/components/CtaVisio';
import { CONTACT } from '@/lib/constants';
import {
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_QUALIOPI_ORGANISME,
} from '@/lib/catalogue-2027/parcours-commercial-copy';

type Props = {
  formationHint?: string | null;
  initialObjet?: string | null;
  initialMetier?: string | null;
  initialMessage?: string | null;
  messagePlaceholder?: string | null;
  needExample?: string | null;
  sectionId?: string;
  /** Contexte parcours métiers — rappel ouverture 2027 + Qualiopi. */
  parcoursMetiersContext?: boolean;
  sectionTitle?: string;
  sectionLead?: string;
};

export function FormationsContact2027({
  formationHint = null,
  initialObjet = 'devis',
  initialMetier = null,
  initialMessage = null,
  messagePlaceholder = null,
  needExample = null,
  sectionId = 'contact-catalogue',
  parcoursMetiersContext = false,
  sectionTitle = 'Demander un devis',
  sectionLead =
    'Précisez le parcours ou le module concerné. Pas de pièces confidentielles de chantier dans ce formulaire.',
}: Props) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)]"
      aria-labelledby="contact-catalogue-title"
    >
      <div className="text-center">
        <h2 id="contact-catalogue-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          {sectionTitle}
        </h2>
        <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          {sectionLead}
          {parcoursMetiersContext ? (
            <>
              {' '}
              {PARCOURS_DISPONIBILITE_LIBELLE}. Aucune date de session n’est confirmée sans réponse écrite de
              l’organisme.
            </>
          ) : null}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="rounded-2xl border border-[#BFDBFE] bg-white p-5 shadow-[0_8px_32px_rgba(11,64,255,0.06)] sm:p-7 md:p-8">
          <ContactForm
            initialObjet={initialObjet}
            formationHint={formationHint}
            initialMetier={initialMetier}
            initialMessage={initialMessage}
            messagePlaceholder={messagePlaceholder}
            needExample={needExample}
            density="compact"
            steppedCatalogue
          />
        </div>
        <aside className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 lg:sticky lg:top-24">
          <h3 className="font-display text-base font-bold text-[#101936]">Contact direct</h3>
          <p className="mt-2 text-sm text-slate-600">Laure Olivié — OFC Création d&apos;Entreprise</p>
          {parcoursMetiersContext ? (
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{PARCOURS_QUALIOPI_ORGANISME}</p>
          ) : null}
          <p className="mt-3 text-sm">
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
              {CONTACT.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`tel:${CONTACT.phone}`} className="font-medium text-[#377CF3] hover:underline">
              {CONTACT.phoneDisplay}
            </a>
          </p>
          <CtaVisio
            src="catalogue-contact-aside"
            variant="secondary"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center px-4 py-2 text-sm"
          />
        </aside>
      </div>
    </section>
  );
}
