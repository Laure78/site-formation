/**
 * Maillage interne automatique — remplace la première occurrence de termes clés
 * dans le HTML des articles blog (hors liens existants et titres H1–H3).
 */
import type { ElementContent, Root } from 'hast';
import { visitParents } from 'unist-util-visit-parents';
import { LINKS } from '@/lib/internal-links';

export const AUTO_LINK_CLASS =
  'text-[#377CF3] underline decoration-[#377CF3]/30 hover:decoration-[#377CF3]';

/** Dictionnaire terme → URL interne (source `lib/internal-links.ts`). */
export const AUTO_LINKS: Record<string, string> = {
  'conducteur de travaux': LINKS.formationConducteurTravaux,
  "chargé d'affaires": LINKS.formationChargeAffairesBtp,
  "appels d'offres BTP": LINKS.formationAO,
  DCE: LINKS.formationAO,
  'mémoire technique': LINKS.formationAO,
  'financement Constructys': LINKS.financement,
  Qualiopi: LINKS.formations,
  'formation IA pour le BTP': LINKS.formations,
  'formation IA appliquée au bâtiment': LINKS.formationIaBtp,
  'devis BTP': LINKS.blogIaDevisBatimentChiffrageAutomatise,
  'compte rendu de chantier': LINKS.blogCompteRenduChantierIa,
};

const SKIP_CONTENT_TAGS = new Set(['a', 'h1', 'h2', 'h3', 'script', 'style', 'pre', 'code']);
const EXCLUDED_ANCESTORS = new Set(['a', 'h1', 'h2', 'h3']);
const VOID_HTML_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/** État partagé entre plusieurs appels `autoLink` pour un même article. */
export type AutoLinkScope = {
  linkedTerms: Set<string>;
};

export function createAutoLinkScope(): AutoLinkScope {
  return { linkedTerms: new Set<string>() };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSortedAutoLinkEntries(): [string, string][] {
  return Object.entries(AUTO_LINKS).sort(([a], [b]) => b.length - a.length);
}

function termKey(term: string): string {
  return term.toLowerCase();
}

function buildAnchorHtml(href: string, label: string): string {
  return `<a href="${href}" class="${AUTO_LINK_CLASS}" rel="internal">${label}</a>`;
}

function applyAutoLinksToPlainText(text: string, linkedTerms: Set<string>): string {
  let result = text;
  for (const [term, href] of getSortedAutoLinkEntries()) {
    const key = termKey(term);
    if (linkedTerms.has(key)) continue;

    const regex = new RegExp(escapeRegExp(term), 'i');
    const match = regex.exec(result);
    if (!match || match.index === undefined) continue;

    linkedTerms.add(key);
    const matched = match[0];
    result =
      result.slice(0, match.index) +
      buildAnchorHtml(href, matched) +
      result.slice(match.index + matched.length);
  }
  return result;
}

type ParsedTag = {
  name: string;
  isClosing: boolean;
  isSelfClosing: boolean;
};

function parseHtmlTag(raw: string): ParsedTag | null {
  const match = /^<\/?([a-zA-Z][\w-]*)\b([^>]*)?\/?>$/.exec(raw);
  if (!match) return null;
  const name = match[1].toLowerCase();
  const isClosing = raw.startsWith('</');
  const isSelfClosing = !isClosing && (raw.endsWith('/>') || VOID_HTML_TAGS.has(name));
  return { name, isClosing, isSelfClosing };
}

function autoLinkHtml(html: string, linkedTerms: Set<string>): string {
  if (!html.trim()) return html;

  const parts = html.split(/(<[^>]+>)/g);
  const openTags: string[] = [];
  let output = '';

  const shouldSkipLinking = (): boolean =>
    openTags.some((tag) => SKIP_CONTENT_TAGS.has(tag));

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('<')) {
      const parsed = parseHtmlTag(part);
      if (parsed) {
        if (parsed.isClosing) {
          const idx = openTags.lastIndexOf(parsed.name);
          if (idx !== -1) openTags.splice(idx);
        } else if (!parsed.isSelfClosing) {
          openTags.push(parsed.name);
        }
      }
      output += part;
      continue;
    }

    output += shouldSkipLinking() ? part : applyAutoLinksToPlainText(part, linkedTerms);
  }

  return output;
}

/**
 * Remplace la première occurrence de chaque terme du dictionnaire dans un fragment HTML.
 * @param scope — optionnel ; partagez le même scope entre sections d’un article pour une seule occurrence par terme.
 */
export function autoLink(html: string, scope?: AutoLinkScope): string {
  const linkedTerms = scope?.linkedTerms ?? new Set<string>();
  return autoLinkHtml(html, linkedTerms);
}

function linkTextToHastNodes(text: string, linkedTerms: Set<string>): ElementContent[] {
  let remaining = text;
  const nodes: ElementContent[] = [];

  while (remaining.length > 0) {
    let earliestMatch: {
      term: string;
      href: string;
      index: number;
      matched: string;
    } | null = null;

    for (const [term, href] of getSortedAutoLinkEntries()) {
      if (linkedTerms.has(termKey(term))) continue;
      const regex = new RegExp(escapeRegExp(term), 'i');
      const match = regex.exec(remaining);
      if (!match || match.index === undefined) continue;
      if (
        !earliestMatch ||
        match.index < earliestMatch.index ||
        (match.index === earliestMatch.index && term.length > earliestMatch.term.length)
      ) {
        earliestMatch = {
          term,
          href,
          index: match.index,
          matched: match[0],
        };
      }
    }

    if (!earliestMatch) {
      nodes.push({ type: 'text', value: remaining });
      break;
    }

    if (earliestMatch.index > 0) {
      nodes.push({ type: 'text', value: remaining.slice(0, earliestMatch.index) });
    }

    linkedTerms.add(termKey(earliestMatch.term));
    nodes.push({
      type: 'element',
      tagName: 'a',
      properties: {
        href: earliestMatch.href,
        className: AUTO_LINK_CLASS,
        rel: 'internal',
      },
      children: [{ type: 'text', value: earliestMatch.matched }],
    });

    remaining = remaining.slice(earliestMatch.index + earliestMatch.matched.length);
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', value: text }];
}

function isInExcludedHastContext(ancestors: readonly unknown[]): boolean {
  return ancestors.some(
    (node) =>
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      node.type === 'element' &&
      'tagName' in node &&
      typeof node.tagName === 'string' &&
      EXCLUDED_ANCESTORS.has(node.tagName.toLowerCase())
  );
}

/** Plugin rehype — auto-link après compilation MDX (même règles que `autoLink`). */
export function rehypeAutoLink() {
  const linkedTerms = new Set<string>();

  return (tree: Root) => {
    visitParents(tree, 'text', (node, ancestors) => {
      if (isInExcludedHastContext(ancestors)) return;

      const parent = ancestors[ancestors.length - 1];
      if (
        !parent ||
        typeof parent !== 'object' ||
        !('type' in parent) ||
        parent.type !== 'element' ||
        !('children' in parent) ||
        !Array.isArray(parent.children)
      ) {
        return;
      }

      const newNodes = linkTextToHastNodes(node.value, linkedTerms);
      if (
        newNodes.length === 1 &&
        newNodes[0].type === 'text' &&
        newNodes[0].value === node.value
      ) {
        return;
      }

      const index = parent.children.indexOf(node);
      if (index === -1) return;
      parent.children.splice(index, 1, ...newNodes);
    });
  };
}
