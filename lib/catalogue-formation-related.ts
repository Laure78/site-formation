/**
 * Parcours pédagogique — formations complémentaires par fiche catalogue Qualiopi.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  isFormationCataloguePublished,
  isFormationCatalogueRetired,
} from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';
import { getFormationByCode, getFormationBySlug } from '@/data/formations';

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
    card('NIV-04', 'Skills Claude, Projects et Cowork sur vos dossiers BTP.'),
    card('NIV-03', 'Suivi chantier, comptes rendus et DOE avec l’IA.'),
  ],
  'NIV-02': [
    card('NIV-01', 'Les bases de l’IA sur devis, CR et documents courants.'),
    card('NIV-04', 'Industrialiser DCE et mémoires avec Claude AI (Skills, Cowork).'),
    {
      href: LINKS.formationIaMarchePublicTravaux,
      title: 'Formation IA marché public de travaux',
      teaser: 'Cadre réglementaire et usages IA sur marchés publics.',
    },
  ],
  'NIV-03': [
    card('NIV-01', 'Fondamentaux IA générative pour le BTP.'),
    card('NIV-02', 'Appels d’offres, DCE et mémoire technique.'),
    card('NIV-04', 'Skills Claude chantier, juridique et coordination.'),
  ],
  'NIV-04': [
    card('NIV-02', 'Pour approfondir l’analyse de vos documents marchés publics.'),
    card('NIV-01', 'Si vous devez consolider les bases IA avant d’industrialiser Claude.'),
    card('NIV-10', 'Pour créer ensuite un outil métier réutilisable.'),
  ],
  'NIV-05': [card('NIV-02', 'DCE et mémoires.'), card('NIV-03', 'Conduite de travaux.'), card('NIV-01', 'Bases IA.')],
  'NIV-06': [card('NIV-02', 'Préparer le chiffrage depuis le DCE.'), card('NIV-01', 'Bases IA.'), card('NIV-08', 'Assistants métré et devis.')],
  'NIV-07': [card('NIV-08', 'Assistants personnalisés.'), card('NIV-02', 'Appels d’offres.'), card('NIV-01', 'Bases IA.')],
  'NIV-08': [card('NIV-01', 'Prérequis — bases IA BTP.'), card('NIV-02', 'Appels d’offres et DCE.'), card('NIV-03', 'Chantier et DOE.')],
  'NIV-09': [
    card('NIV-04', 'Industrialiser Claude, Projects et consignes réutilisables.'),
    card('NIV-01', 'Bases IA — prérequis recommandé.'),
    card('NIV-10', 'Passer à une application métier sur mesure.'),
  ],
  'NIV-10': [
    {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      title: getFormationByCode('NIV-01')!.titre,
      teaser: 'Niveau 1 — devis, emails et productivité avec l’IA, 4 h.',
    },
    card('NIV-03', 'Suivi de chantier, comptes rendus et DOE avec l’IA.'),
  ],
};

function catalogueCodeFromHref(href: string): FormationCatalogueCode | null {
  const m = href.match(/^\/formations\/([^/]+)$/);
  if (!m) return null;
  const f = getFormationBySlug(m[1]);
  return f ? (f.code as FormationCatalogueCode) : null;
}

export function getRelatedCatalogueFormations(
  ref: FormationCatalogueCode,
  at: Date = new Date(),
): readonly RelatedCatalogueFormation[] {
  const raw = RELATED_BY_REF[ref] ?? [];
  return raw.filter((item) => {
    const code = catalogueCodeFromHref(item.href);
    if (!code) return true;
    if (isFormationCatalogueRetired(code)) return false;
    return isFormationCataloguePublished(code, at);
  });
}
