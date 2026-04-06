import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
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
  ClipboardList,
  Laptop,
  Monitor,
  Building2,
} from 'lucide-react';
import { ProgrammeAccordionBatiment } from '@/components/formations/ProgrammeAccordionBatiment';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_BATIMENT } from '@/lib/faq';

const LMS_SLUG = 'ia-au-service-du-btp';

export const metadata = createPageMetadata({
  title: "L'IA au service du bâtiment — Devis, administratif, ChatGPT | Qualiopi",
  description:
    "Formation IA BTP 4 h ou 7 h : devis, emails, comptes rendus, administratif. Artisans et PME du bâtiment. Présentiel ou distanciel. Qualiopi, OPCO Constructys. BTP-01.",
  path: '/formations/ia-au-service-du-batiment',
  keywords: [
    'formation IA bâtiment',
    'ChatGPT BTP',
    'IA devis bâtiment',
    'formation IA artisans',
    'IA administratif BTP',
    'Qualiopi BTP',
    'Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: "L'IA au service du bâtiment",
  description:
    "Formation 4 h ou 7 h : identifier les usages IA utiles dans le BTP, accélérer devis et messages clients, structurer l'administratif, repartir avec trames et prompts. Finançable OPCO.",
  path: '/formations/ia-au-service-du-batiment',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: "L'IA au service du bâtiment", path: '/formations/ia-au-service-du-batiment' },
]);

const faqSchema = getFAQSchema(FAQ_BATIMENT);

const POINTS_MARQUANTS = [
  'Parcours catalogue BTP-01 : devis, emails, comptes rendus et administratif — prompts et trames prêts à l’emploi.',
  'Formats 4 h (condensé) ou 7 h (approfondissement et ateliers renforcés) — même socle pédagogique.',
  'Intervention en présentiel (vos locaux ou salle) ou en visioconférence — Qualiopi, financement OPCO Constructys selon éligibilité.',
];

const OBJECTIFS_FORMATION = [
  'Identifier les usages de l’IA générative utiles dans le bâtiment (sans prérequis technique).',
  'Accélérer la rédaction de devis, propositions et messages clients.',
  'Structurer l’administratif : comptes rendus, relances, modèles et check-lists.',
  'Repartir avec des trames, prompts et bonnes pratiques adaptés à votre métier.',
];

const PROFIL_APPRENANTS = [
  'Artisans, dirigeants et équipes de TPE / PME du bâtiment',
  'Conducteurs et chargés d’affaires',
  'Encadrement de chantier et techniciens',
  'Assistants administratifs et gestionnaires',
  'Commerciaux et relation client',
];

const MOYENS_PEDAGOGIQUES = [
  'Formation animée par une formatrice experte en IA appliquée au BTP, en présentiel ou à distance.',
  'Exercices guidés et cas concrets sur des situations types du bâtiment.',
  'Atelier sur vos documents réels (anonymisés ou fictifs si besoin).',
  'Supports pédagogiques et ressources téléchargeables selon la convention.',
];

const MOYENS_TECHNIQUES = [
  'À distance : visioconférence (Teams, Zoom, etc.) ; connexion stable et poste par participant.',
  'En présentiel : salle équipée, connexion internet, poste par apprenant si possible.',
  'Compte ChatGPT ou équivalent recommandé ; rappels RGPD et confidentialité des données en session.',
];

const MODALITES_EVALUATION = [
  'Mise en situation et exercices pratiques tout au long de la formation.',
  'Questionnaire de satisfaction en fin de session.',
  'Attestation de formation délivrée (organisme certifié Qualiopi).',
];

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: '4 h ou 7 h',
    secondary: 'Selon le format retenu : même programme, 7 h = plus d’ateliers',
  },
  {
    icon: MapPin,
    title: 'Format',
    primary: 'Présentiel ou distanciel',
    secondary: 'Dans vos locaux, en salle ou en visio',
  },
  {
    icon: Users,
    title: 'Public cible',
    primary: 'Entreprises du bâtiment et artisans',
    secondary: 'Voir encadré « Profil des apprenants » ci-dessous',
  },
  {
    icon: FileText,
    title: 'Pré-requis',
    primary: 'Aucune compétence technique en IA',
    secondary: 'Ordinateur et connexion internet — compte ChatGPT recommandé',
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
    secondary: 'Constructys, AKTO, OPCO EP selon éligibilité',
  },
];

