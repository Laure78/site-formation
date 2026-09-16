import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon SEO — 301 vers la fiche catalogue Claude. */
export default function FormationClaudeBtpLegacyRedirect() {
  redirect(LINKS.formationMaitriserClaudeAiBtp);
}
