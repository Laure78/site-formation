import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import Image from 'next/image';
import { Award, Briefcase, Users, GraduationCap, CheckCircle, TrendingUp, Star } from 'lucide-react';
import { createPageMetadata, getPersonSchema, SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Expert IA BTP — formatrice Qualiopi',
  description:
    "Expert IA pour le BTP : mémoire technique, appels d'offres, formation bâtiment et travaux publics. Laure Olivié, Qualiopi, LinkedIn Learning. Échangeons.",
  path: '/expert-ia-btp',
  keywords: [
    'expert IA BTP',
    'formatrice IA',
    'rédaction mémoire technique',
    'appel d\'offre BTP',
    'consultant IA bâtiment',
    'Laure Olivié',
    'LinkedIn Learning instructor',
    'formation IA entreprise',
    'formation IA appliquée au bâtiment',
  ],
  image: {
    url: PHOTOS.btpFormationVisioChantier2026.src,
    width: PHOTOS.btpFormationVisioChantier2026.width,
    height: PHOTOS.btpFormationVisioChantier2026.height,
    alt: PHOTOS.btpFormationVisioChantier2026.alt,
  },
});

export default function ExpertIABTPPage() {
  const personSchema = getPersonSchema();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero Expert */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
                Laure Olivié
              </h1>
              <p className="mt-4 text-2xl font-semibold text-blue-100">
                Expert IA pour le bâtiment et les travaux publics
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-50">
                Formatrice spécialisée dans l&apos;intégration de l&apos;intelligence artificielle générative (ChatGPT, Claude)
                dans les entreprises du bâtiment et des travaux publics.
                +10 ans d&apos;expérience en formation professionnelle. LinkedIn Learning Instructor officielle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-xl bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">+{formatProfessionalsTrainedCount()}</p>
                  <p className="text-sm text-blue-100">Professionnels formés</p>
                </div>
                <div className="rounded-xl bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">{SOCIAL_PROOF.AVERAGE_RATING}</p>
                  <p className="text-sm text-blue-100">Note moyenne</p>
                </div>
                <div className="rounded-xl bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">+10 ans</p>
                  <p className="text-sm text-blue-100">D'expérience</p>
                </div>
              </div>
            </div>
            <div className="w-full shrink-0 lg:w-96">
              <PortraitLinkedInLink className="block overflow-hidden rounded-2xl shadow-2xl transition-opacity hover:opacity-95">
                <Image
                  src={PHOTOS.formatriceLowerThird.src}
                  alt={PHOTOS.formatriceLowerThird.alt}
                  width={PHOTOS.formatriceLowerThird.width}
                  height={PHOTOS.formatriceLowerThird.height}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 384px"
                  priority
                />
              </PortraitLinkedInLink>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Parcours */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Expertise & Parcours professionnel
          </h2>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                  <GraduationCap size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Formation & Certifications</h3>
                  <ul className="mt-4 space-y-2 text-slate-700">
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span><strong>Certification Qualiopi</strong> — Organisme de formation certifié</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span><strong>LinkedIn Learning Instructor</strong> — Formatrice officielle</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span><strong>+10 ans</strong> en formation professionnelle</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                  <Briefcase size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Domaines d'expertise</h3>
                  <ul className="mt-4 space-y-2 text-slate-700">
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span>IA générative (ChatGPT, Claude, Gemini)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span>Automatisation administrative BTP</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span>Appels d'offres & devis IA</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={20} className="shrink-0 text-[var(--accent)]" />
                      <span>Gestion de chantier avec IA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secteurs accompagnés */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Secteurs accompagnés
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            J&apos;accompagne les dirigeants et équipes du bâtiment et des travaux publics dans leur transformation digitale via l&apos;IA
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Bâtiment & travaux publics',
                items: [
                  'Dirigeants de TPE et PME',
                  'Entreprises de bâtiment et de génie civil',
                  'Travaux publics et voirie',
                  "Conducteurs de travaux et chargés d'affaires",
                ],
              },
              {
                title: 'Enjeux couverts',
                items: [
                  "Devis, chiffrage et appels d'offres",
                  'Comptes rendus et DOE',
                  'Administratif et relation client',
                  'Recrutement et fonctions support',
                ],
              },
            ].map((secteur) => (
              <div
                key={secteur.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900">{secteur.title}</h3>
                <ul className="mt-4 space-y-2">
                  {secteur.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-[var(--accent)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations proposées */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Formations disponibles
          </h2>
          <p className="mt-3 text-slate-600">
            Catalogue complet de formations IA adaptées à votre métier
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Niveau 1 — L'IA au service des pros du bâtiment et des travaux publics",
                href: LINKS.formationIaBtpNiveau1BatimentTp,
                desc: '4 h — débutant · Programme PDF',
              },
              {
                title: "Niveau 2 — L'IA appliquée aux appels d'offres BTP",
                href: LINKS.formationAO,
                desc: '4 h — avancé · Programme PDF',
              },
            ].map((formation) => (
              <Link
                key={formation.href}
                href={formation.href}
                className={`${OFC_CARD} group p-6`}
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                  {formation.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{formation.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/formations"
              className={OFC_CTA_PRIMARY}
            >
              Voir toutes les formations
            </Link>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Ils me font confiance
          </h2>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'FFB - Fédération Française du Bâtiment',
              'CSFE',
              'LinkedIn Learning',
              'OPCO Constructys',
            ].map((partner) => (
              <div
                key={partner}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <p className="font-semibold text-slate-800">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Vous souhaitez former vos équipes à l'IA ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Diagnostic personnalisé gratuit pour identifier les gains de productivité possibles dans votre entreprise.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <RdvLink className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700">
              Prendre rendez-vous
            </RdvLink>
            <Link
              href="/diagnostic-ia-btp"
              className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Diagnostic IA gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
