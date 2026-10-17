'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, Mail, Phone, Star } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { HeaderPrimaryCta } from '@/components/nav/HeaderPrimaryCta';
import { requestCookieConsentDialog } from '@/lib/cookie-consent';
import { LINKEDIN_PROFILE_ARIA } from '@/lib/linkedin-profile';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { SITE } from '@/lib/site';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import {
  FOOTER_GOOGLE_REVIEWS_URL,
  NAV_CARRIERE,
  NAV_FOOTER_PARCOURS,
  NAV_FORMATIONS_FOOTER,
  NAV_LEGAL_BAR,
  NAV_LEGAL_SECONDARY,
  NAV_ORGANISME,
  NAV_RESSOURCES,
  type NavItem,
} from '@/lib/nav';
import { isAuthConnexionPage } from '@/lib/auth-connexion-chrome';

const FOOTER_BG = '#0b1220';
const PHONE_ARIA_LABEL = `Appeler ${SITE.name} au ${SITE.phoneDisplay}`;

const FOOTER_LINK_CLASS =
  'inline-flex min-h-11 max-w-full items-center rounded-md py-1.5 text-sm text-white/85 underline-offset-[3px] transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none';

const FOOTER_HEADING_CLASS = 'text-sm font-semibold text-white';

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function FooterNavLink({ item }: { item: NavItem }) {
  if (isExternalHref(item.href)) {
    return (
      <ExternalLinkAnchor href={item.href} className={FOOTER_LINK_CLASS} title={item.title}>
        {item.label}
      </ExternalLinkAnchor>
    );
  }
  if (item.href.endsWith('.pdf')) {
    return (
      <a href={item.href} className={FOOTER_LINK_CLASS} title={item.title} download>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={`${FOOTER_LINK_CLASS} break-words`} title={item.title}>
      {item.label}
    </Link>
  );
}

function FooterNavColumn({
  ariaLabel,
  heading,
  items,
}: {
  ariaLabel: string;
  heading: string;
  items: readonly NavItem[];
}) {
  return (
    <nav aria-label={ariaLabel} className="min-w-0">
      <p className={FOOTER_HEADING_CLASS}>{heading}</p>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <FooterNavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterBackToTopButton() {
  const scrollTop = () => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-[#0b1220] shadow-sm transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

/** Footer site unique — données depuis `lib/site.ts` et `lib/nav.ts`. */
export function Footer() {
  const pathname = usePathname();
  if (
    isAuthConnexionPage(pathname) ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/demo/') ||
    pathname?.startsWith('/outils/demo-')
  ) {
    return null;
  }

  const { social } = SITE;
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 text-white"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Bande supérieure — identité & contact */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:py-12">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <img
              src={SITE.logo.footerSrc}
              alt={SITE.logo.alt}
              title={SITE.logo.title}
              width={72}
              height={36}
              className="h-9 w-auto shrink-0 brightness-0 invert"
            />
            <div className="min-w-0">
              <p className="font-display text-lg font-bold tracking-tight text-white">{SITE.name}</p>
              <p className="mt-0.5 text-sm font-medium text-white/90">{SITE.tagline}</p>
              <p className="mt-1 text-xs font-medium tracking-wide text-white/60">
                Présentiel en Île-de-France
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-stretch gap-3 sm:items-end">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <a
                href={`tel:${SITE.phone}`}
                aria-label={PHONE_ARIA_LABEL}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/35 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                <Phone size={16} strokeWidth={1.75} aria-hidden />
                {SITE.phoneDisplay}
              </a>
              <HeaderPrimaryCta
                origin="footer"
                className="min-h-11 w-full rounded-lg sm:w-auto sm:min-w-[12rem]"
              />
            </div>
            <a
              href={`mailto:${SITE.email}`}
              data-no-cfemail
              className="inline-flex min-h-11 max-w-full items-center gap-2 break-all text-sm font-medium text-white/85 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:justify-end"
            >
              <Mail size={15} strokeWidth={1.5} className="shrink-0" aria-hidden />
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Navigation — 5 colonnes (2×2 mobile, 3 puis 5 desktop) */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8 lg:py-12">
          <FooterNavColumn
            ariaLabel="Formations IA BTP"
            heading="Formations IA BTP"
            items={NAV_FORMATIONS_FOOTER}
          />
          <FooterNavColumn
            ariaLabel="Parcours métiers"
            heading="Parcours métiers"
            items={NAV_FOOTER_PARCOURS}
          />
          <FooterNavColumn
            ariaLabel="Notre organisme"
            heading="Notre organisme"
            items={NAV_ORGANISME}
          />
          <FooterNavColumn
            ariaLabel="Ressources et aide"
            heading="Ressources et aide"
            items={NAV_RESSOURCES}
          />
          <FooterNavColumn ariaLabel="Carrière" heading="Carrière" items={NAV_CARRIERE} />
        </div>

        {/* Réassurance — Qualiopi, financement, réseaux */}
        <div className="grid gap-8 border-t border-white/10 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-4">
            <p className="text-sm font-semibold text-white">{SITE.legalName}</p>
            <div className="flex max-w-xl flex-col gap-4">
              <QualiopiBadge size="lg" className="w-full max-w-[16rem] shrink-0 self-start" />
              <div className="min-w-0 text-sm leading-relaxed text-white/75">
                <p>
                  Certificateur : Certifopac — certificat n° {QUALIOPI_LEGAL.certificatNumero},
                  validité {QUALIOPI_LEGAL.certificatValidite}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={QUALIOPI_LEGAL.certificatPdfHref}
                    className="font-medium text-white underline-offset-[3px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    download
                  >
                    {QUALIOPI_LEGAL.certificatPdfLabel}
                  </a>
                  <ExternalLinkAnchor
                    href={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.href}
                    title={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.title}
                    className="font-medium text-white underline-offset-[3px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Vérifier sur data.gouv.fr
                  </ExternalLinkAnchor>
                  <Link
                    href={LINKS.qualiopi}
                    className="font-medium text-white underline-offset-[3px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Qualité et certification
                  </Link>
                  <Link
                    href={LINKS.indicateursResultats}
                    className="font-medium text-white underline-offset-[3px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Indicateurs de résultats
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <p className="text-sm leading-relaxed text-white/75">
              Financement possible selon votre situation et les conditions du financeur.
            </p>
            <Link
              href={LINKS.financement}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline-offset-[3px] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Consulter les possibilités de financement
            </Link>
            <div className="flex flex-wrap gap-3 pt-1">
              <ExternalLinkAnchor
                href={social.linkedin}
                title={LINKEDIN_PROFILE_ARIA.footer}
                aria-label={LINKEDIN_PROFILE_ARIA.footer}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#377CF3] text-white">
                  <LinkedInIcon className="h-4 w-4" />
                </span>
                LinkedIn
              </ExternalLinkAnchor>
              <ExternalLinkAnchor
                href={FOOTER_GOOGLE_REVIEWS_URL}
                title="Consulter les avis Google — OFC Création d’Entreprise"
                aria-label="Consulter les avis Google — OFC Création d’Entreprise"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white">
                  <Star className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                Avis Google
              </ExternalLinkAnchor>
            </div>
          </div>
        </div>

        {/* Bandeau légal */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0 flex-1 space-y-3">
              <p className="text-sm text-white/80">
                © {year} {SITE.legalName} — {SITE.name}
              </p>
              <nav aria-label="Informations légales">
                <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
                  {NAV_LEGAL_BAR.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                      {index > 0 ? (
                        <span className="mx-2 text-white/35 select-none" aria-hidden>
                          ·
                        </span>
                      ) : null}
                      <Link
                        href={item.href}
                        className="text-white/75 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="flex items-center">
                    <span className="mx-2 text-white/35 select-none" aria-hidden>
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={() => requestCookieConsentDialog()}
                      className="text-white/75 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Gérer mes cookies
                    </button>
                  </li>
                </ul>
              </nav>
              <nav aria-label="Informations réglementaires complémentaires">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {NAV_LEGAL_SECONDARY.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-white/55 underline-offset-[3px] hover:text-white/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="text-xs text-white/55">
                SIRET {SITE.siret} · NDA {SITE.nda}
              </p>
              <p className="max-w-3xl text-[11px] leading-relaxed text-white/45">{SITE.ndaMention}</p>
            </div>
            <FooterBackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
