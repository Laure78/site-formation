import Link from 'next/link';
import Image from 'next/image';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { CheckCircle, Building2, Clock, Award, Shield, BarChart3 } from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { FAQSection } from '@/components/landing/FAQSection';

import { breadcrumbItemsFromPaths, createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { PARTENAIRES_INSTITUTIONNELS } from '@/lib/partenaires-institutionnels';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { buildAProposImageObjectJsonLd } from '@/lib/schema-image-objects';
import { getAProposLocalBusinessJsonLd, getAProposPersonJsonLd } from '@/lib/schema-a-propos';
import { ALT_LOGO_FFB_OFFICIEL } from '@/lib/client-logos';
import { PHOTOS } from '@/lib/photos';

const FAQ_A_PROPOS_COMPLET = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];

/** Faits vérifiables — format fact-card pour citation par les IA (GEO). */
const CHIFFRES_FAITS_VERIFIABLES: {
  highlight: string;
  description: string;
}[] = [
  {
    highlight: '1 592',
    description:
      "professionnels BTP formés depuis 2022 — statistique officielle OFC Création d'Entreprise",
  },
  {
    highlight: '4,85/5',
    description:
      'Note moyenne — moyenne pondérée sur toutes les sessions de formation',
  },
  {
    highlight: '10 ans',
    description:
      "d'expérience terrain — conductrice de travaux en travaux publics de 2017 à 2024 (ALIA BTP, Guyancourt)",
  },
  {
    highlight: '2',
    description:
      "Instructrice LinkedIn Learning — 2 formations publiées sur l'IA pour le BTP",
  },
  {
    highlight: 'Qualiopi',
    description:
      'Certifiée depuis 2022 — NDA 11788515078 — vérifiable sur data.gouv.fr',
  },
  {
    highlight: '6',
    description:
      'Partenaire FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Entreprise, Lefebvre Dalloz',
  },
];

