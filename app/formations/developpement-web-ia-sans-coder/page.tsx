import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock,
  Layers,
  PencilRuler,
  Rocket,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { DevWebIaSectionVisual } from '@/components/formations/DevWebIaSectionVisual';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { MENTIONS_TVA_INTRA_COURTE, formatTarifHt } from '@/lib/tarifs-sessions';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { PHOTOS } from '@/lib/photos';
import {
  DEV_WEB_IA_ESPACE,
  DEV_WEB_IA_EVALUATION,
  DEV_WEB_IA_FAQ,
  DEV_WEB_IA_FORMATS,
  DEV_WEB_IA_HOOK,
  DEV_WEB_IA_LIVRABLES,
  DEV_WEB_IA_MODULES,
  DEV_WEB_IA_OBJECTIFS,
  DEV_WEB_IA_PEDAGOGIE,
  DEV_WEB_IA_PREREQUIS,
  DEV_WEB_IA_PUBLIC,
  DEV_WEB_IA_SUBTITLE,
  TARIF_INTER_DEV_WEB_IA_HT,
  devWebIaDevisHref,
  devWebIaInscriptionHref,
} from '@/lib/formation-developpement-web-ia-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const FORMATION = getFormationByCode('NIV-10')!;
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');
const DEVIS_HREF = devWebIaDevisHref(FORMATION.titre);
const INSCRIPTION_HREF = devWebIaInscriptionHref();
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

const V = {
  public: PHOTOS.formationNiv10DevWebIaPublic2026,
  methode: PHOTOS.formationNiv10DevWebIaMethode2026,
  pratique: PHOTOS.formationNiv10DevWebIaPratique2026,
  formats: PHOTOS.formationNiv10DevWebIaFormats2026,
  outils: PHOTOS.formationNiv10DevWebIaOutils2026,
  resultats: PHOTOS.formationNiv10DevWebIaResultats2026,
  apres: PHOTOS.formationNiv10DevWebIaApres2026,
  cta: PHOTOS.formationNiv10DevWebIaCta2026,
} as const;

const JOURNEE_STEPS = [
  { time: '09h00', label: 'Cadrer', detail: 'Idée, utilisateurs, besoin' },
  { time: 'Matin', label: 'Structurer', detail: 'Écrans, parcours, prompts' },
  { time: 'Après-midi', label: 'Construire', detail: 'Première version avec l’IA' },
  { time: '17h00', label: 'Tester', detail: 'Corrections + feuille de route' },
] as const;

