import Link from 'next/link';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { createPageMetadata, getCourseSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA bâtiment PME — Devis, productivité',
  description:
    "Formation IA bâtiment pour PME. Automatiser devis, emails, administratif. Productivité sans embaucher. Formation finançable Constructys.",
  path: '/formations/ia-pme-btp',
});

const courseSchema = getCourseSchema({
  name: "Formation IA pour PME du BTP",
  description: "Programme sur-mesure pour les PME du bâtiment : devis, chiffrages, emails, comptes rendus. Optimisez votre temps avec l'IA sans embaucher. 100% finançable Constructys.",
  path: '/formations/ia-pme-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

export default function FormationIAPMEBTPPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Formation IA pour PME du BTP
      </h1>
      <p className="mt-6 text-slate-600">
        Programme sur-mesure pour les PME du bâtiment. Devis, chiffrages, emails,
        comptes rendus : optimisez votre temps avec l&apos;IA sans embaucher.
      </p>
      <Link
        href="/prendre-rdv"
        className="mt-10 inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Prendre RDV
      </Link>

      {/* Formation LinkedIn — solutions chantiers */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Ma formation LinkedIn : L&apos;IA pour le BTP, des solutions concrètes pour vos chantiers
        </h2>
        <p className="mt-2 text-slate-600">
          Découvrez mon approche terrain en vidéo — Laure Olivié, formatrice LinkedIn Learning.
        </p>
        <div className="mt-6">
          <LinkedInLearningEmbed course="chantiers" />
        </div>
        <a
          href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Voir la formation complète sur LinkedIn Learning →
        </a>
      </section>
    </div>
  );
}
