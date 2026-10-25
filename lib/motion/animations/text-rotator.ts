import gsap from 'gsap';
import { GSAP_DURATION, GSAP_EASE, prefersReducedMotion } from '@/lib/motion/gsap-shared';

const INTERVAL_MS = 2500;

/**
 * Pilule avec texte qui alterne verticalement.
 * `data-rotator-items="Item A|Item B|Item C"` ou JSON array dans data-rotator-items.
 */
export function initTextRotator(root: HTMLElement): (() => void) | void {
  const raw = root.dataset.rotatorItems ?? '';
  const items = parseRotatorItems(raw);
  if (items.length <= 1) return;

  const track = root.querySelector<HTMLElement>('[data-rotator-track]');
  const viewport =
    root.querySelector<HTMLElement>('[data-rotator-viewport]') ??
    root.querySelector<HTMLElement>('.anim-rotator-viewport');
  if (!track || !viewport) return;

  if (prefersReducedMotion()) {
    track.textContent = items[0];
    return;
  }

  let index = 0;
  track.innerHTML = '';
  for (const label of items) {
    const line = document.createElement('span');
    line.className = 'anim-rotator-line block leading-none';
    line.textContent = label;
    track.appendChild(line);
  }
  const firstClone = document.createElement('span');
  firstClone.className = 'anim-rotator-line block leading-none';
  firstClone.textContent = items[0];
  track.appendChild(firstClone);

  const tick = () => {
    const lineHeight = track.querySelector<HTMLElement>('.anim-rotator-line')?.offsetHeight ?? 0;
    index += 1;
    gsap.to(track, {
      y: -index * lineHeight,
      duration: GSAP_DURATION.sm * 0.65,
      ease: GSAP_EASE,
      onComplete: () => {
        if (index >= items.length) {
          index = 0;
          gsap.set(track, { y: 0 });
        }
      },
    });
  };

  const intervalId = setInterval(tick, INTERVAL_MS);

  return () => {
    clearInterval(intervalId);
  };
}

function parseRotatorItems(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      /* fallback pipe */
    }
  }
  return trimmed.split('|').map((s) => s.trim()).filter(Boolean);
}
