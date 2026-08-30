/**
 * Articles blog — guide Claude avancé BTP (visuels pédagogiques OFC).
 * Illustrations : /public/images/blog/guide-claude-btp-2026/slide-*.png
 * Carrousels LinkedIn / PDF : carrousel-7-cas-usage-ia-btp, carrousel-5-assistants-ia-btp
 * Carrousel A présentation : blog-carrousel-a-article.ts
 */
import type { BlogArticle } from './blog';
import { carrouselAFormationArticle } from '@/lib/blog-carrousel-a-article';
import { LINKS } from '@/lib/internal-links';

const IMG = '/images/blog/guide-claude-btp-2026';
const CAR7 = '/images/blog/carrousel-7-cas-usage-ia-btp';
const CAR5 = '/images/blog/carrousel-5-assistants-ia-btp';

export const blogArticlesClaudeBtp2026: BlogArticle[] = [
  carrouselAFormationArticle,
  {
    slug: '7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
    seoTitle: 'IA BTP : 7 cas concrets (devis à AO)',
    title:
      '7 cas d’usage concrets de l’IA dans le BTP (devis, chantier, appels d’offres, sécurité…)',
    description:
      'Sept usages IA sur le terrain BTP : chiffrage, chantier, AO, sécurité, planning, client, veille. Qualiopi, Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-07',
    keywords: [
      'cas d’usage IA BTP',
      'formation IA bâtiment',
      'IA devis BTP',
      'compte rendu chantier IA',
      'IA appels d’offres bâtiment',
      'PPSPS IA',
      'planning chantier IA',
      'veille réglementaire BTP',
      'DTU intelligence artificielle',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce carrousel pédagogique (support type « Carrousel B — Les 4 modules » / pack visuel OFC) résume sept situations où l’IA générative apporte un gain de temps mesurable : du chiffrage à la veille DTU, en passant par la sécurité et la coordination. Les chiffres illustrés (temps, pourcentages) sont des ordres de grandeur pédagogiques : à chaque usage, la validation humaine et le respect des obligations légales restent indispensables.',
      },
      {
        type: 'html',
        title: 'Pourquoi sept cas, et pour qui ?',
        content: `<p class="text-slate-600 leading-relaxed">Les dirigeants de TPE et PME du bâtiment, les conducteurs de travaux et les équipes administratives y trouvent des repères « prêts à l’emploi » pour prioriser leurs expérimentations : commencer par un ou deux cas (souvent devis et comptes rendus) avant d’étendre à l’appel d’offres ou à la documentation sécurité. C’est aligné avec la <a href="${LINKS.formationIaBtpNiveau1BatimentTp}" class="text-[var(--accent)] font-medium underline">formation IA bâtiment &amp; travaux publics</a> et les financements OPCO dans les conditions habituelles — le panorama outils est aussi dans mon article sur les <a href="${LINKS.blog5AssistantsIaBtp}" class="text-[var(--accent)] font-medium underline">5 assistants IA pour le BTP</a>.</p>`,
      },
      {
        type: 'html',
        title: 'Vue d’ensemble : les 7 cas d’usage',
        content: `<figure class="my-6">
<img src="${CAR7}/01-intro-7-cas.png" alt="7 cas d’usage de l’IA dans le BTP : chiffrage, comptes rendus, appels d’offres, sécurité, planning, communication, veille — Laure Olivié" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les sept usages — concrets, opérationnels, applicables dès la rentrée de chantier.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 1 — Chiffrage et devis',
        content: `<figure class="my-6">
<img src="${CAR7}/02-cas-chiffrage-devis.png" alt="IA BTP : chiffrage et devis en 5 minutes, précision métrés et prix matériaux — cas d’usage 1 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Partir de notes de visite, fiabiliser métrés et prix — toujours valider les totaux avant signature.</figcaption>
</figure>
<p class="text-slate-600 leading-relaxed">L’IA aide à structurer le métré et à proposer des formulations de lignes ; le niveau de prix et la marge restent votre responsabilité.</p>`,
      },
      {
        type: 'html',
        title: 'Cas 2 — Comptes rendus de chantier',
        content: `<figure class="my-6">
<img src="${CAR7}/03-cas-comptes-rendus-chantier.png" alt="Comptes rendus de chantier avec IA : dictée, réserves, mise en forme — cas 2 sur 7 BTP" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Réduction du temps de rédaction : gardez la main sur le fond et les réserves.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 3 — Réponse aux appels d’offres',
        content: `<figure class="my-6">
<img src="${CAR7}/04-cas-appels-offres.png" alt="IA appels d’offres BTP : mémoire technique, critères CCTP, plus de dossiers déposés — cas 3 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Structurer la réponse et s’appuyer sur votre référentiel — pas d’invention de références.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 4 — Documents de sécurité (PPSPS, prévention)',
        content: `<figure class="my-6">
<img src="${CAR7}/05-cas-documents-securite-ppsps.png" alt="Documents de sécurité chantier BTP : PPSPS, fiches risques avec aide IA — cas 4 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">L’IA accélère la mise en forme : le respect des textes réglementaires et la signature restent internes.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 5 — Planning et coordination',
        content: `<figure class="my-6">
<img src="${CAR7}/06-cas-planning-coordination.png" alt="Planning hebdomadaire BTP avec IA : météo, sous-traitants, sous-traitance — cas 5 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Comparer à un tableur manuel : l’intérêt est de modéliser vite des contraintes.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 6 — Communication client',
        content: `<figure class="my-6">
<img src="${CAR7}/07-cas-communication-client.png" alt="Emails clients BTP professionnels avec IA : relances, avenants, ton adapté — cas 6 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Emails et relances : gain de temps sur la formulation, pas sur la décision.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Cas 7 — Veille réglementaire et DTU',
        content: `<figure class="my-6">
<img src="${CAR7}/08-cas-veille-reglementaire-dtu.png" alt="Veille réglementaire BTP : DTU et normes résumées pour l’entreprise — cas 7 sur 7" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Synthèses et alertes : vérifiez toujours sur les textes officiels en vigueur.</figcaption>
</figure>`,
      },
      {
        type: 'cta',
        content:
          'Vous voulez passer du visuel à la pratique en salle avec vos équipes ? La formation « L’IA au service du bâtiment » (4 h) pose les bases et les bons réflexes — Qualiopi, financement possible selon éligibilité OPCO.',
        formationHref: '/formations/ia-batiment-travaux-publics',
      },
    ],
    relatedSlugs: [
      '5-assistants-ia-btp-chatgpt-productivite',
      'guide-claude-ia-btp-code-projects-skills-mcp',
      '5-cas-usage-chatgpt-artisans-btp',
    ],
  },
  {
    slug: '5-assistants-ia-btp-chatgpt-productivite',
    seoTitle: '5 assistants IA BTP : carte sans coder',
    title:
      'Les 5 assistants IA pour le BTP (chiffrage, admin, sécurité, planning, appels d’offres)',
    description:
      'Cinq assistants métiers (chiffrage, admin, sécurité, planning, AO) pour cadrer vos essais sans coder. Réseaux FFB, CSFE ; Qualiopi. Voir la méthode.',
    date: '2026-04-07',
    keywords: [
      'assistants IA BTP',
      'ChatGPT BTP',
      'IA chiffrage bâtiment',
      'IA sécurité chantier PPSPS',
      'planning IA BTP',
      'IA appels d’offres',
      'productivité BTP',
      'formation IA entreprise bâtiment',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce format (support « Carrousel C — 5 compétences » / OFC) présente cinq assistants que vous pouvez configurer progressivement avec un seul outil conversationnel (ex. ChatGPT ou équivalent) : chiffrage, administratif, sécurité, planning, appels d’offres. L’objectif est de donner une « carte » lisible pour vos ateliers internes, sans remplacer votre logiciel métier ni vos obligations légales.',
      },
      {
        type: 'html',
        title: 'Lien avec les « 4 modules » de formation',
        content: `<p class="text-slate-600 leading-relaxed">Le document « Carrousel B — Les 4 modules » sert souvent de fil conducteur pédagogique (découpage en blocs : sensibilisation, prompts, assistants, mise en œuvre). Les cinq assistants ci-dessous en sont le prolongement opérationnel : ils matérialisent ce que vos équipes peuvent activer en premier sur le terrain. Pour les ancrer en session Qualiopi, le <a href="${LINKS.formations}" class="text-[var(--accent)] font-medium underline">catalogue des formations IA pour le BTP</a> détaille les parcours ; les cas concrets liés sont aussi dans mon article sur les <a href="${LINKS.blog7CasUsageIaBtp}" class="text-[var(--accent)] font-medium underline">7 cas d’usage IA dans le BTP</a>. Pour le détail technique avancé (Claude Code, Projects, MCP), voir aussi le guide dédié dans nos articles.</p>`,
      },
      {
        type: 'html',
        title: 'Les cinq assistants — vue d’ensemble',
        content: `<figure class="my-6">
<img src="${CAR5}/01-intro-5-assistants.png" alt="5 assistants IA pour le BTP : chiffrage, admin, sécurité, planning, appels d’offres — sans coder" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Une vision claire pour prioriser vos expérimentations.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Assistant 1 — Chiffrage',
        content: `<figure class="my-6">
<img src="${CAR5}/02-assistant-chiffrage.png" alt="Assistant chiffrage IA BTP : devis précis, métré depuis notes de visite, prix matériaux" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Accélérer le premier jet — pas de chiffre sans contrôle interne.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Assistant 2 — Administratif',
        content: `<figure class="my-6">
<img src="${CAR5}/03-assistant-admin.png" alt="Assistant administratif IA : comptes rendus chantier, emails clients en 30 secondes" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Structurer CR et mails récurrents.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Assistant 3 — Sécurité',
        content: `<figure class="my-6">
<img src="${CAR5}/04-assistant-securite.png" alt="Assistant sécurité chantier BTP : analyses de risques, fiches sécurité, PPSPS" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Formaliser plus vite — la conformité reste validée par votre organisation.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Assistant 4 — Planning',
        content: `<figure class="my-6">
<img src="${CAR5}/05-assistant-planning.png" alt="Assistant planning BTP : planning hebdo en 2 minutes, sous-traitants et congés" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Comparer à Excel : objectif rapidité de scénario.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Assistant 5 — Appels d’offres',
        content: `<figure class="my-6">
<img src="${CAR5}/06-assistant-appels-offres.png" alt="Assistant appels d’offres IA : mémoire technique, critères cahier des charges, plus de dossiers" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Capitaliser sur vos preuves et références réelles.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'En chiffres : une synthèse',
        content: `<figure class="my-6">
<img src="${CAR5}/07-en-chiffres-chatgpt.png" alt="Bénéfices IA BTP en chiffres : heures gagnées, précision devis, dossiers appels d’offres — ChatGPT" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les ordres de grandeur sont illustratifs : mesurez chez vous avec un pilote.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Financement OPCO et passage à l’action',
        content:
          'OFC Création d’Entreprise est un organisme certifié Qualiopi (actions de formation). Selon votre branche et votre plan de développement des compétences, un financement OPCO Constructys est possible — session 4 h en présentiel, déploiement des cas d’usage dès la semaine suivante selon votre organisation. Consultez la page financement Constructys ou le catalogue formations pour en savoir plus.',
      },
      {
        type: 'paragraph',
        title: 'Ressources PDF et prolongements',
        content:
          'Les PDF « Carrousel B — Les 4 modules » et « Carrousel C — 5 compétences » complètent ces visuels pour vos ateliers internes. Pour les prompts LinkedIn et le carrousel social, voir aussi l’article dédié aux prompts LinkedIn BTP ; pour la formation catalogue « L’IA au service du BTP » et les financements, consultez la page formations et le guide Constructys.',
      },
      {
        type: 'cta',
        content:
          'Vous souhaitez une session en présentiel (intra-entreprise, dans vos locaux) pour déployer ces assistants avec vos équipes ?',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      '7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
      'prompts-linkedin-btp-carrousel-idees',
      'adoption-ia-btp-2026-chiffres-freins-leviers',
    ],
  },
  {
    slug: 'guide-claude-ia-btp-code-projects-skills-mcp',
    seoTitle: 'Claude BTP : Code, Projects, MCP',
    title:
      'Claude IA pour le BTP : Code, Projects, Skills et MCP — guide pratique pour dirigeants et équipes',
    description:
      'Claude Code, Projects, Skills, MCP : exécuter tâches fichiers et outils BTP. Qualiopi ; Constructys selon branche. Diagnostic gratuit 30 min.',
    date: '2026-04-07',
    dateModified: '2026-04-12',
    keywords: [
      'Claude IA BTP',
      'formation IA bâtiment',
      'Claude Code',
      'MCP Model Context Protocol',
      'Claude Projects',
      'Skills Claude',
      'automatisation administrative BTP',
      'Qualiopi',
      'OPCO Constructys',
      'intelligence artificielle construction',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce guide synthétise une approche avancée mais accessible : Claude Code pour agir sur vos fichiers et votre site, les Projects pour garder le contexte de votre entreprise, les Skills pour figer vos règles et commandes métier, et le MCP pour connecter Claude à Drive, Gmail, Notion ou votre calendrier. Il s’appuie sur le support de formation « Guide avancé Claude » (OFC Création d’Entreprise) et sur les modules PITEL (prompts, assistants) utilisés en session.',
      },
      {
        type: 'html',
        title: 'Sur ce site',
        content:
          `<p class="text-slate-600">Tous les articles et ressources <strong>Claude</strong> (Anthropic) pour le BTP sont listés sur la <a href="${LINKS.claudeAiBtp}" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>. Avant de brancher Skills et MCP, je compare les outils dans <a href="${LINKS.blogComparatifChatgptClaudeGeminiBtp}" class="text-[var(--accent)] font-medium underline">ChatGPT vs Claude vs Gemini pour le BTP</a>.</p>`,
      },
      {
        type: 'paragraph',
        title: 'À qui s’adresse ce guide ?',
        content:
          'Dirigeants, conducteurs de travaux, chargés d’affaires, assistants administratifs et formatrices IA dans le BTP : vous savez déjà utiliser une IA en conversation, et vous voulez passer à l’étape « exécution » (fichiers, site, automatisation) sans devenir développeur. Les comptes gratuits suffisent pour découvrir ; les usages avancés (Claude Code, MCP, certaines intégrations) reposent souvent sur des offres payantes ou des clés API — je le rappelle dans chaque section.',
      },
      {
        type: 'html',
        title: 'Au programme : quatre blocs pour un assistant IA complet',
        content: `<figure class="my-6">
<img src="${IMG}/slide-02.png" alt="Programme formation Claude : modules Claude Code, Projects Cowork, Skills métier, MCP connecteurs — OFC Laure Olivié Qualiopi" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les quatre modules du guide : Claude Code, Projects (Cowork), Skills métier, MCP — connecteurs vers vos outils.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Claude Code : votre assistant qui agit sur l’ordinateur',
        content:
          'Contrairement à une simple fenêtre de chat, Claude Code interprète une consigne en français, planifie les étapes et produit un résultat sur votre machine : fichiers Word ou PDF, mise à jour d’une page WordPress, scripts d’automatisation. Vous décrivez l’intention ; l’outil s’occupe de la mécanique — idéal pour les conventions Qualiopi, devis, feuilles d’émargement ou emails en série, toujours avec relecture humaine des chiffres et des engagements.',
      },
      {
        type: 'html',
        title: 'Schéma : de la consigne au résultat',
        content: `<figure class="my-6">
<img src="${IMG}/slide-03.png" alt="Capture Claude Code — instruction en français, résultat sur fichiers et site web" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Claude Code : vous tapez une instruction, le système interprète et agit sur vos fichiers ou votre site.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Installation en trois étapes (Mac et Windows)',
        content: `<p class="text-slate-600 mb-4">Installez Node.js depuis nodejs.org, ouvrez le Terminal (Mac) ou PowerShell en administrateur (Windows), puis exécutez <code class="bg-slate-100 px-1 rounded">npm install -g @anthropic-ai/claude-code</code>. Lancez <code class="bg-slate-100 px-1 rounded">claude</code> et connectez votre clé API Anthropic (console.anthropic.com).</p>
<figure class="my-6">
<img src="${IMG}/slide-04.png" alt="Installation Claude Code sur Mac et Windows : Node.js, terminal, commande npm, clé API Anthropic" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Étapes d’installation — à reproduire en formation encadrée pour sécuriser les accès.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Exemples concrets BTP avec Claude Code',
        content: `<figure class="my-6">
<img src="${IMG}/slide-05.png" alt="Exemples Claude Code BTP : convention formation, devis PDF, WordPress, emails série, rapport chantier, émargement Qualiopi" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Cas d’usage : conventions, devis, site, prospection, reporting — toujours valider les montants et clauses avant envoi.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Projects : garder tout le contexte entre deux conversations',
        content:
          'Un Project Claude est un espace où l’IA conserve instructions, documents de référence et préférences — vous évitez de réexpliquer votre activité à chaque session. C’est particulièrement utile pour les modèles de devis, barèmes, programmes de formation et FAQ clients. L’équipe peut partager le même Project (selon formule d’abonnement), ce qui aligne les réponses sur le terrain.',
      },
      {
        type: 'html',
        title: 'Sans Project vs avec Project',
        content: `<figure class="my-6">
<img src="${IMG}/slide-06.png" alt="Comparatif Claude Projects : mémoire contextuelle entre conversations pour entreprises BTP" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Avec un Project, le contexte métier et les documents restent disponibles — moins de ressaisie, plus de cohérence.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Créer et configurer un Project « BTP »',
        content: `<figure class="my-6">
<img src="${IMG}/slide-07.png" alt="Cinq étapes pour créer un Project Claude.ai BTP : instructions, documents, test, partage équipe" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Création du Project, instructions permanentes, import de pièces (programmes, grilles de prix), test puis invitation de l’équipe.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Modèle d’instructions Project (à adapter)',
        content: `<figure class="my-6">
<img src="${IMG}/slide-08.png" alt="Modèle instructions Project Claude pour OFC Laure Olivié : activité, formation phare, clients FFB FNTP, style Qualiopi Constructys" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Exemple de canevas — à personnaliser avec votre raison sociale, tarifs et règles internes.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Skills : règles et commandes rapides métier',
        content:
          'Les Skills permettent d’encoder une fois pour toutes vos habitudes : signature avec SIRET et mention Qualiopi, mentions légales dans un devis, ou commandes « /convention » pour générer un document structuré. Le fichier CLAUDE.md sert de règlement permanent pour Claude Code : identité, ton, clients cibles, dossier de sauvegarde.',
      },
      {
        type: 'html',
        title: 'Skills simples, métier et automatisation',
        content: `<figure class="my-6">
<img src="${IMG}/slide-09.png" alt="Skills Claude : exemples style signature Qualiopi, devis mentions légales, commande convention Word" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Trois niveaux : style, conformité métier, commandes automatisées.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'CLAUDE.md : identité et règles toujours actives',
        content: `<figure class="my-6">
<img src="${IMG}/slide-10.png" alt="Fichier CLAUDE.md pour Claude Code : identité formatrice BTP, clients FFB et CSFE, règles de style français" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Le fichier est relu au démarrage : configurez-le une fois, capitalisez sur la durée.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Six commandes « / » utiles pour une OF ou une PME BTP',
        content: `<figure class="my-6">
<img src="${IMG}/slide-11.png" alt="Skills BTP prêts à copier : convention Qualiopi, devis formation, email prospection Constructys, programme, CR réunion, fiche stagiaire" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Exemples inspirés du terrain formation : conventions, devis intra 1 200 € HT par session, inter dès 300 € HT par participant, prospection, comptes rendus.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'MCP : connecter Claude à Drive, Gmail, Notion…',
        content:
          'Le Model Context Protocol (MCP) est un standard qui permet à Claude d’échanger en lecture et écriture avec des services connectés (Drive, Gmail, Notion, calendrier, Slack, etc.), au-delà des simples connecteurs « lecture seule ». Pour une entreprise BTP, cela ouvre la voie à la mise à jour de dossiers chantier, à la préparation de réponses mail ou à la planification de créneaux de formation — sous réserve de validation informatique et de politique de données.',
      },
      {
        type: 'html',
        title: 'MCP : schéma et différence avec les connecteurs classiques',
        content: `<figure class="my-6">
<img src="${IMG}/slide-12.png" alt="Schéma MCP Claude : connexion Drive Gmail Notion calendrier logiciels BTP Slack — lecture et écriture" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">MCP : connexion complète lecture/écriture ; à distinguer des connecteurs limités à la consultation.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Synthèse : quelle brique pour quel besoin ?',
        content: `<figure class="my-6">
<img src="${IMG}/slide-15.png" alt="Récapitulatif Claude Code Projects Skills MCP pour assistant IA complet entreprise BTP" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les quatre briques complémentaires pour industrialiser l’usage de l’IA dans votre structure.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Formation pratique et financement',
        content: `<figure class="my-6">
<img src="${IMG}/slide-16.png" alt="Formation IA au service du BTP : 4h pratiques, inter intra, financement OPCO Constructys, Qualiopi, laureolivie.fr" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">« L’IA au service du BTP » — session 4 h, intra-entreprise, dans vos locaux, éligibilité Constructys selon dossier.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Liens avec vos PDF et modules de formation',
        content:
          'Les supports PITEL (modules 1 et 2, sensibilisation et prompts) et le module 3 sur les assistants IA s’inscrivent dans la même progression : d’abord maîtriser les prompts et la structuration, ensuite déployer des assistants et flux métiers. Pour le secteur FNTP et travaux publics, le document dédié « Formation IA FNTP » prolonge ces principes sur vos enjeux de marchés publics et de documentation chantier — demandez les ressources à votre interlocuteur OFC.',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Faut-il savoir coder ? — Non pour l’usage conversationnel et une partie des Projects / Skills. Claude Code et MCP demandent un accompagnement et des précautions (sécurité, sauvegardes).',
          'Est-ce compatible Qualiopi et Constructys ? — Les formations délivrées par OFC Création d’Entreprise sont certifiées Qualiopi ; le financement passe par votre OPCO (souvent Constructys pour le BTP) selon éligibilité.',
          'Où héberger les données ? — Ne mettez pas de données personnelles sensibles dans des outils non validés par votre entreprise. Anonymisez les exemples en session et respectez le RGPD.',
        ],
      },
      {
        type: 'cta',
        content:
          'Vous voulez passer à la pratique encadrée sur vos cas réels (devis, chantier, administratif) ? Réservez un échange ou découvrez le catalogue des formations IA pour les pros du BTP.',
        formationHref: '/formations/ia-batiment-travaux-publics',
      },
    ],
    relatedSlugs: [
      'adoption-ia-btp-2026-chiffres-freins-leviers',
      'comparatif-chatgpt-claude-gemini-btp',
      '5-cas-usage-chatgpt-artisans-btp',
    ],
  },
  {
    slug: 'mcp-claude-model-context-protocol-btp',
    seoTitle: 'MCP Claude : Drive, Gmail, outils BTP',
    title:
      'MCP (Model Context Protocol) : connecter Claude à Google Drive, Gmail et vos outils métier dans le BTP',
    description:
      'MCP : relier Claude à Drive ou Gmail avec traçabilité. Cadre données et validation terrain OFC, Qualiopi. Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-07',
    dateModified: '2026-04-12',
    keywords: [
      'MCP Claude',
      'Model Context Protocol',
      'Claude Google Drive',
      'IA BTP automatisation',
      'formation IA bâtiment',
      'Claude Gmail',
      'connecteurs IA entreprise',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Le MCP est un standard ouvert qui permet à Claude (notamment via Claude Code) de dialoguer en profondeur avec vos outils : fichiers sur Drive, messages Gmail, bases Notion, agenda, canaux Slack ou Teams. Pour une entreprise du BTP, l’enjeu est simple : moins de copier-coller, plus de traçabilité — à condition de cadrer les accès et la validation humaine.',
      },
      {
        type: 'html',
        title: 'Sur ce site',
        content:
          `<p class="text-slate-600">Les guides <strong>Claude</strong> sont regroupés sur la <a href="${LINKS.claudeAiBtp}" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>. Le contexte Projects / Skills est dans le <a href="${LINKS.blogGuideClaudeIaBtpCodeProjectsSkillsMcp}" class="text-[var(--accent)] font-medium underline">guide Claude IA pour le BTP</a>.</p>`,
      },
      {
        type: 'html',
        title: 'Installer un serveur MCP (exemple Google Drive)',
        content: `<p class="text-slate-600 mb-4">Vérifiez que Claude Code est installé (<code class="bg-slate-100 px-1 rounded">claude --version</code>), ajoutez le connecteur (<code class="bg-slate-100 px-1 rounded">claude mcp add google-drive</code>), authentifiez-vous dans le navigateur, puis testez avec une consigne ciblée sur un dossier projet.</p>
<figure class="my-6">
<img src="${IMG}/slide-13.png" alt="Tutoriel installation serveur MCP Google Drive pour Claude Code — authentification et test" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Étapes types : version Claude Code, ajout du serveur, OAuth Google, test de liste de fichiers.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Six scénarios MCP appliqués à l’activité BTP',
        content: `<figure class="my-6">
<img src="${IMG}/slide-14.png" alt="Exemples MCP BTP : Drive convention facture, Gmail prospection, Notion FFB, calendrier formation, WordPress, Slack équipe" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Cas d’usage : dossiers Drive, relances mail, documentation, planification, site web, communication interne.</figcaption>
</figure>`,
      },
      {
        type: 'paragraph',
        title: 'Sécurité et conformité',
        content:
          'Avant tout branchement sur des boîtes mail ou dossiers contenant des données personnelles (salariés, clients, sous-traitants), validez le cadre avec votre responsable informatique ou juridique. Les PDF de formation FNTP et PITEL rappellent les mêmes exigences : traçabilité Qualiopi, conservation des preuves pédagogiques et respect du RGPD.',
      },
      {
        type: 'cta',
        content:
          'Vous souhaitez une mise en œuvre encadrée avec votre équipe ? Les formations catalogue OFC intègrent les bonnes pratiques et des ateliers sur vos documents.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'guide-claude-ia-btp-code-projects-skills-mcp',
      'ia-memoire-technique-appel-offres-guide-2026',
      '5-cas-usage-chatgpt-artisans-btp',
    ],
  },
  {
    slug: 'prompts-linkedin-btp-carrousel-idees',
    seoTitle: 'LinkedIn BTP : prompts posts et carrousels',
    title:
      'Prompts LinkedIn pour le BTP : idées de carrousel, accroches et prises de parole pro (Qualiopi, Constructys)',
    description:
      'Prompts et angles LinkedIn BTP (chantier, devis, financement formation) : publier sans tout réécrire. Qualiopi, Constructys. Voir la méthode sur le blog.',
    date: '2026-04-07',
    keywords: [
      'prompts LinkedIn BTP',
      'carrousel LinkedIn bâtiment',
      'posts LinkedIn BTP',
      'formation IA pour les pros du BTP communication',
      'Qualiopi LinkedIn',
      'OPCO Constructys communication',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'LinkedIn reste un levier fort pour les TPE et PME du BTP : chantiers, recrutement, sous-traitance, financement de la formation. Ce texte propose des angles éditoriaux et des prompts réutilisables, en cohérence avec les fiches « prompts métier » (carrousel prompts BTP LinkedIn) et les modules PITEL sur la sensibilisation à l’IA.',
      },
      {
        type: 'list',
        title: 'Cinq thèmes qui fonctionnent sur le terrain',
        content: [
          'Avant / après : temps passé sur un devis ou un mémoire technique sans IA puis avec une méthode guidée.',
          'Financeur : rappel simple du rôle d’OPCO Constructys et du plan de développement des compétences (sans promesse irréaliste).',
          'Sécurité et sérieux : relecture humaine, RGPD, pourquoi la formation vaut mieux que « bricoler seul sur ChatGPT ».',
          'Métier : VRD, second œuvre, coordination chantier — parlez le langage de votre lecteur.',
          'Preuve : certifications (Qualiopi), partenariats (FFB, FNTP, réseaux pro), sans sur-vendre.',
        ],
      },
      {
        type: 'html',
        title: 'Exemple de Skills « posts » à décliner',
        content: `<figure class="my-6">
<img src="${IMG}/slide-11.png" alt="Exemples commandes Skills BTP : emails, conventions, devis, programmes Qualiopi pour contenus LinkedIn" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1200" height="675" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les mêmes briques que pour vos emails peuvent nourrir des carrousels : preuve, chiffres, appel à contacter.</figcaption>
</figure>`,
      },
      {
        type: 'prompts',
        title: 'Trois prompts pour drafts LinkedIn (à adapter)',
        content: [
          {
            titre: 'Carrousel « 5 erreurs IA au bureau des travaux »',
            prompt:
              'Rédige un plan de carrousel LinkedIn (5 slides) pour une PME du BTP. Public : dirigeants de TPE. Ton : direct, sans jargon. Inclure : slide 1 accroche, slides 2-4 erreurs fréquentes (données sensibles, absence de relecture, prompts flous), slide 5 CTA formation certifiée Qualiopi et financement OPCO selon éligibilité. 80 mots max par slide.',
            usage: 'À coupler avec vos photos de chantier ou captures anonymisées.',
          },
          {
            titre: 'Post court « pourquoi se former à l’IA maintenant »',
            prompt:
              'Rédige un post LinkedIn de 1200 caractères max pour une formatrice IA pour le BTP. Inclure : une statistique d’usage du secteur (sans inventer de chiffre précis si non fourni), 3 bénéfices concrets (devis, mails, DCE), mention Qualiopi et Constructys une seule fois chacun. Terminer par une question ouverte.',
            usage: 'Remplacez la stat par votre source (étude, retour terrain).',
          },
          {
            titre: 'Sujet email → déclinaison post',
            prompt:
              'Transforme ce texte d’email interne en post LinkedIn professionnel (1000 caractères) : [COLLER EMAIL]. Supprimer toute donnée personnelle. Ajouter un titre accrocheur et 3 hashtags BTP pertinents.',
            usage: 'Recycler vos prospections déjà rédigées.',
          },
        ],
      },
      {
        type: 'html',
        title: 'Ressources associées',
        content: `<p class="text-slate-600 leading-relaxed">Les PDF « PITEL » (modules 1 et 2, module 3 assistants) et le carrousel dédié aux prompts BTP pour LinkedIn complètent cet article : demandez-les lors de votre prise de contact ou en fin de formation pour garder une trace imprimable des modèles. Pour industrialiser la prod de contenus en entreprise, le <a href="${LINKS.formations}" class="text-[var(--accent)] font-medium underline">catalogue des formations IA pour le BTP</a> cadre le présentiel IDF ; côté Claude, le <a href="${LINKS.blogGuideClaudeIaBtpCodeProjectsSkillsMcp}" class="text-[var(--accent)] font-medium underline">guide Projects, Skills et MCP pour le BTP</a> prolonge ces prompts.</p>`,
      },
      {
        type: 'cta',
        content:
          'Besoin d’un accompagnement pour votre communication pro et vos équipes terrain ? Découvrez les formations et la sensibilisation IA.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'guide-claude-ia-btp-code-projects-skills-mcp',
      '5-cas-usage-chatgpt-artisans-btp',
    ],
  },
];
