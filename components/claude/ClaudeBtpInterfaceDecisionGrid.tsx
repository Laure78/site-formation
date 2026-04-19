import { Briefcase, Chrome, Code2, Info, MessageSquare, Monitor } from 'lucide-react';

const ROWS: {
  name: string;
  access: string;
  ideal: string;
  gain: string;
  Icon: typeof MessageSquare;
}[] = [
  {
    name: 'Claude Chat',
    access: 'claude.ai · mobile · desktop',
    ideal: 'Emails, analyse DCE, CR chantier, devis',
    gain: '−85 %',
    Icon: MessageSquare,
  },
  {
    name: 'Claude Cowork',
    access: 'App Desktop → onglet Cowork',
    ideal: 'Missions autonomes sur fichiers, veille AO automatisée',
    gain: '−85 à −100 %',
    Icon: Briefcase,
  },
  {
    name: 'Claude Code',
    access: 'Terminal · VS Code · JetBrains',
    ideal: 'Devis PDF, calculateurs métrés, relances en série',
    gain: '−85 à −90 %',
    Icon: Code2,
  },
  {
    name: 'App Desktop',
    access: 'Mac / Windows — claude.ai',
    ideal: 'Cowork + Dispatch (missions depuis le chantier)',
    gain: '—',
    Icon: Monitor,
  },
  {
    name: 'Claude Chrome',
    access: 'Extension Chrome Web Store',
    ideal: 'Analyse AO BOAMP, rédaction Gmail, extraction DPGF',
    gain: '−80 %',
    Icon: Chrome,
  },
];

export function ClaudeBtpInterfaceDecisionGrid() {
  return (
    <section className="scroll-mt-24" aria-labelledby="tableau-interfaces">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 id="tableau-interfaces" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
          Les 5 interfaces — décision rapide
        </h2>
        <p className="max-w-md text-sm text-[#64748B]">Choisissez l’outil selon la nature de la tâche.</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {ROWS.map((row) => {
          const Icon = row.Icon;
          return (
            <article
              key={row.name}
              className="flex flex-col rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#377CF3]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{row.name}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#64748B]">Accès :</p>
              <p className="mt-1 text-sm text-[#475569]">{row.access}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#64748B]">Idéal pour :</p>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-[#334155]">{row.ideal}</p>
              <p className="mt-5">
                <span className="inline-flex rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-bold text-[#047857]">
                  GAIN {row.gain}
                </span>
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-sm leading-relaxed text-[#334155] md:items-start md:p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
        <p>
          <strong className="font-semibold text-[#0F172A]">Règle simple :</strong> ponctuel → Chat · fichiers locaux →
          Cowork · automatisation PDF → Code · page web ouverte → Chrome.
        </p>
      </div>
    </section>
  );
}
