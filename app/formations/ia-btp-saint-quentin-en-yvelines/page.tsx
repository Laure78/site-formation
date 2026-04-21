import Link from 'next/link';
import { FooterTelOrMailLink, PublicPhoneCta } from '@/components/PublicPhoneCta';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { Calendar, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
  sitePhoneDisplaySuffix,
} from '@/lib/seo';
import { FAQ_IA_BTP_SAINT_QUENTIN_YVELINES } from '@/lib/faq';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';

const PATH = LINKS.formationSaintQuentinYvelines;

const MAIL_RAPPEL_SQY =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA BTP Saint-Quentin-en-Yvelines')}`;

const HERO_RESUME = [
  'Formation IA BTP en présentiel sur la communauté d’agglomération de Saint-Quentin-en-Yvelines : Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, Maurepas, La Verrière…',
  'Siège OFC à Guyancourt : une formatrice à proximité immédiate, sans frais de déplacement supplémentaires pour les entreprises du 78.',
  `Session ${SESSION_DUREE_LIBELLE} — 100 % pratique sur vos documents : devis, comptes rendus de chantier, appels d'offres.`,
  'Financement possible par OPCO Constructys (plan de développement des compétences) selon éligibilité et dossier.',
  `Plus de ${formatProfessionalsTrainedCount()} professionnels BTP formés · Note ${SOCIAL_PROOF.AVERAGE_RATING} · Organisme certifié Qualiopi.`,
];

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Saint-Quentin-en-Yvelines : ChatGPT BTP',
  description:
    'Formation IA BTP à Saint-Quentin-en-Yvelines (78) : Guyancourt, Montigny, Trappes, Élancourt. ChatGPT BTP, devis, CR chantier. Qualiopi, Constructys. Île-de-France. Laure Olivié, OFC.',
  path: PATH,
  keywords: [
    'formation IA BTP Saint-Quentin-en-Yvelines',
    'formation ChatGPT BTP SQY',
    'formation IA BTP Guyancourt',
    'formation IA Montigny-le-Bretonneux',
    'formation IA BTP Trappes',
    'OPCO Constructys Yvelines',
    'formation intelligence artificielle BTP 78',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP Saint-Quentin-en-Yvelines (78)',
  description:
    "Formation IA BTP sur l'agglomération de Saint-Quentin-en-Yvelines : ChatGPT pour devis, comptes rendus de chantier, appels d'offres. Présentiel 78. Qualiopi, Constructys.",
  path: PATH,
  providerName: SITE_CONFIG.legalName,
  areaServed: [
    'Saint-Quentin-en-Yvelines',
    'Guyancourt',
    'Montigny-le-Bretonneux',
    'Trappes',
    'Élancourt',
    'Maurepas',
    'Yvelines',
    'Île-de-France',
  ],
});

const faqSchema = getFAQSchema(FAQ_IA_BTP_SAINT_QUENTIN_YVELINES);

