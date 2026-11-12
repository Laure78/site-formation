export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

/** FAQ accessible — question en h3 dans le DOM. */
export function FaqList({ items }: Props) {
  return (
    <div className="my-10 space-y-3" aria-label="Questions fréquentes">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-slate-200 bg-white px-5 py-1 open:bg-[#F2F2F2]"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-medium text-[#1A1A1A] marker:content-none [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-base font-semibold md:text-lg">{item.question}</h3>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg leading-none text-[#377CF3] group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="pb-4 text-[17px] leading-[1.75] text-[#555F6D]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
