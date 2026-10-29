'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, Mail, Phone } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { SITE_BRAND_LOGO_IMAGE_CLASS } from '@/lib/photos';
import { requestCookieConsentDialog } from '@/lib/cookie-consent';
import { IMAGE_QUALITY_DEFAULT } from '@/lib/image-props';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { MENTION_MARQUE_EXPLOITANTE } from '@/lib/marque-identite';
import { SITE } from '@/lib/site';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import {
  NAV_FOOTER_FORMATIONS,
  NAV_FOOTER_ORGANISME,
  NAV_FOOTER_RESSOURCES,
  NAV_LEGAL_BAR,
  NAV_LEGAL_SECONDARY,
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
        <span className="sr-only"> (ouvre dans une nouvelle fenêtre)</span>
      </ExternalLinkAnchor>
    );
  }
  if (item.href.endsWith('.pdf')) {
    return (
      <a
        href={item.href}
        className={FOOTER_LINK_CLASS}
        title={item.title ?? 'Document PDF'}
        type="application/pdf"
      >
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
      <ul className="mt-2 space-y-0.5">
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

  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 text-white"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] lg:gap-x-8 lg:gap-y-6 lg:py-9">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="min-w-0">
              <Link
                href={SITE.links.home}
                className="inline-block max-w-full rounded-lg bg-white px-3 py-2"
              >
                <Image
                  src={SITE.logo.src}
                  alt={SITE.logo.alt}
                  title={SITE.logo.title}
                  width={SITE.logo.width}
                  height={SITE.logo.height}
                  className={SITE_BRAND_LOGO_IMAGE_CLASS}
                  quality={IMAGE_QUALITY_DEFAULT}
                />
              </Link>
              <p className="mt-2 text-sm text-white/70">Présentiel en Île-de-France</p>
            </div>
            <ul className="mt-4 space-y-0.5">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  aria-label={PHONE_ARIA_LABEL}
                  className={`${FOOTER_LINK_CLASS} gap-2 font-medium`}
                >
                  <Phone size={15} strokeWidth={1.75} className="shrink-0" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-no-cfemail
                  className={`${FOOTER_LINK_CLASS} gap-2 break-all font-medium`}
                >
                  <Mail size={15} strokeWidth={1.5} className="shrink-0" aria-hidden />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <FooterNavColumn
            ariaLabel="Formations"
            heading="Formations"
            items={NAV_FOOTER_FORMATIONS}
          />
          <FooterNavColumn
            ariaLabel="Notre organisme"
            heading="Notre organisme"
            items={NAV_FOOTER_ORGANISME}
          />
          <FooterNavColumn ariaLabel="Ressources" heading="Ressources" items={NAV_FOOTER_RESSOURCES} />
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
                <QualiopiBadge size="default" className="max-w-[11rem] shrink-0 self-start" />
                <p className="max-w-xl text-xs leading-relaxed text-white/55">
                  Certificateur Certifopac — certificat n° {QUALIOPI_LEGAL.certificatNumero}, validité{' '}
                  {QUALIOPI_LEGAL.certificatValidite}.{' '}
                  <a
                    href={QUALIOPI_LEGAL.certificatPdfHref}
                    className="text-white/75 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    download
                  >
                    {QUALIOPI_LEGAL.certificatPdfLabel}
                  </a>
                  {' · '}
                  <ExternalLinkAnchor
                    href={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.href}
                    title={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.title}
                    className="text-white/75 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Vérifier sur data.gouv.fr
                  </ExternalLinkAnchor>
                </p>
              </div>

              <p className="text-sm text-white/80">
                © {year} {SITE.name}
              </p>
              <p className="text-xs text-white/50">{MENTION_MARQUE_EXPLOITANTE}</p>

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
                        title={item.title}
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
                <ul className="flex flex-wrap gap-x-3 gap-y-2">
                  {NAV_LEGAL_SECONDARY.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-white/55 underline-offset-[3px] hover:text-white/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        title={item.title}
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
