import { Download, Layers, Sparkles, BookOpen } from 'lucide-react';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { SiteSearchBar } from '@/components/search/SiteSearchBar';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { PHOTOS } from '@/lib/photos';
import { TUTOS } from '@/lib/tutos';
import { RESSOURCES_THEMATIC_BLOCKS } from '@/lib/ressources-thematic-hub';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';

const QUICK_LINKS = [
  { href: '#hub-par-theme', label: 'Par thématique' },
  { href: '#lexique-btp', label: 'Lexique BTP' },
  { href: '#guides-pdf', label: 'Guides PDF' },
  { href: '#bibliotheque-skills', label: 'Bibliothèque skills' },
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
        { icon: BookOpen, value: RESSOURCES_LEXIQUE.termCount, label: 'termes lexique BTP' },
        { icon: Layers, value: RESSOURCES_THEMATIC_BLOCKS.length, label: 'thématiques' },
        { icon: Sparkles, value: '100 %', label: 'gratuit · sans inscription' },
      ]}
      middle={
        <div className="mt-6 space-y-4">
          <div className="max-w-xl rounded-2xl border border-[#377CF3]/25 bg-[#EFF6FF]/80 p-4 shadow-sm md:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">Nouveau · BeWork</p>
            <p className="mt-2 font-display text-lg font-bold text-slate-900">{RESSOURCES_LEXIQUE.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Parcours, dictionnaire, flashcards et quiz — vocabulaire marchés publics et chantier, sans inscription.
            </p>
            <ExternalLinkAnchor
              href={RESSOURCES_LEXIQUE.url}
              title="Ouvrir le lexique BTP sur app.laureolivie.fr"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
            >
              Ouvrir le lexique
            </ExternalLinkAnchor>
          </div>
          <div className="max-w-xl">
            <SiteSearchBar scope="ressources" />
          </div>
        </div>
      }
      quickLinks={QUICK_LINKS}
      heroVisual={PHOTOS.ressourcesIaBtpHero2026}
    />
  );
}
