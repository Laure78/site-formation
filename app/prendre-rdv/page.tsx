import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_PRENDRE_RDV } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';

export const metadata = createPageMetadata({
  title: 'Formation IA pour le BTP — Réserver un RDV gratuit',
  description:
    "Réservez 30 min en ligne pour votre projet de formation IA pour le BTP. Calendly sécurisé, puis proposition chiffrée. Qualiopi. Ouvrez l'agenda.",
  path: '/prendre-rdv',
});

export default function PrendreRDVPage() {
  const faqSchema = getFAQSchema(FAQ_PRENDRE_RDV);

  return (
    <div className="min-h-[80vh]">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
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
            formation IA et obtenir un devis personnalisé.
          </p>
          <p className="mt-4">
            <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
              Découvrir le catalogue des formations IA pour les pro du BTP →
            </Link>
          </p>

          <div className="mt-10">
            <CalendlyEmbed
              type="inline"
              campaign="prendre-rdv-page"
              ctaPosition="inline"
              sectionTitle="Réservez votre visio découverte gratuite"
              sectionSubtitle="Choisissez votre créneau — confirmation immédiate par email."
              heightPx={720}
            />
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes sur le rendez-vous"
            subtitle="RDV gratuit, déroulement, créneaux disponibles."
          />

          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Catalogue des formations' },
              { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/blog', label: 'Articles et guides' },
              { href: '/diagnostic-ia-btp', label: 'Diagnostic IA BTP gratuit' },
              { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
