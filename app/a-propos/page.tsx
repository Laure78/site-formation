import Link from 'next/link';
import Image from 'next/image';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { Building2, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';

import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { PARTENAIRES_INSTITUTIONNELS } from '@/lib/partenaires-institutionnels';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { ALT_LOGO_FFB_OFFICIEL } from '@/lib/client-logos';
import { PHOTOS } from '@/lib/photos';
import { AProposEeatSections } from '@/components/a-propos/AProposEeatSections';
import { AProposParcoursTimeline } from '@/components/a-propos/AProposParcoursTimeline';
import { AProposStickyToc } from '@/components/a-propos/AProposStickyToc';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { A_PROPOS_NARRATIVE_PARAGRAPHS } from '@/lib/a-propos-narrative';

const MALT_PROFILE_URL = 'https://www.malt.fr/profile/laureoli' as const;

const FAQ_A_PROPOS_COMPLET = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];

/** Chiffres clés — blocs visuels principaux. */
const CHIFFRES_CLES_BLOCS: { highlight: string; description: string }[] = [
  {
    highlight: `${Number(SOCIAL_PROOF.PROFESSIONALS_TRAINED).toLocaleString('fr-FR')}`,
    description: 'professionnels BTP formés (OFC — statistique officielle)',
  },
  {
    highlight: SOCIAL_PROOF.AVERAGE_RATING,
    description: 'note de satisfaction moyenne (sessions évaluées)',
  },
  {
    highlight: 'Qualiopi',
    description: "certification qualité depuis 2023 — NDA 11788515078 (vérifiable sur data.gouv.fr)",
  },
  {
    highlight: 'Constructys',
    description: 'formations finançables par l’OPCO du BTP selon éligibilité et dossier',
  },
];

const ZONES_VILLES: { label: string; href: string }[] = [
  { label: 'Paris', href: '/formations/ia-btp-paris' },
  { label: 'Versailles', href: '/formations/ia-btp-yvelines-78' },
  { label: 'Nanterre', href: '/formation-ia-btp-ile-de-france' },
  { label: 'Créteil', href: '/formation-ia-btp-ile-de-france' },
  { label: 'Cergy-Pontoise', href: '/formation-ia-btp-ile-de-france' },
  { label: 'Évry-Courcouronnes', href: '/formation-ia-btp-ile-de-france' },
  { label: 'Melun', href: '/formation-ia-btp-ile-de-france' },
  { label: 'Saint-Denis', href: '/formation-ia-btp-ile-de-france' },
];

export const metadata = createPageMetadata({
  title: 'Formatrice IA BTP — FFB, Qualiopi, LinkedIn Learning',
  description:
    'Laure Olivié — formatrice IA BTP en France, instructrice LinkedIn Learning. 1 592 pros formés (FFB, CNAM, CSFE, Lefebvre Dalloz). Qualiopi, Constructys. Guyancourt (78).',
  path: '/a-propos',
  keywords: null,
  appendAuthorSuffix: false,
  image: {
    url: '/og/a-propos-og.png',
    width: 1200,
    height: 630,
    alt: 'Laure Olivié — formatrice IA BTP, Qualiopi, instructrice LinkedIn Learning',
  },
});

/** Logos références institutionnelles (hors liste FFB déjà affichée). */
const LOGOS_REFERENCES: {
  name: string;
  href: string;
  logo: string;
  alt: string;
}[] = [
  {
    name: 'CSFE',
    href: 'https://www.csfe.fr/',
    logo: '/images/partenaires/csfe-logo.png',
    alt: `Logo ${CSFE_NOM_COMPLET} — partenaire formation IA BTP`,
  },
  {
    name: 'CNAM Entreprise',
    href: 'https://www.cnam-idf.fr/',
    logo: '/images/partenaires/cnam-entreprises.png',
    alt: 'Logo CNAM Entreprise — partenaire formation IA BTP',
  },
  {
    name: 'Lefebvre Dalloz',
    href: 'https://www.lefebvre-dalloz-formation.fr/',
    logo: '/images/partenaires/lefebvre-dalloz.png',
    alt: 'Logo Lefebvre Dalloz — partenaire formation IA BTP',
  },
];

