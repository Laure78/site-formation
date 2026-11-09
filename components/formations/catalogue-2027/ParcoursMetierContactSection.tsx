'use client';

import { FormationsContact2027 } from './FormationsContact2027';
import { useParcoursModuleSelection } from './parcours-module-selection-context';
import { PARCOURS_CONTACT_HEADINGS } from '@/lib/catalogue-2027/parcours-contact-headings';

/** Formulaire parcours — objet et message selon l’intention (programme ou devis). */
export function ParcoursMetierContactSection() {
  const {
    formationHint,
    devisMessage,
    programmeMessage,
    contactCopy,
    participantRoleDefault,
    demandeType,
    selectedCodes,
    formIntent,
    contactObjet,
  } = useParcoursModuleSelection();

  const formKey = `${formIntent}-${demandeType}-${[...selectedCodes].sort().join(',')}`;
  const headings = PARCOURS_CONTACT_HEADINGS[formIntent];
  const initialMessage = formIntent === 'programme' ? programmeMessage : devisMessage;

  return (
    <FormationsContact2027
      key={formKey}
      formationHint={formationHint}
      initialObjet={contactObjet}
      initialMetier={participantRoleDefault}
      initialMessage={initialMessage}
      messagePlaceholder={contactCopy.messagePlaceholder}
      needExample={contactCopy.needExample}
      parcoursMetiersContext
      sectionTitle={headings.title}
      sectionLead={headings.lead}
    />
  );
}
