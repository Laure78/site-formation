import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { JsonLd } from '@/components/JsonLd';
import { EnBref } from '@/app/components/EnBref';
import { RelatedLinks } from '@/components/RelatedLinks';
import { VoirAussi } from '@/components/VoirAussi';
import { buildMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { FORMATION_COURSE_MODE_ONSITE } from '@/lib/schema-formation-course-jsonld';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { voirAussiIdfProps } from '@/lib/voir-aussi';

import { formatNoteSatisfactionSur5 , formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats'
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;

const PATH = '/formation-ia-paris';
const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

/** Titre exact demandé — `buildMetadata` conserve le suffixe via titleAbsolute. */
const META_TITLE_ABSOLUTE = 'Formation IA à Paris — Présentiel BTP | Laure Olivié';
const META_DESCRIPTION =
  `Formation IA à Paris : 4h en présentiel pour maîtriser ChatGPT sur vos devis, DCE et comptes rendus. Qualiopi, financement possible selon éligibilité. Prendre rendez-vous.`;

export const metadata = buildMetadata({
  title: 'Formation IA à Paris — Présentiel BTP',
  titleAbsolute: META_TITLE_ABSOLUTE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA à Paris — Présentiel BTP',
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'formation IA à Paris',
    'formation IA BTP Paris',
    'formation ChatGPT Paris',
    'formation intelligence artificielle Paris',
    'formation IA bâtiment Paris',
    'Qualiopi Constructys Paris',
  ],
  image: {
    url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
    width: 1200,
    height: 630,
    alt: 'Laure Olivié, formatrice IA BTP Qualiopi — formation IA à Paris en présentiel',
  },
});

/** Course — présentiel uniquement (Onsite), sans `offers` (tarif public non publié). */
const COURSE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': `${PAGE_URL}#course`,
  name: 'Formation IA à Paris pour les professionnels du BTP',
  description: META_DESCRIPTION,
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url.replace(/\/$/, '')}/#organization`,
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url.replace(/\/$/, ''),
  },
  instructor: {
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url.replace(/\/$/, '')}/#person`,
    name: SITE_CONFIG.name,
  },
  inLanguage: 'fr',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: FORMATION_COURSE_MODE_ONSITE,
    courseWorkload: 'PT4H',
    location: {
      '@type': 'Place',
      name: 'Paris et Île-de-France',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
    },
  },
};

const FAQ_PARIS: FAQItem[] = [
  {
    q: 'Les sessions à Paris sont-elles uniquement en présentiel ?',
    a: `Oui. Les sessions OFC se déroulent exclusivement en présentiel à Paris et en Île-de-France — intra-entreprise, dans vos locaux. Les 4 heures portent sur vos documents de chantier : devis, DCE, mémoires ou comptes rendus, avec relecture métier de votre côté.`,
  },
  {
    q: 'Qui peut suivre une formation ChatGPT Paris avec Laure Olivié ?',
    a: `Les conducteurs de travaux, chargés d'affaires, assistantes travaux, dirigeants de PME BTP et fonctions support qui produisent devis, DCE, mémoires ou comptes rendus. Le public est francilien : ${IDF_ZONE_INTERVENTION}. Aucun prérequis technique avancé : un navigateur et vos dossiers suffisent.`,
  },
  {
    q: 'Sur quels documents travaille-t-on pendant les 4 heures ?',
    a: `Sur vos pièces réelles : devis, CCTP, DPGF, RC, mémoires techniques, CR de chantier et mails. L'objectif d'une formation IA BTP Paris n'est pas la théorie générique, mais une méthode applicable dès le lendemain matin, avec des modèles que vous pouvez partager en équipe.`,
  },
  {
    q: 'La formation intelligence artificielle Paris est-elle finançable via Constructys ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} Un devis et une estimation de prise en charge sont préparés après la visio découverte, selon votre statut et les barèmes en vigueur — jamais présentés comme acquis. Les délais de dépôt côté OPCO restent à votre charge.`,
  },
  {
    q: 'Intervenez-vous seulement intramuros ou aussi en petite couronne ?',
    a: `Les deux. Les sessions couvrent ${IDF_ZONE_INTERVENTION}. Pour une vue régionale complète, la page Île-de-France détaille les formats intra-entreprise, dans vos locaux sur tout le bassin.`,
  },
  {
    q: 'Combien de professionnels avez-vous déjà formés ?',
    a: `OFC ne publie pas de cumul d'effectifs formés. Les indicateurs de satisfaction Qualiopi sont disponibles sur ${LINKS.indicateursResultats} : note moyenne, nombre de répondants et période de référence.`,
  },
];

