import { Check } from 'lucide-react';
import {
  FINANCEMENT_ENTREPRISE_REALISE,
  FINANCEMENT_OFC_FOURNIT,
} from '@/lib/financement-constructys-page-config';
import { FC_CARD, FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2.25} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FinancementQuiFaitQuoiSection() {
  return (
    <section aria-labelledby="qui-fait-quoi-title" className={FC_SECTION}>
      <h2 id="qui-fait-quoi-title" className={FC_TITLE}>
        Qui fait quoi ?
      </h2>
      <p className={FC_SUBTITLE}>
        Répartition des responsabilités entre l’organisme de formation et l’entreprise demandeuse.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className={`${FC_CARD} border-[#377CF3]/20 bg-[#EAF3FF]/40`}>
          <h3 className="font-display text-lg font-bold text-[#377CF3]">Notre organisme fournit</h3>
          <CheckList items={FINANCEMENT_OFC_FOURNIT} />
        </article>
        <article className={FC_CARD}>
          <h3 className="font-display text-lg font-bold text-[#081943]">Votre entreprise effectue</h3>
          <CheckList items={FINANCEMENT_ENTREPRISE_REALISE} />
        </article>
      </div>
    </section>
  );
}
