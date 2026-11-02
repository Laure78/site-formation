import { LinkedInFollowersLink } from '@/components/linkedin/LinkedInFollowersLink';

/** Preuve LinkedIn — après le catalogue hub ressources. */
export function RessourcesHubComplementary() {
  return (
    <section
      aria-label="Communauté"
      className="ressources-hub-complementary border-t border-slate-200 bg-[#F8FAFC] py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-700">Suivre Laure Olivié sur LinkedIn</p>
          <LinkedInFollowersLink variant="muted" />
        </div>
      </div>
    </section>
  );
}
