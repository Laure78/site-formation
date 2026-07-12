import { BlogReadingProgress } from '@/components/blog/BlogReadingProgress';

export const revalidate = 3600;

/** Barre de progression lecture uniquement — header/footer via `app/layout.tsx`. */
export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogReadingProgress />
      {children}
    </>
  );
}
