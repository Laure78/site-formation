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
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_APPELS_OFFRE } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'IA pour répondre aux appels d\'offres BTP | Formation IA BTP',
  description:
    'Découvrez comment utiliser l\'intelligence artificielle pour analyser un CCTP, comprendre un DCE et rédiger un mémoire technique plus rapidement dans le BTP.',
  path: '/formations/ia-appels-offre-btp',
  keywords: [
    'IA appels d\'offres BTP',
    'mémoire technique BTP IA',
    'analyse CCTP IA',
    'répondre appel d\'offre travaux',
    'ChatGPT appels d\'offres BTP',
  ],
});

const courseSchema = getCourseSchema({
  name: "Répondre aux Appels d'Offres BTP avec l'IA",
  description: "Formation opérationnelle : analysez les DCE 5 fois plus vite, rédigez des mémoires techniques convaincants et optimisez vos chiffrages avec l'IA. 100% finançable OPCO.",
  path: '/formations/ia-appels-offre-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: "Répondre aux appels d'offres BTP avec l'IA", path: '/formations/ia-appels-offre-btp' },
]);

const faqSchema = getFAQSchema(FAQ_APPELS_OFFRE);

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
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Formation IA BTP : répondre aux{' '}
                <span className="text-[var(--accent)]">appels d&apos;offres</span>
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

      {/* Pourquoi les appels d'offres sont complexes */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi les appels d&apos;offres sont complexes pour les entreprises du BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Répondre à un appel d&apos;offres travaux mobilise des ressources considérables. Le DCE (Dossier de Consultation des Entreprises) peut compter plusieurs centaines de pages : CCTP, CCTG, pièces écrites, plans. Analyser l&apos;ensemble exige du temps et une méthodologie rigoureuse.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>DCE volumineux</strong> — Les cahiers des charges techniques et les pièces contractuelles représentent souvent des dizaines de documents à croiser. Identifier les exigences et les points de vigilance demande plusieurs heures.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Analyse du CCTP</strong> — Le Cahier des Clauses Techniques Particulières impose des prescriptions précises (DTU, normes, contrôles). Une lecture superficielle expose à des non-conformités et à des pénalités.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Contraintes administratives</strong> — Délais serrés, formulaires spécifiques, justificatifs obligatoires. La constitution du dossier peut représenter 20 à 30 % du temps total.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Rédaction du mémoire technique</strong> — Le mémoire doit démontrer votre capacité à réaliser le projet. Structure, argumentaire, références : chaque mot compte pour le jury.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Délais de réponse</strong> — Les maîtres d&apos;ouvrage imposent des dates limites strictes. Impossible de tout relire à la dernière minute. L&apos;anticipation et l&apos;organisation sont décisives.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Comment l'IA peut aider */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Comment l&apos;intelligence artificielle peut aider à analyser un appel d&apos;offre BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;IA générative (ChatGPT, Claude, etc.) ne remplace pas l&apos;expertise métier. Elle accélère les tâches répétitives et structure l&apos;information. Voici les usages concrets pour répondre à un appel d&apos;offre travaux.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">1</span>
              <span><strong>Analyser un DCE</strong> — Coller un extrait de DCE et demander une synthèse des exigences, des délais et des critères de sélection. L&apos;IA structure l&apos;information en quelques secondes.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">2</span>
              <span><strong>Résumer un CCTP</strong> — Identifier les points critiques, les prescriptions techniques et les points de vigilance. Utile pour le chiffrage et le planning.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">3</span>
              <span><strong>Identifier les exigences techniques</strong> — Lister les normes, DTU et contrôles requis. L&apos;IA extrait les références et les met en forme.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">4</span>
              <span><strong>Structurer un mémoire technique</strong> — Générer un plan adapté au projet, rédiger des paragraphes de synthèse et reformuler vos références. Gain de temps significatif.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">5</span>
              <span><strong>Analyser les critères de sélection</strong> — Comprendre le barème de notation et prioriser les éléments à valoriser dans votre dossier.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Exemple concret CCTP */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Exemple concret d&apos;analyse d&apos;un CCTP avec l&apos;IA
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Voici un prompt que vous pouvez utiliser directement avec ChatGPT ou un outil équivalent. Collez un extrait de votre CCTP et adaptez la demande à votre contexte.
          </p>
          <div className="mt-6 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
            <p className="font-semibold text-slate-900">Prompt à copier :</p>
            <blockquote className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-5 font-mono text-sm italic text-slate-700">
              {`Analyse ce CCTP et identifie :
1. les exigences techniques principales
2. les critères de sélection
3. les points de vigilance
4. les éléments à valoriser dans le mémoire technique

Présente une synthèse claire pour une PME du BTP.`}
            </blockquote>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            L&apos;IA produira une synthèse structurée en quelques secondes. Vous devrez ensuite relire et compléter avec votre expertise métier. Ne partagez jamais de données confidentielles ou nominatives dans ChatGPT public.
          </p>
        </div>
      </section>

      {/* Mémoire technique BTP */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Comment utiliser l&apos;IA pour rédiger un mémoire technique BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le mémoire technique est l&apos;élément qui différencie votre candidature. L&apos;IA vous aide à le construire plus rapidement sans sacrifier la qualité.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Génération de plan</strong> — Demandez à l&apos;IA de proposer une structure adaptée au type de projet (VRD, second œuvre, réhabilitation). Vous ajustez selon vos références.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Rédaction assistée</strong> — Fournissez vos éléments (chantiers similaires, équipements, méthodes) et l&apos;IA rédige les paragraphes. Vous corrigez et personnalisez.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Reformulation technique</strong> — Transformez vos notes en texte professionnel. Vocabulaire BTP, tournures adaptées aux marchés publics.</span>
            </li>
            <li className="flex gap-3">
              <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span><strong>Amélioration de la lisibilité</strong> — Clarifiez les phrases, structurez les listes, soignez les introductions et conclusions. L&apos;IA propose des formulations plus fluides.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Limites et précautions */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Limites et précautions
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;IA est un assistant puissant, mais elle ne remplace pas l&apos;expertise humaine. Voici les points de vigilance pour une utilisation responsable.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="text-[var(--accent)]">•</span>
              <span><strong>L&apos;IA ne remplace pas l&apos;expertise métier</strong> — Les décisions techniques, les chiffrages et la stratégie de réponse restent sous votre responsabilité.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--accent)]">•</span>
              <span><strong>Vérifier les informations générées</strong> — L&apos;IA peut inventer des références ou des normes. Toujours croiser avec les documents officiels.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--accent)]">•</span>
              <span><strong>Ne pas partager de données sensibles</strong> — Évitez de coller des DCE complets, des coordonnées clients ou des chiffres confidentiels dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise pour les données métier.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--accent)]">•</span>
              <span><strong>Utiliser l&apos;IA comme assistant</strong> — Elle accélère la mise en forme et la synthèse. Vous restez le garant de la pertinence et de la conformité.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bloc conversion Laure Olivié */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Formation IA pour les entreprises du BTP
            </h2>
            <p className="mt-4 text-slate-700">
              <strong>Laure Olivié</strong>, formatrice spécialisée en intelligence artificielle appliquée au BTP, accompagne les chargés d&apos;affaires, bureaux d&apos;études et dirigeants dans la maîtrise de l&apos;IA pour les appels d&apos;offres.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li className="flex gap-2">
                <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                Automatisation des tâches administratives
              </li>
              <li className="flex gap-2">
                <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                Analyse des appels d&apos;offres et des DCE
              </li>
              <li className="flex gap-2">
                <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                Génération de mémoires techniques et documents
              </li>
              <li className="flex gap-2">
                <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                Gain de temps mesurable dès la première semaine
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/diagnostic-ia-btp"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600"
              >
                Demander un diagnostic IA pour mon entreprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ressources pour les entreprises du BTP */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ressources pour les entreprises du BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Complétez votre compréhension des appels d&apos;offres BTP avec nos guides pratiques.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>
              <Link href="/blog/analyse-cctp-btp" className="text-[var(--accent)] font-medium hover:underline">
                Comment analyser un CCTP rapidement dans un appel d&apos;offre BTP
              </Link>
            </li>
            <li>
              <Link href="/blog/memoire-technique-btp-exemple" className="text-[var(--accent)] font-medium hover:underline">
                Exemple de mémoire technique BTP : structure et bonnes pratiques
              </Link>
            </li>
            <li>
              <Link href="/blog/repondre-appel-offre-travaux" className="text-[var(--accent)] font-medium hover:underline">
                Comment répondre à un appel d&apos;offre travaux : guide pour les PME du BTP
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-btp-analyse-dce" className="text-[var(--accent)] font-medium hover:underline">
                Comment utiliser l&apos;IA pour analyser un DCE dans le BTP
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-slate-600">
            Découvrez aussi : <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">catalogue formations IA BTP</Link>, <Link href="/formation-ia-btp-paris-2026" className="text-[var(--accent)] font-medium hover:underline">formation IA BTP Paris</Link>, <Link href="/clients-partenaires" className="text-[var(--accent)] font-medium hover:underline">clients et partenaires</Link>.
          </p>
        </div>
      </section>

      {/* Programme / Points clés */}
      <section id="programme" className="border-b border-slate-200 bg-white px-4 py-16">
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

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_APPELS_OFFRE}
            title="Questions fréquentes — Formation IA appels d'offres BTP"
          />
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
