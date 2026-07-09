'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  BookOpen,
  UserCircle,
  Home,
  CircleDollarSign,
  Sparkles,
  Layers,
  FileText,
  HardHat,
  ShieldCheck,
  Cpu,
  Landmark,
  LogIn,
} from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { CATALOGUE_FORMATIONS_NAV_LINKS } from '@/lib/catalogue-formations-nav';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS, SITE_LOGO_ALT, SITE_LOGO_TITLE } from '@/lib/photos';
import { TUTOS, TUTO_CATEGORY_META, TUTO_CATEGORY_ORDER } from '@/lib/tutos';
import { RESSOURCES_GUIDES } from '@/lib/ressources-guides';
import { SiteSearchTrigger } from '@/components/search/SiteSearchTrigger';
import { FormationPlateformeConnexionButton } from '@/components/formation/FormationPlateformeConnexionButton';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { TEACHIZY_PATHS } from '@/lib/external-site-urls';

import type { LucideIcon } from 'lucide-react';
import type { TutoCategoryId } from '@/lib/tutos';

/** Icône par rubrique pour le mega-menu Tutos — cohérent desktop / mobile. */
const TUTO_NAV_SECTION_ICON: Record<TutoCategoryId, LucideIcon> = {
  'marches-et-veille': FileText,
  'chantier-livrables': HardHat,
  'qse-conformite': ShieldCheck,
  productivite: Cpu,
};

type MegaLink = {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
};

type NavMega = {
  id: string;
  label: string;
  /** Lien « tout voir » sous le menu desktop (optionnel). */
  allLabel?: string;
  allHref?: string;
  columns: { title: string; links: MegaLink[] }[];
  navIcon: LucideIcon;
};

const FORMATIONS_MEGA: NavMega = {
  id: 'formations',
  label: 'Formations',
  navIcon: GraduationCap,
  columns: [
    {
      title: 'Nos formations',
      links: CATALOGUE_FORMATIONS_NAV_LINKS,
    },
  ],
};

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return pathname === '/';
  if (href.includes('#')) {
    const path = href.split('#')[0];
    if (!path || path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  }
  return pathname === href || pathname.startsWith(href + '/');
}

