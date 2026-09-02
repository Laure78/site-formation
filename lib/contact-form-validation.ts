import { z } from 'zod';

export const CONTACT_SUBJECT_VALUES = [
  'devis',
  'choix-formation',
  'intra',
  'federation',
  'financement',
  'autre',
] as const;

export type ContactSubjectValue = (typeof CONTACT_SUBJECT_VALUES)[number];

export const CONTACT_SUBJECT_LABELS: Record<ContactSubjectValue, string> = {
  devis: 'Demande de devis',
  'choix-formation': 'Choix d’une formation',
  intra: 'Session intra-entreprise',
  federation: 'Intervention pour une fédération ou un organisme',
  financement: 'Financement et documents',
  autre: 'Autre demande professionnelle',
};

const emailSchema = z
  .string()
  .trim()
  .min(5, 'Email requis.')
  .max(254, 'Email trop long.')
  .email('Adresse email invalide.')
  .transform((v) => v.toLowerCase());

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis (2 caractères minimum).').max(120, 'Nom trop long.'),
  email: emailSchema,
  company: z
    .string()
    .trim()
    .min(2, 'Entreprise ou organisme requis.')
    .max(200, 'Nom d’entreprise trop long.'),
  subject: z.enum(CONTACT_SUBJECT_VALUES, { message: 'Objet de demande invalide.' }),
  message: z
    .string()
    .trim()
    .min(20, 'Décrivez votre besoin (20 caractères minimum).')
    .max(5000, 'Message trop long (5 000 caractères maximum).'),
  phone: z.string().trim().max(30, 'Numéro trop long.').optional().or(z.literal('')),
  participants: z.string().trim().max(80, 'Valeur trop longue.').optional().or(z.literal('')),
  participantRole: z.string().trim().max(120, 'Valeur trop longue.').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Valeur trop longue.').optional().or(z.literal('')),
  period: z.string().trim().max(120, 'Valeur trop longue.').optional().or(z.literal('')),
  formationTheme: z.string().trim().max(200, 'Valeur trop longue.').optional().or(z.literal('')),
  formationHint: z.string().trim().max(200).optional().or(z.literal('')),
  website: z.string().optional().default(''),
  /** Timestamp ms (anti-bot rapide). */
  formStartedAt: z.coerce.number().int().positive().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function parseContactFormPayload(raw: unknown):
  | { success: true; data: ContactFormInput }
  | { success: false; fieldErrors: Record<string, string> } {
  const parsed = contactFormSchema.safeParse(raw);
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

/** Échappe le HTML pour les emails de notification. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
