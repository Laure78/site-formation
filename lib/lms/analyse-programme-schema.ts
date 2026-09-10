import { z } from 'zod';

/** Origine d’un titre : repris du document ou formulé par l’IA. */
export const origineTitreSchema = z.enum(['extrait', 'propose']);
export type OrigineTitre = z.infer<typeof origineTitreSchema>;

export const moduleAnalyseSchema = z.object({
  ordre: z.number().int().positive(),
  titre: z.string().trim().min(1).max(200),
  origine: origineTitreSchema,
});

export const analyseProgrammeResultSchema = z.object({
  intitule: z.string().trim().min(1).max(200),
  origine_intitule: origineTitreSchema,
  modules: z.array(moduleAnalyseSchema).min(1).max(40),
  points_a_verifier: z.array(z.string().trim().min(1).max(400)).max(20).default([]),
});

export type AnalyseProgrammeResult = z.infer<typeof analyseProgrammeResultSchema>;

export type AnalyseProgrammeErrorCode =
  | 'format_incompatible'
  | 'fichier_vide'
  | 'pdf_scanne'
  | 'analyse_echouee'
  | 'structure_ambigue'
  | 'openai_non_configure'
  | 'trop_de_requetes';

export const ANALYSE_PROGRAMME_MESSAGES: Record<AnalyseProgrammeErrorCode, string> = {
  format_incompatible:
    'Format incompatible. Déposez un fichier PDF ou DOCX (.pdf, .docx).',
  fichier_vide:
    'Le fichier est vide ou illisible. Vérifiez le document et réessayez.',
  pdf_scanne:
    'Ce PDF semble être un scan image (peu ou pas de texte sélectionnable). Aucune OCR n’est disponible : fournissez un PDF ou un DOCX contenant du texte sélectionnable.',
  analyse_echouee:
    'L’analyse du programme a échoué. Réessayez dans quelques instants ou saisissez l’intitulé et les modules manuellement.',
  structure_ambigue:
    'La structure du programme est trop ambiguë pour proposer des modules fiables. Vérifiez le document ou ajustez manuellement.',
  openai_non_configure:
    'L’analyse IA n’est pas configurée sur ce serveur (clé API manquante).',
  trop_de_requetes: 'Trop de requêtes. Réessayez dans une minute.',
};