export const metadata = createPageMetadata({
  title: 'Laure Olivié — Formatrice IA BTP | Qualiopi | 1 592 professionnels formés',
  description:
    "Laure Olivié, formatrice IA BTP certifiée Qualiopi (NDA 11788515078) : 1 592 professionnels formés, note 4,85/5. Terrain TP, LinkedIn Learning, partenaires FFB & CSFE étanchéité. Guyancourt (78).",
  path: '/a-propos',
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

export default function AProposPage() {
  const faqSchema = getFAQSchema(FAQ_A_PROPOS_COMPLET);

  return (
    <div>
      <JsonLd id="schema-a-propos-local-business" schema={getAProposLocalBusinessJsonLd()} />
      <JsonLd id="schema-a-propos-person" schema={getAProposPersonJsonLd()} />
      <JsonLd id="schema-a-propos-faq" schema={faqSchema} />
      <JsonLd id="schema-a-propos-image" schema={buildAProposImageObjectJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'À propos', path: '/a-propos' },
          ])}
          showVisual
        />
      </div>

      {/* Hero — Formatrice IA pour les entreprises du BTP */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <article>
              <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
                Laure Olivié
              </h1>
              <p className="mt-2 text-xl text-slate-600">
                Formatrice IA et ChatGPT pour les entreprises du BTP
              </p>
              
              {/* Bio dense GEO-optimisée avec faits vérifiables */}
              <div className="mt-8 space-y-4 text-slate-700">
                <p className="text-lg leading-relaxed">
                  <strong>Laure Olivié</strong> est formatrice en intelligence artificielle spécialisée dans le secteur du BTP. 
                  Basée à <strong>Guyancourt (Yvelines, 78)</strong>, elle accompagne depuis 2014 les dirigeants de TPE et PME du bâtiment et des travaux publics,
                  ainsi que les conducteurs de travaux et équipes support, dans l&apos;intégration de ChatGPT et de l&apos;IA générative.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>1592 professionnels formés</strong> avec une note moyenne de <strong>4,85/5</strong>. 
                  <strong>10 ans d'expérience</strong> en formation professionnelle et conduite de chantier dans les travaux publics. 
                  Instructrice <strong>LinkedIn Learning</strong> avec 2 formations officielles sur l'IA pour le BTP.
                </p>
                <p className="text-lg leading-relaxed">
                  Son organisme <strong>OFC Création d'Entreprise</strong> est <strong>certifié Qualiopi</strong> (n° 905 244 281 00010), 
                  garantissant l'éligibilité au <strong>financement OPCO Constructys à 100 %</strong> pour les entreprises du BTP de moins de 50 salariés.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  '1592 formés',
                  'Note 4,85/5',
                  '10 ans expérience',
                  'Qualiopi',
                  'LinkedIn Learning',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </article>
            <div className="shrink-0 lg:w-96">
              <ProfilePhoto
                priority
                title="10 ans d'expérience terrain BTP · +1 592 professionnels formés · 4,85/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres et faits vérifiables — format fact-card (citation IA / GEO) */}
      <section
        id="chiffres-faits-verifiables"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16"
        aria-labelledby="titre-chiffres-faits"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="titre-chiffres-faits"
            className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Chiffres et faits vérifiables
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Éléments sourçables pour réponses factuelles — OFC Création d&apos;Entreprise, sessions
            évaluées, parcours professionnel et certifications.
          </p>
          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {CHIFFRES_FAITS_VERIFIABLES.map((fact, index) => (
              <li
                key={`fact-${index}-${fact.highlight}`}
                className="rounded-2xl border border-slate-200/80 bg-[#F2F2F2] p-6 shadow-sm"
              >
                <p className="font-display text-3xl font-bold leading-tight text-[#377CF3] md:text-4xl">
                  {fact.highlight}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{fact.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-slate-500">
            Qualiopi : vérification du numéro de déclaration d&apos;activité sur{' '}
            <a
              href="https://www.data.gouv.fr/fr/datasets/liste-des-organismes-de-formation-certifies-qualiopi/"
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              data.gouv.fr — jeux de données Qualiopi
            </a>
            .
          </p>
        </div>
      </section>

      {/* Clients & partenaires — réseau institutionnel + partenariat FFB + cas d'usage */}
      <section
        id="clients-partenaires"
        className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-12"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Ils me font confiance
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Partenaires et clients institutionnels
          </p>
          <p className="mt-4 text-center">
            <Link
              href="/etudes-de-cas/ffb-csfe"
              className="inline-flex max-w-2xl flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Étude de cas FFB &amp; {CSFE_NOM_COMPLET} — modules, objectifs et bénéfices
              <span aria-hidden>→</span>
            </Link>
          </p>
          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {PARTENAIRES_INSTITUTIONNELS.map((p) => (
              <li key={p.name}>
                <ExternalLinkAnchor
                  href={p.href}
                  title={`Site officiel ${p.name}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
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

          <div className="mt-16 max-w-4xl mx-auto">
            <PortraitLinkedInLink className="mb-10 block overflow-hidden rounded-2xl shadow-lg transition-opacity hover:opacity-95">
              <Image
                src={PHOTOS.rencontresArtisansIaFfbBtp.src}
                alt={PHOTOS.rencontresArtisansIaFfbBtp.alt}
                title="FFB — Les Rencontres des Artisans : formation IA bâtiment et étanchéité"
                width={PHOTOS.rencontresArtisansIaFfbBtp.width}
                height={PHOTOS.rencontresArtisansIaFfbBtp.height}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </PortraitLinkedInLink>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                  <Shield size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Partenariat FFB Grand Paris
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                    Organisme de formation référencé
                  </p>
                  <p className="mt-4 text-slate-600">
                    En tant qu&apos;organisme de formation référencé par la Fédération
                    Française du Bâtiment Grand Paris, nous accompagnons les entreprises
                    du BTP dans leur transformation numérique grâce à
                    l&apos;intelligence artificielle.
                  </p>
                  <p className="mt-4 text-slate-600">
                    Ce partenariat stratégique nous permet d&apos;offrir des{' '}
                    <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">
                      formations
                    </Link>{' '}
                    100% adaptées aux réalités du secteur du bâtiment, avec un
                    financement facilité via Constructys pour les adhérents FFB.
                  </p>
                  <p className="mt-6 font-semibold text-slate-900">
                    Avantages du partenariat
                  </p>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    {[
                      'Formations certifiantes',
                      'Prise en charge OPCO à 100%',
                      'Supports pédagogiques adaptés au BTP',
                      'Suivi personnalisé post-formation',
                      'Cas pratiques sectoriels',
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/etudes-de-cas/ffb-csfe"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] px-5 py-3 text-center text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-blue-100 sm:w-auto"
                    >
                      Voir l&apos;étude de cas FFB &amp; CSFE — étanchéité (détail des modules)
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-center text-2xl font-bold text-slate-900">
              Cas d&apos;usage & formations réalisées
            </h3>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {[
                {
                  icon: BarChart3,
                  title: 'PME du BTP - Île-de-France',
                  values: ['12', '5h'],
                  labels: ['stagiaires formés', 'gain hebdomadaire'],
                },
                {
                  icon: Building2,
                  title: "Bureau d'études structure",
                  values: ['8', '30%'],
                  labels: ['collaborateurs', 'gain de productivité'],
                },
              ].map(({ icon: Icon, ...cas }) => (
                <div
                  key={cas.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">{cas.title}</h4>
                  <div className="mt-6 flex gap-8">
                    <div>
                      <p className="text-3xl font-bold text-[var(--accent)]">
                        {cas.values[0]}
                      </p>
                      <p className="text-sm text-slate-600">{cas.labels[0]}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[var(--accent)]">
                        {cas.values[1]}
                      </p>
                      <p className="text-sm text-slate-600">{cas.labels[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 cartes caractéristiques */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle,
                title: "1592 professionnels formés",
                desc: "Dirigeants, conducteurs de travaux, équipes BTP. Statistique officielle vérifiable.",
              },
              {
                icon: Building2,
                title: '10 ans expérience terrain',
                desc: "Conduite de chantier, travaux publics, génie civil. Expertise métier BTP.",
              },
              {
                icon: Clock,
                title: 'Méthode 100% pratique',
                desc: "Travail sur vos vrais documents : devis, emails, CR chantier. Zéro théorie.",
              },
              {
                icon: Award,
                title: 'Certification Qualiopi',
                desc: "100 % finançable OPCO Constructys. Note 4,85/5. Référencé FFB.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section
        id="approche"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <article>
            <h2 className="font-display text-center text-2xl font-bold text-slate-900">
              Mon approche
            </h2>

            <div
              id="parcours-terrain-btp"
              className="mt-12 scroll-mt-24 border-t border-slate-100 pt-12"
            >
              <h3 className="font-display text-center text-xl font-bold text-slate-900 md:text-2xl">
                Parcours terrain — dirigeante d&apos;entreprise BTP
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600 leading-relaxed">
                Dirigeante d&apos;<strong className="text-slate-800">OFC Création d&apos;Entreprise</strong>, j&apos;ai
                construit mon expertise à la fois sur le terrain et dans la relation client : conduite de chantier en
                travaux publics (ALIA BTP, Guyancourt), coordination avec les équipes et les interlocuteurs chantier,
                lecture des plans et contrôle des ouvrages. Ces années en boots et gilet orange nourrissent aujourd&apos;hui
                mes formations IA : zéro jargon inutile, des exemples qui parlent aux artisans et aux encadrants.
              </p>
              <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-stretch">
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  {/* Portrait : cadre 4/3 + ancrage haut pour éviter de couper la tête (object-cover) */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-200">
                    <Image
                      src={PHOTOS.parcoursChantierFondations.src}
                      alt={PHOTOS.parcoursChantierFondations.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col border-t border-slate-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
                    Inspection sur le terrain — précision sur les ouvrages et le même souci du détail que sur vos devis
                    et comptes rendus une fois l&apos;IA en place.
                  </figcaption>
                </figure>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-200">
                    <Image
                      src={PHOTOS.parcoursChantierPlans.src}
                      alt={PHOTOS.parcoursChantierPlans.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col border-t border-slate-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
                    Coordination sur chantier avec les acteurs du projet — vision opérationnelle et travail d&apos;équipe,
                    au cœur de ce que j&apos;enseigne aux dirigeants et conducteurs de travaux.
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-3xl space-y-6 text-slate-600">
              <p>
                Forte de <strong>10 ans d'expérience</strong> en formation professionnelle et en conduite de chantier dans les travaux publics,
                je me suis spécialisée dans l'accompagnement des entreprises du BTP vers l'intelligence artificielle. 
                Mon objectif n'est pas de parler théorie, mais de vous montrer concrètement comment ChatGPT et l'IA générative 
                peuvent transformer votre quotidien.
              </p>
              <p>
                <strong>Basée à Guyancourt (78)</strong>, j'interviens en <strong>Île-de-France</strong> (Paris, Yvelines, Seine-et-Marne, Essonne, Hauts-de-Seine, Val-de-Marne, Seine-Saint-Denis, Val-d'Oise) 
                et partout en France (Lyon, Bordeaux, Lille, etc.).
              </p>
              <p>
                Que vous soyez dirigeant, chef de chantier ou responsable administratif, je vous accompagne sur vos cas réels : 
                préparation de devis, réponses clients, relances d'impayés, comptes rendus de chantier, communication sécurité, 
                préparation de documents pour assurances et maîtres d'ouvrage.
              </p>
              <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-soft)] py-4 pl-6 pr-6 italic text-[var(--accent)]">
                « Mon rôle, ce n'est pas de faire du blabla sur l'IA. C'est de vous montrer en direct 
                comment ChatGPT fait gagner 3 à 5 heures par semaine sur vos devis, vos comptes rendus chantier 
                et vos relances clients. »
              </blockquote>
              <p>
                Mes formations sont <strong>certifiées Qualiopi</strong> et peuvent être prises en charge à <strong>100 % 
                par votre OPCO Constructys</strong>. Je vous accompagne également dans les démarches administratives 
                pour faciliter le financement de votre formation.
              </p>
            </div>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-4">
              <Link
                href="/formations"
                className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Voir le catalogue formations
              </Link>
              <RdvLink className="inline-block rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]">
                Prendre RDV
              </RdvLink>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ GEO inline */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={FAQ_A_PROPOS_COMPLET}
            title="Questions fréquentes"
            subtitle="Partenariats, Qualiopi, parcours professionnel — zone d'intervention et accompagnement."
          />
        </div>
      </section>

      {/* Aller plus loin */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Formation IA BTP' },
              { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/blog', label: 'Articles et guides' },
              { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
              { href: '/a-propos#clients-partenaires', label: 'Clients & partenaires' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
