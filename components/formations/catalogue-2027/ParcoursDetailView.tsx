import type { ParcoursComputed } from '@/data/catalogue-2027';
import { getParcoursMetierTemplateContent } from '@/lib/catalogue-2027/parcours-metier-template-content';
import { ParcoursMetierTemplate } from './ParcoursMetierTemplate';
import { ParcoursModuleSelectionProvider } from './parcours-module-selection-context';

type Props = {
  parcours: ParcoursComputed;
};

export function ParcoursDetailView({ parcours: p }: Props) {
  const content = getParcoursMetierTemplateContent(p.id);
  if (!content) {
    return (
      <div className="mx-auto max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-slate-600">Parcours introuvable ou en cours de mise à jour.</p>
      </div>
    );
  }
  return (
    <ParcoursModuleSelectionProvider parcours={p}>
      <ParcoursMetierTemplate parcours={p} content={content} />
    </ParcoursModuleSelectionProvider>
  );
}
