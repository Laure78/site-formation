/**
 * Bloc « En bref » — fiche NIV-05 / maîtrise d’œuvre (tarifs depuis le catalogue).
 */
import { dureeCatalogueParCode } from '@/lib/catalogue-duree-copy';
import { formatOrganismeQualiopiCourt } from '@/lib/marque-identite';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV02_HT,
} from '@/lib/tarifs-catalogue-participant';

export function formationMoeNiv05EnBref(): string {
  const tarif = libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT);
  return `Formation de ${dureeCatalogueParCode('NIV-05')} en présentiel en Île-de-France pour maîtres d’œuvre, MOEX et pilotes OPC ; CCTP, DPGF, analyse des offres, CR, OS, visas, OPR ; ${tarif}, identique en intra et en inter ; par Laure Olivié, OFC Création d’Entreprise, ${formatOrganismeQualiopiCourt()}.`;
}