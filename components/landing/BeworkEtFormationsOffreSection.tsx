'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Briefcase, Check, Clock, GraduationCap } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { RdvLink } from '@/components/RdvLink';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import {
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { StatCallout } from '@/components/readability/StatCallout';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { COUNT_UP_PROS_PLUS, COUNT_UP_RATING } from '@/lib/readability-presets';
import { SITE_CONFIG } from '@/lib/seo';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { OFC_CARD, OFC_CARD_MUTED } from '@/lib/ofc-interaction-classes';
import {
  formationCatalogueLinkLabel,
  FORMATIONS_CATALOGUE,
} from '@/lib/formations-catalogue-display';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';

const BEWORK_PILOTES = [
  'Comptes rendus de chantier',
  'Analyse de DCE',
  'PPSPS',
  'Mémoire technique',
  'Chiffrage de devis',
  'Dossiers travaux',
  'Relances et suivi administratif',
] as const;

const CONCRET = [
  'Appels d\'offres : analyse DCE et mémoire technique assistés — relecture métier obligatoire',
  'Chantier : DOE, PV, CR à partir de vos notes — vous validez et signez',
  'Communication : visuels avant/après et posts réseaux pour vos chantiers',
  'Prompts sur mesure : méthodes adaptées à vos documents et process',
] as const;

const POURQUOI = [
  '10+ ans terrain (conductrice de travaux, dirigeante BTP)',
  'Qualiopi · actions déclarées',
  'Références : FFB Grand Paris, FFB IDF, CSFE, CAPEB',
  'Instructrice LinkedIn Learning (IA BTP)',
] as const;

const POUR_QUI = [
  'Dirigeants PME et ETI BTP',
  'Chargés d’affaires, conducteurs de travaux, bureaux d’études',
  'Support : admin, RH, communication',
  'Fédérations, OPCO, organismes BTP',
] as const;

/**
 * Accueil : pose la perte de temps admin, deux voies (BeWork vs formations OFC),
 * preuves et contact — tarifs alignés sur `lib/tarifs-sessions.ts`.
 */
