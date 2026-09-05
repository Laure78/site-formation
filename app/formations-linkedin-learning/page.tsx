import type { Metadata } from 'next';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';
import { SOCIAL_PROOF, IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_SAME_AS,
  SCHEMA_PUBLIC_SITE_URL,
  SCHEMA_YOUTUBE_CHANNEL_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { formatProsFormesEtNoteQualiopi } from '@/lib/data/indicateurs-resultats-helpers';

const PATH = '/formations-linkedin-learning';
const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

const COURSE_1 = {
  id: 'cours-1',
  name: "L'IA pour les TPE et PME : recruter sa main-d'œuvre efficacement",
  tocLabel: "Cours 1 — L'IA pour les TPE et PME : recruter",
  url: 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement',
  public:
    'Dirigeants de TPE et PME du BTP qui peinent à recruter (maçons, électriciens, plombiers, couvreurs…).',
  learn:
    "Utiliser l'IA générative (ChatGPT) pour rédiger des offres d'emploi qui attirent, trier les candidatures, préparer les entretiens et structurer l'onboarding — appliqué au recrutement BTP.",
  image: PHOTOS.bannerRecrutement,
} as const;

const COURSE_2 = {
  id: 'cours-2',
  name: "L'IA pour le BTP : des solutions concrètes pour vos chantiers",
  tocLabel: "Cours 2 — L'IA pour le BTP : des solutions concrètes pour vos chantiers",
  url: 'https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers',
  public:
    'Professionnels du BTP, conducteurs de travaux, chargés d’affaires, dirigeants PME du bâtiment.',
  learn:
    "Intégrer l'IA au quotidien du BTP — devis, comptes rendus de chantier, analyse de DCE/CCTP, mémoires techniques, administratif — sur des cas concrets de terrain.",
  image: PHOTOS.bannerSolutionsConcretres,
} as const;

const TOC = [
  { href: '#instructrice', label: 'Laure Olivié, instructrice LinkedIn Learning' },
  { href: '#cours', label: 'Les 2 formations disponibles' },
  { href: '#cours-1', label: COURSE_1.tocLabel },
  { href: '#cours-2', label: COURSE_2.tocLabel },
  { href: '#en-ligne-vs-presentiel', label: 'En ligne ou en présentiel : que choisir ?' },
  { href: '#ressources', label: 'Ressources complémentaires' },
  { href: '#faq', label: 'FAQ' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
] as const;

const FAQ_ITEMS = [
  {
    q: 'Les formations LinkedIn Learning de Laure Olivié sont-elles en français ?',
    aDirect: 'Oui, les 2 cours sont en français.',
    aMore:
      'Les modules vidéo, les titres et les exemples sont conçus pour les professionnels du BTP francophones.',
  },
  {
    q: 'Faut-il un abonnement pour suivre les cours ?',
    aDirect: 'Oui, un abonnement LinkedIn Learning (essai gratuit possible).',
    aMore:
      'L’accès se fait via LinkedIn Learning : abonnement individuel, entreprise, ou essai gratuit proposé par LinkedIn selon les périodes.',
  },
  {
    q: 'Ces cours LinkedIn Learning remplacent-ils la formation OFC en présentiel ?',
    aDirect:
      'Non, ils sont complémentaires : le présentiel OFC travaille sur tes propres documents.',
    aMore:
      'Sur LinkedIn Learning tu découvres les bases à ton rythme. En formation OFC (présentiel, Île-de-France), on applique l’IA à tes devis, DCE et comptes rendus réels.',
  },
  {
    q: 'Faut-il être à l’aise avec l’informatique ?',
    aDirect: 'Non, ChatGPT et Claude fonctionnent en français courant.',
    aMore:
      'Pas besoin de coder : tu décris ton besoin métier en phrases simples, puis tu valides et adaptes les propositions.',
  },
  {
    q: 'Comment aller plus loin après les cours ?',
    aDirect:
      'Réserver une visio découverte pour une formation OFC en présentiel en Île-de-France (organisme certifié Qualiopi, finançable Constructys selon éligibilité).',
    aMore:
      'La visio clarifie ton contexte (équipe, documents, objectifs) et propose le format présentiel adapté à ton entreprise.',
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: 'Formations LinkedIn Learning IA BTP',
  titleAbsolute: 'Formations LinkedIn Learning IA BTP | Laure Olivié',
  description:
    "Suivez les 2 formations LinkedIn Learning de Laure Olivié sur l'IA appliquée au BTP. En ligne, à la demande. Puis passez au présentiel en Île-de-France.",
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Formations LinkedIn Learning IA BTP | Laure Olivié',
  openGraphDescription:
    "Suivez les 2 formations LinkedIn Learning de Laure Olivié sur l'IA appliquée au BTP. En ligne, à la demande. Puis passez au présentiel en Île-de-France.",
});

type CourseCardProps = {
  id: string;
  name: string;
  publicAudience: string;
  learn: string;
  url: string | null;
  image: { src: string; alt: string; width: number; height: number };
};

function CourseCard({ id, name, publicAudience, learn, url, image }: CourseCardProps) {
  return (
    <article
      id={id}
      className="scroll-mt-28 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[16/10] bg-[#F2F2F2]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        
          quality={70}
          loading="lazy"/>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{name}</h3>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 md:text-base">
          <div>
            <dt className="font-semibold text-slate-900">Public</dt>
            <dd className="mt-1">{publicAudience}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Ce qu&apos;on y apprend</dt>
            <dd className="mt-1">{learn}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Format</dt>
            <dd className="mt-1">En ligne, à la demande, en français.</dd>
          </div>
        </dl>
        <div className="mt-6">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${OFC_CTA_PRIMARY} inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold`}
            >
              Suivre la formation sur LinkedIn Learning
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : (
            <span
              className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-600"
              aria-disabled="true"
            >
              Bientôt disponible
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function buildPageJsonLd() {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const personId = `${PAGE_URL}#person`;
  const orgId = `${PAGE_URL}#organization`;
  

  const courses = [COURSE_1, COURSE_2]
    .filter((c) => Boolean(c.url))
    .map((c) => ({
      '@type': 'Course',
      '@id': `${PAGE_URL}#${c.id}`,
      name: c.name,
      description: c.learn,
      url: c.url,
      inLanguage: 'fr',
      courseMode: 'online',
      provider: {
        '@type': 'Organization',
        name: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/',
      },
      instructor: { '@id': personId },
    }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Laure Olivié',
        jobTitle: 'Formatrice IA spécialisée BTP · Instructrice LinkedIn Learning',
        url: `${base}${LINKS.aPropos}`,
        affiliation: [
          { '@type': 'Organization', name: SCHEMA_ORGANIZATION_OFC.name, url: base },
          {
            '@type': 'Organization',
            name: 'FFB Grand Paris',
            url: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
          },
          {
            '@type': 'Organization',
            name: 'CSFE',
            url: 'https://www.csfe.fr/',
          },
        ],
        sameAs: [...SCHEMA_PERSON_SAME_AS],
        description: `Instructrice LinkedIn Learning et formatrice IA spécialisée BTP. ${formatProsFormesEtNoteQualiopi()}.`,
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: base,
        logo: schemaLogoUrl(),
        sameAs: [
          SCHEMA_LINKEDIN_PROFILE_URL,
          SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
          SCHEMA_YOUTUBE_CHANNEL_URL,
        ],
      }, ...courses,
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: base },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Formations LinkedIn Learning',
            item: PAGE_URL,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${item.aDirect} ${item.aMore}`.trim(),
          },
        })),
      },
    ],
  };
}

export default function FormationsLinkedInLearningPage() {
  

  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd id="schema-formations-linkedin-learning" schema={buildPageJsonLd()} />

      <header className="border-b border-slate-200 bg-gradient-to-br from-[#F2F2F2] via-white to-[#F2F2F2]">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <div>
            <Image
              src={LOGO_LINKEDIN_LEARNING.src}
              alt={LOGO_LINKEDIN_LEARNING.alt}
              width={LOGO_LINKEDIN_LEARNING.width}
              height={LOGO_LINKEDIN_LEARNING.height}
              className="h-10 w-auto max-w-[220px] object-contain object-left md:h-12"
              sizes="220px"
              priority
              quality={75}
            />
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Formations LinkedIn Learning — l&apos;IA appliquée au BTP par Laure Olivié
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Découvre les bases sur LinkedIn Learning, approfondis en présentiel sur tes propres documents. Deux cours à la
            demande sur LinkedIn Learning, puis formation OFC — {IDF_ZONE_INTERVENTION}.
          </p>

          <nav aria-label="Sommaire" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">Sommaire</p>
            <ol className="mt-3 space-y-2 text-sm md:text-base">
              {TOC.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={OFC_LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <main>
        <section id="instructrice" className="scroll-mt-28 py-12 md:py-16" aria-labelledby="instructrice-heading">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="instructrice-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Laure Olivié, instructrice LinkedIn Learning
            </h2>

            <div className="mt-6 rounded-2xl border border-[#377CF3]/20 bg-[#F2F2F2] p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">En bref</p>
              <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                Laure Olivié est instructrice LinkedIn Learning et formatrice IA spécialisée BTP, avec
                10 ans de terrain BTP (Dirigeante d&apos;une entreprise de Travaux Publics dans les Yvelines, ex-ALIA BTP) · formatrice IA depuis 2022. Elle a publié 2
                formations en français sur l&apos;IA appliquée au bâtiment. {formatProsFormesEtNoteQualiopi()}.
              </p>
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
              <p>
                Positionnement unique : formatrice IA BTP issue du terrain, ancienne dirigeante de
                chantier — pas une approche « générique bureau ». Les cas traités viennent du quotidien
                du bâtiment et des travaux publics.
              </p>
              <p>
                Les actions de formation OFC Création d&apos;Entreprise sont dispensées par un organisme certifié Qualiopi.
                Interventions et partenariats : FFB Grand Paris · CSFE · UMB-FFB · CNAM · Le Moniteur Formations.
              </p>
              <p>
                <a
                  href={SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${OFC_LINK} inline-flex items-center gap-1.5 font-semibold`}
                >
                  Voir le profil instructrice LinkedIn Learning
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </p>
            </div>
          </div>
        </section>

        <section
          id="cours"
          className="scroll-mt-28 border-t border-slate-200 bg-[#F2F2F2] py-12 md:py-16"
          aria-labelledby="cours-heading"
        >
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="cours-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Les 2 formations disponibles sur LinkedIn Learning
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Cours LinkedIn Learning à la demande, accessibles avec un abonnement (ou
              l&apos;essai gratuit LinkedIn).
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <CourseCard
                id={COURSE_1.id}
                name={COURSE_1.name}
                publicAudience={COURSE_1.public}
                learn={COURSE_1.learn}
                url={COURSE_1.url}
                image={COURSE_1.image}
              />
              <CourseCard
                id={COURSE_2.id}
                name={COURSE_2.name}
                publicAudience={COURSE_2.public}
                learn={COURSE_2.learn}
                url={COURSE_2.url}
                image={COURSE_2.image}
              />
            </div>
          </div>
        </section>

        <section
          id="en-ligne-vs-presentiel"
          className="scroll-mt-28 py-12 md:py-16"
          aria-labelledby="comparaison-heading"
        >
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="comparaison-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              En ligne ou en présentiel : que choisir ?
            </h2>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="bg-[#377CF3] text-white">
                    <th scope="col" className="px-4 py-3 font-semibold md:px-5">
                      Critère
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold md:px-5">
                      LinkedIn Learning (à la demande)
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold md:px-5">
                      Formations OFC (présentiel, Île-de-France)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  {[
                    {
                      label: 'Rythme',
                      online: 'À la demande, à ton rythme',
                      ofc: 'Session de 4 h, date fixée avec ton équipe',
                    },
                    {
                      label: 'Support',
                      online: 'Vidéos',
                      ofc: 'Travail sur TES documents réels (devis, DCE, CR)',
                    },
                    {
                      label: 'Idéal pour',
                      online: 'Découvrir, monter en autonomie',
                      ofc: 'Déployer l’IA dans ton entreprise',
                    },
                    {
                      label: 'Financement',
                      online: 'Abonnement LinkedIn Learning',
                      ofc: 'Qualiopi, finançable Constructys (selon éligibilité)',
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-t border-slate-200">
                      <th scope="row" className="bg-[#F2F2F2] px-4 py-3 font-semibold text-slate-900 md:px-5">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 md:px-5">{row.online}</td>
                      <td className="px-4 py-3 md:px-5">{row.ofc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg">
              Le meilleur combo : découvre les bases sur LinkedIn Learning, puis passe au présentiel en
              Île-de-France pour appliquer l&apos;IA à tes vrais dossiers.
            </p>
            <p className="mt-3 text-base text-slate-600">
              Catalogue présentiel OFC :{' '}
              <Link href={LINKS.formations} className={`${OFC_LINK} font-semibold`}>
                formations IA pour le BTP
              </Link>
              .
            </p>

            <div className="mt-8 flex justify-center">
              <RdvLink
                ctaPosition="middle"
                ctaId="linkedin-learning-mid-visio"
                className={`${OFC_CTA_PRIMARY} inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold md:text-base`}
               />
            </div>
          </div>
        </section>

        <section
          id="ressources"
          className="scroll-mt-28 border-t border-slate-200 bg-[#F2F2F2] py-12 md:py-16"
          aria-labelledby="ressources-heading"
        >
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="ressources-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Ressources complémentaires
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
              <li>
                <Link href={LINKS.ressources} className={`${OFC_LINK} font-semibold`}>
                  Ressources et tutos PDF gratuits IA BTP
                </Link>{' '}
                — appels d&apos;offres, DCE, chantier.
              </li>
              <li>
                <Link href={LINKS.blogIaDevisBatimentChiffrageAutomatise} className={`${OFC_LINK} font-semibold`}>
                  Devis BTP avec l&apos;IA — chiffrage automatisé
                </Link>
              </li>
              <li>
                <Link href={LINKS.blogAnalyserCctpMethode20Min} className={`${OFC_LINK} font-semibold`}>
                  Analyser un CCTP avec l&apos;IA — méthode complète
                </Link>
              </li>
              <li>
                <Link
                  href={LINKS.blogIaMemoireTechniqueAppelOffresGuide2026}
                  className={`${OFC_LINK} font-semibold`}
                >
                  Mémoire technique et appels d&apos;offres BTP avec l&apos;IA
                </Link>
              </li>
              <li>
                <Link href={LINKS.aPropos} className={`${OFC_LINK} font-semibold`}>
                  À propos — parcours de Laure Olivié
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 py-12 md:py-16" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="faq-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              FAQ
            </h2>
            <div className="mt-8 space-y-4">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {item.q}
                      <span className="mt-0.5 text-[#377CF3] transition group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 md:text-base">
                    <p className="font-medium text-slate-800">{item.aDirect}</p>
                    <p>{item.aMore}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rdv"
          className="scroll-mt-28 border-t border-slate-200 bg-gradient-to-br from-[#377CF3] to-[#2d66d6] py-14 text-white md:py-16"
          aria-labelledby="rdv-heading"
        >
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="rdv-heading" className="font-display text-2xl font-bold md:text-3xl">
              Prochaine étape : visio découverte gratuite
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Tu as suivi les bases sur LinkedIn Learning ? Passe au présentiel en Île-de-France pour travailler sur
              tes documents réels — devis, DCE, comptes rendus.
            </p>
            <div className="mt-8">
              <RdvLink
                ctaPosition="footer"
                ctaId="linkedin-learning-final-visio"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] shadow-lg transition hover:bg-[#F2F2F2] md:text-base"
               />
            </div>

            <div className="mt-10 rounded-2xl border border-white/25 bg-white/10 p-5 text-left text-sm leading-relaxed text-white/95 md:p-6 md:text-base">
              <p className="font-display text-lg font-bold text-white">Laure Olivié</p>
              <p className="mt-1 font-medium">
                Formatrice IA spécialisée BTP · Instructrice LinkedIn Learning
              </p>
              <p className="mt-3">
                10 ans de terrain BTP (Dirigeante d&apos;une entreprise de Travaux Publics dans les Yvelines) · formatrice IA depuis 2022. OFC Création d&apos;Entreprise —
                Qualiopi. {formatProsFormesEtNoteQualiopi()}. Partenaires : FFB Grand Paris, CSFE, UMB-FFB, CNAM, Le Moniteur Formations.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
