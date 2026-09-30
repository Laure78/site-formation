/**
 * Origine publique du site pour URLs de callback (Stripe, etc.).
 * Ne jamais faire confiance à l’en-tête Origin / Referer du client.
 */
const ALLOWED_HOSTS = new Set([
  'www.laureolivie.fr',
  'laureolivie.fr',
  'localhost',
  '127.0.0.1',
]);

export function getSafeSiteOrigin(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr').replace(
    /\/$/,
    ''
  );
  try {
    const u = new URL(configured);
    if (ALLOWED_HOSTS.has(u.hostname) || u.hostname.endsWith('.vercel.app')) {
      return `${u.protocol}//${u.host}`;
    }
  } catch {
    // fallback ci-dessous
  }
  return 'https://www.laureolivie.fr';
}
