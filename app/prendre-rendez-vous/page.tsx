import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { CalendlyConsentInline } from '@/components/CalendlyConsentInline';
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
      <JsonLd id="schema-faq-prendre-rendez-vous" schema={faqSchema} />
      <section className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <Link href={LINKS.home} className={`text-sm ${OFC_LINK}`}>
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            30 minutes en visio ou par téléphone pour cadrer votre projet de formation IA pour le BTP et
            obtenir un devis personnalisé.
          </p>
          <p className="mt-3 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <strong>À noter :</strong> les sessions OFC : présentiel uniquement · Île-de-France uniquement.
          </p>
          <p className="mt-4">
            <Link href={LINKS.formations} className={OFC_LINK}>
              Voir le catalogue formations IA BTP →
            </Link>
          </p>

          <div className="mt-10">
            <h2 className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Réservez votre créneau (30 min, gratuit)
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 md:text-lg">
              Choisissez votre horaire — confirmation immédiate par email.
            </p>
            <div className="mt-8">
              <CalendlyConsentInline campaign="prendre-rendez-vous-page" heightPx={720} />
            </div>
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes"
            subtitle="RDV gratuit, déroulement, créneaux."
          />

          <AllerPlusLoin
            links={[
              { href: LINKS.formations, label: 'Catalogue des formations' },
              { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
              { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
              { href: LINKS.blog, label: 'Articles et guides' },
              { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
              { href: LINKS.financement, label: 'Financement Constructys' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
