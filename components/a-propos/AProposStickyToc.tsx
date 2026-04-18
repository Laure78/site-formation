const LINKS: { href: string; label: string }[] = [
  { href: '#essentiel-retour', label: "L'essentiel" },
  { href: '#portrait-narratif', label: 'Portrait' },
  { href: '#chiffres-cles', label: 'Chiffres clés' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#methodologie', label: 'Méthodologie' },
  { href: '#elements-citables', label: 'Faits vérifiables' },
  { href: '#certifications-reconnaissances', label: 'Certifications' },
  { href: '#formations-linkedin-learning', label: 'LinkedIn Learning' },
  { href: '#clients-partenaires', label: 'Clients' },
  { href: '#zone-intervention', label: 'Zone d’intervention' },
  { href: '#faq', label: 'FAQ' },
];

export function AProposStickyToc() {
  return (
    <nav
      aria-label="Sections de la page"
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-52 shrink-0 overflow-y-auto text-sm lg:block"
    >
      <p className="mb-3 font-semibold text-slate-900">Sur cette page</p>
      <ul className="space-y-2 border-l border-slate-200 pl-3">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-[#377CF3] hover:underline">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