export function BeworkEtFormationsOffreSection() {
  return (
    <section
      id="offre-bework-formations"
      aria-labelledby="offre-bework-formations-title"
      className={OFC_SEC.mutedMesh}
    >
      <div className="mx-auto max-w-6xl space-y-12 md:space-y-14">
        <Reveal as="header" className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#377CF3]/20 bg-white px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#377CF3] shadow-sm sm:text-xs">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              Admin chantier · productivité
            </p>
            <h2
              id="offre-bework-formations-title"
              className="mt-5 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
            >
              <span className="text-[#377CF3]">5 à 10 h</span> par semaine perdues en admin chantier&nbsp;?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5A5A5A] md:text-lg">
              Relances oubliées, dossiers AO lourds, pièces qui s&apos;accumulent. Ce n&apos;est pas un manque de
              volonté — c&apos;est un manque de{' '}
              <strong className="font-semibold text-[#334155]">bande passante bureau</strong>.
            </p>
          </div>

          <KeyPoint
            label="Deux réponses concrètes"
            subject="L'administratif chantier"
            after="externalisé ou automatisé en interne"
            before="s'accumule sans méthode"
            className="mx-auto mt-8 max-w-2xl"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <a
              href="#offre-bework"
              className={`${OFC_CARD_MUTED} group flex flex-col rounded-2xl p-5 text-left sm:p-6`}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#377CF3]">
                <Briefcase className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Option 1
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-[#1A1A1A] group-hover:text-[#377CF3] md:text-xl">
                Déléguer avec BeWork
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5A5A5A] md:text-base">
                Relais administratif externalisé — CR, DCE, DOE, relances. Vous tenez le chantier, BeWork tient le
                bureau.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3]">
                Voir BeWork
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </a>

            <a
              href="#offre-formations"
              className={`${OFC_CARD} group flex flex-col rounded-2xl border-[#377CF3]/25 bg-white p-5 text-left ring-1 ring-[#377CF3]/10 sm:p-6`}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D4E3FC]/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#2563EB]">
                <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Option 2
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-[#1A1A1A] group-hover:text-[#377CF3] md:text-xl">
                Former vos équipes
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5A5A5A] md:text-base">
                Sessions IA Qualiopi de 4 h sur vos vrais documents — autonomie en interne, financement OPCO possible.
              </p>
              <p className="mt-3 text-xs font-semibold text-[#64748B]">
                {formatTarifHt(TARIF_SESSION_DEBUTANT_HT)} € ou {formatTarifHt(TARIF_SESSION_AVANCE_HT)} € HT / session
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3]">
                Voir le catalogue
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </a>
          </div>
        </Reveal>

        <RevealGroup className="grid gap-6 lg:grid-cols-2 lg:gap-8" staggerMs={70}>
          {/* BeWork */}
          <article
            id="offre-bework"
            className="flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFF6FF]">
              <Image
                src={PHOTOS.beworkHeroRelaisAdministratif.src}
                alt={PHOTOS.beworkHeroRelaisAdministratif.alt}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
                  Assistant de gestion travaux · Relais BTP
                </p>
                <p className="mt-1 text-sm font-medium text-[#377CF3]">
                  Boosté à l&apos;IA · note chantier
                </p>
                <h3 className="mt-4 border-b border-[#377CF3]/35 pb-2 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  BeWork — l&apos;assistant travaux
                </h3>
            </div>
            <p className="mt-4 text-lg font-semibold leading-snug text-[#1A1A1A]">
              Gagnez du temps sur l&apos;administratif chantier.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5A5A5A]">
              <span className="font-semibold text-[#334155]">BeWork</span> produit vos livrables bureau — CR, DCE, DOE,
              relances. Service externalisé, distinct des formations Qualiopi OFC.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm text-[#1A1A1A]" aria-label="Missions types BeWork">
              {BEWORK_PILOTES.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2F2F2] bg-[#FAFBFD] px-2.5 py-1 font-medium text-[#334155]"
                >
                  <span className="font-bold text-[#377CF3]" aria-hidden>
                    ·
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold italic text-[#1A1A1A]">
              On tient le bureau, vous tenez le chantier.
            </p>
            <div className="mt-6 mt-auto flex flex-wrap gap-3 pt-2">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — site officiel bework.fr (nouvel onglet)"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9] sm:flex-none"
              >
                Demander un diagnostic
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
              <Link
                href={LINKS.bework}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#377CF3] bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF] sm:flex-none"
              >
                Voir les missions
              </Link>
            </div>
            </div>
          </article>

          {/* Formations OFC */}
          <article
            id="offre-formations"
            className="flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)]"
          >
            <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
                  OFC · Création d&apos;entreprise · Qualiopi
                </p>
                <h3 className="mt-2 border-b border-[#377CF3]/35 pb-2 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  Mes formations IA pour le BTP
                </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5A5A5A]">
              Formez vos équipes à l&apos;IA sur vos vrais documents. Exercices terrain, sans jargon. Financement OPCO
              (Constructys) selon éligibilité.
            </p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#334155]">
              {FORMATIONS_CATALOGUE.map((entry) => (
                <div
                  key={entry.ref}
                  className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFD] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#1A1A1A]">
                        <Link href={entry.href} className="text-[#377CF3] underline-offset-2 hover:underline">
                          {formationCatalogueLinkLabel(entry)}
                        </Link>
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#64748B]">
                        {entry.duree} · {entry.effectif}
                      </p>
                    </div>
                    <CataloguePriceBadge
                      level={entry.level}
                      variant="pill"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5A5A5A]">{entry.pitch}</p>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-4">
                <p className="font-semibold text-[#1A1A1A]">Sur mesure</p>
                <p className="mt-1.5 text-sm text-[#5A5A5A]">
                  Webinaires et journées fil rouge pour fédérations et réseaux. Précisez votre besoin au RDV.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link
                href={LINKS.formations}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#377CF3] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]/60"
              >
                Catalogue formations
              </Link>
              <Link
                href={LINKS.financement}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-transparent bg-[#377CF3]/10 px-4 py-2.5 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]"
              >
                Financement OPCO&nbsp;: modalités Constructys
              </Link>
            </div>
            </div>
          </article>
        </RevealGroup>

        <Reveal>
        <div className="space-y-10 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-[0_4px_16px_rgba(55,124,243,0.06)] md:px-10 md:py-10">
          <div>
            <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
              Ce que vous gagnez concrètement
            </h3>
            <KeyPoint
              label="Devis"
              subject="Structurer un poste"
              after="quelques minutes"
              before="1 h en routine"
              className="mb-4"
            />
            <ul className="space-y-3">
              {CONCRET.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-relaxed text-[#5A5A5A]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                Pourquoi Laure Olivié
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <StatCallout variant="inline" value={COUNT_UP_PROS_PLUS} label="pros BTP formés" />
                <StatCallout variant="inline" value={COUNT_UP_RATING} label="satisfaction" />
              </div>
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
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
                {SITE_CONFIG.email}
              </a>
              <span className="font-medium text-[#5A5A5A]" title="Ouvert via le bouton « Découvrir BeWork » dans la carte BeWork ci-dessus">
                bework.fr
              </span>
              <span className="font-semibold text-[#334155]">laureolivie.fr</span>
            </div>
            <div className="mt-6">
              <RdvLink
                page="/"
                ctaPosition="middle"
                campaign="home-offre-bework-formations-rdv"
                className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                Échanger sur vos besoins
              </RdvLink>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
