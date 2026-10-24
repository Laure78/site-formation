'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { FormationsOrientationWizard } from '@/components/formations/catalogue-2027/FormationsOrientationWizard';
import { FORMATION_ORIENTATION_SECTION_ID } from '@/lib/formation-orientation';
import { buildFormationsIaHref } from '@/lib/catalogue-filter-url';
import { orientationAnswersToCatalogueFilters } from '@/lib/orientation-to-catalogue-filters';
import type { OrientationAnswers } from '@/lib/formation-orientation';

export function FormationsCatalogueOrientationCollapsible() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onComplete = useCallback(
    (answers: OrientationAnswers) => {
      const filters = orientationAnswersToCatalogueFilters(answers);
      router.replace(buildFormationsIaHref(filters), { scroll: false });
      setOpen(false);
      requestAnimationFrame(() => {
        document.getElementById('catalogue-formations')?.scrollIntoView({ behavior: 'smooth' });
      });
    },
    [router],
  );

  return (
    <section
      id={FORMATION_ORIENTATION_SECTION_ID}
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="formations-orientation-toggle"
    >
      <button
        id="formations-orientation-toggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="formations-orientation-panel"
        className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-left text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:text-base"
      >
        <span>Je ne sais pas quoi choisir → répondre à 3 questions</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#377CF3] transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div id="formations-orientation-panel" className="mt-4">
          <FormationsOrientationWizard onComplete={onComplete} />
        </div>
      ) : null}
    </section>
  );
}
