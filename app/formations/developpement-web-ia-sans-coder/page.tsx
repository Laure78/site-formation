import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { MENTIONS_TVA_INTRA_COURTE } from '@/lib/tarifs-sessions';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  DEV_WEB_IA_ESPACE,
  DEV_WEB_IA_EVALUATION,
  DEV_WEB_IA_FAQ,
  DEV_WEB_IA_FORMATS,
  DEV_WEB_IA_HERO_FACTS,
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
import { formatTarifHt } from '@/lib/tarifs-sessions';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const FORMATION = getFormationByCode('NIV-10')!;
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');
const DEVIS_HREF = devWebIaDevisHref(FORMATION.titre);
const INSCRIPTION_HREF = devWebIaInscriptionHref();
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

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

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
              Catalogue des formations
            </Link>
            <p className="mt-3 inline-flex rounded-full border border-[#377CF3]/25 bg-[#377CF3]/5 px-3 py-1 text-sm font-semibold text-[#377CF3]">
              Création avec l’IA · 7 heures
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{DEV_WEB_IA_SUBTITLE}</p>
            <p className="mt-4 max-w-2xl font-display text-xl font-semibold text-slate-900">
              {DEV_WEB_IA_HOOK.line1} {DEV_WEB_IA_HOOK.line2} {DEV_WEB_IA_HOOK.line3}
            </p>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Pas un logiciel complet prêt pour la production : une première version fonctionnelle, une
              méthode de travail, des tests, des corrections et une feuille de route pour continuer.
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {DEV_WEB_IA_HERO_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base font-medium text-slate-800"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">
              Inter : {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant
              <MentionTvaAsterisque />
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Intra : sur devis · {EFFECTIF_LIBELLE} · {MENTIONS_TVA_INTRA_COURTE}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Prise en charge par un OPCO possible selon l&apos;éligibilité de l&apos;entreprise et du
              dossier.
            </p>

            <FormationHeroOutilsNote catalogueRef="NIV-10" className="mt-5" />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={INSCRIPTION_HREF}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                S&apos;inscrire à la formation
              </Link>
              <Link
                href={DEVIS_HREF}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Demander une session intra-entreprise
              </Link>
              <Link
                href={LINKS.contact}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Voir les prochaines dates
              </Link>
            </div>
            <p className="mt-2 text-sm">
              <a href="#informations-pratiques" className={OFC_LINK}>
                Informations réglementaires Qualiopi
              </a>
            </p>
          </div>

          <div>
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
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Public et prérequis
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {DEV_WEB_IA_PUBLIC.join(', ')}.
          </p>
          <p className="mt-3 text-base font-medium text-slate-900">
            Aucun prérequis en programmation ou en création de site n&apos;est nécessaire.
          </p>
          <ul className="mt-4 space-y-2">
            {DEV_WEB_IA_PREREQUIS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            L&apos;abonnement à ChatGPT ou Claude n&apos;est pas compris dans le prix de la formation.
          </p>
          <p className="mt-3 text-sm text-slate-600">Formats : {DEV_WEB_IA_FORMATS.join(' · ')}.</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Objectifs pédagogiques
          </h2>
          <p className="mt-3 text-base text-slate-700">
            À l&apos;issue de la formation, le participant sera capable de :
          </p>
          <ul className="mt-4 space-y-2">
            {DEV_WEB_IA_OBJECTIFS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme — 4 modules
          </h2>
          <div className="mt-6 space-y-6">
            {DEV_WEB_IA_MODULES.map((module) => (
              <article
                key={module.number}
                className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"
              >
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Module {module.number} — {module.title}
                </h3>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base text-slate-700">
                  {module.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-10" />

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            À la fin de la journée, vous repartez avec
          </h2>
          <ul className="mt-5 space-y-2">
            {DEV_WEB_IA_LIVRABLES.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 px-4 py-2.5 text-base font-medium text-slate-900"
              >
                → {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Méthode pédagogique
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {DEV_WEB_IA_PEDAGOGIE.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Espace de formation Laure Olivié
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Les participants retrouvent dans l&apos;{' '}
            <Link href={LINKS.formationPlateforme} className={OFC_LINK}>
              espace apprenant laureolivie.fr
            </Link>{' '}
            :
          </p>
          <ul className="mt-4 space-y-2">
            {DEV_WEB_IA_ESPACE.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Évaluation</h2>
          <ul className="mt-5 space-y-2">
            {DEV_WEB_IA_EVALUATION.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Accessibilité handicap
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Laure Olivié est la référente handicap. Chaque besoin d&apos;aménagement est étudié au cas
            par cas avant l&apos;entrée en formation.
          </p>
          <p className="mt-3 text-base">
            <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
              Parcours d&apos;aménagement et contact accessibilité
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Vous avez une idée de site, d&apos;application ou d&apos;outil métier ?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Apprenez à construire votre première version avec l&apos;IA, sans savoir coder.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={INSCRIPTION_HREF} className={`${OFC_CTA_PRIMARY} min-h-11 px-6 py-3`}>
              S&apos;inscrire à la formation
            </Link>
            <Link href={DEVIS_HREF} className={`${OFC_CTA_SECONDARY} min-h-11 px-6 py-3`}>
              Demander une session intra-entreprise
            </Link>
            <Link href={LINKS.financement} className={`${OFC_LINK} text-sm`}>
              Voir les possibilités de financement
            </Link>
          </div>
        </div>
      </section>

      <FAQSection id="faq" title="Questions fréquentes" items={DEV_WEB_IA_FAQ} />
    </div>
  );
}
