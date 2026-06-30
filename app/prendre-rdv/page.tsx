import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_PRENDRE_RDV } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Formation IA pour le BTP — Réserver un RDV gratuit',
  description:
    'Formation IA pour le BTP : visio découverte 30 min gratuite. Calendly sécurisé, devis Qualiopi & Constructys.',
  path: '/prendre-rdv',
});

export default function PrendreRDVPage() {
  const faqSchema = getFAQSchema(FAQ_PRENDRE_RDV);

  return (
    <div className="min-h-[80vh]">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <section className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <Link
            href="/"
            className={`text-sm ${OFC_LINK}`}
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Échanger sur vos besoins
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            30 minutes en visio ou par téléphone pour cadrer votre projet formation IA BTP et obtenir un devis
            personnalisé.
          </p>
          <p className="mt-3 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <strong>À noter :</strong> les sessions OFC se déroulent exclusivement en présentiel en Île-de-France.
            Pas de distanciel pour la formation · pas de déplacement hors Île-de-France.
          </p>
          <p className="mt-4">
            <Link href="/formations" className={OFC_LINK}>
              Voir le catalogue formations IA BTP →
            </Link>
          </p>

          <div className="mt-10">
            <CalendlyEmbed
              type="inline"
              campaign="prendre-rdv-page"
              ctaPosition="inline"
              sectionTitle="Réservez votre créneau (30 min, gratuit)"
              sectionSubtitle="Choisissez votre horaire — confirmation immédiate par email."
              heightPx={720}
            />
          </div>

          <FAQSection
            items={FAQ_PRENDRE_RDV}
            title="Questions fréquentes"
            subtitle="RDV gratuit, déroulement, créneaux."
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
