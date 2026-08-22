import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { CalendlyConsentInline } from '@/components/CalendlyConsentInline';
import { PrendreRdvCalendlyIntro } from '@/components/prendre-rendez-vous/PrendreRdvCalendlyIntro';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_PRENDRE_RDV } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Prendre rendez-vous : appel découverte formation IA BTP',
  description:
    'Formation IA pour le BTP : réservez un appel découverte gratuit de 30 min. Visio Calendly, devis Qualiopi et financement Constructys.',
  path: '/prendre-rendez-vous',
});

export default function PrendreRendezVousPage() {
  const faqSchema = getFAQSchema(FAQ_PRENDRE_RDV);
  const pageUrl = `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/prendre-rendez-vous`;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Prendre rendez-vous — formation IA pour le BTP',
    description:
      'Réservez un appel découverte gratuit de 30 minutes pour cadrer votre formation IA appliquée au bâtiment.',
    url: pageUrl,
    potentialAction: {
      '@type': 'ScheduleAction',
      name: 'Réserver un appel découverte',
      target: CALENDLY_BOOKING_URL,
    },
  };

  return (
    <div className="min-h-[80vh]">
      <JsonLd id="schema-prendre-rendez-vous-webpage" data={pageSchema} />
      {faqSchema ? <JsonLd id="schema-faq-prendre-rendez-vous" schema={faqSchema} /> : null}
      <section className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <Link href={LINKS.home} className={`text-sm ${OFC_LINK}`}>
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            30 minutes en visio ou par téléphone pour cadrer votre projet de formation IA pour le BTP.
          </p>
          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Sessions en présentiel, Île-de-France uniquement — la visio sert uniquement au cadrage.
          </p>

          <PrendreRdvCalendlyIntro />

          <div className="mt-8">
            <h2 className="sr-only">Réserver un créneau Calendly</h2>
            <CalendlyConsentInline campaign="prendre-rendez-vous-page" heightPx={720} />
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes"
            subtitle="RDV gratuit, déroulement, créneaux."
          />

          <AllerPlusLoin
            links={[
              { href: LINKS.formations, label: 'Catalogue des formations' },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: LINKS.contact, label: 'Contact direct' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
