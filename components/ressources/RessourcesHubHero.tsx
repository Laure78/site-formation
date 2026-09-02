import Link from 'next/link';
import { ArrowRight, BookOpen, Download, Sparkles } from 'lucide-react';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { PHOTOS } from '@/lib/photos';
import { getRessourcesCounts, RESSOURCES_HUB_H1 } from '@/lib/ressources-catalog';

export function RessourcesHubHero() {
  const counts = getRessourcesCounts();

  return (
    <MarketingLightHero
      eyebrow="Guides, tutos et outils pratiques"
      title={RESSOURCES_HUB_H1}
      titleId="ressources-hero-title"
      description={
        <>
          Guides, tutoriels et outils pratiques pour les devis, les appels d&apos;offres, les documents de chantier
          et les fonctions support — conçus pour les professionnels du BTP.
        </>
      }
      stats={[
        { icon: Download, value: counts.guides + counts.tutoriels, label: 'guides et tutos', href: '#guides-pdf' },
        { icon: Sparkles, value: counts.skills, label: 'skills Claude', href: '#bibliotheque-ressources' },
        { icon: BookOpen, value: counts.lexiqueTermes, label: 'termes lexique BTP', href: '#bibliotheque-ressources' },
      ]}
      middle={
        <div className="mt-6 space-y-4">
          <p className="max-w-xl text-sm text-slate-600">
            PDF, modèles et outils · Accès libre · Pour les professionnels du BTP
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#recherche-ressources"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
            >
              Trouver une ressource
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="#pour-commencer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#377CF3]/40 hover:text-[#377CF3]"
            >
              Voir les ressources populaires
            </Link>
          </div>
        </div>
      }
      heroVisual={PHOTOS.ressourcesIaBtpHero2026}
    />
  );
}
