export function getLeadQualification(score: number): 'chaud' | 'qualifie' | 'froid' {
  if (score >= 80) return 'chaud';
  if (score >= 50) return 'qualifie';
  return 'froid';
}
