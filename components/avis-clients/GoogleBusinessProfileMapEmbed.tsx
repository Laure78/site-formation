import { SCHEMA_GOOGLE_MAPS_EMBED_SRC } from '@/lib/schema-constants';

type GoogleBusinessProfileMapEmbedProps = {
  title?: string;
};

/** Carte Google Maps intégrée — fiche établissement (panneau avis accessible depuis la carte). */
export function GoogleBusinessProfileMapEmbed({
  title = 'Fiche Google Business Profile — Laure Olivié, formation IA BTP',
}: GoogleBusinessProfileMapEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <iframe
        title={title}
        src={SCHEMA_GOOGLE_MAPS_EMBED_SRC}
        className="block h-[min(70vh,520px)] w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}