function FormationsDropdownPanel({
  mega,
  pathname,
}: {
  mega: NavMega;
  pathname: string;
}) {
  return (
    <div className="absolute left-0 top-full z-[60] min-w-[min(100vw-2rem,22rem)] max-w-[min(100vw-2rem,26rem)] pt-2">
      <div className="rounded-2xl border border-slate-200/80 bg-white py-2 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]">
        <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain px-2 pt-1">
          {mega.columns.map((col) => (
            <div key={col.title}>
              <p className="px-3 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {col.title}
              </p>
              <ul className="space-y-0.5 pb-2">
                {col.links.map((link) => {
                  const ItemIcon = link.icon;
                  const linkActive = isActive(link.href, pathname);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                          linkActive
                            ? 'bg-slate-50 font-medium text-[var(--accent)]'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <ItemIcon
                          size={20}
                          strokeWidth={1.75}
                          className={`mt-0.5 shrink-0 ${linkActive ? 'text-[var(--accent)]' : 'text-slate-400'}`}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.9375rem] leading-snug">{link.label}</span>
                          {link.description ? (
                            <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                              {link.description}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 px-3 py-3">
          <p className="px-1 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Espace apprenant
          </p>
          <div className="flex flex-col gap-2">
            <ExternalLinkAnchor
              href={TEACHIZY_PATHS.login}
              title="Connexion plateforme formation IA BTP"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]"
            >
              <LogIn size={18} strokeWidth={1.75} className="shrink-0" aria-hidden />
              Connexion plateforme
            </ExternalLinkAnchor>
            <Link
              href={LINKS.formationPlateforme}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#377CF3]"
            >
              En savoir plus
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function formationsDropdownActive(pathname: string): boolean {
  if (pathname.startsWith('/formations')) return true;
  return CATALOGUE_FORMATIONS_NAV_LINKS.some((l) => isActive(l.href, pathname));
}

function tutosInCategory(cat: TutoCategoryId) {
  return TUTOS.filter((t) => t.category === cat);
}

type TutoNavContext = 'desktop' | 'mobile';

/** Liste Tutos groupée par thématique (alignée sur les rubriques `/ressources/tutos`). */
function ResourcesTutosNavBlocks({
  pathname,
  ctx,
  onNavigate,
}: {
  pathname: string;
  ctx: TutoNavContext;
  /** Fermeture drawer mobile après clic lien */
  onNavigate?: () => void;
}) {
  const dense = ctx === 'mobile';
  const paddingY = dense ? 'py-3' : 'py-2.5';
  const iconSz = dense ? 18 : 20;
  const strokeW = dense ? undefined : (1.75 as const);

  const categoryBlocks = TUTO_CATEGORY_ORDER.map((catId) => {
    const items = tutosInCategory(catId);
    if (!items.length) return null;
    const SectionIcon = TUTO_NAV_SECTION_ICON[catId];
    const label = TUTO_CATEGORY_META[catId].pillLabel;

    return (
      <div
        key={catId}
        className="mb-2 rounded-xl border border-slate-200/80 bg-[#F2F2F2] px-1.5 py-1.5 last:mb-0"
      >
        <p className="px-2.5 pb-1 pt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
        <ul className="space-y-0.5">
          {items.map((tuto) => {
            const href = `${LINKS.ressources}/${tuto.slug}`;
            const linkActive = isActive(href, pathname);
            return (
              <li key={tuto.slug}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={`flex gap-3 rounded-lg px-2.5 ${paddingY} transition-colors ${
                    dense
                      ? linkActive
                        ? 'bg-white font-medium text-[var(--accent)] shadow-sm'
                        : 'text-slate-800 hover:bg-white/80'
                      : linkActive
                        ? 'bg-white font-medium text-[var(--accent)] shadow-sm'
                        : 'text-slate-800 hover:bg-white/90'
                  }`}
                >
                  <SectionIcon
                    size={iconSz}
                    strokeWidth={strokeW ?? 1.75}
                    className={`mt-0.5 shrink-0 ${linkActive ? 'text-[var(--accent)]' : 'text-slate-400'}`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] leading-snug">{tuto.shortTitle}</span>
                    <span className={`mt-1 block text-xs text-slate-500`}>
                      Tuto PDF · {tuto.totalTimeMinutes} min
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  return <>{categoryBlocks}</>;
}

function ResourcesDropdownPanel({ pathname }: { pathname: string }) {
  const claudeHubLinks: MegaLink[] = [
    {
      href: LINKS.claudeAiBtp,
      label: 'Claude AI BTP',
      description: 'Guide complet : interfaces, limites techniques, parcours formations',
      icon: Sparkles,
    },
  ];
  const guideLinks: MegaLink[] = RESSOURCES_GUIDES.map((guide, index) => ({
    href: guide.href,
    label: guide.title,
    description: guide.description,
    icon: index === 0 ? Landmark : HardHat,
  }));
  return (
    <div className="absolute left-0 top-full z-[60] min-w-[min(100vw-2rem,24rem)] max-w-[min(100vw-2rem,28rem)] pt-2">
      <div className="rounded-2xl border border-slate-200/80 bg-white py-2 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]">
        <div className="border-b border-slate-100 px-4 pb-3">
          <Link
            href={LINKS.ressources}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent)]/90"
          >
            Voir toutes les ressources
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain px-2 pt-1">
          <p className="px-3 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Tutos par thème
          </p>
          <div className="space-y-1 pb-2">
            <ResourcesTutosNavBlocks pathname={pathname} ctx="desktop" />
          </div>
          <p className="px-3 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Claude AI BTP
          </p>
          <ul className="space-y-0.5 pb-2">
            {claudeHubLinks.map((link) => {
              const ItemIcon = link.icon;
              const linkActive = isActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                      linkActive
                        ? 'bg-slate-50 font-medium text-[var(--accent)]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <ItemIcon
                      size={20}
                      strokeWidth={1.75}
                      className={`mt-0.5 shrink-0 ${linkActive ? 'text-[var(--accent)]' : 'text-slate-400'}`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] leading-snug">{link.label}</span>
                      {link.description ? (
                        <span className="mt-1 block text-xs text-slate-500">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="px-3 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Guides PDF
          </p>
          <ul className="space-y-0.5 pb-2">
            {guideLinks.map((link) => {
              const ItemIcon = link.icon;
              const linkActive = isActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                      linkActive
                        ? 'bg-slate-50 font-medium text-[var(--accent)]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <ItemIcon
                      size={20}
                      strokeWidth={1.75}
                      className={`mt-0.5 shrink-0 ${linkActive ? 'text-[var(--accent)]' : 'text-slate-400'}`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] leading-snug">{link.label}</span>
                      {link.description ? (
                        <span className="mt-1 block text-xs text-slate-500">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Seuil scroll (px) — fond compact + compression visuelle du header. */
const HEADER_COMPACT_SCROLL_PX = 80;

/** Barre de navigation unique — importée par `app/layout.tsx` sur toutes les routes. */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFormations, setOpenFormations] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [mobileFormationsOpen, setMobileFormationsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleCloseAll = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenFormations(false);
      setOpenResources(false);
    }, 180);
  };

  const handleEnterFormations = () => {
    clearCloseTimer();
    setOpenFormations(true);
    setOpenResources(false);
  };

  const handleEnterResources = () => {
    clearCloseTimer();
    setOpenResources(true);
    setOpenFormations(false);
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenFormations(false);
    setOpenResources(false);
    setMobileFormationsOpen(false);
    setMobileResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > HEADER_COMPACT_SCROLL_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homeActive = pathname === '/';
  const blogActive = pathname === LINKS.blog || pathname.startsWith(`${LINKS.blog}/`);
  const resourcesNavActive =
    pathname.startsWith('/ressources') || pathname === LINKS.claudeAiBtp;
  const aProposActive = pathname.startsWith('/a-propos');
  const partenairesActive = pathname.startsWith('/partenaires');
  const financementActive =
    pathname === LINKS.financement || pathname.startsWith('/financement-constructys');

  return (
    <>
      <header
        className="site-header"
        data-compact={compact ? 'true' : 'false'}
        onMouseLeave={scheduleCloseAll}
      >
        <div className="site-header__inner">
          <Link href="/" className="site-header__brand">
            <span className="site-header__logo-mark ring-[#377CF3]/25">
              <Image
                src={PHOTOS.siteAvatar.src}
                alt={SITE_LOGO_ALT}
                title={SITE_LOGO_TITLE}
                fill
                className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                sizes="40px"
                priority
              />
            </span>
            <span className="sr-only">Laure Olivié</span>
          </Link>

          <nav
            className="site-header__nav-pill"
            aria-label="Navigation principale"
          >
            <Link
              href="/"
              aria-current={homeActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                homeActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Home size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              Accueil
            </Link>

            <div
              className="relative flex items-stretch"
              onMouseEnter={handleEnterFormations}
              onMouseLeave={scheduleCloseAll}
            >
              <Link
                href={LINKS.formations}
                aria-current={formationsDropdownActive(pathname) ? 'page' : undefined}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full py-2 pl-3 pr-1.5 text-sm font-medium transition-all xl:pl-3.5 xl:text-[0.9375rem] ${
                  formationsDropdownActive(pathname) || openFormations
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {FORMATIONS_MEGA.label}
              </Link>
              <button
                type="button"
                aria-expanded={openFormations}
                aria-haspopup="true"
                aria-label="Ouvrir le menu des formations"
                className={`flex items-center rounded-full py-2 pr-2.5 pl-0.5 text-slate-500 transition-colors xl:pr-3 ${
                  openFormations ? 'text-slate-800' : 'hover:text-slate-700'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  clearCloseTimer();
                  setOpenFormations((v) => !v);
                  setOpenResources(false);
                }}
              >
                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`shrink-0 transition-transform duration-200 ${
                    openFormations ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
              {openFormations && (
                <FormationsDropdownPanel mega={FORMATIONS_MEGA} pathname={pathname} />
              )}
            </div>

            <Link
              href={LINKS.financement}
              aria-current={financementActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                financementActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CircleDollarSign size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              Financement
            </Link>

            <div
              className="relative flex items-stretch"
              onMouseEnter={handleEnterResources}
              onMouseLeave={scheduleCloseAll}
            >
              <Link
                href={LINKS.ressources}
                aria-current={resourcesNavActive ? 'page' : undefined}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full py-2 pl-3 pr-1.5 text-sm font-medium transition-all xl:pl-3.5 xl:text-[0.9375rem] ${
                  resourcesNavActive || openResources
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Ressources
              </Link>
              <button
                type="button"
                aria-expanded={openResources}
                aria-haspopup="true"
                aria-label="Ouvrir le menu Ressources"
                className={`flex items-center rounded-full py-2 pr-2.5 pl-0.5 text-slate-500 transition-colors xl:pr-3 ${
                  openResources ? 'text-slate-800' : 'hover:text-slate-700'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  clearCloseTimer();
                  setOpenResources((v) => !v);
                  setOpenFormations(false);
                }}
              >
                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`shrink-0 transition-transform duration-200 ${
                    openResources ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
              {openResources && <ResourcesDropdownPanel pathname={pathname} />}
            </div>

            <Link
              href={LINKS.blog}
              aria-current={blogActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                blogActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <BookOpen size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              Blog
            </Link>

            <Link
              href={LINKS.partenaires}
              aria-current={partenairesActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                partenairesActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Landmark size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              Partenaires
            </Link>

            <Link
              href="/a-propos"
              aria-current={aProposActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                aProposActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <UserCircle size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              À propos
            </Link>
          </nav>

          <div className="site-header__search hidden lg:flex">
            <SiteSearchTrigger className="px-3 py-2" />
          </div>

          <div className="site-header__actions hidden shrink-0 items-center gap-2 lg:flex">
            <FormationPlateformeConnexionButton variant="nav" />
            <CalendlyEmbed
              type="link"
              variant="nav"
              ctaPosition="inline"
              ctaId="nav-rdv-desktop"
              utmSource="site"
              utmMedium="cta"
              campaign="nav-prendre-rdv"
              buttonText="Prendre RDV"
            />
          </div>

          <div className="site-header__rdv-mobile">
            <CalendlyEmbed
              type="link"
              variant="nav"
              ctaPosition="inline"
              ctaId="nav-rdv-mobile-bar"
              utmSource="site"
              utmMedium="cta"
              campaign="nav-prendre-rdv-mobile-bar"
              buttonText="Prendre RDV"
              className="max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-xs"
            />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <SiteSearchTrigger className="p-2.5" />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
            <SiteSearchTrigger className="px-2 py-2" showLabel />
            <span className="font-display text-lg font-bold text-slate-900">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-label="Navigation mobile">
            <div className="border-b border-slate-100 py-1">
              <Link
                href="/"
                aria-current={homeActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                  homeActive ? 'text-[var(--accent)]' : 'text-slate-900'
                }`}
              >
                <Home
                  size={18}
                  strokeWidth={1.75}
                  className={homeActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                />
                Accueil
              </Link>
            </div>

            <div className="border-b border-slate-100 py-1">
              <div className="flex items-stretch">
                <Link
                  href={LINKS.formations}
                  aria-current={formationsDropdownActive(pathname) ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-semibold ${
                    formationsDropdownActive(pathname) ? 'text-[var(--accent)]' : 'text-slate-900'
                  }`}
                >
                  <GraduationCap
                    size={18}
                    strokeWidth={1.75}
                    className={formationsDropdownActive(pathname) ? 'text-[var(--accent)]' : 'text-slate-400'}
                  />
                  {FORMATIONS_MEGA.label}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileFormationsOpen((v) => !v)}
                  aria-expanded={mobileFormationsOpen}
                  aria-label="Afficher le catalogue des formations"
                  className="flex shrink-0 items-center px-2 text-slate-400"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileFormationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
              {mobileFormationsOpen && (
                <div className="pb-2 pl-1">
                  <ul className="space-y-0.5">
                    {FORMATIONS_MEGA.columns[0].links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex gap-3 rounded-xl px-3 py-3 ${
                              isActive(link.href, pathname)
                                ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                                : 'text-slate-800'
                            }`}
                          >
                            <Icon size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-slate-400" />
                            <span>
                              <span className="block text-[0.9375rem]">{link.label}</span>
                              {link.description ? (
                                <span className="mt-0.5 block text-xs text-slate-500">
                                  {link.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <ExternalLinkAnchor
                      href={TEACHIZY_PATHS.login}
                      title="Connexion plateforme formation"
                      className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#377CF3]"
                    >
                      <LogIn size={18} strokeWidth={1.75} aria-hidden />
                      Connexion plateforme
                    </ExternalLinkAnchor>
                    <Link
                      href={LINKS.formationPlateforme}
                      onClick={() => setMobileOpen(false)}
                      className="mt-1 block px-3 py-1 text-xs font-medium text-slate-500 hover:text-[#377CF3]"
                    >
                      Espace apprenant — en savoir plus
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 py-1">
              <Link
                href={LINKS.financement}
                aria-current={financementActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                  financementActive ? 'text-[var(--accent)]' : 'text-slate-900'
                }`}
              >
                <CircleDollarSign
                  size={18}
                  strokeWidth={1.75}
                  className={financementActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                />
                Financement
              </Link>
            </div>

            <div className="border-b border-slate-100 py-1">
              <div className="flex items-stretch">
                <Link
                  href={LINKS.ressources}
                  aria-current={resourcesNavActive ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-semibold ${
                    resourcesNavActive ? 'text-[var(--accent)]' : 'text-slate-900'
                  }`}
                >
                  <Layers
                    size={18}
                    strokeWidth={1.75}
                    className={resourcesNavActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                  />
                  Ressources
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileResourcesOpen((v) => !v)}
                  aria-expanded={mobileResourcesOpen}
                  aria-label="Afficher le détail des ressources"
                  className="flex shrink-0 items-center px-2 text-slate-400"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
              {mobileResourcesOpen && (
                <div className="pb-2 pl-1">
                  <Link
                    href={LINKS.ressources}
                    onClick={() => setMobileOpen(false)}
                    className="mb-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    Voir toutes les ressources
                    <ArrowRight size={14} />
                  </Link>
                  <p className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Tutos par thème
                  </p>
                  <ResourcesTutosNavBlocks
                    pathname={pathname}
                    ctx="mobile"
                    onNavigate={() => setMobileOpen(false)}
                  />
                  <p className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Claude AI BTP
                  </p>
                  <Link
                    href={LINKS.claudeAiBtp}
                    onClick={() => setMobileOpen(false)}
                    className={`mb-2 flex gap-3 rounded-xl px-3 py-3 ${
                      isActive(LINKS.claudeAiBtp, pathname)
                        ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                        : 'text-slate-800'
                    }`}
                  >
                    <Sparkles size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>
                      <span className="block text-[0.9375rem]">Guide Claude AI BTP</span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Interfaces BTP, limites et parcours formation
                      </span>
                    </span>
                  </Link>
                  <p className="px-3 pb-2 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Guides PDF
                  </p>
                  {RESSOURCES_GUIDES.map((guide, index) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      onClick={() => setMobileOpen(false)}
                      className={`mb-2 flex gap-3 rounded-xl px-3 py-3 ${
                        isActive(guide.href, pathname)
                          ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                          : 'text-slate-800'
                      }`}
                    >
                      {index === 0 ? (
                        <Landmark size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-slate-400" />
                      ) : (
                        <HardHat size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-slate-400" />
                      )}
                      <span>
                        <span className="block text-[0.9375rem]">{guide.title}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{guide.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 py-1">
              <Link
                href={LINKS.blog}
                aria-current={blogActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                  blogActive ? 'text-[var(--accent)]' : 'text-slate-900'
                }`}
              >
                <BookOpen
                  size={18}
                  strokeWidth={1.75}
                  className={blogActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                />
                Blog
              </Link>
            </div>

            <div className="border-b border-slate-100 py-1">
              <Link
                href={LINKS.partenaires}
                aria-current={partenairesActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                  partenairesActive ? 'text-[var(--accent)]' : 'text-slate-900'
                }`}
              >
                <Landmark
                  size={18}
                  strokeWidth={1.75}
                  className={partenairesActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                />
                Partenaires
              </Link>
            </div>

            <div className="border-b border-slate-100 py-1">
              <Link
                href="/a-propos"
                aria-current={aProposActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                  aProposActive ? 'text-[var(--accent)]' : 'text-slate-900'
                }`}
              >
                <UserCircle
                  size={18}
                  strokeWidth={1.75}
                  className={aProposActive ? 'text-[var(--accent)]' : 'text-slate-400'}
                />
                À propos
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">
              <FormationPlateformeConnexionButton variant="navMobile" label="Connexion plateforme" />
              <CalendlyEmbed
                type="link"
                variant="primary"
                ctaPosition="inline"
                ctaId="nav-rdv-mobile"
                utmSource="site"
                utmMedium="cta"
                campaign="nav-prendre-rdv-mobile"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-full px-4 py-4 text-center text-[0.9375rem]"
                buttonText="Prendre RDV"
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
