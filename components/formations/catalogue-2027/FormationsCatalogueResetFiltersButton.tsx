'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';

type Props = {
  variant?: 'ghost' | 'secondary';
};

export function FormationsCatalogueResetFiltersButton({ variant = 'ghost' }: Props) {
  const router = useRouter();

  const resetFilters = () => {
    router.replace('/formations#catalogue-formations', { scroll: false });
  };

  if (variant === 'secondary') {
    return (
      <button
        type="button"
        onClick={resetFilters}
        className="inline-flex min-h-11 items-center rounded-lg border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40"
      >
        Réinitialiser les filtres
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={resetFilters}
      className={cn(
        'inline-flex min-h-11 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
      )}
    >
      Réinitialiser les filtres
    </button>
  );
}
