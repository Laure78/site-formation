import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** @deprecated L’encadré commercial est dans le hero (`TrainingHero.commercialAside`). */
  sidebar?: ReactNode | null;
};

/** Conteneur colonne principale fiche formation. */
export function TrainingPageLayout({ children, sidebar }: Props) {
  const hasSidebar = Boolean(sidebar);
  return (
    <div
      className={
        hasSidebar
          ? 'training-page-layout mx-auto max-w-[78rem] px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] lg:gap-8 xl:gap-10'
          : 'training-page-layout mx-auto max-w-[78rem] px-4'
      }
    >
      <div className="min-w-0 [&>section]:max-w-none [&>section]:px-0 [&_.mx-auto.max-w-\[78rem\]]:max-w-none">
        {children}
      </div>
      {hasSidebar ? (
        <aside className="hidden lg:block" aria-label="Informations et actions">
          <div className="sticky top-[calc(var(--site-header-height)+3.25rem)] z-20 max-h-[calc(100dvh-var(--site-header-height)-4.5rem)] overflow-y-auto overscroll-contain pb-6 pt-1">
            {sidebar}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
