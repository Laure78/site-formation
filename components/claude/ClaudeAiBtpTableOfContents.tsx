const ITEMS: { label: string; anchor: string }[] = [
  { label: 'En chiffres', anchor: 'en-chiffres' },
  { label: 'Tutoriel skill', anchor: 'tutoriel-skill-claude-btp' },
  { label: '5 interfaces', anchor: 'tableau-interfaces' },
  { label: 'Visuels interfaces', anchor: 'interfaces-visuels' },
  { label: 'Ressources par interface', anchor: 'ressources-interfaces' },
  { label: 'Gains de temps', anchor: 'gains-temps' },
  { label: 'Prompts', anchor: 'prompts' },
  { label: 'Limites', anchor: 'limites' },
  { label: 'Études de cas', anchor: 'etudes-cas' },
  { label: 'FAQ', anchor: 'faq-claude' },
  { label: 'Questions connexes', anchor: 'faq-connexes' },
  { label: 'Ressources approfondies', anchor: 'cluster' },
];

/**
 * Sommaire ancré — sticky sur desktop (dwell-time, accessibilité).
 */
export function ClaudeAiBtpTableOfContents() {
  return (
    <nav
      aria-label="Sur cette page"
      className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
    >
      <p className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">Sur cette page</p>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm lg:flex-col lg:gap-x-0 lg:gap-y-2">
        {ITEMS.map((item) => (
          <li key={item.anchor} className="lg:w-full">
            <a
              href={`#${item.anchor}`}
              className="text-slate-600 transition hover:text-[var(--accent)] hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
