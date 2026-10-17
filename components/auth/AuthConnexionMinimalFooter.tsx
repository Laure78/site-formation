'use client';

import Link from 'next/link';
import { requestCookieConsentDialog } from '@/lib/cookie-consent';
import { LINKS } from '@/lib/internal-links';
import { SITE } from '@/lib/site';

/** Pied de page discret — page /auth/connexion uniquement. */
export function AuthConnexionMinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200/80 bg-white/60 px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center text-sm text-slate-600">
        <p>
          © {year} {SITE.legalName}
        </p>
        <nav aria-label="Informations légales" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <Link
            href={LINKS.mentionsLegales}
            className="font-medium text-slate-600 underline-offset-2 hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Mentions légales
          </Link>
          <span className="text-slate-300 select-none" aria-hidden>
            ·
          </span>
          <Link
            href={LINKS.politiqueConfidentialite}
            className="font-medium text-slate-600 underline-offset-2 hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Politique de confidentialité
          </Link>
          <span className="text-slate-300 select-none" aria-hidden>
            ·
          </span>
          <button
            type="button"
            onClick={() => requestCookieConsentDialog()}
            className="font-medium text-slate-600 underline-offset-2 hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Gérer mes cookies
          </button>
        </nav>
      </div>
    </footer>
  );
}
