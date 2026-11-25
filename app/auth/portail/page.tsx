import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS, SITE_BRAND_LOGO_IMAGE_CLASS, SITE_LOGO_TITLE } from '@/lib/photos';
import { PlateformePortailAcces } from '@/components/auth/PlateformePortailAcces';
import { getProfileForAccessCheck, resolvePostAuthPath, type PostAuthPortal } from '@/lib/admin-access';
import { userHasExtranetTrainer } from '@/lib/extranet-formateurs/access';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Portail de connexion — plateforme OFC',
  description:
    'Choisissez votre espace : client stagiaire, extranet formateur ou administration LMS — Laure Olivié (OFC Qualiopi).',
  path: LINKS.authPortail,
  robots: { index: false, follow: false },
});

function parsePortal(raw: string | undefined): PostAuthPortal | undefined {
  if (raw === 'apprenant' || raw === 'formateur' || raw === 'admin') return raw;
  return undefined;
}

export default async function AuthPortailPage({
  searchParams,
}: {
  searchParams: Promise<{ portal?: string; next?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email && params.portal) {
    const profile = await getProfileForAccessCheck(user.id);
    const hasExtranetTrainer = await userHasExtranetTrainer(user.email, user.id);
    const destination = resolvePostAuthPath(params.next, profile, user.email, {
      hasExtranetTrainer,
      portal: parsePortal(params.portal),
    });
    redirect(destination);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F2]">
      <div className="flex flex-1 flex-col items-center px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
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

        <div className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Plateforme de formation OFC
          </p>
          <h1 className="mt-2 text-center font-display text-2xl font-bold tracking-tight text-slate-900">
            Portail de connexion
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
            Trois espaces distincts : stagiaires, formateurs invités et administration. Utilisez
            l&apos;entrée qui correspond à votre profil.
          </p>
          <div className="mt-8">
            <PlateformePortailAcces showHeading={false} />
          </div>
        </div>
      </div>
    </div>
  );
}