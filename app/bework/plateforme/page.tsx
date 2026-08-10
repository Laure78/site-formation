import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Lock, LogIn, ShieldCheck, UserPlus, LayoutDashboard } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { BEWORK_APP_PATHS, EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_PHOTO_HERO } from '@/lib/bework-photos';

export const revalidate = 3600;

const META_TITLE = 'BeWork — accéder à la plateforme';
const META_DESCRIPTION =
  'Connexion à la plateforme BeWork sur app.laureolivie.fr : espace entreprise pour chantiers, documents, marchés et outils IA métier.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  path: LINKS.beworkPlateforme,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'website',
  image: {
    url: BEWORK_PHOTO_HERO.src,
    width: BEWORK_PHOTO_HERO.width,
    height: BEWORK_PHOTO_HERO.height,
    alt: BEWORK_PHOTO_HERO.alt,
  },
});

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'Espace entreprise',
    desc: 'Chantiers, documents, tâches et validations dans un environnement adapté à votre organisation.',
  },
  {
    icon: ShieldCheck,
    title: 'Outils IA métier',
    desc: 'Analyses CCTP/CCAP, synthèses et aides à la préparation — toujours validées par vos équipes.',
  },
  {
    icon: Lock,
    title: 'Accès sécurisé',
    desc: 'Comptes par rôles, isolation des espaces clients, hébergement en Europe.',
  },
] as const;

const FAQ = [
  {
    q: 'Qui peut accéder à la plateforme BeWork ?',
    a: 'La plateforme est réservée aux entreprises clientes BeWork et à leurs collaborateurs autorisés. Créez un compte ou connectez-vous si vous avez déjà reçu vos accès.',
  },
  {
    q: 'Quelle est la différence avec bework.fr ?',
    a: 'bework.fr présente l\'offre BeWork (plateformes internes BTP, démonstration, étude tarifaire). app.laureolivie.fr est l\'espace de connexion pour utiliser votre plateforme une fois déployée.',
  },
  {
    q: 'Où trouver le lexique BTP gratuit ?',
    a: 'Le lexique interactif (parcours, dictionnaire, flashcards et quiz) est accessible gratuitement sur la plateforme, sans compte obligatoire pour la consultation.',
  },
] as const;

function getPlateformePageJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}${LINKS.beworkPlateforme}`;
  const appUrl = EXTERNAL_SITE_URLS.beworkApp;

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
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_CONFIG.url },
          { '@type': 'ListItem', position: 2, name: 'BeWork', item: `${SITE_CONFIG.url}${LINKS.bework}` },
          { '@type': 'ListItem', position: 3, name: 'Plateforme', item: pageUrl },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${appUrl}#software`,
        name: 'BeWork — Plateforme interne BTP',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: appUrl,
        inLanguage: 'fr-FR',
        description:
          'Espace de connexion BeWork : plateforme interne pour chantiers, documents, marchés et outils IA métier.',
        provider: {
          '@type': 'Organization',
          name: 'BeWork',
          url: EXTERNAL_SITE_URLS.bework,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };
}

export default function BeworkPlateformePage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-bework-plateforme" schema={getPlateformePageJsonLd()} />

      <section
        aria-labelledby="bework-plateforme-title"
        className="border-b border-slate-200 bg-white px-4 py-14 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              Plateforme · Espace entreprise
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Connexion sécurisée · app.laureolivie.fr
            </p>
            <h1
              id="bework-plateforme-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Accéder à la plateforme BeWork
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              Connectez-vous à votre espace entreprise pour piloter chantiers, documents et marchés — avec des outils
              IA métier. Espace distinct du site commercial{' '}
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                className="font-medium text-[#377CF3] hover:underline"
                title="BeWork — site officiel bework.fr"
              >
                bework.fr
              </ExternalLinkAnchor>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLinkAnchor
                href={BEWORK_APP_PATHS.signup}
                title="Créer un compte sur la plateforme BeWork"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
                Créer un compte
              </ExternalLinkAnchor>
              <ExternalLinkAnchor
                href={BEWORK_APP_PATHS.login}
                title="Se connecter à la plateforme BeWork"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
              >
                <LogIn className="h-4 w-4 shrink-0" aria-hidden />
                Se connecter
              </ExternalLinkAnchor>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              Vous découvrez BeWork ?{' '}
              <Link href={LINKS.bework} className="font-medium text-[#377CF3] hover:underline">
                Voir la présentation de la plateforme
              </Link>
            </p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(55,124,243,0.08)]">
            <Image
              src={BEWORK_PHOTO_HERO.src}
              alt="Plateforme BeWork — espace entreprise BTP"
              width={BEWORK_PHOTO_HERO.width}
              height={BEWORK_PHOTO_HERO.height}
              className="h-auto w-full"
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </section>

      <section aria-labelledby="bework-plateforme-fonctions" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-plateforme-fonctions" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Ce que vous faites sur la plateforme
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <Icon className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="bework-plateforme-lexique" className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 id="bework-plateforme-lexique" className="font-display text-2xl font-bold text-[#0F172A]">
              Lexique &amp; apprentissage BTP
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">
              Parcours guidés, dictionnaire de 146 termes, flashcards et quiz — ressource gratuite hébergée sur la
              plateforme.
            </p>
          </div>
          <ExternalLinkAnchor
            href={BEWORK_APP_PATHS.lexique}
            title="Ouvrir le lexique BTP sur app.laureolivie.fr"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#377CF3] bg-[#EFF6FF] px-5 py-3 text-sm font-semibold text-[#377CF3] hover:bg-white"
          >
            Ouvrir le lexique
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ExternalLinkAnchor>
        </div>
      </section>

      <section aria-labelledby="bework-plateforme-faq" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="bework-plateforme-faq" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Questions fréquentes
          </h2>
          <dl className="mt-8 space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200/90 bg-white p-5">
                <dt className="font-semibold text-[#0F172A]">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#475569]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="bework-plateforme-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2 id="bework-plateforme-cta" className="font-display text-2xl font-bold md:text-3xl">
            Prêt à vous connecter ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            La plateforme est accessible sur{' '}
            <span className="font-semibold text-white">app.laureolivie.fr</span>.
          </p>
          <ExternalLinkAnchor
            href={EXTERNAL_SITE_URLS.beworkApp}
            title="Ouvrir la plateforme BeWork"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
          >
            Ouvrir la plateforme
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </ExternalLinkAnchor>
          <p className="mt-6 text-sm text-white/80">
            Pas encore client BeWork ?{' '}
            <Link href={LINKS.bework} className="font-semibold underline underline-offset-2 hover:text-white">
              Découvrir BeWork sur laureolivie.fr/bework
            </Link>
            {' · '}
            <ExternalLinkAnchor
              href={EXTERNAL_SITE_URLS.bework}
              className="font-semibold underline underline-offset-2 hover:text-white"
              title="Demander une démonstration sur bework.fr"
            >
              bework.fr
            </ExternalLinkAnchor>
          </p>
        </div>
      </section>
    </div>
  );
}
