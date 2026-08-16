import {
  MENTION_TVA_ANCHOR_ID,
  MENTIONS_TVA_EXONERATION,
} from '@/lib/tarifs-sessions';

type AsterisqueProps = {
  className?: string;
};

/**
 * Astérisque renvoyant à la mention TVA unique (`#mention-tva`).
 * À placer immédiatement après chaque affichage de prix.
 */
export function MentionTvaAsterisque({ className = '' }: AsterisqueProps) {
  return (
    <a
      href={`#${MENTION_TVA_ANCHOR_ID}`}
      className={`ml-0.5 inline-block align-super text-[0.7em] font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${className}`.trim()}
      aria-label="Voir la mention TVA — prix nets, exonération formation professionnelle"
      title="Mention TVA"
    >
      *
    </a>
  );
}

type MentionProps = {
  className?: string;
  /** Affiche le symbole * devant le texte (défaut true). */
  showSymbol?: boolean;
};

/**
 * Mention TVA unique par page — cas exonération formation professionnelle continue.
 * Une seule instance avec cet `id` par document.
 */
export function MentionTVA({ className = '', showSymbol = true }: MentionProps) {
  return (
    <p
      id={MENTION_TVA_ANCHOR_ID}
      className={`scroll-mt-28 text-sm leading-relaxed text-slate-600 ${className}`.trim()}
    >
      {showSymbol ? (
        <span className="font-semibold text-slate-800" aria-hidden>
          *{' '}
        </span>
      ) : null}
      {MENTIONS_TVA_EXONERATION}
    </p>
  );
}
