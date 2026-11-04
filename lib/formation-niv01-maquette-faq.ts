import type { FAQItem } from '@/lib/faq';
import { getFormationByCode } from '@/data/formations';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';

function findAnswer(merged: readonly FAQItem[], includes: string): string | undefined {
  const needle = includes.toLowerCase();
  return merged.find((item) => item.q.toLowerCase().includes(needle))?.a;
}

/** Quatre questions mises en avant — grille maquette (réponses issues de la fiche). */
export function buildNiv01MaquetteFeaturedFaq(merged: readonly FAQItem[]): FAQItem[] {
  const formation = getFormationByCode('NIV-01')!;
  const publicAnswer =
    findAnswer(merged, 'prérequis') ??
    `Public visé : ${formation.public}. Aucune pratique préalable de l’IA n’est requise pour ce niveau débutant.`;

  const toolsAnswer =
    findAnswer(merged, 'abonnement') ??
    findAnswer(merged, 'débutant') ??
    'Non. Les versions gratuites de ChatGPT ou Claude suffisent pour ce niveau débutant.';

  const documentsAnswer =
    findAnswer(merged, 'documents de notre entreprise') ??
    'Devis, comptes rendus, DOE, PV, emails — sur vos documents anonymisés ou des cas types BTP.';

  const financeAnswer =
    findAnswer(merged, 'constructys') ??
    findAnswer(merged, 'tarif') ??
    `${FINANCEMENT_FORMULATION_COURTE} Voir <a href="${LINKS.financement}">financement formation IA BTP</a>.`;

  return [
    { q: 'À qui s’adresse cette formation ?', a: publicAnswer },
    { q: 'Faut-il déjà utiliser ChatGPT ou Claude ?', a: toolsAnswer },
    { q: 'Quels documents sont traités ?', a: documentsAnswer },
    { q: 'Comment financer la formation ?', a: financeAnswer },
  ];
}

/** FAQ complémentaires — hors les 4 vedettes, sans doublon sémantique grossier. */
export function buildNiv01MaquetteSecondaryFaq(
  merged: readonly FAQItem[],
  featured: readonly FAQItem[],
): FAQItem[] {
  const featuredNorm = new Set(featured.map((f) => f.q.toLowerCase()));
  return merged.filter((item) => {
    const q = item.q.toLowerCase();
    if (featuredNorm.has(q)) return false;
    if (q.includes('tarif') && featured.some((f) => f.q.includes('financer'))) return false;
    if (q.includes('prérequis') && featured.some((f) => f.q.includes('adresse'))) return false;
    return true;
  });
}
