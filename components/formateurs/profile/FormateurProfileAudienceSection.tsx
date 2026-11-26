import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

type Props = {
  headingId: string;
  title: string;
  audience: readonly string[];
  modaliteLine: string;
  tone?: 'white' | 'muted';
};

export function FormateurProfileAudienceSection({
  headingId,
  title,
  audience,
  modaliteLine,
  tone = 'muted',
}: Props) {
  return (
    <section
      className={ofcSectionClasses({ tone, size: 'compact' })}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <h2 id={headingId} className={OFC_TYPE_H2}>
          {title}
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
          {audience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-base text-slate-600">{modaliteLine}</p>
      </div>
    </section>
  );
}