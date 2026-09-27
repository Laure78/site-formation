import { z } from 'zod';

export const DEV_WEB_IA_PROJECT_TYPE_VALUES = [
  'site-vitrine',
  'suivi-commercial',
  'planning-interventions',
  'tableau-de-bord',
  'espace-client',
  'reservation-ligne',
  'autre',
] as const;

export type DevWebIaProjectTypeValue = (typeof DEV_WEB_IA_PROJECT_TYPE_VALUES)[number];

export const DEV_WEB_IA_PROJECT_TYPE_LABELS: Record<DevWebIaProjectTypeValue, string> = {
  'site-vitrine': 'Site vitrine',
  'suivi-commercial': 'Suivi commercial',
  'planning-interventions': 'Planning d’interventions',
  'tableau-de-bord': 'Tableau de bord',
  'espace-client': 'Espace client',
  'reservation-ligne': 'Réservation en ligne',
  autre: 'Autre projet',
};

export const DEV_WEB_IA_FORMAT_VALUES = ['inter', 'intra', 'indetermine'] as const;

export type DevWebIaFormatValue = (typeof DEV_WEB_IA_FORMAT_VALUES)[number];

export const DEV_WEB_IA_FORMAT_LABELS: Record<DevWebIaFormatValue, string> = {
  inter: 'Session interentreprises',
  intra: 'Session intra-entreprise',
  indetermine: 'Je ne sais pas encore',
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
