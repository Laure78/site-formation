import Link from 'next/link';
import {
  Check,
  Phone,
  Mail,
  Clock,
  MapPin,
  Users,
  FileText,
  Award,
  DollarSign,
  Layers,
  FileSearch,
  PenLine,
  Bot,
  FolderOpen,
  Map,
  Monitor,
  Shield,
} from 'lucide-react';
import { ProgrammeAccordionTP } from '@/components/formations/ProgrammeAccordionTP';
import { FAQSection } from '@/components/landing/FAQSection';
import { FormationPhotos } from '@/components/formations/FormationPhotos';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_TRAVAUX_PUBLICS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: "L'IA au service des Travaux Publics : DCE, CCTP & rapports",
  description:
    "Formation IA travaux publics : DCE, CCTP, rapports chantier en deux jours. Conducteurs TP. Finançable OPCO, note 4,85. Inscrivez votre équipe.",
  path: '/formations/ia-travaux-publics',
  keywords: [
    'formation IA travaux publics',
    'IA TP',
    'IA génie civil',
    'DCE travaux publics IA',
    'conducteur travaux IA',
    'rapport chantier IA',
    'ChatGPT travaux publics',
    'formation IA infrastructures',
  ],
});

const courseSchema = getCourseSchema({
  name: "L'IA au service des Travaux Publics",
  description: "Formation immersive 2 jours : maîtriser l'IA pour les Travaux Publics, analyser DCE/CCTP, rédiger rapports chantier, créer votre assistant IA métier. 100% finançable OPCO.",
  path: '/formations/ia-travaux-publics',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: "L'IA au service des Travaux Publics", path: '/formations/ia-travaux-publics' },
]);

const faqSchema = getFAQSchema(FAQ_TRAVAUX_PUBLICS);

const OBJECTIFS = [
  {
    icon: Layers,
    title: "Comprendre les fondamentaux de l'IA",
    desc: "Maîtriser les principes de l'IA générative et leurs impacts concrets sur les activités des Travaux Publics",
  },
  {
    icon: FileSearch,
    title: 'Analyser vos documents techniques',
    desc: "Automatiser l'analyse de DCE, CCTP, comptes rendus de chantier et dossiers techniques TP",
  },
  {
    icon: PenLine,
    title: 'Rédiger plus vite et mieux',
    desc: 'Produire des emails, notes, rapports techniques et réponses aux appels d\'offres avec l\'IA',
  },
  {
    icon: Bot,
    title: "Créer votre assistant IA métier",
    desc: 'Configurer et déployer un GPT personnalisé adapté à vos besoins TP : chantier, QSE, appels d\'offres',
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Maîtriser les enjeux éthiques et sécurité",
    desc: "Identifier les risques RGPD, biais algorithmiques et garantir la confidentialité des données chantier",
  },
  {
    icon: Map,
    title: "Cartographier vos opportunités IA",
    desc: "Identifier et prioriser les cas d'usage IA les plus pertinents pour votre entreprise de Travaux Publics",
  },
];

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: '2 jours (14 heures)',
    secondary: 'Modules cumulables ou indépendants',
  },
  {
    icon: MapPin,
    title: 'Format',
    primary: 'Présentiel ou distanciel',
    secondary: 'Dans vos locaux ou en visio',
  },
  {
    icon: Users,
    title: 'Public cible',
    primary: 'Dirigeants, conducteurs de travaux',
    secondary: 'Bureaux d\'études, responsables QSE, fonctions support TP',
  },
  {
    icon: FileText,
    title: 'Pré-requis',
    primary: 'Aucune compétence technique',
    secondary: 'Abonnement ChatGPT Teams recommandé',
  },
  {
    icon: Award,
    title: 'Certification',
    primary: 'Formation Qualiopi',
    secondary: 'Attestation de fin de formation',
  },
  {
    icon: DollarSign,
    title: 'Financement',
    primary: '100% finançable OPCO',
    secondary: 'Constructys, AKTO, OPCO EP',
  },
];

