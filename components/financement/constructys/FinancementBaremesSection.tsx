import { Building2, Users } from 'lucide-react';
import {
  CONSTRUCTYS_BAREMES_MENTION,
  CONSTRUCTYS_PLAFOND_PME,
  CONSTRUCTYS_PLAFOND_TPE,
  formatMontantHt,
} from '@/lib/financement-constructys-page-config';
import {
  FC_ACCENT_VALUE,
  FC_CARD,
  FC_SECTION,
  FC_SUBTITLE,
  FC_TITLE,
} from '@/lib/financement-constructys-ui';

const BAREMES = [
  {
    ...CONSTRUCTYS_PLAFOND_TPE,
    icon: Users,
  },
  {
    ...CONSTRUCTYS_PLAFOND_PME,
    icon: Building2,
  },
] as const;

export function FinancementBaremesSection() {
  return (
    <section id="baremes-constructys" aria-labelledby="baremes-title" className={FC_SECTION}>
      <h2 id="baremes-title" className={FC_TITLE}>
        Quel financement pour votre entreprise ?
      </h2>
      <p className={FC_SUBTITLE}>
        Plafonds horaires indicatifs pour le Bâtiment (plan de développement des compétences) — non
        applicables automatiquement aux Travaux publics, dirigeants non salariés ou autres
        dispositifs.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {BAREMES.map((barème) => {
          const Icon = barème.icon;
          return (
            <article key={barème.label} className={`${FC_CARD} text-center md:text-left`}>
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF]">
                  <Icon className="h-6 w-6 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-[#081943]">
                    {barème.labelCarte}
                  </h3>
                  <p className="text-sm text-ofc-ink-muted">{barème.sousTitreCarte}</p>
                </div>
              </div>
              <p className={`${FC_ACCENT_VALUE} mt-6`}>
                {barème.plafondHoraireHt} €{' '}
                <span className="text-lg font-semibold text-ofc-ink-muted md:text-xl">
                  HT/h/stagiaire
                </span>
              </p>
              <p className="mt-3 text-sm text-ofc-ink-muted">
                Plafond journalier intra-groupe (le cas échéant) :{' '}
                <strong className="text-[#081943]">
                  {formatMontantHt(barème.plafondGroupeJourHt)}
                </strong>
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-center text-sm font-medium text-ofc-ink-muted">
        {CONSTRUCTYS_BAREMES_MENTION}
      </p>
    </section>
  );
}
