import Image from 'next/image';
import Link from 'next/link';
import { PHOTOS } from '@/lib/photos';
import { StatCallout } from '@/components/readability/StatCallout';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

type Props = {
  lead: string;
  qualiopiText: string;
  catalogueHref: string;
  calendlyHeroHref: string;
};

export function HeroEditorial({ lead, qualiopiText, catalogueHref, calendlyHeroHref }: Props) {
  return (
    <section
      id="essentiel-retour"
      className="scroll-mt-24 rounded-3xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:px-8 md:py-12"
    >
      <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
        <article className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">
            Formatrice IA pour le BTP · Guyancourt · Depuis 2022 (formation pro depuis 2009)
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            Laure Olivié — Formatrice IA pour les pro du BTP (Qualiopi, FFB, LinkedIn Learning)
          </h1>
          <p className="mt-4 text-2xl font-normal text-[#475569]">
            Formatrice IA et ChatGPT pour les entreprises du BTP
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#334155]">{lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StatCallout
              variant="inline"
              value={formatProfessionalsTrainedCount()}
              label="professionnels formés"
            />
            <StatCallout variant="inline" value={SOCIAL_PROOF.AVERAGE_RATING} label="note moyenne" />
          </div>
          <p className="mt-4 text-sm font-medium text-[#475569]">
            10 ans d&apos;expérience · Qualiopi · LinkedIn Learning
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#334155]">{qualiopiText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={catalogueHref}
              className="inline-flex items-center rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(55,124,243,0.35)] transition hover:scale-[1.02]"
            >
              Voir le catalogue →
            </Link>
            <a
              href={calendlyHeroHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prendre rendez-vous"
              className="inline-flex items-center rounded-xl border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF]"
            >
              Prendre RDV
            </a>
          </div>
        </article>
        <div className="relative order-first lg:order-none lg:col-span-2">
          <Image
            src={PHOTOS.portraitPro2026.src}
            alt={PHOTOS.portraitPro2026.alt}
            width={PHOTOS.portraitPro2026.width}
            height={PHOTOS.portraitPro2026.height}
            className="mx-auto h-auto w-full max-w-sm object-contain drop-shadow-[0_16px_48px_rgba(15,23,42,0.18)] lg:max-w-none"
            priority
          />
        </div>
      </div>
    </section>
  );
}
