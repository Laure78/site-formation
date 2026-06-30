/**
 * Articles blog — modules (parcours appels d’offres BTP, supports OFC).
 * Visuels : /public/images/blog/lsr-modules-btp-2026/*.png
 * PDF : /public/formations/lsr/
 */
import type { BlogArticle } from './blog';
import { LINKS } from '@/lib/internal-links';
import {
  AO_DCE_CLUSTER_BLOG,
  AO_DCE_PILAR,
  clusterMaillageHtmlSection,
} from '@/lib/ao-dce-cluster-links';

const IMG = '/images/blog/lsr-modules-btp-2026';
const PDF1_NB = '/formations/lsr/module1-analyse-dce-notebooklm-ofc.pdf';
const PDF1_CL = '/formations/lsr/module1-analyse-dce-claude-lsr.pdf';
const PDF2 = '/formations/lsr/module2-go-no-go-ia-btp-ofc.pdf';
const PDF3 = '/formations/lsr/module3-memoire-technique-ia-btp-ofc.pdf';
const PDF4 = '/formations/lsr/module4-chiffrage-ia-btp-ofc.pdf';

const RELATED = [
  'go-no-go-rentabilite-appels-offres-btp',
  'memoire-technique-claude-projet-btp',
  'chiffrage-cctp-bpu-appels-offres-btp',
  'analyse-dce-notebooklm-claude-btp',
] as const;

function relatedExcept(slug: string): string[] {
  return RELATED.filter((s) => s !== slug);
}

