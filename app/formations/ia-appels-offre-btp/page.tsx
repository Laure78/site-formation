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
  FolderOpen,
  Bot,
  Monitor,
  Lock,
  Settings,
  LayoutTemplate,
} from 'lucide-react';

export const metadata = {
  title: "Répondre aux Appels d'Offres BTP avec l'IA — Laure Olivié",
  description:
    "Formation opérationnelle : analysez les DCE 5 fois plus vite, rédigez des mémoires techniques convaincants et optimisez vos chiffrages avec l'IA. Chargés d'affaires, bureaux d'études. 100% finançable OPCO.",
};

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: '1 journée (7 heures)',
    secondary: 'Format intensif et opérationnel — Adaptable selon vos besoins',
  },
  {
    icon: MapPin,
    title: 'Format',
    primary: 'Présentiel ou distanciel',
    secondary: 'Dans vos locaux ou en visio — Groupe jusqu\'à 12 personnes',
  },
  {
    icon: Users,
    title: 'Public cible',
    primary: 'Chargés d\'affaires BTP',
    secondary: 'Bureaux d\'études, Dirigeants d\'entreprises',
  },
  {
    icon: FileText,
    title: 'Pré-requis',
    primary: 'Connaissance du secteur BTP',
    secondary: 'Expérience en appels d\'offres — Aucune compétence technique IA',
  },
  {
    icon: Award,
    title: 'Certification',
    primary: 'Formation Qualiopi',
    secondary: 'Attestation de fin de formation — Supports pédagogiques inclus',
  },
  {
    icon: DollarSign,
    title: 'Financement',
    primary: '100% finançable OPCO',
    secondary: 'Constructys, AKTO, OPCO EP — Démarches simplifiées',
  },
];

const LIVRABLES = [
  {
    icon: FolderOpen,
    title: 'Bibliothèque de prompts spécialisés',
    desc: "Prompts optimisés pour l'analyse DCE, la rédaction de mémoires techniques, le chiffrage et les réponses aux critères d'évaluation",
  },
  {
    icon: LayoutTemplate,
    title: 'Templates de mémoires techniques',
    desc: 'Structures types par corps de métier (gros œuvre, second œuvre, CVC, électricité, plomberie, VRD)',
  },
  {
    icon: Settings,
    title: 'Workflows de traitement',
    desc: "Processus pas à pas pour analyser un DCE, structurer la réponse et finaliser le dossier de candidature",
  },
  {
    icon: Lock,
    title: 'Guide de sécurité RGPD',
    desc: "Documentation complète des bonnes pratiques pour protéger vos données confidentielles lors de l'utilisation de l'IA",
  },
  {
    icon: Bot,
    title: 'Assistant IA personnalisé',
    desc: 'GPT configuré spécifiquement pour vos types de projets BTP et vos méthodes de travail',
  },
  {
    icon: Monitor,
    title: 'Accès plateforme en ligne',
    desc: 'Replays de la formation + ressources téléchargeables + mises à jour régulières pendant 1 an',
  },
];

const PROGRAMME_POINTS = [
  'Création de templates réutilisables par type de projet',
  "Mise en place d'une bibliothèque de prompts spécialisés",
  "Organisation du processus de réponse aux AO dans l'entreprise",
  'Outils complémentaires et automatisations possibles',
  'Plan d\'action personnalisé pour chaque participant',
];

export default function FormationIAAppelsOffreBTPPage() {
  return (
    <div>
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
                Répondre aux{' '}
                <span className="text-[var(--accent)]">Appels d&apos;Offres</span>{' '}
                BTP avec l&apos;Intelligence Artificielle
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Analysez les DCE 5 fois plus vite, rédigez des mémoires techniques
                convaincants et optimisez vos chiffrages grâce à l&apos;IA.
                Formation opérationnelle pour entreprises du bâtiment, chargés
                d&apos;affaires et bureaux d&apos;études. Augmentez votre taux de
                réussite aux appels d&apos;offres.
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
                    "Analyser un DCE complet en 30 minutes au lieu de 3 heures",
                    "Extraire automatiquement toutes les exigences techniques",
                    "Structurer un mémoire technique convaincant",
                    "Générer des réponses aux critères d'évaluation",
                    "Optimiser le chiffrage avec l'IA",
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

      {/* Programme / Points clés */}
      <section id="programme" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            Une journée intensive pour maîtriser l&apos;IA dans vos réponses aux
            appels d&apos;offres BTP
          </p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <ul className="space-y-4">
              {PROGRAMME_POINTS.map((point) => (
                <li key={point} className="flex gap-4">
                  <span className="text-[var(--accent)]">►</span>
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
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
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LIVRABLES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à transformer votre approche des appels d&apos;offres ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise
            BTP.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO à 100% possible. Gagnez 5 heures sur chaque réponse
            aux appels d&apos;offres.
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
