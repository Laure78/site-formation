import { Award, Star, Users } from 'lucide-react';
import { PillarPageHero } from '@/components/pillar/PillarPageHero';
import { calendlyClaudeBtpGuideUrl } from '@/lib/calendly';
import { SOCIAL_PROOF } from '@/lib/constants';
import { CLAUDE_AI_BTP_WORD_COUNT } from '@/lib/claude-ai-btp-jsonld';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

const READING_MINUTES = Math.max(12, Math.round(CLAUDE_AI_BTP_WORD_COUNT / 220));
const HERO_VISUAL = PHOTOS.claudeBtpGuideHero2026;

/**
 * Hero premium page pilier Claude AI BTP — affiche circulaire + charte OFC (#377CF3).
 */
export function ClaudeAiBtpHero() {
  return (
    <PillarPageHero
      variant="splitImage"
      surface="muted"
      eyebrow="Anthropic · Claude AI · Guide BTP 2026"
      title="Claude AI pour le BTP"
      titleId="claude-btp-hero-title"
      contentUpdatedAt={getPillarPageContentUpdatedAt('/claude-ai-btp')}
      subtitle={
        <>
          Interfaces, workflows et prompts pour TPE &amp; PME du bâtiment, professionnels du BTP, conducteurs de
          travaux, chargés d&apos;affaires, dirigeants et équipes administratives — gain de temps mesurable sur devis,
          DCE, CCTP, mémoires techniques, comptes rendus et relances.
        </>
      }
      metaLine={`Temps de lecture estimé : environ ${READING_MINUTES} minutes`}
      tags={['ClaudeAI', 'BTP', 'Formation', 'IA chantier', 'Qualiopi', 'Constructys']}
      primaryCta={{ href: calendlyClaudeBtpGuideUrl('hero'), label: 'Visio découverte gratuite' }}
      secondaryCta={{ href: LINKS.diagnostic, label: 'Diagnostic IA BTP', external: false }}
      sideImage={{
        src: HERO_VISUAL.src,
        alt: HERO_VISUAL.alt,
        width: HERO_VISUAL.width,
        height: HERO_VISUAL.height,
        objectFit: 'contain',
        circular: true,
        qualiopiBadge: false,
      }}
      credibilityLine={
        <>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#475569]">
            <Award className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Laure Olivié · formatrice IA spécialisée BTP · OFC Création d&apos;Entreprise
          </span>
          <span className="hidden sm:inline text-slate-300" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Qualiopi · Constructys
          </span>
          <span className="hidden sm:inline text-slate-300" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />+
            </span>
        </>
      }
      bottomNote="Claude AI · BTP — interfaces, prompts et méthode terrain OFC"
    />
  );
}
