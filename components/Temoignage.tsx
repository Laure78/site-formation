/**
 * Verbatim court sous un partenaire — n’affiche rien tant que `texte` est vide.
 * Ne jamais inventer de citation : laisser `texte=""` + commentaire `// À compléter par Laure`.
 */
export type TemoignageProps = {
  auteur: string;
  /** Rôle, fonction ou rattachement (réseau, entreprise). */
  role: string;
  texte: string;
};

export function Temoignage({ auteur, role, texte }: TemoignageProps) {
  const quote = texte.trim();
  if (!quote) return null;

  const who = auteur.trim();
  const job = role.trim();

  return (
    <figure className="mt-6 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
      <blockquote className="text-[0.9375rem] leading-relaxed text-slate-800 md:text-base">
        <p>«&nbsp;{quote}&nbsp;»</p>
      </blockquote>
      {who || job ? (
        <figcaption className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-600">
          {who ? <span className="font-semibold text-slate-900">{who}</span> : null}
          {who && job ? <span> — </span> : null}
          {job ? <span>{job}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
