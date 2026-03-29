import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_PRENDRE_RDV } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Réserver un RDV gratuit',
  description:
    "Réservez 30 minutes en ligne pour discuter formation IA BTP. Calendly sécurisé, puis proposition chiffrée. Qualiopi, Constructys. Ouvrez l'agenda maintenant.",
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
            formation IA et obtenir un devis personnalisé. Cliquez sur le bouton
            ci-dessous pour ouvrir l&apos;agenda en ligne (Calendly) et choisir votre
            créneau.
          </p>
          <p className="mt-4">
            <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
              Découvrir le catalogue des formations IA BTP →
            </Link>
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-[var(--accent-soft)] p-8">
            <p className="text-center text-sm font-medium text-slate-700">
              Prise de rendez-vous en ligne
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={CALENDLY_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-600"
              >
                <ExternalLink size={20} strokeWidth={1.5} aria-hidden />
                Réserver sur Calendly
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Le lien s&apos;ouvre dans un nouvel onglet — service sécurisé Calendly.
            </p>
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes sur le rendez-vous"
            subtitle="RDV gratuit, déroulement, créneaux disponibles."
          />

          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Catalogue des formations' },
              { href: '/chatgpt-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/blog', label: 'Articles et guides' },
              { href: '/diagnostic-ia-btp', label: 'Diagnostic IA BTP gratuit' },
              { href: '/financement-constructys', label: 'Financement Constructys' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
