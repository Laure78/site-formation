import Image from 'next/image';
import Link from 'next/link';
import { getModuleByCode } from '@/data/catalogue-2027';
import {
  FORMATEUR_PROFILE_FORMATION_CARD,
  FORMATEUR_PROFILE_FORMATION_IMAGE_WRAPPER,
} from '@/components/formateurs/profile/formateur-profile-section-styles';
import type { FormateurModuleLink } from '@/lib/formateurs';
import { cn } from '@/lib/cn';
import { OFC_CTA_SECONDARY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import type { FormateurProfileModuleCardContent } from '@/lib/formateurs/profile-module-card-content';

type Props = {
  sectionId?: string;
  headingId: string;
  title: string;
  tone?: 'white' | 'muted';
  moduleLinks: readonly FormateurModuleLink[];
  cardContentByCode: Record<string, FormateurProfileModuleCardContent | undefined>;
  /** Libellé sous la durée — défaut dérivé du lien module. */
  availabilityNote?: string;
  /** Sous le H2 — ex. ouverture 2027 (Thomas). */
  introNote?: string;
  /** Entre durée et disponibilité — ex. modalité / zone. */
  extraMetaLines?: readonly string[];
};

function defaultCtaLabel(link: FormateurModuleLink): string {
  if (link.disponibilite === 'ouverture-2027') {
    return "Être informé de l'ouverture";
  }
  return link.ctaLabel;
}

function availabilityLine(link: FormateurModuleLink, override?: string): string {
  if (override) return override;
  if (link.disponibilite === 'ouverture-2027') {
    return 'Disponibilité : ouverture prévue en 2027.';
  }
  return `Disponibilité : ${link.disponibiliteLabel.toLowerCase()}.`;
}

/** Rubrique formations modules — cartes Marc (statut et lien depuis `getFormateurModuleLinks`). */
export function FormateurProfileModuleFormationsSection({
  sectionId,
  headingId,
  title,
  tone = 'muted',
  moduleLinks,
  cardContentByCode,
  availabilityNote,
  introNote,
  extraMetaLines,
}: Props) {
  if (moduleLinks.length === 0) return null;

  return (
    <section
      id={sectionId}
      className={cn(
        ofcSectionClasses({ tone, size: 'compact', divide: true }),
        sectionId && 'scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]',
      )}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
        <h2 id={headingId} className={OFC_TYPE_H2}>
          {title}
        </h2>
        {introNote ? (
          <p className="mt-3 text-sm font-medium text-slate-600">{introNote}</p>
        ) : null}
        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {moduleLinks.map((link) => {
            const mod = getModuleByCode(link.code);
            const content = cardContentByCode[link.code];
            const visual = content?.photo;
            const themes = content?.themes ?? [];
            const accroche = content?.accroche ?? '';
            const duree = mod ? `${mod.dureeHeures} heures` : '—';
            const showCode = content?.showCode !== false;
            const ctaLabel = defaultCtaLabel(link);

            return (
              <li key={link.code} className={FORMATEUR_PROFILE_FORMATION_CARD}>
                {visual ? (
                  <div className={FORMATEUR_PROFILE_FORMATION_IMAGE_WRAPPER}>
                    <Image
                      src={visual.src}
                      alt={content?.imageAlt ?? ''}
                      width={visual.width}
                      height={visual.height}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {content?.category ? (
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                      {content.category}
                    </p>
                  ) : showCode ? (
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {link.code}
                    </p>
                  ) : null}
                  <h3 className="mt-2 font-display text-xl font-bold text-[#101936] text-pretty">
                    {link.titre}
                  </h3>
                  {accroche ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{accroche}</p>
                  ) : null}
                  {themes.length > 0 ? (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      {themes.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-4 text-sm font-medium text-slate-800">Durée : {duree}</p>
                  {extraMetaLines?.map((line) => (
                    <p key={line} className="mt-1 text-sm text-slate-600">
                      {line}
                    </p>
                  ))}
                  <p className="mt-1 text-sm text-slate-600">
                    {availabilityLine(link, availabilityNote)}
                  </p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={link.href}
                      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold`}
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}