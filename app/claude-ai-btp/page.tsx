import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CopyPromptButton } from '@/components/CopyPromptButton';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ClaudeSkillTutorialBtpSection } from '@/components/claude/ClaudeSkillTutorialBtpSection';
import { ClaudeSkillsLeadMagnetSection } from '@/components/claude/ClaudeSkillsLeadMagnetSection';
import { LINKS } from '@/lib/internal-links';

const PATH = '/claude-ai-btp';
const CANONICAL = `${SITE_CONFIG.url}${PATH}`;
const OG_IMAGE = '/og-claude-ai-btp.jpg';

export const metadata = createPageMetadata({
  title: 'Formation Claude AI BTP : guide & IDF | Laure Olivié',
  description:
    'Formation Claude AI BTP : guide Chat, Cowork, Code, Chrome. Paris, Yvelines, Essonne, IDF. Formation IA BTP Qualiopi — Constructys. +1 592 formés.',
  path: PATH,
  keywords: [
    'formation Claude AI BTP',
    'formation Claude AI BTP Île-de-France',
    'formation Claude AI BTP Yvelines',
    'formation Claude AI BTP Saint-Quentin-en-Yvelines',
    'formation Claude AI BTP Paris',
    'formation Claude AI BTP Essonne',
    'Claude AI BTP',
    'IA chantier',
    'automatisation BTP',
    'Claude Cowork conducteur de travaux',
    'formation IA BTP',
  ],
  openGraphType: 'article',
  article: {
    publishedTime: '2026-04-13',
    modifiedTime: '2026-04-15',
    author: SITE_CONFIG.name,
    section: 'Formation IA BTP',
  },
  image: {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: 'Formation IA BTP avec Claude — interface et cas d’usage professionnels',
  },
  appendAuthorSuffix: false,
  robots: { index: true, follow: true },
});

