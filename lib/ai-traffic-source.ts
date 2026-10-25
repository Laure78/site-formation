/**
 * Détection trafic issu d’assistants IA (referrer ou utm) — sans PII.
 */
const AI_REFERRER_HOSTS = [
  'chatgpt.com',
  'chat.openai.com',
  'perplexity.ai',
  'claude.ai',
  'gemini.google.com',
  'copilot.microsoft.com',
] as const;

const AI_TRAFFIC_STORAGE_KEY = 'ofc_ai_source';

export type AiTrafficSource = (typeof AI_REFERRER_HOSTS)[number] | 'chatgpt.com';

function hostFromReferrer(referrer: string): string | null {
  try {
    return new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function matchAiHost(host: string): AiTrafficSource | null {
  for (const h of AI_REFERRER_HOSTS) {
    if (host === h || host.endsWith(`.${h}`)) return h;
  }
  return null;
}

/** Détecte une source IA depuis referrer ou `utm_source=chatgpt.com`. */
export function detectAiTrafficSource(referrer: string, search: string): AiTrafficSource | null {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const utm = params.get('utm_source')?.toLowerCase();
  if (utm === 'chatgpt.com' || utm === 'chatgpt') return 'chatgpt.com';

  if (referrer) {
    const host = hostFromReferrer(referrer);
    if (host) {
      const matched = matchAiHost(host);
      if (matched) return matched;
    }
  }
  return null;
}

/** Persiste la source IA pour la session (clics CTA ultérieurs). */
export function persistAiTrafficSource(source: AiTrafficSource): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(AI_TRAFFIC_STORAGE_KEY, source);
  } catch {
    /* quota / mode privé */
  }
}

export function readPersistedAiTrafficSource(): AiTrafficSource | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = sessionStorage.getItem(AI_TRAFFIC_STORAGE_KEY);
    return v as AiTrafficSource | null;
  } catch {
    return null;
  }
}
