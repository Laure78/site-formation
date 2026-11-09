import { Calendar, Clock, Coins, Layers, LayoutGrid } from 'lucide-react';
import { libelleDureeParcoursHeures, type ParcoursComputed } from '@/data/catalogue-2027';
import {
  PARCOURS_MODULARITE_LIBELLE,
  PARCOURS_OUVERTURE_2027,
  PARCOURS_TARIFS_PAR_MODULE,
} from '@/lib/catalogue-2027/parcours-affichage';
import { PARCOURS_MODALITE_GEO } from '@/lib/catalogue-2027/parcours-commercial-copy';

type Props = {
  parcours: ParcoursComputed;
  className?: string;
};

/**
 * Informations clés — pas de prix global parcours.
 */
export function ParcoursIndicateursCles({ parcours: p, className = '' }: Props) {
  const calendrier = PARCOURS_OUVERTURE_2027;

  const items = [
    { icon: Layers, label: 'Modules', sub: `${p.moduleCount} modules` },
    { icon: Clock, label: 'Durée totale', sub: libelleDureeParcoursHeures(p.dureeHeures) },
    { icon: Coins, label: 'Tarification', sub: PARCOURS_TARIFS_PAR_MODULE },
    { icon: LayoutGrid, label: 'Format', sub: PARCOURS_MODULARITE_LIBELLE },
    { icon: Calendar, label: 'Calendrier', sub: calendrier },
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
        </div>
      ))}
      <p className="col-span-2 text-xs text-slate-500 lg:col-span-5">
        {PARCOURS_MODALITE_GEO}. Intra-entreprise : sur devis.
      </p>
    </div>
  );
}
