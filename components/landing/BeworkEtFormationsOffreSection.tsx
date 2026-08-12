'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Check, Clock, Users } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_DEFAULT_BUTTON_TEXT } from '@/lib/calendly-embed-config';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { SITE_CONFIG } from '@/lib/seo';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  FORMATIONS_CATALOGUE,
  CATALOGUE_FORMATIONS_COUNT,
  cataloguePedagogicalLevelBadge,
  catalogueNiveauEtLevel,
} from '@/lib/formations-catalogue-display';
import { CataloguePriceBadge, CatalogueTarifStrip } from '@/components/formations/CataloguePriceBadge';

const POURQUOI = [
  '10+ ans terrain (conductrice de travaux, dirigeante BTP)',
  'Qualiopi · actions déclarées',
  'Références : FFB Grand Paris, FFB IDF, CSFE',
  'Instructrice LinkedIn Learning (IA BTP)',
] as const;

const POUR_QUI = [
  'Dirigeants PME et ETI BTP',
  'Chargés d’affaires, conducteurs de travaux, bureaux d’études',
  'Support : admin, RH, communication',
  'Fédérations, OPCO, organismes BTP',
] as const;

/**
 * Accueil : catalogue OFC (5 formations) en priorité, puis encart BeWork compact
 * (service distinct, non éligible OPCO — voir QUALIOPI_BEWORK_DISTINCTION).
 */
