import { EvenementAoBtpPromoEncart } from '@/components/evenements/EvenementAoBtpPromoEncart';
import { LinkedInFollowersLink } from '@/components/linkedin/LinkedInFollowersLink';

/** Événement actif + preuve LinkedIn — après le catalogue hub. */
export function RessourcesHubComplementary() {
  return (
    <section
      aria-label="Événement et communauté"
      className="ressources-hub-complementary border-t border-slate-200 bg-[#F8FAFC] py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4">
        <EvenementAoBtpPromoEncart placement="ressources" variant="compact" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-700">Suivre Laure Olivié sur LinkedIn</p>
          <LinkedInFollowersLink variant="muted" />
        </div>
      </div>
    </section>
  );
}
