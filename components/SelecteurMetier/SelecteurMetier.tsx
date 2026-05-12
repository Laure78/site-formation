'use client';

import { useState } from 'react';
import Link from 'next/link';
import { METIERS, type MetierId } from './data';
import { MetierCard } from './MetierCard';
import { CasUsageDetail } from './CasUsageDetail';
import { LINKS } from '@/lib/internal-links';

type Props = {
  /** Affiche un lien vers la page pilier complète (FAQ, breadcrumb). */
  showDedicatedPageLink?: boolean;
};

/**
 * Sélecteur métier → cas d’usage et documents — composant interactif client.
 */
export function SelecteurMetier({ showDedicatedPageLink }: Props) {
  const [selectedId, setSelectedId] = useState<MetierId | null>(null);
  const selected = selectedId ? METIERS.find((m) => m.id === selectedId) : undefined;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {METIERS.map((m) => (
          <MetierCard
            key={m.id}
            id={m.id}
            titre={m.titre}
            sousTitre={m.sousTitre}
            selected={selectedId === m.id}
            dimmed={selectedId !== null && selectedId !== m.id}
            onSelect={() => setSelectedId(m.id)}
          />
        ))}
      </div>

      <div
        className={`mt-8 transition-all duration-300 ease-out ${
          selected ? 'max-h-[9000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
        aria-live="polite"
      >
        {selected ? (
          <CasUsageDetail metier={selected} onChangeMetier={() => setSelectedId(null)} />
        ) : null}
      </div>

      {!selected && (
        <p className="mt-6 text-center text-sm text-[#5A5A5A]">
          Sélectionnez un métier ci-dessus pour afficher cinq cas d’usage prioritaires, les documents que l’IA peut préparer pour vous (avec gains de temps indicatifs) et les tutoriels Skill gratuits correspondants dans les Ressources.
        </p>
      )}

      {showDedicatedPageLink ? (
        <p className="mt-8 text-center text-sm text-[#5A5A5A]">
          <Link href={LINKS.casUsageIaMetierBtp} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
            Page dédiée — définitions, FAQ et références formation IA BTP
          </Link>
        </p>
      ) : null}
    </div>
  );
}
