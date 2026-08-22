import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Lock, ShieldCheck, Server, Eye } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_GALLERY_SECTIONS, BEWORK_PHOTO_HERO, type BeworkPhoto } from '@/lib/bework-photos';

export const revalidate = 3600;
const BEWORK_SITE = EXTERNAL_SITE_URLS.bework;

const META_TITLE = 'BeWork — plateforme BTP sur mesure | Laure Olivié';
const META_DESCRIPTION =
  'BeWork construit la plateforme de votre entreprise BTP, connecte vos logiciels existants et automatise vos processus. Étude de votre besoin sur bework.fr.';
const OG_IMAGE_ALT = BEWORK_PHOTO_HERO.alt;

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
    alt: OG_IMAGE_ALT,
  },
});

const REASSURANCE_BADGES = [
  { icon: Lock, label: 'Accès par rôles' },
  { icon: Eye, label: 'Environnements privés' },
  { icon: Server, label: 'Infrastructure européenne' },
  { icon: ShieldCheck, label: 'RGPD' },
] as const;

const METHODE = [
  { step: '01', title: 'Comprendre', desc: 'Votre organisation, vos métiers, vos équipes et vos logiciels.' },
  { step: '02', title: 'Concevoir', desc: 'Votre plateforme, vos modules et vos processus.' },
  { step: '03', title: 'Connecter', desc: 'Étudier les possibilités d\u2019intégration avec votre environnement existant.' },
  { step: '04', title: 'Construire', desc: 'Développer votre environnement BeWork.' },
  { step: '05', title: 'Déployer', desc: 'Mettre la solution en place dans votre entreprise.' },
  { step: '06', title: 'Former', desc: 'Former réellement les collaborateurs jusqu\u2019à l\u2019usage quotidien.' },
  { step: '07', title: 'Faire évoluer', desc: 'Faire évoluer la plateforme avec votre entreprise.' },
] as const;

const ROLES = [
  { role: 'Direction', desc: 'Vue globale : chantiers, finances, alertes.' },
  { role: 'Conducteur de travaux', desc: 'Suivi chantier, documents, équipes, commandes.' },
  { role: 'Chargé d\u2019affaires', desc: 'Devis, marchés, situations, relation client.' },
  { role: 'Administratif', desc: 'Facturation, fournisseurs, contrôles, paiements.' },
] as const;

const SUR_MESURE = [
  { title: 'Analyse documentaire', desc: 'Lire, synthétiser et extraire l\u2019information utile de vos documents BTP.' },
  { title: 'Recherche intelligente', desc: 'Retrouver une information sans connaître son emplacement.' },
  { title: 'Assistants spécialisés', desc: 'Devis, comptes rendus, CCTP, DOE.' },
  { title: 'Automatisations complexes', desc: 'Workflows avancés sur vos processus les plus spécifiques.' },
  { title: 'Applications métier', desc: 'Outils que les logiciels standards ne couvrent pas.' },
  { title: 'Traitement de données', desc: 'Exploiter vos données chantier, financières et opérationnelles.' },
] as const;

const CTA_USE_CASES = [
  'Automatiser un processus',
  'Exploiter vos documents',
  'Créer un outil métier',
  'Connecter vos logiciels',
  'Créer une plateforme',
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
        slogan: 'La plateforme construite autour de votre entreprise BTP',
        description: META_DESCRIPTION,
        areaServed: ['FR', 'BE', 'CH', 'LU'],
        sameAs: [BEWORK_SITE],
      },
    ],
  };
}

