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
  Mail,
  Home,
  CircleDollarSign,
  LogIn,
} from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { CATALOGUE_FORMATIONS_NAV_LINKS } from '@/lib/catalogue-formations-nav';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

import type { LucideIcon } from 'lucide-react';

type MegaLink = {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
};

type NavMega = {
  id: string;
  label: string;
  allLabel: string;
  allHref: string;
  columns: { title: string; links: MegaLink[] }[];
  navIcon: LucideIcon;
};

const FORMATIONS_MEGA: NavMega = {
  id: 'formations',
  label: 'Formations IA BTP',
  allLabel: 'Voir tout le catalogue',
  allHref: '/formations',
  navIcon: GraduationCap,
  columns: [
    {
      title: 'Nos formations',
      links: CATALOGUE_FORMATIONS_NAV_LINKS,
    },
  ],
};

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
        <div className="border-b border-slate-100 px-4 pb-3">
          <Link
            href={mega.allHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent)]/90"
          >
            {mega.allLabel}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Six parcours en présentiel — Qualiopi, financement OPCO Constructys selon éligibilité.
          </p>
        </div>
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
      </div>
    </div>
  );
}

function formationsDropdownActive(pathname: string): boolean {
  if (pathname.startsWith('/formations')) return true;
  return CATALOGUE_FORMATIONS_NAV_LINKS.some((l) => isActive(l.href, pathname));
}

/** Barre de navigation unique — pages site et blog (pas de liens espace apprenant dans le header public). */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFormations, setOpenFormations] = useState(false);
  const [mobileFormationsOpen, setMobileFormationsOpen] = useState(false);
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
    closeTimer.current = setTimeout(() => setOpenFormations(false), 180);
  };

  const handleEnterFormations = () => {
    clearCloseTimer();
    setOpenFormations(true);
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenFormations(false);
    setMobileFormationsOpen(false);
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

  const homeActive = pathname === '/';
  const blogActive = pathname === '/blog' || pathname.startsWith('/blog/');
  const aProposActive = pathname.startsWith('/a-propos');
  const contactActive = pathname === '/contact';
  const financementActive =
    pathname === LINKS.financement || pathname.startsWith('/financement-constructys');
  const connexionActive = pathname.startsWith('/auth/');

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
            className="group flex shrink-0 items-center gap-1 font-display text-lg font-bold tracking-tight text-slate-900 sm:gap-1.5 sm:text-xl"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200/70 sm:h-10 sm:w-10">
              <Image
                src={PHOTOS.siteAvatar.src}
                alt="Laure Olivié — formation IA BTP, organisme certifié Qualiopi"
                title="Retour à l'accueil — laureolivie.fr"
                fill
                className={AUTHOR_HEADSHOT_IMAGE_CLASS}
                sizes="40px"
                priority
              />
            </span>
            <span className="hidden min-[380px]:inline">Laure Olivié</span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-full border border-slate-200/80 bg-slate-100/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] lg:flex"
            aria-label="Navigation principale"
          >
            <Link
              href="/"
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
              className="relative"
              onMouseEnter={handleEnterFormations}
            >
              <button
                type="button"
                className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                  formationsDropdownActive(pathname) || openFormations
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                aria-expanded={openFormations}
                aria-haspopup="true"
              >
                {FORMATIONS_MEGA.label}
                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`shrink-0 text-slate-500 transition-transform duration-200 ${
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
              href="/blog"
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
              href={LINKS.financement}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all xl:px-3.5 xl:text-[0.9375rem] ${
                financementActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CircleDollarSign size={16} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
              Financement
            </Link>

            <Link
              href="/a-propos"
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

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-colors xl:text-[0.9375rem] ${
                contactActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail size={17} strokeWidth={1.75} className="text-slate-400" aria-hidden />
              <span className="decoration-slate-300 underline-offset-4 hover:underline">Contact</span>
            </Link>
            <Link
              href="/auth/connexion"
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] xl:px-4 xl:text-[0.9375rem] ${
                connexionActive ? 'border-[var(--accent)] text-[var(--accent)]' : ''
              }`}
            >
              <LogIn size={16} strokeWidth={1.75} aria-hidden />
              Connexion
            </Link>
            <a
              href={RDV_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--nav-cta-bg)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--nav-cta-hover)] active:scale-[0.98] xl:px-5 xl:text-[0.9375rem]"
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
      </header>

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
            <div className="border-b border-slate-100 py-1">
              <Link
                href="/"
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
              <button
                type="button"
                onClick={() => setMobileFormationsOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-3 text-left"
              >
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-slate-900">
                  <GraduationCap size={18} strokeWidth={1.75} className="text-[var(--accent)]" />
                  {FORMATIONS_MEGA.label}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform ${
                    mobileFormationsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileFormationsOpen && (
                <div className="pb-2 pl-1">
                  <Link
                    href={FORMATIONS_MEGA.allHref}
                    onClick={() => setMobileOpen(false)}
                    className="mb-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    {FORMATIONS_MEGA.allLabel}
                    <ArrowRight size={14} />
                  </Link>
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
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 py-1">
              <Link
                href="/blog"
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
                href={LINKS.financement}
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
              <Link
                href="/a-propos"
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
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-center text-[0.9375rem] font-medium text-slate-800"
              >
                <Mail size={18} strokeWidth={1.75} className="text-slate-500" aria-hidden />
                Contact
              </Link>
              <Link
                href="/auth/connexion"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-4 py-3.5 text-center text-[0.9375rem] font-semibold text-[var(--accent)]"
              >
                <LogIn size={18} strokeWidth={1.75} aria-hidden />
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
