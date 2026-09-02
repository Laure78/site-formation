import { PARTENAIRES_REASSURANCE_ITEMS } from '@/lib/partenaires-references-config';

export function PartenairesReassuranceBar() {
  return (
    <section aria-label="Points de réassurance" className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 sm:px-6">
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
        {PARTENAIRES_REASSURANCE_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
