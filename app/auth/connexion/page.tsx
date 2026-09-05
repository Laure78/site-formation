import { Suspense } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import ConnexionClient from './ConnexionClient';

export const revalidate = 3600;

const META_TITLE = 'Connexion formation IA BTP : espace apprenant';
const META_DESCRIPTION =
  'Connexion à l’espace apprenant OFC : formation IA pour le BTP, supports ChatGPT BTP, Claude et suivi Qualiopi. TPE, PME — Île-de-France.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: LINKS.authConnexion,
  robots: { index: true, follow: true },
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'website',
});

const FAQ = [
  {
    q: 'Qui peut se connecter à l’espace apprenant ?',
    a: 'Les stagiaires inscrits à une formation IA pour le BTP chez OFC Création d’Entreprise (Qualiopi), après invitation ou inscription à une session en Île-de-France.',
  },
  {
    q: 'Que trouve-t-on après connexion ?',
    a: 'Modules, supports, progression et ressources terrain (prompts, fiches méthodes) liés à votre formation ChatGPT BTP ou Claude AI, selon le parcours suivi.',
  },
  {
    q: 'Je n’ai pas encore d’identifiants — que faire ?',
    a: 'Les accès sont créés après inscription à une session. Consultez le catalogue des formations ou prenez un rendez-vous découverte pour cadrer votre besoin et le financement OPCO Constructys possible selon éligibilité.',
  },
] as const;

function getConnexionPageJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}${LINKS.authConnexion}`;
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
        about: {
          '@type': 'EducationalOrganization',
          name: 'OFC Création d’Entreprise',
          url: SITE_CONFIG.url,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Guyancourt',
            addressRegion: 'Île-de-France',
            postalCode: '78280',
            addressCountry: 'FR',
          },
        },
        mainEntity: { '@id': `${pageUrl}#faq` },
      },
      {
        '@type': 'WebApplication',
        name: 'Espace apprenant — Formation IA BTP',
        url: pageUrl,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        inLanguage: 'fr-FR',
        provider: { '@id': `${SITE_CONFIG.url}#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Accès réservé aux stagiaires OFC selon convention de formation.',
        },
      },
    ],
  };
}

const faqSchema = getFAQSchema(FAQ.map(({ q, a }) => ({ q, a })));
if (faqSchema) {
  (faqSchema as Record<string, unknown>)['@id'] = `${SITE_CONFIG.url}${LINKS.authConnexion}#faq`;
}

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-auth-connexion" schema={getConnexionPageJsonLd()} />
      {faqSchema ? <JsonLd id="schema-faq-auth-connexion" schema={faqSchema} /> : null}

      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        {/* Colonne SEO / GEO — contenu indexable */}
        <section
          aria-labelledby="connexion-seo-title"
          className="flex flex-col justify-start px-6 pb-12 pt-6 md:px-10 md:pt-8 lg:px-14"
        >
          <h1
            id="connexion-seo-title"
            className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            Bienvenue sur votre espace de formation IA &amp; BTP
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Cette plateforme vous donne accès à des ressources concrètes pour intégrer
            l&apos;intelligence artificielle dans le quotidien des entreprises du BTP :
            prompts prêts à l&apos;emploi, fiches méthodes, outils et cas pratiques 100&nbsp;%
            terrain.
          </p>

          <ul className="mt-6 max-w-xl space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
            <li>
              <strong className="font-semibold text-slate-900">Formation dispensée par un organisme certifié Qualiopi</strong>
              {' — '}
              financement OPCO Constructys possible selon éligibilité.
            </li>
            <li>
              <strong className="font-semibold text-slate-900">Public</strong>
              {' — '}
              dirigeants et équipes BTP, TPE et PME en Île-de-France (Guyancourt / sessions présentiel).
            </li>
            <li>
              <strong className="font-semibold text-slate-900">Outils</strong>
              {' — '}
              ChatGPT et Claude AI appliqués au chantier, devis et administratif.
            </li>
          </ul>

          <p className="mt-6 max-w-xl text-sm text-slate-600">
            Formations animées par{' '}
            <Link href={LINKS.aPropos} className="font-medium text-[#377CF3] hover:underline">
              Laure Olivié
            </Link>
            {' — '}
            dirigeante BTP &amp; formatrice IA —{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
              catalogue formation IA pour le BTP
            </Link>
            .
          </p>

          <p className="mt-3 max-w-xl text-sm text-slate-500">
            Financement :{' '}
            <Link
              href={LINKS.financement}
              className="font-medium text-[#377CF3] hover:underline"
            >
              guide Constructys formation IA BTP
            </Link>
            {' · '}
            <Link href={LINKS.prendreRdv} className="font-medium text-[#377CF3] hover:underline">
              appel découverte
            </Link>
          </p>
        </section>

        {/* Colonne formulaire */}
        <section
          aria-label="Formulaire de connexion"
          className="flex items-center justify-center border-t border-slate-200 bg-white px-6 py-12 md:px-10 lg:border-l lg:border-t-0 lg:px-14"
        >
          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <div className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-500">
                  Chargement…
                </div>
              }
            >
              <ConnexionClient />
            </Suspense>
          </div>
        </section>
      </div>

      {/* FAQ indexable sous la ligne de flottaison */}
      <section
        aria-labelledby="connexion-faq-title"
        className="border-t border-slate-200 bg-white px-6 py-12 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="connexion-faq-title" className="font-display text-2xl font-bold text-slate-900">
            Questions fréquentes — espace apprenant
          </h2>
          <dl className="mt-8 space-y-5">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <dt className="font-semibold text-slate-900">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
