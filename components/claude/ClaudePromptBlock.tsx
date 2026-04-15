import { CopyPromptButton } from '@/components/CopyPromptButton';

const cardClass =
  'group relative mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/90 pl-4 pr-3 pb-4 pt-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:border-slate-200 hover:shadow-[0_12px_36px_rgba(15,23,42,0.07)]';

export function ClaudePromptBlock({ title, body }: { title?: string; body: string }) {
  return (
    <div className={cardClass}>
      <div className="absolute right-3 top-3">
        <CopyPromptButton text={body} />
      </div>
      {title ? (
        <h3 className="mb-2 font-display text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      ) : null}
      <pre className="whitespace-pre-wrap break-words border-l-[3px] border-[var(--accent)] pl-3 font-mono text-sm leading-relaxed text-slate-800">
        {body}
      </pre>
    </div>
  );
}
