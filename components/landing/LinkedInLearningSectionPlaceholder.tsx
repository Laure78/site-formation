import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';

type Props = {
  id?: string;
  className?: string;
};

/** Coquille SSR — extraits LinkedIn Learning (iframes au scroll). */
export function LinkedInLearningSectionPlaceholder({
  id = 'formations-linkedin-learning',
  className = '',
}: Props) {
  return (
    <div id={id} className={`scroll-mt-24 ${className}`.trim()}>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <Reveal as="div">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
              Formations LinkedIn Learning
              <span className="mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
            </h2>
            <Image
              src={LOGO_LINKEDIN_LEARNING.src}
              alt={LOGO_LINKEDIN_LEARNING.alt}
              width={LOGO_LINKEDIN_LEARNING.width}
              height={LOGO_LINKEDIN_LEARNING.height}
              className="h-10 w-auto max-w-[180px] object-contain object-left sm:max-w-[200px]"
              sizes="200px"
              loading="lazy"
              quality={70}
            />
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569] md:text-[16px]">
            Instructrice officielle LinkedIn Learning — cours publics vérifiables, complémentaires aux
            sessions OFC en présentiel en Île-de-France.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2" aria-hidden>
            <div className="aspect-video rounded-2xl bg-[#0F172A]/90" />
            <div className="aspect-video rounded-2xl bg-[#0F172A]/90" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
