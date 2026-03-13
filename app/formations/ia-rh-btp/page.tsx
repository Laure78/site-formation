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
  Zap,
  Shield,
  BarChart3,
  Target,
  Bot,
  FolderOpen,
  Lock,
  Monitor,
} from 'lucide-react';
import { ProgrammeAccordion } from '@/components/formations/ProgrammeAccordion';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_RH_BTP } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP RH — Recrutement, GEPP | Constructys',
  description:
    "Formation IA fonction RH BTP. Recrutement, GEPP, tableaux de bord. 2 jours (14h). 100% finançable Constructys. DRH, chargés recrutement. Qualiopi.",
  path: '/formations/ia-rh-btp',
});

const courseSchema = getCourseSchema({
  name: "Formation IA pour la Fonction RH dans le BTP",
  description: "Formation opérationnelle 2 jours : automatiser le recrutement, optimiser la GEPP, créer des tableaux de bord RH et votre assistant IA. 100% finançable OPCO.",
  path: '/formations/ia-rh-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA pour la fonction RH BTP', path: '/formations/ia-rh-btp' },
]);

const faqSchema = getFAQSchema(FAQ_RH_BTP);

const OBJECTIFS = [
  {
    icon: Layers,
    title: 'Sélectionner les bons outils d\'IA',
    desc: 'Choisir les solutions d\'IA générative et analytique adaptées à vos besoins RH spécifiques dans le BTP',
    color: 'text-blue-600',
  },
  {
    icon: Zap,
    title: 'Automatiser les tâches RH stratégiques',
    desc: 'Gagner du temps sur le recrutement, la formation, le reporting RH et l\'administration du personnel',
    color: 'text-amber-600',
  },
  {
    icon: Shield,
    title: 'Identifier les risques éthiques et juridiques',
    desc: 'Maîtriser les enjeux RGPD, biais algorithmiques et conformité légale de l\'IA en RH',
    color: 'text-violet-600',
  },
  {
    icon: BarChart3,
    title: 'Créer des tableaux de bord RH',
    desc: 'Piloter vos activités RH avec des indicateurs clés : recrutement, turnover, formation, absentéisme',
    color: 'text-emerald-600',
  },
  {
    icon: Target,
    title: 'Intégrer l\'IA dans la GEPP',
    desc: 'Anticiper les compétences futures, cartographier les talents et piloter la gestion prévisionnelle',
    color: 'text-rose-600',
  },
  {
    icon: Bot,
    title: 'Construire un assistant IA RH',
    desc: 'Créer des GPTs personnalisés pour le recrutement, la formation et le pilotage RH',
    color: 'text-blue-700',
  },
];

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: '2 jours (14 heures)',
    secondary: 'Formation intensive et opérationnelle',
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
    primary: 'DRH, Chargés de recrutement',
    secondary: 'Responsables RH, Assistants RH · BTP',
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
    secondary: 'Constructys, AKTO, OPCO',
  },
];

const LIVRABLES = [
  {
    icon: FolderOpen,
    title: 'Bibliothèque de prompts RH BTP',
    desc: 'Prompts optimisés pour la GEPP, le recrutement BTP, les entretiens professionnels, la communication interne et les KPI RH',
  },
  {
    icon: Bot,
    title: 'GPTs personnalisés',
    desc: 'Assistant recrutement BTP, assistant manager, assistant formation, assistant rédacteur, assistant community manager',
  },
  {
    icon: Lock,
    title: 'ChatGPT Teams recommandé',
    desc: 'Sécurité renforcée pour la confidentialité des données RH et la conformité RGPD',
  },
  {
    icon: Monitor,
    title: 'Accès plateforme en ligne',
    desc: 'Replays de la formation + ressources téléchargeables + mises à jour régulières',
  },
];

export default function FormationIARHBTPPage() {
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
      {/* Hero — 2 colonnes */}
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
                Formation IA pour la{' '}
                <span className="text-[var(--accent)]">Fonction RH</span> dans le
                BTP
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Transformez votre fonction RH avec l&apos;intelligence artificielle.
                Automatisez le recrutement, optimisez la GEPP, générez vos
                tableaux de bord RH et créez votre assistant IA personnalisé.
                Formation sur-mesure pour les DRH, chargés de recrutement et
                responsables RH du secteur BTP.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#programme" className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600">
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
                    'Automatiser le recrutement et la sélection de candidats',
                    'Créer des plans de formation personnalisés avec l\'IA',
                    'Piloter la GEPP et anticiper les compétences',
                    'Générer des tableaux de bord RH opérationnels',
                    'Construire un assistant IA RH sur-mesure',
                    'Optimiser la communication interne RH',
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
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Objectifs pédagogiques de la formation
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Une formation opérationnelle en 2 jours pour maîtriser l&apos;IA dans
            tous les aspects de la fonction RH du BTP
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTIFS.map((obj) => (
              <div
                key={obj.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] ${obj.color}`}>
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

      {/* Programme détaillé */}
      <section id="programme" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            2 jours (14 heures) de formation intensive en présentiel ou distanciel
          </p>

          <ProgrammeAccordion />
        </div>
      </section>

      {/* Livrables & Ressources */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Livrables & Ressources
          </h2>
          <p className="mt-3 text-slate-600">
            Vous repartez avec des outils opérationnels immédiatement utilisables
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
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

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_RH_BTP}
            title="Questions fréquentes — Formation IA fonction RH BTP"
          />
        </div>
      </section>

      {/* Formation LinkedIn — recrutement BTP */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Ma formation LinkedIn Learning sur le recrutement
          </h2>
          <p className="mt-3 text-slate-600">
            « L&apos;IA pour les artisans et TPE : Recruter sa main-d&apos;œuvre efficacement » —
            une formation complémentaire pour automatiser vos process RH.
          </p>
          <div className="mt-8">
            <LinkedInLearningEmbed />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à transformer votre fonction RH avec l&apos;IA ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise
            BTP.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO à 100% possible.
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
