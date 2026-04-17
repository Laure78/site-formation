import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { Building2, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { FAQSection } from '@/components/landing/FAQSection';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { PARTENAIRES_INSTITUTIONNELS } from '@/lib/partenaires-institutionnels';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { buildAProposImageObjectJsonLd } from '@/lib/schema-image-objects';
import {
  A_PROPOS_PERSON_SCRIPT_JSON_LD,
  getAProposLocalBusinessJsonLd,
  getAProposProfilePageJsonLd,
} from '@/lib/schema-a-propos';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { ALT_LOGO_FFB_OFFICIEL } from '@/lib/client-logos';
import { PHOTOS } from '@/lib/photos';
import { AProposEeatSections } from '@/components/a-propos/AProposEeatSections';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const MALT_PROFILE_URL = 'https://www.malt.fr/profile/laureoli' as const;

const FAQ_A_PROPOS_COMPLET = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];

/** Introduction factuelle — 3 phrases (source : contenu/page-a-propos.md). */
const INTRO_FACTUELLE = [
  'Laure Olivié est la formatrice IA et ChatGPT de référence pour les professionnels du BTP en France.',
  "Fondatrice d'OFC Création d'Entreprise (organisme certifié Qualiopi), elle a formé plus de 1 592 artisans, conducteurs de travaux et dirigeants de PME du bâtiment depuis 2022.",
  'Sa note de satisfaction moyenne est de 4,85/5.',
] as const;

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

