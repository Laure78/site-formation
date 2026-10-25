import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_EASE, prefersReducedMotion } from '@/lib/motion/gsap-shared';
import { formatNumberFr } from '@/lib/format-number-fr';

/**
 * Compteur type odomètre — défilement vertical des chiffres.
 * `data-to="15000"` · option `data-odometer-step="100"` · `data-odometer-prefix` / `suffix`.
 */
export function initOdometer(root: HTMLElement): (() => void) | void {
  const to = Number(root.dataset.to ?? root.dataset.odometerTo);
  if (!Number.isFinite(to)) return;

  const from = Number(root.dataset.from ?? 0);
  const step = Math.max(1, Number(root.dataset.odometerStep ?? inferStep(to - from)));
  const prefix = root.dataset.odometerPrefix ?? '';
  const suffix = root.dataset.odometerSuffix ?? '';
  const decimals = Number(root.dataset.odometerDecimals ?? 0);

  const finalText = `${prefix}${formatNumberFr(to, decimals)}${suffix}`;
  root.setAttribute('aria-label', finalText);

  if (prefersReducedMotion()) {
    root.textContent = finalText;
    return;
  }

  const column = document.createElement('span');
  column.className = 'anim-odometer-column inline-flex h-[1em] flex-col overflow-hidden align-baseline';
  column.setAttribute('aria-hidden', 'true');

  const values: number[] = [];
  for (let v = from; v < to; v += step) values.push(v);
  if (values[values.length - 1] !== to) values.push(to);

  for (const v of values) {
    const row = document.createElement('span');
    row.className = 'anim-odometer-row block leading-none';
    row.textContent = `${prefix}${formatNumberFr(v, decimals)}${suffix}`;
    column.appendChild(row);
  }

  root.textContent = '';
  root.append(column);

  const rows = column.querySelectorAll<HTMLElement>('.anim-odometer-row');
  const lastIndex = rows.length - 1;

  gsap.set(column, { y: 0 });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(column, {
        y: () => -lastIndex * (rows[0]?.offsetHeight ?? 0),
        duration: 1.2,
        ease: GSAP_EASE,
      });
    },
  });

  return () => st.kill();
}

function inferStep(range: number): number {
  if (range <= 20) return 1;
  if (range <= 200) return 10;
  if (range <= 2000) return 100;
  return 1000;
}
