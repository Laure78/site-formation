import Link from 'next/link';
import { Mail, Phone, Globe, Linkedin, FileText, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo-lo.svg" alt="Laure Olivié" className="h-12 w-auto" />
              <span className="font-display text-xl font-bold text-slate-900">Laure Olivié</span>
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
              <a
                href="tel:+33695661818"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
                06 95 66 18 18
              </a>
              <a
                href="https://www.laureolivie.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Globe size={18} strokeWidth={1.5} />
                </span>
                www.laureolivie.fr
              </a>
              <address className="not-italic px-4 text-xs text-slate-500">
                France · Île-de-France · Paris<br />
                SIRET 905 244 281 00010
              </address>
            </div>
            <a
              href="https://www.linkedin.com/in/laure-olivie"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-5 py-3 text-sm font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent-soft)]"
            >
              <Linkedin size={20} strokeWidth={1.5} />
              Suivez-moi sur LinkedIn
            </a>
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
                { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
                { href: '/chatgpt-artisans-btp', label: 'ChatGPT pour artisans BTP' },
                { href: '/ia-devis-batiment', label: 'IA pour devis bâtiment' },
                { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
                { href: '/tarifs', label: 'Financement OPCO' },
                { href: '/espace-apprenant', label: 'Espace apprenant' },
                { href: '/install-pwa', label: 'Installer l\'app mobile' },
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
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Qualiopi</p>
              <p className="mt-1 text-xs text-slate-500">Processus certifié</p>
              <p className="mt-2 text-xs text-slate-500">
                RÉPUBLIQUE FRANÇAISE — Action de formation
              </p>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-10 md:flex-row">
          <p className="text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} OFC Création d&apos;Entreprise · Organisme certifié Qualiopi
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/laure-olivie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent-soft)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent-soft)]"
              aria-label="Email"
            >
              <Mail size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
