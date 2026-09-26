import Link from 'next/link';
import { Check, Download } from 'lucide-react';
import { DevWebIaBeworkInformations } from '@/components/formations/DevWebIaBeworkInformations';
import { DevWebIaPrixLancementCard } from '@/components/formations/DevWebIaPrixLancementCard';
import { DevWebIaSectionVisual } from '@/components/formations/DevWebIaSectionVisual';
import { PhotoThumbnailGallery } from '@/components/ui/PhotoThumbnailLightbox';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_3XL,
  FORMATION_CATALOGUE_INNER_MAX_4XL,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_ESPACE,
  DEV_WEB_IA_EVALUATION,
  DEV_WEB_IA_FORMATS,
  DEV_WEB_IA_MODULES_JOUR2,
  DEV_WEB_IA_PEDAGOGIE,
  DEV_WEB_IA_PREREQUIS,
  DEV_WEB_IA_PUBLIC,
  DEV_WEB_IA_PDF_14H_HREF,
  TARIF_INTER_DEV_WEB_IA_14H_HT,
} from '@/lib/formation-developpement-web-ia-content';

const FORMATION = getFormationByCode('NIV-10')!;
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

const V = {
  public: PHOTOS.formationNiv10DevWebIaPublic2026,
  methode: PHOTOS.formationNiv10DevWebIaMethode2026,
  pratique: PHOTOS.formationNiv10DevWebIaPratique2026,
  formats: PHOTOS.formationNiv10DevWebIaFormats2026,
  outils: PHOTOS.formationNiv10DevWebIaOutils2026,
  resultats: PHOTOS.formationNiv10DevWebIaResultats2026,
  apres: PHOTOS.formationNiv10DevWebIaApres2026,
} as const;

const NIV10_ILLUSTRATIONS_GALLERY = [
  V.public,
  V.formats,
  V.methode,
  V.pratique,
  V.outils,
  V.resultats,
  V.apres,
].map((photo) => ({
  src: photo.src,
  alt: photo.alt,
  width: photo.width,
  height: photo.height,
  title: photo.title,
  caption: photo.title,
  detail: photo.description,
}));

const JOURNEE_STEPS = [
  { time: '09h00', label: 'Cadrer', detail: 'Idée, utilisateurs, besoin' },
  { time: 'Matin', label: 'Structurer', detail: 'Écrans, parcours, prompts' },
  { time: 'Après-midi', label: 'Construire', detail: 'Première version avec l’IA' },
  { time: '17h00', label: 'Tester', detail: 'Corrections + feuille de route' },
] as const;

