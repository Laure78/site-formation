import { JsonLd } from '@/components/JsonLd';
import { RessourcesGuidesPdfLibrary } from '@/components/ressources/RessourcesGuidesPdfLibrary';
import { getGuidesLibraryEntries } from '@/lib/ressources-guides';
import { buildGuidesPdfItemListJsonLd } from '@/lib/schema-ressources-guides-pdf-jsonld';

/** Section bibliothèque guides — ancre `#guides-pdf`. */
export function RessourcesGuidesPdfSection() {
  const guides = getGuidesLibraryEntries();

  return (
    <section
      id="guides-pdf"
      aria-labelledby="guides-pdf-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-12 md:py-16"
    >
      <JsonLd id="schema-guides-pdf-itemlist" data={buildGuidesPdfItemListJsonLd()} />
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="guides-pdf-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Guides & outils gratuits pour les professionnels du BTP
        </h2>
        <RessourcesGuidesPdfLibrary guides={guides} />
      </div>
    </section>
  );
}
