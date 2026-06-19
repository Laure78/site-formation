import Image from 'next/image';
import Link from 'next/link';
import { Download, Layers, Sparkles } from 'lucide-react';
import { TUTOS } from '@/lib/tutos';
import { RESSOURCES_THEMATIC_BLOCKS } from '@/lib/ressources-thematic-hub';
import { PHOTOS } from '@/lib/photos';

const QUICK_LINKS = [
  { href: '#hub-par-theme', label: 'Par thématique' },
  { href: '#tutoriels-pdf', label: 'Tutoriels PDF' },
  { href: '#aller-plus-loin', label: 'Aller plus loin' },
] as const;

const HERO = PHOTOS.ressourcesIaBtpHero2026;

export function RessourcesHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#F2F2F2]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_-10%,rgba(55,124,243,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
              Tutos &amp; guides offerts
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem]">
              Ressources gratuites IA BTP
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
              Tutos PDF, guides et fiches pratiques pour appliquer l&apos;IA dans ton entreprise BTP.
              Téléchargement libre, sans inscription. Contenus signés Laure Olivié, formatrice IA × BTP — OFC
              Création d&apos;Entreprise (Qualiopi).
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <li className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3]">
                  <Download size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-slate-900">{TUTOS.length}</p>
                  <p className="text-xs text-slate-600">tutoriels PDF</p>
                </div>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3]">
                  <Layers size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-slate-900">
                    {RESSOURCES_THEMATIC_BLOCKS.length}
                  </p>
                  <p className="text-xs text-slate-600">thématiques</p>
                </div>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm sm:col-span-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3]">
                  <Sparkles size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-slate-900">100&nbsp;%</p>
                  <p className="text-xs text-slate-600">gratuit · sans inscription</p>
                </div>
              </li>
            </ul>

            <nav
              aria-label="Accès rapide aux sections"
              className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm md:p-4"
            >
              <span className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:text-sm">
                Aller à
              </span>
              {QUICK_LINKS.map((link, index) => (
                <span key={link.href} className="flex items-center gap-2">
                  {index > 0 ? <span className="hidden text-slate-300 sm:inline" aria-hidden>·</span> : null}
                  <Link
                    href={link.href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#377CF3] shadow-sm transition hover:border-[#377CF3] hover:bg-[#377CF3]/5"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <figure className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-full shadow-[0_20px_48px_-16px_rgba(55,124,243,0.22)] ring-4 ring-white">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                width={HERO.width}
                height={HERO.height}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 280px, 360px"
                priority
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
