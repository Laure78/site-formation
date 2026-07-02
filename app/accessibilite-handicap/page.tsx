import Link from 'next/link';
import { Users } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';
import { QUALIOPI_HANDICAP_STANDARD, QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Accessibilité & handicap — OFC formation BTP',
  description:
    'Référente handicap, process d\'accueil des personnes en situation de handicap, adaptations possibles et partenaires (AGEFIPH, Cap emploi, MDPH). OFC Création d\'Entreprise, Qualiopi.',
  path: '/accessibilite-handicap',
});

export default function AccessibiliteHandicapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Accessibilité &amp; handicap
      </h1>
      <p className="mt-4 text-slate-600">
        OFC Création d&apos;Entreprise s&apos;engage à accueillir les personnes en situation de handicap dans
        ses actions de formation professionnelle.
      </p>

      <ReferentHandicapBlock className="mt-10" />

      <article className="mt-12 space-y-10 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Processus d&apos;accueil</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            <li>
              <strong>Avant l&apos;inscription :</strong> contactez la référente handicap pour décrire votre
              situation et vos besoins (mobilité, vision, audition, cognition, fatigue, etc.).
            </li>
            <li>
              <strong>Étude des adaptations :</strong> durée, rythme, supports (gros caractères, PDF
              accessibles), interprète, aménagement de la salle, présence d&apos;un accompagnant si nécessaire.
            </li>
            <li>
              <strong>Convention :</strong> les adaptations retenues sont mentionnées dans la convention de
              formation ou le programme individualisé.
            </li>
            <li>
              <strong>Suivi :</strong> point en début et fin de session pour ajuster si besoin.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Adaptations possibles</h2>
          <p className="mt-4">{QUALIOPI_HANDICAP_STANDARD}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Adaptation des supports pédagogiques (format, contraste, lecture vocale).</li>
            <li>Aménagement du temps (pauses, découpage, rythme individualisé).</li>
            <li>Choix du lieu (accessibilité PMR — vérification du site d&apos;accueil en amont).</li>
            <li>Recours à un tiers (assistant, interprète LSF) selon financement et disponibilité.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Partenaires et ressources</h2>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 p-5">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
            <div>
              <p>AGEFIPH, Cap emploi, MDPH — contacts par région et département.</p>
              <p className="mt-3">
                <Link href={LINKS.annuaireHandicap} className="font-medium text-[#377CF3] hover:underline">
                  Consulter l&apos;annuaire handicap OFC (PDF téléchargeable)
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Identité de l&apos;organisme</h2>
          <p className="mt-4">
            {QUALIOPI_LEGAL.raisonSociale} — SIRET {QUALIOPI_LEGAL.siret} — NDA {QUALIOPI_LEGAL.nda}.
          </p>
          <p className="mt-2 italic text-slate-600">{QUALIOPI_LEGAL.ndaExactMention}</p>
        </section>

        <QualiopiCertificationNotice className="rounded-2xl border border-slate-200 bg-white p-6" />
      </article>
    </div>
  );
}
