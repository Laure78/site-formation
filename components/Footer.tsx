import Link from 'next/link';
import { Mail, Globe, Map, MapPin, GraduationCap, Phone } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { FooterExploreStrip } from '@/components/layout/FooterExploreStrip';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';
import { SITE } from '@/lib/site';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { getNavServices, type NavItem } from '@/lib/nav';

const PHONE_ARIA_LABEL = `Appeler ${SITE.name} au ${SITE.phoneDisplay}`;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function FooterNavLink({ item }: { item: NavItem }) {
  const className = 'text-sm text-slate-600 transition-colors hover:text-[var(--accent)]';
  if (isExternalHref(item.href)) {
    return (
      <ExternalLinkAnchor href={item.href} className={className} title={item.title}>
        {item.label}
      </ExternalLinkAnchor>
    );
  }
  if (item.href.endsWith('.pdf')) {
    return (
      <a href={item.href} className={className} title={item.title} download>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} title={item.title}>
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
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{heading}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <FooterNavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterNavMultiColumn({
  ariaLabel,
  heading,
  items,
}: {
  ariaLabel: string;
  heading: string;
  items: readonly NavItem[];
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:p-6"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{heading}</h3>
      <ul className="mt-4 columns-1 gap-x-10 sm:columns-2 lg:columns-3 xl:columns-4">
        {items.map((item) => (
          <li key={item.href} className="mb-2 break-inside-avoid">
            <FooterNavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Footer site unique — données depuis `lib/site.ts`. */
export function Footer() {
  const { footer: copy, nav, links, social, catalogue } = SITE;
  const navServices = getNavServices();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="font-display text-base font-semibold text-slate-900">{copy.bannerTitle}</p>
            <p className="mt-1 text-sm text-slate-600">
              Organisme certifié <QualiopiWordmark /> — {FINANCEMENT_FORMULATION_COURTE}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Satisfaction {formatNoteSatisfactionAffichageComplet()}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <Link
              href={links.formations}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <GraduationCap size={18} strokeWidth={1.75} aria-hidden />
              {copy.bannerCatalogueLabel}
            </Link>
            <Link href={links.skillConducteurTravaux} className={`text-sm ${OFC_LINK}`}>
              {copy.bannerGuideLabel}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={SITE.logo.footerSrc}
                alt={SITE.logo.alt}
                title={SITE.logo.title}
                width={80}
                height={40}
                className="h-10 w-auto"
                fetchPriority="high"
              />
              <div>
                <span className="font-display text-lg font-bold text-slate-900">{SITE.name}</span>
                <p className="text-xs font-medium text-slate-600">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {SITE.legalName} — {copy.brandDescription}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {SITE.perimeter} · {catalogue.range}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-no-cfemail
                  className={`inline-flex items-center gap-1.5 ${OFC_LINK}`}
                >
                  <Mail size={15} strokeWidth={1.5} aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  aria-label={PHONE_ARIA_LABEL}
                  className={`inline-flex items-center gap-1.5 ${OFC_LINK}`}
                >
                  <Phone size={15} strokeWidth={1.5} aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <Link href={links.home} className={`inline-flex items-center gap-1.5 ${OFC_LINK}`}>
                  <Globe size={15} strokeWidth={1.5} aria-hidden />
                  {SITE.displayUrl}
                </Link>
              </li>
            </ul>
            <address className="not-italic mt-4 space-y-1 text-[11px] leading-snug text-slate-500">
              <span className="block font-medium text-slate-600">
                SIRET {SITE.siret} · NDA {SITE.nda}
              </span>
              <span className="block">
                {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}
              </span>
              <span className="block">{SITE.ndaMention}</span>
            </address>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2 xl:grid-cols-4">
            <FooterNavColumn ariaLabel="Entreprise" heading="Entreprise" items={nav.footer.entreprise} />
            <FooterNavColumn ariaLabel="Ressources" heading="Ressources" items={nav.footer.ressources} />
            <FooterNavColumn
              ariaLabel="Informations réglementaires"
              heading="Informations réglementaires"
              items={nav.footer.reglementaire}
            />
            <FooterNavColumn ariaLabel="Légal" heading="Légal" items={nav.footer.legal} />
          </div>
        </div>

        <div className="mt-10">
          <FooterNavMultiColumn
            ariaLabel="Catalogue et formations"
            heading="Catalogue & formations"
            items={navServices}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <FooterExploreStrip title={copy.exploreMetiersTitle} links={nav.footer.metiers} />
          <FooterExploreStrip title={copy.exploreIdfTitle} links={nav.footer.idf} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <ReferentHandicapBlock variant="compact" className="h-full" />
          <QualiopiCertificationNotice
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4"
            showCertificateLink={false}
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-slate-500 sm:justify-start">
            <span>
              © {new Date().getFullYear()} {SITE.legalName} ·
            </span>
            <QualiopiWordmark />
          </p>
          <div className="flex gap-2">
            <a
              href={social.linkedin}
              target="_blank"
              rel="me noopener"
              title="Profil LinkedIn — Laure Olivié, formatrice IA BTP"
              aria-label="Profil LinkedIn de Laure Olivié — formatrice IA pour les professionnels du BTP"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#377CF3] text-white transition-all hover:bg-[#2d66d6]"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <ExternalLinkAnchor
              href={social.googleBusiness}
              title={`Fiche Google — ${SITE.name}`}
              aria-label="Fiche Google Business"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <MapPin size={18} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={social.googleMaps}
              title="Google Maps — adresse Guyancourt"
              aria-label="Google Maps"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Map size={18} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <a
              href={`tel:${SITE.phone}`}
              aria-label={PHONE_ARIA_LABEL}
              title={PHONE_ARIA_LABEL}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Phone size={18} strokeWidth={1.5} aria-hidden />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              data-no-cfemail
              title="Envoyer un email"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
