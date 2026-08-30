import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { FAQSection } from '@/components/landing/FAQSection';
import { EnBref } from '@/app/components/EnBref';
import { VoirAussi } from '@/components/VoirAussi';
import { buildMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import {
  buildFormationIaCourseJsonLd,
  getFormationIleDeFrancePageLocalBusinessJsonLd,
  IDF_COURSE_AREA_SERVED_NAMES,
} from '@/lib/seo-formation-ia-schemas';
import { SOCIAL_PROOF, IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { PROOF } from '@/lib/proof';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { voirAussiIdfProps } from '@/lib/voir-aussi';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { getCatalogueFormationsCount, getFormationsCatalogue } from '@/lib/formations-catalogue-display';
import { FormationsCatalogueInteractive } from '@/components/formations/FormationsCatalogueInteractive';
import { RelatedLinks } from '@/components/RelatedLinks';
import { LIBELLE_EFFECTIF_GROUPE_NIV02 } from '@/lib/tarifs-sessions';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;

const PATH = '/formation-ia-btp-ile-de-france';

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié » (total ≤ 60). */
const META_TITLE = 'Formation IA BTP Île-de-France';
/** 152 caractères — phrase complète, sans ellipse */
const META_DESCRIPTION = `Formation IA pour le BTP en Île-de-France : devis, DCE et CR. Présentiel, Qualiopi, Constructys selon éligibilité. Visio découverte.`;

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  keywords: [
    'formation IA bâtiment Île-de-France',
    'formation IA construction Île-de-France',
    'formation IA BTP IDF',
    'formation ChatGPT bâtiment',
    'Qualiopi Constructys',
  ],
  image: {
    url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    width: 1024,
    height: 682,
    alt: 'Formation IA bâtiment et construction en Île-de-France — Laure Olivié, Qualiopi',
  },
});

const COURSE_JSON_LD = {
  ...buildFormationIaCourseJsonLd({
    areaServed: [...IDF_COURSE_AREA_SERVED_NAMES],
  }),
  about: [
    { '@type': 'Thing', name: 'Bâtiment' },
    { '@type': 'Thing', name: 'Construction' },
    { '@type': 'Thing', name: 'Travaux publics' },
    { '@type': 'Place', name: 'Île-de-France' },
  ],
  keywords:
    'formation IA bâtiment, formation IA construction, formation IA BTP Île-de-France, ChatGPT BTP, Constructys',
};

const FAQ_IDF: FAQItem[] = [
  {
    q: 'Où se déroulent les formations en Île-de-France ?',
    a: `Exclusivement en présentiel en Île-de-France : intra-entreprise, dans vos locaux. Basée à Guyancourt (78), Laure Olivié intervient sur ${IDF_ZONE_INTERVENTION}.`,
  },
  {
    q: 'La formation IA construction est-elle finançable par Constructys ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} Les plafonds et l'éligibilité dépendent de votre situation (entreprise BTP cotisante Constructys). Un devis et une estimation de prise en charge sont transmis après la visio découverte.`,
  },
  {
    q: 'Intervenez-vous à Paris et en petite/grande couronne ?',
    a: `Oui. Les sessions couvrent ${IDF_ZONE_INTERVENTION}. Pour un besoin centré sur Paris, voir aussi la page formation IA à Paris.`,
  },
  {
    q: 'Sur quels documents travaille-t-on en formation ?',
    a: `Sur vos documents BTP réels : devis, DCE/CCTP, mémoires techniques, comptes rendus de chantier, DOE et emails. L'objectif est une méthode opérationnelle dès le lendemain, avec validation métier de votre côté.`,
  },
  {
    q: 'Combien de professionnels avez-vous formés ?',
    a: `OFC ne publie pas de cumul d'effectifs formés. Les indicateurs de satisfaction Qualiopi sont détaillés sur ${LINKS.indicateursResultats}.`,
  },
];

