'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { buildFormationsIaHref } from '@/lib/catalogue-filter-url';

const PLACEHOLDER =
  'Rechercher : devis, appels d’offres, chantier, ChatGPT, Claude…';

type Props = {
  className?: string;
  inputId?: string;
};

/** Barre pill — redirige vers le catalogue avec `?q=`. */
export function AccueilCatalogueSearchBar({
  className = '',
  inputId = 'accueil-catalogue-search',
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    router.push(
      trimmed
        ? buildFormationsIaHref({ q: trimmed })
        : '/formations#catalogue-formations',
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={`mx-auto w-full max-w-[60rem] ${className}`}
    >
      <div className="relative flex items-center rounded-full border border-[#E2E8F0] bg-white pl-5 pr-1.5 shadow-sm sm:pl-6">
        <label htmlFor={inputId} className="sr-only">
          Rechercher une formation IA BTP
        </label>
        <input
          id={inputId}
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDER}
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-12 flex-1 border-0 bg-transparent py-3 pr-3 text-base text-ofc-ink placeholder:text-sm placeholder:italic placeholder:text-ofc-ink-muted/80 focus:outline-none focus-visible:ring-0 sm:min-h-[3.25rem] sm:py-3.5"
        />
        <button
          type="submit"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ofc-accent text-white transition-colors hover:bg-ofc-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent sm:h-12 sm:w-12"
          aria-label="Lancer la recherche"
        >
          <Search className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </button>
      </div>
    </form>
  );
}
