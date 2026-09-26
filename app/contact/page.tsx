import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ContactPageIntro } from '@/components/contact/ContactPageIntro';
import { ContactPathCards } from '@/components/contact/ContactPathCards';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactAfterSendInfo } from '@/components/contact/ContactAfterSendInfo';
import { ContactPageCalendlyPanel } from '@/components/contact/ContactPageCalendlyPanel';
import {
  CONTACT_FOOTER_LINKS,
  CONTACT_PAGE_META_DESCRIPTION,
  CONTACT_PAGE_META_TITLE,
} from '@/lib/contact-page-config';
import { getContactPageJsonLd } from '@/lib/schema-contact-page';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: CONTACT_PAGE_META_TITLE,
  titleAbsolute: CONTACT_PAGE_META_TITLE,
  description: CONTACT_PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/contact',
  keywords: null,
  appendAuthorSuffix: false,
});

type ContactPageProps = {
  searchParams: Promise<{ objet?: string; formation?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialObjet = typeof params.objet === 'string' ? params.objet : null;
  const formationHint = typeof params.formation === 'string' ? params.formation : null;

  return (
    <>
      <JsonLd id="schema-contact-page" schema={getContactPageJsonLd()} />

      <div className="mx-auto max-w-[80rem] px-4 pb-16 pt-3 sm:px-6 lg:px-8">
        <Breadcrumb
          className="mb-3 text-sm"
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Contact', href: LINKS.contact },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-8">
          <ContactPageIntro />

          <div className="ofc-card min-w-0 p-4 sm:p-5 lg:sticky lg:top-[calc(var(--site-header-height,4rem)+0.75rem)]">
            <ContactPageCalendlyPanel />
          </div>
        </div>

        <section
          id="contact-form"
          aria-labelledby="contact-form-section-title"
          className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)] mt-8 border-t border-ofc-border pt-8 lg:mt-10 lg:pt-10"
        >
          <h2 id="contact-form-section-title" className="sr-only">
            Formulaire de contact
          </h2>
          <div className="ofc-card mx-auto max-w-3xl p-5 sm:p-6">
            <ContactFormSection
              initialObjet={initialObjet}
              formationHint={formationHint}
              density="compact"
            />
            <ContactAfterSendInfo compact className="mt-4" />
          </div>
        </section>

        <div className="mt-8 space-y-8 border-t border-ofc-border pt-8 md:mt-10 md:pt-10">
          <ContactPathCards />

          <nav aria-label="Liens utiles" className="border-t border-ofc-border pt-6">
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {CONTACT_FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={OFC_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