export function CatalogueFormationDevWebAfterObjectives() {
  return (
    <>
<section className={FORMATION_CATALOGUE_SECTION_MUTED} aria-labelledby="niv10-illustrations-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <h2 id="niv10-illustrations-title" className={FORMATION_CATALOGUE_H2}>
      Illustrations de la formation
    </h2>
    <p className="mt-2 max-w-2xl text-sm text-slate-600">
      Cliquez sur une miniature pour afficher l’infographie en grand. Les légendes détaillées
      restent disponibles dans chaque section ci-dessous.
    </p>
    <PhotoThumbnailGallery
      className="mt-6"
      items={NIV10_ILLUSTRATIONS_GALLERY}
      ariaLabel="Miniatures des infographies de la formation"
    />
  </div>
</section>

<DevWebIaBeworkInformations />

{/* Public + formats */}
<section className={FORMATION_CATALOGUE_SECTION} aria-labelledby="public-prerequis-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <h2 id="public-prerequis-title" className={FORMATION_CATALOGUE_H2}>
      Public et formats
    </h2>
    <p className="mt-3 max-w-2xl text-base text-slate-600">
      Une formation pour passer de l&apos;idée au concret — sans savoir coder.
    </p>

    <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <h3 className={OFC_TYPE_H3}>Pour qui ?</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {DEV_WEB_IA_PUBLIC.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-base font-semibold text-slate-800">
          Aucun prérequis en programmation ou en création de site n&apos;est nécessaire.
        </p>
      </div>
      <DevWebIaSectionVisual
        className="order-1 shrink-0 lg:order-2"
        src={V.public.src}
        alt={V.public.alt}
        width={V.public.width}
        height={V.public.height}
        title={V.public.title}
        description={V.public.description}
      />
    </div>

    <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start">
      <DevWebIaSectionVisual
        className="shrink-0"
        src={V.formats.src}
        alt={V.formats.alt}
        width={V.formats.width}
        height={V.formats.height}
        title={V.formats.title}
        description={V.formats.description}
      />
      <div>
        <h3 className={OFC_TYPE_H3}>À vous de choisir votre format</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Le même programme, quel que soit le format.
        </p>
        <ul className="mt-6 space-y-3">
          {DEV_WEB_IA_FORMATS.map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Méthode + parcours journée */}
<section className={FORMATION_CATALOGUE_SECTION_MUTED} aria-labelledby="parcours-journee-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)]">
      <div>
        <h2 id="parcours-journee-title" className={FORMATION_CATALOGUE_H2}>
          Jour 1 — de l’idée à la première version
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Parcours 7 h ou première journée du parcours 14 h — quatre temps pédagogiques sur votre
          propre projet.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {JOURNEE_STEPS.map((step, index) => (
            <li key={step.label} className="relative">
              <div className="relative rounded-2xl border border-slate-200/80 bg-white px-4 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
                  {index + 1}. {step.time}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-slate-800">{step.label}</p>
                <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <DevWebIaSectionVisual
        className="shrink-0 lg:justify-self-end"
        src={V.methode.src}
        alt={V.methode.alt}
        width={V.methode.width}
        height={V.methode.height}
        title={V.methode.title}
        description={V.methode.description}
      />
    </div>
  </div>
</section>

{/* Formation pratique */}
<section className={FORMATION_CATALOGUE_SECTION} aria-labelledby="pratique-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <DevWebIaSectionVisual
        className="order-2 shrink-0 lg:order-1"
        src={V.pratique.src}
        alt={V.pratique.alt}
        width={V.pratique.width}
        height={V.pratique.height}
        title={V.pratique.title}
        description={V.pratique.description}
      />
      <div className="order-1 lg:order-2">
        <p className={OFC_EYEBROW}>Une formation pratique</p>
        <h2 id="pratique-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Apprendre en faisant
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Petit groupe, maximum de pratique : vous repartez avec une première version de votre
          projet, pas seulement des slides.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            DEV_WEB_IA_DUREE_COURTE,
            EFFECTIF_LIBELLE,
            '70 % de pratique',
            'OPCO selon éligibilité',
          ].map((item) => (
            <li
              key={item}
              className="rounded-xl border border-slate-200/90 bg-[#F2F2F2] px-4 py-3 text-sm font-semibold text-slate-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Prérequis / outils */}
<section className={FORMATION_CATALOGUE_SECTION_MUTED} aria-labelledby="outils-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <div>
        <p className={OFC_EYEBROW}>Des outils concrets</p>
        <h2 id="outils-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Travaillez sur votre propre projet
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Ce qu&apos;il faut prévoir avant la session.
        </p>
        <ul className="mt-6 space-y-2.5">
          {DEV_WEB_IA_PREREQUIS.map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          L&apos;abonnement à ChatGPT ou Claude n&apos;est pas compris dans le prix de la
          formation.
        </p>
      </div>
      <DevWebIaSectionVisual
        className="shrink-0 lg:justify-self-end"
        src={V.outils.src}
        alt={V.outils.alt}
        width={V.outils.width}
        height={V.outils.height}
        title={V.outils.title}
        description={V.outils.description}
      />
    </div>
  </div>
</section>


    </>
  );
}

export function CatalogueFormationDevWebProgrammeDay2() {
  return (
    <section
      id="programme-14h"
      className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10"
      aria-labelledby="programme-14h-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_4XL}>
        <p className={OFC_EYEBROW}>Parcours 14 h · Jour 2</p>
        <h2 id="programme-14h-title" className={`${FORMATION_CATALOGUE_H2} mt-2`}>
          Finaliser, publier et faire évoluer son projet
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Deuxième journée (7 h) : reprise de votre projet du Jour 1, améliorations, mise en ligne et bases de
          visibilité — tarif inter {formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT / participant pour
          l’ensemble des 14 h.
        </p>
        <div className="mt-10 space-y-0">
          {DEV_WEB_IA_MODULES_JOUR2.map((module) => (
            <article key={module.number} className="relative border-b border-slate-200 py-8 last:border-0">
              <h3 className={OFC_TYPE_H3}>
                Module {module.number} — {module.title}
              </h3>
              <ul className="mt-4 columns-1 gap-x-8 space-y-2 sm:columns-2">
                {module.points.map((point) => (
                  <li
                    key={point}
                    className="break-inside-avoid text-base leading-relaxed text-slate-600 before:mr-2 before:text-[#377CF3] before:content-['·']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6">
          <a
            href={DEV_WEB_IA_PDF_14H_HREF}
            download="programme-ofc-developpement-web-ia-14h.pdf"
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-5 py-3`}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            Télécharger le programme complet 14 h (PDF)
          </a>
        </p>
      </div>
    </section>
  );
}

export function CatalogueFormationDevWebAfterDeliverables() {
  return (
    <>
{/* Et après */}
<section className={FORMATION_CATALOGUE_SECTION} aria-labelledby="apres-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className={OFC_EYEBROW}>Et après ?</p>
        <h2 id="apres-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Aujourd&apos;hui, vous apprenez. Demain, vous créez.
        </h2>
        <ul className="mt-6 space-y-3">
          {[
            'Un site pour votre entreprise',
            'Un outil métier pour gagner du temps',
            'Une application pour vos clients',
            'De nouvelles opportunités professionnelles',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <DevWebIaSectionVisual
        className="shrink-0 lg:justify-self-end"
        src={V.apres.src}
        alt={V.apres.alt}
        width={V.apres.width}
        height={V.apres.height}
        title={V.apres.title}
        description={V.apres.description}
      />
    </div>
  </div>
</section>

{/* Méthode + espace */}
<section className={FORMATION_CATALOGUE_SECTION_MUTED} aria-labelledby="methode-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_4XL}>
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 id="methode-title" className={FORMATION_CATALOGUE_H2}>
          Méthode pédagogique
        </h2>
        <ul className="mt-6 space-y-3">
          {DEV_WEB_IA_PEDAGOGIE.map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={FORMATION_CATALOGUE_H2}>Espace de formation</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Les participants retrouvent dans l&apos;{' '}
          <Link href={LINKS.formationPlateforme} className={OFC_LINK}>
            espace apprenant laureolivie.fr
          </Link>{' '}
          :
        </p>
        <ul className="mt-5 space-y-3">
          {DEV_WEB_IA_ESPACE.map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <h3 className={OFC_TYPE_H3}>Évaluation</h3>
          <ul className="mt-4 space-y-2.5">
            {DEV_WEB_IA_EVALUATION.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Accessibilité */}
<section className={FORMATION_CATALOGUE_SECTION} aria-labelledby="accessibilite-title">
  <div className={FORMATION_CATALOGUE_INNER_MAX_3XL}>
    <h2 id="accessibilite-title" className={FORMATION_CATALOGUE_H2}>
      Accessibilité handicap
    </h2>
    <p className="mt-3 text-base leading-relaxed text-slate-600">
      Laure Olivié est la référente handicap. Chaque besoin d&apos;aménagement est étudié au cas
      par cas avant l&apos;entrée en formation.
    </p>
    <p className="mt-4">
      <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
        Parcours d&apos;aménagement et contact accessibilité
      </Link>
    </p>
  </div>
</section>
    </>
  );
}

export function CatalogueFormationDevWebTariffsSection() {
  return (
    <section
      id="tarifs-modalites"
      className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10"
      aria-labelledby="tarifs-modalites-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_4XL}>
        <h2 id="tarifs-modalites-title" className={FORMATION_CATALOGUE_H2}>
          Format et tarifs
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Parcours 7 h ou 14 h — interentreprises ou intra-entreprise sur devis.
        </p>
        <DevWebIaPrixLancementCard className="mt-6" formationTitle={FORMATION.titre} showCtas={false} />
        <ul className="mt-6 list-disc space-y-1 pl-5 text-base text-slate-700">
          {DEV_WEB_IA_FORMATS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          <Link href={LINKS.financement} className={OFC_LINK}>
            Financement OPCO possible selon éligibilité
          </Link>
        </p>
      </div>
    </section>
  );
}
