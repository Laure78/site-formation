import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — Formations IA BTP`,
    short_name: 'Formations LO',
    description: SITE_CONFIG.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    categories: ['education', 'productivity'],
    lang: 'fr',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      { name: 'Mes formations', short_name: 'Formations', url: '/espace-apprenant/mes-formations', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }] },
      { name: 'Catalogue', short_name: 'Catalogue', url: '/cours', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }] },
      { name: 'Prendre RDV', short_name: 'RDV', url: '/prendre-rdv', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }] },
    ],
  };
}
