type HeroWordRevealProps = {
  text: string;
};

/**
 * Titre hero — un mot par masque (GSAP split-words + repli CSS `.accueil-hero-word`).
 */
export function HeroWordReveal({ text }: HeroWordRevealProps) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          className="anim-word-mask accueil-hero-word inline-block overflow-hidden align-bottom"
        >
          <span className="anim-word inline-block">
            {word}
            {index < words.length - 1 ? '\u00a0' : null}
          </span>
        </span>
      ))}
    </>
  );
}