export function BeworkEtFormationsOffreSection() {
  return (
    <section
      id="offre-bework-formations"
      aria-labelledby="offre-formations-title"
      className={OFC_SEC.mutedMesh}
    >
      <div className="mx-auto max-w-7xl space-y-12 md:space-y-14">
        {/* Catalogue OFC — 6 fiches, ancre #offre-formations */}
        <div id="offre-formations" className="scroll-mt-28">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <span>Formations IA pour le BTP</span>
            </div>
            <h2
              id="offre-formations-title"
              className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Mes formations IA pour le BTP et la construction
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Formations IA Qualiopi / OPCO — intra ou inter, en présentiel en Île-de-France, pour les équipes du
              bâtiment et de la construction. Financement possible selon éligibilité.
            </p>
            <CatalogueTarifStrip className="mt-5" />
          </Reveal>

          <RevealGroup className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3" staggerMs={50}>
            {FORMATIONS_CATALOGUE.map((cours) => (
              <article
                key={cours.ref}
                className={`${OFC_CARD} flex flex-col overflow-hidden`}
              >
                <div className="relative w-full shrink-0 border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-4">
                  <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden sm:max-w-[220px] md:max-w-[240px]">
                    <Image
                      src={cours.visuel.src}
                      alt={cours.visuel.alt}
                      title={
                        'title' in cours.visuel && typeof cours.visuel.title === 'string'
                          ? cours.visuel.title
                          : undefined
                      }
                      fill
                      loading="lazy"
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 200px, 240px"
                    />
                    <CataloguePriceBadge level={cours.level} prixHT={cours.prixHT} variant="overlay" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-slate-500">
                      {catalogueNiveauEtLevel(cours.ref, cours.level)}
                    </span>
                    <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {cataloguePedagogicalLevelBadge(cours.ref)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">{cours.title}</h3>
                  <CataloguePriceBadge level={cours.level} prixHT={cours.prixHT} variant="banner" className="mt-4" />
                  <div className="mt-3 flex flex-wrap gap-4 rounded-lg bg-slate-50 px-4 py-3">
                    <span className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} strokeWidth={1.5} aria-hidden />
                      {cours.duree}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} strokeWidth={1.5} aria-hidden />
                      {cours.effectif}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{cours.pitch}</p>
                  <p className="mt-4 font-semibold text-slate-900">OBJECTIFS PÉDAGOGIQUES</p>
                  <ul className="mt-2 flex-1 space-y-2">
                    {cours.objectifs.map((obj) => (
                      <li key={obj} className="flex gap-2 text-sm text-slate-600">
                        <Check
                          size={18}
                          strokeWidth={1.5}
                          className="shrink-0 text-[var(--accent)]"
                          aria-hidden
                        />
                        {obj}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cours.href}
                    className={`${OFC_CTA_PRIMARY} mt-6 block w-full py-3`}
                    title={`Voir la fiche : ${cours.title}`}
                  >
                    Voir la fiche formation
                  </Link>
                  <a
                    href={cours.programmePdfHref}
                    download
                    className="mt-3 block w-full rounded-xl border-2 border-slate-200 py-3 text-center text-sm font-semibold text-slate-800 hover:border-[var(--accent)]"
                  >
                    Télécharger le programme (PDF)
                  </a>
                </div>
              </article>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <p className="text-base font-semibold text-slate-700">
              Catalogue complet : {CATALOGUE_FORMATIONS_COUNT} formations IA pour le BTP
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <RdvLink
                page="/"
                ctaPosition="middle"
                campaign="home-offre-formations-rdv"
                className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                {CALENDLY_DEFAULT_BUTTON_TEXT}
              </RdvLink>
              <Link href={LINKS.financement} className={`${OFC_LINK} inline-flex items-center text-sm font-semibold`}>
                Financement OPCO&nbsp;: modalités Constructys
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Encart BeWork compact — charte #1D4ED8, un seul lien /bework */}
        <Reveal>
          <aside
            id="offre-bework"
            aria-labelledby="offre-bework-title"
            className="scroll-mt-28 rounded-2xl border border-[#1D4ED8]/25 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/40 px-6 py-7 shadow-[0_4px_16px_rgba(29,78,216,0.08)] md:px-8 md:py-8"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#1D4ED8]">
              BeWork · Solutions IA sur mesure BTP
            </p>
            <h3
              id="offre-bework-title"
              className="mt-3 font-display text-xl font-bold tracking-tight text-[#1E3A8A] md:text-2xl"
            >
              Imaginez ce que l&apos;IA pourrait faire pour votre entreprise
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#1E3A8A]/90">
              BeWork conçoit des solutions IA autour de vos métiers et outils : applications, automatisations,
              assistants et plateformes métier.
            </p>
            <p className="mt-2 max-w-3xl text-base font-semibold italic leading-relaxed text-[#1D4ED8]">
              La technologie construite autour de votre entreprise.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475569]">
              {QUALIOPI_BEWORK_DISTINCTION}
            </p>
            <Link
              href={LINKS.bework}
              title="BeWork — solutions IA sur mesure pour le BTP"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1D4ED8] transition-colors hover:text-[#1E40AF] hover:underline"
            >
              Découvrir BeWork →
            </Link>
          </aside>
        </Reveal>

        <Reveal>
          <div className="space-y-10 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-[0_4px_16px_rgba(55,124,243,0.06)] md:px-10 md:py-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  Pourquoi Laure Olivié
                </h3>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-[#5A5A5A]">
                  {POURQUOI.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  Pour qui
                </h3>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-[#5A5A5A]">
                  {POUR_QUI.map((line) => (
                    <li key={line}>— {line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#F2F2F2] pt-8">
              <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                Contact
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#5A5A5A]">
                Formations en présentiel en Île-de-France (intra ou inter). Écrivez-moi ou prenez un créneau découverte.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-base text-[#1A1A1A] sm:flex-row sm:flex-wrap sm:gap-x-6">
                <a href={`mailto:${SITE_CONFIG.email}`} className={OFC_LINK}>
                  {SITE_CONFIG.email}
                </a>
                <span className="font-semibold text-[#334155]">laureolivie.fr</span>
              </div>
              <div className="mt-6">
                <RdvLink
                  page="/"
                  ctaPosition="middle"
                  campaign="home-offre-bework-formations-rdv"
                  className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
                >
                  {CALENDLY_DEFAULT_BUTTON_TEXT}
                </RdvLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
