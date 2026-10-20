/**
 * Hub `/etudes-de-cas` — aperçu des références professionnelles (descriptions courtes, distinctes de `/partenaires`).
 * Logos et noms : `PARTENAIRES_REFERENCES` dans `lib/partenaires-references-config.ts`.
 */
import {
  PARTENAIRES_REFERENCES,
  type PartenaireReference,
  type PartenaireReferenceLogo,
  type PartenaireRelationshipLabel,
} from '@/lib/partenaires-references-config';
import { LINKS } from '@/lib/internal-links';

export const ETUDES_DE_CAS_REFERENCES_SECTION_TITLE =
  'Nos références professionnelles dans le BTP et la formation' as const;

export const ETUDES_DE_CAS_REFERENCES_SECTION_LEAD =
  'Organismes et réseaux ayant confié des interventions ou formations IA — complément aux études de cas détaillées ci-dessus.' as const;

type TeaserContent = {
  referenceId: PartenaireReference['id'];
  /** 15 à 25 mots — ne pas recopier `interventionSummary` de `/partenaires`. */
  hubDescription: string;
  relatedLink?: { href: string; label: string };
};

const TEASER_BY_ID: readonly TeaserContent[] = [
  {
    referenceId: 'ffb-grand-paris',
    hubDescription:
      'Sessions IA en présentiel pour adhérents franciliens : devis, dossiers de marché et rédaction professionnelle, avec contrôle humain avant envoi.',
    relatedLink: {
      href: LINKS.formationIaDirigeantPmeBtp,
      label: 'Formation IA dirigeants PME BTP',
    },
  },
  {
    referenceId: 'ffb-idf-ouest',
    hubDescription:
      'Ateliers délégués pour TPE et PME de l’Ouest francilien : administratif, appels d’offres et suivi de chantier assistés par l’IA, sur documents réels.',
    relatedLink: {
      href: LINKS.formationIaIntraEntrepriseBtp,
      label: 'Formation IA intra-entreprise BTP',
    },
  },
  {
    referenceId: 'ffb-idf-est',
    hubDescription:
      'Formations convoquées pour adhérents de l’Est idf : productivité de bureau, DCE et devis en atelier pratique, toujours avec relecture métier.',
    relatedLink: {
      href: LINKS.formationIaGrosOeuvreBtp,
      label: 'Formation IA gros œuvre',
    },
  },
  {
    referenceId: 'csfe',
    hubDescription:
      'Interventions pour la filière étanchéité : CCTP, mémoires techniques et comptes rendus préparés avec l’IA, validés selon les référentiels métier.',
    relatedLink: {
      href: LINKS.formationIaEtancheur,
      label: 'Formation IA étanchéité',
    },
  },
  {
    referenceId: 'cpb',
    hubDescription:
      'Deux sessions avec la CPB autour du programme IA bâtiment TP : devis, e-mails et documents chantier, ChatGPT et Claude en pratique.',
    relatedLink: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Programme niveau 1 bâtiment TP',
    },
  },
  {
    referenceId: 'umb-ffb',
    hubDescription:
      'Formations pour charpentiers, menuisiers et agencement : devis, mails clients et pièces de chantier, adaptées aux usages de la filière bois.',
    relatedLink: {
      href: LINKS.formationIaCharpentierBtp,
      label: 'Formation IA charpentier BTP',
    },
  },
  {
    referenceId: 'ifrb-idf',
    hubDescription:
      'Modules IA pour stagiaires de l’institut francilien : devis, administratif et documents de chantier, intégrés au parcours de formation régional.',
    relatedLink: {
      href: LINKS.formationIaBtpIdfZones,
      label: 'Formation IA BTP Île-de-France',
    },
  },
  {
    referenceId: 'arfab',
    hubDescription:
      'Sessions animées via ARFAB pour professionnels du bâtiment : découverte des usages IA utiles au quotidien, en présentiel et sur cas concrets.',
    relatedLink: {
      href: LINKS.formationIaTravauxPublics,
      label: 'Formation IA travaux publics',
    },
  },
  {
    referenceId: 'cnam-entreprise',
    hubDescription:
      'Formatrice invitée pour stagiaires CNAM Entreprise : modules IA productivité et rédaction, calibrés sur des situations de bureau en entreprise.',
    relatedLink: {
      href: LINKS.formationIaAssistanteBtp,
      label: 'Formation IA assistante BTP',
    },
  },
  {
    referenceId: 'moniteur-formations',
    hubDescription:
      'Interventions invitée Moniteur Formations : structuration de documents BTP, prompts métier et relecture avant diffusion aux clients ou équipes.',
    relatedLink: {
      href: LINKS.formationIaMaitriseOeuvre,
      label: 'Formation IA maîtrise d’œuvre',
    },
  },
  {
    referenceId: 'linkedin-learning',
    hubDescription:
      'Instructrice de deux cours en ligne en français : IA au service du BTP et des TPE, distinct du catalogue présentiel OFC en Île-de-France.',
    relatedLink: {
      href: LINKS.formationsLinkedInLearning,
      label: 'Formations LinkedIn Learning',
    },
  },
] as const;

export type EtudesDeCasReferenceTeaser = {
  id: string;
  name: string;
  logo: PartenaireReferenceLogo;
  relationshipLabel: PartenaireRelationshipLabel;
  hubDescription: string;
  relatedLink?: { href: string; label: string };
};

export function getEtudesDeCasReferencesTeaser(): EtudesDeCasReferenceTeaser[] {
  const byId = new Map(PARTENAIRES_REFERENCES.map((r) => [r.id, r]));

  return TEASER_BY_ID.map((teaser) => {
    const ref = byId.get(teaser.referenceId);
    if (!ref) {
      throw new Error(`Référence partenaire introuvable : ${teaser.referenceId}`);
    }
    return {
      id: ref.id,
      name: ref.name,
      logo: ref.logo,
      relationshipLabel: ref.relationshipLabel,
      hubDescription: teaser.hubDescription,
      relatedLink: teaser.relatedLink,
    };
  });
}
