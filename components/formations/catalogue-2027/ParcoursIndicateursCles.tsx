import { Calendar, Clock, Coins, Layers, LayoutGrid } from 'lucide-react';
import { libelleDureeParcoursHeures, type ParcoursComputed } from '@/data/catalogue-2027';
import {
  libelleTarificationParcoursHero,
  PARCOURS_MODULARITE_LIBELLE,
  PARCOURS_TARIF_INTER_CALCULE_MENTION,
} from '@/lib/catalogue-2027/parcours-affichage';
import {
  PARCOURS_COMPLET_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
} from '@/lib/catalogue-2027/parcours-commercial-copy';
import { TARIF_INTRA_LIBELLE } from '@/data/catalogue-2027/tarifs';

type Props = {
  parcours: ParcoursComputed;
  className?: string;
};

/** Informations clés — durée, tarif parcours (somme modules), modalités. */
export function ParcoursIndicateursCles({ parcours: p, className = '' }: Props) {
  const items = [
    { icon: Layers, label: 'Modules', sub: `${p.moduleCount} modules` },
    { icon: Clock, label: 'Durée totale', sub: libelleDureeParcoursHeures(p.dureeHeures) },
    {
      icon: Coins,
      label: 'Parcours complet (inter)',
      sub: libelleTarificationParcoursHero(p),
      note: PARCOURS_TARIF_INTER_CALCULE_MENTION,
    },
    { icon: LayoutGrid, label: 'Format', sub: PARCOURS_MODULARITE_LIBELLE },
    { icon: Calendar, label: 'Ouverture', sub: PARCOURS_COMPLET_DISPONIBILITE_LIBELLE },
  ] as const;

  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 ${className}`}
      data-testid="parcours-indicateurs-cles"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</p>
          <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
          {'note' in item && item.note ? (
            <p className="text-[11px] leading-snug text-slate-500">{item.note}</p>
          ) : null}
        </div>
      ))}
      <p className="col-span-2 text-xs text-slate-500 lg:col-span-5">
        {PARCOURS_MODALITE_GEO}. Intra-entreprise : {TARIF_INTRA_LIBELLE.toLowerCase()}.
      </p>
    </div>
  );
}
