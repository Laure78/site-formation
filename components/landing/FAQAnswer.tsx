/**
 * Affiche une réponse FAQ : texte brut ou HTML limité aux balises <a> (source lib/faq.ts).
 */
const LINK_CLASS =
  '[&_a]:font-medium [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-slate-300 [&_a]:transition-colors hover:[&_a]:decoration-[var(--accent)]';

export function FAQAnswer({ content, className }: { content: string; className?: string }) {
  if (!content.includes('<a')) {
    return <span className={className}>{content}</span>;
  }
  return (
    <span
      className={[className, LINK_CLASS].filter(Boolean).join(' ')}
      // eslint-disable-next-line react/no-danger -- HTML issu de lib/faq.ts uniquement (liens internes / Calendly)
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
