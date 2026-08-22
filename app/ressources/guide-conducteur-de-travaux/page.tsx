import Image from 'next/image';
import Link from 'next/link';
import { Check, Users, HardHat, Building2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SkillIaLeadMagnetForm } from '@/components/ressources/SkillIaLeadMagnetForm';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { buildGuideConducteurTravauxImageObjectJsonLd } from '@/lib/schema-image-objects';

const PATH = '/ressources/guide-conducteur-de-travaux';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata = createPageMetadata({
  title: 'Guide conducteur travaux — PDF Claude',
  description:
    'Formation IA pour le BTP : guide PDF gratuit conducteur — DCE, PPSPS, CR, DOE. 6 tutos Claude, prompts inclus.',
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
  openGraphTitle: 'Guide CDT — 6 tutos Claude pour piloter le chantier (PDF gratuit)',
  openGraphDescription: 'DCE, PPSPS, CR, constat retard, PV réserves, DOE — méthodes et prompts inclus.',
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
  name: 'Guide conducteur de travaux — 6 tutos Claude BTP (PDF gratuit)',
  description:
    'Guide PDF gratuit OFC / Laure Olivié : analyse de DCE, PPSPS, compte rendu chantier, constat de retard, PV levée des réserves, DOE livraison — méthode Claude, prompts à copier-coller. Conducteurs et directions exploitation BTP.',
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
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
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
    a: 'Le guide PDF téléchargeable (« Pack_CDT_OFC.pdf », ~400 Ko, environ 52 pages) rassemble les 6 tutos : analyse DCE, PPSPS, compte rendu de chantier, constat de retard, PV levée des réserves, DOE livraison. Aucune inscription obligatoire pour le téléchargement depuis cette page.',
  },
  {
    q: 'Faut-il un abonnement Claude pour appliquer ce guide ?',
    a: 'Pour utiliser les skills personnalisés Claude, un abonnement Pro est nécessaire. Le fichier explique également comment activer les capacités « Skills », « Code execution » et création de fichiers — indispensable pour exporter des livrables (Word par exemple).',
  },
  {
    q: 'Ce guide remplace une formation présentielle ?',
    a: 'Non : c’est un support autonome à parcourir à votre rythme. Une formation IA pour les pros du BTP dispensée par un organisme certifié Qualiopi reste pertinente pour monter en compétences sur vos cas réels, avec exercices terrain et mise en équipe.',
  },
  {
    q: 'Où trouver d’autres tutos BTP en pages web ?',
    a:
      'Consultez « Ressources » sur laureolivie.fr puis l’index listant tous les tutos PDF : chaque fiche décrit un livrable et propose aussi un téléchargement PDF dédié.',
  },
];

export default function SkillIaConducteurTravauxPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  return (
    <div className="min-h-screen bg-white" style={{ color: '#1A1A1A' }}>
      <JsonLd id="schema-learning-resource-skill-ia" schema={learningResourceJsonLd} />
      <JsonLd id="schema-howto-skill-ia" schema={howToSkillJsonLd} />
      <JsonLd
        id="schema-image-guide-conducteur-travaux"
        schema={buildGuideConducteurTravauxImageObjectJsonLd()}
      />
      {faqSchema ? <JsonLd id="schema-faq-skill-ia" schema={faqSchema} /> : null}

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-skill-ia">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:items-start md:gap-12 md:py-20 lg:grid-cols-2">
          <div className="min-w-0">
            <h1 id="hero-skill-ia" className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.35rem]">
              Guide du conducteur de travaux : 6&nbsp;skills Claude pour piloter le chantier
            </h1>
            <p className="mt-5 max-w-none text-lg leading-relaxed text-white/95 lg:max-w-[42rem] xl:max-w-none">
              Ce guide PDF gratuit regroupe préparation (DCE, sécurité), exécution (CR chantier, constats) et livraison
              (PV de levée des réserves, DOE). Pour chaque livrable : méthode de skill, prompts à copier-coller et
              repères métier terrain.
            </p>
            <ul className="mt-8 space-y-3 text-base">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Phase préparation · analyse Go / No Go du DCE + PPSPS structuré conforme Codex</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Phase chantier · comptes rendus et constats de retard prêts à envoyer</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Livraison · PV réserves traçables + dossier ouvrages exécutés (DOE)</span>
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
                
                  quality={75}/>
              </div>
            </figure>
            <SkillIaLeadMagnetForm />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16" aria-labelledby="article-guide-cdt">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="article-guide-cdt" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Présentation du guide ressources
          </h2>
          <div className="mt-6 xl:grid xl:grid-cols-2 xl:gap-x-12 xl:gap-y-6">
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-700">
                Ce guide est destiné aux conducteurs de travaux qui enchaînent les livrables écrits : appels d&apos;offres,
                sécurité, suivi chantier et clôtures contractuelles. L&apos;enjeu n&apos;est pas de « remplacer » le métier —
                c&apos;est de gagner les heures de préparation où l&apos;on reformate toujours les mêmes structures (grilles
                CCAP/CCTP, trames PV, dossiers livraison) pendant que les imprévus restent votre priorité chantier.
              </p>
              <p className="leading-relaxed text-slate-700">
                Chaque bloc du fichier reprend une chronologie de chantier : tu peux suivre le guide une première fois
                linéairement, puis repasser directement au chapitre du livrable urgent du jour — analyse DCE, PPSPS, CR,
                constat, PV réserves ou DOE. Les prompts inclus sont formulés pour être collés tel quel après avoir chargé vos
                contraintes d&apos;entreprise (métiers traités, typologie d&apos;AO, exemples anonymisés).
              </p>
            </div>
            <div className="mt-4 space-y-4 xl:mt-0">
              <p className="leading-relaxed text-slate-700">
                Le téléchargement est gratuit et immédiat via l&apos;encart bleu ci-dessus. Besoin du même niveau de détail
                en fiches web séparées&nbsp;? Consultez l&apos;{' '}
                <Link href={LINKS.ressourcesTutos} className="font-semibold text-[#377CF3] hover:underline">
                  index de tous les tutos PDF
                </Link>
                , où chaque fiche reprend un livrable et un PDF dédié — le hub ressources est aussi lié en bas de page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-[#F2F2F2] py-14" aria-labelledby="why-guide">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="why-guide" className="font-display text-2xl font-bold md:text-3xl">
            Pourquoi ce guide
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: '30–50 h', v: 'de bureau récupérables sur un chantier moyen (ordre de grandeur guide)' },
              { k: '0 €', v: 'guide PDF complet — pas d’inscription sur cette page' },
              { k: '52 p.', v: 'fichier structuré comme un mode d’emploi terrain' },
              { k: '6', v: 'livrables critiques couverts (prép. / exécution / livraison)' },
            ].map((c) => (
              <div
                key={c.k}
                className="rounded-2xl border-2 border-[#377CF3] bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-[#377CF3]">{c.k}</p>
                <p className="mt-2 text-sm text-slate-700">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="learn">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="learn" className="font-display text-2xl font-bold md:text-3xl">
            Ce que vous allez apprendre
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Structurer chaque skill autour d’un livrable précis (DCE, PPSPS, CR…)',
              'Paramétrer Claude Pro : skills activés, fichiers et exécution de code',
              'Industrialiser les prompts et grilles de votre entreprise',
              'Accélérer Go / No Go, constats, PV et DOE tout en gardant la traçabilité',
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#D4E3FC' }}
              >
                <p className="font-medium text-slate-900">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC] py-14" aria-labelledby="tutorial-7-etapes">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="tutorial-7-etapes" className="font-display text-2xl font-bold md:text-3xl">
            Schéma générique — construire un skill (rappel hors PDF)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Le guide détaille ses propres prompts par livrable&nbsp;; ce rappel résume la logique qui se répète avant
            d&apos;adapter chaque cas à votre entreprise.
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

      <section className="py-14" aria-labelledby="six-livrables-guide">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="six-livrables-guide" className="font-display text-2xl font-bold md:text-3xl">
            Les 6 livrables couverts dans le fichier PDF
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Chaque ligne renvoie vers la fiche web détaillée du même thème (version longue, FAQ, étapes) — le guide PDF
            reste le document unique à conserver hors-ligne.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                phase: 'Phase 1 — Préparation',
                title: 'Analyse de DCE',
                href: LINKS.tutoAnalyseDce,
                hint: 'Fiche standardisée Go / No Go en quelques minutes',
              },
              {
                phase: 'Phase 1 — Préparation',
                title: 'PPSPS',
                href: LINKS.tutoPpsps,
                hint: 'Plan de sécurité structuré selon la chronologie réglementaire',
              },
              {
                phase: 'Phase 2 — Exécution',
                title: 'Compte rendu de chantier',
                href: LINKS.tutoCrChantier,
                hint: 'Voix ou notes brutes vers CR prêt à relire',
              },
              {
                phase: 'Phase 2 — Exécution',
                title: 'Constat de retard',
                href: LINKS.tutoConstatRetard,
                hint: 'Courrier argumenté, fondé sur vos contrats',
              },
              {
                phase: 'Phase 3 — Livraison',
                title: 'PV de levée de réserves',
                href: LINKS.tutoPvLeveeReserves,
                hint: 'Traçabilité juridique et suivi des réserves',
              },
              {
                phase: 'Phase 3 — Livraison',
                title: 'DOE (dossier des ouvrages exécutés)',
                href: LINKS.tutoDoeDossierOuvragesExecutes,
                hint: 'Compilation des pièces et repérage des manques',
              },
            ].map((item) => (
              <article key={item.href} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{item.phase}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                  <Link href={item.href} className="text-[#377CF3] hover:underline">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-700">{item.hint}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14" aria-labelledby="template-skill">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="template-skill" className="font-display text-2xl font-bold md:text-3xl">
            Squelette de skill (bonus rapide hors PDF détaillé)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Le fichier téléchargeable « Pack_CDT_OFC.pdf » (contenu du guide) inclut prompts et consignes spécifiques par livrable. Ce cadre générique aide
            quand vous devez improviser une nouvelle automatisation chantier avant de la figer dans un skill définitif.
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

      <section className="border-t border-slate-200 bg-white py-14" aria-labelledby="audience">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="audience" className="font-display text-2xl font-bold md:text-3xl">
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
                <p className="mt-1 text-sm text-slate-600">Gains de temps mesurables sur l&apos;administratif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#F2F2F2] py-14" aria-labelledby="about-laure">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[200px_1fr] md:items-center">
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
            <h2 id="about-laure" className="font-display text-2xl font-bold md:text-3xl">
              Qui est Laure Olivié ?
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Formatrice IA spécialisée BTP — OFC Création d&apos;Entreprise, organisme certifié Qualiopi. Sessions avec
              la FFB, le CNAM et de nombreuses PME du bâtiment en Île-de-France.
            </p>
            <p className="mt-3 font-semibold text-slate-900">
              +{formatProfessionalsTrainedCount()} personnes formées · Qualiopi ·
              Constructys
            </p>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Références : FFB · CNAM
            </p>
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="faq-skill">
        <div className="mx-auto max-w-3xl px-4">
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
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Pas le temps de lire tout de suite ?
          </h2>
          <p className="mt-3 text-white/95">
            Réservez 20 minutes d&apos;échange pour cadrer votre besoin formation IA pour le BTP.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              origin="ressources-guide-conducteur-de-travaux-contact-rdv-page-calendly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] shadow-sm hover:bg-[#F2F2F2]"
            >
              Prendre rendez-vous
            </a>
            <Link
              href={LINKS.contact}
              className="inline-flex rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-500">
        <Link href={SCHEMA_LINKEDIN_PROFILE_URL} className="text-[#377CF3] hover:underline">
          LinkedIn — Laure Olivié
        </Link>
        {' · '}
        <Link href={LINKS.contact} className="text-[#377CF3] hover:underline">
          Contact
        </Link>
      </div>
    </div>
  );
}
