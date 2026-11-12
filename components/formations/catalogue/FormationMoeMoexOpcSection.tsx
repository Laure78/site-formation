import Link from 'next/link';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { LINKS } from '@/lib/internal-links';

/** H2 MOEX/OPC — fiche NIV-05 (intention recherche exécution). */
export function FormationMoeMoexOpcSection() {
  return (
    <TrainingSection
      id="ia-moex-opc"
      title="L’IA pour la maîtrise d’œuvre d’exécution (MOEX) et l’OPC"
      tone="muted"
    >
      <p className="text-base leading-relaxed text-slate-700">
        En MOEX et OPC, l’IA aide à structurer les comptes rendus de réunion, le tableau de suivi des visas,
        les ordres de service, les situations de travaux, les OPR et les réserves, et les pièces de DOE — chaque
        livrable est relu et <strong>validé par le MOEX</strong> avant diffusion.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
        <li>
          <strong>Compte rendu de réunion</strong> — notes ou dictée vers CR structuré ; validé par le MOEX.
        </li>
        <li>
          <strong>Tableau de suivi des visas</strong> — synthèse des retours entreprises ; validé par le MOEX.
        </li>
        <li>
          <strong>Ordres de service et situations</strong> — brouillons contractuels contrôlés ; validé par le
          MOEX.
        </li>
        <li>
          <strong>OPR et réserves</strong> — fiches et relances standardisées ; validé par le MOEX.
        </li>
        <li>
          <strong>DOE</strong> — check-lists et courriers de collecte ; validé par le MOEX.
        </li>
      </ul>
      <p className="mt-6 text-sm text-slate-600">
        Approfondir sans dupliquer la fiche :{' '}
        <Link href={LINKS.blogTutoAvenantOrdreDeServiceIa} className="font-medium text-[#377CF3] underline">
          avenants et ordres de service avec l’IA
        </Link>
        {' · '}
        <Link href={LINKS.blogTutoControleSituationTravauxIa} className="font-medium text-[#377CF3] underline">
          contrôle des situations de travaux
        </Link>
        {' · '}
        <Link href={LINKS.blogIaMaitriseOeuvreUsages} className="font-medium text-[#377CF3] underline">
          usages IA en maîtrise d’œuvre
        </Link>
        .
      </p>
    </TrainingSection>
  );
}