const MODULE_ICONS = [PencilRuler, Layers, Rocket, ShieldCheck] as const;

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationDeveloppementWebIaSansCoder,
  keywords: [
    'formation créer application avec IA',
    'formation développement avec IA',
    'formation créer site avec IA',
    'formation IA sans coder',
    'formation no-code IA',
    'créer un outil métier avec IA',
    'formation ChatGPT création application',
    'formation Claude création application',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseDeveloppementWebIaNiv10JsonLd();
const faqSchema = getFAQSchema(DEV_WEB_IA_FAQ);

export default function FormationDeveloppementWebIaSansCoderPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-10" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-10" schema={faqSchema} /> : null}

      {/* Hero */}
      <section className={OFC_SEC.heroWhite} aria-labelledby="dev-web-ia-h1">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
            Catalogue des formations
          </Link>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-12">
            <div className="min-w-0">
              <p className={OFC_EYEBROW}>Création avec l’IA · 7 heures</p>
              <h1
                id="dev-web-ia-h1"
                className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-ofc-ink"
              >
                {CATALOGUE_SEO.h1}
              </h1>
              <p className={`${OFC_TYPE_LEAD} mt-4 text-ofc-ink-muted`}>{DEV_WEB_IA_SUBTITLE}</p>

              <div className="mt-8 space-y-1 border-l-4 border-[#377CF3] pl-5">
                <p className="font-display text-2xl font-bold tracking-tight text-ofc-ink md:text-3xl">
                  {DEV_WEB_IA_HOOK.line1}
                </p>
                <p className="font-display text-2xl font-bold tracking-tight text-ofc-ink md:text-3xl">
                  {DEV_WEB_IA_HOOK.line2}
                </p>
                <p className="font-display text-2xl font-bold tracking-tight text-[#377CF3] md:text-3xl">
                  {DEV_WEB_IA_HOOK.line3}
                </p>
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ofc-ink-muted">
                Pas un logiciel complet prêt pour la production : une première version fonctionnelle,
                une méthode de travail, des tests, des corrections et une feuille de route pour
                continuer.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ofc-ink">
                <li className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#377CF3]" aria-hidden />
                  7 h · 9h00 – 17h00
                </li>
                <li className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#377CF3]" aria-hidden />
                  {EFFECTIF_LIBELLE}
                </li>
                <li className="inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-[#377CF3]" aria-hidden />
                  70 % pratique
                </li>
              </ul>

              <FormationHeroOutilsNote catalogueRef="NIV-10" className="mt-6" />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={INSCRIPTION_HREF}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
                >
                  S&apos;inscrire à la formation
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link
                  href={DEVIS_HREF}
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
                >
                  Demander une session intra
                </Link>
                <Link
                  href={LINKS.contact}
                  className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm`}
                >
                  Voir les prochaines dates
                </Link>
              </div>
            </div>

            <aside className="min-w-0 space-y-5">
              <FormationHeroPhoto
                src={CATALOGUE_VISUEL.src}
                alt={CATALOGUE_VISUEL.alt}
                width={CATALOGUE_VISUEL.width}
                height={CATALOGUE_VISUEL.height}
                title={
                  'title' in CATALOGUE_VISUEL && typeof CATALOGUE_VISUEL.title === 'string'
                    ? CATALOGUE_VISUEL.title
                    : undefined
                }
                priority
              />
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                  En résumé
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-ofc-ink">
                  {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT
                  <span className="ml-1 text-base font-semibold text-ofc-ink-muted">
                    / participant
                  </span>
                  <MentionTvaAsterisque />
                </p>
                <p className="mt-1 text-sm text-ofc-ink-muted">
                  Inter-entreprises · Intra sur devis
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
                  {MENTIONS_TVA_INTRA_COURTE}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">
                  Prise en charge par un OPCO possible selon l&apos;éligibilité de l&apos;entreprise
                  et du dossier.
                </p>
                <p className="mt-4 text-sm">
                  <a href="#informations-pratiques" className={OFC_LINK}>
                    Informations réglementaires Qualiopi
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Public + formats */}
      <section className={OFC_SEC.white} aria-labelledby="public-prerequis-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="public-prerequis-title" className={OFC_TYPE_H2}>
            Public et formats
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            Une formation pour passer de l&apos;idée au concret — sans savoir coder.
          </p>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h3 className={OFC_TYPE_H3}>Pour qui ?</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DEV_WEB_IA_PUBLIC.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-sm font-medium text-ofc-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base font-semibold text-ofc-ink">
                Aucun prérequis en programmation ou en création de site n&apos;est nécessaire.
              </p>
            </div>
            <DevWebIaSectionVisual
              className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:mx-0 lg:justify-self-end"
              src={V.public.src}
              alt={V.public.alt}
              width={V.public.width}
              height={V.public.height}
              title={V.public.title}
            />
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0"
              src={V.formats.src}
              alt={V.formats.alt}
              width={V.formats.width}
              height={V.formats.height}
              title={V.formats.title}
            />
            <div>
              <h3 className={OFC_TYPE_H3}>À vous de choisir votre format</h3>
              <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
                Le même programme, quel que soit le format.
              </p>
              <ul className="mt-6 space-y-3">
                {DEV_WEB_IA_FORMATS.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ofc-ink">
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
      <section className={OFC_SEC.mutedMesh} aria-labelledby="parcours-journee-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)]">
            <div>
              <h2 id="parcours-journee-title" className={OFC_TYPE_H2}>
                Une journée, de l’idée à la première version
              </h2>
              <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
                Quatre temps pédagogiques — vous avancez sur votre propre projet, pas sur un cas
                générique.
              </p>
              <ol className="mt-10 grid gap-4 sm:grid-cols-2">
                {JOURNEE_STEPS.map((step, index) => (
                  <li key={step.label} className="relative">
                    <div className="relative rounded-2xl border border-slate-200/80 bg-white px-4 py-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
                        {index + 1}. {step.time}
                      </p>
                      <p className="mt-2 font-display text-lg font-bold text-ofc-ink">{step.label}</p>
                      <p className="mt-1 text-sm text-ofc-ink-muted">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0"
              src={V.methode.src}
              alt={V.methode.alt}
              width={V.methode.width}
              height={V.methode.height}
              title={V.methode.title}
            />
          </div>
        </div>
      </section>

      {/* Formation pratique */}
      <section className={OFC_SEC.white} aria-labelledby="pratique-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <DevWebIaSectionVisual
              className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:mx-0"
              src={V.pratique.src}
              alt={V.pratique.alt}
              width={V.pratique.width}
              height={V.pratique.height}
              title={V.pratique.title}
            />
            <div className="order-1 lg:order-2">
              <p className={OFC_EYEBROW}>Une formation pratique</p>
              <h2 id="pratique-title" className={`${OFC_TYPE_H2} mt-3`}>
                Apprendre en faisant
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
                Petit groupe, maximum de pratique : vous repartez avec une première version de votre
                projet, pas seulement des slides.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  '7 h / 1 journée',
                  EFFECTIF_LIBELLE,
                  '70 % de pratique',
                  'OPCO selon éligibilité',
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-200/90 bg-[#F2F2F2] px-4 py-3 text-sm font-semibold text-ofc-ink"
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
      <section className={OFC_SEC.mutedCompact} aria-labelledby="outils-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <p className={OFC_EYEBROW}>Des outils concrets</p>
              <h2 id="outils-title" className={`${OFC_TYPE_H2} mt-3`}>
                Travaillez sur votre propre projet
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
                Ce qu&apos;il faut prévoir avant la session.
              </p>
              <ul className="mt-6 space-y-2.5">
                {DEV_WEB_IA_PREREQUIS.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ofc-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-ofc-ink-muted">
                L&apos;abonnement à ChatGPT ou Claude n&apos;est pas compris dans le prix de la
                formation.
              </p>
            </div>
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end"
              src={V.outils.src}
              alt={V.outils.alt}
              width={V.outils.width}
              height={V.outils.height}
              title={V.outils.title}
            />
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className={OFC_SEC.white} aria-labelledby="objectifs-title">
        <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
          <h2 id="objectifs-title" className={OFC_TYPE_H2}>
            Objectifs pédagogiques
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            À l&apos;issue de la formation, le participant sera capable de :
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {DEV_WEB_IA_OBJECTIFS.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-slate-200/80 pb-3 text-base text-ofc-ink last:border-0 sm:last:border-b"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className={`${OFC_SEC.mutedMesh} scroll-mt-24`} aria-labelledby="programme-title">
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <h2 id="programme-title" className={OFC_TYPE_H2}>
            Programme — 4 modules
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            Un fil rouge : votre projet. Démonstrations, ateliers guidés, travail individuel, tests et
            corrections.
          </p>
          <div className="mt-10 space-y-0">
            {DEV_WEB_IA_MODULES.map((module, index) => {
              const Icon = MODULE_ICONS[index] ?? Layers;
              return (
                <article
                  key={module.number}
                  className="relative grid gap-4 border-b border-slate-200 py-8 last:border-0 md:grid-cols-[auto_1fr] md:gap-8"
                >
                  <div className="flex items-start gap-3 md:flex-col md:items-center md:gap-2">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-lg font-bold text-white">
                      {module.number}
                    </span>
                    <Icon className="hidden h-5 w-5 text-[#377CF3] md:block" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className={OFC_TYPE_H3}>{module.title}</h3>
                    <ul className="mt-4 columns-1 gap-x-8 space-y-2 sm:columns-2">
                      {module.points.map((point) => (
                        <li
                          key={point}
                          className="break-inside-avoid text-base leading-relaxed text-ofc-ink-muted before:mr-2 before:text-[#377CF3] before:content-['·']"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-10" />

      {/* Livrables + résultats */}
      <section className={OFC_SEC.soft} aria-labelledby="livrables-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]">
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0"
              src={V.resultats.src}
              alt={V.resultats.alt}
              width={V.resultats.width}
              height={V.resultats.height}
              title={V.resultats.title}
            />
            <div>
              <h2 id="livrables-title" className={OFC_TYPE_H2}>
                À la fin de la journée, vous repartez avec
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {DEV_WEB_IA_LIVRABLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/90 px-4 py-3.5 text-base font-medium text-ofc-ink shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Et après */}
      <section className={OFC_SEC.white} aria-labelledby="apres-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className={OFC_EYEBROW}>Et après ?</p>
              <h2 id="apres-title" className={`${OFC_TYPE_H2} mt-3`}>
                Aujourd&apos;hui, vous apprenez. Demain, vous créez.
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Un site pour votre entreprise',
                  'Un outil métier pour gagner du temps',
                  'Une application pour vos clients',
                  'De nouvelles opportunités professionnelles',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ofc-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end"
              src={V.apres.src}
              alt={V.apres.alt}
              width={V.apres.width}
              height={V.apres.height}
              title={V.apres.title}
            />
          </div>
        </div>
      </section>

      {/* Méthode + espace */}
      <section className={OFC_SEC.mutedCompact} aria-labelledby="methode-title">
        <div className={`${OFC_SECTION_INNER} max-w-5xl`}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 id="methode-title" className={OFC_TYPE_H2}>
                Méthode pédagogique
              </h2>
              <ul className="mt-6 space-y-3">
                {DEV_WEB_IA_PEDAGOGIE.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ofc-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={OFC_TYPE_H2}>Espace de formation</h2>
              <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted">
                Les participants retrouvent dans l&apos;{' '}
                <Link href={LINKS.formationPlateforme} className={OFC_LINK}>
                  espace apprenant laureolivie.fr
                </Link>{' '}
                :
              </p>
              <ul className="mt-5 space-y-3">
                {DEV_WEB_IA_ESPACE.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ofc-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <h3 className={OFC_TYPE_H3}>Évaluation</h3>
                <ul className="mt-4 space-y-2.5">
                  {DEV_WEB_IA_EVALUATION.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-ofc-ink-muted">
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
      <section className={OFC_SEC.white} aria-labelledby="accessibilite-title">
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="accessibilite-title" className={OFC_TYPE_H2}>
            Accessibilité handicap
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
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

      {/* CTA final illustré */}
      <section className={OFC_SEC.soft} aria-labelledby="cta-final-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]">
            <DevWebIaSectionVisual
              className="mx-auto w-full max-w-sm lg:mx-0"
              src={V.cta.src}
              alt={V.cta.alt}
              width={V.cta.width}
              height={V.cta.height}
              title={V.cta.title}
            />
            <div className="rounded-2xl bg-[#377CF3] px-6 py-10 text-center sm:px-10 lg:text-left">
              <h2
                id="cta-final-title"
                className="font-display text-2xl font-bold text-white md:text-3xl"
              >
                Vous avez une idée de site, d&apos;application ou d&apos;outil métier&nbsp;?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                Apprenez à construire votre première version avec l&apos;IA, sans savoir coder.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href={INSCRIPTION_HREF}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-slate-50"
                >
                  S&apos;inscrire à la formation
                </Link>
                <Link
                  href={DEVIS_HREF}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Demander une session intra-entreprise
                </Link>
                <Link
                  href={LINKS.financement}
                  className="text-sm font-medium text-white/90 underline-offset-4 hover:underline"
                >
                  Voir les possibilités de financement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection id="faq" title="Questions fréquentes" items={DEV_WEB_IA_FAQ} />
    </div>
  );
}
