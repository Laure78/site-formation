/**
 * Parcours pédagogique — formations complémentaires par fiche catalogue Qualiopi.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';
import { getFormationByCode } from '@/data/formations';

export type RelatedCatalogueFormation = {
  href: string;
  title: string;
  teaser: string;
};

function card(code: FormationCatalogueCode, teaser: string): RelatedCatalogueFormation {
  const f = getFormationByCode(code)!;
  return {
    href: `/formations/${f.slug}`,
    title: f.titre,
    teaser,
  };
}

const RELATED_BY_REF: Record<FormationCatalogueCode, readonly RelatedCatalogueFormation[]> = {
  'NIV-01': [
    card('NIV-02', 'Analyser un DCE et structurer un mémoire technique.'),
    card('NIV-08', 'Configurer des assistants IA réutilisables sur vos dossiers.'),
    card('NIV-03', 'Suivi chantier, comptes rendus et DOE avec l’IA.'),
  ],
  'NIV-02': [
    card('NIV-01', 'Les bases de l’IA sur devis, CR et documents courants.'),
    card('NIV-08', 'Automatiser DCE, mémoires et relances avec des assistants.'),
    {
      href: LINKS.formationIaMarchePublicTravaux,
      title: 'Formation IA marché public de travaux',
      teaser: 'Cadre réglementaire et usages IA sur marchés publics.',
    },
  ],
  'NIV-03': [
    card('NIV-01', 'Fondamentaux IA générative pour le BTP.'),
    card('NIV-02', 'Appels d’offres, DCE et mémoire technique.'),
    card('NIV-08', 'Skills et assistants pour le pilotage chantier.'),
  ],
  'NIV-04': [card('NIV-02', 'Appels d’offres et DCE.'), card('NIV-01', 'Bases IA BTP.'), card('NIV-06', 'Chiffrage et études de prix.')],
  'NIV-05': [card('NIV-02', 'DCE et mémoires.'), card('NIV-03', 'Conduite de travaux.'), card('NIV-01', 'Bases IA.')],
  'NIV-06': [card('NIV-02', 'Préparer le chiffrage depuis le DCE.'), card('NIV-01', 'Bases IA.'), card('NIV-08', 'Assistants métré et devis.')],
  'NIV-07': [card('NIV-08', 'Assistants personnalisés.'), card('NIV-02', 'Appels d’offres.'), card('NIV-01', 'Bases IA.')],
  'NIV-08': [card('NIV-01', 'Prérequis — bases IA BTP.'), card('NIV-02', 'Appels d’offres et DCE.'), card('NIV-03', 'Chantier et DOE.')],
  'NIV-09': [card('NIV-08', 'Assistants IA.'), card('NIV-07', 'Applications métier niveau 2.'), card('NIV-01', 'Bases IA.')],
  'NIV-10': [
    {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      title: getFormationByCode('NIV-01')!.titre,
      teaser: 'Catalogue IA pour le BTP — parcours distinct BeWork / création avec l’IA.',
    },
  ],
};

export function getRelatedCatalogueFormations(
  ref: FormationCatalogueCode,
): readonly RelatedCatalogueFormation[] {
  return RELATED_BY_REF[ref] ?? [];
}
