import type { ParcoursComputed } from '@/data/catalogue-2027';
import {
  texteInitiationSansPrix,
  texteVarianteSansPrix,
} from '@/lib/catalogue-2027/parcours-affichage';

type Props = {
  parcours: ParcoursComputed;
  className?: string;
};

/** Variantes pédagogiques sans montant global. */
export function ParcoursMentionsOptionnelles({ parcours: p, className = '' }: Props) {
  const variante = texteVarianteSansPrix(p);
  const initiation = texteInitiationSansPrix(p);
  if (!variante && !initiation) return null;

  return (
    <aside className={`space-y-2 text-sm text-slate-600 ${className}`}>
      {variante ? <p>{variante}</p> : null}
      {initiation ? <p>{initiation}</p> : null}
    </aside>
  );
}
