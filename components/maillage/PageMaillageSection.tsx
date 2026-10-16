import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import type { PageMaillageBlock } from '@/lib/page-maillage-blocks';

type Props = PageMaillageBlock & {
  tone?: 'white' | 'muted';
  className?: string;
};

/** Bloc de maillage standard — titre, accroche et 2–3 cartes descriptives. */
export function PageMaillageSection({
  id,
  title,
  subtitle,
  links,
  tone = 'muted',
  className = '',
}: Props) {
  return (
    <ContextualLinksSection
      id={id}
      title={title}
      subtitle={subtitle}
      links={links}
      variant="cards"
      tone={tone}
      className={className}
    />
  );
}
