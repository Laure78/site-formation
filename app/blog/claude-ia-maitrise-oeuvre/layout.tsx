import { BlogReadingProgress } from '@/components/blog/BlogReadingProgress';
import { BlogReadCompleteTracker } from '@/components/analytics/BlogReadCompleteTracker';

export const revalidate = 3600;

export default function ClaudeMoeBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogReadingProgress />
      <BlogReadCompleteTracker />
      {children}
    </>
  );
}
