import Link from 'next/link';
import { Building2, Users } from 'lucide-react';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { CtaDevis } from '@/components/CtaDevis';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';

type Props = {
  formationTitle: string;
  durationLabel: string;
  interPriceLabel: string;
  effectifLabel: string;
  showTvaAsterisk?: boolean;
};

const ICON_STROKE = 2;

/** Cartes Inter / Intra — format catalogue NIV-01. */
export function Niv01MaquetteFormatSection({
  formationTitle,
  durationLabel,
  interPriceLabel,
  effectifLabel,
  showTvaAsterisk = true,
}: Props) {
  const devisIntraHref = catalogueDemandeHref({
    formationOuParcours: formationTitle,
    nature: 'intra',
    variante: 'intra-entreprise',
  });

  return (
    <section
      className="border-b border-[#DAE3F0] bg-[#F8FAFC] px-4 py-10 md:py-12"
      aria-labelledby="niv01-format-title"
    >
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <h2
          id="niv01-format-title"
          className="font-display text-2xl font-extrabold tracking-tight text-[#101936] md:text-[1.75rem]"
        >
          Choisissez votre format
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
          <article className="formation-niv01-maquette-card flex h-full flex-col rounded-2xl border border-[#DAE3F0] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                <Users className="h-5 w-5" strokeWidth={ICON_STROKE} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-[#101936]">Inter</h3>
                <p className="text-sm text-ofc-ink-muted">Session ouverte à plusieurs entreprises</p>
              </div>
            </div>
            <p className="mt-5 font-display text-2xl font-extrabold text-[#101936]">
              {interPriceLabel}
              {showTvaAsterisk ? <MentionTvaAsterisque /> : null}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ofc-ink-muted">
              <li>{effectifLabel}</li>
              <li>Durée : {durationLabel}</li>
              <li>Présentiel Île-de-France</li>
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href={`#${TRAINING_ANCHOR.sessions}`}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3`}
              >
                Voir les dates
              </Link>
            </div>
          </article>

          <article className="formation-niv01-maquette-card flex h-full flex-col rounded-2xl border border-[#DAE3F0] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                <Building2 className="h-5 w-5" strokeWidth={ICON_STROKE} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-[#101936]">Intra</h3>
                <p className="text-sm text-ofc-ink-muted">Dans votre entreprise</p>
              </div>
            </div>
            <p className="mt-5 font-display text-xl font-extrabold text-[#101936]">Devis personnalisé</p>
            <ul className="mt-4 space-y-2 text-sm text-ofc-ink-muted">
              <li>Programme adaptable à votre équipe</li>
              <li>Durée : {durationLabel}</li>
              <li>Dans vos locaux — Île-de-France</li>
            </ul>
            <div className="mt-auto pt-6">
              <CtaDevis
                href={devisIntraHref}
                className="inline-flex min-h-11 w-full items-center justify-center px-5 py-3"
              />
            </div>
          </article>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ofc-ink-muted">{FINANCEMENT_FORMULATION_COURTE}</p>
      </div>
    </section>
  );
}
