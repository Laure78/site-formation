import Link from 'next/link';
import { FileText, Mail, Calculator, Users } from 'lucide-react';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA bâtiment PME — Devis, productivité | Constructys',
  description:
    "PME du bâtiment : devis, emails et administratif avec l'IA sans surcharger les équipes. Formations 4 h à 7 h. Qualiopi, Constructys. Planifiez un diagnostic.",
  path: '/formations/ia-pme-btp',
  keywords: ['formation IA PME BTP', 'IA devis bâtiment', 'formation IA Constructys'],
});

const courseSchema = getCourseSchema({
  name: "Formation IA pour PME du BTP",
  description: "Programme sur-mesure pour les PME du bâtiment : devis, chiffrages, emails, comptes rendus. Optimisez votre temps avec l'IA sans embaucher. 100% finançable Constructys.",
  path: '/formations/ia-pme-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA pour PME du BTP', path: '/formations/ia-pme-btp' },
]);

const CAS_USAGE = [
  { icon: FileText, titre: 'Devis et chiffrages', desc: 'Générez des devis professionnels en 15 min au lieu de 2h. L\'IA structure les descriptifs et variantes ; vous gardez la maîtrise des prix.' },
  { icon: Mail, titre: 'Emails et relances', desc: 'Automatisez les emails clients, fournisseurs et sous-traitants. Ton professionnel adapté au BTP.' },
  { icon: Calculator, titre: 'Productivité sans embaucher', desc: 'Traitez plus de chantiers avec les mêmes effectifs. L\'IA libère du temps sur l\'administratif.' },
  { icon: Users, titre: 'Comptes rendus et coordination', desc: 'CR de chantier, rapports d\'avancement : l\'IA formalise vos notes en documents structurés.' },
];

const FAQ_PME = [
  {
    q: "Une PME du BTP peut-elle vraiment gagner en productivité avec l'IA ?",
    a: "Oui. Les PME formées rapportent 3 à 5h gagnées par semaine et par personne sur devis, emails et CR. La formation IA Constructys vous donne des trames prêtes à l'emploi.",
  },
  {
    q: "La formation IA PME est-elle finançable ?",
    a: "Oui. 100 % finançable par l'OPCO Constructys pour les entreprises du BTP de moins de 50 salariés. Coût pédagogique couvert jusqu'à 24€ HT/heure/stagiaire.",
  },
  {
    q: "Faut-il des compétences techniques ?",
    a: "Non. La formation est conçue pour des dirigeants et collaborateurs sans prérequis en informatique. On travaille sur vos vrais documents.",
  },
];

export default function FormationIAPMEBTPPage() {
  const faqSchema = getFAQSchema(FAQ_PME);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">Accueil</Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">Formations</Link>
        {' / '}
        <span className="text-slate-900">Formation IA PME BTP</span>
      </nav>
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Formation IA pour PME du BTP
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Programme sur-mesure pour les PME du bâtiment. Devis, chiffrages, emails,
        comptes rendus : optimisez votre temps avec l&apos;IA sans embaucher. La formation IA Constructys
        vous donne des outils opérationnels dès le lendemain.
      </p>
      <p className="mt-4 text-slate-600">
        Les PME du BTP perdent un temps précieux sur l&apos;administratif. L&apos;IA devis bâtiment
        et les outils comme ChatGPT permettent de gagner 3 à 5h par semaine par collaborateur,
        sans recruter. Notre formation est 100 % finançable par l&apos;OPCO Constructys.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Cas d&apos;usage : IA devis bâtiment et productivité PME
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
            <div key={titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQSection
        items={FAQ_PME}
        title="Questions fréquentes — Formation IA PME BTP"
        subtitle="Finançabilité, prérequis, gains de productivité."
      />

      <div className="mt-10">
        <Link
          href="/prendre-rdv"
          className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Prendre RDV pour un devis personnalisé
        </Link>
      </div>

      <div className="mt-12">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
            { href: '/financement-constructys', label: 'Financement Constructys' },
            { href: '/chatgpt-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          ]}
        />
      </div>

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