const LIVRABLES = [
  {
    icon: FolderOpen,
    title: 'Bibliothèque de prompts TP',
    desc: "Prompts optimisés pour l'analyse de DCE, la rédaction de rapports chantier, les réponses aux appels d'offres et la gestion QSE",
  },
  {
    icon: Bot,
    title: 'Assistant IA personnalisé opérationnel',
    desc: 'Votre GPT métier configuré et testé : assistant chantier, assistant QSE, assistant appels d\'offres ou assistant documentaire',
  },
  {
    icon: Map,
    title: 'Cartographie des opportunités IA',
    desc: "Analyse personnalisée de vos processus TP et identification des cas d'usage IA à fort impact pour votre entreprise",
  },
  {
    icon: Monitor,
    title: 'Accès plateforme en ligne',
    desc: 'Replays de la formation + ressources téléchargeables + mises à jour régulières des outils et pratiques IA',
  },
];

export default function FormationIATravauxPublicsPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <Link
                href="/formations"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                ← Retour au catalogue
              </Link>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                <span className="text-[var(--accent)]">L&apos;IA au service des Travaux Publics</span>
                {' '}: maîtriser les fondamentaux et créer son assistant IA métier
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Une formation immersive en 2 jours pour comprendre les usages de
                l&apos;intelligence artificielle dans les Travaux Publics et
                créer un assistant personnalisé adapté à vos besoins opérationnels
                : analyse documentaire, suivi chantier, QSE, appels d&apos;offres
                et communication.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#programme"
                  className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600"
                >
                  Voir le programme complet
                </a>
                <a
                  href="tel:+33695661818"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
                >
                  Nous appeler
                </a>
              </div>
            </div>
            <div className="w-full shrink-0 lg:w-[380px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="h-1 w-16 rounded-full bg-[var(--accent)]" />
                <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
                  Ce que vous allez maîtriser
                </h2>
                <ul className="mt-6 space-y-3">
                  {[
                    "Analyser automatiquement vos DCE, CCTP et comptes rendus de chantier",
                    "Rédiger emails, notes et rapports techniques avec l'IA",
                    "Créer votre assistant IA personnalisé pour les métiers TP",
                    "Optimiser la gestion QSE et le suivi de chantier",
                    "Générer et analyser vos appels d'offres plus efficacement",
                    "Maîtriser le prompt engineering appliqué aux Travaux Publics",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                        <Check size={14} strokeWidth={1.5} className="text-white" />
                      </span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs pédagogiques */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <FormationPhotos variant="travaux-publics" />
          
          <div className="mt-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Objectifs pédagogiques de la formation
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Une formation opérationnelle en 2 jours pour maîtriser l&apos;IA dans
              tous les aspects des métiers des Travaux Publics
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {OBJECTIFS.map((obj) => (
              <div
                key={obj.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <obj.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{obj.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{obj.desc}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices clés */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme détaillé */}
      <section id="programme" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            2 jours (14 heures) de formation intensive — modules combinables ou
            suivis séparément
          </p>
          <div className="mt-8 rounded-2xl border-2 border-[var(--accent-soft)] bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Un parcours en 2 modules complémentaires
            </h3>
            <p className="mt-3 text-slate-600">
              Les deux journées peuvent être suivies ensemble pour un parcours
              complet, ou de façon indépendante selon vos besoins et votre niveau.
              Chaque module est opérationnel dès le 1er jour.
            </p>
          </div>
          <ProgrammeAccordionTP />
        </div>
      </section>

      {/* Modalités pratiques */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Modalités pratiques
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODALITES.map((mod) => (
              <div
                key={mod.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <mod.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <p className="mt-1 font-medium text-slate-800">{mod.primary}</p>
                  <p className="mt-1 text-sm text-slate-600">{mod.secondary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livrables & Ressources */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Livrables & Ressources
          </h2>
          <p className="mt-3 text-slate-600">
            Vous repartez avec des outils opérationnels immédiatement utilisables
            sur vos chantiers
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_TRAVAUX_PUBLICS}
            title="Questions fréquentes — L'IA au service des Travaux Publics"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à intégrer l&apos;IA dans vos Travaux Publics ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise
            TP.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO à 100% possible. Formation sur-mesure adaptée à
            vos projets et vos métiers.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+33695661818"
              className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Phone size={20} strokeWidth={1.5} />
              Appeler maintenant
            </a>
            <Link
              href="/prendre-rdv"
              className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Mail size={20} strokeWidth={1.5} />
              Prendre RDV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
