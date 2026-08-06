import { MapPin } from 'lucide-react';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { DEPARTEMENT_FORMATRICE_GUYANCOURT } from '@/lib/departement-pages/shared';
import { deptLocatif, type DeptGrammar } from '@/lib/formation-ia-btp-dept-grammar';

type Props = {
  grammar: DeptGrammar;
  deptCode: string;
};

/** Bloc partagé — texte identique sur toutes les pages département. */
export function DepartementFormatriceGuyancourt({ grammar, deptCode }: Props) {
  const locatif = deptLocatif(grammar);
  return (
    <section className={OFC_SEC.muted}>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          {DEPARTEMENT_FORMATRICE_GUYANCOURT.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
          {DEPARTEMENT_FORMATRICE_GUYANCOURT.body}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base text-slate-700">
          <MapPin size={16} className="text-[#377CF3]" aria-hidden />
          Guyancourt (78) → interventions {locatif} ({deptCode})
        </div>
      </div>
    </section>
  );
}
