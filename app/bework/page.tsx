import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Clock, ShieldCheck, Users } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_GALLERY_SECTIONS, BEWORK_PHOTO_HERO } from '@/lib/bework-photos';

const BEWORK_SITE = EXTERNAL_SITE_URLS.bework;

const META_TITLE = 'BeWork — assistant travaux BTP externalisé | Laure Olivié';
const META_DESCRIPTION =
  'BeWork : relais administratif BTP augmenté par l\'IA. CR, DCE, DOE, relances. Opérationnel en 3 à 5 jours. Site officiel bework.fr.';

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

const MISSIONS = [
  'Comptes rendus de chantier',
  'Analyse de DCE & appels d\'offres',
  'Mémoire technique',
  'PPSPS & DOE',
  'Chiffrage & relances de devis',
  'Dossiers travaux & attachements',
  'Situations & validations MOA',
  'Relances & suivi administratif',
] as const;

const REASSURANCE = [
  { icon: Clock, label: 'Opérationnel en 3 à 5 jours' },
  { icon: Users, label: '0 recrutement' },
  { icon: ShieldCheck, label: '100 % supervisé en France' },
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
        name: 'BeWork — assistant de gestion travaux BTP',
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
        slogan: 'On tient le bureau, vous tenez le chantier',
        description:
          'Partenaire administratif externalisé pour le BTP : comptes rendus, DCE, DOE, relances et coordination documentaire chantier, augmenté par l\'IA et validé par un humain.',
        areaServed: ['FR', 'BE', 'CH', 'LU'],
        sameAs: [BEWORK_SITE],
      },
    ],
  };
}

export const revalidate = 3600;

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
              Assistant de gestion travaux · Relais BTP
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Augmenté par l&apos;IA · supervisé depuis la France
            </p>
            <h1
              id="bework-hero-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              BeWork — le relais administratif de vos marchés travaux
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              <strong className="text-[#0F172A]">BeWork</strong> est un partenaire administratif externalisé pour le
              BTP : vous envoyez vos demandes, l&apos;équipe exécute, vous validez le sensible, vous suivez tout sur une
              plateforme simple.{' '}
              <em className="not-italic text-[#334155]">On tient le bureau, vous tenez le chantier.</em>
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
                title="BeWork — site officiel bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                Découvrir BeWork sur bework.fr
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
              <Link
                href={LINKS.formations}
                className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
              >
                Formations IA Qualiopi OFC
              </Link>
            </div>
            <p className="mt-4 text-xs text-[#64748B]">
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
            Pourquoi externaliser le relais administratif ?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Un conducteur de travaux ou chargé d&apos;affaires BTP consacre souvent 30 à 40&nbsp;% de son temps au
            bureau. Un chantier moyen génère une quarantaine de documents administratifs critiques. Chaque livrable en
            retard expose à des pénalités, une retenue de garantie bloquée ou un solde impayé. BeWork prend en charge
            cette charge documentaire pour que votre équipe terrain reste sur le chantier.
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

      {/* Missions */}
      <section aria-labelledby="bework-missions" className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="bework-missions" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Missions prises en charge par BeWork
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Pour les entreprises BTP titulaires de marchés publics, privés, accords-cadres ou contrats récurrents — France,
            Belgique, Suisse, Luxembourg.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MISSIONS.map((mission) => (
              <li
                key={mission}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-[#FAFBFD] px-4 py-3 text-sm font-medium text-[#334155]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                {mission}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="bework-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2 id="bework-cta" className="font-display text-2xl font-bold md:text-3xl">
            On tient le bureau, vous tenez le chantier
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            Demandez un diagnostic sur le site officiel BeWork : audit de votre premier dossier sous 48&nbsp;h, démarrage
            opérationnel en 3 à 5 jours.
          </p>
          <ExternalLinkAnchor
            href={BEWORK_SITE}
            title="BeWork — demander un diagnostic sur bework.fr"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
          >
            Accéder à bework.fr
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
