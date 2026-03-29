import Link from 'next/link';
import { CalendlyBooking } from '@/components/booking/CalendlyBooking';
import { Devis60sBlock } from '@/components/Devis60sBlock';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_PRENDRE_RDV } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Réserver un RDV gratuit',
  description:
    'Réservez un RDV de 30 min pour votre formation IA BTP. Devis personnalisé. Basée à Guyancourt (78), j\'interviens en Île-de-France et partout en France. Formation finançable Constructys.',
  path: '/prendre-rdv',
});

export default function PrendreRDVPage() {
  const faqSchema = getFAQSchema(FAQ_PRENDRE_RDV);

  return (
    <div className="min-h-[80vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Réservez un créneau d&apos;environ 30 minutes pour discuter de votre projet de
            formation IA et obtenir un devis personnalisé. Le planning ci-dessous est
            géré via Calendly : choisissez le jour et l&apos;heure qui vous conviennent.
          </p>
          <p className="mt-4">
            <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
              Découvrir le catalogue des formations IA BTP →
            </Link>
          </p>

          <div className="mt-10">
            <CalendlyBooking />
          </div>

          {/* Backup : devis gratuit en 1 clic si pas de créneau */}
          <div className="mt-16">
            <Devis60sBlock placement="backup" />
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes sur le rendez-vous"
            subtitle="RDV gratuit, déroulement, créneaux disponibles."
          />

          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Catalogue des formations' },
              { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/blog', label: 'Articles et guides' },
              { href: '/diagnostic-ia-btp', label: 'Diagnostic IA BTP gratuit' },
              { href: '/tarifs', label: 'Tarifs et financement' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
