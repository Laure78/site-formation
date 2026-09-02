import {
  INDEXNOW_API_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILE_URL,
  INDEXNOW_MAX_URLS_PER_REQUEST,
} from '@/lib/indexnow-config';
import { dedupeValidIndexNowUrls } from '@/lib/indexnow-url-map';

export type IndexNowSubmitResult = {
  ok: boolean;
  status: number;
  statusText: string;
  urlCount: number;
  urls: string[];
  message: string;
};

export type IndexNowSubmitOptions = {
  /** Délai ms avant retry unique en cas de 429 */
  retryAfterMs?: number;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

async function postIndexNowBatch(urls: string[]): Promise<Response> {
  const body = JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_FILE_URL,
    urlList: urls,
  });

  return fetch(INDEXNOW_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body,
  });
}

function interpretStatus(status: number): string {
  switch (status) {
    case 200:
    case 202:
      return 'Soumission reçue par IndexNow.';
    case 400:
      return 'Requête invalide (format JSON ou paramètres).';
    case 403:
      return 'Clé IndexNow invalide ou fichier de vérification inaccessible.';
    case 422:
      return 'URL ou propriété incohérente avec la clé / le host.';
    case 429:
      return 'Trop de requêtes — réessayer plus tard.';
    default:
      return `Réponse HTTP ${status}.`;
  }
}

/**
 * Soumet des URL à IndexNow (serveur uniquement).
 * Valide, déduplique, normalise — refuse les URL hors www.laureolivie.fr.
 */
export async function submitIndexNow(
  urls: readonly string[],
  options: IndexNowSubmitOptions = {},
): Promise<IndexNowSubmitResult> {
  const valid = dedupeValidIndexNowUrls(urls);

  if (valid.length === 0) {
    return {
      ok: false,
      status: 0,
      statusText: 'skipped',
      urlCount: 0,
      urls: [],
      message: 'Aucune URL valide après normalisation.',
    };
  }

  const batches = chunk(valid, INDEXNOW_MAX_URLS_PER_REQUEST);
  let lastStatus = 0;
  let lastStatusText = '';

  for (const batch of batches) {
    let response = await postIndexNowBatch(batch);
    lastStatus = response.status;
    lastStatusText = response.statusText;

    if (response.status === 429 && options.retryAfterMs && options.retryAfterMs > 0) {
      await new Promise((r) => setTimeout(r, options.retryAfterMs));
      response = await postIndexNowBatch(batch);
      lastStatus = response.status;
      lastStatusText = response.statusText;
    }

    if (lastStatus !== 200 && lastStatus !== 202) {
      return {
        ok: false,
        status: lastStatus,
        statusText: lastStatusText,
        urlCount: valid.length,
        urls: valid,
        message: interpretStatus(lastStatus),
      };
    }
  }

  return {
    ok: true,
    status: 200,
    statusText: lastStatusText || 'OK',
    urlCount: valid.length,
    urls: valid,
    message: interpretStatus(200),
  };
}
