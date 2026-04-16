import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const ffbSocialProofLine = `Référence FFB : ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}`;

const CARTES = [
  {
    title: 'Dirigeants & conducteurs de travaux',
    desc: 'Pilotez la transformation IA de votre entreprise et gagnez en productivité sur les mémoires techniques et les réponses aux appels d’offres.',
  },
  {
    title: 'Équipes administratives',
    desc: 'Automatisez la rédaction de courriers, la gestion des mails et la mise en forme des documents.',
  },
  {
    title: 'Fédérations & OPCO',
    desc: `Proposez à vos adhérents une formation IA concrète, avec des résultats mesurables. ${ffbSocialProofLine}.`,
  },
  {
    title: 'Bureaux d’études',
    desc: "Accélérez l'analyse documentaire, la synthèse technique et la production de rapports grâce à l'IA.",
  },
] as const;

export function PourQuiSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900 md:text-4xl">
          Pour <span className="font-serif italic text-slate-800">qui</span> ?
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARTES.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
