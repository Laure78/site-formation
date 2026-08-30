import Link from 'next/link';
import { ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { getFormationByCode } from '@/data/formations';
import {
  CATALOGUE_GAMMES,
  type CatalogueOffer,
  type CatalogueOfferKind,
} from '@/lib/formations-catalogue-architecture';
import { LINKS } from '@/lib/internal-links';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { libelleTarifsDualCourt, type TarifDureeHeures } from '@/lib/tarifs-sessions';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

function kindBadge(kind: CatalogueOfferKind): { label: string; className: string } {
  switch (kind) {
    case 'qualiopi':
      return { label: 'Qualiopi', className: 'bg-[#EFF6FF] text-[#1D4ED8]' };
    case 'landing':
      return { label: 'Parcours métier', className: 'bg-[#F0FDF4] text-[#15803D]' };
    default:
      return { label: 'Sur demande', className: 'bg-[#F8FAFC] text-[#64748B]' };
  }
}

function formatOfferTarifs(tarifDurees?: readonly TarifDureeHeures[]): string | null {
  if (!tarifDurees?.length) return null;
  return tarifDurees.map((d) => `${d} h : ${libelleTarifsDualCourt(d)}`).join(' · ');
}

function CatalogueOfferCard({ offer }: { offer: CatalogueOffer }) {
  const badge = kindBadge(offer.kind);
  const formation = offer.catalogueRef ? getFormationByCode(offer.catalogueRef) : undefined;
  const rdvHref =
    offer.kind === 'qualiopi' && formation
      ? calendlyCatalogueUrl(`intra-${formation.slug}`)
      : LINKS.prendreRdv;
  const tarifsLabel = formatOfferTarifs(offer.tarifDurees);

  return (
    <article className={`${OFC_CARD} flex h-full flex-col rounded-2xl p-5 md:p-6`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badge.className}`}>
          {badge.label}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
          <Clock size={14} aria-hidden />
          {offer.durationLabel}
        </span>
      </div>
      <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-[#0F172A]">{offer.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-[#475569]">{offer.shortPromise}</p>
      <p className="mt-3 text-xs text-[#64748B]">
        <span className="font-semibold text-[#334155]">Public :</span> {offer.audience}
      </p>
      {tarifsLabel ? (
        <p className="mt-2 text-xs leading-relaxed text-[#475569]">
          <span className="font-semibold text-[#334155]">Tarifs :</span> {tarifsLabel}
        </p>
      ) : null}
      <ul className="mt-4 flex-1 space-y-1.5">
        {offer.useCases.slice(0, 3).map((useCase) => (
          <li key={useCase} className="text-sm text-[#334155] before:mr-2 before:text-[#377CF3] before:content-['▸']">
            {useCase}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link href={offer.href} className={`${OFC_CTA_PRIMARY} gap-2 rounded-lg px-4 py-2.5 text-sm`}>
          Découvrir la formation
          <ArrowRight size={16} aria-hidden />
        </Link>
        <Link
          href={rdvHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:border-[#377CF3] hover:text-[#377CF3]"
        >
          <MessageCircle size={16} aria-hidden />
          Parler de votre besoin
        </Link>
      </div>
    </article>
  );
}

/**
 * Architecture catalogue — 3 gammes (Découvrir · Appliquer · Déployer) et thématiques métier.
 */
export function FormationsCatalogueGammeSection() {
  return (
    <section
      id="catalogue-gammes"
      className="mt-10 space-y-12"
      aria-labelledby="catalogue-gammes-heading"
    >
      <div className="text-center">
        <h2
          id="catalogue-gammes-heading"
          className="font-display text-2xl font-bold text-[#0F172A] md:text-[1.75rem]"
        >
          Choisir sa gamme de formation
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#64748B] md:text-base">
          Je débute → <strong>Découvrir</strong>. J&apos;ai un besoin métier → <strong>Appliquer par métier</strong>.
          Je veux structurer l&apos;IA dans mon entreprise → <strong>Déployer</strong>.
        </p>
      </div>

      {CATALOGUE_GAMMES.map((gamme) => (
        <div key={gamme.id} id={`gamme-${gamme.id}`} className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline gap-3 border-b border-[#E2E8F0] pb-4">
            <span className="font-display text-sm font-bold text-[#377CF3]">{gamme.number}</span>
            <h3 className="font-display text-xl font-bold text-[#0F172A] md:text-2xl">{gamme.title}</h3>
            <span className="text-sm text-[#64748B]">— {gamme.subtitle}</span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#475569]">{gamme.description}</p>

          <div className="mt-8 space-y-10">
            {gamme.themes.map((theme) => (
              <div key={`${gamme.id}-${theme.id}`}>
                <h4 className="font-display text-base font-semibold text-[#0F172A] md:text-lg">{theme.title}</h4>
                <p className="mt-1 text-sm text-[#64748B]">{theme.description}</p>
                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {theme.offers.map((offer) => (
                    <CatalogueOfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-center text-sm text-[#64748B]">
        Les parcours certifiés Qualiopi sont détaillés ci-dessous avec programmes PDF.{' '}
        <Link href={LINKS.financement} className={`font-medium ${OFC_LINK}`}>
          Financement selon éligibilité
        </Link>
        .
      </p>
    </section>
  );
}