const BREADCRUMB_JSON_LD = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: LINKS.formations },
  { name: 'Formation IA à Paris', path: PATH },
]);

const PROGRAMME_BLOCS = [
  {
    titre: 'Devis et chiffrage',
    texte:
      'Structurer une offre, reformuler des postes, contrôler la cohérence d’une DPGF avec le CCTP. ChatGPT accélère la rédaction ; vous gardez la validation métier, les ratios et les prix unitaires. On travaille aussi les variantes et les postes oubliés avant envoi client.',
  },
  {
    titre: 'Analyse de DCE et CCTP',
    texte:
      'Extraire les exigences, repérer les clauses à risque et préparer une grille de lecture du dossier. Une formation IA bâtiment Paris utile commence ici : sur le DCE que vous avez sous les yeux, avec les pièces RC, CCAP et CCTP croisées — sans inventer une donnée absente.',
  },
  {
    titre: 'Mémoire technique et appels d’offres',
    texte:
      'Cadencer un plan de mémoire, aligner les preuves sur les critères d’attribution, produire des paragraphes prêts à relire. Pas de texte générique hors de votre lot : chaque section renvoie à une preuve terrain ou à un engagement contractuel.',
  },
  {
    titre: 'Comptes rendus de chantier et administratif',
    texte:
      'Transformer des notes brutes en CR exploitables, relances et checklists. Moins de temps sur la mise en forme, plus de temps sur le suivi terrain, les réserves et les documents attendus (visas, OS, DOE).',
  },
] as const;

