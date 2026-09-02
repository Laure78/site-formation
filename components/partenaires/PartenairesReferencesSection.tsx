import { PartenaireReferenceCard } from '@/components/partenaires/PartenaireReferenceCard';
import type { PartenaireReference } from '@/lib/partenaires-references-config';

type Props = {
  id: string;
  titleId: string;
  title: string;
  references: readonly PartenaireReference[];
};

export function PartenairesReferencesSection({ id, titleId, title, references }: Props) {
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={titleId}>
      <h2
        id={titleId}
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        {title}
      </h2>
      <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((ref) => (
          <li key={ref.id}>
            <PartenaireReferenceCard reference={ref} />
          </li>
        ))}
      </ul>
    </section>
  );
}
