import { LINKS } from '@/lib/internal-links';
import type { ParcoursId } from '@/data/catalogue-2027';

const PARCOURS_LINKS: Record<ParcoursId, string> = {
  'dirigeant-pme-btp': LINKS.parcoursDirigeantPmeBtp,
  'charge-affaires-btp': LINKS.parcoursChargeAffairesBtp,
  'conducteur-de-travaux': LINKS.parcoursConducteurDeTravaux,
  'chef-de-chantier': LINKS.parcoursChefDeChantier,
  'chef-dequipe': LINKS.parcoursChefDequipe,
  'assistant-de-gestion-btp': LINKS.parcoursAssistantDeGestionBtp,
  'referent-ia-btp': LINKS.parcoursReferentIaBtp,
};

export function parcoursHref(id: ParcoursId | string): string {
  return PARCOURS_LINKS[id as ParcoursId] ?? `${LINKS.formations}/parcours/${id}`;
}