export default function FormationIABTPSaintQuentinYvelinesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <FormationCourseHero
        refLine="Laure Olivié · OFC Création d'Entreprise · Guyancourt (78280) · Qualiopi · Constructys"
        title={
          <>
            Formation IA BTP Saint-Quentin-en-Yvelines (78) —{' '}
            <span className="text-[var(--accent)]">ChatGPT</span> pour PME et équipes du bâtiment
          </>
        }
        subtitle="Devis, comptes rendus de chantier, appels d'offres — méthode terrain, Île-de-France"
        badges={[
          'Certification Qualiopi',
          'Financement OPCO Constructys selon dossier',
          'Inter FFB · intra entreprise',
        ]}
        summaryItems={HERO_RESUME}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationChantierPlans2026.src}
            alt={PHOTOS.btpFormationChantierPlans2026.alt}
            width={PHOTOS.btpFormationChantierPlans2026.width}
            height={PHOTOS.btpFormationChantierPlans2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href="#zones-sqy"
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Villes couvertes (SQY)
            </a>
            <a
              href={MAIL_RAPPEL_SQY}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
          </>
        }
        footerLinks={
          <>
            <Link href={LINKS.financement} className="font-medium text-[var(--accent)] hover:underline">
              Financement Constructys
            </Link>
            <Link href={LINKS.formations} className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline">
              Catalogue formations
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Formation IA pour les <strong>PME, TPE et équipes du BTP</strong> sur la{' '}
          <strong>communauté d&apos;agglomération de Saint-Quentin-en-Yvelines</strong> (SQY) :{' '}
          <strong>Guyancourt</strong>, <strong>Montigny-le-Bretonneux</strong>, <strong>Trappes</strong>,{' '}
          <strong>Élancourt</strong>, <strong>Maurepas</strong> et communes voisines — sans frais de
          déplacement supplémentaires pour les entreprises des <strong>Yvelines (78)</strong>. Pour une
          vue sur tout le département, voir aussi la page{' '}
          <Link href={LINKS.formationYvelines} className="font-semibold text-[var(--accent)] hover:underline">
            formation IA BTP Yvelines (78)
          </Link>
          .
        </p>
      </FormationCourseHero>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi une page dédiée à Saint-Quentin-en-Yvelines ?
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-slate-600 leading-relaxed">
            <p>
              L&apos;agglomération concentre une forte activité du bâtiment et des travaux publics : entreprises
              générales, second œuvre, réseaux, bureaux d&apos;études, donneurs d&apos;ordres publics et privés.
              Beaucoup de dossiers (devis, CR, marchés) restent encore très manuels alors que l&apos;IA peut
              accélérer la structuration — sous contrôle humain.
            </p>
            <p>
              <strong className="text-slate-900">OFC Création d&apos;Entreprise est installé à Guyancourt</strong>, au
              cœur de SQY : pour une entreprise du secteur, cela veut dire une intervenante disponible pour des
              sessions <strong>intra</strong> dans vos locaux ou sur chantier, avec une logistique simple et des
              créneaux adaptés aux contraintes terrain en Île-de-France.
            </p>
            <p>
              La formation IA BTP que j&apos;anime repose sur des cas réels : vos devis, vos courriers, vos
              pièces de marché — pour repartir avec des prompts et des trames réutilisables, sans remplacer le
              jugement métier.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Atouts pour les entreprises de SQY et du 78
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              {
                titre: 'Proximité du siège OFC (Guyancourt)',
                text: 'Organisation d’une demi-journée ou d’une session intra sans enchaînement de déplacements longs pour l’équipe.',
              },
              {
                titre: 'Pas de frais de déplacement supplémentaires (entreprises du 78)',
                text: 'Déplacements dans la communauté et au besoin sur l’ensemble du département des Yvelines, sans supplément kilométrique facturé aux entreprises du 78.',
              },
              {
                titre: 'Marchés publics et clients privés',
                text: 'Méthodes pour structurer DCE, CCTP et mémoires techniques — sous votre validation — adaptées aux acheteurs locaux et nationaux.',
              },
              {
                titre: 'Réseau FFB et filières proches',
                text: 'Cohérence avec les parcours proposés côté FFB Île-de-France et FFB Grand Paris pour les adhérents.',
              },
            ].map((item) => (
              <li key={item.titre} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <Check size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <h3 className="font-display font-semibold text-slate-900">{item.titre}</h3>
                  <p className="mt-2 text-slate-600">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que couvre la formation IA BTP (modules)
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            La formation est modulaire. Selon votre activité et vos priorités, on travaille sur un ou plusieurs
            axes — toujours sur vos documents réels.
          </p>
          <div className="mt-10 space-y-10">
            {[
              {
                titre: 'Module 1 — Devis et chiffrage avec ChatGPT',
                body: (
                  <>
                    <p>
                      Travail sur vos modèles et grilles : électricité, plomberie, gros œuvre, second œuvre… Des
                      trames de prompts adaptées à votre corps de métier et à vos clients (particuliers,
                      professionnels, collectivités).
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Descriptif de devis structuré à partir d&apos;un brief oral ou écrit</li>
                      <li>Intégration de vos conditions générales et mentions légales</li>
                      <li>Variantes de prix et adaptation du ton</li>
                    </ul>
                  </>
                ),
              },
              {
                titre: 'Module 2 — Comptes rendus de chantier automatisés',
                body: (
                  <>
                    <p>
                      Notes vocales ou écrites vers un compte rendu structuré — puis relecture avant envoi aux
                      maîtres d&apos;ouvrage ou partenaires.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Modèle de CR adapté à votre type de chantier</li>
                      <li>Tableaux d&apos;actions (responsable, délai)</li>
                    </ul>
                  </>
                ),
              },
              {
                titre: "Module 3 — Réponses aux appels d'offres",
                body: (
                  <>
                    <p>
                      Structurer l&apos;analyse d&apos;un DCE et préparer le mémoire technique — sous votre
                      validation. Utile pour les entreprises de SQY qui répondent à des marchés publics ou privés.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Lecture structurée d&apos;un CCTP et repérage des risques</li>
                      <li>
                        Complément possible :{' '}
                        <Link
                          href="/blog/analyser-cctp-ia-methode-complete-20-minutes"
                          className="text-[var(--accent)] font-medium hover:underline"
                        >
                          analyser un CCTP avec l&apos;IA
                        </Link>
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                titre: 'Module 4 — Emails, administratif et relation client',
                body: (
                  <>
                    <p>Relances, courriers, réponses aux réclamations : modèles réutilisables pour le BTP.</p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Bibliothèque de modèles d&apos;emails</li>
                      <li>Relances devis et factures</li>
                    </ul>
                  </>
                ),
              },
            ].map((m) => (
              <div key={m.titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold text-slate-900">{m.titre}</h3>
                <div className="mt-4 max-w-3xl text-slate-600 leading-relaxed">{m.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Financement (Constructys) en Île-de-France
          </h2>
          <div className="mt-6 max-w-3xl space-y-6 text-slate-600">
            <p>
              La formation est certifiée Qualiopi et peut être financée par OPCO Constructys dans le cadre du plan
              de développement des compétences, selon les règles applicables à votre entreprise (plafonds
              pédagogiques, dossier sur eGestion, délais — voir le{' '}
              <Link href={LINKS.financement} className="text-[var(--accent)] font-medium hover:underline">
                guide financement Constructys formation IA BTP
              </Link>
              ).
            </p>
            <p>
              Pour les chefs d&apos;entreprise non salariés, des dispositifs complémentaires peuvent
              exister (ex. FAFCEA) : renseignez-vous auprès de votre Chambre des Métiers et de l&apos;Artisanat
              des Yvelines.
            </p>
          </div>
        </div>
      </section>

      <section id="zones-sqy" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Villes et communes couvertes (SQY)
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Intervention en présentiel sur la communauté d&apos;agglomération et au besoin sur l&apos;ensemble du
            78 — sans frais de déplacement supplémentaires pour les entreprises du département.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                titre: 'Pôle principal',
                villes:
                  'Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, La Verrière, Maurepas, Coignières, Magny-les-Hameaux',
              },
              {
                titre: 'Périmètre élargi Yvelines',
                villes:
                  'Versailles, Vélizy-Villacoublay, Saint-Germain-en-Laye, Rambouillet, Mantes-la-Jolie, Poissy, Plaisir, Les Mureaux…',
              },
            ].map((z) => (
              <div key={z.titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display font-semibold text-slate-900">{z.titre}</h3>
                <p className="mt-3 text-sm text-slate-600">{z.villes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Public concerné sur SQY et en Île-de-France
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              {
                titre: 'Dirigeants de PME et entreprises du bâtiment',
                text: 'Gros œuvre, second œuvre, réseaux, finitions — gagner du temps sur devis, CR et administratif.',
              },
              {
                titre: 'Conducteurs de travaux et chefs de chantier',
                text: 'Coordination, comptes rendus, emails : méthodes applicables rapidement.',
              },
              {
                titre: "Chargés d'affaires et bureaux d'études",
                text: 'Consultations et mémoires techniques : structuration avec l’IA sous contrôle.',
              },
              {
                titre: 'Équipes administratives',
                text: 'Devis, facturation, relances : modèles réutilisables.',
              },
            ].map((item) => (
              <li key={item.titre} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0">
                <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <h3 className="font-semibold text-slate-900">{item.titre}</h3>
                  <p className="mt-1 text-slate-600">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_IA_BTP_SAINT_QUENTIN_YVELINES}
            title="Questions fréquentes — Formation IA BTP Saint-Quentin-en-Yvelines"
          />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Organiser une session sur Saint-Quentin-en-Yvelines
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Option 1 — Appel découverte (30 min, gratuit)
              </h3>
              <p className="mt-3 text-slate-700">
                Échange sur votre activité, vos besoins et votre éligibilité Constructys. Devis et programme
                personnalisés sous 24 à 48 h en général.
              </p>
              <RdvLink className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                Prendre rendez-vous
              </RdvLink>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Option 2 — Session inter-entreprises
              </h3>
              <p className="mt-3 text-slate-600">
                Pour de petits groupes, les sessions organisées avec la FFB Île-de-France peuvent convenir.
                Contactez-moi pour les prochaines dates.
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Session inter FFB — IA BTP SQY')}`}
                className="mt-6 inline-flex font-medium text-[var(--accent)] hover:underline"
              >
                Écrire pour les dates inter
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-xl font-bold text-slate-900">
            OFC Création d&apos;Entreprise — Saint-Quentin-en-Yvelines et Île-de-France
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Organisme certifié Qualiopi, basé à Guyancourt (78280), spécialisé dans l&apos;intégration de
            l&apos;intelligence artificielle dans les entreprises du bâtiment et des travaux publics.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <strong className="text-slate-800">Références :</strong> FFB Grand Paris · FFB Île-de-France
            (78/91/95) · FFB Île-de-France Est · CSFE · CNAM Entreprise · Lefebvre Dalloz
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Plus de {formatProfessionalsTrainedCount()} professionnels BTP formés · Note {SOCIAL_PROOF.AVERAGE_RATING} ·
            Qualiopi · Constructys / FSE+
          </p>
          <p className="mt-6 text-sm text-slate-500">
            SIRET {SITE_CONFIG.siret} · NDA 11788515078 · {SITE_CONFIG.email}{sitePhoneDisplaySuffix()} ·{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--accent)] hover:underline">
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: LINKS.formationYvelines, label: 'Formation IA BTP Yvelines (78)' },
              { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP Île-de-France' },
              { href: LINKS.formationParis, label: 'Formation IA BTP Paris' },
              { href: LINKS.formations, label: 'Catalogue formations' },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </section>

      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Formation IA BTP à Saint-Quentin-en-Yvelines : prochaine étape
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Réservez un échange gratuit de 30 minutes ou contactez-nous pour un devis et un programme adapté à
            votre entreprise du 78.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </RdvLink>
            <PublicPhoneCta className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
