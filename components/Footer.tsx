import Link from 'next/link';
import { Mail, Globe, Map, MapPin, GraduationCap } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { SITE_CONFIG } from '@/lib/seo';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { QualiopiLogoBlock, QualiopiWordmark } from '@/components/QualiopiLogo';
import { LINKS } from '@/lib/internal-links';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';

export function Footer() {
  const companyLinks: Array<
    { href: string; label: string; external?: false } | { href: string; label: string; external: true }
  > = [
    { href: LINKS.aPropos, label: 'À propos' },
    { href: LINKS.contact, label: 'Contact' },
    { href: LINKS.prendreRdv, label: 'Rendez-vous' },
    { href: SITE_CONFIG.linkedinProfileUrl, label: 'LinkedIn', external: true },
  ];

  const serviceLinks = [
    { href: LINKS.formations, label: 'Catalogue' },
    { href: LINKS.financement, label: 'Financement' },
    { href: LINKS.chatgptArtisans, label: 'ChatGPT BTP' },
    { href: LINKS.formationClaudeAiBtp, label: 'Formation Claude AI BTP' },
    { href: LINKS.formationClaudeAiBatiment, label: 'Formation Claude bâtiment' },
    { href: LINKS.formationClaudeAiTravauxPublics, label: 'Formation Claude TP' },
    { href: LINKS.formationAO, label: "Appels d'offres" },
    { href: LINKS.formationParis, label: 'Paris' },
  ];

  const resourceLinks = [
    { href: LINKS.blog, label: 'Blog' },
    { href: LINKS.diagnostic, label: 'Diagnostic' },
    { href: LINKS.checklist, label: 'Checklist' },
    { href: LINKS.skillIaConducteurTravaux, label: 'Guide Skill IA (PDF)' },
    { href: LINKS.etudesCas, label: 'Étude de cas' },
    { href: LINKS.casUsage, label: "Cas d'usage" },
  ];

  const legalLinks = [
    { href: LINKS.cgv, label: 'CGV' },
    { href: LINKS.mentionsLegales, label: 'Mentions légales' },
    { href: LINKS.politiqueConfidentialite, label: 'Confidentialité' },
    { href: LINKS.reglementInterieur, label: 'Règlement' },
    { href: LINKS.annuaireHandicap, label: 'Handicap' },
    { href: '/llms.txt', label: 'Fichier llms.txt (assistants IA)' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-display text-base font-semibold text-slate-900">
              Formations IA BTP &amp; ChatGPT entreprise
            </p>
            <p className="mt-0.5 text-sm text-slate-600">
              Catalogue <QualiopiWordmark />, financement Constructys — sessions 4 h.
            </p>
            <Link
              href={LINKS.skillIaConducteurTravaux}
              className="mt-3 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Guide gratuit : créez votre 1er Skill IA →
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
                alt="Laure Olivié — formation IA BTP, organisme certifié Qualiopi"
                title="Retour à l’accueil — laureolivie.fr"
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
            <address className="not-italic mt-3 text-xs leading-snug text-slate-500">
              Guyancourt (78) · SIRET 905 244 281 00010
            </address>
          </div>

          <nav aria-label="Entreprise" className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Entreprise</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <ExternalLinkAnchor
                      href={item.href}
                      className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                      title="Profil LinkedIn — Laure Olivié"
                    >
                      {item.label}
                    </ExternalLinkAnchor>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Services</h3>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ressources" className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ressources</h3>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Légal" className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Légal</h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ExternalLinkAnchor
          href={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.href}
          title={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.title}
          className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-colors hover:border-slate-300 sm:flex-row sm:justify-center sm:gap-4"
        >
          <QualiopiLogoBlock className="max-w-[180px] shrink-0" />
          <span className="text-center text-xs font-medium text-slate-600 sm:text-left">
            Certification Qualiopi — vérifier sur data.gouv.fr
          </span>
        </ExternalLinkAnchor>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-slate-500 sm:justify-start">
            <span>© {new Date().getFullYear()} OFC Création d&apos;Entreprise ·</span>
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
