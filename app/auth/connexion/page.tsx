import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { AuthConnexionMinimalFooter } from '@/components/auth/AuthConnexionMinimalFooter';
import { AuthConnexionMinimalHeader } from '@/components/auth/AuthConnexionMinimalHeader';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import ConnexionClient from './ConnexionClient';

/** Query ?reset= / ?error= doivent être lus à chaque requête (pas de cache HTML). */
export const dynamic = 'force-dynamic';

const META_TITLE = 'Connexion — espace apprenant';
const META_DESCRIPTION =
  'Connectez-vous à votre espace apprenant OFC : supports et ressources de formation IA pour le BTP.';

export const metadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: LINKS.authConnexion,
  robots: { index: true, follow: true },
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  openGraphType: 'website',
});

function getConnexionPageJsonLd() {
  const pageUrl = `${SITE_CONFIG.url}${LINKS.authConnexion}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: META_TITLE,
    description: META_DESCRIPTION,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${SITE_CONFIG.url}#website` },
  };
}

function isAdminNextPath(next: string | null | undefined): boolean {
  if (!next) return false;
  const pathname = next.split('?')[0] ?? next;
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const adminIntent = isAdminNextPath(params.next);

  return (
    <div className="flex min-h-full w-full flex-col bg-[#F2F2F2]">
      <JsonLd id="schema-auth-connexion" schema={getConnexionPageJsonLd()} />
      <AuthConnexionMinimalHeader />

      <div className="flex flex-1 flex-col items-center px-4 pb-6 pt-8 sm:px-6 sm:pt-10 md:pt-12">
        <Suspense
          fallback={
            <div
              className="w-full max-w-[440px] animate-pulse rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm"
              aria-live="polite"
            >
              Chargement…
            </div>
          }
        >
          <ConnexionClient adminMode={adminIntent} />
        </Suspense>
      </div>

      <AuthConnexionMinimalFooter />
    </div>
  );
}
