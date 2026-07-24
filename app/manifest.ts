import type { MetadataRoute } from 'next';
import { SITE_FAVICON_CACHE_BUST } from '@/lib/photos';
import { SITE_CONFIG } from '@/lib/seo';

const icon192 = `/icon-192.png?v=${SITE_FAVICON_CACHE_BUST}`;
const icon512 = `/icon-512.png?v=${SITE_FAVICON_CACHE_BUST}`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — Formations IA pour le BTP`,
    short_name: 'Formations LO',
    description: SITE_CONFIG.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#377CF3',
    categories: ['education', 'productivity'],
    lang: 'fr',
    // Aligné sur le logo Navbar (avatar) — même assets que layout `icons`.
    icons: [
      {
        src: icon192,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: icon512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: icon512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Mes formations',
        short_name: 'Formations',
        url: '/espace-apprenant/mes-formations',
        icons: [{ src: icon192, sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Catalogue',
        short_name: 'Catalogue',
        url: '/formations',
        icons: [{ src: icon192, sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Prendre RDV',
        short_name: 'RDV',
        url: '/prendre-rdv',
        icons: [{ src: icon192, sizes: '192x192', type: 'image/png' }],
      },
    ],
  };
}
