import { Building2, ArrowUpRight } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';

type Props = {
  /** Ancre pour TOC / liens profonds (ex. a-propos#bework). */
  id?: string;
  /** Bande grise accueil ou carte intégrée dans un article long. */
  surface?: 'band' | 'card';
};

/**
 * Mise en avant BeWork — service relais BTP (site externe), distinct des formations OFC Qualiopi.
 */
export function BeWorkHighlightSection({ id, surface = 'band' }: Props) {
  const isCard = surface === 'card';
  const headingId = id ? 'bework-heading' : 'bework-heading-home';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={
        isCard
          ? 'scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8'
          : 'border-b border-slate-200 bg-[#F2F2F2] px-4 py-14 md:py-16'
      }
    >
      <div className={isCard ? '' : 'mx-auto max-w-6xl'}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl p-4 shadow-[0_4px_16px_rgba(55,124,243,0.08)] ${
              isCard ? 'bg-[#D4E3FC]/80' : 'bg-white'
            }`}
            aria-hidden
          >
            <Building2 className="h-12 w-12 text-[#377CF3]" strokeWidth={1.5} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
              Assistant de gestion travaux · Relais BTP
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">Augmenté par l’IA · note chantier</p>

            <h2
              id={headingId}
              className="mt-4 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
            >
              Un assistant travaux à vos côtés pour tenir le rythme du chantier
            </h2>

            <p className="mt-4 text-base font-semibold leading-relaxed text-[#1A1A1A] md:text-lg">
              Le relais BTP qui vous aide à produire vos documents, suivre vos chantiers et répondre plus vite.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-[#5A5A5A] md:text-base">
              <span className="font-semibold text-[#1A1A1A]">BeWork</span> accompagne les pros du BTP sur les tâches
              les plus chronophages : comptes rendus de chantier, analyse de DCE, PPSPS, mémoire technique, chiffrage de
              devis, dossiers travaux, relances et suivi administratif. Proposition distincte des{' '}
              <span className="text-[#334155]">formations certifiées Qualiopi OFC Création d’Entreprise</span> : un
              relais opérationnel pour votre bureau pendant que vous êtes sur le terrain.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — assistants travaux BTP augmentés par l’IA (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.12)] transition-colors hover:bg-[#2A6BD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2"
              >
                Découvrir BeWork sur bework.fr
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