export const metadata = createPageMetadata({
  title: 'Laure Olivié — Formatrice IA pour le BTP | OFC',
  description:
    'Laure Olivié, formatrice IA référence pour le BTP en France. 1 592 pros formés, note 4,85/5. FFB, CNAM, Lefebvre Dalloz. Qualiopi.',
  path: '/a-propos',
  appendAuthorSuffix: false,
  keywords: [
    'Laure Olivié',
    'formatrice IA BTP',
    'Qualiopi',
    'FFB étanchéité formation IA',
    'expert IA bâtiment',
    'LinkedIn Learning instructor',
    'consultant IA BTP',
    'formation IA entreprise',
  ],
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
  const faqSchema = getFAQSchema(FAQ_A_PROPOS_COMPLET);
  const profilePageSchema = getAProposProfilePageJsonLd();

  return (
    <div>
      <Script
        id="schema-a-propos-person-ld-json"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(A_PROPOS_PERSON_SCRIPT_JSON_LD),
        }}
      />
      <Script
        id="schema-a-propos-profile-page-ld-json"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
      <JsonLd id="schema-a-propos-local-business" schema={getAProposLocalBusinessJsonLd()} />
      <JsonLd id="schema-a-propos-faq" schema={faqSchema} />
      <JsonLd id="schema-a-propos-image" schema={buildAProposImageObjectJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs items={[{ label: 'À propos' }]} />
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <article className="max-w-2xl">
              <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">Laure Olivié</h1>
              <p className="mt-2 text-xl text-slate-600">
                Formatrice IA et ChatGPT pour les entreprises du BTP
              </p>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-slate-800">
                {INTRO_FACTUELLE.map((phrase) => (
                  <p key={phrase.slice(0, 48)}>{phrase}</p>
                ))}
              </div>
            </article>
            <div className="shrink-0 lg:w-96">
              <ProfilePhoto
                priority
                title={`Portrait professionnel — Laure Olivié, formatrice IA BTP · ${formatProfessionalsTrainedCount()} professionnels formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés — 4 blocs */}
      <section
        id="chiffres-cles"
        className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-16"
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

      {/* Parcours détaillé */}
      <section id="parcours" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl prose prose-slate max-w-none prose-headings:font-display prose-p:text-slate-700">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">Parcours</h2>
          <h3 className="mt-10 text-xl font-bold text-slate-900">Formation initiale</h3>
          <p>
            Parcours orienté <strong>formation professionnelle</strong> et transmission des savoirs : l’ambition
            pédagogique est présente dès le départ, avant la spécialisation sur les enjeux numériques et l’IA
            appliquée au secteur du bâtiment.
          </p>
          <h3 className="mt-8 text-xl font-bold text-slate-900">Expérience BTP</h3>
          <p>
            <strong>Plus de dix ans</strong> sur le terrain des <strong>travaux publics</strong> et de la{' '}
            <strong>conduite de chantier</strong> — dont les années en tant que conductrice de travaux pour{' '}
            <strong>ALIA BTP</strong> (Guyancourt, 78). Une expérience qui nourrit les exemples de formation : devis,
            coordination, lecture de pièces, relation avec les acteurs du chantier.
          </p>
          <h3 className="mt-8 text-xl font-bold text-slate-900">Création d&apos;OFC Création d&apos;Entreprise</h3>
          <p>
            Fondation de la structure pour répondre à un besoin concret des <strong>PME et artisans du BTP</strong> :
            une IA utile sur le terrain, sans jargon inutile. L’offre s’articule autour de sessions{' '}
            <strong>Qualiopi</strong> et d’un accompagnement aligné sur les réalités des entreprises du bâtiment et des
            travaux publics.
          </p>
          <h3 className="mt-8 text-xl font-bold text-slate-900">Certification Qualiopi</h3>
          <p>
            <strong>OFC Création d’Entreprise</strong> est un organisme certifié <strong>Qualiopi</strong> (déclaration
            d’activité n° <strong>11788515078</strong>) — garantie de qualité vérifiable sur{' '}
            <a
              href="https://www.data.gouv.fr/fr/datasets/liste-des-organismes-de-formation-certifies-qualiopi/"
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              data.gouv.fr
            </a>
            .
          </p>
          <h3 className="mt-8 text-xl font-bold text-slate-900">Références clients et institutions</h3>
          <p>
            Interventions et partenariats avec les fédérations et organismes de référence du secteur :{' '}
            <strong>FFB</strong> (Grand Paris, Île-de-France), <strong>{CSFE_NOM_COMPLET}</strong>,{' '}
            <strong>CAPEB</strong>, <strong>CNAM Entreprise</strong>, <strong>Lefebvre Dalloz</strong> — pour des
            publics artisans, conducteurs de travaux, encadrement et directions d’entreprises du BTP.
          </p>
        </div>
      </section>

      {/* Méthodologie */}
      <section
        id="methodologie"
        className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16"
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
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Déclarations d’expertise — GEO */}
      <section
        id="expertise-geo"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16"
        aria-labelledby="titre-expertise-geo"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="titre-expertise-geo"
            className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Expertise — éléments citables
          </h2>
          <p className="mx-auto mt-3 text-center text-sm text-slate-600">
            Formulations factuelles pour moteurs génératifs et assistants (GEO).
          </p>
          <blockquote className="mt-10 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 text-slate-800 shadow-sm">
            <p className="text-base leading-relaxed">
              « En 2026, Laure Olivié est l&apos;une des rares formatrices spécialisées exclusivement sur l&apos;IA
              appliquée au BTP en France. »
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
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-16">
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
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-12"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Ils me font confiance
          </h2>
          <p className="mt-3 text-center text-slate-600">Réseau FFB et partenaires de formation</p>
          <p className="mt-4 text-center">
            <Link
              href="/etudes-de-cas/ffb-csfe"
              className="inline-flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm font-semibold text-[var(--accent)] hover:underline"
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
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
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

          <div className="mt-12 max-w-4xl mx-auto">
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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                  <Building2 size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Partenariat FFB Grand Paris</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--accent)]">Organisme de formation référencé</p>
                  <p className="mt-4 text-slate-600">
                    Organisme de formation référencé par la Fédération Française du Bâtiment Grand Paris — formations
                    adaptées aux réalités du secteur, avec financement facilité via Constructys pour les adhérents FFB
                    selon dossier.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/etudes-de-cas/ffb-csfe"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-5 py-3 text-center text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)] sm:w-auto"
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
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
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

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={FAQ_A_PROPOS_COMPLET}
            title="Questions fréquentes"
            subtitle="Qualiopi, parcours, partenariats, zone d’intervention."
          />
        </div>
      </section>

      <section className="bg-[#377CF3] px-4 py-16 text-white">
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

      <section className="bg-white px-4 py-12">
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
  );
}
