'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { FooterGoogleReviewsBadge } from '@/components/FooterGoogleReviewsBadge';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { requestCookieConsentDialog } from '@/lib/cookie-consent';
import { IMAGE_QUALITY_DEFAULT } from '@/lib/image-props';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SITE } from '@/lib/site';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { siteAdresseLigne, siteRcsLibelle, siteSirenDisplay } from '@/lib/site-config';
import { LINKS } from '@/lib/internal-links';
import {
  PHOTOS,
  SITE_BRAND_LOGO_FOOTER_IMAGE_CLASS,
  SITE_LOGO_ALT,
  SITE_LOGO_TITLE,
} from '@/lib/photos';
import {
  NAV_FOOTER_MAQUETTE_FINANCEMENT,
  NAV_FOOTER_MAQUETTE_NAVIGATION,
  NAV_FOOTER_MAQUETTE_ORGANISME,
  type NavItem,
} from '@/lib/nav';

const FOOTER_BG = '#071B42';
const PHONE_ARIA_LABEL = `Appeler ${SITE.name} au ${SITE.phoneDisplay}`;

const FOOTER_LINK_CLASS =
  'inline-flex min-h-10 max-w-full items-center rounded-md py-1 text-sm font-normal text-white/85 underline-offset-[3px] transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none';

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

/** Footer site unique — maquette 2026 (six colonnes + barre légale). */
export function Footer() {
  const pathname = usePathname();
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/demo/') ||
    pathname?.startsWith('/outils/demo-')
  ) {
    return null;
  }

  const year = new Date().getFullYear();
  const siren = siteSirenDisplay();

  return (
    <footer className="border-t border-white/10 text-white" style={{ backgroundColor: FOOTER_BG }}>
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-7 py-7 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:py-8 xl:grid-cols-6 xl:gap-5">
          <div className="min-w-0 sm:col-span-2 xl:col-span-1">
            <Link
              href={SITE.links.home}
              className="inline-block max-w-full rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src={PHOTOS.siteBrandLogoFooter.src}
                alt={SITE_LOGO_ALT}
                title={SITE_LOGO_TITLE}
                width={PHOTOS.siteBrandLogoFooter.width}
                height={PHOTOS.siteBrandLogoFooter.height}
                className={SITE_BRAND_LOGO_FOOTER_IMAGE_CLASS}
                quality={IMAGE_QUALITY_DEFAULT}
              />
            </Link>
            <div className="mt-3 h-px w-10 bg-white/35" aria-hidden />
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-white/70">
              {SITE.footer.identityIntro}
            </p>
            <p className="mt-2 max-w-[16rem] text-[10px] leading-snug text-white/55">
              {SITE.legalName} · {OFC_IDENTITE.formeJuridique} · Capital {OFC_IDENTITE.capitalSocial}
              <br />
              Siège : {siteAdresseLigne()}
              <br />
              SIREN {siren} · {siteRcsLibelle()}
            </p>
          </div>

          <FooterNavColumn
            ariaLabel="Navigation"
            heading="Navigation"
            items={NAV_FOOTER_MAQUETTE_NAVIGATION}
          />
          <FooterNavColumn
            ariaLabel="Financement"
            heading="Financement"
            items={NAV_FOOTER_MAQUETTE_FINANCEMENT}
          />
          <FooterNavColumn
            ariaLabel="Notre organisme"
            heading="Notre organisme"
            items={NAV_FOOTER_MAQUETTE_ORGANISME}
          />

          <nav aria-label="Nous contacter" className="min-w-0">
            <p className={FOOTER_HEADING_CLASS}>Nous contacter</p>
            <ul className="mt-2 space-y-1">
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
              <li>
                <span className={`${FOOTER_LINK_CLASS} gap-2 font-normal text-white/80`}>
                  <MapPin size={15} strokeWidth={1.75} className="shrink-0" aria-hidden />
                  {SITE.footer.locationLine}
                </span>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 space-y-3 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <FooterGoogleReviewsBadge />
            <div className="space-y-2">
              <a
                href={QUALIOPI_LEGAL.certificatPdfHref}
                className="inline-block max-w-[11.5rem] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                download
                title={QUALIOPI_LEGAL.certificatPdfLabel}
              >
                <QualiopiBadge size="default" className="w-full max-w-[11.5rem]" />
              </a>
              <p className="max-w-[15rem] text-[10px] leading-snug text-white/55">
                {QUALIOPI_LEGAL.qualiopiCategoryMention}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 py-4">
          <div className="flex flex-col gap-3 text-xs text-white/70 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <p className="min-w-0 leading-relaxed">
              © {year} {SITE.name} – {SITE.legalName} | SIREN : {siren} | {siteRcsLibelle()} | NDA :{' '}
              {SITE.nda}
            </p>
            <p className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1">
              <Link
                href={LINKS.politiqueConfidentialite}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Politique de confidentialité
              </Link>
              <span className="text-white/35 select-none" aria-hidden>
                |
              </span>
              <button
                type="button"
                onClick={() => requestCookieConsentDialog()}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Gestion des cookies
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
