import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';
import { AccueilFaqMaquetteList } from '@/components/landing/accueil/AccueilFaqMaquetteList';
import { RevealShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

/** FAQ accueil — titre à gauche, pastilles en deux colonnes (maquette). */
export function AccueilFaqSection() {
  const mid = Math.ceil(FAQ_ITEMS_HOME.length / 2);
  const colA = FAQ_ITEMS_HOME.slice(0, mid);
  const colB = FAQ_ITEMS_HOME.slice(mid);

  return (
    <AccueilMaquetteSection
      id="accueil-faq"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-faq-heading"
    >
      <div className="accueil-maquette__grid grid gap-8 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
        <RevealShell
          as="div"
          className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height,4.5rem)+0.75rem)]"
          distance={ACCUEIL_MOTION_REVEAL.distance}
        >
          <p className="font-display text-3xl font-extrabold tracking-tight text-[#101936] md:text-4xl" aria-hidden>
            FAQ
          </p>
          <span className="mt-2 block h-1 w-10 rounded-full bg-[#377CF3]" aria-hidden />
          <h2
            id="accueil-faq-heading"
            className="mt-4 font-display text-lg font-extrabold leading-snug text-[#101936] md:text-xl"
          >
            Vos questions fréquentes
          </h2>
        </RevealShell>

        <RevealShell as="div" className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-3.5" delay={ACCUEIL_MOTION_REVEAL.contentDelayMs} distance={ACCUEIL_MOTION_REVEAL.distance}>
          <AccueilFaqMaquetteList items={colA} />
          <AccueilFaqMaquetteList items={colB} />
        </RevealShell>
      </div>
    </AccueilMaquetteSection>
  );
}
