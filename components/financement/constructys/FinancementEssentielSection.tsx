import { FINANCEMENT_BAREMES_NOTE } from '@/lib/financement-constructys-page-config';
import { OFC_CARD, OFC_TYPE_H2, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

const ESSENTIEL = [
  {
    titre: 'Éligibilité',
    texte:
      'La participation financière dépend de votre rattachement à Constructys, de votre branche et de la validation de votre dossier.',
  },
  {
    titre: 'Délai de dépôt',
    texte:
      'Dossier complet dans eGestion au moins 15 jours calendaires avant le début de la formation.',
  },
  {
    titre: 'Plafonds',
    texte:
      'Montants indicatifs selon l’effectif, la branche et le type d’action (horaire par stagiaire et plafond journalier de groupe en intra).',
  },
  {
    titre: 'Paiement (oct.–déc. 2026)',
    texte:
      'Pour les nouveaux dossiers concernés : l’entreprise règle OFC puis demande le remboursement à Constructys.',
  },
] as const;

export function FinancementEssentielSection() {
  return (
    <section aria-labelledby="essentiel-title" className="scroll-mt-24">
      <h2 id="essentiel-title" className={OFC_TYPE_H2}>
        L’essentiel en 30 secondes
      </h2>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {ESSENTIEL.map((item) => (
          <li key={item.titre} className={`${OFC_CARD} p-6`}>
            <h3 className={`${OFC_TYPE_H3} text-ofc-accent`}>{item.titre}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">{item.texte}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm italic text-ofc-ink-subtle">{FINANCEMENT_BAREMES_NOTE}</p>
    </section>
  );
}
