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
  FC_ICON_SQUARE,
  FC_SECTION,
  FC_SUBTITLE,
  FC_TITLE,
} from '@/lib/financement-constructys-ui';

const BAREMES = [
  { ...CONSTRUCTYS_PLAFOND_TPE, icon: Users },
  { ...CONSTRUCTYS_PLAFOND_PME, icon: Building2 },
] as const;

export function FinancementBaremesSection() {
  return (
    <section id="baremes-constructys" aria-labelledby="baremes-title" className={FC_SECTION}>
      <h2 id="baremes-title" className={FC_TITLE}>
        Quel financement pour votre entreprise ?
      </h2>
      <p className={FC_SUBTITLE}>
        Plafonds horaires indicatifs pour le Bâtiment — non applicables automatiquement aux Travaux
        publics, dirigeants non salariés ou autres dispositifs.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {BAREMES.map((barème) => {
          const Icon = barème.icon;
          return (
            <article key={barème.label} className={`${FC_CARD} md:p-8`}>
              <div className="flex items-start gap-4">
                <span className={FC_ICON_SQUARE}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-[#081943]">
                    {barème.labelCarte}
                  </h3>
                  <p className="text-sm text-[#64748B]">{barème.sousTitreCarte}</p>
                </div>
              </div>
              <p className={`${FC_ACCENT_VALUE} mt-6`}>
                {barème.plafondHoraireHt} €{' '}
                <span className="text-base font-semibold text-[#64748B] md:text-lg">
                  HT/h/stagiaire
                </span>
              </p>
              <p className="mt-2 text-xs text-[#64748B] md:text-sm">
                Plafond journalier intra-groupe :{' '}
                <strong className="text-[#081943]">
                  {formatMontantHt(barème.plafondGroupeJourHt)}
                </strong>
              </p>
              <p className="mt-4 border-t border-[#EAF3FF] pt-4 text-xs font-medium text-[#64748B]">
                Barème 2026
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-center text-xs font-medium text-[#64748B] md:text-sm">
        {CONSTRUCTYS_BAREMES_MENTION}
      </p>
    </section>
  );
}
