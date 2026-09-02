'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, Shield, Target, TrendingUp } from 'lucide-react';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { trackCtaRdvClick } from '@/lib/cta-analytics';
import { LINKS } from '@/lib/internal-links';
import { maturityDisplayLabel, potentialDisplay } from '@/lib/diagnostic-ia-btp/scoring';
import type { DiagnosticResult as DiagnosticResultType } from '@/lib/diagnostic-ia-btp/types';
import {
  trackDiagnosticContactClicked,
  trackDiagnosticTrainingClicked,
} from '@/lib/diagnostic-ia-btp/analytics';

type Props = {
  result: DiagnosticResultType;
  showLeadForm?: boolean;
  leadForm?: React.ReactNode;
};

function DiagnosticRdvLink({
  origin,
  label,
  className,
}: {
  origin: string;
  label: string;
  className: string;
}) {
  return (
    <Link
      href={LINKS.prendreRdv}
      data-cta="rdv"
      className={className}
      onClick={() => {
        trackDiagnosticContactClicked(origin);
        trackCtaRdvClick(origin, '/diagnostic-ia-btp');
      }}
    >
      {label}
    </Link>
  );
}

function ScoreCard({
  label,
  value,
  suffix,
  sublabel,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  sublabel?: string;
  icon: typeof BarChart3;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <Icon size={18} className="shrink-0 text-[#377CF3]" aria-hidden />
      </div>
      <p className="mt-2 font-display text-2xl font-bold text-slate-900">
        {value}
        {suffix ? <span className="text-lg font-semibold text-slate-500">{suffix}</span> : null}
      </p>
      {sublabel ? <p className="mt-1 text-sm font-medium text-[#377CF3]">{sublabel}</p> : null}
    </div>
  );
}

export function DiagnosticResult({ result, showLeadForm, leadForm }: Props) {
  const { scores, priorities, timeGain, training, securityRecommendation, constructysNote } = result;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
          Votre diagnostic IA BTP
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Synthèse indicative basée sur vos réponses — opportunités d&apos;automatisation et prochaines
          étapes pour votre entreprise.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ScoreCard
          label="Maturité IA"
          value={scores.maturity}
          suffix="/100"
          sublabel={maturityDisplayLabel(scores.maturityLabel)}
          icon={BarChart3}
        />
        <ScoreCard
          label="Potentiel de gain"
          value={scores.gainPotential}
          suffix="/100"
          sublabel="Estimation indicative"
          icon={TrendingUp}
        />
        <ScoreCard
          label="Organisation numérique"
          value={scores.organisation}
          suffix="/100"
          sublabel={maturityDisplayLabel(scores.organisationLabel)}
          icon={BarChart3}
        />
        <ScoreCard
          label="Automatisation"
          value={scores.automation}
          suffix="/100"
          icon={Target}
        />
        <ScoreCard
          label="Sécurisation des usages"
          value={scores.security}
          suffix="/100"
          sublabel={scores.securityLabel}
          icon={Shield}
        />
        <div className="rounded-xl border border-[#377CF3]/25 bg-[#EFF6FF] p-4 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Priorité globale</p>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900">{scores.globalPriorityLabel}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="font-display text-lg font-bold text-slate-900">Potentiel de gain estimé</h3>
        <p className="mt-2 text-base font-semibold text-slate-800">
          Potentiel estimé : {timeGain.weeklyMin} à {timeGain.weeklyMax} h/semaine
        </p>
        <p className="mt-1 text-sm text-slate-600">
          ≈ {timeGain.annualMin} à {timeGain.annualMax} heures par an
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{timeGain.disclaimer}</p>
        <DisclaimerGains className="mt-3" />
      </div>

      {securityRecommendation ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900">Sécurisation des usages</p>
          <p className="mt-2">{securityRecommendation}</p>
        </div>
      ) : null}

      {priorities.length > 0 ? (
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">Vos 3 priorités IA</h3>
          <ol className="mt-4 space-y-4">
            {priorities.map((priority) => (
              <li
                key={priority.rank}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                      Priorité {priority.rank}
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-slate-900">{priority.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{priority.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#377CF3]">
                    Potentiel : {potentialDisplay(priority.potential)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  <strong className="text-slate-800">Pourquoi :</strong> {priority.why}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="rounded-xl border-2 border-[#377CF3]/20 bg-white p-5 shadow-sm md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Parcours recommandé</p>
        <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{training.title}</h3>
        {training.code ? (
          <p className="mt-1 text-sm text-slate-500">Catalogue {training.code}</p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          <strong className="text-slate-900">Pourquoi cette formation ?</strong> {training.why}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={training.href}
            onClick={() => trackDiagnosticTrainingClicked(training.href, training.code)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
          >
            Voir le programme
            <ArrowRight size={16} aria-hidden />
          </Link>
          <DiagnosticRdvLink
            origin="diagnostic-result-rdv"
            label="Parler de mon diagnostic"
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-[#377CF3] hover:bg-[#EFF6FF]"
          />
        </div>
      </div>

      {constructysNote ? (
        <p className="text-sm leading-relaxed text-slate-600">{constructysNote}</p>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="font-display text-base font-bold text-slate-900">
          Vous souhaitez identifier les usages IA les plus rentables pour votre entreprise ?
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <DiagnosticRdvLink
            origin="diagnostic-final-cta"
            label="Échanger sur mon diagnostic"
            className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
          />
          <Link
            href={LINKS.formations}
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#377CF3]"
          >
            Voir les formations IA BTP
          </Link>
        </div>
      </div>

      {showLeadForm && leadForm ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">{leadForm}</div>
      ) : null}
    </div>
  );
}
