import Image from 'next/image';
import { Gift, LockOpen, Zap } from 'lucide-react';
import {
  RESSOURCES_HUB_H1,
  RESSOURCES_HUB_INTRO,
} from '@/lib/ressources-catalog';
import { RESSOURCES_HUB_HERO_PHOTO } from '@/lib/ressources-hub-photos';
import { OFC_TYPE_HERO, OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';

const TRUST_BADGES = [
  { icon: Gift, label: 'Gratuit' },
  { icon: LockOpen, label: 'Sans inscription' },
  { icon: Zap, label: 'Prêt à utiliser' },
] as const;

/** Hero hub ressources — H1, intro, pastilles et visuel chantier (maquette 2026). */
export function RessourcesHubHero() {
  const photo = RESSOURCES_HUB_HERO_PHOTO;

  return (
    <section
      className="ressources-hub-hero scroll-mt-[var(--site-header-height)] overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]/80"
      aria-labelledby="ressources-hero-title"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col lg:min-h-[min(360px,42vw)] lg:flex-row lg:items-stretch">
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 md:py-10 lg:max-w-[52%] lg:px-8 lg:py-12">
          <h1 id="ressources-hero-title" className={`${OFC_TYPE_HERO} ressources-hub-hero__title max-w-xl`}>
            {RESSOURCES_HUB_H1}
          </h1>
          <p className={`${OFC_TYPE_LEAD} ressources-hub-hero__intro max-w-lg text-ofc-ink-muted`}>
            {RESSOURCES_HUB_INTRO}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Engagements">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#377CF3]/20 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#377CF3] shadow-sm">
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[220px] flex-1 sm:min-h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%]">
          <div
            className="ressources-hub-hero__image-mask absolute inset-0 bg-[#E2E8F0]"
            aria-hidden
          />
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            className="object-cover object-[center_25%] lg:object-[center_20%]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            quality={80}
          />
        </div>
      </div>
    </section>
  );
}
