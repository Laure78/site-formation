import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Cpu, Layers, MapPin, MinusCircle } from 'lucide-react';
import { ClaudeAiBtpHero } from '@/components/claude/ClaudeAiBtpHero';
import { ClaudeAiBtpTableOfContents } from '@/components/claude/ClaudeAiBtpTableOfContents';
import { ClaudePromptBlock } from '@/components/claude/ClaudePromptBlock';
import { ClaudeSkillTutorialBtpSection } from '@/components/claude/ClaudeSkillTutorialBtpSection';
import { ClaudeSkillsLeadMagnetSection } from '@/components/claude/ClaudeSkillsLeadMagnetSection';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { buildClaudeAiBtpJsonLdGraph } from '@/lib/claude-ai-btp-jsonld';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

const PATH = '/claude-ai-btp';
const CANONICAL = `${SITE_CONFIG.url}${PATH}`;
const ogClaudeBtpJpg = '/og-claude-ai-btp.jpg';
const heroVisuel = PHOTOS.claudeBtpGuideHero2026;

export const metadata = createPageMetadata({
  title: 'Formation Claude AI BTP 2026 : guide Chat, Cowork, Code & Chrome',
  description:
    `Claude AI BTP : guide Chat, Cowork, Code & Chrome — chantier, DCE, CR et administratif. Formation IA Qualiopi, Île-de-France, Constructys. +${formatProfessionalsTrainedCount()} formés, ${SOCIAL_PROOF.AVERAGE_RATING}. Laure Olivié.`,
  path: PATH,
  keywords: null,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-04-13',
    modifiedTime: '2026-04-18',
    author: SITE_CONFIG.name,
    section: 'Formation IA BTP',
  },
  image: {
    url: ogClaudeBtpJpg,
    width: 1200,
    height: 630,
    alt: heroVisuel.alt,
  },
  appendAuthorSuffix: false,
  robots: { index: true, follow: true },
});

const claudeAiBtpJsonLdGraph = buildClaudeAiBtpJsonLdGraph();

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

const idfLinks = [
  { href: LINKS.formationParis, label: 'Paris', sub: 'Formation Claude AI BTP — sessions & contexte local' },
  { href: LINKS.formationYvelines, label: 'Yvelines (78)', sub: 'Se former à Claude près de Versailles' },
  { href: LINKS.formationSaintQuentinYvelines, label: 'Saint-Quentin-en-Yvelines', sub: 'Apprendre Claude Cowork · SQY' },
  { href: LINKS.formationIleDeFrance, label: 'Île-de-France', sub: 'Vue régionale & parcours IA BTP' },
  { href: LINKS.formationMorangis, label: 'Morangis', sub: 'Session Claude en Essonne (91)' },
  { href: LINKS.formationLongjumeau, label: 'Longjumeau', sub: 'Essonne (91) · découvrir Claude Chat' },
] as const;

