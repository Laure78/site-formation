import { CtaVisio } from '@/components/CtaVisio';
import { SITE } from '@/lib/site-config';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

/** Bandeau conversion pleine largeur — bas d’article MOE. */
export function BlogArticleMoeFinalBandeau() {
  const note = formatNoteSatisfactionAffichageComplet();
  const qualiopi = SITE.qualiopi.numero;

  return (
    <section
      className="relative left-1/2 right-1/2 -mx-[50vw] mt-16 w-screen bg-[#377CF3] px-4 py-12 text-white sm:px-8 md:py-14"
      aria-labelledby="bandeau-moe-ia"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="bandeau-moe-ia" className="font-display text-2xl font-bold md:text-3xl">
          Formez votre agence de maîtrise d&apos;œuvre à l&apos;IA
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
          Présentiel en Île-de-France · Qualiopi n° {qualiopi} · {note} · prise en charge
          OPCO/Constructys selon éligibilité
        </p>
        <div className="mt-8 flex justify-center">
          <CtaVisio
            src="blog-moe"
            className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-white px-8 py-3.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50"
          />
        </div>
      </div>
    </section>
  );
}
