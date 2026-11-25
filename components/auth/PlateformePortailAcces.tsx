import Link from 'next/link';
import { GraduationCap, Shield, Users } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const CARD_CLASS =
  'flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-[#377CF3]/30';

type PlateformePortailAccesProps = {
  /** Titre optionnel au-dessus des cartes */
  showHeading?: boolean;
};

/** Trois entrées distinctes : stagiaire / extranet formateur / administration LMS. */
export function PlateformePortailAcces({ showHeading = true }: PlateformePortailAccesProps) {
  const clientHref = `${LINKS.authConnexion}?portal=apprenant&next=${encodeURIComponent(LINKS.espaceApprenant)}`;

  return (
    <div>
      {showHeading ? (
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
          Choisissez votre espace
        </h2>
      ) : null}
      <div className={`grid gap-4 sm:grid-cols-3${showHeading ? ' mt-6' : ''}`}>
        <Link href={clientHref} className={CARD_CLASS}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF6FF]">
            <GraduationCap className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">Espace client</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Stagiaires et clients OFC : supports, progression et attestations après votre session en
            présentiel.
          </p>
          <span className="mt-4 text-sm font-semibold text-[#377CF3]">Se connecter →</span>
        </Link>

        <Link href={LINKS.espaceFormateursConnexion} className={CARD_CLASS}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF6FF]">
            <Users className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">Espace formateur</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Intervenants invités : charte, programmes, interventions et documents — extranet OFC.
          </p>
          <span className="mt-4 text-sm font-semibold text-[#377CF3]">Connexion formateurs →</span>
        </Link>

        <Link href={LINKS.accesAdmin} className={CARD_CLASS}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF6FF]">
            <Shield className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">Administration</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Équipe OFC : gestion des cours, apprenants, sessions et indicateurs Qualiopi.
          </p>
          <span className="mt-4 text-sm font-semibold text-[#377CF3]">Accès admin →</span>
        </Link>
      </div>
    </div>
  );
}