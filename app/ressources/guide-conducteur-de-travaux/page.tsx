import Image from 'next/image';
import Link from 'next/link';
import { Check, Users, HardHat, Building2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SkillIaLeadMagnetForm } from '@/components/ressources/SkillIaLeadMagnetForm';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { RdvLink } from '@/components/RdvLink';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { buildGuideConducteurTravauxImageObjectJsonLd } from '@/lib/schema-image-objects';
import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';

const PATH = '/ressources/guide-conducteur-de-travaux';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

const SOMMAIRE = [
  {
    rubrique: 'Préparation du chantier',
    items: [
      {
        tuto: 1,
        page: 8,
        title: 'Analyser le DCE et préparer la décision Go / No Go.',
        href: LINKS.tutoAnalyseDce,
      },
      {
        tuto: 2,
        page: 15,
        title: 'Préparer le PPSPS à partir des données du chantier.',
        href: LINKS.tutoPpsps,
      },
    ],
  },
  {
    rubrique: 'Exécution des travaux',
    items: [
      {
        tuto: 3,
        page: 22,
        title: 'Rédiger un compte rendu de chantier à partir de ses notes.',
        href: LINKS.tutoCrChantier,
      },
      {
        tuto: 4,
        page: 29,
        title: 'Préparer un constat de retard à partir de faits datés.',
        href: LINKS.tutoConstatRetard,
      },
    ],
  },
  {
    rubrique: 'Livraison du chantier',
    items: [
      {
        tuto: 5,
        page: 36,
        title: 'Préparer le PV de levée des réserves.',
        href: LINKS.tutoPvLeveeReserves,
      },
      {
        tuto: 6,
        page: 43,
        title: 'Constituer le dossier des ouvrages exécutés (DOE).',
        href: LINKS.tutoDoeDossierOuvragesExecutes,
      },
    ],
  },
  {
    rubrique: 'Outils pour toutes les phases',
    items: [
      {
        tuto: 7,
        page: 50,
        title:
          'Connecter Claude à sa messagerie, à son agenda et à ses fichiers — exemples : retrouver les échanges avec la maîtrise d’œuvre sur une réserve et préparer un brouillon pour transmettre le compte rendu.',
        href: null as string | null,
      },
    ],
  },
] as const;

export const metadata = createPageMetadata({
  title: 'Guide IA conducteur de travaux : 7 tutos Claude',
  description:
    'Guide IA conducteur de travaux : 6 skills Claude, tuto connecteurs, DCE à DOE. PDF édition 2, 62 pages — gratuit, sans inscription. Méthode terrain BTP.',
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'skill IA BTP',
    'IA conducteur de travaux',
    'ChatGPT BTP',
    'automatisation chantier',
    'guide IA BTP gratuit',
    'formation IA pour le BTP',
  ],
  openGraphType: 'article',
  openGraphTitle: 'Guide CDT édition 2 — skills et connecteurs',
  openGraphDescription:
    'DCE, PPSPS, CR, constat, PV réserves, DOE et connexion messagerie — 62 pages, prompts et relecture humaine.',
  image: {
    url: PHOTOS.guideConducteurTravauxHero2026.src,
    width: PHOTOS.guideConducteurTravauxHero2026.width,
    height: PHOTOS.guideConducteurTravauxHero2026.height,
    alt: PHOTOS.guideConducteurTravauxHero2026.alt,
  },
  appendAuthorSuffix: false,
});

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Guide conducteur de travaux — 6 skills Claude et 7 tutos (PDF édition 2)',
  description:
    'Guide PDF gratuit OFC / Laure Olivié (édition 2, 62 pages) : six skills métier (DCE, PPSPS, CR, constat, PV réserves, DOE) et un tutoriel connecteurs — méthode Claude, relecture humaine. Conducteurs et directions exploitation BTP.',
  url: CANONICAL,
  inLanguage: 'fr-FR',
  educationalLevel: 'intermediate',
  learningResourceType: 'Guide',
  about: { '@type': 'Thing', name: 'IA dans le BTP' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Professionnels du bâtiment et des travaux publics',
  },
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
  },
  publisher: { '@id': `${SITE_CONFIG.url.replace(/\/$/, '')}/#organization` },
};

const howToSkillJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${CANONICAL}#howto`,
  name: 'Créer un skill Claude métier chantier avec le guide CDT',
  description:
    'Méthode pas à pas (préparation, instructions, export document) utilisée dans le guide Claude conducteur de travaux — chaque livrable BTP peut être encapsulé en skill réutilisable.',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choisir une tâche répétitive', text: 'Sélectionnez une tâche exécutée au moins 3 fois par semaine.' },
    { '@type': 'HowToStep', position: 2, name: 'Lister les ingrédients', text: 'Notez les informations d’entrée nécessaires à chaque exécution.' },
    { '@type': 'HowToStep', position: 3, name: 'Définir le rôle IA', text: 'Décrivez le rôle métier de l’IA en 2 lignes.' },
    { '@type': 'HowToStep', position: 4, name: 'Écrire les instructions', text: 'Détaillez les étapes de traitement de manière numérotée.' },
    { '@type': 'HowToStep', position: 5, name: 'Fixer le format de sortie', text: 'Imposez le format final (doc, mail, tableau) et les contraintes.' },
    { '@type': 'HowToStep', position: 6, name: 'Tester sur 3 cas réels', text: 'Testez puis corrigez les instructions selon les retours.' },
    { '@type': 'HowToStep', position: 7, name: 'Documenter le déclencheur', text: 'Formalisez la commande d’appel du skill et partagez-la à l’équipe.' },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'Quel fichier est téléchargeable depuis cette page ?',
    a: `Le guide PDF « ${SKILL_IA_LEAD_MAGNET.fileName} » (${SKILL_IA_LEAD_MAGNET.fileSizeLabel}, ${SKILL_IA_LEAD_MAGNET.pageCount} pages, ${SKILL_IA_LEAD_MAGNET.editionLabel}) rassemble six skills métier chantier et sept tutoriels (dont les connecteurs messagerie, agenda et fichiers). Aucune inscription obligatoire pour le téléchargement depuis cette page.`,
  },
  {
    q: 'Comment préparer Claude avant le premier tutoriel ?',
    a: 'À partir de la page 5, le guide montre les réglages à vérifier pour activer les skills et protéger vos données avant de travailler sur un dossier de chantier.',
  },
  {
    q: 'Ce guide remplace une formation présentielle ?',
    a: 'Non : c’est un support autonome à parcourir à votre rythme. Une formation IA pour les pros du BTP dispensée par un organisme certifié Qualiopi reste pertinente pour monter en compétences sur vos cas réels, avec exercices terrain et mise en équipe.',
  },
  {
    q: 'Où trouver d’autres tutos BTP en pages web ?',
    a: 'Consultez « Ressources » sur laureolivie.fr puis l’index listant tous les tutos PDF : chaque fiche décrit un livrable et propose aussi un téléchargement PDF dédié.',
  },
];

export default function SkillIaConducteurTravauxPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  return (
    <div className="ofc-editorial min-h-screen bg-white" style={{ color: '#1A1A1A' }}>
      <JsonLd id="schema-learning-resource-skill-ia" schema={learningResourceJsonLd} />
      <JsonLd id="schema-howto-skill-ia" schema={howToSkillJsonLd} />
      <JsonLd
        id="schema-image-guide-conducteur-travaux"
        schema={buildGuideConducteurTravauxImageObjectJsonLd()}
      />
      {faqSchema ? <JsonLd id="schema-faq-skill-ia" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-skill-ia">
        <div className="ofc-section-inner grid gap-10 py-10 md:items-start md:gap-12 md:py-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h1 id="hero-skill-ia" className="font-display text-2xl font-bold leading-tight md:text-2xl lg:text-2xl">
              Guide IA du conducteur de travaux — 6 skills Claude et un tutoriel sur les connecteurs
            </h1>
            <p className="mt-5 max-w-none text-lg leading-relaxed text-white/95 lg:max-w-[42rem] xl:max-w-none">
              De l’analyse du DCE à la constitution du DOE, ce guide vous accompagne dans la préparation de six livrables
              de chantier avec Claude. Le septième tutoriel montre comment retrouver un échange avec la maîtrise d’œuvre,
              consulter le dernier compte rendu ou proposer un créneau de levée de réserves à partir de vos outils.
            </p>
            <ul className="mt-8 space-y-3 text-base">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>
                  Préparation du chantier · analyse Go / No Go du DCE + trame PPSPS à adapter et faire valider
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Exécution des travaux · comptes rendus et constats de retard prêts à relire</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Livraison du chantier · PV réserves traçables + dossier des ouvrages exécutés (DOE)</span>
              </li>
            </ul>
          </div>
          <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24 xl:top-28">
            <figure className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-[320px]">
              <div className="overflow-hidden rounded-full shadow-[0_20px_48px_-16px_rgba(0,0,0,0.25)] ring-4 ring-white/30">
                <Image
                  src={PHOTOS.guideConducteurTravauxHero2026.src}
                  alt={PHOTOS.guideConducteurTravauxHero2026.alt}
                  title={PHOTOS.guideConducteurTravauxHero2026.title}
                  width={PHOTOS.guideConducteurTravauxHero2026.width}
                  height={PHOTOS.guideConducteurTravauxHero2026.height}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 280px, 320px"
                  priority
                  quality={75}
                />
              </div>
            </figure>
            <SkillIaLeadMagnetForm />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12" aria-labelledby="article-guide-cdt">
        <div className="ofc-section-inner">
          <h2 id="article-guide-cdt" className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Présentation du guide ressources
          </h2>
          <div className="mt-6 xl:grid xl:grid-cols-2 xl:gap-x-12 xl:gap-y-6">
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700">
                Ce guide est destiné aux conducteurs de travaux qui enchaînent les livrables écrits : appels
                d&apos;offres, sécurité, suivi chantier et clôtures contractuelles. L&apos;enjeu n&apos;est pas de
                « remplacer » le métier — c&apos;est de structurer la préparation des documents récurrents (grilles
                CCAP/CCTP, trames PV, dossiers livraison) pendant que les imprévus restent votre priorité chantier.
              </p>
              <p className="leading-relaxed text-slate-700">
                L&apos;édition 2 distingue six skills métier (un par livrable) et sept tutoriels pas à pas : vous pouvez
                suivre le PDF linéairement, ou ouvrir directement la page du tuto urgent — chaque skill précise les
                informations à fournir, le résultat attendu et un exemple, avec des prompts qui demandent de citer les
                sources et de signaler les informations manquantes.
              </p>
            </div>
            <div className="mt-4 space-y-4 xl:mt-0">
              <p className="leading-relaxed text-slate-700">
                Le téléchargement est gratuit et immédiat via l&apos;encart ci-dessus ({SKILL_IA_LEAD_MAGNET.editionLabel}
                ). Besoin du même niveau de détail en fiches web séparées&nbsp;? Consultez l&apos;{' '}
                <Link href={LINKS.ressourcesTutos} className="font-semibold text-[#377CF3] hover:underline">
                  index de tous les tutos PDF
                </Link>
                , où chaque fiche reprend un livrable et un PDF dédié — le hub ressources est aussi lié en bas de page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-[#F2F2F2] ofc-band" aria-labelledby="why-guide">
        <div className="ofc-section-inner">
          <h2 id="why-guide" className="font-display text-2xl font-bold md:text-2xl">
            Pourquoi ce guide
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: `${SKILL_IA_LEAD_MAGNET.pageCount} p.`, v: 'édition 2 — mode d’emploi terrain structuré par phases' },
              { k: '0 €', v: 'guide PDF complet — pas d’inscription sur cette page' },
              { k: String(SKILL_IA_LEAD_MAGNET.tutorialCount), v: 'tutoriels (dont connecteurs pour toutes les phases)' },
              { k: String(SKILL_IA_LEAD_MAGNET.skillCount), v: 'skills métier chantier (DCE à DOE)' },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border-2 border-[#377CF3] bg-white p-5 shadow-sm">
                <p className="font-display text-2xl font-bold text-[#377CF3]">{c.k}</p>
                <p className="mt-2 text-sm text-slate-700">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ofc-band" aria-labelledby="edition-2">
        <div className="ofc-section-inner">
          <h2 id="edition-2" className="font-display text-2xl font-bold md:text-2xl">
            Nouveautés de l&apos;édition 2
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Le PDF {SKILL_IA_LEAD_MAGNET.editionLabel} est pensé pour être utilisé à l&apos;écran, à côté de Claude en
            français.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Captures d’écran Claude en français pour suivre les réglages (à partir de la page 5).',
              'Une fiche par skill : informations à fournir, résultat attendu et exemple métier.',
              'Prompts qui demandent de citer les sources et de signaler les informations manquantes.',
              'Tutoriel 7 : six usages chantier des connecteurs (messagerie, agenda, fichiers).',
              'Bonus dès la page 56 : enchaîner plusieurs skills, méthode en sept étapes, adapter un squelette de skill.',
              'Checklist « Es-tu sûr ? » pour relire chaque livrable avant envoi ou diffusion.',
            ].map((t) => (
              <div key={t} className="rounded-2xl p-6" style={{ backgroundColor: '#D4E3FC' }}>
                <p className="font-medium text-slate-900">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] ofc-band" aria-labelledby="tutorial-7-etapes">
        <div className="ofc-section-inner">
          <h2 id="tutorial-7-etapes" className="font-display text-2xl font-bold md:text-2xl">
            Schéma générique — construire un skill (rappel hors PDF)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Le guide détaille ses propres prompts par livrable&nbsp;; ce rappel résume la logique qui se répète. La
            version PDF reprend la même méthode en sept étapes à partir de la page 56.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Choisissez UNE tâche répétitive reliée à un document type (CR, constat, dossier…).',
              'Listez les informations à fournir à chaque lancement.',
              'Décrivez le rôle métier de l’IA en 2 lignes.',
              'Écrivez les instructions pas à pas (numérotées).',
              'Précisez le format final (mail, .docx, tableau).',
              'Testez sur 3 cas réels puis corrigez.',
              'Documentez le déclencheur et partagez-le à l’équipe.',
            ].map((step, idx) => (
              <li key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-[#377CF3]">Étape {idx + 1}</p>
                <p className="mt-2 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ofc-band" aria-labelledby="sommaire-guide">
        <div className="ofc-section-inner">
          <h2 id="sommaire-guide" className="font-display text-2xl font-bold md:text-2xl">
            Sommaire du guide PDF
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Les numéros correspondent aux pages de début dans « {SKILL_IA_LEAD_MAGNET.fileName} ». Les six premiers
            tutoriels couvrent un skill métier&nbsp;; le septième est transversal (connecteurs).
          </p>
          <div className="mt-10 space-y-10">
            {SOMMAIRE.map((bloc) => (
              <div key={bloc.rubrique}>
                <h3 className="font-display text-lg font-bold text-slate-900">{bloc.rubrique}</h3>
                <ul className="mt-4 space-y-3">
                  {bloc.items.map((item) => (
                    <li
                      key={item.tuto}
                      className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 text-sm text-slate-700"
                    >
                      <span className="font-semibold text-[#377CF3]">
                        Tuto {item.tuto}, p. {item.page}
                      </span>
                      {' — '}
                      {item.href ? (
                        <Link href={item.href} className="font-medium text-[#377CF3] hover:underline">
                          {item.title}
                        </Link>
                      ) : (
                        <span>
                          {item.title} <span className="text-slate-500">(détail : page {item.page} du guide)</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white ofc-band" aria-labelledby="template-skill">
        <div className="ofc-section-inner">
          <h2 id="template-skill" className="font-display text-2xl font-bold md:text-2xl">
            Squelette de skill (bonus rapide hors PDF détaillé)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Le fichier « {SKILL_IA_LEAD_MAGNET.fileName} » inclut prompts et consignes spécifiques par livrable. Ce cadre
            générique aide quand vous devez improviser une nouvelle automatisation chantier avant de la figer dans un skill
            définitif (voir aussi page 56 du guide).
          </p>
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-[#0F172A] p-5 text-xs leading-relaxed text-slate-100 md:text-sm">{`# SKILL : [NOM DU SKILL]
## ROLE
Tu es [TITRE] chez [ENTREPRISE], specialise en [DOMAINE BTP].
Ton style : factuel, professionnel, sans jargon marketing.

## DECLENCHEUR
Active ce skill quand l'utilisateur ecrit : "[MOT-CLE]"
suivi de : [LISTE DES INFOS]

## INSTRUCTIONS PAS-A-PAS
1. Reformule les infos brutes en phrases completes
2. [ETAPE SPECIFIQUE 2]
3. [ETAPE SPECIFIQUE 3]
4. Verifie les manques et redemande si besoin

## FORMAT DE SORTIE
Format : [.docx / mail / tableau / .pdf]
Longueur : [X lignes / 1 page max]
Signature : [NOM] — [TITRE] — [ENTREPRISE]

## CONTRAINTES
- Jamais d'engagement non couvert par le marche
- Toujours dater le document
- Toujours mentionner le numero de chantier`}</pre>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white ofc-band" aria-labelledby="audience">
        <div className="ofc-section-inner">
          <h2 id="audience" className="font-display text-2xl font-bold md:text-2xl">
            À qui ça s&apos;adresse
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <HardHat className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Conducteurs de travaux</p>
                <p className="mt-1 text-sm text-slate-600">CR, coordination et reporting écrit.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <Users className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Directeurs d&apos;exploitation</p>
                <p className="mt-1 text-sm text-slate-600">Standardiser les livrables entre équipes.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <Building2 className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Chefs d&apos;entreprise BTP</p>
                <p className="mt-1 text-sm text-slate-600">Gains de temps sur la préparation documentaire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#F2F2F2] ofc-band" aria-labelledby="about-laure">
        <div className="ofc-section-inner grid gap-10 md:grid-cols-[200px_1fr] md:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <Image
              src={PHOTOS.siteAvatar.src}
              alt={PHOTOS.siteAvatar.alt}
              width={400}
              height={400}
              className="h-full w-full object-cover"
              sizes="200px"
              loading="lazy"
              quality={70}
            />
          </div>
          <div>
            <h2 id="about-laure" className="font-display text-2xl font-bold md:text-2xl">
              Qui est Laure Olivié ?
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Formatrice IA spécialisée BTP — Laure Olivié, organisme certifié Qualiopi. Sessions avec la FFB, le CNAM et
              de nombreuses PME du bâtiment en Île-de-France.
            </p>
            <p className="mt-3 font-semibold text-slate-900">
              {formatNoteSatisfactionAffichageComplet()} · Qualiopi · Constructys
            </p>
            <p className="mt-4 text-sm font-medium text-slate-600">Références : FFB · CNAM</p>
          </div>
        </div>
      </section>

      <section className="ofc-band" aria-labelledby="faq-skill">
        <div className="ofc-section-inner max-w-3xl">
          <h2 id="faq-skill" className="font-display text-2xl font-bold">
            Questions fréquentes
          </h2>
          <ul className="mt-8 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <li key={item.q} className="border-b border-slate-200 pb-6">
                <p className="font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-slate-600">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MaillageRessourceFromConfig
        config={getMaillageRessourceConfig(PATH)!}
        currentPath={PATH}
        excludeHrefs={[LINKS.ressourcesTutos, LINKS.formations, LINKS.claudeAiBtp]}
      />

      <section className="border-t border-slate-200 bg-[#377CF3] py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-xl font-bold md:text-2xl">Pas le temps de lire tout de suite ?</h2>
          <p className="mt-3 text-white/95">
            Réservez 20 minutes d&apos;échange pour cadrer votre besoin formation IA pour le BTP.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RdvLink
              origin="ressources-guide-conducteur-de-travaux-contact-rdv-page-calendly"
              variant="unstyled"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] shadow-sm hover:bg-[#F2F2F2]"
            />
          </div>
        </div>
      </section>

      <div className="ofc-section-inner py-8 text-center text-sm text-slate-500">
        <Link href={SCHEMA_LINKEDIN_PROFILE_URL} className="text-[#377CF3] hover:underline">
          LinkedIn — Laure Olivié
        </Link>
        {' · '}
        <Link href={LINKS.contact} className="text-[#377CF3] hover:underline">
          Demander un devis
        </Link>
      </div>
    </div>
  );
}