/**
 * Prompts SEO par métier — page `/ia-devis-batiment`.
 * Module léger (pas de tarifs / infos Qualiopi) — sûr pour sérialisation RSC → client.
 */

export type IaDevisPromptMetier = {
  label: string;
  prompt: string;
  resultat: string;
  precautions: string;
};

/** Prompts SEO par métier — sans affirmation de temps gagné non sourcée. */
export const IA_DEVIS_PROMPTS_PAR_METIER: readonly IaDevisPromptMetier[] = [
  {
    label: 'Électricien',
    prompt:
      "Rédige un devis professionnel pour une entreprise d'électricité du bâtiment. Chantier : mise aux normes d'un tableau électrique et ajout de 8 circuits (éclairage, prises 16A, prises dédiées four). Précise un tableau avec 3 colonnes : désignation des fournitures (avec références types si génériques), main d'œuvre par poste, sous-totaux HT. Mentionne déplacement, diagnostic, mise en conformité NF C 15-100. Laisse les prix unitaires et le taux de TVA en [à compléter selon le chantier]. Ajoute validité du devis, délais d'exécution indicatifs, conditions de paiement à renseigner. Ton : professionnel BTP, vocabulaire métier.",
    resultat:
      'Un devis structuré avec postes séparés fournitures / pose, ligne pour le tableau et les protections, mention des essais et réception — montants et TVA à compléter.',
    precautions:
      'Vérifiez les références matériel, la conformité NF C 15-100 et le taux de TVA applicable avant envoi. Ne conservez aucun prix inventé par l’IA.',
  },
  {
    label: 'Plombier-chauffagiste',
    prompt:
      "Rédige un devis détaillé pour une rénovation complète de salle de bain (environ 8 m²) : dépose ancien carrelage et sanitaires, alimentations eau chaude / froide, évacuations, pose WC suspendu, meuble vasque, douche à l'italienne avec receveur à carreler, robinetterie. Inclus : fournitures listées par poste (à préciser « fournis par l'entreprise » ou « fournis par le client »), main d'œuvre par lot, délais, reprise des étanchéités et tests d'étanchéité. Style : devis BTP clair, sans prix inventés — laisse des champs [PU HT] et [TVA] à compléter.",
    resultat:
      'Un devis multi-lots (dépose, réseaux, étanchéité, pose sanitaires, finitions) avec quantités indicatives et lignes à compléter pour le chiffrage réel.',
    precautions:
      'Contrôlez l’étanchéité, les réseaux et les quantités sur site. Le taux de TVA dépend de l’opération — ne le validez qu’après analyse de votre dossier.',
  },
  {
    label: 'Maçon',
    prompt:
      "Élabore un devis pour travaux de maçonnerie : fondations superficielles longrines pour extension 20 m², dalle isolée 10 cm avec treillis, élévation murs en parpaings creux de 20 cm avec chaînage et linteaux, ouvertures baies et portes. Détaille les unités (m³ béton, m² maçonnerie), la main d'œuvre par phase. Mentionne délais météo, reprises de liaison avec l'existant. TVA selon contexte neuf / rénovation (précise à compléter). Format : tableau par lot technique. Laisse les prix en [à compléter].",
    resultat:
      'Un chiffrage découpé par phases gros œuvre, avec vocabulaire CCTP-friendly (fondations, dalle, élévation) prêt à être complété par vos unitaires chantier.',
    precautions:
      'Les ratios et quantités restent à valider par relevé ou métré. Ne signez jamais un devis dont les hypothèses techniques n’ont pas été vérifiées.',
  },
  {
    label: 'Carreleur',
    prompt:
      "Rédige un devis pour pose de carrelage sol et mural en rénovation : 28 m² sol + 22 m² murs, format 60×60 cm, colle C2 selon DTU, joints cimentaires compatibles, découpe et chutes incluses. Précise : préparation des supports, primaire d'accrochage si nécessaire, pose collée, joints (largeur 2 mm), nettoyage. Tableau fournitures (colle, croisillons, joints) / main d'œuvre. Laisse les prix unitaires et la TVA en [à compléter]. Ajoute conditions de réception habituelles.",
    resultat:
      'Un devis aligné sur les bonnes pratiques de pose (préparation, colle, joints) avec postes compréhensibles pour le client — montants à renseigner.',
    precautions:
      'Vérifiez le DTU applicable, l’état des supports et les quantités réelles. Ne laissez pas l’IA inventer des références produit ou des prix.',
  },
  {
    label: 'Peintre',
    prompt:
      "Produis un devis pour travaux de peinture intérieure : préparation des supports (rebouchage léger, ponçage, lessivage), application d'un enduit de lissage sur zones irrégulières, puis deux couches de peinture acrylique sur murs et plafonds — surface totale environ 120 m² décomposée par pièce. Liste les produits par type (sous-couche, finition), le temps estimé par pièce, protections sol et mobilier. Précise finitions plinthes et raccords. Format professionnel avec lignes [PU] et [TVA] à compléter.",
    resultat:
      'Un devis par pièce ou par surface avec phases préparation / finition, adapté aux réponses clients exigeants sur les produits.',
    precautions:
      'Contrôlez les surfaces mesurées et les produits réellement prévus. Toute estimation de temps reste indicative jusqu’à votre validation.',
  },
  {
    label: 'Charpentier',
    prompt:
      "Rédige un devis pour réfection de charpente traditionnelle : dépose partielle de couverture, remplacement chevrons endommagés, liteaux, écran sous-toiture, voligeage si nécessaire — surface de toiture environ 90 m², pente 45°. Inclus : calage sécurité chantier, évacuation gravats, liaison avec couvreur si sous-traitance (à mentionner). Détaille bois section / essences en [à préciser selon étude], quincaillerie, traitement fongicide si besoin. Ajoute délais. TVA selon opération. Ton : charpentier BTP. Sans prix inventés.",
    resultat:
      'Un devis structuré bois / couverture avec lots techniques et rappels de coordination, prêt pour ajout de votre étude et prix fournisseurs bois.',
    precautions:
      'La section des bois, la sécurité chantier et la coordination couvreur doivent être validées sur étude. Ne générez pas de prix « plausibles ».',
  },
] as const;

