'use client';

import { useEffect, useState } from 'react';

/**
 * Fine barre de progression de lecture — articles blog uniquement (via layout `[slug]`).
 * Couleur charte #377CF3 · z-index au-dessus du header sans masquer le CTA RDV.
 */
export function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const next = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setProgress(next);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div
      className="blog-reading-progress"
      role="progressbar"
      aria-label="Progression de lecture de l'article"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div className="blog-reading-progress__bar" style={{ width: `${percent}%` }} />
    </div>
  );
}
