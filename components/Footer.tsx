import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';
import { SITE } from '@/lib/site';
import {
  NAV_FORMATIONS_FOOTER,
  NAV_LEGAL_BAR,
  NAV_ORGANISME,
  NAV_RESSOURCES,
  type NavItem,
} from '@/lib/nav';

const PHONE_ARIA_LABEL = `Appeler ${SITE.name} au ${SITE.phoneDisplay}`;
const LINK_CLASS =
  'inline-flex min-h-[44px] items-center text-sm text-slate-600 transition-colors hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function FooterNavLink({ item }: { item: NavItem }) {
  if (isExternalHref(item.href)) {
    return (
      <ExternalLinkAnchor href={item.href} className={LINK_CLASS} title={item.title}>
        {item.label}
      </ExternalLinkAnchor>
    );
  }
  if (item.href.endsWith('.pdf')) {
    return (
      <a href={item.href} className={LINK_CLASS} title={item.title} download>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={LINK_CLASS} title={item.title}>
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {heading}
      </p>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <FooterNavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Footer site unique — données depuis `lib/site.ts` et `lib/nav.ts`. */
export function Footer() {
  const { footer: copy, links, social } = SITE;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#F8FAFC] text-slate-700">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {/* Colonne 1 — Identité */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={SITE.logo.footerSrc}
                alt={SITE.logo.alt}
                title={SITE.logo.title}
                width={72}
                height={36}
                className="h-9 w-auto"
              />
              <div>
                <p className="font-display text-lg font-bold text-slate-900">{SITE.name}</p>
                <p className="text-sm font-medium text-[#377CF3]">{copy.identitySubtitle}</p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              {copy.identityIntro}
            </p>
            <p className="mt-2 text-xs font-medium tracking-wide text-slate-500">
              {copy.useCasesLine}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{copy.geoSentence}</p>
            <p className="mt-2 text-sm text-slate-500">{copy.locationLine}</p>

            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-no-cfemail
                  className={`${LINK_CLASS} gap-2 font-medium text-[#377CF3]`}
                >
                  <Mail size={15} strokeWidth={1.5} aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  aria-label={PHONE_ARIA_LABEL}
                  className={`${LINK_CLASS} gap-2 font-medium text-[#377CF3]`}
                >
                  <Phone size={15} strokeWidth={1.5} aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>

            <Link
              href={SITE.cta.href}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              {SITE.cta.footerLabel}
            </Link>
          </div>

          <div className="lg:col-span-3">
            <FooterNavColumn
              ariaLabel="Formations IA BTP"
              heading="Formations IA BTP"
              items={NAV_FORMATIONS_FOOTER}
            />
          </div>
          <div className="lg:col-span-3">
            <FooterNavColumn
              ariaLabel="Ressources BTP"
              heading="Ressources BTP"
              items={NAV_RESSOURCES}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterNavColumn
              ariaLabel="Organisme de formation"
              heading="Organisme de formation"
              items={NAV_ORGANISME}
            />
          </div>
        </div>

        {/* Qualiopi + référente handicap — obligations légales */}
        <div className="mt-10 grid gap-6 border-t border-slate-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <ReferentHandicapBlock variant="compact" className="h-full" />
          <QualiopiCertificationNotice
            className="rounded-xl border border-slate-200 bg-white px-4 py-4"
            showCertificateLink
            showIndicateursLink={false}
          />
        </div>

        {/* Barre légale */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 space-y-2">
              <p className="text-xs text-slate-500">
                © {year} {SITE.legalName}
              </p>
              <p className="text-xs text-slate-500">
                SIRET {SITE.siret} · NDA {SITE.nda}
              </p>
              <nav aria-label="Mentions légales">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {NAV_LEGAL_BAR.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-slate-500 underline-offset-2 transition-colors hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="max-w-3xl text-[11px] leading-relaxed text-slate-400">
                {SITE.ndaMention}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={social.linkedin}
                target="_blank"
                rel="me noopener"
                title="Profil LinkedIn — Laure Olivié, formatrice IA BTP"
                aria-label="Profil LinkedIn de Laure Olivié — formatrice IA pour les professionnels du BTP"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#377CF3] text-white transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <Link
                href={links.home}
                className="text-xs text-slate-500 underline-offset-2 hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                {SITE.displayUrl}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
