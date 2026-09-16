import Link from 'next/link';
import { ArrowUpRight, Check, Download, Monitor, Users, Sparkles } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { BeworkHeroVideo } from '@/components/bework/BeworkHeroVideo';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';
import { BEWORK_PARCOURS, BEWORK_PARCOURS_LIST } from '@/lib/bework-programmes';
import { BEWORK_PAGE_GALLERY_VIDEOS, VIDEOS } from '@/lib/videos';

export const revalidate = 3600;

const BEWORK_SITE = EXTERNAL_SITE_URLS.bework;
const BEWORK_FORMATION = EXTERNAL_SITE_URLS.beworkFormation;
const BEWORK_FAQ = EXTERNAL_SITE_URLS.beworkFaq;
const BEWORK_PARTICIPER = EXTERNAL_SITE_URLS.beworkParticiper;

const META_TITLE = 'BeWork — créer avec l’IA sans savoir coder';
const META_DESCRIPTION =
  'Formation BeWork : créez sites, apps et outils avec l’IA sans programmer. Parcours 7 h (300 €) ou 14 h (600 €). Détails sur bework.fr.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  path: '/bework',
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'website',
});

const HERO_PILLARS = [
  { icon: Sparkles, title: 'Une pratique concrète', desc: 'Vous manipulez' },
  { icon: Users, title: 'Un accompagnement direct', desc: 'En petit groupe' },
  { icon: Monitor, title: 'Une première création', desc: 'Dès le Jour 1' },
] as const;

const DEMOS = [
  {
    title: 'Messagerie',
    desc: 'Échangez, collaborez, centralisez vos messages.',
    preview: 'Sophie Martin · RDV confirmé',
  },
  {
    title: 'Agenda',
    desc: 'Organisez vos événements et vos équipes.',
    preview: 'Semaine type — RDV Sophie',
  },
  {
    title: 'Réservation',
    desc: 'Acceptez des réservations en quelques clics.',
    preview: '09:00 · 10:30 · 14:00',
  },
  {
    title: 'CRM',
    desc: 'Suivez prospects et opportunités.',
    preview: 'Atelier Nova · 4 200 € · Prospect',
  },
  {
    title: 'Tableau de bord',
    desc: 'Suivez vos données en temps réel.',
    preview: 'Demandes 128 · Réponse 94 %',
  },
  {
    title: 'Espace client',
    desc: 'Documents partagés et validations.',
    preview: 'Progression 72 %',
  },
] as const;

const METIERS = [
  'Artisan',
  'Indépendant',
  'Commerce',
  'Restaurant',
  'Agence',
  'Immobilier',
  'Entreprise',
  'Porteur de projet',
] as const;

const INTELLIGENCES = [
  {
    step: '01',
    title: 'IA de conception',
    desc: 'Clarifier l’ambition, les usages et les priorités.',
    tags: ['Besoin', 'Idées', 'Priorités'],
  },
  {
    step: '02',
    title: 'IA de structuration',
    desc: 'Organiser le projet pour avancer étape par étape.',
    tags: ['Parcours', 'Écrans', 'Fonctions'],
  },
  {
    step: '03',
    title: 'IA de création',
    desc: 'Transformer le plan en résultat visible et manipulable.',
    tags: ['Interface', 'Contenu', 'Actions'],
  },
  {
    step: '04',
    title: 'IA de vérification',
    desc: 'Tester, repérer les incohérences et sécuriser les évolutions.',
    tags: ['Tests', 'Cohérence', 'Corrections'],
  },
  {
    step: '05',
    title: 'IA d’amélioration',
    desc: 'Affiner l’expérience et préparer les prochaines versions.',
    tags: ['Clarté', 'Fluidité', 'Progression'],
  },
] as const;

const JOUR1_POINTS = [
  {
    title: 'Démonstrations concrètes',
    desc: 'Voir réellement ce qu’il est possible de construire.',
  },
  {
    title: 'Petit groupe',
    desc: 'Un accompagnement plus proche.',
  },
  {
    title: 'Pratique sur vos idées',
    desc: 'Passez immédiatement à l’expérimentation.',
  },
  {
    title: 'Méthode réutilisable',
    desc: 'Continuez après la journée.',
  },
] as const;