const quickLinks = [
  { href: LINKS.formations, label: 'Catalogue formations IA BTP' },
  { href: LINKS.financement, label: 'Financement Constructys' },
  { href: LINKS.chatgptArtisans, label: 'ChatGPT pour artisans BTP' },
  { href: LINKS.iaCDT, label: 'IA conducteur de travaux' },
  { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
  { href: LINKS.blog, label: 'Blog IA & guides BTP' },
] as const;

const tableWrap =
  'overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]';

const faqItems = [
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
    a: "L'abonnement Claude Pro ne transmet pas les données des conversations pour l'entraînement des modèles. Désactivez l'option « Améliorer le modèle » dans les paramètres. Pour les données sensibles (prix de revient, marges, données personnelles de sous-traitants), anonymisez les éléments confidentiels avant soumission.",
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
] as const;

function AnthropicAuthorityLinks() {
  return (
    <p className="mt-3 text-xs text-slate-500">
      <a
        href="https://docs.anthropic.com/"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Documentation Anthropic
      </a>
      <span className="mx-1.5 text-slate-300" aria-hidden>
        ·
      </span>
      <a
        href="https://www.anthropic.com/pricing"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Tarifs Claude
      </a>
      <span className="mx-1.5 text-slate-300" aria-hidden>
        ·
      </span>
      <a
        href="https://www.anthropic.com/news"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Actualités Anthropic
      </a>
    </p>
  );
}

const INTERFACE_VISUALS: { src: string; alt: string; caption: string }[] = [
  {
    src: '/images/blog/guide-claude-btp-2026/slide-02.png',
    alt: 'Claude Chat : interface conversationnelle pour analyser un DCE ou un CCTP BTP',
    caption: 'Claude Chat — conversation et projets',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-04.png',
    alt: 'Claude Cowork : tableau de bord et missions sur fichiers pour un conducteur de travaux BTP',
    caption: 'Claude Cowork — missions sur dossiers locaux',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-06.png',
    alt: 'Claude Code dans l’environnement de développement pour automatiser devis et exports BTP',
    caption: 'Claude Code — automatisation et scripts',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-08.png',
    alt: 'Application Claude sur bureau pour accéder à Cowork depuis le poste chantier ou bureau',
    caption: 'Application desktop Anthropic',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-10.png',
    alt: 'Extension Claude pour Chrome : analyse de fiches marchés publics et rédaction d’emails BTP',
    caption: 'Claude pour Chrome — page web ouverte',
  },
];

const relatedQuestions = [
  {
    q: 'Claude AI vs ChatGPT : lequel choisir pour le BTP ?',
    a: 'Les deux couvrent rédaction et analyse de documents. Claude est souvent préféré pour de longs PDF (CCTP, DCE) et des sorties structurées ; ChatGPT pour l’écosystème d’intégrations et certaines habitudes d’équipe. En formation OFC, on compare les deux sur des cas réels (CR, mémoire technique) pour que vous tranchiez selon votre stack et votre budget.',
  },
  {
    q: 'Combien coûte une formation Claude AI BTP finançable ?',
    a: 'Le coût dépend du nombre de stagiaires, du format (inter / intra) et du financement OPCO. Le plafond Constructys 2026 sert de repère public : 24 € HT/h/stagiaire dans le cadre du plan de développement des compétences, avec possibilité de prise en charge des salaires pour les TPE. Un devis personnalisé précise le reste à charge.',
  },
  {
    q: 'Claude AI peut-il remplacer mon logiciel de chiffrage ?',
    a: 'Non pour le calcul des prix de revient et la conformité métier : le chiffrage reste dans votre outil ou votre tableur validé. Claude accélère la préparation (relecture de bordereaux, mise en forme, comparaison de postes) et la rédaction autour du chiffrage, pas le calcul contractuel signé.',
  },
  {
    q: 'Quelle différence entre Claude Cowork et Claude Code ?',
    a: 'Cowork orchestre des missions sur vos fichiers locaux avec des livrables dans un dossier de sortie — idéal pour récurrent et volumes. Claude Code s’adresse plutôt au traitement automatisé (scripts, exports, batch) à partir de consignes en langage naturel, sans que vous codiez pour autant la logique à la main.',
  },
  {
    q: 'Comment anonymiser un DCE avant de le donner à Claude ?',
    a: 'Retirez ou masquez noms propres de sous-traitants, prix internes, marges, données personnelles et références clients non publiques. Pour les marchés publics, conservez la structure technique utile à l’analyse (lots, critères, planning) et remplacez les éléments sensibles par des libellés génériques.',
  },
] as const;

export default function ClaudeAiBtpPillarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claudeAiBtpJsonLdGraph) }}
      />

      <div className="min-h-screen bg-slate-50">
        <ClaudeAiBtpHero />

        <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:pb-32 md:pt-12">
          <div className="lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
            <div className="mb-8 lg:mb-0">
              <ClaudeAiBtpTableOfContents />
            </div>

            <article className="min-w-0 space-y-20 md:space-y-28">
          <aside
            id="en-chiffres"
            aria-labelledby="en-chiffres-title"
            className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-[#F2F4F8] p-6 shadow-sm"
          >
            <h2 id="en-chiffres-title" className="font-display text-lg font-bold text-slate-900 md:text-xl">
              Claude AI dans le BTP — en chiffres (OFC 2026)
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Gain CR chantier</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-[var(--accent)]">−85 %</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Gain analyse DCE</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-[var(--accent)]">−85 %</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Gain veille AO</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-[var(--accent)]">−100 %</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Pros formés</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-slate-900">
                  {formatProfessionalsTrainedCount()}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-600">
              Source : mesures OFC sur 8 tâches, sessions FFB Grand Paris, FFB Île-de-France, CSFE — note moyenne{' '}
              {SOCIAL_PROOF.AVERAGE_RATING}.
            </p>
          </aside>

          <ClaudeSkillsLeadMagnetSection />

          <section aria-labelledby="formation-claude-idf">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 id="formation-claude-idf" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Formation en Île-de-France
              </h2>
              <p className="max-w-md text-sm text-slate-500">
                Sessions inter ou intra — même programme Qualiopi, aligné terrain (CR, devis, emails).
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {idfLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-200 hover:shadow-[0_12px_36px_rgba(15,23,42,0.07)]"
                >
                  <span>
                    <span className="flex items-center gap-2 font-display font-semibold text-slate-900">
                      <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">{item.sub}</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[var(--accent)]"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              <strong className="font-semibold text-slate-800">IA chantier &amp; automatisation BTP</strong> — ce guide
              prolonge ces parcours.
            </p>
          </section>

          <section aria-labelledby="nav-rapide">
            <h2 id="nav-rapide" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Ressources liées
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-[var(--accent)]/30 hover:bg-[var(--accent-soft)]/40"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="en-bref">
            <h2 id="en-bref" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              En bref
            </h2>
            <p className="tldr mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Ce guide regroupe les <strong className="font-semibold text-slate-800">cinq interfaces Claude</strong> utiles au
              BTP, des <strong className="font-semibold text-slate-800">prompts copiables</strong> et une méthode de skill
              réutilisable — pour gagner du temps sur les DCE, les comptes rendus et l&apos;administratif, sans remplacer le
              jugement métier.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Cpu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">Écosystème Anthropic</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Chat, Cowork, Code, desktop, Chrome — pour DCE, mémoires techniques, CR, veille AO, devis et relances.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[var(--accent)]">
                  <Layers className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">Ressource vivante</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Page mise à jour lors des évolutions d’outil — méthode OFC terrain, testée avec des pros du BTP.
                </p>
              </div>
            </div>
          </section>

          <ClaudeSkillTutorialBtpSection />

          <section className="scroll-mt-24" aria-labelledby="tableau-interfaces">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 id="tableau-interfaces" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Les 5 interfaces — décision rapide
              </h2>
              <p className="max-w-md text-sm text-slate-500">Choisissez l’outil selon la nature de la tâche.</p>
            </div>
            <div className={`mt-8 ${tableWrap}`}>
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">Tableau de décision des interfaces Claude pour le BTP</caption>
                <thead>
                  <tr className="border-b border-slate-200/90 bg-slate-100/80">
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Interface</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Accès</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Idéal pour</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Gain</th>
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
                    <tr key={row[0]} className="bg-white transition hover:bg-slate-50/80">
                      <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900">
                        {row[0]}
                      </th>
                      <td className="px-4 py-3.5 text-slate-600">{row[1]}</td>
                      <td className="px-4 py-3.5">{row[2]}</td>
                      <td className="px-4 py-3.5 font-medium text-[var(--accent)]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">
              <strong className="font-semibold text-slate-800">Règle simple :</strong> ponctuel → Chat · fichiers locaux →
              Cowork · automatisation PDF → Code · page web ouverte → Chrome.
            </p>
          </section>

          <section className="scroll-mt-24" aria-labelledby="interfaces-visuels">
            <h2
              id="interfaces-visuels"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Repères visuels — les 5 interfaces
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-slate-600">
              Extraits pédagogiques du guide Claude BTP — pour situer chaque interface avant de plonger dans les ressources
              détaillées.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INTERFACE_VISUALS.map((vis) => (
                <figure
                  key={vis.src}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
                >
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={vis.src}
                      alt={vis.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-slate-600">{vis.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="ressources-interfaces">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 id="ressources-interfaces" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Ressources par interface
              </h2>
              <p className="max-w-md text-sm text-slate-500">Guides complets — à dérouler selon votre usage.</p>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">Claude Chat et Projets</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                Point d&apos;entrée pour débuter : les <strong className="font-semibold text-slate-800">Projets</strong>{' '}
                stockent votre contexte entreprise (métier, zone, certifications) — injecté dans chaque conversation.
              </p>
              <p className="mt-3 max-w-3xl text-sm text-slate-600">
                Sans Projet : 5 à 8 minutes perdues à chaque session. Avec un Projet configuré : question opérationnelle
                directe.
              </p>
              <ClaudePromptBlock body={PROMPT_PROJET} />
              <p className="mt-4 text-sm text-slate-600">
                <Link href="#cluster" className="font-medium text-[var(--accent)] underline-offset-2 hover:underline">
                  Projects, Skills et contexte entreprise — ressource dédiée ci-dessous
                </Link>
              </p>
              <AnthropicAuthorityLinks />
            </div>

            <div className="mt-8">
              <h3 className="font-display text-xl font-bold text-slate-900">Claude Cowork — agent sur vos fichiers</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                Accès aux dossiers locaux, questions avant action, livrables dans un dossier de sortie — idéal pour
                volumes importants de tâches récurrentes.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    t: 'Workflow DCE',
                    d: 'Analyse + synthèse critères + Go/No-Go + plan mémoire — ~8 min vs 2–4 h à la main.',
                  },
                  {
                    t: 'CR de chantier',
                    d: 'Depuis notes brutes : en-tête, tableau Quoi/Qui/Délai, réserves — ~3 min.',
                  },
                  {
                    t: 'Veille AO',
                    d: 'Tâche planifiée (ex. 7h30), tableau dans le dossier de sortie — veille manuelle quasi nulle.',
                  },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 transition hover:border-slate-200 hover:bg-white"
                  >
                    <p className="font-display text-sm font-bold text-slate-900">{c.t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-500">
                Workflows détaillés : section « Toutes nos ressources » ci-dessous.
              </p>
              <AnthropicAuthorityLinks />
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">Claude Code — sans coder</h3>
              <p className="mt-3 max-w-3xl text-sm text-slate-600">
                PDF, calculateurs web, traitement Excel — à partir d&apos;une consigne en français.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <li className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-[var(--accent)]">→</span> Devis PDF depuis bon de mesurage
                </li>
                <li className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-[var(--accent)]">→</span> Calculateur métrés dans le navigateur
                </li>
                <li className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-[var(--accent)]">→</span> Relances impayés depuis Excel
                </li>
                <li className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-[var(--accent)]">→</span> Batch DCE → tableau comparatif Excel
                </li>
              </ul>
              <AnthropicAuthorityLinks />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">Claude Chrome</h3>
              <p className="mt-3 max-w-3xl text-sm text-slate-600">
                L&apos;extension analyse les pages ouvertes — veille marchés publics sans télécharger le dossier complet.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                <strong className="font-semibold">Installation :</strong> Chrome Web Store → « Claude » (Anthropic) →
                Ajouter → connexion au compte.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Fiche AO BOAMP — critères en ~30 s</li>
                <li>• DPGF PDF → tableau</li>
                <li>• Email dans Gmail sans changer d&apos;onglet</li>
              </ul>
              <AnthropicAuthorityLinks />
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="gains-temps">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 id="gains-temps" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Gains de temps mesurés
              </h2>
              <p className="max-w-md text-sm text-slate-500">Repères observés en formation OFC.</p>
            </div>
            <div className={`mt-8 ${tableWrap}`}>
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <caption className="sr-only">Gains de temps mesurés avec Claude AI en BTP</caption>
                <thead>
                  <tr className="border-b border-slate-200/90 bg-slate-100/80">
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Tâche</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Sans IA</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Avec Claude</th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600">Gain</th>
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
                    <tr key={r[0]} className="bg-white transition hover:bg-slate-50/80">
                      <th scope="row" className="px-4 py-3.5 font-semibold text-slate-900">
                        {r[0]}
                      </th>
                      <td className="px-4 py-3.5 text-slate-600">{r[1]}</td>
                      <td className="px-4 py-3.5">{r[2]}</td>
                      <td className="px-4 py-3.5 font-semibold text-[var(--accent)]">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              {`FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est, CSFE, CNAM Île-de-France · +${formatProfessionalsTrainedCount()} formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
            </p>
          </section>

          <section className="scroll-mt-24" aria-labelledby="prompts">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 id="prompts" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                4 prompts prêts à l&apos;emploi
              </h2>
              <p className="max-w-md text-sm text-slate-500">Copiez-collez dans Claude — adaptez le contexte.</p>
            </div>
            <div className="mt-8 space-y-6">
              <ClaudePromptBlock title="Analyse de DCE et Go/No-Go" body={PROMPT_DCE} />
              <ClaudePromptBlock title="Compte rendu de réunion de chantier" body={PROMPT_CR} />
              <ClaudePromptBlock title="Email professionnel BTP contextualisé" body={PROMPT_EMAIL} />
              <ClaudePromptBlock title="Veille AO automatisée — Cowork tâche planifiée" body={PROMPT_VEILLE} />
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="limites">
            <h2 id="limites" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Atouts et limites
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                  Ce que Claude accélère
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Analyse de volumes documentaires, premiers jets rédactionnels, livrables structurés depuis des notes,
                  automatisation de tâches récurrentes.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/90 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <MinusCircle className="h-5 w-5 text-slate-400" aria-hidden />
                  Ce qui reste métier
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Expertise technique, chiffrage, jugement commercial, vérification des données — chaque livrable se
                  relit avant envoi.
                </p>
              </div>
            </div>
            <p className="mt-6 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm italic text-slate-600">
              « Claude produit environ 70 % du travail rédactionnel — vérification, personnalisation et signature restent
              professionnels. »
            </p>
          </section>

          <section className="scroll-mt-24" aria-labelledby="etudes-cas">
            <h2 id="etudes-cas" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Retours terrain (extraits)
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <h3 className="font-display text-lg font-bold text-slate-900">FFB Grand Paris — mémoires techniques</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Session de 8 conducteurs de travaux (mars 2026). Après trois semaines de mise en pratique, le temps
                  moyen de premier jet d&apos;un mémoire technique est passé d&apos;environ 2 jours à 3 h 30 sur des dossiers
                  comparables, avec une qualité perçue équivalente ou supérieure par la MOA sur quatre dossiers remis.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <h3 className="font-display text-lg font-bold text-slate-900">PME second œuvre — veille AO</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Équipe de 4 personnes : tâche Cowork planifiée chaque matin sur les alertes marchés publics — la veille
                  manuelle est passée d&apos;environ 45 min à quelques minutes de contrôle, avec tableau de priorisation
                  partagé.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 md:col-span-2">
                <h3 className="font-display text-lg font-bold text-slate-900">CSFE — comptes rendus de chantier</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Standardisation du skill « CR chantier » : les notes dictées sont transformées en livrable homogène
                  (tableau d&apos;actions, réserves, prochaine réunion) — temps de mise en forme divisé par plus de dix sur la
                  série suivie en formation.
                </p>
              </article>
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="faq-claude">
            <h2 id="faq-claude" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Questions fréquentes
            </h2>
            <div className="mt-8 divide-y divide-slate-200/90 rounded-2xl border border-slate-200/90 bg-white px-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-6">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-display text-sm font-semibold text-slate-900 transition hover:text-[var(--accent)] [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {item.q}
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-400 transition group-open:rotate-45 group-open:border-[var(--accent)] group-open:text-[var(--accent)]">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 pb-1 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="faq-connexes">
            <h2 id="faq-connexes" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Questions connexes
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              Réponses courtes pour la longue traîne — complément de la FAQ principale.
            </p>
            <div className="mt-8 divide-y divide-slate-200/90 rounded-2xl border border-slate-200/90 bg-white px-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-6">
              {relatedQuestions.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-display text-sm font-semibold text-slate-900 transition hover:text-[var(--accent)] [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {item.q}
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-400 transition group-open:rotate-45 group-open:border-[var(--accent)] group-open:text-[var(--accent)]">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 pb-1 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24" aria-labelledby="cluster">
            <h2 id="cluster" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Ressources approfondies
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  href: '/blog/claude-ai-btp-5-interfaces-chat-cowork-code',
                  title: 'Les 5 interfaces expliquées',
                  desc: 'Panorama · tableau de décision · prompts · comparatif',
                },
                {
                  href: '/blog/guide-claude-ia-btp-code-projects-skills-mcp',
                  title: 'Cowork, Code, Projects & MCP',
                  desc: 'Workflows · connecteurs · FAQ terrain',
                },
                {
                  href: '/blog/mcp-claude-model-context-protocol-btp',
                  title: 'MCP : Drive, Gmail, outils BTP',
                  desc: 'Installation · scénarios métier',
                },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.05)] transition hover:border-slate-200 hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]"
                >
                  <span className="font-display text-base font-bold text-slate-900 group-hover:text-[var(--accent)]">
                    {c.title}
                  </span>
                  <span className="mt-6 flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                    Lire l&apos;article
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="mt-auto pt-3 text-sm text-slate-600">{c.desc}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              <Link href={LINKS.outilsIaBtp} className="font-medium text-[var(--accent)] underline-offset-2 hover:underline">
                Outils IA BTP (ChatGPT, Claude, Gemini)
              </Link>
            </p>
          </section>

          <section
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-950 px-6 py-10 text-white shadow-2xl md:px-10 md:py-12"
            aria-labelledby="formation-ofc"
          >
            <div className="pointer-events-none absolute inset-0 claude-btp-hero-grid opacity-30" aria-hidden />
            <div className="relative">
              <h2 id="formation-ofc" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Formation Claude AI avec OFC
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                4 h — Qualiopi — finançable Constructys. Chat, Projets, Cowork, Code, Chrome : présentiel en
                Île-de-France ou distanciel.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                <li>• Jusqu&apos;à 24 € HT/h/stagiaire (plafonds Constructys)</li>
                <li>• Entreprises &lt; 11 sal. : prise en charge salaires (15 € HT/h)</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                {`FFB Grand Paris, FFB IDF, CSFE, CNAM, Lefebvre Dalloz · +${formatProfessionalsTrainedCount()} formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={LINKS.prendreRdv}
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-600"
                >
                  Prendre rendez-vous
                </Link>
                <Link
                  href={LINKS.contact}
                  className="text-center text-base font-semibold text-white/90 underline-offset-4 hover:underline sm:text-left"
                >
                  Contact formation IA BTP
                </Link>
              </div>
            </div>
          </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
