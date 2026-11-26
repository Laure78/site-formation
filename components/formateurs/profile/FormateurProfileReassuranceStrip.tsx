import { MapPin } from 'lucide-react';
import { FORMATEUR_PROFILE_REASSURANCE_STRIP } from '@/components/formateurs/profile/formateur-profile-section-styles';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type Props = {
  items: readonly [string, string, string];
};

export function FormateurProfileReassuranceStrip({ items }: Props) {
  const [first, second, third] = items;

  return (
    <div className={FORMATEUR_PROFILE_REASSURANCE_STRIP}>
      <div className={`${OFC_SECTION_INNER} py-5 sm:py-6`}>
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">{first}</li>
          <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">{second}</li>
          <li className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
            <MapPin className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            {third}
          </li>
        </ul>
      </div>
    </div>
  );
}