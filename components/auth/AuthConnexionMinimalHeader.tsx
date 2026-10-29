import Link from 'next/link';
import Image from 'next/image';
import { SITE_BRAND_LOGO_IMAGE_CLASS } from '@/lib/photos';
import { IMAGE_QUALITY_DEFAULT } from '@/lib/image-props';
import { SITE } from '@/lib/site';

/** En-tête léger — logo + retour accueil (page /auth/connexion uniquement). */
export function AuthConnexionMinimalHeader() {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href={SITE.links.home}
          className="flex shrink-0 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Image
            src={SITE.logo.src}
            alt={SITE.logo.alt}
            title={SITE.logo.title}
            width={SITE.logo.width}
            height={SITE.logo.height}
            className={SITE_BRAND_LOGO_IMAGE_CLASS}
            quality={IMAGE_QUALITY_DEFAULT}
            priority
          />
        </Link>
        <Link
          href={SITE.links.home}
          className="text-sm font-medium text-slate-600 underline-offset-2 hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Retour au site
        </Link>
      </div>
    </header>
  );
}