const LIVRABLES = [
  {
    icon: FolderOpen,
    title: 'Trames et prompts',
    desc: 'Modèles de devis, emails, relances et courriers adaptés au vocabulaire BTP.',
  },
  {
    icon: Bot,
    title: 'Bibliothèque de prompts',
    desc: 'Prompts réutilisables par type de tâche (devis, CR, administratif).',
  },
  {
    icon: ClipboardList,
    title: 'Check-lists et méthode',
    desc: 'Repères pour relecture humaine, conformité et gain de temps mesurable.',
  },
  {
    icon: Monitor,
    title: 'Ressources de suivi',
    desc: 'Supports de formation et ressources selon modalités convenues avec l’organisme.',
  },
];

export default function FormationIAuServiceDuBatimentPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
                Réf. catalogue BTP-01 · Débutant
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                <span className="text-[var(--accent)]">L&apos;IA au service du bâtiment</span>
                {' '}
                : devis, administratif et relation client
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Formation pratique en <strong>4 h ou 7 h</strong> pour maîtriser ChatGPT et l&apos;IA
                générative sur vos enjeux quotidiens :{' '}
                <strong>devis, emails, comptes rendus et administratif</strong>, avec des trames et
                prompts prêts à l&apos;emploi — sans jargon inutile.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#programme"
                  className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600"
                >
                  Voir le programme détaillé
                </a>
                <Link
                  href={`/cours/${LMS_SLUG}`}
                  className="rounded-xl border-2 border-slate-200 px-8 py-4 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
                >
                  Voir sur la plateforme
                </Link>
                <a
                  href="tel:+33695661818"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
                >
                  Nous appeler
                </a>
              </div>
            </div>
            <div className="w-full shrink-0 lg:w-[380px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <Building2 size={22} strokeWidth={1.5} aria-hidden />
                  <h2 className="font-display text-lg font-bold text-slate-900">Points marquants</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {POINTS_MARQUANTS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Objectifs</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            À l&apos;issue de la formation, vous êtes en mesure de :
          </p>
          <ul className="mt-8 space-y-4">
            {OBJECTIFS_FORMATION.map((obj) => (
              <li
                key={obj}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Profil des apprenants */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Profil des apprenants</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROFIL_APPRENANTS.map((line) => (
              <li
                key={line}
                className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800"
              >
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme détaillé */}
      <section id="programme" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            <strong>4 h ou 7 h</strong> — quatre modules : devis et chiffrage, emails et relation
            client, comptes rendus et documentation chantier, gestion administrative. Le format 7 h
            développe les ateliers et la personnalisation sur vos cas.
          </p>
          <ProgrammeAccordionBatiment />
        </div>
      </section>

      {/* Modalités pratiques */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Modalités pratiques</h2>
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

      {/* Moyens pédagogiques & techniques */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Laptop size={22} strokeWidth={1.5} aria-hidden />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Moyens pédagogiques
                </h2>
              </div>
              <ul className="mt-6 space-y-3 text-slate-700">
                {MOYENS_PEDAGOGIQUES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Monitor size={22} strokeWidth={1.5} aria-hidden />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Moyens techniques
                </h2>
              </div>
              <ul className="mt-6 space-y-3 text-slate-700">
                {MOYENS_TECHNIQUES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modalités d'évaluation */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <ClipboardList size={24} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Modalités d&apos;évaluation
            </h2>
          </div>
          <ul className="mt-8 space-y-3 text-slate-700">
            {MODALITES_EVALUATION.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Livrables & Ressources */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Livrables & ressources</h2>
          <p className="mt-3 text-slate-600">
            Ce que vous repartez pour capitaliser après la formation — angle pratique et déploiement
            en entreprise.
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
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
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
            items={FAQ_BATIMENT}
            title="Questions fréquentes — L'IA au service du bâtiment"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à gagner du temps sur vos devis et votre administratif ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise du bâtiment.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO selon éligibilité. Formats 4 h ou 7 h selon vos enjeux.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+33695661818"
              className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Phone size={20} strokeWidth={1.5} />
              Appeler maintenant
            </a>
            <RdvLink className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10">
              <Mail size={20} strokeWidth={1.5} />
              Prendre RDV
            </RdvLink>
          </div>
        </div>
      </section>
    </div>
  );
}
