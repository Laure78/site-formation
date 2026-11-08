import type { ParcoursComputed } from '@/data/catalogue-2027';
import { PARCOURS_METIER_TEMPLATE_BY_ID } from '@/lib/catalogue-2027/parcours-metier-template-content';
import { ParcoursMetierTemplate } from './ParcoursMetierTemplate';

type Props = { parcours: ParcoursComputed };

export function ParcoursConducteurDeTravauxLanding({ parcours }: Props) {
  return (
    <ParcoursMetierTemplate
      parcours={parcours}
      content={PARCOURS_METIER_TEMPLATE_BY_ID['conducteur-de-travaux']}
    />
  );
}
