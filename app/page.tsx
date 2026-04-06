import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import {
  Video,
  FileText,
  Award,
  Clock,
  Zap,
  Target,
  Users,
  Check,
  Phone,
  Calendar,
  Mail,
  GraduationCap,
  CircleDollarSign,
  Rocket,
  HeartHandshake,
  LineChart,
  Sparkles,
  ShieldCheck,
  ArrowDown,
  X,
  Building2,
} from 'lucide-react';
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { ContactDirect } from '@/components/landing/ContactDirect';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { GoogleReviewsSection } from '@/components/landing/GoogleReviewsSection';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import Image from 'next/image';
import { getFAQSchema, createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_ITEMS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { LinkedInFormationGallery } from '@/components/landing/LinkedInFormationGallery';
import { EtudeCasClientsSection } from '@/components/landing/EtudeCasClientsSection';
import { PourQuiSection } from '@/components/landing/PourQuiSection';
import { ArticlesFormationLies } from '@/components/landing/ArticlesFormationLies';
import { FFBIAAccrocheSection } from '@/components/landing/FFBIAAccrocheSection';
import { CSFE_NOM_COMPLET, CSFE_NOM_LIBRE } from '@/lib/csfe';

/** Fiche officielle OFC — Annuaire des Entreprises (réf. Qualiopi / vérification) */
const ANNUAIRE_ENTREPRISES_OFC_URL =
  'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP & ChatGPT entreprise | Devis, chantier, admin',
  description:
    "Formation IA BTP & ChatGPT : devis, chantier, mémoires techniques. Référence FFB & CSFE, Qualiopi, financement Constructys. Laure Olivié — +1592 professionnels formés. Réservez un échange gratuit.",
  path: '/',
});

