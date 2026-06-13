/** Pages blog — index et articles (`/blog`, `/blog/[slug]`). */
export function isBlogPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return p === '/blog' || p.startsWith('/blog/');
}
