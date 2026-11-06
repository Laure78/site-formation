import { Suspense } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import ConnexionClient from '@/app/auth/connexion/ConnexionClient';
import { userHasExtranetTrainer } from '@/lib/extranet-formateurs/access';
import { PHOTOS, SITE_BRAND_LOGO_IMAGE_CLASS, SITE_LOGO_TITLE } from '@/lib/photos';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Connexion — espace formateurs',
  description: 'Connexion à l’extranet formateurs Laure Olivié (OFC Création d’Entreprise).',
  path: LINKS.espaceFormateursConnexion,
  robots: { index: false, follow: false },
});

export default async function EspaceFormateursConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const ok = await userHasExtranetTrainer(user.email, user.id);
    if (ok) {
      redirect(params.next ?? LINKS.espaceFormateurs);
    }
  }

  const next = params.next ?? LINKS.espaceFormateurs;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F2]">
      <div className="flex flex-1 flex-col items-center px-4 pb-10 pt-8 sm:px-6 sm:pt-10">
        <Link
          href={LINKS.home}
          className="mb-8 outline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#377CF3]"
          title={SITE_LOGO_TITLE}
        >
          <Image
            src={PHOTOS.siteBrandLogo.src}
            alt={PHOTOS.siteBrandLogo.alt}
            width={PHOTOS.siteBrandLogo.width}
            height={PHOTOS.siteBrandLogo.height}
            className={`${SITE_BRAND_LOGO_IMAGE_CLASS} mx-auto`}
            sizes="(max-width: 640px) 85vw, 280px"
            priority
          />
        </Link>

        {params.error ? (
          <div className="mb-4 w-full max-w-[440px] rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-center text-sm text-amber-900">
            {params.error}
          </div>
        ) : null}

        <Suspense
          fallback={
            <div className="w-full max-w-[440px] animate-pulse rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Chargement…
            </div>
          }
        >
          <ConnexionClient forcedNext={next} extranetTrainerMode />
        </Suspense>
      </div>
    </div>
  );
}
