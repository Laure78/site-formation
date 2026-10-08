import { z } from 'zod';

export const DEV_WEB_IA_PROJECT_TYPE_VALUES = [
  'heures-paie',
  'clients-commercial',
  'visites-metres',
  'devis-facturation',
  'suivi-chantier',
  'planning',
  'achats-depenses',
  'tableau-de-bord',
  'autre',
] as const;

export type DevWebIaProjectTypeValue = (typeof DEV_WEB_IA_PROJECT_TYPE_VALUES)[number];

export const DEV_WEB_IA_PROJECT_TYPE_LABELS: Record<DevWebIaProjectTypeValue, string> = {
  'heures-paie': 'Relevé des heures et préparation de la paie',
  'clients-commercial': 'Clients et suivi commercial',
  'visites-metres': 'Visites et métrés',
  'devis-facturation': 'Devis et suivi de facturation',
  'suivi-chantier': 'Suivi de chantier',
  planning: 'Planning',
  'achats-depenses': 'Achats et dépenses',
  'tableau-de-bord': 'Tableau de bord',
  autre: 'Autre module d’ERP BTP',
};

export const DEV_WEB_IA_FORMAT_VALUES = ['inter', 'intra', 'indetermine'] as const;

export type DevWebIaFormatValue = (typeof DEV_WEB_IA_FORMAT_VALUES)[number];

export const DEV_WEB_IA_FORMAT_LABELS: Record<DevWebIaFormatValue, string> = {
  inter: 'Session interentreprises',
  intra: 'Session intra-entreprise',
  indetermine: 'Je ne sais pas encore',
};

export const DEV_WEB_IA_EFFECTIF_VALUES = ['', '1-10', '11-49', '50+'] as const;

export type DevWebIaEffectifValue = (typeof DEV_WEB_IA_EFFECTIF_VALUES)[number];

export const DEV_WEB_IA_EFFECTIF_LABELS: Record<Exclude<DevWebIaEffectifValue, ''>, string> = {
  '1-10': '1 à 10 salariés',
  '11-49': '11 à 49 salariés',
  '50+': '50 salariés et plus',
};

const emailSchema = z
  .string()
  .trim()
  .min(5, 'Email requis.')
  .max(254, 'Email trop long.')
  .email('Adresse email invalide.')
  .transform((v) => v.toLowerCase());

export const devWebIaProjectFormSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis (2 caractères minimum).').max(120, 'Nom trop long.'),
  email: emailSchema,
  company: z.string().trim().max(200, 'Nom d’entreprise trop long.').optional().or(z.literal('')),
  phone: z.string().trim().max(30, 'Numéro trop long.').optional().or(z.literal('')),
  projectType: z.enum(DEV_WEB_IA_PROJECT_TYPE_VALUES, { message: 'Type de projet invalide.' }),
  effectif: z
    .enum(DEV_WEB_IA_EFFECTIF_VALUES, { message: 'Effectif invalide.' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Décrivez votre projet (20 caractères minimum).')
    .max(5000, 'Description trop longue (5 000 caractères maximum).'),
  format: z.enum(DEV_WEB_IA_FORMAT_VALUES, { message: 'Format souhaité invalide.' }),
  website: z.string().optional().default(''),
  formStartedAt: z.coerce.number().int().positive().optional(),
});

export type DevWebIaProjectFormInput = z.infer<typeof devWebIaProjectFormSchema>;

export function parseDevWebIaProjectFormPayload(raw: unknown):
  | { success: true; data: DevWebIaProjectFormInput }
  | { success: false; fieldErrors: Record<string, string> } {
  const parsed = devWebIaProjectFormSchema.safeParse(raw);
  if (parsed.success) {
    return { success: true, data: parsed.data };
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