function GalleryGrid({ photos, columns = 3 }: { photos: BeworkPhoto[]; columns?: 2 | 3 }) {
  const colClass = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className={`mt-8 grid gap-5 ${colClass}`}>
      {photos.map((photo) => (
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
            
              quality={70}
              loading="lazy"/>
          </div>
          {photo.caption ? (
            <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-[#64748B]">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

function CtaBework({ className = '' }: { className?: string }) {
  return (
    <ExternalLinkAnchor
      href={BEWORK_SITE}
      title="BeWork — parler de mon besoin sur bework.fr (nouvel onglet)"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9] ${className}`}
    >
      Parler de mon besoin
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
    </ExternalLinkAnchor>
  );
}

const galerieConstruire = BEWORK_GALLERY_SECTIONS.find((s) => s.id === 'suivi-chantier');
const galerieConnecter = BEWORK_GALLERY_SECTIONS.find((s) => s.id === 'bureau-chantier');
const galeriePlanning = BEWORK_GALLERY_SECTIONS.find((s) => s.id === 'planning-reporting');

const photosConstruire = [
  ...(galerieConstruire?.photos ?? []),
  ...(galeriePlanning?.photos.filter((p) => p.caption?.toLowerCase().includes('gantt')) ?? []),
  ...(BEWORK_GALLERY_SECTIONS.find((s) => s.id === 'maitre-oeuvre')?.photos.filter((p) =>
    p.caption?.toLowerCase().includes('plans et dossiers'),
  ) ?? []),
];

const photosConnecter = galerieConnecter?.photos.slice(0, 3) ?? [];

export default function BeworkPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-bework-page" schema={getBeworkPageJsonLd()} />

      {/* 1. Hero */}
      <section
        aria-labelledby="bework-hero-title"
        className="border-b border-slate-200 bg-white px-4 py-14 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              Construire · Connecter · Automatiser
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Une solution sur mesure pensée pour le BTP
            </p>
            <h1
              id="bework-hero-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              La plateforme construite autour de votre entreprise&nbsp;BTP.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              Centralisez vos chantiers, vos équipes, vos documents et votre gestion dans un
              environnement conçu pour votre organisation. BeWork peut également connecter vos
              logiciels existants et automatiser vos processus.
            </p>
            <p className="mt-3 text-sm font-medium italic text-[#334155]">
              Vous gardez ce qui fonctionne. Nous construisons ce qui manque et faisons travailler
              l&apos;ensemble ensemble.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {REASSURANCE_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#FAFBFD] px-3 py-1.5 text-xs font-medium text-[#334155]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaBework />
              <Link
                href={LINKS.formations}
                className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
              >
                Formations IA — organisme certifié Qualiopi
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
                formations dispensées par un organisme certifié Qualiopi
              </Link>{' '}
              proposées par Laure Olivié sur ce site.
            </p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(55,124,243,0.08)]">
            <Image
              src={BEWORK_PHOTO_HERO.src}
              alt={BEWORK_PHOTO_HERO.alt}
              title="BeWork — chantiers, planning, GED, commandes, finance et équipes connectés à vos outils"
              width={BEWORK_PHOTO_HERO.width}
              height={BEWORK_PHOTO_HERO.height}
              className="h-auto w-full"
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
            
              quality={75}/>
            {BEWORK_PHOTO_HERO.caption ? (
              <figcaption className="border-t border-slate-100 bg-[#0F172A] px-4 py-3 text-center text-sm leading-snug text-white">
                {BEWORK_PHOTO_HERO.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </section>

      {/* 2. Verbatim */}
      <section aria-labelledby="bework-verbatim" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            id="bework-verbatim"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Votre logiciel ne correspond pas à votre façon de travailler&nbsp;?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Les mêmes informations ressaisies dans plusieurs outils. Des documents éparpillés entre
            emails, serveurs et applications. Des logiciels qui ne communiquent pas. Un Excel de
            suivi devenu indispensable — et fragile.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#334155]">
            Notre réponse&nbsp;: nous construisons la plateforme autour de votre façon de travailler.
            Pas l&apos;inverse.
          </p>
        </div>
      </section>

      {/* 3. Construire */}
      <section
        aria-labelledby="bework-construire"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Construire
          </p>
          <h2
            id="bework-construire"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Tout votre fonctionnement au même endroit.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Le problème n&apos;est pas de manquer d&apos;outils. C&apos;est qu&apos;ils ne
            travaillent pas ensemble. Chantiers, documents, planning, gestion, achats et pilotage
            réunis dans un seul environnement&nbsp;: affaires, avancement, échéances, équipes et
            informations importantes, sans fichiers perdus ni appels pour savoir où en est le
            dossier.
          </p>
          {photosConstruire.length > 0 ? <GalleryGrid photos={photosConstruire} /> : null}
        </div>
      </section>

      {/* 4. Connecter */}
      <section
        aria-labelledby="bework-connecter"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Connecter
          </p>
          <h2
            id="bework-connecter"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Vous avez déjà vos logiciels. BeWork peut les faire travailler ensemble.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Notre objectif n&apos;est pas de tout remplacer. Nous étudions comment connecter ce que
            vous utilisez déjà&nbsp;: gestion BTP, comptabilité, trésorerie, messagerie, documents,
            planning. L&apos;information circule entre le bureau et le chantier, les données sont
            centralisées, la double saisie disparaît.
          </p>
          <p className="mt-3 text-xs italic text-[#64748B]">
            Toutes les intégrations ne sont pas systématiquement disponibles — les possibilités sont
            étudiées au cas par cas.
          </p>
          {photosConnecter.length > 0 ? <GalleryGrid photos={photosConnecter} /> : null}
        </div>
      </section>

      {/* 5. Automatiser */}
      <section
        aria-labelledby="bework-automatiser"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Automatiser
          </p>
          <h2
            id="bework-automatiser"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Automatisez ce qui se répète tous les jours.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Lorsqu&apos;une action peut être automatisée de manière fiable, BeWork crée le processus
            correspondant. Un devis accepté ouvre le chantier, initialise le budget, prépare les
            dossiers, génère les premières tâches et informe les collaborateurs concernés.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#475569] md:text-base">
            Chaque entreprise fonctionne différemment&nbsp;: les automatisations sont construites
            autour de vos propres processus, pas d&apos;un modèle générique.
          </p>
        </div>
      </section>

      {/* 6. Sur mesure */}
      <section
        aria-labelledby="bework-sur-mesure"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-sur-mesure"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Et si votre besoin va plus loin&nbsp;?
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Certaines entreprises ont des besoins qu&apos;aucun logiciel standard ne couvre. BeWork
            développe alors les outils spécifiques nécessaires.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUR_MESURE.map(({ title, desc }) => (
              <li
                key={title}
                className="rounded-xl border border-slate-200/90 bg-white px-5 py-4 shadow-sm"
              >
                <h3 className="font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-[#475569] md:text-base">
            Nous utilisons la technologie adaptée au problème à résoudre.{' '}
            <strong className="font-semibold text-[#334155]">
              L&apos;IA n&apos;est pas le produit&nbsp;: c&apos;est l&apos;un des outils que nous
              pouvons utiliser pour construire la bonne solution.
            </strong>
          </p>
          <p className="mt-3 text-sm font-medium text-[#64748B]">
            France · Belgique · Suisse romande · Luxembourg.
          </p>
        </div>
      </section>

      {/* 7. Rôles */}
      <section
        aria-labelledby="bework-roles"
        className="border-b border-slate-200 bg-white px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-roles"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Chacun voit ce qui lui est utile.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map(({ role, desc }) => (
              <div
                key={role}
                className="rounded-xl border border-slate-200/90 bg-[#FAFBFD] px-5 py-4 shadow-sm"
              >
                <h3 className="font-semibold text-[#0F172A]">{role}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            La complexité reste invisible. Nous concevons des interfaces simples et accompagnons vos
            collaborateurs jusqu&apos;à l&apos;utilisation réelle au quotidien.
          </p>
        </div>
      </section>

      {/* 8. Méthode */}
      <section
        aria-labelledby="bework-methode"
        className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="bework-methode"
            className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            Nous ne livrons pas simplement un logiciel.
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#475569]">
            Nous accompagnons vos équipes jusqu&apos;à son utilisation réelle au quotidien.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {METHODE.map(({ step, title, desc }) => (
              <li
                key={step}
                className="rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                  {step}
                </p>
                <h3 className="mt-2 font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Données */}
      <section className="border-b border-slate-200 bg-white px-4 py-10 md:py-12">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 text-center">
          {REASSURANCE_BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#334155]"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
              {label}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm font-semibold text-[#334155]">
          Vos données restent les vôtres.
        </p>
      </section>

      {/* 10. CTA final */}
      <section aria-labelledby="bework-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2
            id="bework-cta"
            className="font-display text-2xl font-bold md:text-3xl"
          >
            Montrez-nous comment votre entreprise fonctionne.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            Vous n&apos;avez pas besoin de savoir quelle technologie utiliser. Expliquez-nous comment
            vous travaillez aujourd&apos;hui, les outils que vous utilisez et ce que vous aimeriez
            améliorer. Nous étudierons comment construire l&apos;environnement adapté.
          </p>
          <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2 text-sm text-white/80">
            {CTA_USE_CASES.map((uc) => (
              <li
                key={uc}
                className="rounded-full border border-white/30 px-3 py-1"
              >
                {uc}
              </li>
            ))}
          </ul>
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
            <Link
              href={LINKS.formations}
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Catalogue formations dispensées par un organisme certifié Qualiopi
            </Link>
            {' · '}
            <Link
              href={LINKS.contact}
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Contacter Laure Olivié
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
