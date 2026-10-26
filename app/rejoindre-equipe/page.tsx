import Link from 'next/link';
import { Check } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { JsonLd } from '@/components/JsonLd';
import { CONTACT, formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import {
  REJOINDRE_EQUIPE_BADGES,
  REJOINDRE_EQUIPE_CTA,
  REJOINDRE_EQUIPE_INTRO,
  REJOINDRE_EQUIPE_NOUS_OFFRONS,
  REJOINDRE_EQUIPE_VOUS_ETES,
} from '@/lib/rejoindre-equipe-content';
import { buildRejoindreEquipeJobPostingJsonLd } from '@/lib/schema-rejoindre-equipe-job-posting';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_PATH = LINKS.rejoindreEquipe;
const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PAGE_PATH}`;

const MAILTO_HREF = formateurRecruitmentMailtoHref();

export const metadata = createPageMetadata({
  title: 'Devenir formateur IA BTP | Rejoindre Laure Olivié',
  titleAbsolute: 'Devenir formateur IA BTP | Rejoindre Laure Olivié',
  description:
    'Artisan ou ancien du BTP ? Rejoignez l’équipe Laure Olivié pour animer des formations IA auprès des pros du bâtiment en Île-de-France. Supports clé en main, planning souple.',
  path: PAGE_PATH,
  keywords: [
    'devenir formateur IA BTP',
    'formateur indépendant bâtiment',
    'recrutement formateur OFC',
    'formation IA présentiel Île-de-France',
  ],
});

const BREADCRUMB_JSON_LD = [
  { name: 'Accueil', url: SITE_CONFIG.url },
  { name: 'Rejoindre l’équipe', url: PAGE_URL },
] as const;

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-[#20262E]">
          <Check
            className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]"
            strokeWidth={2.5}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function RejoindreEquipePage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[...BREADCRUMB_JSON_LD]} id="schema-breadcrumb-rejoindre-equipe" />
      <JsonLd
        id="schema-job-posting-rejoindre-equipe"
        schema={buildRejoindreEquipeJobPostingJsonLd(PAGE_URL)}
      />

      <section
        className="bg-[#377CF3] text-white"
        aria-labelledby="rejoindre-equipe-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-4xl py-10 md:py-12 lg:py-14`}>
          <Breadcrumb
            className="mb-4 text-sm text-white/85 [&_a]:text-white/90 [&_a:hover]:text-white [&_span]:text-white/70"
            items={[
              { label: 'Accueil', href: LINKS.home },
              { label: 'Rejoindre l’équipe', href: PAGE_PATH },
            ]}
            omitJsonLd
          />
          <h1
            id="rejoindre-equipe-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-[2.5rem]"
          >
            Rejoignez l&apos;équipe OFC : formez les pros du BTP à l&apos;IA
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/95 md:text-lg">
            {REJOINDRE_EQUIPE_INTRO.lead}
          </p>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: false })}>
        <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[#20262E]">
            <p>{REJOINDRE_EQUIPE_INTRO.organisme}</p>
            <p className="text-[#555F6D]">{REJOINDRE_EQUIPE_INTRO.recherche}</p>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {REJOINDRE_EQUIPE_BADGES.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex min-h-11 items-center rounded-lg border border-[#DCE8FD] bg-[#DCE8FD]/40 px-4 py-2.5 text-sm font-semibold text-[#20262E]"
              >
                {badge.label}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="ofc-card h-full p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[#20262E] sm:text-2xl">
                Vous êtes…
              </h2>
              <CheckList items={REJOINDRE_EQUIPE_VOUS_ETES} />
            </article>
            <article className="ofc-card h-full p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-[#20262E] sm:text-2xl">
                Nous vous offrons…
              </h2>
              <CheckList items={REJOINDRE_EQUIPE_NOUS_OFFRONS} />
            </article>
          </div>
        </div>
      </section>

      <section
        id="candidature"
        className="scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)] bg-[#DCE8FD]"
        aria-label="Candidature formateur"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-10 md:py-12`}>
          <p className="text-base leading-relaxed text-[#555F6D] md:text-lg">
            {REJOINDRE_EQUIPE_CTA.intro}{' '}
            <a
              href={MAILTO_HREF}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            , {REJOINDRE_EQUIPE_CTA.outro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={MAILTO_HREF}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
              aria-label={`Postuler par email à ${RECRUITMENT.email}`}
            >
              Postuler par email
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
              aria-label={`Appeler OFC au ${CONTACT.phoneDisplay}`}
            >
              Appeler
            </a>
          </div>
          <p className="mt-6">
            <Link
              href={LINKS.formations}
              className="inline-flex min-h-11 items-center text-base font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              Découvrir le catalogue →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
