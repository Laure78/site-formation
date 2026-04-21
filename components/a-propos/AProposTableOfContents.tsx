const LINKS: { href: string; label: string }[] = [
  { href: '#essentiel', label: "L'essentiel" },
  { href: '#portrait', label: 'Portrait' },
  { href: '#chiffres-cles', label: 'Chiffres clés' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#references-chiffrees', label: 'Références chiffrées' },
  { href: '#pourquoi-laure', label: 'Pourquoi Laure' },
  { href: '#faits-verifiables', label: 'Faits vérifiables' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#clients-partenaires', label: 'Clients' },
  { href: '#linkedin-learning', label: 'LinkedIn Learning' },
  { href: '#methodologie', label: 'Méthodologie' },
  { href: '#zone-intervention', label: 'Zone d’intervention' },
  { href: '#faq', label: 'FAQ' },
];

export function AProposTableOfContents() {
  return (
    <nav
      aria-label="Sommaire de la page À propos"
      className="hidden rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] lg:sticky lg:top-24 lg:block"
    >
      <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-[#0F172A]">Sur cette page</p>
      <ul className="mt-4 space-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block rounded-lg px-2 py-1.5 text-sm text-[#475569] transition hover:bg-[#EFF6FF] hover:text-[#377CF3]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
