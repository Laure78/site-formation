import Link from 'next/link';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
} from '@/lib/seo';
import { getFormationCoursePageJsonLd } from '@/lib/schema-course-formations';
import { FAQ_RH_BTP } from '@/lib/faq';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';

const LMS_SLUG = 'ia-rh-btp';
/** À déposer dans public/formations/ia-rh-btp/ si besoin */
const PDF_HREF = '/formations/ia-rh-btp/Programme_Formation_IA_RH_BTP.pdf';

export const metadata = createPageMetadata({
  title: 'Formation IA RH BTP : Recrutement & GEPP efficaces',
  description:
    `Formation IA RH BTP et bâtiment : recrutement, GEPP, tableaux de bord, assistants IA. Session ${SESSION_DUREE_LIBELLE}, forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (niveau avancé). Qualiopi, Constructys.`,
  path: '/formations/ia-rh-btp',
  keywords: [
    'formation IA RH BTP',
    'formation IA BTP',
    'recrutement BTP IA',
    'GEPP BTP intelligence artificielle',
    'DRH BTP formation IA',
    'ChatGPT recrutement BTP',
    'IA ressources humaines BTP',
    'automatisation RH BTP',
    'mémoire technique entreprise BTP',
  ],
  image: {
    url: PHOTOS.btpFormationBureauConseil2026.src,
    width: PHOTOS.btpFormationBureauConseil2026.width,
    height: PHOTOS.btpFormationBureauConseil2026.height,
    alt: PHOTOS.btpFormationBureauConseil2026.alt,
  },
});

const formationCourseGraph = getFormationCoursePageJsonLd('/formations/ia-rh-btp')!;

const MODULES = [
  {
    duree: '1 h',
    outils: 'Éthique · RGPD · prompts',
    titre: 'Cadre RH & IA — vigilance et prompts',
    objectifs: [
      'RGPD, confidentialité et risques (biais, recrutement)',
      'Structure de prompts RH et premiers cas d’usage',
    ],
    livrable: 'Matrice de vigilance + brouillon de prompts',
  },
  {
    duree: '1 h',
    outils: 'Recrutement · formation',
    titre: 'Recrutement et contenus pédagogiques accélérés',
    objectifs: [
      'Trames entretiens, e-mails, sélection ; esquisse de contenus pédagogiques BTP',
    ],
    livrable: 'Modèles réutilisables',
  },
  {
    duree: '1 h',
    outils: 'GEPP · données',
    titre: 'GEPP, compétences et indicateurs',
    objectifs: [
      'Cartographier les compétences et écarts ; pistes de tableaux de bord RH',
    ],
    livrable: 'Trame GEPP + idées de KPI',
  },
  {
    duree: '1 h',
    outils: 'Assistants IA',
    titre: 'Assistants IA RH et plan d’action',
    objectifs: [
      'Configurer des assistants (recrutement, communication interne) et plan 30 jours',
    ],
    livrable: 'Plan d’action IA RH',
  },
];