export default function FormationIaParisPage() {
  const faqSchema = getFAQSchema(FAQ_PARIS);

  return (
    <>
      <JsonLd id="schema-formation-ia-paris-course" schema={COURSE_JSON_LD} />
      {faqSchema ? <JsonLd id="schema-formation-ia-paris-faq" schema={faqSchema} /> : null}
      <JsonLd id="schema-formation-ia-paris-breadcrumb" schema={BREADCRUMB_JSON_LD} />

      <article>
        <section className={`${OFC_SEC.white} border-b border-slate-200`}>
          <div className="mx-auto max-w-4xl">
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              Présentiel · organisme certifié Qualiopi · Paris &amp; Île-de-France
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
              Formation IA à Paris : maîtrisez ChatGPT sur vos dossiers de chantier
            </h1>

            <EnBref>
              <p>
                Laure Olivié (OFC Création d&apos;Entreprise, Qualiopi) forme les équipes BTP à Paris et en
                Île-de-France en présentiel uniquement : sessions de 4 heures sur vos devis, DCE et comptes
                rendus.
              </p>
              <p>
                Public : conducteurs de travaux, chargés d&apos;affaires, assistantes travaux, dirigeants et
                fonctions support des PME du bâtiment et des travaux publics.
              </p>
              <p>
                Financement OPCO
                possible selon éligibilité — jamais présenté comme acquis.
              </p>
            </EnBref>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              La formation IA à Paris de Laure Olivié s&apos;adresse aux équipes qui produisent des documents
              de chantier et d&apos;études au quotidien. En 4 heures de présentiel, vous travaillez ChatGPT et
              Claude sur vos pièces réelles — pas sur des exemples fictifs. L&apos;organisme OFC Création
              d&apos;Entreprise est certifié Qualiopi ; satisfaction {formatNoteSatisfactionAffichageComplet()}.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              L&apos;objectif n&apos;est pas de « découvrir l&apos;IA » : c&apos;est de sécuriser la production
              écrite sur vos marchés franciliens — devis sous délai, DCE à décoder, mémoire à rendre, compte
              rendu à diffuser le jour même. Chaque sortie reste sous votre responsabilité métier.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="pourquoi-paris-btp">
          <div className="mx-auto max-w-4xl">
            <h2 id="pourquoi-paris-btp" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Une formation IA à Paris pensée pour les professionnels du BTP
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Une formation intelligence artificielle Paris « généraliste » enseigne des prompts hors contexte :
              rédiger un mail, résumer un PDF, faire un brainstorming. Sur un CCTP de 80 pages ou une DPGF
              multi-lots, ces réflexes ne tiennent pas. Le vocabulaire métier manque, les clauses à risque
              passent à côté, et le résultat doit être relu ligne à ligne avant d&apos;être envoyé au maître
              d&apos;œuvre ou au maître d&apos;ouvrage.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Une formation IA BTP Paris part de vos documents : devis en cours, DCE ouvert, mémoire à
              compléter, compte rendu du lundi. Vous apprenez à cadrer l&apos;outil, à poser les bonnes
              contraintes (ne rien inventer, signaler les manques, respecter le lot) et à garder la
              responsabilité métier. C&apos;est la différence entre « connaître ChatGPT » et l&apos;utiliser
              sans mettre en danger un marché.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              En Île-de-France, la pression sur les délais et le volume de pièces est particulière : coactivité,
              sous-traitance, visas, DC4, situations. Une méthode IA sans ancrage BTP produit du texte
              plausible mais hors contrat. Ici, chaque exercice est calibré pour rester utilisable après la
              session — avec une checklist de contrôle avant diffusion.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Le catalogue{' '}
              <Link href={LINKS.formations} className={OFC_LINK} title="Catalogue formations IA pour le BTP">
                formations IA pour le BTP
              </Link>{' '}
              décline ces usages en sessions intra-entreprise, dans vos locaux — organisme certifié Qualiopi de 4 heures. Pour une vue sur
              toute la région, la page{' '}
              <Link
                href={LINKS.formationIleDeFrance}
                className={OFC_LINK}
                title="Formation IA BTP Île-de-France"
              >
                formation IA BTP Île-de-France
              </Link>{' '}
              complète ce pilier parisien.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="programme-4h">
          <div className="mx-auto max-w-4xl">
            <h2 id="programme-4h" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Le programme : 4 heures, vos vrais documents
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Chaque session de formation ChatGPT Paris suit le même principe : moins de slides, plus de
              production. Vous arrivez avec vos dossiers ; vous repartez avec une méthode et des modèles
              réutilisables en équipe. La demi-journée est rythmée pour enchaîner cas d&apos;usage et
              relecture critique — le temps « wow » laisse vite place au temps « je peux le refaire seul ».
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Quatre blocs structurent la session. Selon le profil du groupe (études, chantier, support),
              l&apos;ordre peut être adapté, mais le fil reste le même : document réel, prompt cadré, sortie
              contrôlée, modèle à emporter. Pour départager les offres du marché parisien, l&apos;article{' '}
              <Link
                href={LINKS.blogFormationIaParisChoisir}
                className={OFC_LINK}
                title="Comment choisir une formation IA à Paris pour le BTP"
              >
                comment choisir une formation IA à Paris
              </Link>{' '}
              détaille cinq critères concrets (spécialisation métier, documents réels, Qualiopi, format
              présentiel).
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROGRAMME_BLOCS.map(({ titre, texte }) => (
                <div
                  key={titre}
                  className="rounded-xl border border-slate-200 bg-[#F2F2F2] p-5 shadow-sm"
                >
                  <h3 className="font-display text-lg font-semibold text-slate-900">{titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{texte}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Des pages méthodes détaillent aussi l&apos;
              <Link href={LINKS.iaAnalyseDce} className={OFC_LINK} title="Analyser un DCE avec l'IA">
                analyse de DCE avec l&apos;IA
              </Link>{' '}
              et le{' '}
              <Link
                href={LINKS.iaCompteRenduChantier}
                className={OFC_LINK}
                title="Compte rendu de chantier avec l'IA"
              >
                compte rendu de chantier assisté
              </Link>
              — utiles avant ou après la session présentielle pour ancrer les réflexes sur un seul type de
              livrable.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.mutedCompact}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#377CF3]/25 bg-[#377CF3] px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Cadrer votre session présentielle à Paris
            </h2>
            <p className="mt-3 text-blue-100">
              30 minutes de visio découverte : format intra-entreprise, dans vos locaux, documents à apporter, financement
              Constructys selon éligibilité — sans engagement.
            </p>
            <div className="mt-6">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="paris-pilier-mid"
                ctaPosition="middle"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
               />
            </div>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="lieux-paris-idf">
          <div className="mx-auto max-w-4xl">
            <h2 id="lieux-paris-idf" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Où se déroulent les formations à Paris et en Île-de-France
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Les sessions ont lieu en présentiel intra-entreprise, dans vos locaux — {IDF_ZONE_INTERVENTION}. Basée à
              Guyancourt (78), Laure Olivié se déplace sur vos sites franciliens — bureaux d&apos;études, bases
              travaux ou locaux de l&apos;entreprise.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Le groupe reste homogène (même entreprise, mêmes modèles de documents). Le présentiel permet de corriger un prompt au moment où il dérape — ce qu&apos;un
              tutoriel isolé ne fait pas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Pour un besoin local détaillé sur la capitale, la page{' '}
              <Link
                href={LINKS.formationParis}
                className={OFC_LINK}
                title="Formation IA BTP Paris (75)"
              >
                formation IA BTP Paris (75)
              </Link>{' '}
              précise le bassin intramuros. Le pilier régional Île-de-France reste le point d&apos;entrée
              pour comparer les huit départements — un seul besoin, deux niveaux de lecture.
            </p>
          </div>
        </section>

        <section className={OFC_SEC.muted} aria-labelledby="pourquoi-laure-paris">
          <div className="mx-auto max-w-4xl">
            <h2
              id="pourquoi-laure-paris"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Pourquoi se former avec Laure Olivié
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Laure Olivié forme à l&apos;IA pour le BTP depuis 2022, après près de 10 ans de terrain comme
              dirigeante d&apos;une entreprise de Travaux Publics dans les Yvelines. Elle connaît le rythme
              d&apos;un devis, d&apos;un DCE et d&apos;un compte rendu sous pression — et construit les
              sessions pour que ChatGPT serve ces documents, pas l&apos;inverse.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              La pédagogie reste courte et opérationnelle : 4 heures, cas métier, validation humaine
              obligatoire. Pas de promesse magique sur les gains : le résultat dépend du volume de dossiers et
              de la qualité de vos relectures. L&apos;ambition est simple — réduire le temps perdu sur la mise
              en forme, sans relâcher le contrôle contractuel.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Preuves : , organisme certifié Qualiopi (actions de formation), instructrice
              LinkedIn Learning. Interventions avec FFB Grand Paris, {CSFE_NOM_COMPLET}, UMB-FFB, CNAM
              Entreprise et Lefebvre Dalloz. En savoir plus sur{' '}
              <Link href={LINKS.aPropos} className={OFC_LINK} title="À propos de Laure Olivié">
                Laure Olivié et OFC Création d&apos;Entreprise
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={OFC_SEC.white} aria-labelledby="financement-paris">
          <div className="mx-auto max-w-4xl">
            <h2 id="financement-paris" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Financement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              OFC Création d&apos;Entreprise est certifié Qualiopi pour les actions de formation.{' '}
              {FINANCEMENT_FORMULATION_PRUDENTE} Les plafonds, le reste à charge et les délais de dépôt
              dépendent de votre dossier — aucune prise en charge n&apos;est présentée comme garantie.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              En pratique, la visio découverte sert à clarifier le format intra-entreprise, le public interne et
              les pièces à préparer pour Constructys ou votre OPCO. Vous repartez avec une estimation
              d&apos;éligibilité, pas avec une promesse de couverture totale.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Le détail des démarches et des formulations prudentes est sur la page{' '}
              <Link
                href={LINKS.financement}
                className={OFC_LINK}
                title="Financement Constructys formation IA pour le BTP"
              >
                financement Constructys formation IA pour le BTP
              </Link>
              . Ensuite seulement, on planifie la session présentielle à Paris ou en couronne.
            </p>
          </div>
        </section>

        <section id="faq-paris" className={`${OFC_SEC.muted} scroll-mt-24`} aria-labelledby="faq-paris-title">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-paris-title" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Questions fréquentes sur la formation IA à Paris
            </h2>
            <div className="mt-8 space-y-6">
              {FAQ_PARIS.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{q}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedLinks
          path={PATH}
          excludeHrefs={[
            LINKS.formations,
            LINKS.formationIleDeFrance,
            LINKS.formationParis,
            LINKS.iaAnalyseDce,
            LINKS.iaCompteRenduChantier,
            LINKS.aPropos,
            LINKS.financement,
          ]}
        />

        <section id="rdv" className={`${OFC_SEC.accent} scroll-mt-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Prendre rendez-vous
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              30 minutes pour cadrer une formation IA à Paris adaptée à votre équipe : documents à apporter,
              format intra-entreprise, dans vos locaux, financement selon éligibilité. Sans engagement.
            </p>
            <div className="mt-8">
              <CalendlyEmbed
                type="link"
                variant="on-accent"
                campaign="paris-pilier-footer"
                ctaPosition="footer"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-50"
               />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10">
          <VoirAussi
            {...voirAussiIdfProps({
              currentPath: PATH,
              excludeHrefs: [
                LINKS.formations,
                LINKS.formationIleDeFrance,
                LINKS.formationParis,
                LINKS.iaAnalyseDce,
                LINKS.iaCompteRenduChantier,
                LINKS.aPropos,
                LINKS.financement,
              ],
            })}
          />
        </div>
        <RenvoiFicheCatalogue programmeRef="NIV-01" contexte="à Paris" />
      </article>
    </>
  );
}
