import Link from 'next/link';
import {
  Mail,
  Globe,
  Linkedin,
  FileText,
  BookOpen,
  MapPin,
  Map,
  GraduationCap,
} from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SITE_CONFIG } from '@/lib/seo';
import { QualiopiLogoBlock, QualiopiWordmark } from '@/components/QualiopiLogo';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 flex flex-col items-stretch justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-slate-900">
              Formations IA BTP &amp; ChatGPT entreprise
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-600">
              <span>Catalogue</span>
              <QualiopiWordmark />
              <span>, financement Constructys — sessions 4 h.</span>
            </p>
          </div>
          <Link
            href="/formations"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <GraduationCap size={20} strokeWidth={1.75} aria-hidden />
            Voir le catalogue des formations
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo-lo.svg"
                alt="Laure Olivié — formation IA BTP, organisme certifié Qualiopi"
                title="Retour à l’accueil — laureolivie.fr"
                className="h-12 w-auto"
              />
              <div>
                <span className="font-display text-xl font-bold text-slate-900">Laure Olivié</span>
                <p className="text-sm font-medium text-slate-600">
                  Formatrice en intelligence artificielle
                </p>
                <p className="text-xs text-[var(--accent)]">
                  Intervenante LinkedIn Learning
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-600">
              Formation spécialisée en intelligence artificielle pour les
              professionnels et PME du bâtiment.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Financement OPCO Constructys 100%
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                laureolivie@yahoo.fr
              </a>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Globe size={18} strokeWidth={1.5} />
                </span>
                www.laureolivie.fr
              </Link>
              <address className="not-italic px-4 text-xs text-slate-500">
                France · Île-de-France · Guyancourt (Yvelines)<br />
                SIRET 905 244 281 00010
              </address>
            </div>
            <ExternalLinkAnchor
              href={SITE_CONFIG.linkedinProfileUrl}
              title="Profil LinkedIn de Laure Olivié"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-5 py-3 text-sm font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent-soft)]"
            >
              <Linkedin size={20} strokeWidth={1.5} />
              Suivez-moi sur LinkedIn
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleBusinessProfileUrl}
              title="Fiche Google — Laure Olivié, formation IA BTP (avis et informations)"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-800 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <MapPin size={20} strokeWidth={1.5} className="shrink-0" aria-hidden />
              Fiche Google (avis &amp; localisation)
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleMapsUrl}
              title="Ouvrir l’adresse du siège dans Google Maps"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-800 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Map size={20} strokeWidth={1.5} className="shrink-0" aria-hidden />
              Google Maps (itinéraire)
            </ExternalLinkAnchor>
          </div>

          {/* Formation */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-slate-700">
              <BookOpen size={16} strokeWidth={1.5} />
              Formation
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { href: '/formations', label: 'Catalogue des formations' },
                { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
                { href: '/contact', label: 'Contact' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
                { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
                { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
                { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
                { href: '/formations/ia-architecture-claude-dpgf', label: 'IA architecture — Claude AI & DPGF' },
                {
                  href: '/formations/ia-appels-offre-btp',
                  label: "Répondre aux appels d'offre avec l'IA",
                },
                { href: '/diagnostic-ia-btp', label: 'Diagnostic IA BTP gratuit' },
                { href: '/checklist-ia-btp', label: 'Checklist 10 prompts ChatGPT' },
                { href: '/financement-constructys-formation-ia-btp', label: 'Financement OPCO' },
                { href: '/blog', label: 'Ressources & Articles' },
                { href: '/outils-ia-btp', label: 'Outils IA BTP (ChatGPT, Claude, Gemini)' },
                { href: '/claude-ai-btp', label: 'Claude AI BTP (Anthropic)' },
                { href: '/communaute-formateurs', label: 'Communauté formateurs' },
                { href: '/espace-apprenant', label: 'Espace apprenant' },
                { href: '/install-pwa', label: 'Installer l\'app mobile' },
              ].map(({ href, label }) => (
                <li key={href}>
                  {href.startsWith('http') ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-slate-700">
              <FileText size={16} strokeWidth={1.5} />
              Informations légales
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { href: '/cgv', label: 'CGV' },
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents officiels + Qualiopi */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-700">
              Documents officiels
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { href: '/reglement-interieur', label: 'Règlement intérieur' },
                { href: '/annuaire-handicap', label: 'Annuaire handicap' },
                { href: '/llms.txt', label: 'Fichier llms.txt (assistants IA)' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 transition-colors hover:text-[var(--accent)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ExternalLinkAnchor
              href="https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281"
              title="Vérifier la certification Qualiopi — Annuaire officiel data.gouv.fr"
              className="mt-6 block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100"
            >
              <div className="flex justify-center">
                <QualiopiLogoBlock className="max-w-[220px]" />
              </div>
              <p className="mt-3 text-center text-xs font-medium text-slate-600">
                Vérifier la certification sur data.gouv.fr (annuaire officiel)
              </p>
            </ExternalLinkAnchor>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-10 md:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-sm text-slate-500 md:justify-start">
            <span>© {new Date().getFullYear()} OFC Création d&apos;Entreprise · Organisme certifié</span>
            <QualiopiWordmark />
          </p>
          <div className="flex gap-3">
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleBusinessProfileUrl}
              title="Fiche Google — Laure Olivié"
              aria-label="Fiche Google Business"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent-soft)]"
            >
              <MapPin size={20} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={SITE_CONFIG.googleMapsUrl}
              title="Google Maps — adresse Guyancourt"
              aria-label="Google Maps"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent-soft)]"
            >
              <Map size={20} strokeWidth={1.5} />
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href="mailto:laureolivie@yahoo.fr"
              title="Envoyer un email"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent-soft)]"
            >
              <Mail size={20} strokeWidth={1.5} />
            </ExternalLinkAnchor>
          </div>
        </div>
      </div>
    </footer>
  );
}
