import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Calendar, Star, Users } from 'lucide-react';
import { calendlyClaudeBtpGuideUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { CLAUDE_AI_BTP_WORD_COUNT } from '@/lib/claude-ai-btp-jsonld';
import { LINKS } from '@/lib/internal-links';

const READING_MINUTES = Math.max(12, Math.round(CLAUDE_AI_BTP_WORD_COUNT / 220));

const HERO_BG = '/images/claude-btp-hero-chantier-2026.png';

/**
 * Hero premium page pilier Claude AI BTP — fond immersif, charte OFC (#377CF3 / #1E40AF).
 */
export function ClaudeAiBtpHero() {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden border-b border-white/10 text-white"
      aria-labelledby="claude-btp-hero-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/85 via-[#377CF3]/82 to-[#2563EB]/85"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20 lg:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 md:text-xs">
          Anthropic · Claude AI · Guide BTP 2026
        </p>

        <h1
          id="claude-btp-hero-title"
          className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[56px] lg:leading-[1.06]"
        >
          Claude AI pour le BTP
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-white/90 md:text-xl md:leading-relaxed">
          Interfaces, workflows et prompts pour conducteurs de travaux, chargés d&apos;affaires et dirigeants — gain de
          temps mesurable sur DCE, comptes rendus et relances.
        </p>

        <p className="mt-6 text-sm text-white/80 md:text-base">
          Temps de lecture estimé : environ {READING_MINUTES} minutes · guide mis à jour en avril 2026
        </p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Thématiques de la page">
          {['ClaudeAI', 'BTP', 'Formation', 'IA chantier', 'Qualiopi', 'Constructys'].map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm">
                #{tag}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={calendlyClaudeBtpGuideUrl('hero')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#1E40AF] shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Calendar className="h-5 w-5 shrink-0" aria-hidden />
            Visio découverte gratuite
            <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          </a>
          <Link
            href={LINKS.diagnostic}
            className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.01] hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Diagnostic IA BTP
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/20 pt-8 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5 font-medium text-white/85">
            <Award className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Laure Olivié · OFC Création d&apos;Entreprise
          </span>
          <span className="hidden sm:inline text-white/35" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Qualiopi · Constructys
          </span>
          <span className="hidden sm:inline text-white/35" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />+{formatProfessionalsTrainedCount()} formés ·{' '}
            {SOCIAL_PROOF.AVERAGE_RATING}
          </span>
        </div>

        <p className="mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/65 md:text-left">
          Claude AI · BTP — chantier, interfaces et méthode terrain OFC
        </p>
      </div>
    </section>
  );
}
