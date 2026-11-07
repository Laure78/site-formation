type Props = {
  id: string;
  title: string;
  description?: string;
  className?: string;
};

/** Titre de section hub ressources — soulignement bleu (maquette parcours métiers). */
export function RessourcesMaquetteSectionTitle({ id, title, description, className = '' }: Props) {
  return (
    <header className={className}>
      <h2 id={id} className="ofc-type-h2 text-[#101936]">
        {title}
      </h2>
      <div className="mt-3 h-1 w-14 rounded-full bg-[#377CF3]" aria-hidden />
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
      ) : null}
    </header>
  );
}
