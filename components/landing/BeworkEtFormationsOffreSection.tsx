'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Briefcase, Clock, GraduationCap } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_DEFAULT_BUTTON_TEXT } from '@/lib/calendly-embed-config';
import { PHOTOS } from '@/lib/photos';
import {
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { SITE_CONFIG } from '@/lib/seo';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';
import { OFC_CARD, OFC_CARD_MUTED, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  formationCatalogueLinkLabel,
  CATALOGUE_FORMATIONS_COUNT,
  getFormationCatalogueByRef,
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

const HOME_OFFRE_FORMATIONS = [
  getFormationCatalogueByRef('NIV-01')!,
  getFormationCatalogueByRef('NIV-02')!,
  getFormationCatalogueByRef('NIV-03')!,
] as const;

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
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#64748B]">
              {QUALIOPI_BEWORK_DISTINCTION}
            </p>
          </div>

          <KeyPoint
            label="Deux réponses concrètes"
            subject="L'administratif chantier"
            after="externalisé ou automatisé en interne"
            before="s'accumuler sans méthode"
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
          {/* Formations OFC — colonne dominante (ordre lecture) */}
          <article
            id="offre-formations"
            className="flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-[#377CF3]/30 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] ring-1 ring-[#377CF3]/15 lg:order-1"
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
              {HOME_OFFRE_FORMATIONS.map((entry) => (
                <div
                  key={entry.ref}
                  className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFD] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#1A1A1A]">
                        <Link href={entry.href} className={OFC_LINK}>
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
              <p className="text-sm leading-relaxed text-[#5A5A5A]">
                Catalogue complet : {CATALOGUE_FORMATIONS_COUNT} parcours IA BTP (niveau 1 et 2).
              </p>
              <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-4">
                <p className="font-semibold text-[#1A1A1A]">Sur mesure</p>
                <p className="mt-1.5 text-sm text-[#5A5A5A]">
                  Webinaires et journées fil rouge pour fédérations et réseaux. Précisez votre besoin au RDV.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <RdvLink
                page="/"
                ctaPosition="middle"
                campaign="home-offre-formations-rdv"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9] sm:flex-none"
              >
                {CALENDLY_DEFAULT_BUTTON_TEXT}
              </RdvLink>
              <Link
                href={LINKS.financement}
                className={`${OFC_LINK} inline-flex items-center text-sm font-semibold`}
              >
                Financement OPCO&nbsp;: modalités Constructys
              </Link>
            </div>
            </div>
          </article>

          {/* BeWork — CTA secondaire */}
          <article
            id="offre-bework"
            className="flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] lg:order-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFF6FF]">
              <Image
                src={PHOTOS.beworkHeroRelaisAdministratif.src}
                alt={PHOTOS.beworkHeroRelaisAdministratif.alt}
                title={PHOTOS.beworkHeroRelaisAdministratif.title}
                fill
                loading="lazy"
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
            <div className="mt-6 mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-2">
              <Link
                href={LINKS.bework}
                title="BeWork — délégation administrative BTP (page présentation)"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#377CF3] bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF] sm:flex-none"
              >
                Découvrir BeWork
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
            </div>
          </article>
        </RevealGroup>

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
              <span className="font-medium text-[#5A5A5A]" title="Présentation BeWork via le bouton « Découvrir BeWork » dans la carte ci-dessus">
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
