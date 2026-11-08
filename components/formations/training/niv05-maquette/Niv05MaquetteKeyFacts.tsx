import { Clock, Coins, Layers, MapPin, Users } from 'lucide-react';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';
import { formatNumberFr } from '@/lib/format-number-fr';
import { TARIF_PARTICIPANT_NIV05_HT } from '@/lib/tarifs-catalogue-participant';

type Props = {
  effectifMin: number;
  effectifMax: number;
  levelBadgeLabel: string;
};

export function Niv05MaquetteKeyFacts({ effectifMin, effectifMax, levelBadgeLabel }: Props) {
  return (
    <section aria-labelledby="niv05-indicateurs-title" className="border-b border-slate-100 bg-white py-6">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="niv05-indicateurs-title" className="sr-only">
          Informations clés de la formation
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {[
            { icon: Layers, sub: levelBadgeLabel },
            { icon: Clock, sub: '4 h · 240 min' },
            {
              icon: Coins,
              sub: `${formatNumberFr(TARIF_PARTICIPANT_NIV05_HT)} € HT / participant (inter)`,
            },
            { icon: MapPin, sub: SITE_FORMATION_MODALITE_ENCART },
            { icon: Users, sub: `${effectifMin} à ${effectifMax} participants` },
          ].map((item) => (
            <div
              key={item.sub}
              className="flex flex-col gap-2 rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-4 shadow-sm"
            >
              <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
              <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
          Session intra sur devis — TVA exonérée, article 261-4-4° du CGI. Financement OPCO possible selon
          éligibilité.
        </p>
      </div>
    </section>
  );
}