const COMPETENCES = [
  {
    step: '01',
    title: 'Structurer une idée',
    desc: 'Transformer un besoin en projet clair.',
  },
  {
    step: '02',
    title: 'Formuler une demande',
    desc: 'Expliquer précisément ce que vous voulez obtenir.',
  },
  {
    step: '03',
    title: 'Lancer une première création',
    desc: 'Passer de l’idée à une première version concrète.',
  },
  {
    step: '04',
    title: 'Tester et corriger',
    desc: 'Identifier ce qui fonctionne et ce qui doit évoluer.',
  },
  {
    step: '05',
    title: 'Améliorer',
    desc: 'Ajouter, modifier et affiner progressivement.',
  },
  {
    step: '06',
    title: 'Continuer',
    desc: 'Être capable de poursuivre son projet après la formation.',
  },
] as const;

const FAQ_ITEMS = [
  {
    q: 'Faut-il savoir coder ?',
    a: 'Non. La formation est conçue pour des personnes qui ne viennent pas du développement informatique.',
  },
  {
    q: 'Est-ce adapté aux débutants ?',
    a: 'Oui. BeWork part du principe que vous n’avez pas besoin d’être développeur. Le parcours est pensé pour débuter clairement, sans jargon inutile.',
  },
  {
    q: 'Quelle différence entre 7 h et 14 h ?',
    a: 'Tout le monde commence par la même première journée. Les 7 h vous apprennent à commencer et à continuer seul. Les 14 h ajoutent une deuxième journée pour pratiquer davantage et construire plus loin.',
  },
  {
    q: 'Puis-je commencer par 1 jour et prolonger ensuite ?',
    a: 'Oui. Commencez par la première journée à 300 €. Si vous souhaitez aller plus loin, ajoutez simplement le deuxième jour pour 300 € supplémentaires.',
  },
  {
    q: 'Que peut-on créer ?',
    a: 'Sites, applications, systèmes de réservation, CRM, agendas, tableaux de bord, messageries, espaces clients, outils métier ou prototypes — selon votre idée et votre niveau de départ.',
  },
  {
    q: 'Dois-je venir avec mon ordinateur ?',
    a: 'Oui. La formation est pratique et doit idéalement être suivie depuis votre propre ordinateur.',
  },
  {
    q: 'Que vais-je savoir faire après ?',
    a: 'Après 7 h : structurer un besoin, lancer une première création, modifier, tester, corriger et continuer. Après 14 h : davantage de pratique et un projet plus abouti. Vous ne repartirez pas développeur — vous repartirez capable de progresser.',
  },
] as const;

function getBeworkPageJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}/bework`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: META_TITLE,
        description: META_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_CONFIG.url}/#website` },
        about: { '@id': `${BEWORK_SITE}#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_CONFIG.url },
          { '@type': 'ListItem', position: 2, name: 'BeWork', item: pageUrl },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${BEWORK_SITE}#organization`,
        name: 'BeWork',
        url: BEWORK_SITE,
        slogan: 'Apprendre aujourd’hui, créer demain',
        description: META_DESCRIPTION,
        sameAs: [BEWORK_SITE],
      },
      {
        '@type': 'Course',
        '@id': `${BEWORK_FORMATION}#course`,
        name: 'Construisez votre projet avec l’IA',
        description:
          'Formation progressive BeWork (marque OFC) : 1 journée (7 h) pour apprendre à commencer, ou 2 journées (14 h) pour construire plus loin et publier — sans prérequis en programmation.',
        url: BEWORK_FORMATION,
        provider: { '@id': `${BEWORK_SITE}#organization` },
        inLanguage: 'fr-FR',
        educationalLevel: 'Débutant',
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: BEWORK_PARCOURS['7h'].intitule,
            courseMode: ['onsite', 'online'],
            duration: 'PT7H',
            offers: {
              '@type': 'Offer',
              price: String(BEWORK_PARCOURS['7h'].tarifHt),
              priceCurrency: 'EUR',
              url: BEWORK_PARTICIPER,
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@type': 'CourseInstance',
            name: BEWORK_PARCOURS['14h'].intitule,
            courseMode: ['onsite', 'online'],
            duration: 'PT14H',
            offers: {
              '@type': 'Offer',
              price: String(BEWORK_PARCOURS['14h'].tarifHt),
              priceCurrency: 'EUR',
              url: BEWORK_PARTICIPER,
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'VideoObject',
        '@id': `${pageUrl}#video`,
        name: VIDEOS.beworkVideoPub.title,
        description: META_DESCRIPTION,
        contentUrl: `${SITE_CONFIG.url}${VIDEOS.beworkVideoPub.src}`,
        embedUrl: pageUrl,
        inLanguage: 'fr-FR',
        uploadDate: '2026-09-16',
      },
    ],
  };
}

