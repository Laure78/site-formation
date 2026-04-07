'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Home,
  GraduationCap,
  Layers,
  Compass,
  UserCircle,
  BookOpen,
  HardHat,
  FileText,
  TrendingUp,
  Users,
  Building2,
  MessageSquareQuote,
  BarChart3,
  FileStack,
  Mail,
} from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { CATALOGUE_FORMATIONS_NAV_LINKS } from '@/lib/catalogue-formations-nav';

type MegaLink = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type MegaColumn = { title: string; links: MegaLink[] };

type NavMega = {
  kind: 'mega';
  id: string;
  label: string;
  allLabel: string;
  allHref: string;
  columns: MegaColumn[];
  navIcon: LucideIcon;
};

type NavLink = {
  kind: 'link';
  href: string;
  label: string;
  navIcon: LucideIcon;
};

type NavItem = NavMega | NavLink;

const NAV_ITEMS: NavItem[] = [
  {
    kind: 'link',
    href: '/',
    label: 'Accueil',
    navIcon: Home,
  },
  {
    kind: 'mega',
    id: 'formations',
    label: 'Formations IA BTP',
    allLabel: 'Catalogue complet',
    allHref: '/formations',
    navIcon: GraduationCap,
    columns: [
      {
        title: 'Catalogue',
        links: CATALOGUE_FORMATIONS_NAV_LINKS,
      },
    ],
  },
  {
    kind: 'mega',
    id: 'cas-usage',
    label: "Cas d'usage",
    allLabel: "Tous les cas d'usage",
    allHref: '/ressources/ia-btp/10-cas-usage-concrets',
    navIcon: Layers,
    columns: [
      {
        title: 'Par besoin métier',
        links: [
          {
            href: '/ia-conducteur-travaux',
            label: 'Chantier & terrain',
            description: 'Comptes rendus, coordination, gain de temps sur le terrain.',
            icon: HardHat,
          },
          {
            href: '/ia-devis-batiment',
            label: 'Administratif',
            description: 'Devis, relances, suivi administratif et documents.',
            icon: FileText,
          },
          {
            href: '/formations/ia-appels-offre-btp',
            label: 'Commercial & marchés',
            description: "Appels d'offres, mémoires techniques, réponses aux marchés.",
            icon: TrendingUp,
          },
          {
            href: '/formations/ia-rh-btp',
            label: 'RH & recrutement',
            description: 'Annonces, tri de CV, entretiens, intégration des collaborateurs.',
            icon: Users,
          },
        ],
      },
    ],
  },
  {
    kind: 'mega',
    id: 'methode',
    label: 'Méthode',
    allLabel: 'Découvrir la méthode',
    allHref: '/a-propos#approche',
    navIcon: Compass,
    columns: [
      {
        title: 'Comment on travaille',
        links: [
          {
            href: '/a-propos#approche',
            label: 'Approche terrain',
            description: 'Zéro blabla, 100 % pratique sur vos documents réels.',
            icon: Compass,
          },
          {
            href: '/ressources/ia-btp/10-cas-usage-concrets',
            label: 'Cas concrets BTP',
            description: 'Exemples concrets : devis, chantier, administratif, RH.',
            icon: Layers,
          },
          {
            href: '/expert-ia-btp',
            label: 'Résultats obtenus',
            description: 'Expérience, chiffres et référencement Qualiopi / Constructys.',
            icon: BarChart3,
          },
        ],
      },
    ],
  },
  {
    kind: 'mega',
    id: 'a-propos',
    label: 'À propos',
    allLabel: 'Tout savoir',
    allHref: '/a-propos',
    navIcon: UserCircle,
    columns: [
      {
        title: 'Laure Olivié',
        links: [
          {
            href: '/auteur/laure-olivie',
            label: 'Portrait & parcours',
            description: 'Parcours, expertises et contenus pédagogiques.',
            icon: UserCircle,
          },
          {
            href: '/a-propos#clients-partenaires',
            label: 'Références & clients',
            description: 'FFB, organismes, fédérations et partenaires institutionnels.',
            icon: Building2,
          },
          {
            href: '/etudes-de-cas/ffb-csfe',
            label: 'Étude de cas',
            description: 'FFB & CSFE : modules, objectifs terrain et résultats mesurables.',
            icon: FileStack,
          },
          {
            href: '/#temoignages',
            label: 'Témoignages',
            description: 'Avis et retours de professionnels du BTP.',
            icon: MessageSquareQuote,
          },
        ],
      },
    ],
  },
  {
    kind: 'link',
    href: '/blog',
    label: 'Blog',
    navIcon: BookOpen,
  },
];

