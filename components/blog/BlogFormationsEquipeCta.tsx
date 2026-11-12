import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function BlogFormationsEquipeCta() {
  return (
    <aside
      className="relative my-12 overflow-hidden rounded-2xl bg-[#0B1220] px-6 py-10 text-white md:px-10 md:py-12"
      aria-labelledby="blog-formations-equipe-cta"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Image
          src="/images/blog/blog-hero-conducteur-travaux.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
      </div>
      <div className="relative z-10 max-w-xl">
        <h2 id="blog-formations-equipe-cta" className="font-display text-xl font-bold md:text-2xl">
          Formez votre équipe sur ses documents BTP
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
          Programmes certifiés Qualiopi en présentiel en Île-de-France — financement OPCO selon éligibilité.
        </p>
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-white px-5 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-slate-50`}
        >
          Voir les formations
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
