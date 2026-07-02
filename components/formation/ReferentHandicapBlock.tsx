import Link from 'next/link';
import { Accessibility, Mail, Phone } from 'lucide-react';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_LEGAL, QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';

type ReferentHandicapBlockProps = {
  variant?: 'card' | 'compact';
  className?: string;
  showQualiopi?: boolean;
};

/** Référente handicap OFC — contact direct (indicateur 1 Qualiopi). */
export function ReferentHandicapBlock({
  variant = 'card',
  className = '',
  showQualiopi = true,
}: ReferentHandicapBlockProps) {
  const { nom, role, email, telephone, telephoneTel } = QUALIOPI_REFERENT_HANDICAP;

  if (variant === 'compact') {
    return (
      <div className={`rounded-xl border border-blue-100 bg-[#EFF6FF] px-4 py-3 text-sm text-slate-700 ${className}`}>
        <p className="font-semibold text-slate-900">
          <Accessibility className="mr-1.5 inline h-4 w-4 text-[#377CF3]" aria-hidden />
          {role} : {nom}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 font-medium text-[#377CF3] hover:underline">
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            {email}
          </a>
          <a href={`tel:${telephoneTel}`} className="inline-flex items-center gap-1.5 font-medium text-[#377CF3] hover:underline">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            {telephone}
          </a>
        </p>
        {showQualiopi ? (
          <p className="mt-2 text-xs text-slate-600">
            {QUALIOPI_LEGAL.raisonSociale} — certifiée <QualiopiWordmark /> (actions de formation)
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-gradient-to-br from-[#EFF6FF] to-white p-6 shadow-sm md:p-8 ${className}`}
      aria-labelledby="referent-handicap-heading"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-white">
          <Accessibility className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="referent-handicap-heading" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Référente handicap
          </h2>
          <p className="mt-1 text-slate-600">
            Contact direct pour toute demande d&apos;adaptation avant ou pendant une formation OFC.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200/80 bg-white p-5">
        <p className="text-lg font-semibold text-slate-900">{nom}</p>
        <p className="text-sm text-slate-600">{role} — {QUALIOPI_LEGAL.raisonSociale}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent('Demande accessibilité / handicap — formation OFC')}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {email}
          </a>
          <a
            href={`tel:${telephoneTel}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF]"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {telephone}
          </a>
        </div>
      </div>

      {showQualiopi ? (
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p>
            <strong>Organisme certifié <QualiopiWordmark /></strong> — {QUALIOPI_LEGAL.qualiopiCategoryMention}.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            SIRET {QUALIOPI_LEGAL.siret} · NDA {QUALIOPI_LEGAL.nda}
          </p>
        </div>
      ) : null}

      <p className="mt-4 text-sm text-slate-600">
        <Link href={LINKS.accessibiliteHandicap} className="font-medium text-[#377CF3] hover:underline">
          Voir le processus d&apos;accueil et les adaptations possibles →
        </Link>
      </p>
    </section>
  );
}
