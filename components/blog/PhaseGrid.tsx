export type PhaseCard = {
  phase: string;
  usages: string[];
};

type Props = {
  cards: PhaseCard[];
};

/** Grille des phases DCE → DOE — section « 12 usages ». */
export function PhaseGrid({ cards }: Props) {
  return (
    <ul className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Les 12 usages par phase">
      {cards.map((card) => (
        <li
          key={card.phase}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">{card.phase}</p>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[#555F6D] md:text-[15px]">
            {card.usages.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
