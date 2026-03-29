import Link from 'next/link';
import { BookOpen, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const LMS_SLUG = 'formation-ia-sensibilisation-prompt-engineering-assistants';

export const metadata = createPageMetadata({
  title: "Sensibilisation à l'IA & assistants personnalisés — Formation LMS BTP",
  description:
    "Parcours en ligne : sensibilisation à l'IA, banque de prompts par métier (Excel), conception d'assistants IA sur mesure. 8h, niveau intermédiaire. Qualiopi, OPCO Constructys.",
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  keywords: [
    'sensibilisation IA BTP',
    'formation assistants IA personnalisés',
    'prompts par métier BTP',
    'formation IA en ligne',
    'Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: "Sensibilisation à l'IA & Assistants IA personnalisés",
  description:
    "Parcours LMS en trois volets : sensibilisation à l'IA, ressource prompts par métier, assistants IA personnalisés. 100% finançable Constructys.",
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  {
    name: "Sensibilisation à l'IA & assistants IA",
    path: '/formations/sensibilisation-ia-assistants-personnalises',
  },
]);

const PARTIES = [
  {
    icon: BookOpen,
    titre: "Sensibilisation à l'IA",
    desc: "Modules 1 et 2 : comprendre l'IA générative et ses usages terrain, supports PDF.",
  },
  {
    icon: Sparkles,
    titre: 'Prompts par métier',
    desc: 'Ressource Excel : banque de prompts adaptés à votre corps de métier (version mise à jour).',
  },
  {
    icon: Layers,
    titre: 'Assistants IA personnalisés',
    desc: 'Module 3 : concevoir et paramétrer vos assistants sur mesure.',
  },
];

const FAQ_SENSIB = [
  {
    q: 'Cette formation est-elle la même que sur la plateforme de formation ?',
    a: "Oui. Le titre affiché sur le LMS est « Formation IA : Sensibilisation à l'IA & Assistants IA Personnalisés ». Vous accédez au parcours complet depuis la page du cours une fois inscrit.",
  },
  {
    q: 'Combien de temps dure le parcours ?',
    a: 'Environ 8 heures au total (durée indicative), en autonomie sur la plateforme, avec PDF et ressource Excel.',
  },
  {
    q: 'Est-ce finançable par mon OPCO ?',
    a: "Oui, les entreprises du BTP peuvent mobiliser l'OPCO Constructys selon les règles en vigueur. Contactez-nous pour un devis et une convention adaptés.",
  },
];

export default function SensibilisationIAAssistantsPage() {
  const faqSchema = getFAQSchema(FAQ_SENSIB);

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
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Sensibilisation à l&apos;IA & assistants IA</span>
      </nav>
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Sensibilisation à l&apos;IA & Assistants IA personnalisés
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Parcours en ligne sur la plateforme de formation : sensibilisation à l&apos;IA, prompts par métier
        (Excel), puis conception d&apos;assistants IA sur mesure. Pensé pour les professionnels du BTP qui
        veulent des contenus opérationnels, pas de la théorie creuse.
      </p>
      <p className="mt-4 text-slate-600">
        Durée indicative : <strong>8 h</strong> — niveau <strong>intermédiaire</strong>. Certification
        Qualiopi, financement possible via OPCO Constructys selon votre situation.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/cours/${LMS_SLUG}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Voir le cours sur la plateforme
          <ArrowRight size={20} strokeWidth={1.5} />
        </Link>
        <Link
          href="/prendre-rdv"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]"
        >
          Prendre rendez-vous
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Les trois volets du parcours</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {PARTIES.map(({ icon: Icon, titre, desc }) => (
            <div
              key={titre}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
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
        items={FAQ_SENSIB}
        title="Questions fréquentes"
        subtitle="Plateforme LMS, durée et financement."
      />

      <div className="mt-10">
        <AllerPlusLoin />
      </div>
    </div>
  );
}
