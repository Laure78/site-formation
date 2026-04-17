/**
 * Pages « formation » : widget Calendly inline avant le footer (catalogue + fiches /formation-*).
 */
export function isFormationCalendlyInlinePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (p.startsWith('/admin')) return false;
  if (p.startsWith('/api')) return false;
  return p.startsWith('/formations') || p.startsWith('/formation-');
}
