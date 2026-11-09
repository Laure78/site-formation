'use client';

import { FormationsContact2027 } from './FormationsContact2027';
import { useParcoursModuleSelection } from './parcours-module-selection-context';

/** Formulaire devis — message et métier synchronisés avec la sélection modules. */
export function ParcoursMetierContactSection() {
  const {
    formationHint,
    devisMessage,
    contactCopy,
    participantRoleDefault,
    demandeType,
    selectedCodes,
  } = useParcoursModuleSelection();

  const formKey = `${demandeType}-${[...selectedCodes].sort().join(',')}`;

  return (
    <FormationsContact2027
      key={formKey}
      formationHint={formationHint}
      initialObjet="devis"
      initialMetier={participantRoleDefault}
      initialMessage={devisMessage}
      messagePlaceholder={contactCopy.messagePlaceholder}
      needExample={contactCopy.needExample}
      parcoursMetiersContext
    />
  );
}
