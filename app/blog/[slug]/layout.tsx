import { BlogReadingProgress } from '@/components/blog/BlogReadingProgress';

export const revalidate = 3600;

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogReadingProgress />
      {children}
    </>
  );
}
