'use client';

import { RevealGroup } from '@/components/motion/Reveal';
import { A_PROPOS_CLIENTS_CATEGORIES } from '@/lib/a-propos-eeat-content';

export function AProposClientsCategories() {
  return (
    <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2" staggerMs={65}>
      {A_PROPOS_CLIENTS_CATEGORIES.map((category) => (
        <div
          key={category.title}
          className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_10px_28px_rgba(55,124,243,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <h3 className="font-semibold text-[#0F172A]">{category.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#475569]">
            {category.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#377CF3]" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </RevealGroup>
  );
}
