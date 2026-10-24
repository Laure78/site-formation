import type { FormateurProfile } from '@/lib/formateurs/types';
import type { FormateursFiltreId } from '@/lib/formateurs/hub-filtres';

export function isFormateurVisibleOnHubProduction(f: FormateurProfile): boolean {
  const affichage = f.affichageHub ?? 'actif';
  if (affichage === 'a-confirmer' && process.env.NODE_ENV === 'production') {
    return false;
  }
  return true;
}

export function formateurMatchesHubFiltre(
  formateur: FormateurProfile,
  filtreId: FormateursFiltreId,
): boolean {
  if (filtreId === 'all') return true;
  if (filtreId === 'management-group') {
    return (
      formateur.domaineIds.includes('management') ||
      formateur.domaineIds.includes('direction')
    );
  }
  return formateur.domaineIds.includes(filtreId);
}

export function formateurExperiencePeriode(formateur: FormateurProfile): string | null {
  const step = formateur.experiences?.[0];
  return step?.periode ?? null;
}
