import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LINKS } from '@/lib/internal-links';
import {
  ACCUEIL_OUTILS_IA_HIGHLIGHTS,
  ACCUEIL_OUTILS_IA_USAGES,
} from '@/lib/ia-outils-btp-selection';
import { OFC_CARD, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/**
 * Accueil — bloc compact outils × métiers BTP (ChatGPT / Claude + usages + hub).
 */
export function AccueilOutilsIaMetiersSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-outils-ia-title">
      <SectionHeader
        titleId="accueil-outils-ia-title"
        title="Des outils d’IA appliqués aux métiers du BTP"
        description="Une sélection d’assistants d’IA pour le bâtiment et les travaux publics — usages concrets, validation métier, formations en présentiel Île-de-France."
        className="mx-auto max-w-2xl"
        align="center"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ACCUEIL_OUTILS_IA_HIGHLIGHTS.map((item) => (
          <article key={item.tool} className={`${OFC_CARD} flex h-full flex-col p-6`}>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ofc-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {item.editor}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-ofc-ink">{item.tool}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{item.usage}</p>
            <Link href={item.href} className={`${OFC_LINK} mt-4 inline-flex items-center gap-1 text-sm font-semibold`}>
              {item.cta}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-ofc-card border border-ofc-border bg-ofc-surface/40 p-5 md:p-6">
        <p className="text-sm font-semibold text-ofc-ink">Exemples d’usage sur le terrain</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ACCUEIL_OUTILS_IA_USAGES.map((u) => (
            <li key={u.href}>
              <Link
                href={u.href}
                className="inline-flex rounded-full border border-ofc-border bg-white px-3 py-1.5 text-sm font-medium text-ofc-ink transition hover:border-ofc-accent hover:text-ofc-accent"
              >
                {u.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ofc-ink-muted">
          Comparatif, éditeurs et limites :{' '}
          <Link href={LINKS.outilsIaBtp} className={`${OFC_LINK} font-medium`}>
            sélection d’outils IA pour le BTP
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href={LINKS.formations} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center px-6 py-3 text-sm`}>
          Voir les formations catalogue
        </Link>
      </div>
    </Section>
  );
}
