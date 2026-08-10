import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Lock, ShieldCheck, Server } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_GALLERY_SECTIONS, BEWORK_PHOTO_HERO } from '@/lib/bework-photos';

export const revalidate = 3600;
const BEWORK_SITE = EXTERNAL_SITE_URLS.bework;

const META_TITLE = 'BeWork — solutions IA sur mesure BTP';
const META_DESCRIPTION =
  'BeWork conçoit des solutions IA pour le BTP : applications, automatisations, assistants et plateformes métier. Étude sur bework.fr.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  path: '/bework',
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

const SOLUTIONS = [
  'Applications métier IA',
  'Agents IA',
  'Automatisations',
  'Analyse documentaire',
  'Assistants intelligents',
  'Intégrations logiciels',
  'Recherche intelligente',
  'Plateformes métier',
] as const;

const REASSURANCE = [
  { icon: Lock, label: 'Accès par rôles' },
  { icon: Server, label: 'Infrastructure européenne' },
  { icon: ShieldCheck, label: 'Environnements privés · RGPD' },
] as const;

const METHODE = [
  {
    step: '01',
    title: 'Comprendre',
    desc: 'Nous observons votre façon de travailler.',
  },
  {
    step: '02',
    title: 'Imaginer',
    desc: 'Nous définissons la solution utile.',
  },
  {
    step: '03',
    title: 'Construire',
    desc: 'Nous développons et connectons les outils nécessaires.',
  },
  {
    step: '04',
    title: 'Déployer',
    desc: 'Nous intégrons la solution dans l’entreprise.',
  },
  {
    step: '05',
    title: 'Former',
    desc: 'Nous formons les collaborateurs concernés.',
  },
  {
    step: '06',
    title: 'Accompagner',
    desc: 'Jusqu’à l’utilisation réelle au quotidien.',
  },
  {
    step: '07',
    title: 'Faire évoluer',
    desc: 'La solution évolue avec vos usages.',
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
        name: 'BeWork — solutions IA sur mesure pour le BTP',
        description: META_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_CONFIG.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_CONFIG.url },
          { '@type': 'ListItem', position: 2, name: 'BeWork', item: pageUrl },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BEWORK_SITE}#organization`,
        name: 'BeWork',
        url: BEWORK_SITE,
        slogan: 'Solutions IA sur mesure pour le BTP',
        description:
          'BeWork conçoit des solutions IA autour des métiers, méthodes et outils du BTP : applications métier, automatisations, assistants intelligents, analyse documentaire, intégrations et plateformes.',
        areaServed: ['FR', 'BE', 'CH', 'LU'],
        sameAs: [BEWORK_SITE],
      },
    ],
  };
}


export default function BeworkPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-bework-page" schema={getBeworkPageJsonLd()} />

      {/* Hero */}
      <section
        aria-labelledby="bework-hero-title"
        className="border-b border-slate-200 bg-white px-4 py-14 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              Solutions IA sur mesure · BTP
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Autour de vos métiers, méthodes et outils
            </p>
            <h1
              id="bework-hero-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Imaginez ce que l&apos;IA pourrait faire pour votre entreprise. Nous le construisons.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              BeWork conçoit des solutions IA autour de vos métiers, vos méthodes de travail et vos outils :
              applications, automatisations, assistants intelligents, analyse documentaire, intégrations et
              plateformes métier.
            </p>
            <ul className="mt-6 space-y-2">
              {REASSURANCE.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-[#334155]">
                  <Icon className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLinkAnchor
                href={BEWORK_SITE}
                title="BeWork — parler de mon besoin sur bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                Parler de mon besoin
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
              <Link
                href={LINKS.formations}
                className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
              >
                Formations IA Qualiopi
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              Déjà client ?{' '}
              <Link href={LINKS.beworkPlateforme} className="font-medium text-[#377CF3] hover:underline">
                Accéder à la plateforme
              </Link>
            </p>
            <p className="mt-2 text-xs text-[#64748B]">
              Service distinct des{' '}
              <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                formations certifiées Qualiopi
              </Link>{' '}
              proposées par Laure Olivié sur ce site.
            </p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(55,124,243,0.08)]">
            <Image
              src={BEWORK_PHOTO_HERO.src}
              alt={BEWORK_PHOTO_HERO.alt}
              width={BEWORK_PHOTO_HERO.width}
              height={BEWORK_PHOTO_HERO.height}
              className="h-auto w-full"
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </section>

      {/* Approche */}
      <section aria-labelledby="bework-approche" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="bework-approche" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Votre besoin ne rentre pas dans une case ? Nous étudions la solution.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Nous partons de votre besoin, pas d&apos;un catalogue. Automatiser un processus, exploiter des documents,
            créer un outil métier, connecter vos logiciels ou déployer une plateforme : chaque projet est étudié —
            faisabilité, données, sécurité, autorisations, intégrations et architecture adaptée.
          </p>
        </div>
      </section>

      {/* Galeries par usage */}
      {BEWORK_GALLERY_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`bework-${section.id}-title`}
          className="border-b border-slate-200 px-4 py-12 md:py-16 even:bg-white odd:bg-[#F8FAFC]"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id={`bework-${section.id}-title`}
              className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
            >
              {section.title}
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">{section.intro}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.photos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#EFF6FF]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 360px, 50vw"
                    />
                  </div>
                  {photo.caption ? (
                    <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-[#64748B]">
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Solutions */}
      <section aria-labelledby="bework-solutions" className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-solutions" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Ce que nous pouvons créer
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Pas besoin d&apos;adopter toute la plateforme : un besoin précis ou un environnement complet — France,
            Belgique, Suisse, Luxembourg.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((solution) => (
              <li
                key={solution}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-[#FAFBFD] px-4 py-3 text-sm font-medium text-[#334155]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Méthode */}
      <section aria-labelledby="bework-methode" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-methode" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            De l&apos;idée à l&apos;usage quotidien
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Nous concevons des outils simples et intuitifs, puis accompagnons vos collaborateurs jusqu&apos;à leur
            utilisation réelle. La technologie s&apos;adapte aux équipes, pas l&apos;inverse.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {METHODE.map(({ step, title, desc }) => (
              <li
                key={step}
                className="rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{step}</p>
                <h3 className="mt-2 font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="bework-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2 id="bework-cta" className="font-display text-2xl font-bold md:text-3xl">
            Parlez-nous de votre idée
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            Décrivez ce que vous voulez améliorer, automatiser ou créer — nous étudions la solution. Plateformes
            métier. Solutions IA. Expertise BTP.
          </p>
          <ExternalLinkAnchor
            href={BEWORK_SITE}
            title="BeWork — parler de mon besoin sur bework.fr"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
          >
            Parler de mon besoin
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </ExternalLinkAnchor>
          <p className="mt-6 text-sm text-white/80">
            Vous cherchez plutôt à former vos équipes à l&apos;IA ?{' '}
            <Link href={LINKS.formations} className="font-semibold underline underline-offset-2 hover:text-white">
              Voir le catalogue formations Qualiopi
            </Link>
            {' · '}
            <Link href={LINKS.contact} className="font-semibold underline underline-offset-2 hover:text-white">
              Contacter Laure Olivié
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
