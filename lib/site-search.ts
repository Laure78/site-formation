import { getAllArticles } from '@/lib/blog';
import { FORMATIONS_CATALOGUE } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { RESSOURCES_THEMATIC_BLOCKS } from '@/lib/ressources-thematic-hub';
import { TUTOS, TUTO_CATEGORY_META } from '@/lib/tutos';
import type { SiteSearchKind, SiteSearchScope } from '@/lib/site-search-labels';

export type { SiteSearchKind, SiteSearchScope } from '@/lib/site-search-labels';

export type SiteSearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SiteSearchKind;
  keywords: string;
};

export type SiteSearchResult = SiteSearchEntry & { score: number };

const RESSOURCES_KINDS = new Set<SiteSearchKind>(['tuto', 'guide', 'article']);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupe(entries: SiteSearchEntry[]): SiteSearchEntry[] {
  const seen = new Set<string>();
  return entries.filter((e) => {
    const key = e.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildStaticPages(): SiteSearchEntry[] {
  return [
    {
      id: 'page-formations',
      title: 'Catalogue formations IA BTP',
      description: 'Formations Qualiopi 4 h — devis, appels d\'offres, conduite de travaux, Claude AI.',
      href: LINKS.formations,
      kind: 'page',
      keywords: 'catalogue formation qualiopi constructys',
    },
    {
      id: 'page-ressources',
      title: 'Ressources gratuites IA BTP',
      description: 'Tutos PDF, guides et fiches pratiques — téléchargement libre.',
      href: LINKS.ressources,
      kind: 'page',
      keywords: 'tutos pdf guides gratuits ressources',
    },
    {
      id: 'page-blog',
      title: 'Blog formation IA BTP',
      description: 'Articles, méthodes et guides pratiques pour les pros du BTP.',
      href: LINKS.blog,
      kind: 'page',
      keywords: 'blog articles ia chatgpt claude',
    },
    {
      id: 'page-a-propos',
      title: 'Laure Olivié — formatrice IA BTP',
      description: 'Parcours, Qualiopi, clients institutionnels FFB, CSFE, CNAM.',
      href: LINKS.aPropos,
      kind: 'page',
      keywords: 'laure olivie formatrice qualiopi',
    },
    {
      id: 'page-financement',
      title: 'Financement Constructys — formation IA BTP',
      description: 'Plafonds, délais eGestion, dossier OFC Qualiopi.',
      href: LINKS.financement,
      kind: 'page',
      keywords: 'constructys opco financement',
    },
    {
      id: 'page-rdv',
      title: 'Prendre rendez-vous — visio découverte',
      description: 'Échange gratuit 30 min pour votre projet de formation IA.',
      href: LINKS.prendreRdv,
      kind: 'page',
      keywords: 'rdv calendly visio découverte',
    },
    {
      id: 'page-claude',
      title: 'Claude AI pour le BTP',
      description: 'Guide interfaces, prompts et usages métier chantier.',
      href: LINKS.claudeAiBtp,
      kind: 'page',
      keywords: 'claude ai anthropic btp',
    },
    {
      id: 'page-idf',
      title: 'Formation IA BTP Île-de-France',
      description: 'Présentiel intra et inter — tous départements franciliens.',
      href: LINKS.formationIleDeFrance,
      kind: 'page',
      keywords: 'ile de france paris 75 78 91 92 93 94 95 77',
    },
    {
      id: 'guide-chef-de-chantier-ofc',
      title: 'Guide du chef de chantier — 6 skills Claude',
      description: 'PDF gratuit : accueil sécurité, rapport journalier, appro, auto-contrôle depuis le téléphone.',
      href: LINKS.guideChefDeChantierOfc,
      kind: 'guide',
      keywords: 'chef de chantier sécurité rapport journalier appro réserves claude mobile',
    },
    {
      id: 'guide-dirigeant-btp-ofc',
      title: 'Guide du dirigeant BTP — 6 leviers IA',
      description: 'PDF gratuit : Go/No-Go, clauses, rentabilité, litiges, tableau de bord, RH + 24 prompts.',
      href: LINKS.guideDirigeantBtpOfc,
      kind: 'guide',
      keywords: 'dirigeant pme btp go no-go marge réclamation recrutement prompts',
    },
    {
      id: 'guide-claude-btp-ofc',
      title: 'Guide Claude BTP — Projets, Skills, MCP',
      description: 'PDF gratuit 2026 : Projets, MCP, Skills, instructions, Cowork et plan 5 jours.',
      href: LINKS.guideClaudeBtpOfc,
      kind: 'guide',
      keywords: 'claude projets skills mcp cowork guide pdf btp administratif',
    },
    {
      id: 'bibliotheque-prompts-btp-par-metier',
      title: 'Bibliothèque prompts IA BTP par métier',
      description: 'Excel gratuit : ~50 prompts (dirigeant, assistante, BE, CDT, chef de chantier).',
      href: LINKS.bibliothequePromptsBtpParMetier,
      kind: 'guide',
      keywords: 'prompts excel chatgpt claude métier dirigeant conducteur assistante',
    },
    {
      id: 'guide-assistants-travaux',
      title: 'Guide des Assistants Travaux — 12 missions IA',
      description: 'PDF gratuit : PPSPS, CR, situations, DOE, DGD — skills Claude bureau.',
      href: LINKS.guideAssistantsTravauxOfc,
      kind: 'guide',
      keywords: 'assistant travaux gestion administratif ppsps cr doe dgd',
    },
    {
      id: 'guide-moe',
      title: 'Guide Maître d\'Œuvre × IA',
      description: '12 missions MOE classées IA, mixte ou humain — PDF gratuit.',
      href: LINKS.guideMaitriseOeuvreIa,
      kind: 'guide',
      keywords: 'moe maître oeuvre moex dce cctp skills claude',
    },
    {
      id: 'guide-cdt',
      title: 'Guide conducteur de travaux — 6 tutos Claude',
      description: 'PDF gratuit DCE, PPSPS, CR, DOE — skills chantier.',
      href: LINKS.guideConducteurTravauxIaBtp,
      kind: 'guide',
      keywords: 'conducteur travaux cdt chantier pdf',
    },
    {
      id: 'page-diagnostic',
      title: 'Diagnostic IA BTP offert',
      description: 'Évaluation rapide de vos usages IA en entreprise BTP.',
      href: LINKS.diagnostic,
      kind: 'page',
      keywords: 'diagnostic audit ia',
    },
    {
      id: 'page-bework',
      title: 'BeWork — relais administratif BTP',
      description: 'Assistants IA pour le suivi administratif chantier.',
      href: LINKS.bework,
      kind: 'page',
      keywords: 'bework assistant administratif',
    },
  ];
}

function buildSiteSearchIndex(): SiteSearchEntry[] {
  const tutos: SiteSearchEntry[] = TUTOS.map((t) => ({
    id: `tuto-${t.slug}`,
    title: t.shortTitle,
    description: t.subtitle,
    href: `${LINKS.ressources}/${t.slug}`,
    kind: 'tuto' as const,
    keywords: [
      t.title,
      t.metaDescription,
      ...t.keywords,
      TUTO_CATEGORY_META[t.category].title,
      TUTO_CATEGORY_META[t.category].pillLabel,
    ].join(' '),
  }));

  const formations: SiteSearchEntry[] = FORMATIONS_CATALOGUE.map((f) => ({
    id: `formation-${f.slug}`,
    title: f.title,
    description: f.pitch,
    href: f.href,
    kind: 'formation' as const,
    keywords: [f.ref, f.level, ...f.objectifs, f.comparatif.publicLabel, f.comparatif.casUsage].join(' '),
  }));

  const hubLinks: SiteSearchEntry[] = [];
  for (const block of RESSOURCES_THEMATIC_BLOCKS) {
    for (const link of block.tutos) {
      hubLinks.push({
        id: `hub-tuto-${link.href}`,
        title: link.label,
        description: block.title,
        href: link.href,
        kind: 'tuto',
        keywords: `${block.title} ${block.description}`,
      });
    }
    for (const link of block.guides) {
      hubLinks.push({
        id: `hub-guide-${link.href}`,
        title: link.label,
        description: block.title,
        href: link.href,
        kind: 'guide',
        keywords: `${block.title} ${block.description}`,
      });
    }
    for (const link of block.articles) {
      hubLinks.push({
        id: `hub-article-${link.href}`,
        title: link.label,
        description: block.title,
        href: link.href,
        kind: 'article',
        keywords: `${block.title} ${block.description}`,
      });
    }
  }

  const articles: SiteSearchEntry[] = getAllArticles().map((a) => ({
    id: `article-${a.slug}`,
    title: a.seoTitle ?? a.title,
    description: a.description,
    href: `${LINKS.blog}/${a.slug}`,
    kind: 'article' as const,
    keywords: (a.keywords ?? []).join(' '),
  }));

  return dedupe([
    ...buildStaticPages(),
    ...tutos,
    ...formations,
    ...hubLinks,
    ...articles,
  ]);
}

let indexCache: SiteSearchEntry[] | null = null;

function getIndex(): SiteSearchEntry[] {
  if (!indexCache) indexCache = buildSiteSearchIndex();
  return indexCache;
}

function scoreEntry(entry: SiteSearchEntry, query: string): number {
  const q = normalizeText(query);
  if (!q) return 0;

  const title = normalizeText(entry.title);
  const description = normalizeText(entry.description);
  const keywords = normalizeText(entry.keywords);
  const tokens = q.split(' ').filter(Boolean);

  let score = 0;
  if (title.includes(q)) score += 120;
  if (description.includes(q)) score += 40;
  if (keywords.includes(q)) score += 25;

  for (const token of tokens) {
    if (title.includes(token)) score += 18;
    if (description.includes(token)) score += 8;
    if (keywords.includes(token)) score += 5;
  }

  return score;
}

export function searchSite(
  query: string,
  scope: SiteSearchScope = 'all',
  limit = 12,
): SiteSearchResult[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const pool =
    scope === 'ressources'
      ? getIndex().filter((e) => RESSOURCES_KINDS.has(e.kind))
      : getIndex();

  return pool
    .map((entry) => ({ ...entry, score: scoreEntry(entry, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
