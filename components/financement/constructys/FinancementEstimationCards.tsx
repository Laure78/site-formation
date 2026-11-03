import Image from 'next/image';
import {
  FINANCEMENT_ESTIMATION_DISCLAIMER,
  FINANCEMENT_ESTIMATION_INTRA_4H,
  formatMontantHt,
  getFinancementEstimationExemplesIntra4h,
} from '@/lib/financement-constructys-page-config';
import { PHOTOS } from '@/lib/photos';
import { FC_CARD, FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

const PHOTOS_EXEMPLES = [
  PHOTOS.constructysDevisFinancement,
  PHOTOS.constructysConducteurTravaux,
] as const;

export function FinancementEstimationCards() {
  const exemples = getFinancementEstimationExemplesIntra4h();
  const { dureeHeures, participants } = FINANCEMENT_ESTIMATION_INTRA_4H;

  return (
    <section id="estimation-financement" aria-labelledby="estimation-title" className={FC_SECTION}>
      <h2 id="estimation-title" className={FC_TITLE}>
        Exemple pour une formation intra de {dureeHeures} h
      </h2>
      <p className={FC_SUBTITLE}>
        {participants} participants · coût pédagogique facturé{' '}
        {formatMontantHt(FINANCEMENT_ESTIMATION_INTRA_4H.coutPedagogiqueFactureHt)}. Calcul retenu
        : minimum entre plafond horaire × durée × stagiaires, plafond intra applicable et coût
        facturé.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {exemples.map((ex, index) => {
          const photo = PHOTOS_EXEMPLES[index] ?? PHOTOS.constructysDevisFinancement;
          return (
            <article key={ex.id} className={`${FC_CARD} overflow-hidden p-0`}>
              <div
                className="relative w-full bg-[#EAF3FF]"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg font-bold text-[#081943]">{ex.tranche}</h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  Groupe : {ex.participants} participants
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3 border-b border-[#EAF3FF] pb-2.5">
                    <dt className="text-[#64748B]">Coût facturé</dt>
                    <dd className="font-bold text-[#081943]">{formatMontantHt(ex.tarifFactureHt)}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-[#EAF3FF] pb-2.5">
                    <dt className="text-[#64748B]">Participation estimée</dt>
                    <dd className="font-bold text-[#377CF3]">{formatMontantHt(ex.priseEnChargeHt)}</dd>
                  </div>
                  <div className="flex justify-between gap-3 pt-0.5">
                    <dt className="text-[#64748B]">Reste à charge possible</dt>
                    <dd className="font-bold text-[#081943]">
                      {formatMontantHt(ex.resteAChargeHt)}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-5 rounded-xl bg-[#EAF3FF] px-4 py-3 text-center text-sm text-ofc-ink-muted">
        {FINANCEMENT_ESTIMATION_DISCLAIMER}
      </p>
    </section>
  );
}
