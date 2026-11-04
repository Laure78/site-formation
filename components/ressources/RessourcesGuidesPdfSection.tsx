import { JsonLd } from '@/components/JsonLd';
import { getGuidesLibraryEntries } from '@/lib/ressources-guides';
import { buildGuidesPdfItemListJsonLd } from '@/lib/schema-ressources-guides-pdf-jsonld';

/** Section bibliothèque guides — ancre `#guides-pdf`. Le contenu interactif est dans `RessourcesHubMain`. */
export function RessourcesGuidesPdfSection() {
  const guides = getGuidesLibraryEntries();

  return (
    <section
      id="guides-pdf"
      aria-label="Guides et outils gratuits"
      className="scroll-mt-28 border-t border-slate-200 bg-white"
    >
      <JsonLd id="schema-guides-pdf-itemlist" data={buildGuidesPdfItemListJsonLd()} />
      {/* Contenu rendu par RessourcesHubMain — liste crawlable pour les moteurs */}
      <noscript>
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2>Guides &amp; outils gratuits pour les professionnels du BTP</h2>
          <ul>
            {guides.map((g) => (
              <li key={g.href}>
                <a href={g.href}>{g.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </section>
  );
}