function CtaFormation({
  label = 'Découvrir la formation',
  href = BEWORK_FORMATION,
  variant = 'primary',
  className = '',
}: {
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}) {
  const styles =
    variant === 'primary'
      ? 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
      : variant === 'light'
        ? 'bg-white text-[#1D4ED8] hover:bg-[#EFF6FF]'
        : 'border border-[#1D4ED8] bg-white text-[#1D4ED8] hover:bg-[#EFF6FF]';

  return (
    <ExternalLinkAnchor
      href={href}
      title={`${label} — bework.fr (nouvel onglet)`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
    </ExternalLinkAnchor>
  );
}

export default function BeworkPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-bework-page" schema={getBeworkPageJsonLd()} />

      {/* Hero */}
      <section
        aria-labelledby="bework-hero-title"
        className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/50 px-4 py-14 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,78,216,0.08),transparent_55%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1D4ED8]">
              BeWork — Apprendre aujourd’hui, créer demain
            </p>
            <p className="mt-2 text-sm font-medium text-[#64748B]">Formation progressive</p>
            <h1
              id="bework-hero-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl xl:text-5xl"
            >
              Sans savoir coder.
              <span className="mt-1 block text-[#1D4ED8]">Créez ce que vous imaginez.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] md:text-lg">
              Donnez vie à votre idée avec l’IA. Apprenez à construire votre propre projet, étape par
              étape, sans connaissances en programmation.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">
              Formation proposée par{' '}
              <ExternalLinkAnchor
                href={BEWORK_SITE}
                title="Site officiel BeWork — https://www.bework.fr/ (nouvel onglet)"
                className="font-semibold text-[#1D4ED8] underline underline-offset-2 hover:text-[#1E40AF]"
              >
                BeWork (www.bework.fr)
              </ExternalLinkAnchor>
              .
            </p>
            <ul className="mt-6 max-w-xl space-y-2 text-sm text-[#334155] md:text-base">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" aria-hidden />
                <span>
                  <strong className="font-semibold">1 journée (7 h)</strong> — apprendre à commencer et
                  lancer un premier projet.
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" aria-hidden />
                <span>
                  <strong className="font-semibold">2 journées (14 h)</strong> — approfondir et
                  construire plus loin.
                </span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaFormation label="S’inscrire" href={BEWORK_PARTICIPER} />
              <a
                href="#parcours"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1D4ED8] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EFF6FF]"
              >
                Voir les programmes
              </a>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              7 h ou 14 h · 6 à 8 participants · selon votre besoin
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#475569]">
              Aucun prérequis en programmation. Vous partez de zéro et repartez avec une méthode, un
              environnement prêt et une première création fonctionnelle.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {HERO_PILLARS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-[#1D4ED8]" strokeWidth={1.75} aria-hidden />
                  <p className="mt-2 text-sm font-semibold text-[#0F172A]">{title}</p>
                  <p className="mt-1 text-xs text-[#64748B]">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-[#64748B]">
              {QUALIOPI_BEWORK_DISTINCTION}{' '}
              <Link href={LINKS.formations} className="font-medium text-[#1D4ED8] hover:underline">
                Formations IA BTP — organisme certifié Qualiopi
              </Link>
              .
            </p>
          </div>

          <div className="flex min-w-0 flex-col items-center lg:items-end">
            <BeworkHeroVideo className="lg:mx-0" />
            <div className="mt-5">
              <CtaFormation label="S’inscrire à une session" href={BEWORK_PARTICIPER} />
            </div>
          </div>
        </div>
      </section>

      {/* Démos */}
      <section
        id="possibilites"
        aria-labelledby="bework-demos"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Des exemples concrets
          </p>
          <h2
            id="bework-demos"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Ce que vous pourrez créer pendant la formation.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Des projets utiles, concrets et adaptés à vos besoins — guidés pas à pas. Interfaces et
            données présentées à titre illustratif.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEMOS.map(({ title, desc, preview }) => (
              <li
                key={title}
                className="flex flex-col rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5 shadow-sm"
              >
                <h3 className="font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#475569]">{desc}</p>
                <p className="mt-4 rounded-lg border border-dashed border-[#BFDBFE] bg-white px-3 py-2 font-mono text-xs text-[#1E40AF]">
                  {preview}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaFormation label="Explorer les démonstrations" href={BEWORK_SITE} variant="secondary" />
          </div>
        </div>
      </section>

      {/* Vidéos BeWork — format 9:16 */}
      <section
        id="videos"
        aria-labelledby="bework-videos"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
            En images
          </p>
          <h2
            id="bework-videos"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Voir BeWork en action.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Deux autres aperçus de la formation — format vertical, comme sur mobile. Site officiel :{' '}
            <ExternalLinkAnchor
              href={BEWORK_SITE}
              title="Site officiel BeWork — https://www.bework.fr/ (nouvel onglet)"
              className="font-semibold text-[#1D4ED8] underline underline-offset-2 hover:text-[#1E40AF]"
            >
              BeWork (www.bework.fr)
            </ExternalLinkAnchor>
            .
          </p>
          <div className="mt-10 grid justify-items-center gap-10 sm:grid-cols-2 sm:gap-8">
            {BEWORK_PAGE_GALLERY_VIDEOS.map((key) => (
              <BeworkHeroVideo key={key} videoKey={key} showCaption className="sm:mx-0" />
            ))}
          </div>
        </div>
      </section>

      {/* Métiers */}
      <section
        aria-labelledby="bework-metiers"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Projection
          </p>
          <h2
            id="bework-metiers"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Votre métier vous donne les idées.
            <span className="mt-1 block">Imaginez ce que vous pourriez construire.</span>
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {METIERS.map((metier) => (
              <li
                key={metier}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#334155]"
              >
                {metier}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#475569] md:text-base">
            Et si l’outil qui manque à votre métier était celui que vous alliez créer ?
          </p>
          <div className="mt-6">
            <CtaFormation label="Voir à qui s’adresse la formation" href={BEWORK_FORMATION} variant="secondary" />
          </div>
        </div>
      </section>

      {/* Intelligences */}
      <section
        aria-labelledby="bework-ia"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Intelligence collective
          </p>
          <h2
            id="bework-ia"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Plusieurs intelligences spécialisées.
            <span className="mt-1 block text-[#1D4ED8]">Une seule direction : votre projet.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Chaque étape ne demande pas la même expertise. BeWork vous apprend à mobiliser la bonne
            intelligence pour concevoir, structurer, créer, vérifier et améliorer — sans transformer
            la formation en cours technique.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INTELLIGENCES.map(({ step, title, desc, tags }) => (
              <li
                key={step}
                className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                  {step}
                </p>
                <h3 className="mt-2 font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{desc}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1D4ED8]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Vous gardez la vision et les décisions.{' '}
            <strong className="font-semibold text-[#334155]">
              Les intelligences spécialisées vous aident à avancer avec méthode.
            </strong>
          </p>
        </div>
      </section>

      {/* Jour 1 */}
      <section
        aria-labelledby="bework-jour1"
        className="border-b border-slate-200 bg-[#0F172A] px-4 py-12 text-white md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            Jour 1 · Parcours commun
          </p>
          <h2
            id="bework-jour1"
            className="mt-2 font-display text-2xl font-bold md:text-3xl"
          >
            Pas une journée à écouter.
            <span className="mt-1 block text-[#93C5FD]">Une journée à créer.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/80 md:text-base">
            Une expérience pratique pour découvrir comment transformer vos idées en projets
            numériques grâce à l’intelligence artificielle.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOUR1_POINTS.map(({ title, desc }) => (
              <li key={title} className="rounded-xl border border-white/15 bg-white/5 px-5 py-4">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaFormation label="S’inscrire" href={BEWORK_PARTICIPER} variant="light" />
            <CtaFormation label="Voir les démonstrations" href={BEWORK_SITE} variant="secondary" className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10" />
          </div>
        </div>
      </section>

      {/* Jour 1 / Jour 2 */}
      <section
        aria-labelledby="bework-parcours"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-parcours"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Et si vous voulez aller plus loin ?
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            La première journée vous apprend à commencer. La deuxième vous donne le temps de
            construire davantage.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Jour 1 · Commencer
              </p>
              <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium text-[#334155]">
                {['Comprendre', 'Préparer', 'Créer', 'Modifier', 'Tester'].map((step, i, arr) => (
                  <li key={step} className="inline-flex items-center gap-2">
                    <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm">{step}</span>
                    {i < arr.length - 1 ? (
                      <span className="text-[#94A3B8]" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Jour 2 · Construire plus loin
              </p>
              <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium text-[#334155]">
                {['Structurer', 'Ajouter des fonctions', 'Approfondir', 'Tester', 'Corriger', 'Améliorer'].map(
                  (step, i, arr) => (
                    <li key={step} className="inline-flex items-center gap-2">
                      <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm">{step}</span>
                      {i < arr.length - 1 ? (
                        <span className="text-[#93C5FD]" aria-hidden>
                          →
                        </span>
                      ) : null}
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section
        aria-labelledby="bework-competences"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-competences"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Vous ne repartirez pas développeur.
            <span className="mt-1 block text-[#1D4ED8]">
              Vous repartirez avec les bases pour commencer.
            </span>
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Une journée ne fait pas de vous un expert technique. Elle vous donne les repères, la
            méthode et les bons réflexes pour transformer une idée en premier projet et continuer à
            avancer.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPETENCES.map(({ step, title, desc }) => (
              <li
                key={step}
                className="rounded-xl border border-slate-200/90 bg-white px-5 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                  {step}
                </p>
                <h3 className="mt-2 font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-lg font-semibold text-[#0F172A]">
            Vous n’apprenez pas à tout savoir.
            <span className="mt-1 block text-[#1D4ED8]">Vous apprenez à savoir commencer.</span>
          </p>
        </div>
      </section>

      {/* Modalités */}
      <section
        aria-labelledby="bework-modalites"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Modalités
          </p>
          <h2
            id="bework-modalites"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Deux façons de participer.
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Présentiel ou visio : la modalité change, pas l’ambition ni le parcours choisi.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-[#1D4ED8] bg-[#EFF6FF] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Recommandé
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F172A]">Présentiel</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Une expérience directe, en petit groupe, avec un accompagnement attentif tout au long
                de la pratique.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                Sessions dédiées
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F172A]">Visio</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Le même parcours pédagogique à distance, lors de sessions prévues pour faciliter les
                échanges et le partage d’écran.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <CtaFormation label="Comparer les modalités" href={BEWORK_FORMATION} variant="secondary" />
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section
        id="parcours"
        aria-labelledby="bework-tarifs"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-tarifs"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Un même point de départ.
            <span className="mt-1 block">À vous de choisir jusqu’où aller.</span>
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Commencez tous par la même première journée, puis poursuivez si vous souhaitez approfondir
            et construire davantage.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {BEWORK_PARCOURS_LIST.map((parcours) => {
              const featured = parcours.id === '14h';
              return (
                <article
                  key={parcours.id}
                  className={
                    featured
                      ? 'relative flex flex-col rounded-2xl border-2 border-[#1D4ED8] bg-white p-6 shadow-[0_8px_30px_rgba(29,78,216,0.12)] md:p-8'
                      : 'flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'
                  }
                >
                  {featured ? (
                    <p className="absolute -top-3 left-6 rounded-full bg-[#1D4ED8] px-3 py-1 text-xs font-semibold text-white">
                      Recommandé pour aller plus loin
                    </p>
                  ) : null}
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.14em] ${featured ? 'mt-2 text-[#1D4ED8]' : 'text-[#64748B]'}`}
                  >
                    {parcours.id === '7h' ? '1 jour' : '2 jours'}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#0F172A]">
                    {parcours.title}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-[#64748B]">{parcours.intitule}</p>
                  <p className="mt-4 flex flex-wrap items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-[#1D4ED8]">
                      {parcours.tarifLabel}
                    </span>
                    <span className="text-sm text-[#64748B]">
                      par participant · {parcours.dureeLabel} · {parcours.effectif}
                    </span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#475569]">
                    {parcours.id === '7h'
                      ? 'Une journée complète pour comprendre la méthode, préparer votre environnement, créer une première version, apprendre à modifier, tester et corriger.'
                      : 'Le parcours du Jour 1, puis une deuxième journée pour pratiquer davantage, approfondir votre projet, le publier et gagner en autonomie.'}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {parcours.highlights.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#334155]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-[#0F172A]">{parcours.outcome}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <CtaFormation
                      label={parcours.id === '7h' ? 'Choisir 1 journée' : 'Choisir 2 journées'}
                      href={BEWORK_PARTICIPER}
                      className="w-full sm:w-auto"
                    />
                    <a
                      href={parcours.pdfHref}
                      download={parcours.pdfDownloadName}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#1D4ED8] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EFF6FF] sm:w-auto"
                    >
                      <Download className="h-4 w-4 shrink-0" aria-hidden />
                      Programme PDF ({parcours.dureeLabel})
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="mt-8 rounded-xl border border-dashed border-[#BFDBFE] bg-white px-5 py-4 text-sm leading-relaxed text-[#475569]">
            <p className="font-semibold text-[#0F172A]">Pas encore sûr de vouloir faire 2 jours ?</p>
            <p className="mt-1">
              Commencez par la première journée à {BEWORK_PARCOURS['7h'].tarifLabel}. Si vous
              souhaitez continuer, ajoutez simplement le deuxième jour pour{' '}
              {BEWORK_PARCOURS['7h'].tarifLabel} supplémentaires. Vous ne perdez rien à commencer par
              1 journée.
            </p>
            <p className="mt-3">
              <Link
                href={LINKS.financement}
                className="font-semibold text-[#1D4ED8] underline underline-offset-2 hover:text-[#1E40AF]"
                title="Financement OPCO Constructys — formation IA"
              >
                Financement OPCO possible selon éligibilité
              </Link>
              {' · '}exonéré de TVA (art. 261-4-4°-a du CGI).
            </p>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="bework-faq"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="bework-faq"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Des questions ?
            <span className="mt-1 block text-[#1D4ED8]">C’est normal.</span>
          </h2>
          <p className="mt-3 text-sm text-[#64748B]">
            Les réponses essentielles avant de demander une place.{' '}
            <ExternalLinkAnchor
              href={BEWORK_FAQ}
              className="font-medium text-[#1D4ED8] hover:underline"
              title="FAQ complète BeWork (nouvel onglet)"
            >
              Voir toute la FAQ
            </ExternalLinkAnchor>
          </p>
          <div className="mt-8 space-y-2">
            {FAQ_ITEMS.map(({ q, a }, index) => (
              <details
                key={q}
                className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 open:bg-white open:shadow-sm"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none py-4 text-[17px] font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                  {q}
                </summary>
                <p className="border-t border-slate-100 pb-4 pt-3 text-sm leading-relaxed text-[#475569]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="bework-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#1D4ED8] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Apprendre — Créer — Avancer
          </p>
          <h2 id="bework-cta" className="mt-3 font-display text-2xl font-bold md:text-3xl">
            Une journée pour apprendre à commencer.
            <span className="mt-1 block">Deux pour construire plus loin.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            En 7 h, apprenez à transformer une idée en premier projet concret. Prolongez à 14 h si
            vous souhaitez pratiquer davantage. Dans les deux cas, vous repartez avec une méthode
            claire pour continuer.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaFormation label="S’inscrire" href={BEWORK_PARTICIPER} variant="light" />
            <CtaFormation
              label="Voir les démonstrations"
              href={BEWORK_SITE}
              variant="secondary"
              className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10"
            />
          </div>
          <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <li>7 h ou 14 h — parcours progressif</li>
            <li>En petit groupe</li>
            <li>Une méthode claire et applicable</li>
          </ul>
          <p className="mt-8 text-sm text-white/75">
            Vous cherchez plutôt une formation IA pour le BTP (organisme certifié Qualiopi)&nbsp;?{' '}
            <Link
              href={LINKS.formations}
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Catalogue formations
            </Link>
            {' · '}
            <Link
              href={LINKS.contact}
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Contacter Laure Olivié
            </Link>
          </p>
          <p className="mt-4 text-sm text-white/70">
            Déjà client plateforme&nbsp;?{' '}
            <Link
              href={LINKS.beworkPlateforme}
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Accéder à la plateforme
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
