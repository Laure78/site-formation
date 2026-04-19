import {
  ClipboardList,
  FileSearch,
  LucideIcon,
  Mail,
  Radar,
} from 'lucide-react';
import { CopyPromptButton } from '@/components/CopyPromptButton';

const cardClass =
  'group relative mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]';

const TITLE_ICONS: Record<string, LucideIcon> = {
  'Analyse de DCE et Go/No-Go': FileSearch,
  'Compte rendu de réunion de chantier': ClipboardList,
  'Email professionnel BTP contextualisé': Mail,
  'Veille AO automatisée — Cowork tâche planifiée': Radar,
};

function highlightLine(line: string, key: number) {
  const roleLike = /^(ROLE|CONTEXTE|MISSION|FORMAT|RÈGLES)(\s|$)/i;
  const m = line.match(roleLike);
  if (m && m[1]) {
    const rest = line.slice(m[1].length);
    return (
      <span key={key} className="block">
        <span className="font-semibold text-[#60A5FA]">{m[1]}</span>
        {rest}
      </span>
    );
  }
  const cmd = line.match(/^(Commandes rapides\s*:)/i);
  if (cmd) {
    return (
      <span key={key} className="block">
        <span className="font-semibold text-[#60A5FA]">{cmd[1]}</span>
        {line.slice(cmd[1].length)}
      </span>
    );
  }
  return (
    <span key={key} className="block">
      {line}
    </span>
  );
}

function PromptBody({ body }: { body: string }) {
  const lines = body.split('\n');
  return (
    <div className="font-mono text-sm leading-relaxed text-[#E2E8F0]">
      {lines.map((line, i) => highlightLine(line, i))}
    </div>
  );
}

export function ClaudePromptBlock({ title, body }: { title?: string; body: string }) {
  const Icon: LucideIcon | undefined = title ? TITLE_ICONS[title] : undefined;
  const showGeo = title === 'Analyse de DCE et Go/No-Go';

  return (
    <div className={cardClass}>
      <div
        className={`flex flex-wrap items-start gap-3 border-b border-[#1E293B] bg-[#0F172A] px-4 py-4 md:px-5 ${title ? 'justify-between' : 'justify-end'}`}
      >
        {title ? (
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {Icon ? (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E293B] text-[#60A5FA]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
            ) : null}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
                {showGeo ? (
                  <span className="rounded-full bg-[#1E293B] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#93C5FD]">
                    GEO
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <CopyPromptButton
          text={body}
          className="border-[#334155] bg-[#1E293B] text-[#E2E8F0] hover:bg-[#334155]"
        />
      </div>

      <div className="bg-[#0F172A] px-4 pb-5 pt-4 md:px-5">
        <PromptBody body={body} />
        <p className="mt-4 border-t border-[#1E293B] pt-3 text-xs text-[#64748B]">Laure Olivié · OFC</p>
      </div>
    </div>
  );
}
