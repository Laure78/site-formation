import type { FAQItem } from '@/lib/faq';
import { PREUVES } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';

/** FAQ page `/avis-clients` — où trouver les retours sur les formations. */
export const FAQ_AVIS_CLIENTS_PAGE: readonly FAQItem[] = [
  {
    q: 'Où consulter les avis sur les formations de Laure Olivié ?',
    a: `Les avis Google des participants sont regroupés sur <a href="${LINKS.avisClients}">cette page avis clients</a> (note agrégée et commentaires publiés sur la fiche Google Maps). Les indicateurs de satisfaction Qualiopi (${PREUVES.satisfaction}, ${PREUVES.repondants} répondants, période ${PREUVES.periode}) sont détaillés sur la page <a href="${LINKS.indicateursResultats}">indicateurs de résultats</a>. Pour laisser un avis après une session : <a href="${SCHEMA_GOOGLE_REVIEWS_VIEW_URL}" rel="noopener noreferrer">fiche Google OFC</a>.`,
  },
];
