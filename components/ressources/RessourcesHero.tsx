import { Download, Layers, Sparkles } from 'lucide-react';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { SiteSearchBar } from '@/components/search/SiteSearchBar';
import { PHOTOS } from '@/lib/photos';
import { TUTOS } from '@/lib/tutos';
import { RESSOURCES_THEMATIC_BLOCKS } from '@/lib/ressources-thematic-hub';

const QUICK_LINKS = [
  { href: '#hub-par-theme', label: 'Par thématique' },
  { href: '#lexique-btp', label: 'Lexique BTP' },
  { href: '#guides-pdf', label: 'Guides PDF' },
  { href: '#tutoriels-pdf', label: 'Tutoriels PDF' },
  { href: '#aller-plus-loin', label: 'Aller plus loin' },
] as const;

export function RessourcesHero() {
  return (
    <MarketingLightHero
      eyebrow="Tutos & guides offerts"
      title="Ressources gratuites IA BTP"
      titleId="ressources-hero-title"
      description={
        <>
          Tutos PDF, guides, lexique BTP interactif et fiches pratiques pour appliquer l&apos;IA dans ton entreprise
          BTP. Téléchargement libre, sans inscription. Contenus signés Laure Olivié, formatrice IA × BTP — OFC
          Création d&apos;Entreprise (Qualiopi).
        </>
      }
      stats={[
        { icon: Download, value: TUTOS.length, label: 'tutoriels PDF' },
        { icon: Layers, value: RESSOURCES_THEMATIC_BLOCKS.length, label: 'thématiques' },
        { icon: Sparkles, value: '100 %', label: 'gratuit · sans inscription' },
      ]}
      middle={
        <div className="mt-6 max-w-xl">
          <SiteSearchBar scope="ressources" />
        </div>
      }
      quickLinks={QUICK_LINKS}
      heroVisual={PHOTOS.ressourcesIaBtpHero2026}
    />
  );
}
