import Link from 'next/link';
import { Mail, Globe, Map, MapPin, GraduationCap } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { SITE_CONFIG } from '@/lib/seo';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SITE_LOGO_ALT } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  NAV_ENTREPRISE,
  NAV_IDF,
  NAV_LEGAL,
  NAV_METIERS,
  NAV_RESSOURCES,
  NAV_SERVICES,
  type NavItem,
} from '@/lib/nav';
import { FooterExploreStrip } from '@/components/layout/FooterExploreStrip';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';

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

/** Footer site unique — listes depuis `lib/nav.ts`. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-display text-base font-semibold text-slate-900">
              Formations IA pour les pros du BTP &amp; ChatGPT entreprise
            </p>
            <p className="mt-0.5 text-sm text-slate-600">
              Catalogue <QualiopiWordmark />, financement Constructys — sessions 4 h.
            </p>
            <Link href={LINKS.skillIaConducteurTravaux} className={`mt-3 inline-flex text-sm ${OFC_LINK}`}>
              Guide Conducteur de travaux — PDF gratuit →
            </Link>
          </div>
          <Link
            href={LINKS.formations}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <GraduationCap size={18} strokeWidth={1.75} aria-hidden />
            Catalogue
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo-lo.svg"
                alt={SITE_LOGO_ALT}
                title="Retour à l’accueil — laureolivie.fr"
                width={80}
                height={40}
                className="h-10 w-auto"
                fetchPriority="high"
              />
              <div>
                <span className="font-display text-lg font-bold text-slate-900">Laure Olivié</span>
                <p className="text-xs font-medium text-slate-600">Formatrice IA · BTP</p>
              </div>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-snug text-slate-600">
              IA pour PME du bâtiment et équipes BTP — méthode terrain, Qualiopi.
            </p>
            <p className="mt-2 max-w-xs text-xs font-medium leading-snug text-slate-500">
              {PERIMETRE_FORMATIONS_COURT}
            </p>
            <div className="mt-4 space-y-2">
              {/*
                Cloudflare : désactiver « Email Address Obfuscation » (Speed / Scrape Shield) ou garder
                data-no-cfemail sur le lien mailto pour que l’adresse reste lisible côté client.
              */}
              <a
                href={`mailto:${SCHEMA_CONTACT.email}`}
                data-no-cfemail
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                <Mail size={16} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                {SCHEMA_CONTACT.email}
              </a>
              <Link
                href={LINKS.home}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                <Globe size={16} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                www.laureolivie.fr
              </Link>
            </div>
            <address className="not-italic mt-3 space-y-1 text-[11px] leading-snug text-slate-500">
              <span className="block">Guyancourt (78) · SIRET {SCHEMA_CONTACT.siretFormatted}</span>
              <span className="block">
                Organisme de formation enregistré sous le n° de déclaration d&apos;activité {SCHEMA_CONTACT.nda}{' '}
                auprès du préfet de région Île-de-France. Cet enregistrement ne vaut pas agrément de
                l&apos;État.
              </span>
            </address>
          </div>

          <FooterNavColumn ariaLabel="Entreprise" heading="Entreprise" items={NAV_ENTREPRISE} />
          <FooterNavColumn ariaLabel="Services" heading="Services" items={NAV_SERVICES} />
          <FooterNavColumn ariaLabel="Ressources" heading="Ressources" items={NAV_RESSOURCES} />
          <FooterNavColumn ariaLabel="Légal" heading="Légal" items={NAV_LEGAL} />
        </div>

        <div className="mt-10 grid gap-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 md:grid-cols-2 md:p-6">
          <FooterExploreStrip title="Formations IA par métier" links={NAV_METIERS} />
          <FooterExploreStrip title="Formations en Île-de-France" links={NAV_IDF} />
        </div>

        <ReferentHandicapBlock variant="compact" className="mb-8" />

        <QualiopiCertificationNotice className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-slate-500 sm:justify-start">
            <span>
              © {new Date().getFullYear()} {QUALIOPI_LEGAL.raisonSociale} ·
            </span>
            <QualiopiWordmark />
          </p>
          <div className="flex gap-2">
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleBusinessProfileUrl}
              title="Fiche Google — Laure Olivié"
              aria-label="Fiche Google Business"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <MapPin size={18} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleMapsUrl}
              title="Google Maps — adresse Guyancourt"
              aria-label="Google Maps"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Map size={18} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <a
              href={`mailto:${SCHEMA_CONTACT.email}`}
              data-no-cfemail
              title="Envoyer un email"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
