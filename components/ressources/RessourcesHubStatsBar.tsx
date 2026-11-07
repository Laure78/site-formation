import { BookOpen, GraduationCap, Gift, LockOpen } from 'lucide-react';

type Props = {
  guideCount: number;
  complementaryCount: number;
};

/** Quatre repères sous le hero — compteurs dynamiques. */
export function RessourcesHubStatsBar({ guideCount, complementaryCount }: Props) {
  return (
    <section aria-labelledby="ressources-stats-title" className="border-b border-slate-100 bg-white">
      <h2 id="ressources-stats-title" className="sr-only">
        Repères du catalogue
      </h2>
      <div className="mx-auto max-w-[80rem] px-4 pb-10 pt-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { icon: BookOpen, label: `${guideCount} guide${guideCount > 1 ? 's' : ''}` },
            {
              icon: GraduationCap,
              label: `${complementaryCount} tutoriel${complementaryCount > 1 ? 's' : ''}`,
            },
            { icon: Gift, label: '100 % gratuit' },
            { icon: LockOpen, label: 'Sans inscription' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-4 shadow-sm"
            >
              <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
              <p className="text-sm font-semibold leading-snug text-[#101936]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