export default function FormationIaBtpIleDeFrancePage() {
  const catalogueFormations = getFormationsCatalogue();
  const catalogueCount = getCatalogueFormationsCount();
  const localBusinessSchema = getFormationIleDeFrancePageLocalBusinessJsonLd();
  const faqSchema = getFAQSchema(FAQ_IDF);

  return (
    <>
      <JsonLd id="schema-formation-idf-course" schema={COURSE_JSON_LD} />
      <JsonLd id="schema-formation-idf-localbusiness" schema={localBusinessSchema} />
      {faqSchema ? <JsonLd id="schema-formation-idf-faq" schema={faqSchema} /> : null}

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              Présentiel · organisme certifié Qualiopi · Constructys · Île-de-France
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
              Formation IA pour le bâtiment et la construction en Île-de-France
            </h1>
            <EnBref>
              <p>
                En Île-de-France, Laure Olivié propose des formations IA pour le BTP via OFC Création
                d&apos;Entreprise, organisme certifié Qualiopi : sessions en présentiel uniquement, sur documents
                réels — devis, DCE, mémoires techniques, comptes rendus. Catalogue intra-entreprise, dans vos locaux ; financement OPCO
                possible selon éligibilité. </p>
            </EnBref>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Laure Olivié forme les TPE et PME du bâtiment et de la construction en présentiel uniquement, en
              Île-de-France uniquement : devis, DCE, comptes rendus et administratif sur vos documents réels.{' '}
              Organisme
              certifié Qualiopi — {FINANCEMENT_FORMULATION_PRUDENTE}
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              <Link href={LINKS.formations} className={OFC_LINK}>
                Voir le catalogue des formations IA BTP
              </Link>
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="docs-btp-reels">
          <div className="mx-auto max-w-4xl">
            <h2 id="docs-btp-reels" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Une formation IA sur vos documents BTP réels
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Chaque session de 4 h s&apos;appuie sur vos pièces de chantier et d&apos;études — pas de théorie
              générique. Vous repartez avec une méthode applicable dès le lendemain.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Devis et chiffrage',
                'Analyse DCE / CCTP',
                'Mémoires techniques',
                'Comptes rendus de chantier',
                'DOE et documents de réception',
                'Emails et relances clients',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="catalogue-idf-heading">
          <div className="mx-auto max-w-6xl">
            <h2
              id="catalogue-idf-heading"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Les {catalogueCount} formations IA en Île-de-France
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Même catalogue que la page{' '}
              <Link href={LINKS.formations} className={OFC_LINK}>
                formations IA pour le BTP
              </Link>
              — effectifs et tarifs à jour (ex. appels d&apos;offres : {LIBELLE_EFFECTIF_GROUPE_NIV02}). Présentiel
              uniquement, sessions intra-entreprise, dans vos locaux sur {IDF_ZONE_INTERVENTION}.
            </p>
            <div className="mt-10">
              <FormationsCatalogueInteractive formations={catalogueFormations} catalogueCount={catalogueCount} />
            </div>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="intra-inter-idf">
          <div className="mx-auto max-w-4xl">
            <h2 id="intra-inter-idf" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              intra-entreprise, dans vos locaux, partout en Île-de-France
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Sessions <strong>intra</strong> dans vos locaux ou <strong>inter</strong> en salle —{' '}
              {IDF_ZONE_INTERVENTION}. Si votre besoin est centré sur la capitale,
              consultez la{' '}
              <Link href={LINKS.formationIaParis} className={OFC_LINK} title="Formation IA à Paris">
                formation IA à Paris
              </Link>
              . Pour choisir le prestataire, découvrez{' '}
              <Link href={LINKS.formateurIaBtp} className={OFC_LINK} title="Formatrice IA spécialisée construction">
                une formatrice IA spécialisée construction
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Cadrer votre formation IA en Île-de-France
            </h2>
            <p className="mt-3 text-blue-100">
              30 min en visio : format intra-entreprise, dans vos locaux, financement Constructys selon éligibilité, sans engagement.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="idf-mid-page"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous découverte
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="pourquoi-laure-idf">
          <div className="mx-auto max-w-4xl">
            <h2 id="pourquoi-laure-idf" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Pourquoi Laure Olivié
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Formatrice IA spécialisée BTP depuis 2022, après 10 ans de terrain comme conductrice de travaux (ex-ALIA
              BTP). Références : FFB Grand Paris, {CSFE_NOM_COMPLET}, CNAM Entreprise, instructrice LinkedIn Learning.
              Méthode 100 % pratique, présentiel en Île-de-France.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              En savoir plus sur{' '}
              <Link href={LINKS.aPropos} className={OFC_LINK} title="À propos de Laure Olivié">
                Laure Olivié et OFC Création d&apos;Entreprise
              </Link>
              , ou parcourir les{' '}
              <Link href={LINKS.formations} className={OFC_LINK} title="Catalogue formations IA pour le BTP">
                programmes catalogue — organisme certifié Qualiopi de 4 h
              </Link>
              .
            </p>
          </div>
        </section>

        <RelatedLinks path={LINKS.formationIleDeFrance} />

        <FAQSection
          id="faq-idf"
          title="FAQ"
          subtitle="Réponses concrètes sur le présentiel, le financement et la couverture francilienne."
          items={FAQ_IDF}
        />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Prendre rendez-vous
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Diagnostic de 30 minutes pour choisir la formation IA adaptée à votre équipe du bâtiment ou de la
              construction en Île-de-France.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="idf-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
              >
                Prendre rendez-vous
              </CalendlyEmbed>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10">
          <VoirAussi
            {...voirAussiIdfProps({
              currentPath: PATH,
              excludeHrefs: [
                LINKS.formations,
                LINKS.formationIaParis,
                LINKS.formateurIaBtp,
                LINKS.aPropos,
              ],
            })}
          />
        </div>

        <RenvoiFicheCatalogue programmeRef="NIV-01" contexte="en Île-de-France" />
      </article>
    </>
  );
}
