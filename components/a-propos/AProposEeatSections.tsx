import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  LINKEDIN_LEARNING_A_PROPOS_EMBEDS,
  LINKEDIN_LEARNING_INSTRUCTOR_HREF,
} from '@/lib/linkedin-learning-a-propos-embeds';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { SOCIAL_PROOF } from '@/lib/constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const formesNombreAffiche =
  SOCIAL_PROOF.PROFESSIONALS_TRAINED.toLocaleString('fr-FR');

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
    text: `${formesNombreAffiche} professionnels formés — note ${SOCIAL_PROOF.AVERAGE_RATING}`,
  },
] as const;

const REF_TABLE = [
  { label: 'Professionnels formés', value: formesNombreAffiche },
  { label: 'Note de satisfaction', value: SOCIAL_PROOF.AVERAGE_RATING },
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
              <div className="flex w-full max-w-[260px] items-center justify-center">
                <Image
                  src={PHOTOS.qualiopiLogoOfficiel.src}
                  alt={PHOTOS.qualiopiLogoOfficiel.alt}
                  width={PHOTOS.qualiopiLogoOfficiel.width}
                  height={PHOTOS.qualiopiLogoOfficiel.height}
                  className="h-auto max-h-24 w-full object-contain"
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

      {/* Formations LinkedIn Learning — extraits vidéo + lien catalogue OFC */}
      <section
        id="formations-linkedin-learning"
        className="scroll-mt-24 border-t border-slate-100 bg-white px-4 py-16"
        aria-labelledby="titre-formations-linkedin"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="titre-formations-linkedin"
            className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Formations LinkedIn Learning
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            Deux cours publiés en tant qu&apos;instructrice officielle — extraits vidéo ci-dessous. Pour les sessions{' '}
            <strong>en entreprise</strong>, certifiées <QualiopiWordmark /> et finançables{' '}
            <strong>Constructys</strong> (dont la formation IA BTP en présentiel ou à distance), consultez le{' '}
            <Link
              href={LINKS.formations}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              catalogue des formations OFC
            </Link>
            .
          </p>

          <div className="mt-12 space-y-14">
            {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((item, index) => (
              <div key={`linkedin-learning-embed-${index}`}>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg">
                  <iframe
                    src={item.embedSrc}
                    title={item.iframeTitle}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-slate-700">
                  <strong>
                    <a
                      href={item.lessonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#377CF3] underline-offset-2 hover:underline"
                    >
                      {item.lessonLabel}
                    </a>
                  </strong>{' '}
                  — extrait du cours{' '}
                  <strong>
                    <a
                      href={item.courseHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#377CF3] underline-offset-2 hover:underline"
                    >
                      {item.courseLabel}
                    </a>
                  </strong>{' '}
                  par{' '}
                  <strong>
                    <a
                      href={LINKEDIN_LEARNING_INSTRUCTOR_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#377CF3] underline-offset-2 hover:underline"
                    >
                      Laure Olivié
                    </a>
                  </strong>{' '}
                  sur LinkedIn Learning.
                </p>
              </div>
            ))}
          </div>
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
