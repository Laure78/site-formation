import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { CtaRdv } from '@/components/CtaRdv';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_ASSISTANTS_IA_NIV09 } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseAssistantsIaNiv09JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  ASSISTANTS_IA_BENEFICES,
  ASSISTANTS_IA_EXEMPLES,
  ASSISTANTS_IA_HERO_FACTS,
  ASSISTANTS_IA_LIVRABLES,
  ASSISTANTS_IA_MODALITES,
  ASSISTANTS_IA_MODULES,
  ASSISTANTS_IA_OBJECTIFS,
  ASSISTANTS_IA_OUTILS,
  ASSISTANTS_IA_PEDAGOGIE,
  assistantsIaDevisHref,
} from '@/lib/formation-assistants-ia-personnalises-btp-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-09');
const FORMATION = getFormationByCode('NIV-09')!;
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-09');
const DEVIS_HREF = assistantsIaDevisHref(FORMATION.titre);
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationAssistantsIaPersonnalisesBtp,
  keywords: [
    'formation assistants IA BTP',
    'GPT ChatGPT BTP',
    'Gemini Gems BTP',
    'projets Claude BTP',
    'formation IA pour le BTP',
    'assistants IA métier',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseAssistantsIaNiv09JsonLd();
const faqSchema = getFAQSchema(FAQ_ASSISTANTS_IA_NIV09);

export default function FormationAssistantsIaPersonnalisesBtpPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-09" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-09" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
              Catalogue des formations IA pour le BTP
            </Link>
            <p className="mt-3 inline-flex rounded-full border border-[#377CF3]/25 bg-[#377CF3]/5 px-3 py-1 text-sm font-semibold text-[#377CF3]">
              Usages IA BTP · Assistants IA · 4 heures
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">
              {CATALOGUE_SEO.subtitle}
            </p>
            <p className="mt-2 text-base font-medium text-slate-800">{ASSISTANTS_IA_OUTILS}</p>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Formation du parcours Usages IA BTP : configurer des assistants pour ses tâches métier. Distinct du
              parcours{' '}
              <Link href={LINKS.parcoursApplicationsMetierBtp} className={OFC_LINK}>
                Création d&apos;applications BTP
              </Link>
              .
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {ASSISTANTS_IA_HERO_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base font-medium text-slate-800"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">Sur devis</p>
            <p className="mt-1 text-sm text-slate-600">{EFFECTIF_LIBELLE} · {FINANCEMENT_FORMULATION_PRUDENTE}</p>

            <FormationHeroOutilsNote catalogueRef="NIV-09" className="mt-5" />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={DEVIS_HREF}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Demander un devis
              </Link>
              <CtaRdv
                origin="formation-assistants-ia-niv09-hero"
                variant="secondary"
                className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto"
              />
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

      <FormationCatalogueGeoSections catalogueRef="NIV-09" etudeDeCasHref="" />

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Bénéfices concrets
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {ASSISTANTS_IA_BENEFICES.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-base text-slate-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Public et prérequis
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{FORMATION.public}.</p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Prérequis : avoir suivi la{' '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className={OFC_LINK}>
              formation Fondamentaux IA BTP
            </Link>{' '}
            ou utiliser régulièrement un outil d&apos;IA générative.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Matériel : un ordinateur portable et un accès personnel aux outils utilisés pendant les ateliers.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Objectifs pédagogiques
          </h2>
          <p className="mt-3 text-base text-slate-700">
            À l&apos;issue de la formation, les participants seront capables de :
          </p>
          <ul className="mt-4 space-y-2">
            {ASSISTANTS_IA_OBJECTIFS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Les fonctions de configuration et de partage diffèrent selon les plateformes et les abonnements.
          </p>
        </div>
      </section>

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme en deux modules
          </h2>
          <div className="mt-6 space-y-6">
            {ASSISTANTS_IA_MODULES.map((module) => (
              <article
                key={module.heading}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"
              >
                <h3 className="font-display text-xl font-semibold text-slate-900">{module.heading}</h3>
                <p className="mt-1 text-sm font-medium text-[#377CF3]">{module.duree}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base text-slate-700">
                  {module.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl border border-[#377CF3]/20 bg-white px-4 py-3 text-base text-slate-800">
                  <span className="font-semibold text-slate-900">Atelier : </span>
                  {module.atelier}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-base text-slate-700">
            Après cette initiation aux assistants, vous pouvez approfondir un métier précis avec la{' '}
            <Link href={LINKS.formationAO} className={OFC_LINK}>
              formation IA appels d&apos;offres BTP
            </Link>{' '}
            ou la{' '}
            <Link href={LINKS.formationConduiteTravauxSuiviChantier} className={OFC_LINK}>
              formation IA conduite de travaux
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Exemples d&apos;assistants
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {ASSISTANTS_IA_EXEMPLES.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Les cas pratiques sont sélectionnés selon les métiers et les besoins du groupe. Tous les exemples ne
            seront pas réalisés en quatre heures.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Livrables</h2>
          <ul className="mt-5 space-y-2">
            {ASSISTANTS_IA_LIVRABLES.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base font-medium text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pédagogie et évaluation
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {ASSISTANTS_IA_PEDAGOGIE.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Documents anonymisés si besoin. Confidentialité des dossiers d&apos;entreprise. Vérification humaine
            des réponses avant toute utilisation opérationnelle.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Modalités et financement
          </h2>
          <ul className="mt-5 space-y-2">
            {ASSISTANTS_IA_MODALITES.map((item) => (
              <li key={item} className="text-base text-slate-800">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Pour les demandes d&apos;une seule personne : vous pouvez vous inscrire à une session collective
            interentreprises. Aucun accompagnement individuel n&apos;est proposé.
          </p>
          <p className="mt-3 text-base font-semibold text-slate-900">Tarif : Sur devis</p>
          <p className="mt-2 text-base leading-relaxed text-slate-700">
            Prise en charge possible par les OPCO selon éligibilité et accord du financeur.
          </p>
          <FormationHeroOutilsNote catalogueRef="NIV-09" className="mt-5" />
          <p className="mt-4 text-base text-slate-700">
            Pour obtenir un devis ou échanger sur votre projet, utilisez les boutons en tête de page.
          </p>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-09" />

      <FAQSection
        id="faq"
        title="Questions fréquentes"
        items={FAQ_ASSISTANTS_IA_NIV09}
        className="border-b border-slate-200 bg-white"
      />

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 text-base text-slate-700">
            Laure Olivié, formatrice IA pour le BTP — ancienne dirigeante d&apos;entreprise de travaux publics,
            avec 7 ans d&apos;expérience.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <a href="mailto:laureolivie@yahoo.fr" className={OFC_LINK}>
              laureolivie@yahoo.fr
            </a>{' '}
            · 06 95 66 18 18
          </p>
        </div>
      </section>
    </div>
  );
}
