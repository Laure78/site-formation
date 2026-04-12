import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/seo';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const formesNombreAffiche = Number(
  String(SITE_CONFIG.statsPersonnesFormees).replace(/\D/g, '') || '0'
).toLocaleString('fr-FR');

const PARCOURS = [
  {
    year: '2014',
    text: 'Début de carrière en formation professionnelle BTP',
  },
  {
    year: '2017',
    text: "Création d'ALIA BTP — conduite de chantier travaux publics",
  },
  {
    year: '2022',
    text: "OFC Création d'Entreprise — spécialisation formation IA",
  },
  {
    year: '2023',
    text: 'Certification Qualiopi obtenue',
  },
  {
    year: '2024',
    text: 'Partenariats FFB Grand Paris et FFB Île-de-France',
  },
  {
    year: '2025',
    text: 'Publication de 2 cours sur LinkedIn Learning',
  },
  {
    year: '2026',
    text: `${formesNombreAffiche} professionnels formés — note 4,85/5`,
  },
] as const;

const REF_TABLE = [
  { label: 'Professionnels formés', value: formesNombreAffiche },
  { label: 'Note de satisfaction', value: '4,85/5' },
  { label: 'Partenaires institutionnels', value: '8+' },
  { label: "Années d'expérience BTP", value: '10+' },
  { label: 'Cours LinkedIn Learning', value: '2' },
] as const;

/** Sections E-E-A-T / GEO — timeline verticale, certifications, chiffres (charte OFC, Poppins). */
export function AProposEeatSections() {
  return (
    <div className={`space-y-0 border-b border-slate-200 bg-white ${poppins.className}`}>
      {/* 1. Timeline Parcours */}
      <section
        id="parcours-timeline"
        className="scroll-mt-24 px-4 py-16"
        aria-labelledby="titre-parcours-timeline"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="titre-parcours-timeline"
            className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Parcours
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            Jalons professionnels et développement d&apos;OFC — formation BTP, terrain TP, IA et
            certifications.
          </p>
          <ol className="mx-auto mt-12 max-w-2xl list-none space-y-6 p-0">
            {PARCOURS.map((item) => (
              <li
                key={item.year}
                className="rounded-r-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] py-5 pl-6 pr-5 shadow-sm"
              >
                <p className="text-lg font-bold text-[#377CF3] md:text-xl">{item.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Certifications */}
      <section
        id="certifications-reconnaissances"
        className="scroll-mt-24 border-t border-slate-100 bg-[#F2F2F2] px-4 py-16"
        aria-labelledby="titre-certifications"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="titre-certifications"
            className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Certifications &amp; reconnaissances
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            Labels et dispositifs vérifiables — crédibilité pour les moteurs de recherche et les
            assistants IA (GEO).
          </p>
          <ul className="mt-12 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
            <li className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="flex h-20 w-full max-w-[200px] items-center justify-center">
                <Image
                  src="/images/blog/carrousel-5-assistants-ia-btp/08-cta-qualiopi-opco.png"
                  alt="Logo certification Qualiopi — organisme de formation certifié"
                  width={200}
                  height={80}
                  className="h-auto max-h-16 w-auto max-w-full object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug text-slate-900">
                Certifiée Qualiopi (NDA 11788515078)
              </p>
            </li>
            <li className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="flex h-20 w-full max-w-[220px] items-center justify-center">
                <Image
                  src="/images/laure-linkedin-learning-sommaire-cours.png"
                  alt="Logo LinkedIn Learning — instructrice officielle"
                  width={220}
                  height={72}
                  className="h-auto max-h-16 w-auto max-w-full object-contain object-center"
                />
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug text-slate-900">
                Instructrice officielle LinkedIn Learning
              </p>
            </li>
            <li className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:col-span-2 lg:col-span-1">
              <div
                className="flex h-20 w-full max-w-[200px] items-center justify-center rounded-xl border-2 border-[#000091] bg-white px-3"
                aria-hidden
              >
                <span className="text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-[#000091]">
                  Activateur
                  <br />
                  <span className="text-[10px] font-semibold normal-case">France Num</span>
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug text-slate-900">
                Labellisée Activateur France Num
              </p>
              <Link
                href="https://www.francenum.gouv.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                francenum.gouv.fr
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Tableau références */}
      <section
        id="references-chiffrees"
        className="scroll-mt-24 px-4 py-16"
        aria-labelledby="titre-references-chiffrees"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="titre-references-chiffrees"
            className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Références chiffrées
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
            Indicateurs consolidés — OFC Création d&apos;Entreprise, sessions évaluées et parcours
            public.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[320px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Références chiffrées — Laure Olivié, formatrice IA BTP
              </caption>
              <thead>
                <tr className="border-b border-[#D4E3FC] bg-[#F2F2F2]">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Indicateur
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Valeur
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {REF_TABLE.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">{row.label}</td>
                    <td className="px-4 py-3 font-semibold text-[#377CF3]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
