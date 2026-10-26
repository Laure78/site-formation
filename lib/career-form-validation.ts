import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(5, 'Email requis.')
  .max(254, 'Email trop long.')
  .email('Adresse email invalide.')
  .transform((v) => v.toLowerCase());

export const CAREER_KIND_VALUES = ['consultant', 'spontaneous'] as const;
export type CareerKind = (typeof CAREER_KIND_VALUES)[number];

export const CONSULTANT_EXPERTISE_VALUES = [
  'conduite-travaux',
  'etudes-prix-ao',
  'bureau-etudes-moe',
  'gestion-admin-commerciale',
  'direction-entreprise-btp',
] as const;

export type ConsultantExpertiseValue = (typeof CONSULTANT_EXPERTISE_VALUES)[number];

export const CONSULTANT_EXPERTISE_LABELS: Record<ConsultantExpertiseValue, string> = {
  'conduite-travaux': 'Conduite de travaux et gestion de chantier',
  'etudes-prix-ao': 'Études de prix et réponses aux appels d’offres',
  'bureau-etudes-moe': 'Bureau d’études et maîtrise d’œuvre',
  'gestion-admin-commerciale': 'Gestion administrative et commerciale',
  'direction-entreprise-btp': 'Direction d’entreprise BTP',
};

export const SPONTANEOUS_TYPE_VALUES = [
  'emploi',
  'stage-alternance',
  'collaboration-independante',
  'autre',
] as const;

export type SpontaneousTypeValue = (typeof SPONTANEOUS_TYPE_VALUES)[number];

export const SPONTANEOUS_TYPE_LABELS: Record<SpontaneousTypeValue, string> = {
  emploi: 'Emploi',
  'stage-alternance': 'Stage ou alternance',
  'collaboration-independante': 'Collaboration indépendante',
  autre: 'Autre',
};

export const MOBILITY_IDF_VALUES = ['oui', 'partiel', 'non'] as const;

export const MOBILITY_IDF_LABELS: Record<(typeof MOBILITY_IDF_VALUES)[number], string> = {
  oui: 'Oui, je peux intervenir en présentiel en Île-de-France',
  partiel: 'Oui, avec des contraintes de disponibilité ou de secteur',
  non: 'Non, pas de mobilité IDF pour le moment',
};

const baseFields = {
  firstName: z.string().trim().min(1, 'Prénom requis.').max(80, 'Prénom trop long.'),
  lastName: z.string().trim().min(1, 'Nom requis.').max(80, 'Nom trop long.'),
  email: emailSchema,
  phone: z.string().trim().max(30, 'Numéro trop long.').optional().or(z.literal('')),
  availability: z.string().trim().max(500, 'Texte trop long.').optional().or(z.literal('')),
  linkedinOrPortfolio: z
    .string()
    .trim()
    .max(500, 'Lien trop long.')
    .optional()
    .or(z.literal('')),
  website: z.string().optional().default(''),
  formStartedAt: z.coerce.number().int().positive().optional(),
  sourcePage: z.string().trim().max(200),
  kind: z.enum(CAREER_KIND_VALUES),
};

export const consultantCareerSchema = z.object({
  ...baseFields,
  kind: z.literal('consultant'),
  expertiseDomain: z.enum(CONSULTANT_EXPERTISE_VALUES, {
    message: 'Domaine d’expertise requis.',
  }),
  presentation: z
    .string()
    .trim()
    .min(40, 'Présentez votre parcours (40 caractères minimum).')
    .max(8000, 'Texte trop long (8 000 caractères maximum).'),
  mobilityIdf: z.enum(MOBILITY_IDF_VALUES, { message: 'Indiquez votre mobilité IDF.' }),
  formationSlugs: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal('')),
});

export const spontaneousCareerSchema = z.object({
  ...baseFields,
  kind: z.literal('spontaneous'),
  applicationType: z.enum(SPONTANEOUS_TYPE_VALUES, {
    message: 'Type de candidature requis.',
  }),
  desiredRole: z
    .string()
    .trim()
    .min(2, 'Fonction ou domaine requis.')
    .max(200, 'Texte trop long.'),
  presentation: z
    .string()
    .trim()
    .min(40, 'Présentez votre candidature (40 caractères minimum).')
    .max(8000, 'Texte trop long (8 000 caractères maximum).'),
});

export type ConsultantCareerInput = z.infer<typeof consultantCareerSchema>;
export type SpontaneousCareerInput = z.infer<typeof spontaneousCareerSchema>;
export type CareerFormInput = ConsultantCareerInput | SpontaneousCareerInput;

export function parseCareerFormPayload(raw: Record<string, unknown>):
  | { success: true; data: CareerFormInput }
  | { success: false; fieldErrors: Record<string, string> } {
  const kind = raw.kind;
  const schema =
    kind === 'consultant' ? consultantCareerSchema : spontaneousCareerSchema;
  const parsed = schema.safeParse(raw);
  if (parsed.success) {
    return { success: true, data: parsed.data as CareerFormInput };
  }
  const fieldErrors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return { success: false, fieldErrors };
}

export const CAREER_FORM_SUCCESS =
  'Votre candidature a bien été reçue. Merci pour votre intérêt pour OFC Création d’Entreprise.' as const;

export const CAREER_FORM_SUCCESS_FOLLOWUP =
  'OFC examine chaque proposition et vous recontacte si votre profil correspond aux parcours en cours de constitution.' as const;

export const CAREER_FORM_RGPD_NOTICE =
  'Vos données et votre CV, le cas échéant, sont traités uniquement pour l’étude de votre candidature. Consultez la politique de confidentialité.' as const;

export const CAREER_CV_MAX_BYTES = 5 * 1024 * 1024;