const HERO_RESUME_RH = [
  `Parcours catalogue BTP-03 : recrutement, GEPP, assistants IA RH.`,
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (niveau avancé).`,
  `${LIBELLE_EFFECTIF_GROUPE_COURT}.`,
  'Qualiopi, financement OPCO selon éligibilité.',
];

export default function FormationIARHBTPPage() {
  const faqSchema = getFAQSchema(FAQ_RH_BTP);

  return (
    <div>
      <JsonLd id="schema-formation-course" schema={formationCourseGraph} />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        refLine={`Présentiel · ${SESSION_DUREE_LIBELLE} · Niveau avancé · BTP-03`}
        title="Formation IA pour la fonction RH dans le BTP"
        subtitle="Recrutement, GEPP, tableaux de bord et assistants IA — entreprises du bâtiment"
        badges={['RH & BTP', 'Présentiel Qualiopi', 'Cas terrain']}
        summaryItems={HERO_RESUME_RH}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationBureauConseil2026.src}
            alt={PHOTOS.btpFormationBureauConseil2026.alt}
            width={PHOTOS.btpFormationBureauConseil2026.width}
            height={PHOTOS.btpFormationBureauConseil2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} />
              Télécharger le programme (PDF)
            </a>
            <Link
              href={`/cours/${LMS_SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <ExternalLink size={20} strokeWidth={1.5} />
              Voir sur la plateforme
            </Link>
          </>
        }
        footerLinks={
          <>
            <a href="#programme" className="font-medium text-[var(--accent)] hover:underline">
              Voir le programme détaillé
            </a>
            <Link
              href={`/cours/${LMS_SLUG}`}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche cours plateforme
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Automatisez le recrutement, optimisez la GEPP, générez des tableaux de bord RH et créez votre
          assistant IA personnalisé. Formation opérationnelle pour DRH, chargés de recrutement et
          responsables RH du secteur BTP — voir aussi la structure{' '}
          <Link
            href="/formations/ia-architecture-claude-dpgf"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            programme détaillé + modalités
          </Link>
          .
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Public :</strong> DRH, chargés de recrutement, responsables RH et assistants RH du BTP.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Durée :</strong> session <strong>{SESSION_DUREE_LIBELLE}</strong> ·{' '}
              <strong>Forfait :</strong> {TARIF_FORFAIT_AVANCE_HT} € HT / participant (niveau avancé) ·{' '}
              <strong>Format :</strong> présentiel (inter en Île-de-France ou intra dans vos locaux).
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> aucune compétence technique IA. {EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Contact :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
          {siteHasPublicPhone() ? (
            <>
              {' · '}
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
            </>
          ) : null}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Automatiser le recrutement et la sélection de candidats',
            'Piloter la GEPP et anticiper les compétences',
            'Créer des tableaux de bord RH opérationnels',
            'Construire un assistant IA RH sur mesure',
            'Maîtriser les risques éthiques et RGPD',
          ].map((o) => (
            <li key={o} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section id="programme" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
        <p className="mt-2 text-sm text-slate-600">
          Session unique {SESSION_DUREE_LIBELLE} — modules condensés ci-dessous.
        </p>
        <div className="mt-8 space-y-8">
          {MODULES.map((m, i) => (
            <div
              key={m.titre}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  Module {i + 1} — {m.titre}
                </h3>
                <span className="text-sm font-medium text-[var(--accent)]">
                  {m.duree} · {m.outils}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase text-slate-500">Objectifs</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {m.objectifs.map((o) => (
                  <li key={o}>▸ {o}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Livrable :</span> {m.livrable}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <h2 className="font-display text-xl font-bold text-slate-900">Conditions &amp; tarification</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
            {TARIF_FORFAIT_AVANCE_HT} € HT / participant (niveau avancé) ·{' '}
            <strong>Financement :</strong> OPCO (Constructys, AKTO, etc.) selon éligibilité.
          </li>
          <li>
            <strong>Livrables :</strong> bibliothèque de prompts RH BTP, modèles de GPTs, repères sécurité et
            RGPD, ressources selon convention.
          </li>
          <li>
            <strong>Évaluation :</strong> cas pratiques, attestation de fin de formation Qualiopi.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_RH_BTP}
        title="Questions fréquentes"
        subtitle="Public, durée, données RH."
      />

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Complément LinkedIn Learning — recrutement dans le BTP
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          Le parcours présentiel s&apos;appuie sur les mêmes enjeux que le cours en ligne{' '}
          <a
            href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            L&apos;IA pour les artisans et TPE : Recruter sa main-d&apos;œuvre efficacement
          </a>{' '}
          (annonces, tri de CV, pré-qualification). Visionnez les leçons sur LinkedIn Learning.
        </p>
      </section>

      <div className="mt-10">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations' },
            { href: `/cours/${LMS_SLUG}`, label: 'Cours sur la plateforme' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
          ]}
        />
      </div>
      </div>
    </div>
  );
}
