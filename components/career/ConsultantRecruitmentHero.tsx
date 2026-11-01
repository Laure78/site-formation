import Image from 'next/image';
import { DEVENEZ_CONSULTANT_HERO } from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER } from '@/lib/devenez-consultant-layout';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_TYPE_BODY,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

const H = DEVENEZ_CONSULTANT_HERO;
const HERO_IMAGE = PHOTOS.recrutementFormateursIaBtpHero2027;

export function ConsultantRecruitmentHero() {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: true, divide: true })}
      aria-labelledby="devenez-consultant-h1"
    >
      <div className={DEVENEZ_CONSULTANT_INNER}>
        <div className="lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,24rem)] lg:items-center lg:gap-8 xl:gap-10">
          <div className="min-w-0">
            <p className={OFC_EYEBROW}>Recrutement formateurs · Catalogue 2027</p>
            <h1 id="devenez-consultant-h1" className={`${OFC_TYPE_HERO} mt-2 text-pretty`}>
              {H.h1}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-snug text-slate-900 text-pretty">
              {H.hook}
            </p>
            <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted text-pretty`}>{H.intro}</p>
            <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted text-pretty`}>{H.objectif}</p>
            <p className={`${OFC_TYPE_BODY} mt-3 font-medium text-ofc-ink`}>{H.perimetre}</p>

            <ul
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Informations sur le recrutement"
            >
              {H.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-[#377CF3]/25 bg-[#377CF3]/5 px-3.5 py-1.5 text-sm font-medium text-slate-800"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#candidature"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              >
                {H.primaryCtaLabel}
              </a>
              <a
                href="#profils-recherches"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              >
                {H.secondaryCtaLabel}
              </a>
            </div>
          </div>

          <figure className="relative mt-8 overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50 lg:mt-0">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 384px"
              priority
            />
          </figure>
        </div>

        <aside
          className="mt-8 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm leading-relaxed text-slate-700 sm:px-5"
          aria-label="En bref"
        >
          <p>
            <span className="font-semibold text-slate-900">En bref — </span>
            {H.enBref}
          </p>
        </aside>
      </div>
    </section>
  );
}
