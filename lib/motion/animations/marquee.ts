/** Bandeau logos — duplication DOM pour boucle CSS (pas de GSAP requis). */
export function initMarquee(root: HTMLElement): (() => void) | void {
  const track = root.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track || track.dataset.marqueeCloned === 'true') return;

  const items = track.innerHTML;
  track.insertAdjacentHTML('beforeend', items);
  track.dataset.marqueeCloned = 'true';
  root.classList.add('anim-marquee-ready');
}
