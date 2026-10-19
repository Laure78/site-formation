import type { FAQItem } from '@/lib/faq';
import { getDeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';

function faqQuestionKey(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Fusionne des blocs FAQ en conservant la première occurrence de chaque question. */
export function mergeFaqItemsUnique(...groups: readonly (readonly FAQItem[])[]): FAQItem[] {
  const seen = new Set<string>();
  const out: FAQItem[] = [];
  for (const group of groups) {
    for (const item of group) {
      const key = faqQuestionKey(item.q);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

/**
 * FAQ visible + JSON-LD — pages département `/formation-ia-btp-*`.
 * Priorité aux questions locales (contenu unique par département), puis bloc géo catalogue.
 */
export function getFormationIaDeptPageFaq(deptCode: string, configFaq: readonly FAQItem[]): FAQItem[] {
  const local = getDeptLocalSeoContent(deptCode)?.faq ?? [];
  return mergeFaqItemsUnique(local, configFaq);
}
