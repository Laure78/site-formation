import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  MapPin,
  Menu,
  Search,
  User,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.demoCursorFfbHome;

export const metadata = createPageMetadata({
  title: 'Démo Cursor — reconstitution visuelle (noindex)',
  description:
    'Page démo interne noindex — reconstitution UI pour démonstration Cursor. Non affiliée à la Fédération Française du Bâtiment. Formation IA pour le BTP.',
  path: PATH,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appendAuthorSuffix: false,
});

const FOCUS_ITEMS = [
  {
    title: 'Le PLF de la dernière chance pour le bâtiment',
    published: 'Publié le 15/09/2026 à 8:01',
  },
  {
    title: "MaPrimeRénov' : ce qui change au 1er septembre 2026",
    published: 'Publié le 31/08/2026 à 15:13',
  },
  {
    title: 'Evaluation des risques : votre DUER est-il à jour ?',
    published: 'Publié le 26/08/2026 à 12:06',
  },
] as const;

/** Couleurs proches de la charte fédérale (démo uniquement). */
const FFB_BLUE = '#003DA5';
const FFB_ORANGE = '#F15A22';
const FFB_GREEN = '#7CB82F';

function DemoFfbMark() {
  return (
    <div className="flex items-center gap-2.5" aria-hidden>
      <div className="flex h-9 items-end gap-0.5">
        <span className="h-5 w-2 rounded-sm bg-[#1E4DB7]" />
        <span className="h-7 w-2 rounded-sm bg-[#2E6BFF]" />
        <span className="h-9 w-2 rounded-sm bg-[#7CB82F]" />
      </div>
      <div className="leading-tight">
        <p className="text-lg font-black tracking-tight text-[#1E3A8A]">FFB</p>
        <p className="max-w-[9rem] text-[8px] font-semibold uppercase leading-snug tracking-wide text-[#1E3A8A]/90">
          Fédération Française du Bâtiment
        </p>
      </div>
    </div>
  );
}

/**
 * Démo Cursor — reconstitution visuelle type home fédérale BTP.
 * noindex, hors navigation, non affiliée à la FFB.
 */
export default function DemoCursorFfbHomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased [-webkit-font-smoothing:antialiased]">
      {/* Bandeau légal démo */}
      <div className="sticky top-0 z-50 border-b border-amber-300 bg-amber-50 px-4 py-2.5 text-center text-xs leading-snug text-amber-950 md:text-sm">
        <strong>Démonstration Cursor</strong> — reconstitution visuelle à des fins de présentation
        client. <strong>Non affiliée</strong> à la Fédération Française du Bâtiment · page{' '}
        <code className="rounded bg-amber-100 px-1">noindex</code> ·{' '}
        <Link href={LINKS.home} className="font-semibold underline underline-offset-2">
          Retour laureolivie.fr
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:py-4">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800"
            aria-label="Menu (démo)"
          >
            <Menu size={20} strokeWidth={2} />
            MENU
          </button>

          <DemoFfbMark />

          <div className="order-last w-full md:order-none md:mx-4 md:min-w-0 md:flex-1">
            <label className="relative block">
              <span className="sr-only">Rechercher sur le site</span>
              <input
                type="search"
                placeholder="Rechercher sur le site"
                readOnly
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003DA5]/25"
              />
              <Search
                size={18}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003DA5]"
                aria-hidden
              />
            </label>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#003DA5] md:ml-0"
          >
            <MapPin size={16} aria-hidden />
            <span className="hidden sm:inline">Trouver ma fédération</span>
            <span className="sm:hidden">Fédération</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#003DA5] px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            <User size={16} aria-hidden />
            Me connecter
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <p className="text-sm font-medium" style={{ color: FFB_GREEN }}>
          Accueil
        </p>
      </div>

      {/* Hero */}
      <section className="relative mt-3 overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="relative min-h-[280px] overflow-hidden rounded-sm md:min-h-[340px]">
            <Image
              src={PHOTOS.ouvrierConfiant.src}
              alt=""
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, rgba(0,40,120,0.82) 0%, rgba(0,61,165,0.55) 45%, rgba(15,30,80,0.75) 100%)',
              }}
            />
            {/* HUD décoratif */}
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
              <div className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full border-2 border-cyan-300/60" />
              <div className="absolute right-[18%] top-[28%] h-16 w-16 rounded-full border border-sky-200/50" />
              <div className="absolute bottom-[22%] left-[8%] h-2 w-28 rounded bg-sky-300/50" />
              <div className="absolute bottom-[18%] left-[8%] h-2 w-20 rounded bg-cyan-200/40" />
              <div className="absolute right-[28%] bottom-[30%] grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-2 w-2 rounded-sm bg-white/30" />
                ))}
              </div>
            </div>
            <div className="relative flex min-h-[280px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[340px]">
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white drop-shadow md:text-5xl">
                La FFB à vos côtés au quotidien
              </h1>
              <button
                type="button"
                className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#003DA5] shadow-lg transition hover:bg-slate-50"
              >
                Découvrir la FFB
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Focus + Outils */}
      <section className="mx-auto mt-6 max-w-6xl px-4 pb-4">
        <div className="grid gap-4 lg:grid-cols-[1.55fr_0.9fr]">
          <div className="overflow-hidden rounded-sm border border-slate-100 shadow-sm">
            <div
              className="px-4 py-3 text-center text-lg font-bold text-white"
              style={{ backgroundColor: FFB_BLUE }}
            >
              Focus
            </div>
            <div className="relative bg-white">
              <div className="grid divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                {FOCUS_ITEMS.map((item) => (
                  <article key={item.title} className="flex flex-col px-5 py-6">
                    <h2 className="text-[15px] font-bold leading-snug text-slate-900">
                      {item.title}
                    </h2>
                    <p className="mt-auto pt-6 text-xs text-slate-400">{item.published}</p>
                  </article>
                ))}
              </div>
              <button
                type="button"
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#003DA5] p-2 text-white shadow md:inline-flex"
                aria-label="Voir plus (démo)"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <aside
            className="flex flex-col items-start justify-center rounded-sm px-8 py-10 text-white shadow-sm"
            style={{ backgroundColor: FFB_ORANGE }}
          >
            <h2 className="text-3xl font-bold tracking-tight">Nos outils</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/95">
              Pour les TPE et PME du bâtiment
            </p>
            <button
              type="button"
              className="mt-8 rounded-full bg-white px-6 py-2.5 text-sm font-bold shadow"
              style={{ color: FFB_ORANGE }}
            >
              Voir les outils
            </button>
          </aside>
        </div>
      </section>

      {/* Actualités */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
              Actualités
            </h2>
            <button
              type="button"
              className="text-sm font-medium text-[#003DA5] underline-offset-2 hover:underline"
            >
              Mes actualités locales et nationales {'>'}
            </button>
          </div>
          <button
            type="button"
            className="self-start rounded-md border border-[#003DA5] bg-white px-4 py-2 text-sm font-semibold text-[#003DA5]"
          >
            Masquer les réunions
          </button>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Démarchage téléphonique : mettez-vous à jour',
            "Sécheresse et restrictions d'eau : impacts et solutions",
            "Présentation de l'ESJDB : compétences de dirigeant",
          ].map((title) => (
            <li
              key={title}
              className="rounded-lg border border-slate-100 bg-slate-50/80 px-5 py-4 text-sm font-semibold text-slate-800"
            >
              {title}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-slate-400">
          Démo OFC / Laure Olivié · {SITE_CONFIG.url.replace(/^https?:\/\//, '')} · réalisé avec
          Cursor
        </p>
      </section>
    </div>
  );
}
