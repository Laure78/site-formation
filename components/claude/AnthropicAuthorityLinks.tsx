export function AnthropicAuthorityLinks() {
  return (
    <p className="mt-3 text-xs text-slate-500">
      <a
        href="https://docs.anthropic.com/"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Documentation Anthropic
      </a>
      <span className="mx-1.5 text-slate-300" aria-hidden>
        ·
      </span>
      <a
        href="https://www.anthropic.com/pricing"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Tarifs Claude
      </a>
      <span className="mx-1.5 text-slate-300" aria-hidden>
        ·
      </span>
      <a
        href="https://www.anthropic.com/news"
        className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Actualités Anthropic
      </a>
    </p>
  );
}