const RDV_CTA = { href: CALENDLY_BOOKING_URL, label: 'Prendre RDV' as const };

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

/** Colonnes du sous-grille 12 pour les cartes du méga-menu (4, 3 ou 2 items). */
function megaLinkColClass(linkCount: number) {
  if (linkCount >= 4) return 'col-span-12 sm:col-span-6 xl:col-span-3';
  if (linkCount === 3) return 'col-span-12 sm:col-span-6 xl:col-span-4';
  if (linkCount === 2) return 'col-span-12 md:col-span-6';
  return 'col-span-12';
}

function megaHasActivePath(m: NavMega, pathname: string): boolean {
  if (isActive(m.allHref, pathname)) return true;
  if (m.id === 'formations' && pathname.startsWith('/formations')) return true;
  if (m.id === 'cas-usage' && pathname.startsWith('/ressources/ia-btp')) return true;
  if (m.id === 'a-propos' && pathname.startsWith('/etudes-de-cas')) return true;
  return m.columns.some((col) => col.links.some((l) => isActive(l.href, pathname)));
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMega(null), 180);
  };

  const handleEnterMega = (id: string) => {
    clearCloseTimer();
    setOpenMega(id);
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
    setMobileSection(null);
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeMega = NAV_ITEMS.find(
    (item): item is NavMega => item.kind === 'mega' && item.id === openMega
  );

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/88 ${
        scrolled
          ? 'border-slate-200/90 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]'
          : 'border-[var(--header-border)] shadow-none'
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[4.5rem] lg:min-h-[4.5rem]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-slate-900 sm:gap-3 sm:text-xl"
        >
          <img
            src="/logo-lo.svg"
            alt="Laure Olivié — formation intelligence artificielle BTP"
            className="h-8 w-auto sm:h-9"
            width={48}
            height={36}
          />
          <span className="hidden min-[380px]:inline">Laure Olivié</span>
        </Link>

        {/* Desktop */}
        <nav
          className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Navigation principale"
        >
          {NAV_ITEMS.map((item) =>
            item.kind === 'mega' ? (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleEnterMega(item.id)}
              >
                <button
                  type="button"
                  className={`group relative flex items-center gap-1.5 rounded px-3 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                    megaHasActivePath(item, pathname) || openMega === item.id
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={openMega === item.id}
                  aria-haspopup="true"
                >
                  <item.navIcon
                    size={17}
                    strokeWidth={1.75}
                    className="text-slate-400 transition-colors group-hover:text-[var(--accent)]"
                    aria-hidden
                  />
                  {item.label}
                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={`transition-transform duration-200 ${openMega === item.id ? 'rotate-180' : ''}`}
                  />
                  {(megaHasActivePath(item, pathname) || openMega === item.id) && (
                    <span
                      className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-[var(--accent)]"
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-1.5 rounded px-3 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                  isActive(item.href, pathname)
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <item.navIcon
                  size={17}
                  strokeWidth={1.75}
                  className={`transition-colors ${isActive(item.href, pathname) ? 'text-[var(--accent)]' : 'text-slate-400 group-hover:text-[var(--accent)]'}`}
                  aria-hidden
                />
                {item.label}
                {isActive(item.href, pathname) && (
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                )}
              </Link>
            )
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-colors ${
              pathname === '/contact'
                ? 'text-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail size={17} strokeWidth={1.75} className="text-slate-400" aria-hidden />
            <span className="decoration-slate-300 underline-offset-4 hover:underline">
              Écrire
            </span>
          </Link>
          <a
            href={RDV_CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--nav-cta-bg)] px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--nav-cta-hover)] active:scale-[0.98]"
          >
            {RDV_CTA.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {/* Méga-menu plein largeur (desktop) */}
      {activeMega && (
        <div
          className="absolute left-0 right-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_28px_56px_-16px_rgba(15,23,42,0.14)] lg:block"
          onMouseEnter={() => handleEnterMega(activeMega.id)}
        >
          <div className="mx-auto max-w-[1400px] px-5 pb-6 pt-4 sm:px-8">
            <div className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-slate-100 pb-2">
              <div className="col-span-12 lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {activeMega.label}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  {activeMega.id === 'cas-usage'
                    ? 'Choisissez votre contexte : on vous oriente vers les pages et formations les plus pertinentes.'
                    : activeMega.id === 'formations'
                      ? 'Formations IA finançables Qualiopi / OPCO — présentiel et distanciel.'
                      : activeMega.id === 'methode'
                        ? 'Une méthode éprouvée avec des professionnels du bâtiment et des travaux publics.'
                        : 'Transparence sur le parcours, les partenaires et les retours clients.'}
                </p>
              </div>
              <div className="col-span-12 flex items-end justify-start lg:col-span-4 lg:justify-end">
                <Link
                  href={activeMega.allHref}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] sm:w-auto"
                >
                  {activeMega.allLabel}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>

            {activeMega.columns.map((col) => {
              const n = col.links.length;
              const colClass = megaLinkColClass(n);
              return (
                <div key={col.title} className="mt-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {col.title}
                  </p>
                  <ul className="mt-2.5 grid grid-cols-12 gap-4">
                    {col.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.href} className={colClass}>
                          <Link
                            href={link.href}
                            className={`group flex h-full min-h-[5.5rem] gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors ${
                              isActive(link.href, pathname)
                                ? 'bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]/25'
                                : 'hover:border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                isActive(link.href, pathname)
                                  ? 'border-[var(--accent)]/25 bg-white text-[var(--accent)]'
                                  : 'border-slate-200/80 bg-slate-50 text-slate-500 group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)]'
                              }`}
                            >
                              <Icon size={18} strokeWidth={1.75} aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span
                                className={`block text-[0.9375rem] leading-snug ${
                                  isActive(link.href, pathname)
                                    ? 'font-semibold text-[var(--accent)]'
                                    : 'font-medium text-slate-900 group-hover:text-slate-950'
                                }`}
                              >
                                {link.label}
                              </span>
                              <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                                {link.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>

      {/* Mobile : rendu hors du <header> pour éviter que backdrop-blur ne casse position:fixed (viewport) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
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
            {NAV_ITEMS.map((item) =>
              item.kind === 'mega' ? (
                <div key={item.id} className="border-b border-slate-100 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSection((s) => (s === item.id ? null : item.id))
                    }
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-3 text-left"
                  >
                    <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-slate-900">
                      <item.navIcon size={18} strokeWidth={1.75} className="text-[var(--accent)]" />
                      {item.label}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform ${
                        mobileSection === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSection === item.id && (
                    <div className="pb-2 pl-1">
                      <Link
                        href={item.allHref}
                        onClick={() => setMobileOpen(false)}
                        className="mb-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--accent)]"
                      >
                        {item.allLabel}
                        <ArrowRight size={14} />
                      </Link>
                      <ul className="space-y-0.5">
                        {item.columns.flatMap((col) =>
                          col.links.map((link) => {
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
                                    <span className="mt-0.5 block text-xs text-slate-500">
                                      {link.description}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div key={item.href} className="border-b border-slate-100 py-1">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[0.9375rem] font-medium ${
                      isActive(item.href, pathname)
                        ? 'text-[var(--accent)]'
                        : 'text-slate-900'
                    }`}
                  >
                    <item.navIcon
                      size={18}
                      strokeWidth={1.75}
                      className={
                        isActive(item.href, pathname) ? 'text-[var(--accent)]' : 'text-slate-400'
                      }
                    />
                    {item.label}
                  </Link>
                </div>
              )
            )}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-center text-[0.9375rem] font-medium text-slate-800"
              >
                <Mail size={18} strokeWidth={1.75} className="text-slate-500" aria-hidden />
                Écrire
              </Link>
              <Link
                href="/auth/connexion"
                onClick={() => setMobileOpen(false)}
                className="text-center text-[0.9375rem] font-medium text-slate-500"
              >
                Connexion
              </Link>
              <a
                href={RDV_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-[var(--nav-cta-bg)] px-4 py-4 text-center text-[0.9375rem] font-semibold text-white shadow-sm transition-transform active:scale-[0.99]"
              >
                {RDV_CTA.label}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
