import { FINANCEMENT_BAREMES_NOTE } from '@/lib/financement-constructys-page-config';

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
      <h2
        id="essentiel-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        L’essentiel en 30 secondes
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {ESSENTIEL.map((item) => (
          <li
            key={item.titre}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold text-[#377CF3]">{item.titre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.texte}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm italic text-[#64748B]">{FINANCEMENT_BAREMES_NOTE}</p>
    </section>
  );
}
