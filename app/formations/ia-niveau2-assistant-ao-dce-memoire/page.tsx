import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { FileText, Bot, Target, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';

const LMS_SLUG = 'ia-niveau2-assistant-ao-dce-memoire';
const PDF_HREF =
  '/formations/ia-niveau2-assistant-ao-dce-memoire/Programme_Niveau2_IA_AO_Assistant_DCE_Memoire_Technique.pdf';

export const metadata = createPageMetadata({
  title:
    "NIVEAU 2 — IA & appels d'offres : assistant IA pour DCE et mémoire technique | Qualiopi",
  description:
    "Parcours LMS intermédiaire : créer son assistant IA pour analyser les DCE et rédiger des mémoires techniques. BTP, marchés publics. Qualiopi, OPCO Constructys.",
  path: '/formations/ia-niveau2-assistant-ao-dce-memoire',
  keywords: [
    'assistant IA DCE',
    'mémoire technique IA BTP',
    'formation IA appels offres niveau 2',
    'DCE intelligence artificielle',
    'Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: "NIVEAU 2 — L'IA appliquée aux AO : créer son assistant IA pour DCE et mémoire technique",
  description:
    "Parcours en ligne : assistant IA pour dossiers de consultation, mémoires techniques et réponses marchés BTP. Niveau intermédiaire. Finançable OPCO Constructys.",
  path: '/formations/ia-niveau2-assistant-ao-dce-memoire',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  {
    name: 'IA AO — Assistant DCE & mémoire (niveau 2)',
    path: '/formations/ia-niveau2-assistant-ao-dce-memoire',
  },
]);

const POINTS = [
  {
    icon: Bot,
    titre: 'Assistant IA sur mesure',
    desc: 'Concevoir un assistant dédié à vos DCE, critères et livrables mémoire technique.',
  },
  {
    icon: FileText,
    titre: 'DCE & mémoire',
    desc: 'Enchaîner analyse de pièces, structuration de la réponse et rédaction assistée.',
  },
  {
    icon: Target,
    titre: 'Niveau 2',
    desc: "Suite logique après sensibilisation IA ou formation appels d'offres (7 h).",
  },
];

const FAQ_N2 = [
  {
    q: 'En quoi ce parcours diffère de « Répondre aux appels d’offres BTP avec l’IA » ?',
    a: "La formation d'une journée pose les bases et les méthodes. Ce parcours LMS niveau 2 va plus loin sur la création d'un assistant IA dédié au traitement des DCE et à la mémoire technique, en autonomie sur la plateforme.",
  },
  {
    q: 'Quelle durée et quel niveau ?',
    a: 'Durée indicative : environ 7 h sur la plateforme, selon le rythme du groupe. Niveau intermédiaire : il est recommandé d’avoir déjà une pratique des AO et une première approche de l’IA.',
  },
  {
    q: 'Financement et Qualiopi ?',
    a: "La formation est éligible aux dispositifs habituels (notamment OPCO Constructys pour le BTP), sous réserve des règles applicables à votre entreprise. Organisme certifié Qualiopi.",
  },
];

export default function FormationIANiveau2AOAssistantPage() {
  const faqSchema = getFAQSchema(FAQ_N2);

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
        <span className="text-slate-900">IA AO — niveau 2</span>
      </nav>
      <p className="text-sm font-medium text-slate-500">Réf. catalogue BTP-07</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        NIVEAU 2 — L&apos;IA appliquée aux AO : créer son assistant IA pour DCE et mémoire technique
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Parcours en ligne sur la plateforme de formation : création et usage d&apos;un{' '}
        <strong>assistant IA</strong> pour les dossiers de consultation, la structuration des réponses et la
        rédaction de <strong>mémoires techniques</strong> — pour les équipes marchés et bureaux d&apos;études
        du BTP.
      </p>
      <p className="mt-4 text-slate-600">
        Durée indicative : <strong>7 h</strong> — niveau <strong>intermédiaire</strong>. Certification Qualiopi,
        financement possible via OPCO Constructys selon votre situation.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/cours/${LMS_SLUG}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Voir le cours sur la plateforme
          <ArrowRight size={20} strokeWidth={1.5} />
        </Link>
        <a
          href={PDF_HREF}
          download
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]"
        >
          Télécharger le programme (PDF)
        </a>
        <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]">
          Prendre rendez-vous
        </RdvLink>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Ce que vous allez traiter</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, titre, desc }) => (
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
        items={FAQ_N2}
        title="Questions fréquentes"
        subtitle="Parcours LMS, public et financement."
      />

      <div className="mt-10">
        <AllerPlusLoin />
      </div>
    </div>
  );
}