export default function HomePage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div>
      {/* FAQPage JSON-LD pour GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero — Formation IA BTP */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232563eb\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-70" />
        {/* Réseau léger type « constellation » (inspiration landing pro) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden
        >
          <svg className="absolute left-1/2 top-0 h-[min(520px,75vh)] w-[min(900px,100%)] -translate-x-1/2" viewBox="0 0 400 280" fill="none">
            <defs>
              <linearGradient id="heroMesh" x1="200" y1="0" x2="200" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M40 120 L120 60 L200 100 L280 40 L360 90 M120 60 L120 180 M200 100 L200 220 M280 40 L280 160 M40 120 L80 200 M360 90 L320 200"
              stroke="url(#heroMesh)"
              strokeWidth="0.75"
            />
            {[
              [120, 60],
              [200, 100],
              [280, 40],
              [40, 120],
              [360, 90],
              [120, 180],
              [200, 220],
              [280, 160],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill="#2563eb" fillOpacity="0.35" />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-[var(--accent)] shadow-sm backdrop-blur-sm">
                <Sparkles size={16} strokeWidth={1.5} className="shrink-0" />
                <span>Formation IA × BTP</span>
                <span className="hidden text-slate-300 sm:inline">·</span>
                <span className="hidden sm:inline">Qualiopi · Constructys</span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Formez vos équipes{' '}
                <span className="font-serif italic text-slate-800">BTP</span> à{' '}
                <span className="font-serif italic text-[var(--accent)]">l&apos;IA</span>
                <span className="mt-3 block text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                  Devis, chantier &amp; administratif avec ChatGPT
                </span>
              </h1>
              <p className="mt-4 text-base font-medium text-slate-700">
                {SITE_CONFIG.statsPersonnesFormees}+ professionnels accompagnés · Note 4,85/5 ·
                Financement OPCO
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                Formation ChatGPT entreprise BTP finançable par Constructys — pour les
                dirigeants de TPE et PME du bâtiment et des travaux publics. Gagnez{' '}
                <span className="font-semibold text-slate-900">3 à 5 heures par semaine</span>{' '}
                sur l&apos;automatisation des tâches administratives, l&apos;IA devis
                bâtiment et l&apos;IA gestion chantier (emails, chiffrages, comptes rendus).
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <RdvLink className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600">
                  Organiser une formation
                </RdvLink>
                <Link
                  href="#programme"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  Voir le programme
                </Link>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { val: String(SITE_CONFIG.statsPersonnesFormees), label: 'PERSONNES FORMÉES' },
                  { val: '100%', label: 'FINANÇABLE OPCO' },
                  { val: '4,85/5', label: 'NOTE MOYENNE' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-[var(--accent)] md:text-3xl">
                      {stat.val}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 lg:w-80">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={PHOTOS.interventionClaude.src}
                  alt={PHOTOS.interventionClaude.alt}
                  width={PHOTOS.interventionClaude.width}
                  height={PHOTOS.interventionClaude.height}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problème → solution (scan rapide) */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Le BTP perd des heures sur des tâches que l&apos;IA{' '}
            <span className="font-serif italic text-[var(--accent)]">automatise</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                problem: 'Mémoires techniques et dossiers chronophages',
                solution: 'Trames et IA : rédigez l’essentiel en minutes, vous validez.',
              },
              {
                problem: 'Analyse de CCTP / DCE fastidieuse',
                solution: 'L’IA extrait critères et points clés pour structurer votre réponse.',
              },
              {
                problem: 'Comptes rendus et emails répétitifs',
                solution: 'Dictez ou notez : l’IA structure un CR ou un mail pro.',
              },
            ].map(({ problem, solution }) => (
              <div
                key={problem}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-center shadow-sm"
              >
                <div className="flex items-start justify-center gap-3 text-left">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"
                    aria-hidden
                  >
                    <X size={14} strokeWidth={2.5} />
                  </span>
                  <p className="text-sm font-medium text-slate-800">{problem}</p>
                </div>
                <div className="my-4 flex justify-center text-[var(--accent)]">
                  <ArrowDown size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <div className="flex items-start justify-center gap-3 text-left">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white"
                    aria-hidden
                  >
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <p className="text-sm text-slate-600">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 cas d'usage — fond lavande */}
      <section className="border-b border-slate-200 bg-[#eef2ff] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold text-slate-900 md:text-4xl">
            5 cas d&apos;usage concrets de l&apos;IA dans le{' '}
            <span className="font-serif italic">BTP</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Approches testées en formation avec des professionnels du bâtiment et des travaux
            publics — devis, chantier, réponses marchés.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Mémoires techniques & dossiers',
                desc: "Structurer et rédiger plus vite tout en gardant la validation métier.",
              },
              {
                title: 'Analyse CCTP / DCE',
                desc: 'Synthétiser des pièces longues et repérer les exigences clés.',
              },
              {
                title: 'Comptes rendus de chantier',
                desc: 'À partir de notes ou dictée : CR clair et professionnel.',
              },
              {
                title: 'Devis et chiffrage',
                desc: 'Mise en forme, variantes et relecture pour gagner du temps.',
              },
              {
                title: 'Emails & administratif',
                desc: 'Relances, courriers et priorités pour souffler sur la boîte mail.',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/80 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/ressources/ia-btp/10-cas-usage-concrets"
              className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              Voir le détail des 10 cas d&apos;usage
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Référence clients — bande sombre */}
      <section className="border-b border-slate-200 bg-slate-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                Référence & partenaires
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                FFB, GERESO… des acteurs du BTP qui font confiance à une
                formation terrain
              </h2>
              <p className="mt-4 text-slate-300">
                Interventions auprès de fédérations, organismes et entreprises du bâtiment et
                des travaux publics : toujours des cas d&apos;usage concrets (devis, chantier,
                marchés), pas de gadget.
              </p>
              <Link
                href="/a-propos#clients-partenaires"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Voir les clients & partenaires
              </Link>
            </div>
            <div className="flex w-full flex-col gap-6 lg:max-w-md">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800 sm:h-52">
                <Image
                  src="/images/ffb-espaces-accueil.png"
                  alt="Espaces d’accueil FFB — environnement professionnel formation et réseau bâtiment"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <div className="grid shrink-0 grid-cols-3 gap-3 sm:gap-4">
                {[
                  { val: `+${SITE_CONFIG.statsPersonnesFormees}`, label: 'personnes formées' },
                  { val: '4,85/5', label: 'note moyenne' },
                  { val: '100%', label: 'finançable OPCO' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-slate-800/80 px-3 py-4 text-center sm:px-5 sm:py-5"
                  >
                    <p className="text-xl font-bold text-cyan-300 sm:text-2xl md:text-3xl">{s.val}</p>
                    <p className="mt-1 text-[0.65rem] text-slate-400 sm:text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FFBIAAccrocheSection />

      {/* Étude de cas clients — FFB / CSFE (preuve B2B) */}
      <EtudeCasClientsSection />

      {/* Gains concrets — Pourquoi l'IA change le quotidien */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <Zap size={16} strokeWidth={1.5} />
            <span>GAINS CONCRETS</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Pourquoi l&apos;IA change le quotidien des entreprises du BTP
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            L&apos;IA pour gestion administrative BTP permet d&apos;automatiser devis bâtiment
            et emails en quelques clics. Les professionnels du BTP perdent un temps précieux
            sur des tâches répétitives ; l&apos;IA vous recentre sur le chantier.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Clock,
                title: 'Trop de temps sur les devis',
                desc: "Un devis détaillé prend 2h à 4h à rédiger. Avec l'IA, vous passez à 15 minutes chrono tout en gardant la qualité professionnelle.",
              },
              {
                icon: FileText,
                title: "Les appels d'offres prennent des heures",
                desc: "Analysez un DCE, structurez votre mémoire technique et rédigez une réponse convaincante 5 fois plus rapidement.",
              },
              {
                icon: FileText,
                title: "Les comptes rendus ne sont jamais faits",
                desc: "Générez automatiquement vos CR, rapports d'avancement et fiches de suivi depuis vos notes vocales.",
              },
              {
                icon: Mail,
                title: "Trop d'emails à gérer",
                desc: "Rédigez vos emails clients, fournisseurs et sous-traitants en quelques secondes avec le bon ton professionnel.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PourQuiSection />

      <ArticlesFormationLies />

      {/* Bénéfices — fond bleu */}
      <section className="bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl font-bold text-white md:text-4xl">
            Les bénéfices de se former à l&apos;IA dans le BTP
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CircleDollarSign,
                title: 'Augmentez votre rentabilité',
                desc: "Réduisez vos coûts administratifs de 30 à 40 %. Répondez à plus d'appels d'offres avec les mêmes ressources.",
              },
              {
                icon: Rocket,
                title: 'Gagnez en réactivité commerciale',
                desc: "Répondez aux devis en 15 minutes au lieu de 2 jours. Augmentez votre taux de transformation de 25 %.",
              },
              {
                icon: HeartHandshake,
                title: 'Fidélisez vos équipes',
                desc: "Libérez vos collaborateurs des tâches répétitives. Réduisez le turnover grâce à des conditions modernisées.",
              },
              {
                icon: LineChart,
                title: 'Développez votre CA sans embaucher',
                desc: "Traitez 50 % de chantiers supplémentaires avec les mêmes effectifs. Optimisez vos marges.",
              },
              {
                icon: Sparkles,
                title: 'Professionnalisez votre image',
                desc: "Démarquez-vous par votre rapidité. Proposez des documents ultra-professionnels.",
              },
              {
                icon: ShieldCheck,
                title: 'Sécurisez vos process',
                desc: "Standardisez vos documents. Assurez la traçabilité complète. Réduisez les litiges.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30"
              >
                <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center" aria-hidden>
                  <span className="benefit-icon-halo absolute -inset-1 z-0 rounded-2xl opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <span className="benefit-icon-plate absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/25" />
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover/card:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme modulaire — fond blanc */}
      <section id="programme" className="border-b border-slate-200 bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>PROGRAMME MODULAIRE</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            Formation modulaire adaptée aux besoins de votre entreprise BTP. De 4h à
            14h selon vos objectifs.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: 1,
                title: 'Devis & chiffrage avec l\'IA',
                items: [
                  'Créez des devis professionnels en 15 min',
                  'Ajustez les prix selon vos marges',
                  'Calculez automatiquement la rentabilité',
                  'Générez des variantes en un clic',
                ],
              },
              {
                n: 2,
                title: "Réponses aux appels d'offres",
                items: [
                  'Analysez un DCE rapidement',
                  'Structurez votre mémoire technique',
                  'Rédigez une proposition convaincante',
                  'Sécurisez la confidentialité des données',
                ],
              },
              {
                n: 3,
                title: 'Comptes rendus et DOE',
                items: [
                  'Générez vos CR de chantier automatiquement',
                  'Structurez vos DOE',
                  "Créez des rapports d'avancement",
                  'Documentez vos réunions de chantier',
                ],
              },
              {
                n: 4,
                title: 'Gestion des emails & relation client',
                items: [
                  'Rédigez vos emails professionnels',
                  'Créez des modèles de relances',
                  'Gérez les réclamations clients',
                  'Communiquez avec les fournisseurs',
                ],
              },
            ].map((mod) => (
              <div
                key={mod.n}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">
                  {mod.n}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{mod.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {mod.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--accent)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <Video size={16} strokeWidth={1.5} />
              <span>LINKEDIN LEARNING</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
              L&apos;IA pour recruter dans le BTP — aperçu LinkedIn Learning
            </h3>
            <p className="mt-3 text-slate-600">
              Pour les <strong>artisans et TPE</strong> du bâtiment : annonces, tri de CV, entretiens, fidélisation.
              Visionnez l&apos;introduction du cours{' '}
              <strong>
                L&apos;IA pour les artisans et TPE&nbsp;: Recruter sa main-d&apos;œuvre efficacement
              </strong>{' '}
              ci-dessous, ou suivez-le en intégralité sur{' '}
              <a
                href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                LinkedIn Learning
              </a>
              .
            </p>
            <div className="mt-6">
              <LinkedInLearningEmbed course="recrutement" />
            </div>
            <div className="mt-10">
              <p className="text-sm font-medium text-slate-700">
                Aperçus du cours (LinkedIn Learning) — même esthétique pro que les
                sessions en entreprise
              </p>
              <div className="mt-4">
                <LinkedInFormationGallery
                  keys={[
                    'formatriceLowerThird',
                    'linkedinPlayerRecrutement',
                    'linkedinSommaireCours',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue formations */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>FORMATIONS IA BTP</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Nos formations IA spécialisées BTP
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Formations IA finançables Qualiopi / OPCO — présentiel et distanciel.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                ref: 'BTP-01',
                level: 'DÉBUTANT',
                title: "L'IA au service du bâtiment",
                href: '/#programme',
                duree: '4h ou 7h',
                effectif: '12 max',
                objectifs: [
                  'Identifier les usages IA utiles dans le BTP',
                  'Accélérer la rédaction de devis et messages clients',
                  "Structurer l'administratif (CR, relances, modèles)",
                  "Repartir avec des trames et prompts prêts à l'emploi",
                ],
              },
              {
                ref: 'BTP-04',
                level: 'DÉBUTANT',
                title: "L'IA au service des Travaux Publics",
                href: '/formations/ia-travaux-publics',
                duree: '2 jours (14h)',
                effectif: '12 max',
                objectifs: [
                  'Analyser DCE, CCTP et comptes rendus chantier',
                  "Rédiger rapports et réponses appels d'offres",
                  'Créer votre assistant IA métier TP',
                ],
              },
              {
                ref: 'BTP-05',
                level: 'DÉBUTANT',
                title: "Sensibilisation à l'IA & Assistants IA personnalisés",
                href: '/formations/sensibilisation-ia-assistants-personnalises',
                duree: '8h (parcours LMS)',
                effectif: 'Selon session',
                objectifs: [
                  "Sensibilisation à l'IA et usages terrain (supports PDF)",
                  'Banque de prompts par métier (Excel)',
                  'Concevoir des assistants IA personnalisés',
                  'Parcours sur la plateforme de formation — Qualiopi, OPCO Constructys',
                ],
              },
            ].map((cours) => (
              <div
                key={cours.ref}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-slate-500">RÉF: {cours.ref}</span>
                  <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    {cours.level}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
                  {cours.title}
                </h3>
                <div className="mt-4 flex gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} strokeWidth={1.5} />
                    {cours.duree}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} strokeWidth={1.5} />
                    {cours.effectif}
                  </span>
                </div>
                <p className="mt-4 font-semibold text-slate-900">
                  OBJECTIFS PÉDAGOGIQUES
                </p>
                <ul className="mt-2 flex-1 space-y-2">
                  {cours.objectifs.map((obj) => (
                    <li key={obj} className="flex gap-2 text-sm text-slate-600">
                      <Check size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                      {obj}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cours.href}
                  className="mt-6 block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Voir le programme
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/formations"
              className="text-[var(--accent)] font-medium hover:underline"
            >
              Voir tout le catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* Financement Constructys */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>FINANCEMENT</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Formation finançable par Constructys
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Cette formation peut être{' '}
            <span className="font-semibold text-[var(--accent)]">
              prise en charge à 100% par Constructys
            </span>{' '}
            dans le cadre du Plan de Développement des Compétences 2026 pour les
            entreprises de moins de 50 salariés.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Award,
                title: '100% finançable',
                desc: "Coût pédagogique pris en charge à hauteur de 24€ HT/heure/stagiaire. Sessions intra : 840€ HT/jour maximum.",
              },
              {
                icon: Target,
                title: 'Salaires remboursés',
                desc: 'Pour les entreprises de moins de 11 salariés : 15€ HT/heure/stagiaire. Éligible si formation « gestion d\'entreprise ».',
              },
              {
                icon: Check,
                title: 'Certification Qualiopi',
                desc: "Organisme certifié Qualiopi. Démarches administratives simplifiées. Accompagnement complet pour monter le dossier.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/financement-constructys"
              className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Tout savoir sur le financement Constructys
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Laure Olivié */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="shrink-0 w-full space-y-4 sm:w-80 lg:w-96">
              <ProfilePhoto />
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <Image
                    src="/images/laure-olivie-linkedin-graz.png"
                    alt="Laure Olivié — événement LinkedIn Graz, formatrice IA BTP"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 180px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <Image
                    src="/images/laure-olivie-linkedin-studio.png"
                    alt="Laure Olivié — tournage LinkedIn Learning, formation IA pour le BTP"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 180px"
                  />
                </div>
              </div>
              <p className="text-center text-xs text-slate-500">
                LinkedIn Learning &amp; événements professionnels
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>VOTRE FORMATRICE</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
                Pourquoi choisir Laure Olivié ?
              </h2>
              <blockquote className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-6 text-[var(--accent)]">
                « Je forme les entreprises du BTP depuis 10 ans. Mon objectif : zéro
                théorie, 100 % pratique. Vous repartez avec des outils opérationnels
                dès le lendemain. »
              </blockquote>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: GraduationCap,
                    title: '10 ans d\'expérience BTP',
                    desc: 'Spécialisation métiers du bâtiment, TP, génie civil.',
                  },
                  {
                    icon: Zap,
                    title: 'Méthode 100 % opérationnelle',
                    desc: "Pas de PowerPoint théorique. On travaille directement sur vos documents réels.",
                  },
                  {
                    icon: Check,
                    title: 'Certification Qualiopi',
                    desc: "Organisme certifié. Financement OPCO Constructys garanti.",
                  },
                  {
                    icon: Users,
                    title: 'Accompagnement post-formation',
                    desc: "Support WhatsApp. Accès 1 an aux ressources. Suivi personnalisé.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-slate-200 p-4 shadow-sm"
                  >
                    <Icon size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                    <h3 className="mt-2 font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[var(--accent-soft)] p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Building2 className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
                  Partenaires
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Interventions et actions de formation avec la FFB (Artisans, Île-de-France) et
                  la {CSFE_NOM_LIBRE}.
                </p>
                <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {[
                    { label: 'FFB Artisans' },
                    { label: 'FFB Île-de-France' },
                    { label: 'CSFE', title: CSFE_NOM_COMPLET },
                  ].map(({ label, title }) => (
                    <li key={label}>
                      <span
                        title={title}
                        className="inline-flex rounded-xl border border-[var(--accent)]/25 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm"
                      >
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">
                  <Link
                    href="/etudes-de-cas/ffb-csfe"
                    className="font-medium text-[var(--accent)] hover:underline"
                    title={CSFE_NOM_COMPLET}
                  >
                    Étude de cas FFB &amp; {CSFE_NOM_COMPLET}
                  </Link>
                  {' · '}
                  <Link href="/a-propos#clients-partenaires" className="hover:underline">
                    Tous les partenaires
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis clients Google */}
      <GoogleReviewsSection />

      {/* Qualiopi certification */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 md:flex-row md:items-center">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-display text-xl font-bold text-[var(--accent)]">
                Qualiopi
              </p>
              <p className="mt-1 text-sm text-slate-600">processus certifié</p>
              <p className="mt-4 text-xs text-slate-500">
                La certification a été délivrée au titre de la catégorie d&apos;action
                suivante : Action de formation
              </p>
              <ExternalLinkAnchor
                href={ANNUAIRE_ENTREPRISES_OFC_URL}
                title="Consulter la fiche OFC Création d'Entreprise sur l'Annuaire des Entreprises (data.gouv.fr)"
                className="mt-4 inline-flex text-xs font-medium text-[var(--accent)] hover:underline"
              >
                Vérifier l&apos;organisme sur annuaire-entreprises.data.gouv.fr →
              </ExternalLinkAnchor>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Organisme de formation certifié Qualiopi
              </h2>
              <p className="mt-3 text-slate-600">
                OFC CRÉATION D&apos;ENTREPRISE est certifié Qualiopi. Cette formation
                est éligible aux financements OPCO et peut être prise en charge dans le
                cadre du plan de développement des compétences de votre entreprise.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/financement-constructys"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  En savoir plus sur les financements →
                </Link>
                <ExternalLinkAnchor
                  href={ANNUAIRE_ENTREPRISES_OFC_URL}
                  title="Vérifier la certification Qualiopi — fiche entreprise officielle"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-blue-100"
                >
                  Vérifier la certification (annuaire des entreprises) →
                </ExternalLinkAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
            <span>FAQ</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
            Questions fréquentes sur la formation IA BTP
          </h2>
          <p className="mt-3 text-slate-600">
            Vous avez des questions ? Voici les réponses aux interrogations les plus
            fréquentes.
          </p>
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Une autre question ? Contact CTA */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-[var(--accent-soft)] p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Une autre question ?
            </h2>
            <p className="mt-3 text-slate-600">
              Appelez-moi directement ou prenez rendez-vous pour un échange de 30
              minutes gratuit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:+33695661818"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Phone size={20} strokeWidth={1.5} />
                06 95 66 18 18
              </a>
              <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">
                <Calendar size={20} strokeWidth={1.5} />
                Prendre RDV
              </RdvLink>
            </div>
          </div>
        </div>
      </section>

      {/* Prendre rendez-vous */}
      <section id="rdv" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <Calendar size={16} strokeWidth={1.5} />
                <span>PRENDRE RDV</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
                Réservez un créneau en ligne
              </h2>
              <p className="mt-3 text-slate-600">
                Choisissez le jour et l&apos;heure qui vous conviennent pour un échange
                de 30 minutes. Devis personnalisé sous 24h après notre rendez-vous.
              </p>
              <RdvLink className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                <Calendar size={20} strokeWidth={1.5} />
                Voir le calendrier
              </RdvLink>
              <p className="mt-6 text-sm text-slate-500">
                Ou écrivez-moi ou appelez-moi — coordonnées à droite.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Clock,
                    title: 'Réponse rapide',
                    desc: 'Devis détaillé sous 24h avec programme personnalisé',
                  },
                  {
                    icon: Check,
                    title: 'Financement OPCO inclus',
                    desc: 'Votre devis intègre les possibilités de prise en charge Constructys',
                  },
                  {
                    icon: Phone,
                    title: 'Besoin d\'échanger ?',
                    desc: '06 95 66 18 18 · laureolivie@yahoo.fr',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-slate-900">Me contacter</h3>
              <div className="mt-4">
                <ContactDirect />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final — Prêt à transformer */}
      <section className="relative overflow-hidden bg-[var(--accent)] px-4 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        <div className="relative mx-auto max-w-4xl text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Prêt à transformer votre métier avec l&apos;IA ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Rejoignez les professionnels qui gagnent déjà plusieurs heures par semaine
            grâce à nos formations IA personnalisées pour le BTP.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { val: `+${SITE_CONFIG.statsPersonnesFormees}`, label: 'Professionnels formés' },
              { val: '98%', label: 'Satisfaction' },
              { val: '100%', label: 'Finançable OPCO' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold md:text-4xl">{s.val}</p>
                <p className="mt-1 text-sm text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Réserver ma formation
            </RdvLink>
            <a
              href="tel:+33695661818"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              Appeler directement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
