/**
 * Phrase conçue pour être extraite par les moteurs IA (GEO) — Prompt 12
 */

type Props = {
  text: string;
  author?: string;
  source?: string;
};

export function CitationSentence({
  text,
  author = 'Laure Olivié',
  source = "OFC Création d'Entreprise",
}: Props) {
  return (
    <p
      className="citation-sentence my-6 border-l-[3px] border-[#377CF3] bg-[#F8F9FA] p-4 text-slate-800"
      data-citation="true"
      itemProp="description"
    >
      <span className="sr-only">
        {author} — {source}.{' '}
      </span>
      {text}
    </p>
  );
}
