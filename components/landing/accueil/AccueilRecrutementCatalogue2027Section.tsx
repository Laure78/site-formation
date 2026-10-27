import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_RECRUTEMENT } from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_EYEBROW } from '@/lib/ofc-interaction-classes';

/**
 * Accueil — bandeau recrutement formateurs catalogue 2027 (sous le hero).
 */
export function AccueilRecrutementCatalogue2027Section() {
  const mailto = formateurRecruitmentMailtoHref();
  const R = ACCUEIL_RECRUTEMENT;

  return (
    <Section
      id="recrutement-catalogue-2027"
      tone="muted"
      size="compact"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] border-y border-ofc-border bg-[#F2F2F2]"
      aria-labelledby="accueil-recrutement-title"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="min-w-0 flex-1">
          <p className={OFC_EYEBROW}>{R.eyebrow}</p>
          <h2
            id="accueil-recrutement-title"
            className="mt-2 font-display text-xl font-bold tracking-tight text-ofc-ink md:text-2xl"
          >
            {R.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">{R.lead}</p>
          <p className="mt-4 text-sm font-medium text-ofc-ink">{R.facts}</p>
        </div>

        <div className="w-full shrink-0 lg:max-w-sm">
          <Link
            href={LINKS.devenezConsultant}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 text-center`}
          >
            {R.ctaLabel}
          </Link>
          <p className="mt-4 text-sm text-ofc-ink-muted">
            {R.emailHint}{' '}
            <a
              href={mailto}
              className="break-all font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
