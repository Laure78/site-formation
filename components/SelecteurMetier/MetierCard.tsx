'use client';

import type { LucideIcon } from 'lucide-react';
import { BriefcaseBusiness, Building2, HardHat } from 'lucide-react';
import type { MetierId } from './data';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const ICON_BY_METIER: Record<MetierId, LucideIcon> = {
  conducteur: HardHat,
  'charge-affaires': BriefcaseBusiness,
  dirigeant: Building2,
};

type Props = {
  id: MetierId;
  titre: string;
  sousTitre: string;
  selected: boolean;
  /** Les autres cartes passent en atténuation lorsqu’un métier est déjà choisi. */
  dimmed: boolean;
  onSelect: () => void;
};

/**
 * Carte métier — sélection exclusive avec état aria-pressed pour lecteurs d’écran.
 */
export function MetierCard({ id, titre, sousTitre, selected, dimmed, onSelect }: Props) {
  const Icon = ICON_BY_METIER[id];

  const cardTone = selected
    ? 'border-[#377CF3] opacity-100 shadow-[0_8px_24px_rgba(55,124,243,0.18)]'
    : dimmed
      ? 'border-transparent opacity-50 md:hover:opacity-70'
      : 'border-transparent opacity-100';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`${OFC_CARD} flex w-full flex-col rounded-xl border-2 p-5 text-left shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-6 ${cardTone}`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            selected ? 'bg-[#D4E3FC] text-[#377CF3]' : 'bg-[#F2F2F2] text-[#5A5A5A]'
          }`}
          aria-hidden
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-snug text-[#1A1A1A]">{titre}</span>
          <span className="mt-1 block text-sm text-[#5A5A5A]">{sousTitre}</span>
        </span>
      </span>
      <span className={`${OFC_CTA_PRIMARY} mt-5 w-full rounded-lg px-4 py-2.5 text-sm md:w-auto md:self-start`}>
        Voir mes cas d&apos;usage
      </span>
    </button>
  );
}