export const blogArticlesLsrAoModules: BlogArticle[] = [
  {
    slug: 'analyse-dce-notebooklm-claude-btp',
    seoTitle: 'Analyse DCE BTP : NotebookLM, Claude, CCAP',
    title:
      'Analyse d’un DCE BTP avec NotebookLM et Claude : critères, CCAP et synthèse',
    description:
      'Charger un DCE, isoler critères et clauses CCAP, produire une synthèse avec NotebookLM et Claude. Formation AO Qualiopi ; Constructys. Voir la méthode.',
    date: '2026-04-07',
    dateModified: '2026-04-12',
    keywords: [
      'analyse DCE BTP',
      'NotebookLM appel d’offres',
      'CCAP pénalités garanties',
      'critères attribution marché public',
      'Claude analyse CCTP',
      'formation IA appels d’offres BTP',
      'DCE intelligence artificielle',
      'synthèse dossier consultation',
    ],
    relatedSlugs: [
      ...relatedExcept('analyse-dce-notebooklm-claude-btp'),
      '7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce guide pose les bases d’un parcours « réponse marché » : analyser un dossier de consultation (DCE) sans se noyer, avec NotebookLM (Google) pour des réponses ancrées dans vos PDF, et Claude (Chat, Cowork, extensions) pour les tâches quotidiennes et les dossiers lourds. Les supports illustrés ci-dessous décrivent une méthode illustrée, transposable à votre entreprise BTP.',
      },
      {
        type: 'html',
        title: 'Sur ce site',
        content:
          '<p class="text-slate-600">Tous les guides <strong>Claude</strong> pour le BTP sont listés sur la <a href="/claude-ai-btp" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>.</p>',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi NotebookLM pour un DCE ?',
        content:
          'Sur un DCE volumineux, l’enjeu est d’éviter les « réponses inventées ». NotebookLM travaille sur vos fichiers téléchargés, cite les passages sources et limite les hallucinations — utile pour comparer CCAP, CCTP et pièces annexes. En parallèle, le guide Claude rappelle comment choisir l’interface adaptée (Chat pour l’analyse rapide, Cowork pour des tâches plus longues sur dossiers, etc.).',
      },
      {
        type: 'html',
        title: 'Support — NotebookLM : objectifs et usage DCE',
        content: `<figure class="my-6">
<img src="${IMG}/m1-notebooklm-slide-01.png" alt="Analyse du DCE avec NotebookLM : objectifs chargement DCE et critères d’attribution — Laure Olivié OFC" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Objectifs pédagogiques : charger le DCE, identifier critères et pondérations, repérer les clauses critiques au CCAP, esquisser un Go / No Go, produire une synthèse partageable.</figcaption>
</figure>`,
      },
      {
        type: 'html',
        title: 'Claude : quelle interface pour quel besoin ?',
        content: `<figure class="my-6">
<img src="${IMG}/m1-claude-slide-01.png" alt="Les 5 interfaces Claude pour le BTP : Chat, Cowork, Claude Code, application desktop, extension Chrome — Laure Olivié" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Vue d’ensemble des interfaces Claude — à choisir selon la tâche (email, DCE, mémoire technique, automatisation).</figcaption>
</figure>
<p class="text-slate-600 leading-relaxed">La slide suivante du support détaille des cas d’usage BTP (emails, analyse de CCTP, mémoire technique…).</p>
<figure class="my-6">
<img src="${IMG}/m1-claude-slide-06.png" alt="Exemples BTP pour Chat, Cowork et analyse de dossiers appels d’offres" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Exemples métier : structurer la réponse, s’appuyer sur des fichiers, garder la validation humaine sur le fond.</figcaption>
</figure>`,
      },
      {
        type: 'list',
        title: 'À retenir avant le module suivant',
        content: [
          'Les critères d’attribution et leurs pondérations dictent la stratégie de réponse : repérez-les tôt.',
          'CCAP : vigilance sur pénalités, garanties et délais — listez les points à valider en interne.',
          'NotebookLM + Claude se complètent : sources citées d’un côté, rédaction et agents de l’autre.',
        ],
      },
      {
        type: 'html',
        title: 'Télécharger les supports PDF',
        content: `<p class="text-slate-600 leading-relaxed">NotebookLM (parcours DCE) : <a href="${PDF1_NB}" class="text-sky-700 underline font-medium">support NotebookLM (PDF)</a> — Guide Claude (interfaces et cas BTP) : <a href="${PDF1_CL}" class="text-sky-700 underline font-medium">guide Claude (PDF)</a>.</p>`,
      },
      {
        type: 'html',
        title: 'Cluster appels d’offres',
        content: clusterMaillageHtmlSection({
          lateralHref: AO_DCE_CLUSTER_BLOG.chiffrageBpu,
          lateralTitle: 'Chiffrage CCTP → BPU avec l’IA',
          lateralDescription: 'extraction ouvrages, ratios et contrôle de cohérence prix',
        }),
      },
      {
        type: 'cta',
        title: 'Formation complète appels d’offres + IA',
        content:
          'Formation complète appels d’offres + IA — Parcours DCE, mémoire technique et chiffrage avec l’IA ; présentiel, certification Qualiopi, financement possible selon éligibilité OPCO Constructys.',
        formationHref: AO_DCE_PILAR,
      },
    ],
  },
  {
    slug: 'go-no-go-rentabilite-appels-offres-btp',
    seoTitle: 'Go / No Go AO BTP : 5 critères, règle 3 %',
    title:
      'Décision Go / No Go sur un appel d’offres BTP : rentabilité, 5 critères et prompts Claude',
    description:
      'Décider Go ou No Go avant d’engager des moyens : cinq critères, rentabilité, synthèse direction. OFC Qualiopi ; Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-07',
    dateModified: '2026-04-12',
    keywords: [
      'Go No Go appel d’offres',
      'rentabilité réponse marché public',
      'règle 3 pourcent coût réponse AO',
      'Claude analyse AO BTP',
      'critères candidature marché',
      'formation IA appliquée au bâtiment',
      'réponse marché revêtements sols',
      'synthèse direction AO',
    ],
    relatedSlugs: [
      ...relatedExcept('go-no-go-rentabilite-appels-offres-btp'),
      'adoption-ia-btp-2026-chiffres-freins-leviers',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Avant d’engager des jours-homme sur un dossier, structurer la décision : le marché peut être « gagnable » sur le papier mais défavorable en charge, risques ou marge. Le guide présente cinq critères décisifs, une règle de rentabilité (coût de réponse vs montant visé) et des prompts Claude pour accélérer l’analyse — méthode illustrée, transposable à votre entreprise BTP.',
      },
      {
        type: 'html',
        title: 'Sur ce site',
        content:
          '<p class="text-slate-600">Ressources <strong>Claude</strong> : <a href="/claude-ai-btp" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>.</p>',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi trancher tôt ?',
        content:
          'Les coûts cachés d’une réponse (MO, expertise, déplacements, sous-traitance) explosent vite. La sélectivité — mieux répondre à trois marchés bien ciblés que dix approximatifs — améliore le taux de succès et protège l’équipe. L’IA réduit le temps d’arbitrage (ordre de grandeur : une analyse en 15 à 20 minutes plutôt que 2 h à la main), sans remplacer le jugement du dirigeant.',
      },
      {
        type: 'html',
        title: 'Visuels du module — Go / No Go et rentabilité',
        content: `<figure class="my-6">
<img src="${IMG}/m2-gonogo-slide-01.png" alt="Décision Go No Go et évaluation rentabilité avant candidature appel d’offres BTP" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Objectifs : évaluer le marché avant d’investir du temps, structurer les critères et produire une synthèse pour la direction.</figcaption>
</figure>
<figure class="my-6">
<img src="${IMG}/m2-gonogo-slide-05.png" alt="Règle des 3 pourcent : coût réponse appel d’offres, concentration des ressources, analyse Claude en 15-20 minutes" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Rappel pédagogique : le coût de réponse ne doit pas dépasser un plafond cohérent avec le montant visé ; l’IA aide à chiffrer l’effort et cadrer la décision.</figcaption>
</figure>`,
      },
      {
        type: 'list',
        title: 'Les cinq axes à cocher avant « Go »',
        content: [
          'Technique : faisabilité, moyens, références réelles (pas de survente).',
          'Financier : marge, risques de prix, liquidité pour l’exécution.',
          'RH / organisation : disponibilité des équipes, sous-traitants, planning.',
          'Contractuel : CCAP, pénalités, clauses qui vous exposent.',
          'Rentabilité nette : coût complet de la réponse vs probabilité de gain et marge attendue.',
        ],
      },
      {
        type: 'html',
        title: 'Support PDF',
        content: `<p class="text-slate-600 leading-relaxed">Télécharger : <a href="${PDF2}" class="text-sky-700 underline font-medium">module2-go-no-go-ia-btp-ofc.pdf</a>.</p>`,
      },
      {
        type: 'cta',
        title: 'Intégrer la méthode en formation',
        content:
          'Intégrer la méthode en formation — Découvrez « Répondre aux appels d’offres avec l’IA » : méthode, prompts et validation des réponses sur vos dossiers.',
        formationHref: '/formations/ia-appels-offre-btp',
      },
    ],
  },
  {
    slug: 'memoire-technique-claude-projet-btp',
    seoTitle: 'Mémoire technique BTP : projet Claude, RC',
    title:
      'Mémoire technique pour marchés BTP : assistant Claude, prompts et alignement sur le RC',
    description:
      'Projet Claude, consignes métier et pièces sources : mémoire aligné sur le RC. Formation AO Qualiopi ; Constructys selon branche. Voir la méthode.',
    date: '2026-04-07',
    dateModified: '2026-04-12',
    keywords: [
      'mémoire technique BTP',
      'Claude projet IA',
      'règlement consultation RC',
      'assistant rédaction AO',
      'Qualibat mémoire technique',
      'DTU carrelage parquet',
      'prompt mémoire technique',
      'formation IA appels d’offres',
    ],
    relatedSlugs: [
      ...relatedExcept('memoire-technique-claude-projet-btp'),
      'formation-ia-artisans-batiment-programme-objectifs-livrables',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Le module 3 part du constat terrain : sans contexte entreprise, l’IA produit du générique. La solution consiste à créer un projet Claude avec instructions système (identité, métiers, références, limites « ne jamais inventer ») et fichiers sources (plaquette, qualifications, chantiers de référence). Les prompts suivants s’appuient sur cet assistant — d’où la précision sur les mémoires alignés RC.',
      },
      {
        type: 'html',
        title: 'Sur ce site',
        content:
          '<p class="text-slate-600">Guides <strong>Claude</strong> (interfaces, mémoire technique) : <a href="/claude-ai-btp" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>.</p>',
      },
      {
        type: 'paragraph',
        title: 'Structure et vocabulaire métier',
        content:
          'L’exemple (carrelage, parquet, revêtements, DTU 52.1 / 53.12, etc.) montre comment caler le vocabulaire réglementaire et la structure en chapitres sur le RC. La méthode s’exporte : remplacez les données d’exemple par les vôtres (corps d’état, labels, références) et gardez la discipline « crochet » pour les données manquantes plutôt que d’inventer.',
      },
      {
        type: 'html',
        title: 'Visuels — création de l’assistant et mémoire technique',
        content: `<figure class="my-6">
<img src="${IMG}/m3-memoire-slide-01.png" alt="Rédaction mémoire technique avec Claude : projet et assistant mémoire technique entreprise" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Mise en avant du projet Claude « Assistant mémoire technique » et des données à fournir en amont.</figcaption>
</figure>
<figure class="my-6">
<img src="${IMG}/m3-memoire-slide-07.png" alt="Tutoriel Claude : étapes création projet mémoire technique, instructions et import de documents de référence" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Étapes : créer le projet, coller le system prompt, importer les preuves et références — puis enchaîner les prompts du module.</figcaption>
</figure>`,
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Faut-il un compte payant ? — Pour une formation niveau avancé et des projets avec fichiers volumineux, l’offre Claude adaptée au parcours est prévue : voir la page formation pour le détail et les prérequis.',
          'Peut-on utiliser ChatGPT à la place ? — Oui pour une partie des tâches ; l’important est l’assistant contextualisé et les documents sources, pas le logo sur la boîte.',
          'Faut-il un projet Claude dédié pour le mémoire ? — Oui : sans instructions métier et documents sources (plaquette, qualifications, références chantier), l’IA produit du générique. Le projet fixe l’identité, les limites « ne jamais inventer » et les preuves avant de rédiger.',
        ],
      },
      {
        type: 'html',
        title: 'Support PDF',
        content: `<p class="text-slate-600 leading-relaxed">Télécharger : <a href="${PDF3}" class="text-sky-700 underline font-medium">module3-memoire-technique-ia-btp-ofc.pdf</a>.</p>`,
      },
      {
        type: 'cta',
        title: 'Parcours formation IA appels d’offres',
        content:
          'Parcours formation IA appels d’offres — Sessions en présentiel, niveau avancé (Claude / outils adaptés) ; programme détaillé et prérequis sur la page formation.',
        formationHref: '/formations/ia-appels-offre-btp',
      },
    ],
  },
  {
    slug: 'chiffrage-cctp-bpu-appels-offres-btp',
    seoTitle: 'Chiffrage AO BTP : CCTP, BPU, cohérence',
    title:
      'Chiffrage d’une réponse marché avec l’IA : du CCTP au BPU et contrôle de cohérence',
    description:
      'CCTP vers BPU : extraire ouvrages, estimer temps unitaires et contrôler cohérence prix au m² avant dépôt. Qualiopi, Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-07',
    keywords: [
      'chiffrage CCTP BPU',
      'extraction ouvrages CCTP IA',
      'BPU mémoire technique',
      'ratios h/m² revêtements',
      'contrôle prix m²',
      'IA réponse marché BTP',
      'Claude chiffrage',
      'appel d’offres chiffrage',
    ],
    relatedSlugs: [
      ...relatedExcept('chiffrage-cctp-bpu-appels-offres-btp'),
      '7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce guide enchaîne après l’analyse et le mémoire : chiffrer proprement à partir du CCTP (liste des ouvrages, unités), structurer le BPU (numéros, désignations, quantités), estimer les temps avec des ratios métier et contrôler la cohérence des prix au m² avant dépôt. Les supports donnent une feuille de route et des prompts numérotés — à adapter à votre région et à votre catalogue interne.',
      },
      {
        type: 'paragraph',
        title: 'Chaîne de valeur et responsabilité',
        content:
          'L’IA accélère la mise en forme et la détection d’incohérences ; le prix final, les taux, la marge et la conformité au BPU restent votre responsabilité. Utilisez les sorties comme brouillon structuré à valider avec les métiers et l’outil de chiffrage habituel.',
      },
      {
        type: 'html',
        title: 'Visuels — workflow chiffrage CCTP → contrôle',
        content: `<figure class="my-6">
<img src="${IMG}/m4-chiffrage-slide-01.png" alt="Aide au chiffrage IA : extraction CCTP, structure BPU, ratios et contrôles de cohérence pour marchés BTP" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Objectifs : extraction des ouvrages, structure BPU, temps unitaires, contrôle prix/m².</figcaption>
</figure>
<figure class="my-6">
<img src="${IMG}/m4-chiffrage-slide-04.png" alt="Workflow IA 4 étapes : extraction CCTP, structure BPU, estimation temps h/m², contrôle cohérence marché — OFC" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1440" height="810" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Les quatre étapes du parcours — durées indicatives ; à caler sur vos propres données et validations internes.</figcaption>
</figure>`,
      },
      {
        type: 'list',
        title: 'Contrôles à ne pas sauter',
        content: [
          'Cohérence des unités (m², ml, forfait) avec le CCTP et le RC.',
          'Postes « atypiques » : vérifier manuellement ceux que l’IA signale ou qui sortent de votre fourchette habituelle.',
          'Alignement avec la stratégie de prix validée en module 2 (Go / No Go).',
        ],
      },
      {
        type: 'html',
        title: 'Support PDF',
        content: `<p class="text-slate-600 leading-relaxed">Télécharger : <a href="${PDF4}" class="text-sky-700 underline font-medium">module4-chiffrage-ia-btp-ofc.pdf</a>.</p>`,
      },
      {
        type: 'html',
        title: 'Cluster appels d’offres',
        content: clusterMaillageHtmlSection({
          lateralHref: AO_DCE_CLUSTER_BLOG.methode20,
          lateralTitle: 'Méthode CCTP en 20 minutes',
          lateralDescription: 'cinq étapes détaillées avec prompts prêts à l’emploi',
        }),
      },
      {
        type: 'cta',
        title: 'Former vos équipes au chiffrage + IA',
        content:
          'Former vos équipes au chiffrage + IA — Intégrez le workflow CCTP → BPU dans votre processus de réponse marché avec un accompagnement OFC.',
        formationHref: AO_DCE_PILAR,
      },
    ],
  },
];
