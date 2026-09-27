import Link from 'next/link';
import { ArrowRight, Check, Download } from 'lucide-react';
import { getFormationByCode } from '@/data/formations';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_LINK,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import type { BeworkParcours, BeworkParcoursId } from '@/lib/bework-programmes';
import {
  DEV_WEB_IA_JOUR_RESUME,
  DEV_WEB_IA_MODALITES,
  DEV_WEB_IA_MODALITES_SECTION,
  DEV_WEB_IA_PARCOURS_14H,
  DEV_WEB_IA_PARCOURS_7H,
  DEV_WEB_IA_PARCOURS_INTRO,
  DEV_WEB_IA_PARCOURS_MARKETING,
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PDF_7H_HREF,
  DEV_WEB_IA_QUALIOPI_ENGAGEMENTS,
  devWebIaInscriptionHref,
  devWebIaProjectFormHref,
} from '@/lib/formation-developpement-web-ia-content';

type DevWebParcoursMarketing = (typeof DEV_WEB_IA_PARCOURS_MARKETING)[BeworkParcoursId];

const FORMATION = getFormationByCode('NIV-10')!;

export function CatalogueFormationDevWebModalitesSection() {
  const { eyebrow, title, lead, compareHref, compareLabel } = DEV_WEB_IA_MODALITES_SECTION;

  return (
    <section
      id="modalites-participation"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24 bg-gradient-to-br from-[#EFF6FF]/40 via-white to-[#F5F3FF]/30`}
      aria-labelledby="modalites-participation-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <p className={OFC_EYEBROW}>{eyebrow}</p>
            <h2 id="modalites-participation-title" className={`${FORMATION_CATALOGUE_H2} mt-2`}>
              {title}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">{lead}</p>
            <p className="mt-4">
              <a href={compareHref} className={`${OFC_LINK} inline-flex items-center gap-1 text-sm font-semibold`}>
                {compareLabel}
                <span aria-hidden>→</span>
              </a>
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {DEV_WEB_IA_MODALITES.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={OFC_TYPE_H3}>{item.title}</h3>
                  <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#377CF3]">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CatalogueFormationDevWebQualiopiEngagementSection() {
  return (
    <section
      id="qualiopi-engagement"
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="qualiopi-engagement-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <div className="max-w-3xl">
          <p className={OFC_EYEBROW}>Qualiopi</p>
          <h2 id="qualiopi-engagement-title" className={FORMATION_CATALOGUE_H2}>
            Une formation concrète.{' '}
            <span className="text-[#377CF3]">Un engagement qualité.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Cette formation est dispensée par <strong className="font-semibold text-slate-800">OFC Création
            d&apos;Entreprise</strong>, organisme certifié Qualiopi au titre des actions de formation.
          </p>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            Un cadre pédagogique structuré pour apprendre, pratiquer et progresser sur votre propre projet
            numérique.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {DEV_WEB_IA_QUALIOPI_ENGAGEMENTS.map((item) => (
            <li
              key={item.num}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#377CF3]">{item.num}</p>
              <h3 className={`${OFC_TYPE_H3} mt-2`}>{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm">
          <a href="#informations-pratiques" className={OFC_LINK}>
            Voir les informations réglementaires Qualiopi (tarifs, accès, évaluation…)
          </a>
        </p>
      </div>
    </section>
  );
}

type ParcoursCardProps = {
  parcoursId: BeworkParcoursId;
  data: BeworkParcours;
  marketing: DevWebParcoursMarketing;
  pdfHref: string;
  pdfName: string;
};

function ParcoursChoixCard({ data, marketing, pdfHref, pdfName }: ParcoursCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{marketing.label}</p>
        {marketing.badge14h ? (
          <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[#377CF3]">
            {marketing.badge14h}
          </span>
        ) : null}
      </div>
      <h3 className={`${OFC_TYPE_H3} mt-3`}>{marketing.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{marketing.desc}</p>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-display text-3xl font-bold text-[#377CF3]">{data.dureeLabel}</p>
        <p className="text-sm text-slate-600">{data.joursLabel}</p>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-slate-900">
        {formatTarifHt(data.tarifHt)} € HT
        <span className="ml-1 text-base font-semibold text-slate-600">
          / participant
          <MentionTvaAsterisque />
        </span>
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        <li className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#377CF3]">
          {data.effectif}
        </li>
        <li className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#377CF3]">
          70 % de pratique
        </li>
      </ul>
      <ul className="mt-5 flex-1 space-y-2">
        {data.highlights.slice(0, 5).map((point) => (
          <li key={point} className="flex gap-2 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        href={pdfHref}
        download={pdfName}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] hover:underline"
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        Télécharger le programme PDF ({data.dureeLabel})
      </a>
    </article>
  );
}

function JourParcoursCta({
  jourKey,
  tarifHt,
  inscriptionLabel,
}: {
  jourKey: 'jour1' | 'jour2';
  tarifHt: number;
  inscriptionLabel: string;
}) {
  const jour = DEV_WEB_IA_JOUR_RESUME[jourKey];
  const pdfHref = jourKey === 'jour1' ? DEV_WEB_IA_PDF_7H_HREF : DEV_WEB_IA_PDF_14H_HREF;
  const pdfName =
    jourKey === 'jour1'
      ? 'programme-ofc-developpement-web-ia-7h.pdf'
      : 'programme-ofc-developpement-web-ia-14h.pdf';
  const programmeAnchor = jourKey === 'jour1' ? '#programme' : '#programme-14h';

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">{jour.label}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {jour.points.map((point) => (
          <li key={point} className="text-sm leading-relaxed text-slate-600 before:mr-2 before:text-[#377CF3] before:content-['·']">
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-5 font-display text-base font-bold text-slate-900">{jour.closing}</p>
      <div className="mt-5 flex flex-col gap-2">
        <Link
          href={devWebIaInscriptionHref()}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm`}
        >
          {inscriptionLabel} — {formatTarifHt(tarifHt)} € HT
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
        <Link href={programmeAnchor} className={`${OFC_LINK} text-center text-sm font-semibold`}>
          {jourKey === 'jour1' ? 'Voir le programme 7 h' : 'Voir le programme 14 h (Jour 2)'}
        </Link>
        <a
          href={pdfHref}
          download={pdfName}
          className="text-center text-sm font-medium text-slate-600 hover:text-[#377CF3]"
        >
          Télécharger le programme PDF
        </a>
      </div>
    </article>
  );
}

/** Parcours 7 h / 14 h, tarifs et CTA Jour 1 · Jour 2. */
export function CatalogueFormationDevWebParcoursTarifsSection() {
  return (
    <section
      id="tarifs-modalites"
      className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10"
      aria-labelledby="tarifs-modalites-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>{DEV_WEB_IA_PARCOURS_INTRO.eyebrow}</p>
        <h2 id="tarifs-modalites-title" className={`${FORMATION_CATALOGUE_H2} mt-2`}>
          {DEV_WEB_IA_PARCOURS_INTRO.titleLine1}{' '}
          <span className="text-[#377CF3]">{DEV_WEB_IA_PARCOURS_INTRO.titleLine2}</span>
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {DEV_WEB_IA_PARCOURS_INTRO.lead}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ParcoursChoixCard
            parcoursId="7h"
            data={DEV_WEB_IA_PARCOURS_7H}
            marketing={DEV_WEB_IA_PARCOURS_MARKETING['7h']}
            pdfHref={DEV_WEB_IA_PDF_7H_HREF}
            pdfName="programme-ofc-developpement-web-ia-7h.pdf"
          />
          <ParcoursChoixCard
            parcoursId="14h"
            data={DEV_WEB_IA_PARCOURS_14H}
            marketing={DEV_WEB_IA_PARCOURS_MARKETING['14h']}
            pdfHref={DEV_WEB_IA_PDF_14H_HREF}
            pdfName="programme-ofc-developpement-web-ia-14h.pdf"
          />
        </div>

        <p className="mt-6 text-sm text-slate-600">
          Commencez par la journée à {formatTarifHt(DEV_WEB_IA_PARCOURS_7H.tarifHt)} € HT, ou choisissez
          directement le parcours {DEV_WEB_IA_PARCOURS_14H.dureeLabel} à{' '}
          {formatTarifHt(DEV_WEB_IA_PARCOURS_14H.tarifHt)} € HT. Intra-entreprise : sur devis.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          <Link href={LINKS.financement} className={OFC_LINK}>
            Financement OPCO possible selon éligibilité
          </Link>
          {' · '}
          {FINANCEMENT_FORMULATION_COURTE}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <JourParcoursCta
            jourKey="jour1"
            tarifHt={DEV_WEB_IA_PARCOURS_7H.tarifHt}
            inscriptionLabel="Demander une place"
          />
          <JourParcoursCta
            jourKey="jour2"
            tarifHt={DEV_WEB_IA_PARCOURS_14H.tarifHt}
            inscriptionLabel="Demander une place (parcours 14 h)"
          />
        </div>

        <p className="mt-8">
          <Link
            href={devWebIaProjectFormHref()}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Demander une session intra-entreprise — {FORMATION.titre}
          </Link>
        </p>
      </div>
    </section>
  );
}
