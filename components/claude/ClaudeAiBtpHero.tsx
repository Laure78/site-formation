import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

/**
 * Hero premium page pilier Claude AI BTP — fond navy, CTA contrastés, charte #377CF3.
 */
export function ClaudeAiBtpHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-950 text-white"
      aria-labelledby="claude-btp-hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 claude-btp-hero-grid opacity-40"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-slate-500/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Guide professionnel · IA chantier &amp; administratif
        </p>
        <h1
          id="claude-btp-hero-title"
          className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
        >
          Claude AI pour le BTP
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
          Interfaces, workflows et prompts pour conducteurs de travaux, chargés d&apos;affaires et dirigeants — gain de
          temps mesurable sur DCE, comptes rendus et relances.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-sm text-slate-400">
          <span className="font-medium text-slate-300">Laure Olivié · OFC Création d&apos;Entreprise</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>Qualiopi · Constructys</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>
            +{formatProfessionalsTrainedCount()} formés · {SOCIAL_PROOF.AVERAGE_RATING}
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-950/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Calendar className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
            Visio découverte gratuite
            <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          </a>
          <Link
            href={LINKS.diagnostic}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
          >
            Diagnostic IA BTP
          </Link>
        </div>
      </div>
    </section>
  );
}