const breadcrumbJson = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Claude AI BTP', path: PATH },
]);

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Formation Claude AI BTP : guide complet 2026 — Paris, Île-de-France, Yvelines',
  description:
    "Guide et formation Claude AI BTP : interfaces Chat, Cowork, Code, Chrome. Sessions et ressources pour pros du bâtiment en Île-de-France, Paris, Yvelines, Essonne.",
  author: {
    '@type': 'Person',
    name: 'Laure Olivié',
    url: `${SITE_CONFIG.url}/a-propos`,
    jobTitle: 'Formatrice IA BTP',
    worksFor: {
      '@type': 'Organization',
      name: "OFC Création d'Entreprise",
      url: SITE_CONFIG.url,
    },
  },
  publisher: {
    '@type': 'Organization',
    name: "OFC Création d'Entreprise",
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/logo-lo.svg`,
    },
  },
  datePublished: '2026-04-13',
  dateModified: '2026-04-15',
  url: CANONICAL,
  mainEntityOfPage: CANONICAL,
  keywords:
    'formation Claude AI BTP, formation Claude AI BTP Île-de-France, formation Claude AI BTP Yvelines, formation Claude AI BTP Paris, IA chantier, automatisation BTP, Claude AI BTP',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Claude AI est-il adapté aux petites entreprises du BTP ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. La version gratuite de Claude Chat suffit pour commencer — rédiger des emails, structurer des comptes rendus, analyser un document PDF uploadé. L\'abonnement Pro (20 $/mois) devient pertinent dès que vous analysez régulièrement des DCE ou CCTP, ou souhaitez configurer des tâches automatisées avec Cowork.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle interface Claude choisir pour un conducteur de travaux ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un conducteur de travaux tire le meilleur parti de Claude Cowork pour les missions récurrentes — CR de chantier, analyse de DCE, veille AO automatisée. Claude Chat avec un Projet configuré complète Cowork pour les tâches ponctuelles. Les deux interfaces sont complémentaires.',
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on utiliser Claude AI pour répondre à des appels d'offres publics ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Claude est utilisé lors des sessions OFC avec la FFB Grand Paris pour la totalité du workflow AO : veille et détection des AO pertinents, analyse du DCE et décision Go/No-Go, rédaction du mémoire technique, vérification de conformité administrative.",
      },
    },
    {
      '@type': 'Question',
      name: 'Les données de chantier confiées à Claude sont-elles confidentielles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'abonnement Claude Pro ne transmet pas les données des conversations pour l'entraînement des modèles. Désactivez l'option Améliorer le modèle dans les paramètres. Pour les données sensibles, anonymisez les éléments confidentiels avant soumission.",
      },
    },
    {
      '@type': 'Question',
      name: "Claude AI est-il finançable dans le cadre d'une formation BTP ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La formation à son usage est finançable. OFC Création d'Entreprise propose une formation IA BTP finançable Constructys à 24 € HT/heure/stagiaire dans le cadre du Plan de Développement des Compétences 2026.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il pour être opérationnel sur Claude AI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une demi-journée suffit pour maîtriser Claude Chat. La configuration de Claude Cowork demande environ 1 heure. Dans les formations OFC avec la FFB, les participants produisent leur premier CR de chantier ou leur première analyse de DCE le jour même.',
      },
    },
    {
      '@type': 'Question',
      name: 'Où suivre une formation Claude AI BTP en Île-de-France (Paris, Yvelines, Essonne) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "OFC Création d'Entreprise anime des formations IA BTP en présentiel en Île-de-France (Paris, Yvelines, Essonne, Hauts-de-Seine, etc.) et en distanciel. Les sessions inter sont planifiées selon le calendrier Qualiopi ; les entreprises peuvent aussi organiser une formation intra sur leur site ou en salle partenaire.",
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous une formation Claude AI BTP à Paris, Saint-Quentin-en-Yvelines ou en Essonne (Les Ulis, Morangis, Longjumeau) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui : le même programme formation Claude AI BTP (Claude Chat, Cowork, Code, Chrome) s'adapte aux équipes du bâtiment et des travaux publics partout en Île-de-France. Paris et la communauté d'agglomération de Saint-Quentin-en-Yvelines sont des zones d'intervention fréquentes ; en Essonne, les entreprises des Ulis, Morangis, Longjumeau et environs peuvent rejoindre une session inter ou demander une date intra.",
      },
    },
  ],
};

const PROMPT_PROJET = `# Projet [NOM ENTREPRISE] — 2026
Je suis [Prénom NOM], [fonction] chez [entreprise].
Corps de métier : [préciser]. Zone : [départements].
Certifications : [liste].
Ce que j'attends : contextualiser à mon entreprise,
vocabulaire BTP professionnel, ne jamais inventer
normes ou prix, poser des questions si brief incomplet.
Commandes rapides :
"CR chantier" → CR depuis mes notes
"analyse DCE" → synthèse + Go/No-Go + plan mémoire
"email [destinataire]" → email professionnel BTP`;

const PROMPT_DCE = `Tu es un expert en marchés publics BTP.
Analyse ce DCE complet que je vais te soumettre.
Produis en 3 blocs :
1. SYNTHÈSE : objet, montant estimé, délai remise,
   pièces demandées, critères de notation + pondération
2. GO / NO-GO : note mon profil /10 sur chaque critère,
   recommandation avec justification en 3 points
3. PLAN MÉMOIRE TECHNIQUE : structure section par section,
   arguments différenciants, points de vigilance CCAP
Format : tableaux pour les critères, paragraphes pour l'analyse.`;

const PROMPT_CR = `Tu es conducteur de travaux pour une entreprise BTP.
Transforme mes notes brutes en CR professionnel :
- En-tête : date, chantier, participants, lieu
- Points abordés numérotés
- Tableau d'actions : Quoi | Qui | Délai | Statut
- Réserves et non-conformités identifiées
- Prochaine réunion + signature
Voici mes notes : [coller vos notes brutes ici]`;

const PROMPT_EMAIL = `Tu es assistant administratif pour une entreprise de [corps de métier].
Rédige un email professionnel pour [destinataire].
Situation : [2-3 phrases de contexte].
Objectif : [ce que vous voulez obtenir].
Ton : [professionnel / ferme / conciliant].
Format : objet + corps, 150 mots maximum.`;

const PROMPT_VEILLE = `Lis ABOUT ME/ pour connaître mon entreprise et ma zone.
Chaque matin à 7h30 :
Vérifie mes emails d'alertes marchés publics reçus depuis 24h.
Pour chaque AO correspondant à ma spécialité et ma zone :
- Objet, MOA, date limite, montant estimé, lien
- Pertinence /5 (1 = hors scope, 5 = idéal pour mon profil)
- Priorité haute si délai < 7 jours
Sauvegarde CLAUDE OUTPUTS/veille-AO-[date].md`;

function PromptBlock({ title, body }: { title?: string; body: string }) {
  return (
    <div className="relative mt-4 rounded-xl border border-slate-200 bg-[#F2F4F8] pl-4 pr-3 pb-3 pt-10">
      <div className="absolute right-3 top-3">
        <CopyPromptButton text={body} />
      </div>
      {title ? <h3 className="mb-2 font-display text-lg font-semibold text-slate-900">{title}</h3> : null}
      <pre className="whitespace-pre-wrap break-words border-l-4 border-[#377CF3] pl-3 font-mono text-sm leading-relaxed text-slate-800">
        {body}
      </pre>
    </div>
  );
}

export default function ClaudeAiBtpPillarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <div className="mx-auto max-w-4xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'Claude AI BTP', path: PATH },
          ])}
          showVisual
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Claude AI pour le BTP : guide complet et formation 2026
        </h1>
        <p className="mt-4 text-sm text-slate-600 md:text-base">
          Par Laure Olivié — Formatrice IA BTP, OFC Création d&apos;Entreprise
          <br />
          <span className="text-slate-500">
            Organisme certifié Qualiopi · Finançable Constructys · +1 592 professionnels formés · Note 4,85/5
          </span>
        </p>

        <ClaudeSkillsLeadMagnetSection />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 md:p-6" aria-labelledby="formation-claude-idf">
          <h2 id="formation-claude-idf" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Formation Claude AI BTP en Île-de-France
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
            Vous cherchez une <strong>formation Claude AI BTP</strong> alignée sur vos enjeux chantier (comptes rendus,
            devis, emails) ? OFC anime des sessions en présentiel et en distanciel. Accès directs :{' '}
            <Link href={LINKS.formationParis} className="font-medium text-[var(--accent)] underline hover:no-underline">
              formation Claude AI BTP à Paris
            </Link>
            ,{' '}
            <Link href={LINKS.formationYvelines} className="font-medium text-[var(--accent)] underline hover:no-underline">
              formation Claude AI BTP en Yvelines
            </Link>
            ,{' '}
            <Link
              href={LINKS.formationSaintQuentinYvelines}
              className="font-medium text-[var(--accent)] underline hover:no-underline"
            >
              formation Claude AI BTP à Saint-Quentin-en-Yvelines
            </Link>
            , et au niveau régional :{' '}
            <Link
              href={LINKS.formationIleDeFrance}
              className="font-medium text-[var(--accent)] underline hover:no-underline"
            >
              formation Claude AI BTP en Île-de-France
            </Link>{' '}
            (dont l&apos;Essonne : Les Ulis, Morangis, Longjumeau — même programme, même exigence Qualiopi).
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Automatisation BTP et <strong>IA chantier</strong> : le guide ci-dessous complète ces parcours terrain.
          </p>
        </section>

        <p className="mt-8 text-slate-700 leading-relaxed">
          Retrouvez aussi les{' '}
          <Link href={LINKS.formations} className="font-medium text-[var(--accent)] underline hover:no-underline">
            formations IA BTP
          </Link>
          , le{' '}
          <Link href={LINKS.financement} className="font-medium text-[var(--accent)] underline hover:no-underline">
            financement Constructys
          </Link>
          , les pages{' '}
          <Link href={LINKS.chatgptArtisans} className="font-medium text-[var(--accent)] underline hover:no-underline">
            ChatGPT pour artisans BTP
          </Link>
          ,{' '}
          <Link href={LINKS.iaCDT} className="font-medium text-[var(--accent)] underline hover:no-underline">
            IA conducteur de travaux
          </Link>
          ,{' '}
          <Link href={LINKS.iaDevis} className="font-medium text-[var(--accent)] underline hover:no-underline">
            IA devis bâtiment
          </Link>{' '}
          et un{' '}
          <Link href={LINKS.prendreRdv} className="font-medium text-[var(--accent)] underline hover:no-underline">
            diagnostic IA BTP gratuit
          </Link>{' '}
          (visio découverte).
        </p>

        {/* Section 1 */}
        <section className="mt-12" aria-labelledby="en-bref">
          <h2 id="en-bref" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            En bref — ce que vous trouverez sur cette page
          </h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Claude AI dans le BTP désigne l&apos;écosystème d&apos;outils d&apos;intelligence artificielle
              développés par Anthropic — Chat, Cowork, Code, App Desktop, Chrome — utilisés par les conducteurs de
              travaux, chargés d&apos;affaires, dirigeants de PME BTP et artisans pour automatiser les tâches
              administratives répétitives : analyse de DCE, rédaction de mémoires techniques, comptes rendus de
              chantier, veille appels d&apos;offres, devis et relances clients.
            </p>
            <p>
              Cette page centralise l&apos;ensemble des ressources OFC sur Claude AI pour le BTP. Elle est mise à jour
              à chaque évolution significative de l&apos;outil.
            </p>
          </div>
        </section>

        <ClaudeSkillTutorialBtpSection />

        {/* Section 2 */}
        <section className="mt-14" aria-labelledby="tableau-interfaces">
          <h2 id="tableau-interfaces" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les 5 interfaces Claude AI — tableau de décision rapide
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Tableau de décision des interfaces Claude pour le BTP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-3 py-3 font-semibold text-slate-900">Interface</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Accès</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Idéal pour</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Gain type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ['Claude Chat', 'claude.ai · mobile · desktop', 'Emails, analyse DCE, CR chantier, devis', '−85 %'],
                  [
                    'Claude Cowork',
                    'App Desktop → onglet Cowork',
                    'Missions autonomes sur fichiers, veille AO automatisée',
                    '−85 à −100 %',
                  ],
                  [
                    'Claude Code',
                    'Terminal · VS Code · JetBrains',
                    'Devis PDF, calculateurs métrés, relances en série',
                    '−85 à −90 %',
                  ],
                  ['App Desktop', 'Mac / Windows — claude.ai', 'Cowork + Dispatch (missions depuis le chantier)', '—'],
                  [
                    'Claude Chrome',
                    'Extension Chrome Web Store',
                    'Analyse AO BOAMP, rédaction Gmail, extraction DPGF',
                    '−80 %',
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" className="px-3 py-3 font-medium text-slate-900">
                      {row[0]}
                    </th>
                    <td className="px-3 py-3">{row[1]}</td>
                    <td className="px-3 py-3">{row[2]}</td>
                    <td className="px-3 py-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm italic text-slate-600">
            Règle simple : tâche ponctuelle → Claude Chat. Mission autonome sur vos fichiers → Claude Cowork.
            Automatisation récurrente ou document PDF → Claude Code. Analyse d&apos;une page web sans changer
            d&apos;onglet → Claude Chrome.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mt-14" aria-labelledby="ressources-interfaces">
          <h2 id="ressources-interfaces" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ressources par interface — guides complets
          </h2>

          <h3 className="mt-8 font-display text-xl font-bold text-slate-900">Claude Chat et Projets</h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Claude Chat est le point d&apos;entrée pour tous les professionnels BTP qui débutent avec l&apos;IA. La
            fonctionnalité Projets est la clé : elle permet de stocker votre contexte entreprise (corps de métier,
            zone, certifications, références chantiers) une seule fois, et de l&apos;injecter automatiquement dans
            chaque conversation.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Sans Projet configuré, vous réexpliquez votre contexte à chaque session — entre 5 et 8 minutes perdues par
            conversation. Avec un Projet bien configuré, vous posez directement votre question opérationnelle.
          </p>
          <PromptBlock body={PROMPT_PROJET} />
          <p className="mt-4 text-sm text-slate-600">
            <Link href="#cluster" className="font-medium text-[var(--accent)] underline hover:no-underline">
              Projects, Skills et contexte entreprise — voir la ressource dédiée dans la section ci-dessous
            </Link>
            .
          </p>

          <h3 className="mt-10 font-display text-xl font-bold text-slate-900">
            Claude Cowork — agent autonome sur vos fichiers
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Cowork est l&apos;interface la plus puissante pour les conducteurs de travaux et les chargés d&apos;affaires
            qui gèrent un volume important de tâches récurrentes. Il accède directement à vos dossiers sur
            l&apos;ordinateur, pose des questions avant d&apos;agir, et produit des livrables structurés dans un dossier
            de sortie dédié — sans intervention manuelle.
          </p>
          <p className="mt-3 font-medium text-slate-900">Les 3 cas d&apos;usage les plus utilisés lors des sessions OFC avec la FFB Grand Paris :</p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              Workflow DCE complet : analyse + synthèse critères + Go/No-Go + plan mémoire — 8 minutes contre 2 à 4 h
              manuellement
            </li>
            <li>
              CR de réunion de chantier : depuis vos notes brutes, CR avec en-tête, tableau d&apos;actions (Quoi/Qui/Délai),
              réserves — 3 minutes
            </li>
            <li>
              Veille AO automatisée : tâche planifiée à 7h30, tableau de synthèse dans votre dossier de sortie — zéro
              minute de veille manuelle
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Pour Cowork et workflows, reportez-vous à la section « Toutes nos ressources Claude AI pour le BTP » en bas de
            page.
          </p>

          <h3 className="mt-10 font-display text-xl font-bold text-slate-900">
            Claude Code — automatisation sans coder
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Claude Code génère des documents PDF signables, des calculateurs web, des scripts de traitement Excel — à
            partir d&apos;une instruction en français. Aucune connaissance en programmation requise.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Devis PDF numéroté automatiquement depuis un bon de mesurage — 2 minutes</li>
            <li>Calculateur de métrés accessible depuis un navigateur, personnalisé pour votre corps de métier</li>
            <li>Emails de relance impayés générés en série depuis un fichier Excel de suivi de facturation</li>
            <li>Analyse batch de tous les DCE reçus dans un dossier, tableau comparatif exporté en Excel</li>
          </ul>

          <h3 className="mt-10 font-display text-xl font-bold text-slate-900">
            Claude Chrome — l&apos;IA dans votre navigateur
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            L&apos;extension Chrome intègre Claude directement dans toutes les pages web ouvertes. Pour la veille marchés
            publics, c&apos;est l&apos;outil le plus rapide pour analyser un AO sans télécharger le dossier.
          </p>
          <p className="mt-3 text-slate-700">
            <strong>Installation :</strong> Chrome Web Store → chercher « Claude » (Anthropic) → Ajouter à Chrome → se
            connecter avec votre compte Claude.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Analyse d&apos;une fiche AO BOAMP — extraction des critères en 30 secondes</li>
            <li>Extraction des postes d&apos;un DPGF ouvert en PDF dans Chrome vers un tableau</li>
            <li>Rédaction d&apos;un email directement dans Gmail sans changer d&apos;onglet</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Pour le panorama des interfaces, voir le lien « Cowork et workflows » ci-dessus (même guide).
          </p>
        </section>

        {/* Section 4 */}
        <section className="mt-14" aria-labelledby="gains-temps">
          <h2 id="gains-temps" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Tableau de gains de temps — mesurés en formation OFC
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Gains de temps mesurés avec Claude AI en BTP</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-3 py-3 font-semibold text-slate-900">Tâche BTP</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Avec Claude AI</th>
                  <th className="px-3 py-3 font-semibold text-[#16A34A]">Gain moyen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ['CR de réunion de chantier', '1h30 à 2h', '3 à 5 min', '−85 %'],
                  ['Analyse CCTP (80 pages)', '2 à 4 heures', '15 à 20 min', '−85 %'],
                  ['Décision Go/No-Go documentée', '45 à 90 min', '5 min', '−90 %'],
                  ['Mémoire technique (premier jet)', '1 à 2 jours', '2 à 4 heures', '−75 %'],
                  ['Devis complet', '2 à 4 heures', '15 min', '−85 %'],
                  ['Email client / MOA / fournisseur', '15 à 30 min', '2 à 3 min', '−85 %'],
                  ['Veille AO quotidienne', '30 à 60 min', '0 min (auto)', '−100 %'],
                  ['Extraction normes / DTU', '45 à 60 min', '3 à 5 min', '−90 %'],
                ].map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" className="px-3 py-3 font-medium text-slate-900">
                      {r[0]}
                    </th>
                    <td className="px-3 py-3">{r[1]}</td>
                    <td className="px-3 py-3">{r[2]}</td>
                    <td className="px-3 py-3 font-semibold text-[#16A34A]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm italic text-slate-500">
            Données mesurées lors des sessions OFC avec la FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est,
            CSFE et CNAM Île-de-France. +1 592 professionnels formés, note 4,85/5.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-14" aria-labelledby="prompts">
          <h2 id="prompts" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            4 prompts prêts à l&apos;emploi — à copier directement dans Claude
          </h2>
          <PromptBlock title="Analyse de DCE et Go/No-Go" body={PROMPT_DCE} />
          <PromptBlock title="Compte rendu de réunion de chantier" body={PROMPT_CR} />
          <PromptBlock title="Email professionnel BTP contextualisé" body={PROMPT_EMAIL} />
          <PromptBlock title="Veille AO automatisée — Cowork tâche planifiée" body={PROMPT_VEILLE} />
        </section>

        {/* Section 6 */}
        <section className="mt-14" aria-labelledby="limites">
          <h2 id="limites" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que Claude AI fait bien dans le BTP — et ses limites
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Ce que Claude fait bien : analyser des volumes importants de documents en quelques minutes, produire des
            premiers jets rédactionnels de qualité professionnelle, générer des livrables structurés depuis des notes
            brutes, automatiser des tâches récurrentes sans intervention manuelle.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Ce que Claude ne remplace pas : l&apos;expertise technique métier (chiffrage, méthodes d&apos;exécution,
            contraintes terrain), le jugement commercial final sur un marché, la vérification des données techniques et
            des prix. Claude peut produire des informations inexactes — chaque livrable doit être relu avant envoi.
          </p>
          <p className="mt-4 italic text-slate-600">
            Règle transmise en formation OFC : « Claude produit 70 % du travail rédactionnel. Les 30 % restants —
            vérification, personnalisation, signature — restent la responsabilité du professionnel. »
          </p>
        </section>

        {/* Section 7 FAQ */}
        <section className="mt-14" aria-labelledby="faq-claude">
          <h2 id="faq-claude" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            FAQ — Questions fréquentes sur Claude AI dans le BTP
          </h2>
          <dl className="mt-6 space-y-8">
            {[
              {
                q: 'Claude AI est-il adapté aux petites entreprises du BTP ?',
                a: 'Oui. La version gratuite de Claude Chat suffit pour commencer — rédiger des emails, structurer des comptes rendus, analyser un document PDF uploadé. L\'abonnement Pro (20 $/mois) devient pertinent dès que vous analysez régulièrement des DCE ou CCTP, ou souhaitez configurer des tâches automatisées avec Cowork.',
              },
              {
                q: 'Quelle interface Claude choisir pour un conducteur de travaux ?',
                a: 'Un conducteur de travaux tire le meilleur parti de Claude Cowork pour les missions récurrentes — CR de chantier, analyse de DCE, veille AO automatisée. Claude Chat avec un Projet configuré complète Cowork pour les tâches ponctuelles. Les deux sont complémentaires.',
              },
              {
                q: "Peut-on utiliser Claude AI pour répondre à des appels d'offres publics ?",
                a: "Oui. Claude est utilisé dans les sessions OFC avec la FFB Grand Paris pour la totalité du workflow AO : veille, analyse du DCE, décision Go/No-Go, rédaction du mémoire technique, vérification de conformité administrative. Le professionnel valide et signe — Claude produit le travail rédactionnel structurant.",
              },
              {
                q: 'Les données de chantier confiées à Claude sont-elles confidentielles ?',
                a: 'L\'abonnement Claude Pro ne transmet pas les données des conversations pour l\'entraînement des modèles. Désactivez l\'option « Améliorer le modèle » dans les paramètres. Pour les données sensibles (prix de revient, marges, données personnelles de sous-traitants), anonymisez les éléments confidentiels avant soumission.',
              },
              {
                q: "Claude AI est-il finançable dans le cadre d'une formation BTP ?",
                a: "La formation à son usage l'est. OFC Création d'Entreprise propose une formation IA BTP finançable Constructys à 24 € HT/heure/stagiaire dans le cadre du Plan de Développement des Compétences 2026. Les entreprises de moins de 11 salariés bénéficient également de la prise en charge des salaires pendant la formation (15 € HT/h).",
              },
              {
                q: 'Combien de temps faut-il pour être opérationnel sur Claude AI ?',
                a: 'Une demi-journée suffit pour maîtriser Claude Chat et produire les premiers livrables utiles. La configuration de Claude Cowork demande environ 1 heure. Dans les formations OFC avec la FFB, les participants produisent leur premier CR de chantier ou leur première analyse de DCE assistée le jour même.',
              },
              {
                q: 'Où suivre une formation Claude AI BTP en Île-de-France (Paris, Yvelines, Essonne) ?',
                a: "OFC Création d'Entreprise anime des formations IA BTP en présentiel en Île-de-France (Paris, Yvelines, Essonne, Hauts-de-Seine, etc.) et en distanciel. Les sessions inter sont planifiées selon le calendrier Qualiopi ; les entreprises peuvent aussi organiser une formation intra sur leur site ou en salle partenaire.",
              },
              {
                q: 'Proposez-vous une formation Claude AI BTP à Paris, Saint-Quentin-en-Yvelines ou en Essonne (Les Ulis, Morangis, Longjumeau) ?',
                a: "Oui : le même programme formation Claude AI BTP (Claude Chat, Cowork, Code, Chrome) s'adapte aux équipes du bâtiment et des travaux publics partout en Île-de-France. Paris et la communauté d'agglomération de Saint-Quentin-en-Yvelines sont des zones d'intervention fréquentes ; en Essonne, les entreprises des Ulis, Morangis, Longjumeau et environs peuvent rejoindre une session inter ou demander une date intra.",
              },
            ].map((item) => (
              <div key={item.q}>
                <dt className="font-bold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-700 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Section 8 cluster */}
        <section className="mt-14" aria-labelledby="cluster">
          <h2 id="cluster" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Toutes nos ressources Claude AI pour le BTP
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                href: '/blog/claude-ai-btp-5-interfaces-chat-cowork-code',
                title: 'Claude AI pour le BTP : les 5 interfaces expliquées',
                desc: 'Panorama complet · tableau de décision · 4 prompts · comparatif outils',
              },
              {
                href: '/blog/guide-claude-ia-btp-code-projects-skills-mcp',
                title: 'Claude Cowork, Code, Projects & MCP — guide pas-à-pas',
                desc: 'Configuration avancée · workflows · connecteurs · FAQ terrain',
              },
              {
                href: '/blog/mcp-claude-model-context-protocol-btp',
                title: 'MCP : connecter Claude à Drive, Gmail et vos outils BTP',
                desc: 'Model Context Protocol · installation · scénarios métier',
              },
            ].map((c) => (
              <div
                key={c.href + c.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-display text-lg font-bold leading-snug">
                  <Link href={c.href} className="text-[var(--accent)] hover:underline">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-2 break-all font-mono text-xs text-slate-500">{c.href}</p>
                <p className="mt-3 flex-1 text-sm text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Vue multi-outils :{' '}
            <Link href="/outils-ia-btp" className="font-medium text-[var(--accent)] underline hover:no-underline">
              Outils IA BTP (ChatGPT, Claude, Gemini)
            </Link>
            .
          </p>
        </section>

        {/* Section 9 CTA */}
        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8" aria-labelledby="formation-ofc">
          <h2 id="formation-ofc" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Se former à Claude AI avec OFC Création d&apos;Entreprise
          </h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              OFC Création d&apos;Entreprise propose une formation IA BTP de 4 heures, 100 % finançable Constructys,
              conçue pour les professionnels du bâtiment et des travaux publics en Île-de-France.
            </p>
            <p>
              Le programme couvre l&apos;ensemble des interfaces Claude AI : prise en main de Claude Chat et
              configuration du Projet entreprise, mise en place de Claude Cowork avec les workflows métier (CR chantier,
              analyse DCE, veille AO), découverte de Claude Code pour l&apos;automatisation des devis et des relances, et
              utilisation de Claude Chrome pour la veille BOAMP.
            </p>
            <p>
              Disponible en présentiel en Île-de-France (75, 78, 91, 92, 93, 94, 95, 77) ou en distanciel.
            </p>
            <p>
              Financement : jusqu&apos;à 24 € HT/heure/stagiaire — Constructys PDC 2026. Prise en charge des salaires :
              15 € HT/h pour les entreprises de moins de 11 salariés.
            </p>
            <p className="text-sm text-slate-600">
              Références : FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est, CSFE, CNAM Île-de-France,
              Lefebvre Dalloz — +1 592 professionnels formés, note 4,85/5.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Réserver ma visio découverte gratuite
            </a>
            <Link
              href={LINKS.contact}
              className="text-center text-base font-semibold text-[var(--accent)] underline hover:no-underline sm:text-left"
            >
              Contact — formation Claude AI BTP (Île-de-France)
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
