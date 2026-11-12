import { PromptBlockCopyButton } from '@/components/blog/PromptBlockCopyButton';

type Props = {
  fileName: string;
  text: string;
};

/** Fenêtre prompt sombre — texte serveur, bouton copier client. */
export function PromptBlock({ fileName, text }: Props) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] bg-[#2A2A2A] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#555F6D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#555F6D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#555F6D]" />
          </span>
          <span className="truncate font-mono text-xs text-[#E2E8F0]">{fileName}</span>
        </div>
        <PromptBlockCopyButton text={text} />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-5 font-mono text-sm leading-relaxed text-[#E2E8F0] md:px-5">
        {text}
      </pre>
    </div>
  );
}
