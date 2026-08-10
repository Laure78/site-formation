import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, GraduationCap, LogIn, MonitorPlay, ShieldCheck } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { EXTERNAL_SITE_URLS, TEACHIZY_PATHS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

export const revalidate = 3600;

const META_TITLE = 'Espace apprenant — formation IA BTP';
const META_DESCRIPTION =
  'Connexion à la plateforme e-learning OFC : supports de formation, modules IA BTP, ressources post-session et suivi pédagogique pour les stagiaires Qualiopi.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  titleAbsolute: META_TITLE,
  description: META_DESCRIPTION,
  path: LINKS.formationPlateforme,
  appendAuthorSuffix: false,
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'website',
  image: {
    url: PHOTOS.formationIaBtpSalleInteractive2026.src,
    width: 1200,
    height: 630,
    alt: PHOTOS.formationIaBtpSalleInteractive2026.alt,
  },
});

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Supports de formation',
    desc: 'Modules, PDF et ressources liés à votre session OFC — devis, AO, chantier, Claude AI selon le parcours suivi.',
  },
  {
    icon: MonitorPlay,
    title: 'Accès post-session',
    desc: 'Retrouvez vos contenus après la formation en présentiel pour consolider les acquis sur le terrain.',
  },
  {
    icon: ShieldCheck,
    title: 'Espace sécurisé',
    desc: 'Compte personnel réservé aux stagiaires et clients OFC — accès fourni à l’issue de l’inscription ou de la session.',
  },
] as const;

const FAQ = [
  {
    q: 'Qui peut se connecter à la plateforme ?',
    a: 'Les stagiaires ayant suivi une formation OFC Création d’Entreprise (ou bénéficiant d’un accès selon convention) disposent d’identifiants pour consulter les supports et modules en ligne.',
  },
  {
    q: 'Je n’ai pas encore de compte — que faire ?',
    a: 'Les accès sont créés ou communiqués par OFC après votre inscription à une session. Pour une nouvelle formation, consultez le catalogue ou prenez rendez-vous pour cadrer votre besoin.',
  },
  {
    q: 'Quelle est la différence avec BeWork (app.laureolivie.fr) ?',
    a: 'La plateforme Teachizy héberge les contenus pédagogiques et supports de formation IA BTP. BeWork (app.laureolivie.fr) est l’espace entreprise de la plateforme interne BTP — deux services distincts.',
  },
] as const;

function getPlateformePageJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}${LINKS.formationPlateforme}`;
  /** Fil d’Ariane : uniquement via `GlobalBreadcrumbs` (évite un 2ᵉ BreadcrumbList). */

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
        isPartOf: { '@id': `${SITE_CONFIG.url}#website` },
        mainEntity: { '@id': `${pageUrl}#faq` },
      },
      {
        '@type': 'WebApplication',
        name: 'Plateforme e-learning OFC — Formation IA BTP',
        url: EXTERNAL_SITE_URLS.teachizyFormation,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Accès réservé aux stagiaires OFC selon convention de formation.',
        },
        provider: {
          '@id': `${SITE_CONFIG.url}#organization`,
        },
      },
    ],
  };
}

const faqSchema = getFAQSchema(FAQ.map(({ q, a }) => ({ q, a })));
if (faqSchema) {
  (faqSchema as Record<string, unknown>)['@id'] = `${SITE_CONFIG.url}${LINKS.formationPlateforme}#faq`;
}

export default function FormationPlateformePage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-formation-plateforme" schema={getPlateformePageJsonLd()} />
      {faqSchema ? <JsonLd id="schema-faq-formation-plateforme" schema={faqSchema} /> : null}

      <section
        aria-labelledby="formation-plateforme-title"
        className="border-b border-slate-200 bg-white px-4 py-14 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              Espace apprenant · OFC Qualiopi
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">
              Plateforme e-learning · formation-ia-chatgpt.teachizy.fr
            </p>
            <h1
              id="formation-plateforme-title"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Accéder à votre plateforme de formation
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
              Retrouvez vos supports, modules et ressources IA BTP après votre session en présentiel. Espace
              distinct du site vitrine{' '}
              <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                laureolivie.fr/formations
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <FormationPlateformeConnexionButton variant="primary" label="Se connecter" />
              <ExternalLinkAnchor
                href={TEACHIZY_PATHS.home}
                title="Découvrir la plateforme de formation IA BTP"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]"
              >
                <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
                Voir la plateforme
              </ExternalLinkAnchor>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              Vous n&apos;êtes pas encore inscrit ?{' '}
              <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                Consulter le catalogue des formations
              </Link>
              {' · '}
              <Link href={LINKS.prendreRdv} className="font-medium text-[#377CF3] hover:underline">
                Prendre rendez-vous
              </Link>
            </p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(55,124,243,0.08)]">
            <Image
              src={PHOTOS.formationIaBtpSalleInteractive2026.src}
              alt={PHOTOS.formationIaBtpSalleInteractive2026.alt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </section>

      <section aria-labelledby="formation-plateforme-fonctions" className="border-b border-slate-200 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="formation-plateforme-fonctions" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Ce que vous trouvez sur la plateforme
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm">
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

      <section aria-labelledby="formation-plateforme-faq" className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="formation-plateforme-faq" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
            Questions fréquentes
          </h2>
          <dl className="mt-8 space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5">
                <dt className="font-semibold text-[#0F172A]">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#475569]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="formation-plateforme-cta" className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2 id="formation-plateforme-cta" className="font-display text-2xl font-bold md:text-3xl">
            Déjà stagiaire OFC ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            Connectez-vous avec les identifiants reçus après votre session ou votre inscription.
          </p>
          <ExternalLinkAnchor
            href={TEACHIZY_PATHS.login}
            title="Connexion plateforme formation IA BTP"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
          >
            <LogIn className="h-4 w-4 shrink-0" aria-hidden />
            Connexion à la plateforme
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </ExternalLinkAnchor>
          <p className="mt-6 text-sm text-white/80">
            Besoin d&apos;une formation en présentiel ?{' '}
            <Link href={LINKS.formations} className="font-semibold underline underline-offset-2 hover:text-white">
              Voir le catalogue Qualiopi
            </Link>
            {' · '}
            <Link href={LINKS.beworkPlateforme} className="font-semibold underline underline-offset-2 hover:text-white">
              Plateforme BeWork (MOEX)
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
