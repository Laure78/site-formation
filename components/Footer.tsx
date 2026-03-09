import Link from 'next/link';
import { Mail, Phone, Globe, Linkedin, FileText, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white">
      {/* Ligne d'accent en haut */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-lg font-bold shadow-lg shadow-blue-500/20">
                IA
              </div>
              <span className="font-display text-xl font-bold">Laure Olivié</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-indigo-200/80">
              Formation spécialisée en intelligence artificielle pour les
              professionnels et PME du bâtiment.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Financement OPCO Constructys 100%
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="flex items-center gap-3 rounded-xl bg-indigo-900/40 px-4 py-3 text-sm text-indigo-100 transition-colors hover:bg-indigo-800/60 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-800/50">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                laureolivie@yahoo.fr
              </a>
              <a
                href="tel:+33695661818"
                className="flex items-center gap-3 rounded-xl bg-indigo-900/40 px-4 py-3 text-sm text-indigo-100 transition-colors hover:bg-indigo-800/60 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-800/50">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
                06 95 66 18 18
              </a>
              <a
                href="https://www.laureolivie.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-indigo-900/40 px-4 py-3 text-sm text-indigo-100 transition-colors hover:bg-indigo-800/60 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-800/50">
                  <Globe size={18} strokeWidth={1.5} />
                </span>
                www.laureolivie.fr
              </a>
              <p className="px-4 text-xs text-indigo-300/70">SIRET 905 244 281 00010</p>
            </div>
            <a
              href="https://www.linkedin.com/in/laure-olivie"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-indigo-600/60 bg-indigo-900/30 px-5 py-3 text-sm font-medium text-indigo-100 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <Linkedin size={20} strokeWidth={1.5} />
              Suivez-moi sur LinkedIn
            </a>
          </div>

          {/* Formation */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-indigo-200">
              <BookOpen size={16} strokeWidth={1.5} />
              Formation
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { href: '/formations', label: 'Catalogue des formations' },
                { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
                { href: '/tarifs', label: 'Financement OPCO' },
                { href: '/espace-apprenant', label: 'Espace apprenant' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-indigo-200/80 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-indigo-200">
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
                    className="text-sm text-indigo-200/80 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents officiels + Qualiopi */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-indigo-200">
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
                    className="text-sm text-indigo-200/80 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-indigo-700/60 bg-indigo-900/40 p-4">
              <p className="font-semibold text-indigo-100">Qualiopi</p>
              <p className="mt-1 text-xs text-indigo-300/70">Processus certifié</p>
              <p className="mt-2 text-xs text-indigo-300/70">
                RÉPUBLIQUE FRANÇAISE — Action de formation
              </p>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-indigo-700/50 pt-10 md:flex-row">
          <p className="text-center text-sm text-indigo-200/70 md:text-left">
            © {new Date().getFullYear()} OFC Création d&apos;Entreprise · Organisme certifié Qualiopi
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/laure-olivie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-900/50 text-indigo-200 transition-all hover:bg-white/20 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-900/50 text-indigo-200 transition-all hover:bg-white/20 hover:text-white"
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
