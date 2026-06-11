import { BlogReadingProgress } from '@/components/blog/BlogReadingProgress';

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogReadingProgress />
      {children}
    </>
  );
}