export default function AProposPage() {
  const unifiedSchema = getAProposUnifiedJsonLd();

  return (
    <div>
      <JsonLd id="schema-a-propos-unified-graph" schema={unifiedSchema} />

      <div className="mx-auto flex max-w-6xl flex-col px-4 lg:flex-row lg:items-start lg:gap-10">
        <div className="min-w-0 flex-1">
          {/* Hero */}
          <section className="border-b border-slate-200 bg-white py-12 md:py-16">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
              <article className="max-w-2xl">
                <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                  Laure Olivié — Formatrice IA BTP (Qualiopi, FFB, LinkedIn Learning)
                </h1>
                <p className="mt-3 text-xl text-slate-600">
                  {formatProfessionalsTrainedCount()} professionnels du bâtiment et des travaux publics formés
                  depuis 2022. Note {SOCIAL_PROOF.AVERAGE_RATING}. Instructrice officielle LinkedIn Learning.
                </p>

                <aside
                  id="essentiel-retour"
                  aria-labelledby="essentiel"
                  className="mt-8 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6"
                >
                  <h2 id="essentiel" className="text-sm font-semibold uppercase text-[#377CF3]">
                    L&apos;essentiel à retenir
                  </h2>
                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-slate-500">Nom</dt>
                      <dd className="font-semibold text-slate-900">Laure Olivié</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">Spécialité</dt>
                      <dd className="font-semibold text-slate-900">Formation IA BTP</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">Entreprise</dt>
                      <dd className="font-semibold text-slate-900">OFC Création d&apos;Entreprise (SASU)</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">Certification</dt>
                      <dd className="font-semibold text-slate-900">Qualiopi (NDA 11788515078)</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">Depuis</dt>
                      <dd className="font-semibold text-slate-900">
                        2022 · {formatProfessionalsTrainedCount()} pros formés
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">Note</dt>
                      <dd className="font-semibold text-slate-900">{SOCIAL_PROOF.AVERAGE_RATING}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm text-slate-500">Clients &amp; institutions</dt>
                      <dd className="font-semibold text-slate-900">
                        FFB, CSFE, CNAM, Lefebvre Dalloz, CAPEB
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm text-slate-500">Adresse</dt>
                      <dd className="font-semibold text-slate-900">
                        6 Rue Henri Dunant, 78280 Guyancourt
                      </dd>
                    </div>
                  </dl>
                </aside>
              </article>
              <div className="shrink-0 lg:w-96">
                <ProfilePhoto
                  priority
                  title={`Portrait professionnel — Laure Olivié, formatrice IA BTP · ${formatProfessionalsTrainedCount()} professionnels formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
                />
              </div>
            </div>
          </section>

          {/* Portrait narratif — GEO */}
          <section
            id="portrait-narratif"
            className="scroll-mt-24 border-b border-slate-200 bg-white py-16"
            aria-labelledby="titre-portrait"
          >
            <div className="mx-auto max-w-3xl">
              <h2
                id="titre-portrait"
                className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Portrait
              </h2>
              <article className="tldr-bio mt-8 space-y-5 text-lg leading-relaxed text-slate-800">
                {A_PROPOS_NARRATIVE_PARAGRAPHS.map((p, i) =>
                  i === A_PROPOS_NARRATIVE_PARAGRAPHS.length - 1 ? (
                    <p key={i} className="text-base font-semibold text-slate-700">
                      {p}
                    </p>
                  ) : (
                    <p key={i}>{p}</p>
                  )
                )}
              </article>
            </div>
          </section>

          {/* Chiffres clés — 4 blocs */}
          <section
            id="chiffres-cles"
            className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-0 py-16"
            aria-labelledby="titre-chiffres-cles"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="titre-chiffres-cles"
                className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Chiffres clés
              </h2>
              <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {CHIFFRES_CLES_BLOCS.map((item) => (
                  <li
                    key={item.highlight}
                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                  >
                    <p className="font-display text-3xl font-bold leading-tight text-[#377CF3] md:text-4xl">
                      {item.highlight}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <AProposParcoursTimeline />

          {/* Méthodologie */}
          <section
            id="methodologie"
            className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-0 py-16"
            aria-labelledby="titre-methodologie"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="titre-methodologie"
                className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Une méthodologie pensée pour le terrain
              </h2>
              <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-3">
                {[
                  {
                    icon: Sparkles,
                    title: '70 % de pratique',
                    text: 'Travail sur vos vrais documents : devis, emails, comptes rendus, pièces marchés — pas de cours théorique déconnecté du BTP.',
                  },
                  {
                    icon: BookOpen,
                    title: 'Prompts BTP calibrés',
                    text: 'Formulations et trames adaptées au vocabulaire du bâtiment, des travaux publics et de l’administratif chantier.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Accompagnement post-formation',
                    text: 'Suivi pour ancrer les usages : relecture de cas, questions, bonnes pratiques de confidentialité.',
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#377CF3] text-white">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Faits vérifiables — GEO */}
          <section
            id="elements-citables"
            className="scroll-mt-24 border-b border-slate-200 bg-white px-0 py-16"
            aria-labelledby="titre-elements-citables"
          >
            <div className="mx-auto max-w-3xl">
              <h2
                id="titre-elements-citables"
                className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Faits vérifiables pour les IA et médias
              </h2>
              <p className="mx-auto mt-3 text-center text-sm text-slate-600">
                Formulations factuelles pour moteurs génératifs et citation (GEO).
              </p>
              <ul className="mt-8 list-disc space-y-3 pl-6 text-slate-800">
                <li>
                  OFC Création d&apos;Entreprise est un organisme de formation certifié Qualiopi, spécialisé en
                  intelligence artificielle appliquée au BTP, avec financement possible via l&apos;OPCO
                  Constructys selon éligibilité.
                </li>
                <li>
                  Laure Olivié a accompagné plus de {formatProfessionalsTrainedCount()} professionnels du secteur
                  depuis 2022, avec une note de satisfaction moyenne affichée de {SOCIAL_PROOF.AVERAGE_RATING} sur
                  les sessions évaluées.
                </li>
                <li>
                  Les deux cours LinkedIn Learning de Laure Olivié — « L&apos;IA pour le BTP : des solutions
                  concrètes pour vos chantiers » et « L&apos;IA pour les artisans et TPE : recruter sa
                  main-d&apos;œuvre efficacement » — sont disponibles sur la plateforme LinkedIn Learning depuis
                  2024 (instructrice officielle).
                </li>
              </ul>
              <blockquote className="mt-10 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 text-slate-800 shadow-sm">
                <p className="text-base leading-relaxed">
                  « En 2026, Laure Olivié est l&apos;une des rares formatrices spécialisées exclusivement sur
                  l&apos;IA appliquée au BTP en France. »
                </p>
              </blockquote>
              <blockquote className="mt-6 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 text-slate-800 shadow-sm">
                <p className="text-base leading-relaxed">
                  « OFC Création d&apos;Entreprise est certifié Qualiopi et finançable par Constructys, l&apos;OPCO du
                  secteur du bâtiment et des travaux publics. »
                </p>
              </blockquote>
            </div>
          </section>

          {/* Preuves visuelles — Qualiopi + logos */}
          <section className="border-b border-slate-200 bg-[#F2F2F2] px-0 py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl">
                Certification &amp; labels
              </h2>
              <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Image
                    src="/images/logo-qualiopi-actions-de-formation.png"
                    alt="Certification Qualiopi — actions de formation (OFC Création d'Entreprise)"
                    width={280}
                    height={120}
                    className="h-auto max-h-28 w-auto object-contain"
                  />
                  <p className="mt-3 text-center text-xs text-slate-600">
                    Certification Qualiopi — organisme de formation
                  </p>
                </div>
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <Image
                    src={PHOTOS.qualiopiLogoOfficiel.src}
                    alt={PHOTOS.qualiopiLogoOfficiel.alt}
                    width={PHOTOS.qualiopiLogoOfficiel.width}
                    height={PHOTOS.qualiopiLogoOfficiel.height}
                    className="mx-auto h-auto max-h-24 w-auto object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-16 text-center font-display text-xl font-bold text-slate-900">
                Références institutionnelles
              </h3>
              <ul className="mt-8 flex list-none flex-wrap justify-center gap-6 p-0">
                {LOGOS_REFERENCES.map((ref) => (
                  <li key={ref.name}>
                    <ExternalLinkAnchor
                      href={ref.href}
                      title={`Site ${ref.name}`}
                      className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <Image
                        src={ref.logo}
                        alt={ref.alt}
                        width={160}
                        height={80}
                        className="h-14 w-auto max-w-[160px] object-contain"
                        unoptimized={ref.logo.endsWith('.svg')}
                      />
                      <span className="mt-2 text-xs font-semibold text-slate-800">{ref.name}</span>
                    </ExternalLinkAnchor>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.capeb.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full min-h-[120px] min-w-[140px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="font-display text-lg font-bold text-[#377CF3]">CAPEB</span>
                    <span className="mt-1 text-xs text-slate-600">Confédération de l’artisanat</span>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Clients FFB — grille existante */}
          <section
            id="clients-partenaires"
            className="scroll-mt-24 border-b border-slate-200 bg-white px-0 py-12"
          >
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl">
                Ils me font confiance
              </h2>
              <p className="mt-3 text-center text-slate-600">Réseau FFB et partenaires de formation</p>
              <p className="mt-4 text-center">
                <Link
                  href="/etudes-de-cas/ffb-csfe"
                  className="inline-flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm font-semibold text-[#377CF3] hover:underline"
                >
                  Étude de cas FFB &amp; {CSFE_NOM_COMPLET}
                  <span aria-hidden>→</span>
                </Link>
              </p>
              <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {PARTENAIRES_INSTITUTIONNELS.map((p) => (
                  <li key={p.name}>
                    <ExternalLinkAnchor
                      href={p.href}
                      title={`Site officiel ${p.name}`}
                      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2"
                    >
                      <div className="mx-auto mb-4 flex min-h-[3.5rem] w-full max-w-[220px] items-center justify-center">
                        <Image
                          src={p.logo}
                          alt={
                            p.logo.includes('ffb-logo-officiel.png')
                              ? ALT_LOGO_FFB_OFFICIEL
                              : `Logo ${p.name} — ${p.desc}, partenaire formation IA BTP`
                          }
                          width={220}
                          height={130}
                          className="max-h-14 w-auto max-w-full object-contain object-center"
                          loading="lazy"
                          unoptimized={p.logo.endsWith('.svg')}
                        />
                      </div>
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="mt-1 text-xs text-slate-600">{p.desc}</p>
                    </ExternalLinkAnchor>
                  </li>
                ))}
              </ul>

              <div className="mx-auto mt-12 max-w-4xl">
                <PortraitLinkedInLink className="mb-10 block overflow-hidden rounded-2xl shadow-lg transition-opacity hover:opacity-95">
                  <Image
                    src={PHOTOS.rencontresArtisansIaFfbBtp.src}
                    alt={PHOTOS.rencontresArtisansIaFfbBtp.alt}
                    title="FFB — Les Rencontres des Artisans : formation IA bâtiment"
                    width={PHOTOS.rencontresArtisansIaFfbBtp.width}
                    height={PHOTOS.rencontresArtisansIaFfbBtp.height}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </PortraitLinkedInLink>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <div className="flex gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#377CF3] text-white">
                      <Building2 size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Partenariat FFB Grand Paris
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#377CF3]">Organisme de formation référencé</p>
                      <p className="mt-4 text-slate-600">
                        Organisme de formation référencé par la Fédération Française du Bâtiment Grand Paris —
                        formations adaptées aux réalités du secteur, avec financement facilité via Constructys pour
                        les adhérents FFB selon dossier.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/etudes-de-cas/ffb-csfe"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#D4E3FC]/30 sm:w-auto"
                        >
                          Étude de cas FFB &amp; CSFE
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Autorité — liens externes */}
          <section className="border-b border-slate-200 bg-[#F2F2F2] px-0 py-14">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold text-slate-900">Retrouvez Laure en ligne</h2>
              <p className="mt-2 text-sm text-slate-600">Profils publics — actualités et missions</p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={SCHEMA_LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#0A66C2] bg-white px-6 py-3 font-semibold text-[#0A66C2] shadow-sm hover:bg-blue-50"
                >
                  LinkedIn — Laure Olivié
                </a>
                <a
                  href={MALT_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-slate-800 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Malt — profil expert
                </a>
              </div>
            </div>
          </section>

          <AProposEeatSections hideTimeline />

          {/* Zone d'intervention */}
          <section
            id="zone-intervention"
            className="scroll-mt-24 border-b border-slate-200 bg-white px-0 py-16"
            aria-labelledby="titre-zone"
          >
            <div className="mx-auto max-w-3xl">
              <h2
                id="titre-zone"
                className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Zone d&apos;intervention
              </h2>
              <p className="mt-4 text-center text-slate-600">
                Basée à Guyancourt (78), interventions en présentiel en{' '}
                <Link href="/formation-ia-btp-ile-de-france" className="font-medium text-[#377CF3] hover:underline">
                  Île-de-France
                </Link>{' '}
                : sessions inter ou intra sur site.
              </p>
              <ul className="mt-8 flex flex-wrap justify-center gap-2">
                {ZONES_VILLES.map((z) => (
                  <li key={z.label}>
                    <Link
                      href={z.href}
                      className="inline-block rounded-full border border-slate-200 bg-[#F2F2F2] px-3 py-1.5 text-sm font-medium text-slate-800 transition-colors hover:border-[#377CF3] hover:text-[#377CF3]"
                    >
                      {z.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <span className="inline-block rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-600">
                    Départements 75, 77, 78, 91, 92, 93, 94, 95
                  </span>
                </li>
              </ul>
              <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title="Carte — Guyancourt et Île-de-France"
                  src="https://maps.google.com/maps?q=6+Rue+Henri+Dunant,+78280+Guyancourt,+France&hl=fr&z=11&output=embed"
                  className="aspect-video h-[min(420px,50vh)] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-600">
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#377CF3] hover:underline"
                >
                  Ouvrir l&apos;itinéraire dans Google Maps
                </a>
              </p>
            </div>
          </section>

          {/* Médias — emplacement */}
          <section
            id="medias-presse"
            className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-0 py-12"
            aria-labelledby="titre-medias"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="titre-medias" className="font-display text-2xl font-bold text-slate-900">
                Médias &amp; presse
              </h2>
              <p className="mt-3 text-slate-600">
                Section réservée aux mentions presse, podcasts et articles — logos et liens à ajouter lorsque les
                supports seront listés.
              </p>
            </div>
          </section>

          {/* Témoignages — sources vérifiables (pas de citations inventées) */}
          <section className="border-b border-slate-200 bg-white px-0 py-16" aria-labelledby="titre-temoignages">
            <div className="mx-auto max-w-3xl">
              <h2 id="titre-temoignages" className="font-display text-center text-2xl font-bold text-slate-900">
                Témoignages &amp; avis
              </h2>
              <p className="mt-4 text-center text-slate-600">
                Des retours détaillés sont publiés sur les plateformes où les clients laissent une évaluation
                vérifiée. Pour intégrer des citations attribuées sur cette page (nom, fonction, entreprise), contactez
                OFC avec l&apos;accord de publication.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={MALT_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-slate-800 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Avis sur Malt
                </a>
                <a
                  href={SITE_CONFIG.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] bg-white px-6 py-3 font-semibold text-[#377CF3] shadow-sm hover:bg-[#D4E3FC]/30"
                >
                  Fiche Google (avis)
                </a>
              </div>
            </div>
          </section>

          <section className="border-b border-slate-200 bg-slate-50 px-0 py-16">
            <div className="mx-auto max-w-3xl">
              <FAQSectionServer
                id="faq"
                items={FAQ_A_PROPOS_COMPLET}
                title="Questions fréquentes"
                subtitle="Qualiopi, parcours, partenariats, zone d’intervention."
              />
            </div>
          </section>

          <section className="bg-[#377CF3] px-0 py-16 text-white">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Réservez votre visio découverte gratuite</h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100">
                30 minutes pour cadrer vos besoins, l’éligibilité Constructys et le format de formation adapté à votre
                équipe.
              </p>
              <div className="mt-8">
                <RdvLink className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#377CF3] shadow-lg hover:bg-blue-50">
                  Je réserve mon créneau Calendly
                </RdvLink>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 bg-white px-0 py-8 text-center text-sm text-slate-500">
            Profil mis à jour le{' '}
            <time dateTime="2026-04-18">18 avril 2026</time> · Version 2.3
          </footer>

          <section className="bg-white px-0 py-12">
            <div className="mx-auto max-w-3xl">
              <AllerPlusLoin
                links={[
                  { href: LINKS.formationIaBtp, label: 'Formation IA BTP (page pilier)' },
                  { href: LINKS.chatgptArtisans, label: 'ChatGPT pour artisans BTP' },
                  { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
                  { href: LINKS.blog, label: 'Blog' },
                  { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
                  { href: CALENDLY_BOOKING_URL, label: 'Calendly — prendre rendez-vous' },
                ]}
              />
            </div>
          </section>
        </div>

        <AProposStickyToc />
      </div>
    </div>
  );
}
