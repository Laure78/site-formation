import Link from 'next/link';
import { FooterTelOrMailLink, PublicPhoneCta } from '@/components/PublicPhoneCta';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { Calendar } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { FormationCourseScriptJsonLd } from '@/components/seo/FormationCourseScriptJsonLd';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { getDedicatedFormationCoursePageJsonLd } from '@/lib/schema-course-formations';
import { FAQ_IA_BTP_PARIS } from '@/lib/faq';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE, TARIF_FORFAIT_DEBUTANT_HT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
const MAIL_RAPPEL_PARIS =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA appliquée au bâtiment Paris')}`;

const HERO_RESUME_PARIS = [
  'Formation IA pour le BTP Paris et Île-de-France — devis, emails, appels d\'offres, administratif.',
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT/session (débutant) — Qualiopi.`,
  'Présentiel — Paris (75) et 8 départements : inter ou intra selon convention.',
  'Financement OPCO Constructys selon éligibilité.',
];

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

export const metadata = createPageMetadata({
  title: 'Formation IA pour les pro du BTP Paris — ChatGPT en 4h',
  description:
    'Formation IA appliquée au bâtiment à Paris en 4h. ChatGPT pour devis, AO, chantier. Qualiopi. Financement possible selon éligibilité. RDV visio gratuit.',
  path: '/formations/ia-btp-paris',
  appendAuthorSuffix: false,
  keywords: [
    'formation IA Paris',
    'formation BTP Paris',
    'formation IA Île-de-France',
    'formation ChatGPT BTP 75',
    'formation IA 92 93 94',
    'OPCO Constructys Paris',
    'formation IA bâtiment Paris',
  ],
});

const ZONES = [
  {
    num: '75',
    nom: 'Paris',
    contenu: 'Tous arrondissements • Sessions en présentiel • Accès facilité transports en commun',
  },
  {
    num: '92',
    nom: 'Hauts-de-Seine',
    contenu: 'Nanterre, Boulogne-Billancourt, Courbevoie, Levallois-Perret, Issy-les-Moulineaux, Neuilly-sur-Seine, Rueil-Malmaison...',
  },
  {
    num: '93',
    nom: 'Seine-Saint-Denis',
    contenu: 'Bobigny, Saint-Denis, Montreuil, Aubervilliers, Pantin, Noisy-le-Grand, Aulnay-sous-Bois, Saint-Ouen...',
  },
  {
    num: '94',
    nom: 'Val-de-Marne',
    contenu: 'Créteil, Vitry-sur-Seine, Champigny-sur-Marne, Saint-Maur-des-Fossés, Ivry-sur-Seine, Fontenay-sous-Bois...',
  },
  {
    num: '77',
    nom: 'Seine-et-Marne',
    contenu: 'Meaux, Chelles, Melun, Pontault-Combault, Savigny-le-Temple, Torcy, Champs-sur-Marne, Combs-la-Ville...',
  },
  {
    num: '78',
    nom: 'Yvelines',
    contenu: 'Versailles, Sartrouville, Mantes-la-Jolie, Saint-Germain-en-Laye, Poissy, Conflans-Sainte-Honorine, Montigny-le-Bretonneux...',
  },
  {
    num: '91',
    nom: 'Essonne',
    contenu: 'Évry, Corbeil-Essonnes, Massy, Sainte-Geneviève-des-Bois, Viry-Châtillon, Palaiseau, Athis-Mons...',
  },
  {
    num: '95',
    nom: "Val-d'Oise",
    contenu: 'Argenteuil, Sarcelles, Cergy, Garges-lès-Gonesse, Franconville, Goussainville, Pontoise, Ermont...',
  },
];

const formationCourseGraph = getDedicatedFormationCoursePageJsonLd('/formations/ia-btp-paris');

const faqSchema = getFAQSchema(FAQ_IA_BTP_PARIS);

export default function FormationIABTPParisPage() {
  return (
    <div>
      <FormationCourseScriptJsonLd schema={formationCourseGraph} />
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <FormationCourseHero
        catalogueRef="NIV-01"
        refLine="Formation Paris & Île-de-France · Financement OPCO"
        title={
          <>
            Formation IA bâtiment à <span className="text-[var(--accent)]">Paris</span> et Île-de-France
          </>
        }
        subtitle="Devis, emails, administratif — ChatGPT pour le BTP"
        badges={[
          'OPCO / plan de développement des compétences',
          'Accessible débutant',
          'Cas terrain',
        ]}
        summaryItems={HERO_RESUME_PARIS}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationSalleIntervention2026.src}
            alt={PHOTOS.btpFormationSalleIntervention2026.alt}
            width={PHOTOS.btpFormationSalleIntervention2026.width}
            height={PHOTOS.btpFormationSalleIntervention2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href="#zones"
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Zones d&apos;intervention
            </a>
            <a
              href={MAIL_RAPPEL_PARIS}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
          </>
        }
        footerLinks={
          <>
            <a href="#zones" className="font-medium text-[var(--accent)] hover:underline">
              Voir les zones d&apos;intervention
            </a>
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche formation catalogue (NIV-01)
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Formation IA bâtiment pour les <strong>TPE, PME et équipes du BTP</strong> en Île-de-France.{' '}
          <strong>Devis, emails, relances clients</strong> : intervention à <strong>Paris (75)</strong> et
          dans les <strong>8 départements</strong> — approche concrète, orientée terrain.
        </p>
      </FormationCourseHero>

      {/* Pourquoi cette formation est animée par une experte reconnue — EEAT */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi cette formation est animée par une experte reconnue
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Formatrice spécialisée dans l&apos;intégration de l&apos;IA générative dans les entreprises du BTP.
            Intervenante et créatrice de contenus pédagogiques sur l&apos;IA.
            <strong className="text-slate-900"> Formatrice LinkedIn Learning.</strong>
            {' '}Cette expérience garantit une approche pédagogique concrète adaptée aux entreprises du bâtiment.
          </p>
          <Link
            href="/a-propos"
            className="mt-6 inline-flex font-medium text-[var(--accent)] hover:underline"
          >
            Découvrir le profil de Laure Olivié →
          </Link>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section id="zones" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Nos zones d&apos;intervention en Île-de-France
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Formations disponibles à Paris et dans l&apos;ensemble des départements
            d&apos;Île-de-France. Sessions en présentiel dans vos locaux ou en salle.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ZONES.map((zone) => (
              <div
                key={zone.num}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
                    {zone.num}
                  </span>
                  <h3 className="font-display font-semibold text-slate-900">
                    {zone.nom}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-600">{zone.contenu}</p>
              </div>
            ))}
          </div>

          {/* Votre ville n'apparaît pas ? */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Votre ville n&apos;apparaît pas dans la liste ?
            </h3>
            <p className="mt-4 text-slate-600">
              Nous intervenons dans toute l&apos;Île-de-France, y compris dans les
              villes non mentionnées ci-dessus. Contactez-nous pour vérifier la
              disponibilité dans votre secteur.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                <Calendar size={20} strokeWidth={1.5} />
                Prendre rendez-vous
              </RdvLink>
              <PublicPhoneCta className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_IA_BTP_PARIS}
            title="Questions fréquentes — Formation IA pour le BTP Paris"
          />
        </div>
      </section>

      {/* Aller plus loin */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Catalogue des formations IA pour les pro du BTP' },
              { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
              { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: buildSiteCalendlyCtaUrl('formations-ia-btp-paris-footer-rdv'), label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à automatiser votre BTP avec l&apos;IA ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Réservez votre formation IA à Paris ou en Île-de-France. Devis
            personnalisé sous 24h. Financement OPCO Constructys possible selon éligibilité.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Réserver ma formation
            </RdvLink>
            <PublicPhoneCta className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
