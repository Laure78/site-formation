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

const META_TITLE = 'BeWork — plateformes internes BTP';
const META_DESCRIPTION =
  'BeWork : plateforme interne BTP adaptée à votre organisation, augmentée par l\'IA. Chantiers, documents, marchés. Démo sur bework.fr.';

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

const MODULES = [
  'Chantiers et affaires',
  'Documents et GED',
  'Marchés publics et privés',
  'Analyse IA (CCTP, CCAP…)',
  'Comptes rendus',
  'Tâches et validations',
  'Réserves et DOE',
  'Tableaux de bord',
] as const;

const REASSURANCE = [
  { icon: Server, label: 'Hébergement en Europe' },
  { icon: Lock, label: 'Accès contrôlés par rôles' },
  { icon: ShieldCheck, label: 'Confidentialité renforcée' },
] as const;

const DEPLOIEMENT = [
  {
    step: '01',
    title: 'Configuration',
    desc: 'Modules, rôles et workflows adaptés à votre organisation.',
  },
  {
    step: '02',
    title: 'Formation par métier',
    desc: 'Chaque collaborateur apprend uniquement les fonctions utiles à son poste.',
  },
  {
    step: '03',
    title: 'Déploiement progressif',
    desc: 'Test avec un groupe pilote ou sur quelques chantiers, puis extension.',
  },
  {
    step: '04',
    title: 'Suivi et amélioration',
    desc: 'Analyse des usages, simplification des parcours, évolution continue.',
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
        name: 'BeWork — plateformes internes intelligentes pour le BTP',
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
        '@type': 'SoftwareApplication',
        '@id': `${BEWORK_SITE}#software`,
        name: 'BeWork',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: BEWORK_SITE,
        slogan: 'Plateformes internes intelligentes pour le BTP',
        description:
          'Plateforme interne BTP adaptée à chaque organisation : chantiers, documents, marchés et outils IA métier. BeWork configure, forme les équipes et fait évoluer la plateforme.',
        provider: {
          '@type': 'Organization',
          name: 'BeWork',
          url: BEWORK_SITE,
        },
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
              Plateformes internes intelligentes · BTP
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Configurée pour votre organisation · augmentée par l&apos;IA
            </p>
            <h1
              id="bework-hero-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Votre plateforme interne BTP, adaptée à votre organisation
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              Centralisez équipes, chantiers, documents et marchés. BeWork configure votre plateforme, forme vos
              équipes et la fait évoluer avec vos besoins.
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
                title="BeWork — demander une démonstration sur bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                Demander une démonstration
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

      {/* Problème */}
      <section aria-labelledby="bework-probleme" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="bework-probleme" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Informations dispersées, bureau et chantier déconnectés
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Emails, messages, Drive et dossiers partagés : chacun détient une partie de l&apos;information. CCTP, CCAP,
            plans et comptes rendus sont difficiles à croiser. BeWork centralise équipes, documents et marchés dans une
            plateforme interne que vos collaborateurs utilisent au quotidien — avec des outils IA métier, sous votre
            validation.
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

      {/* Modules */}
      <section aria-labelledby="bework-modules" className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-modules" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Modules de votre plateforme
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Un socle commun maintenu par BeWork, configuré selon vos métiers, droits et workflows — France, Belgique,
            Suisse, Luxembourg.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((module) => (
              <li
                key={module}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-[#FAFBFD] px-4 py-3 text-sm font-medium text-[#334155]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                {module}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Déploiement */}
      <section aria-labelledby="bework-deploiement" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-deploiement" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Nous accompagnons jusqu&apos;à l&apos;usage réel
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            BeWork ne se substitue pas à vos salariés dans l&apos;analyse finale, la conduite des travaux ou les
            décisions contractuelles. Ce sont vos collaborateurs autorisés qui utilisent la plateforme au quotidien.
          </p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DEPLOIEMENT.map(({ step, title, desc }) => (
              <li
                key={step}
                className="rounded-xl border border-slate-200/90 bg-white px-5 py-5 shadow-sm"
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
            Construisons la plateforme adaptée à votre entreprise
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            Diagnostic de votre organisation, puis configuration et déploiement. Demandez une démonstration
            personnalisée.
          </p>
          <ExternalLinkAnchor
            href={BEWORK_SITE}
            title="BeWork — demander une démonstration sur bework.fr"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
          >
            Demander une démonstration
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
