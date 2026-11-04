import { ClipboardList, FileSpreadsheet, FolderOpen, Mail } from 'lucide-react';
import type { CataloguePainPoint } from '@/lib/catalogue-formation-page-content';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { TrainingOutcomes } from '@/components/formations/training/TrainingOutcomes';

const ICON_STROKE = 2;

const ICON_BY_TITLE: Record<string, typeof Mail> = {
  Devis: FileSpreadsheet,
  'Comptes rendus': ClipboardList,
  'Documents de chantier': FolderOpen,
  Emails: Mail,
};

type Props = {
  painPoints: readonly CataloguePainPoint[];
  outcomes: readonly string[];
  outcomesTitle: string;
  outcomesDescription?: string;
  pedagogicalNote?: string;
};

/** Quatre cartes synthèse + objectifs pédagogiques complets. */
export function Niv01MaquetteSkillCards({
  painPoints,
  outcomes,
  outcomesTitle,
  outcomesDescription,
  pedagogicalNote,
}: Props) {
  const cards = painPoints.slice(0, 4).map((point) => {
    const Icon = ICON_BY_TITLE[point.title] ?? ClipboardList;
    const label =
      point.title === 'Devis'
        ? 'Préparer un devis'
        : point.title === 'Comptes rendus'
          ? 'Rédiger un compte rendu'
          : point.title === 'Documents de chantier'
            ? 'Structurer un DOE / PV'
            : point.title === 'Emails'
              ? 'Améliorer vos emails'
              : point.title;
    return { ...point, Icon, label };
  });

  return (
    <>
      <section
        className="border-b border-[#DAE3F0] bg-white px-4 py-10 md:py-12"
        aria-labelledby="niv01-skills-title"
      >
        <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
          <h2
            id="niv01-skills-title"
            className="font-display text-2xl font-extrabold tracking-tight text-[#101936] md:text-[1.75rem]"
          >
            Ce que vous saurez faire en 4 h
          </h2>
          <ul className="mt-8 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ label, texte, Icon }) => (
              <li key={label}>
                <article className="formation-niv01-maquette-card flex h-full flex-col rounded-2xl border border-[#DAE3F0] bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                    <Icon className="h-5 w-5" strokeWidth={ICON_STROKE} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-[#101936]">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{texte}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TrainingOutcomes
        outcomes={outcomes}
        title={outcomesTitle}
        description={outcomesDescription}
        pedagogicalNote={pedagogicalNote}
        max={12}
        variant="checklist"
      />
    </>
  );
}
