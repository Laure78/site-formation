import Link from 'next/link';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';

const LMS_SLUG = 'formation-ia-sensibilisation-prompt-engineering-assistants';
/** Supports statiques — voir public/formations/pitel-ia-sensibilisation-prompts-assistants/README.md */
const PDF_HREF =
  '/formations/pitel-ia-sensibilisation-prompts-assistants/PITEL_Formation_IA_Modules1et2.pdf';

export const metadata = createPageMetadata({
  title: "Sensibilisation à l'IA & assistants personnalisés — Formation LMS BTP",
  description:
    `Sensibilisation IA BTP et bâtiment : prompts métier, assistants IA, usages terrain. Session ${SESSION_DUREE_LIBELLE}, forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant). Ressources LMS. Qualiopi, Constructys.`,
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  keywords: [
    'sensibilisation IA BTP',
    'formation IA BTP',
    'formation assistants IA personnalisés',
    'prompts par métier BTP',
    'formation IA en ligne',
    'appel d\'offre BTP',
    'Constructys',
  ],
  image: {
    url: PHOTOS.btpFormationEcranIABTP2026.src,
    width: PHOTOS.btpFormationEcranIABTP2026.width,
    height: PHOTOS.btpFormationEcranIABTP2026.height,
    alt: PHOTOS.btpFormationEcranIABTP2026.alt,
  },
});

const courseSchema = getCourseSchema({
  name: "Sensibilisation à l'IA & Assistants IA personnalisés",
  description:
    `Session ${SESSION_DUREE_LIBELLE} : sensibilisation IA, prompts par métier, assistants. Forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant). Finançable Constructys selon éligibilité.`,
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  {
    name: "Sensibilisation à l'IA & assistants IA",
    path: '/formations/sensibilisation-ia-assistants-personnalises',
  },
]);

const MODULES = [
  {
    duree: '1 h',
    outils: 'Supports PDF · plateforme LMS',
    titre: 'Sensibilisation à l’IA générative',
    objectifs: [
      'Usages terrain BTP et cas d’usage prioritaires',
      'Parcours des supports modules 1 et 2 (à approfondir sur le LMS)',
    ],
    livrable: 'Repères + accès ressources plateforme',
  },
  {
    duree: '1 h',
    outils: 'Ressource Excel · prompts par métier',
    titre: 'Prompts par métier',
    objectifs: [
      'Banque de prompts et personnalisation (devis, relances, admin.)',
    ],
    livrable: 'Fichier Excel prompts (mise à jour)',
  },
  {
    duree: '1 h',
    outils: 'Plateforme LMS · assistants IA',
    titre: 'Assistants IA personnalisés — conception',
    objectifs: [
      'Périmètre d’un assistant aligné sur vos process ; tests sur cas réels',
    ],
    livrable: 'Trame assistant + tests',
  },
  {
    duree: '1 h',
    outils: 'Déploiement',
    titre: 'Plan de mise en œuvre',
    objectifs: [
      'Plan simple de déploiement en entreprise et prochaines étapes sur le LMS',
    ],
    livrable: 'Trame de mise en œuvre',
  },
];

const HERO_RESUME_SENSIB = [
  `Parcours catalogue BTP-05 : sensibilisation IA, prompts métier, assistants personnalisés.`,
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant).`,
  `${LIBELLE_EFFECTIF_GROUPE_COURT}.`,
  'Ressources LMS en prolongement — Qualiopi, OPCO Constructys selon éligibilité.',
];

const FAQ_SENSIB = [
  {
    q: 'Quels comptes IA pour le niveau débutant ?',
    a: COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  },
  {
    q: 'Cette formation est-elle la même que sur la plateforme de formation ?',
    a: "Oui. Le titre affiché sur le LMS est « Formation IA : Sensibilisation à l'IA & Assistants IA Personnalisés ». Vous accédez au parcours complet depuis la page du cours une fois inscrit.",
  },
  {
    q: 'Combien de temps dure la formation ?',
    a: `La session encadrée est de ${SESSION_DUREE_LIBELLE} (forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT par participant, niveau débutant). Des ressources LMS restent disponibles en prolongement pour approfondir à votre rythme.`,
  },
  {
    q: 'Est-ce finançable par mon OPCO ?',
    a: "Oui, les entreprises du BTP peuvent mobiliser l'OPCO Constructys selon les règles en vigueur. Contactez-nous pour un devis et une convention adaptés.",
  },
];

export default function SensibilisationIAAssistantsPage() {
  const faqSchema = getFAQSchema(FAQ_SENSIB);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FormationCourseHero
        refLine={`Session ${SESSION_DUREE_LIBELLE} · Débutant · BTP-05 · LMS en prolongement`}
        title={"Sensibilisation à l'IA & Assistants IA personnalisés"}
        subtitle="Prompts par métier, assistants sur mesure — aligné sur le socle « IA au service du bâtiment »"
        badges={['Débutant', 'Qualiopi', 'Ressources LMS']}
        summaryItems={HERO_RESUME_SENSIB}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationEcranIABTP2026.src}
            alt={PHOTOS.btpFormationEcranIABTP2026.alt}
            width={PHOTOS.btpFormationEcranIABTP2026.width}
            height={PHOTOS.btpFormationEcranIABTP2026.height}
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
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
          </>
        }
      >
        <p>
          Session {SESSION_DUREE_LIBELLE} en présentiel : sensibilisation à l&apos;IA, prompts par métier
          (Excel), puis conception d&apos;assistants IA sur mesure — aligné sur{' '}
          <Link
            href="/formations/ia-au-service-du-batiment"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            L&apos;IA au service du bâtiment
          </Link>
          . La plateforme LMS permet d&apos;approfondir les supports en autonomie après la session.
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Public :</strong> dirigeants, conducteurs de travaux, administratifs, encadrement
              chantier — toute équipe du BTP qui veut monter en compétence sur l&apos;IA.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Durée :</strong> session <strong>{SESSION_DUREE_LIBELLE}</strong> ·{' '}
              <strong>Forfait :</strong> {TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (niveau débutant) ·{' '}
              <strong>Format :</strong> présentiel uniquement ; ressources LMS en prolongement.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Livrables :</strong> supports PDF modules 1 et 2, banque de prompts Excel, supports du
              module 3 (assistants) — fichiers listés dans le dossier public{' '}
              <code className="rounded bg-white px-1 text-xs">formations/pitel-ia-sensibilisation-prompts-assistants</code>.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Outils :</strong> {COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT}
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Convention et accès plateforme : sous réserve de signature. Questions :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Comprendre l’IA générative et ses usages utiles dans le BTP',
            'Exploiter une banque de prompts par métier (Excel)',
            'Concevoir et paramétrer des assistants IA adaptés à vos process',
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
            {TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (niveau débutant) ·{' '}
            <strong>Réf. catalogue :</strong> BTP-05 · <strong>Certification :</strong> Qualiopi —{' '}
            <strong>OPCO Constructys</strong> selon éligibilité.
          </li>
          <li>
            <strong>Évaluation :</strong> quiz et activités sur la plateforme, attestation en fin de parcours
            selon modalités OF.
          </li>
          <li>
            <strong>Support :</strong> questions par email sous 30 jours ouvrés après la fin du parcours pour
            les points pédagogiques.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_SENSIB}
        title="Questions fréquentes"
        subtitle="Plateforme LMS, durée et financement."
      />

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
