import Link from 'next/link';
import { ArrowRight, Briefcase, Download, BookOpen, Sparkles } from 'lucide-react';
import { MarketingLightHero } from '@/components/marketing/MarketingLightHero';
import { SiteSearchBar } from '@/components/search/SiteSearchBar';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { PHOTOS } from '@/lib/photos';
import { TUTOS } from '@/lib/tutos';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';

const QUICK_LINKS = [
  { href: '#hub-par-theme', label: 'Appels d’offres & marchés' },
  { href: '#lexique-btp', label: 'Lexique BTP' },
  { href: '#guides-pdf', label: 'Guides PDF' },
  { href: '#bibliotheque-skills', label: 'Bibliothèque skills' },
  { href: '#tutoriels-pdf', label: 'Tutoriels PDF' },
  { href: '#aller-plus-loin', label: 'Aller plus loin' },
] as const;

export function RessourcesHero() {
  return (
    <MarketingLightHero
      eyebrow="Tutos & guides offerts · Île-de-France"
      title="Ressources gratuites IA BTP"
      titleId="ressources-hero-title"
      description={
        <>
          Tutos PDF, guides et skills Claude pour appliquer l&apos;IA sur vos{' '}
          <strong>appels d&apos;offres</strong>, DCE, mémoires techniques et documents de chantier — destinés aux
          PME et pros du BTP en <strong>Île-de-France</strong> et en France. Contenus signés Laure Olivié, formatrice
          IA × BTP — OFC Création d&apos;Entreprise (Qualiopi). Téléchargement libre, sans inscription.
        </>
      }
      stats={[
        { icon: Briefcase, value: 'AO', label: 'DCE, CCAP, mémoires', href: '#hub-par-theme' },
        { icon: Download, value: TUTOS.length, label: 'tutoriels PDF', href: '#tutoriels-pdf' },
        { icon: BookOpen, value: RESSOURCES_LEXIQUE.termCount, label: 'termes lexique BTP', href: '#lexique-btp' },
        { icon: Sparkles, value: '100 %', label: 'gratuit · sans inscription', href: '#hub-par-theme' },
      ]}
      middle={
        <div className="mt-6 space-y-4">
          <div className="max-w-xl rounded-2xl border border-[#377CF3]/25 bg-[#EFF6FF]/80 p-4 shadow-sm md:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              À la une · Appels d&apos;offres &amp; marchés
            </p>
            <p className="mt-2 font-display text-lg font-bold text-slate-900">
              Analyser un DCE, un CCAP et un mémoire avec l&apos;IA
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Tutos PDF, guides et articles pour les marchés publics et privés — méthode terrain pour conducteurs
              de travaux, chargés d&apos;affaires et dirigeants PME BTP.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="#hub-par-theme"
                className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
              >
                Voir appels d&apos;offres &amp; marchés
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="max-w-xl">
            <SiteSearchBar scope="ressources" />
            <p className="mt-2 text-xs text-slate-500">
              Aussi :{' '}
              <ExternalLinkAnchor
                href={RESSOURCES_LEXIQUE.url}
                title="Ouvrir le lexique BTP sur app.laureolivie.fr"
                className="font-medium text-[#377CF3] hover:underline"
              >
                lexique BTP BeWork
              </ExternalLinkAnchor>{' '}
              (146 termes, flashcards, quiz).
            </p>
          </div>
        </div>
      }
      quickLinks={QUICK_LINKS}
      heroVisual={PHOTOS.ressourcesIaBtpHero2026}
    />
  );
}
