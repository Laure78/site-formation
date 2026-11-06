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
import type { NavItem } from '@/lib/nav';

const FOOTER_BG = '#071B42';

/** Colonne — Formations IA BTP (maquette footer, URLs catalogue existantes). */
const FOOTER_FORMATIONS_IA_BTP: readonly NavItem[] = [
  {
    href: LINKS.formations,
    label: 'Toutes les formations IA BTP',
    title: 'Catalogue formations IA BTP — présentiel Paris et Île-de-France',
  },
  {
    href: LINKS.formationAO,
    label: 'Formation IA appels d’offres et DCE',
    title: 'Appels d’offres BTP et analyse DCE avec l’IA — Île-de-France',
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    label: 'Formation IA conduite de travaux',
    title: 'IA pour conducteurs de travaux — chantier et documents BTP',
  },
  {
    href: LINKS.iaDevis,
    label: 'IA devis et chiffrage BTP',
    title: 'Devis et chiffrage bâtiment assistés par l’IA — guide et formation',
  },
  {
    href: LINKS.formationIaMenuisierBtp,
    label: 'Formation IA menuiserie BTP',
    title: 'Formation IA pour entreprises de menuiserie — Paris et Île-de-France',
  },
];

/** Colonne — Parcours métiers · 2027. */
const FOOTER_PARCOURS_METIERS_2027: readonly NavItem[] = [
  {
    href: LINKS.parcoursConducteurDeTravaux,
    label: 'Parcours conducteur de travaux',
    title: 'Parcours métier IA — conducteur de travaux BTP',
  },
  {
    href: LINKS.parcoursChargeAffairesBtp,
    label: 'Parcours chargé d’affaires BTP',
    title: 'Parcours métier IA — chargé d’affaires bâtiment et TP',
  },
  {
    href: LINKS.parcoursAssistantDeGestionBtp,
    label: 'Parcours assistant de gestion BTP',
    title: 'Parcours métier IA — assistant de gestion BTP',
  },
  {
    href: LINKS.parcoursDirigeantPmeBtp,
    label: 'Parcours dirigeant de PME BTP',
    title: 'Parcours métier IA — dirigeant PME du bâtiment',
  },
  {
    href: LINKS.parcoursReferentIaBtp,
    label: 'Parcours référent IA BTP',
    title: 'Parcours métier IA — référent intelligence artificielle BTP',
  },
];

/** Colonne — Explorer. */
const FOOTER_EXPLORER: readonly NavItem[] = [
  {
    href: LINKS.financement,
    label: 'Financement OPCO Constructys',
    title: 'Financement OPCO — formation IA BTP en Île-de-France',
  },
  {
    href: LINKS.ressources,
    label: 'Ressources et guides IA BTP',
    title: 'Guides gratuits, tutoriels et outils IA pour le BTP',
  },
  {
    href: LINKS.formateurs,
    label: 'Nos formateurs IA BTP',
    title: 'Équipe de formateurs — intelligence artificielle appliquée au BTP',
  },
  {
    href: LINKS.aPropos,
    label: 'À propos de Laure Olivié',
    title: 'Organisme de formation IA BTP certifié Qualiopi — Paris',
  },
  {
    href: LINKS.avisClients,
    label: 'Avis clients formation BTP',
    title: 'Témoignages et avis — formations IA bâtiment et travaux publics',
  },
];
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
              <span className="font-semibold text-white/90">Laure OLIVIÉ</span>
              <br />
              Formation IA pour les entreprises du bâtiment et des travaux publics.
              <br />
              <span className="text-white/60">Présentiel · Paris et Île-de-France</span>
            </p>
            <p className="mt-2 max-w-[16rem] text-[10px] leading-snug text-white/55">
              {OFC_IDENTITE.raisonSociale} — {OFC_IDENTITE.formeJuridique}
              <br />
              Laure Olivié est la marque commerciale d&apos;{OFC_IDENTITE.raisonSociale}.
              <br />
              Siège : {siteAdresseLigne()}
              <br />
              SIREN {siren} · {siteRcsLibelle()}
            </p>
          </div>

          <FooterNavColumn
            ariaLabel="Formations IA BTP"
            heading="Formations IA BTP"
            items={FOOTER_FORMATIONS_IA_BTP}
          />
          <FooterNavColumn
            ariaLabel="Parcours métiers 2027"
            heading="Parcours métiers · 2027"
            items={FOOTER_PARCOURS_METIERS_2027}
          />
          <FooterNavColumn
            ariaLabel="Explorer le site"
            heading="Explorer"
            items={FOOTER_EXPLORER}
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
                  Présentiel · Paris et Île-de-France
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
                Certification Qualiopi — Actions de formation
                <br />
                Certificat n° {QUALIOPI_LEGAL.certificatNumero}
              </p>
              <a
                href={QUALIOPI_LEGAL.certificatPdfHref}
                className={`${FOOTER_LINK_CLASS} text-[10px]`}
                download
                title={QUALIOPI_LEGAL.certificatPdfLabel}
                type="application/pdf"
              >
                Voir le certificat
              </a>
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
                href={LINKS.mentionsLegales}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Mentions légales
              </Link>
              <span className="text-white/35 select-none" aria-hidden>
                |
              </span>
              <Link
                href={LINKS.cgv}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                CGV
              </Link>
              <span className="text-white/35 select-none" aria-hidden>
                |
              </span>
              <Link
                href={LINKS.politiqueConfidentialite}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Confidentialité
              </Link>
              <span className="text-white/35 select-none" aria-hidden>
                |
              </span>
              <Link
                href={LINKS.accessibiliteHandicap}
                className="text-white/80 underline-offset-[3px] hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Accessibilité
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
