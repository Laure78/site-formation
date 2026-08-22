type BlogArticleEnBrefProps = {
  sentences: string[];
  className?: string;
};

/**
 * Bloc « En bref » sous le H1 des articles blog — frontmatter `enBref`.
 */
export function BlogArticleEnBref({ sentences, className = '' }: BlogArticleEnBrefProps) {
  if (!sentences.length) return null;

  return (
    <div
      className={`mt-4 rounded-[8px] border-l-4 border-[#377CF3] bg-[#F2F2F2] px-4 py-3.5 md:px-5 md:py-4 ${className}`.trim()}
      aria-labelledby="blog-article-en-bref-title"
    >
      <p
        id="blog-article-en-bref-title"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]"
      >
        En bref
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 md:text-[0.95rem]">
        {sentences.map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
      </div>
    </div>
  );
}
