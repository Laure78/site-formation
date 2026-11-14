import { AGENTS_IA_NIV13_PILOTE_TEXTE } from '@/lib/formation-agents-ia-autonomes-btp-content';
import { ClipboardCheck } from 'lucide-react';

export function Niv13PrototypePiloteSection() {
  return (
    <section
      id="prototype-pilote"
      className="scroll-mt-24"
      aria-labelledby="niv13-prototype-pilote-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-start md:gap-8">
          <ClipboardCheck className="mt-0.5 h-10 w-10 shrink-0 text-[#377CF3]" aria-hidden />
          <div>
            <h2
              id="niv13-prototype-pilote-title"
              className="font-display text-lg font-semibold text-[#101936]"
            >
              Votre prototype est-il prêt pour un pilote ?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {AGENTS_IA_NIV13_PILOTE_TEXTE}
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Résultat annoncé en formation : un prototype testé en atelier. Le gain de temps est
              mesuré pendant la session, relecture comprise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}