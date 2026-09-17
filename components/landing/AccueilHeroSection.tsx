import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { Badge } from '@/components/ui/Badge';
import { Stat } from '@/components/ui/Stat';
import {
  getAccueilHeroModalitesLine,
  getAccueilHeroProofItems,
} from '@/lib/accueil-config';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Hero accueil — formations BTP en premier, BeWork en secondaire. */
export function AccueilHeroSection() {
  const proofs = getAccueilHeroProofItems();

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
      <div className="relative mx-auto max-w-[80rem]">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content min-w-0">
            <Badge>Formatrice IA spécialisée BTP</Badge>
            <h1 className={`${OFC_TYPE_HERO} mt-5 max-w-[16ch]`}>
              Formations IA pour les professionnels du BTP
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-5 max-w-xl font-semibold text-ofc-ink`}>
              Apprenez à utiliser l&apos;intelligence artificielle sur vos vrais besoins métier.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ofc-ink-muted md:text-[1.05rem]">
              DCE, appels d&apos;offres, chiffrage, comptes rendus de chantier, documents,
              administratif&nbsp;: découvrez comment utiliser ChatGPT, Claude et les outils d&apos;IA
              pour gagner du temps au quotidien.
            </p>
            <p className="mt-4 max-w-xl text-sm font-medium text-ofc-ink-muted md:text-[0.95rem]">
              {getAccueilHeroModalitesLine()}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#offre-formations"
                data-cta="formations"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Découvrir les formations
              </a>
              <a
                href="#bework"
                data-cta="bework-anchor"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Découvrir BeWork
              </a>
            </div>
            <ul
              className="mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-ofc-border pt-8 sm:grid-cols-4 sm:gap-6"
              aria-label="Preuves et indicateurs"
            >
              {proofs.map((item) => (
                <li key={item.label}>
                  <Stat value={item.value} label={item.label} className="text-left" />
                </li>
              ))}
            </ul>
          </div>

          <aside className="accueil-hero-aside mt-10 w-full min-w-0 md:mt-0 lg:justify-self-end">
            <div className="ofc-card overflow-hidden bg-white/95 p-1.5 lg:max-w-none">
              <AccueilHeroVideo className="aspect-[4/3] h-auto w-full rounded-[1.05rem] object-cover sm:aspect-[16/10] lg:aspect-[4/3]" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
