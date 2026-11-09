'use client';

import { FormationsContact2027 } from '@/components/formations/catalogue-2027/FormationsContact2027';
import { PARCOURS_HUB_CONTACT_COPY } from '@/lib/catalogue-2027/parcours-contact-copy';
import { PARCOURS_CONTACT_HEADINGS } from '@/lib/catalogue-2027/parcours-contact-headings';
import { useParcoursHubContact } from './parcours-hub-contact-context';

const HUB_PROGRAMME_MESSAGE =
  'Demande : programme d’un ou plusieurs parcours métiers du catalogue 2027.\nMerci de préciser le métier visé (dirigeant, affaires, conduite de travaux, gestion, référent IA) et les modules ou parcours complets concernés.';

const HUB_DEVIS_MESSAGE =
  'Demande de devis — parcours métiers BTP.\nMerci de préciser le parcours, les modules retenus, l’effectif, le format inter ou intra et la période souhaitée (2027 ou ultérieure).';

export function ParcoursMetiersHubContactSection() {
  const { formIntent, contactObjet } = useParcoursHubContact();
  const headings = PARCOURS_CONTACT_HEADINGS[formIntent];
  const initialMessage = formIntent === 'programme' ? HUB_PROGRAMME_MESSAGE : HUB_DEVIS_MESSAGE;

  return (
    <FormationsContact2027
      key={formIntent}
      formationHint="Parcours métiers BTP — catalogue 2027"
      initialObjet={contactObjet}
      initialMetier={PARCOURS_HUB_CONTACT_COPY.participantRoleDefault}
      initialMessage={initialMessage}
      messagePlaceholder={PARCOURS_HUB_CONTACT_COPY.messagePlaceholder}
      needExample={PARCOURS_HUB_CONTACT_COPY.needExample}
      parcoursMetiersContext
      sectionTitle={headings.title}
      sectionLead={headings.lead}
    />
  );
}
