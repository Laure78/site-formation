'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { Reveal } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type Props = {
  /** Ancre pour TOC / liens profonds. */
  id?: string;
  /** Bande grise accueil ou carte intégrée dans un article long. */
  surface?: 'band' | 'card';
};

/**
 * Mise en avant formation « Développement web avec l’IA — sans savoir coder ».
 */
export function BeWorkHighlightSection({ id, surface = 'band' }: Props) {
  const isCard = surface === 'card';
  const headingId = id ? 'dev-web-ia-heading' : 'dev-web-ia-heading-home';

  return (
    <Reveal
      as="section"
      id={id}
      distance={16}
      aria-labelledby={headingId}
      className={
        isCard
          ? 'scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8'
          : OFC_SEC.mutedMesh
      }
    >
      <div className={isCard ? '' : 'ofc-section-inner'}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
              Création avec l’IA
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">Sans savoir coder</p>

            <h2
              id={headingId}
              className="mt-4 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
            >
              Développement web avec l’IA — sans savoir coder
              {id ? (
                <span className="a-propos-title-accent mt-3 block h-1 rounded-full bg-[#377CF3]" aria-hidden />
              ) : null}
            </h2>

            <p className="mt-4 text-base font-semibold leading-relaxed text-[#1A1A1A] md:text-lg">
              Une idée. Une journée. Une première version fonctionnelle — site, application ou outil
              métier avec l’IA, sans programmation.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-[#5A5A5A] md:text-base">
              Formation pratique de Laure Olivié (OFC Création d&apos;Entreprise, Qualiopi) — 7&nbsp;h,
              6 à 8 participants.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={LINKS.formationDeveloppementWebIaSansCoder}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.12)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#2A6BD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Voir la formation
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={LINKS.formations}
                className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#EFF6FF] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Catalogue des formations
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/60 p-6 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              Une idée · Une journée · Une première version
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#334155]">
              <li className="rounded-lg border border-slate-200/80 bg-white/80 px-4 py-3">
                <strong className="font-semibold text-[#0F172A]">
                  Prix de lancement · 7 h · 300 € HT / participant
                </strong>
                <span className="mt-1 block text-[#64748B]">Interentreprises · Intra sur devis</span>
              </li>
              <li className="rounded-lg border border-[#BFDBFE] bg-white px-4 py-3 shadow-sm">
                <strong className="font-semibold text-[#0F172A]">Sans prérequis en code</strong>
                <span className="mt-1 block text-[#64748B]">
                  Présentiel · Île-de-France · inter ou intra sur devis
                </span>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-[#64748B]">
              Prise en charge OPCO possible selon éligibilité · ChatGPT ou Claude requis (hors tarif)
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
