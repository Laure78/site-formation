import { BadgeCheck, GraduationCap, HardHat, Rocket } from 'lucide-react';

const TIMELINE = [
  {
    date: '2017-2026',
    icon: HardHat,
    title: 'Dirigeante et conductrice de travaux — ALIA BTP',
    description:
      "Création et direction d'une entreprise de travaux publics (terrassement, voirie) en Île-de-France. 7 ans de gestion quotidienne de chantiers, équipes, appels d'offres, devis, comptes rendus.",
  },
  {
    date: '2019-2022',
    icon: GraduationCap,
    title: 'Formatrice marketing',
    description:
      'Formation professionnelle autour de la communication et du marketing opérationnel pour des entreprises de terrain.',
  },
  {
    date: "2022-aujourd'hui",
    icon: Rocket,
    title: "Création d'OFC — organisme de formation IA BTP",
    description:
      "Spécialisation exclusive dans la formation IA pour le secteur BTP. Certification Qualiopi obtenue. Premiers clients : FFB Grand Paris, FFB Île-de-France.",
  },
  {
    date: '2025-2026',
    icon: BadgeCheck,
    title: 'Instructrice LinkedIn Learning',
    description:
      "Publication de 2 cours officiels. 1 592 professionnels formés en cumul, note 4,85/5.",
  },
] as const;

export function Timeline() {
  return (
    <section id="parcours" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          Un parcours unique : 10 ans de BTP, puis l&apos;IA
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-[#64748B]">
          Seule formatrice IA en France à croiser une expérience terrain de conductrice de travaux et une expertise
          opérationnelle des IA génératives.
        </p>
        <ol className="relative mt-12 max-w-4xl space-y-6 border-l border-[#E2E8F0] pl-8 lg:border-0 lg:pl-0">
          {TIMELINE.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className={`relative lg:grid lg:grid-cols-2 ${index % 2 ? 'lg:text-right' : ''}`}>
                <div className={`hidden lg:block ${index % 2 ? 'lg:col-start-2' : ''}`} />
                <div
                  className={`rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] ${
                    index % 2 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F59E0B]">{step.date}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{step.description}</p>
                </div>
                <div className="absolute -left-[48px] top-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF] lg:left-1/2 lg:-translate-x-1/2">
                  <Icon className="h-7 w-7 text-[#377CF3]" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
