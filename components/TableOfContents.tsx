type TOCItem = {
  label: string;
  anchor: string;
};

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  if (!items.length) return null;

  return (
    <nav className="mb-8 rounded-lg bg-[#F2F2F2] p-5" aria-label="Sommaire de l'article">
      <p className="mb-3 font-semibold text-gray-900">Sommaire</p>
      <ol className="list-inside list-decimal space-y-2">
        {items.map((item, i) => (
          <li key={`${item.anchor}-${i}`}>
            <a href={`#${item.anchor}`} className="text-[#377CF3] hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
