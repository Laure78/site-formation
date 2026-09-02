import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContactPageHero } from '@/components/contact/ContactPageHero';
import { ContactPathCards } from '@/components/contact/ContactPathCards';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactAfterSendInfo } from '@/components/contact/ContactAfterSendInfo';
import { ContactCalendlyBlock } from '@/components/contact/ContactCalendlyBlock';
import { ContactCoordinates } from '@/components/contact/ContactCoordinates';
import {
  CONTACT_FOOTER_LINKS,
  CONTACT_PAGE_META_DESCRIPTION,
  CONTACT_PAGE_META_TITLE,
} from '@/lib/contact-page-config';
import { getContactPageJsonLd } from '@/lib/schema-contact-page';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

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

export default function ContactPage() {
  return (
    <>
      <JsonLd id="schema-contact-page" schema={getContactPageJsonLd()} />

      <ContactPageHero />

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
        <ContactPathCards />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <ContactFormSection />
          </div>
          <div className="space-y-6">
            <ContactAfterSendInfo />
          </div>
        </div>

        <ContactCalendlyBlock />
        <ContactCoordinates />

        <AllerPlusLoin links={[...CONTACT_FOOTER_LINKS]} />
      </div>

      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Link href={LINKS.home} className="font-medium text-[#377CF3] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </>
  );
}
