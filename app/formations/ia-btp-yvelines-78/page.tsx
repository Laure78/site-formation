import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { Phone, Calendar, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_IA_BTP_YVELINES } from '@/lib/faq';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';

const MAIL_RAPPEL_YVELINES =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA BTP Yvelines 78')}`;

const HERO_RESUME = [
  'Formation IA BTP en présentiel dans tout le département 78 (Versailles, Vélizy, Mantes-la-Jolie, Rambouillet, Saint-Quentin-en-Yvelines, Poissy…).',
  'Siège à Guyancourt : pas de frais de déplacement supplémentaires pour les entreprises des Yvelines.',
  `Session ${SESSION_DUREE_LIBELLE} — 100 % pratique sur vos documents : devis, comptes rendus de chantier, appels d'offres.`,
  'Financement possible par OPCO Constructys (plan de développement des compétences) selon éligibilité et dossier.',
  'Plus de 1 592 professionnels BTP formés · Note 4,85/5 · Organisme certifié Qualiopi.',
];

export const metadata = createPageMetadata({
  title:
    'Formation IA BTP Versailles, Yvelines (78) : ChatGPT pour artisans et PME du bâtiment',
  description:
    "Formation IA BTP dans les Yvelines (78) : Versailles, Saint-Quentin-en-Yvelines, Mantes, Rambouillet. Présentiel sans frais de déplacement pour le 78. Devis, CR chantier, appels d'offres. Qualiopi, Constructys. Laure Olivié, Guyancourt.",
  path: '/formations/ia-btp-yvelines-78',
  keywords: [
    'formation IA BTP Yvelines',
    'formation IA Versailles',
    'formation ChatGPT BTP 78',
    'formation IA BTP Saint-Quentin-en-Yvelines',
    'formation IA bâtiment Mantes',
    'OPCO Constructys Yvelines',
    'formation IA Guyancourt',
    'formation intelligence artificielle BTP 78',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP dans les Yvelines (78)',
  description:
    "Formation IA BTP Yvelines et Versailles : ChatGPT pour devis, comptes rendus de chantier, appels d'offres. Présentiel dans le 78. Qualiopi, Constructys.",
  path: '/formations/ia-btp-yvelines-78',
  providerName: SITE_CONFIG.legalName,
  areaServed: [
    'Yvelines',
    'Versailles',
    'Guyancourt',
    'Saint-Quentin-en-Yvelines',
    'Mantes-la-Jolie',
    'Rambouillet',
    'Poissy',
    'Vélizy-Villacoublay',
    'Île-de-France',
  ],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA BTP Yvelines (78)', path: '/formations/ia-btp-yvelines-78' },
]);

const faqSchema = getFAQSchema(FAQ_IA_BTP_YVELINES);

export default function FormationIABTPYvelinesPage() {
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
        refLine="Laure Olivié · OFC Création d'Entreprise · Guyancourt (78280) · Qualiopi · Constructys"
        title={
          <>
            Formation IA BTP Versailles, Yvelines et 78 —{' '}
            <span className="text-[var(--accent)]">ChatGPT</span> pour artisans et PME du bâtiment
          </>
        }
        subtitle="Devis, comptes rendus de chantier, appels d'offres — méthode terrain"
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
              href="#zones"
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Zones dans le 78
            </a>
            <a
              href={MAIL_RAPPEL_YVELINES}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
          </>
        }
        footerLinks={
          <>
            <Link href="/financement-constructys-formation-ia-btp" className="font-medium text-[var(--accent)] hover:underline">
              Financement Constructys
            </Link>
            <Link href="/formations" className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline">
              Catalogue formations
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
          Formation IA pour les <strong>TPE, PME et équipes du BTP</strong> dans les{' '}
          <strong>Yvelines (78)</strong> : intervention à <strong>Versailles</strong>,{' '}
          <strong>Saint-Quentin-en-Yvelines</strong>, <strong>Mantes-la-Jolie</strong>,{' '}
          <strong>Rambouillet</strong> et partout dans le département — sans frais de déplacement
          supplémentaires pour les entreprises du 78.
        </p>
      </FormationCourseHero>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation IA BTP dans les Yvelines : pourquoi c&apos;est le bon moment
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-slate-600 leading-relaxed">
            <p>
              Le département des Yvelines concentre une forte densité d&apos;entreprises du bâtiment et des
              travaux publics : artisans, PME de second œuvre, entreprises générales, bureaux
              d&apos;études. La filière construction y compte de nombreux emplois, portée par des projets
              autour de Saint-Quentin-en-Yvelines, Versailles et le Grand Paris Express.
            </p>
            <p>
              Pourtant, une part limitée des entreprises BTP utilise encore l&apos;intelligence
              artificielle au quotidien — même pour des tâches répétitives comme la rédaction de devis,
              les comptes rendus de chantier ou les réponses aux appels d&apos;offres.
            </p>
            <p>
              La formation IA BTP que j&apos;anime dans les Yvelines part d&apos;un constat simple : les
              entreprises du bâtiment ne manquent pas de compétences métier. Elles manquent de temps. Et
              l&apos;IA — bien utilisée, avec les bons prompts et les bonnes méthodes — peut redonner du
              temps sur l&apos;administratif, sans remplacer l&apos;expertise terrain.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi une formatrice basée dans les Yvelines ?
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            <strong className="text-slate-900">OFC Création d&apos;Entreprise est basé à Guyancourt (78280)</strong>,
            au sein de la communauté d&apos;agglomération de Saint-Quentin-en-Yvelines. Pour les
            entreprises du 78, cela se traduit concrètement par :
          </p>
          <ul className="mt-8 space-y-4">
            {[
              {
                titre: 'Pas de frais de déplacement supplémentaires',
                text: "Je me déplace dans vos locaux dans tout le département — Versailles, Vélizy-Villacoublay, Élancourt, Les Mureaux, Mantes-la-Jolie, Rambouillet, etc. — sans facturer de supplément kilométrique pour les entreprises du 78.",
              },
              {
                titre: 'Disponibilité et créneaux adaptés',
                text: "Sans contrainte de longue distance, il est plus simple d'organiser une demi-journée ou un créneau matinal selon vos chantiers.",
              },
              {
                titre: 'Connaissance du tissu local',
                text: "Réseau des entreprises BTP des Yvelines, donneurs d'ordres (collectivités, bailleurs sociaux, promoteurs), marchés publics et usages IA utiles pour y répondre.",
              },
              {
                titre: 'Partenariats FFB',
                text: "Interventions avec la FFB Île-de-France (dont les Yvelines, le 91 et le 95) et la FFB Grand Paris — parcours coordonnés pour les adhérents.",
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
            La formation est modulaire. Selon votre activité et vos priorités, on travaille sur un ou
            plusieurs axes — toujours sur vos documents réels.
          </p>
          <div className="mt-10 space-y-10">
            {[
              {
                titre: 'Module 1 — Devis et chiffrage avec ChatGPT',
                body: (
                  <>
                    <p>
                      Un devis bâtiment complet peut prendre plusieurs heures à rédiger manuellement. En
                      formation, on travaille sur vos modèles : électricité, plomberie, carrelage, peinture,
                      maçonnerie, couverture… Vous repartez avec des trames de prompts adaptées à votre
                      corps de métier.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Descriptif de devis structuré à partir d&apos;un brief oral ou écrit</li>
                      <li>Intégration de vos conditions générales et mentions légales</li>
                      <li>Variantes de prix et adaptation du ton (particulier, pro, collectivité)</li>
                    </ul>
                  </>
                ),
              },
              {
                titre: 'Module 2 — Comptes rendus de chantier automatisés',
                body: (
                  <>
                    <p>
                      Avec les bons prompts, vos notes vocales ou écrites peuvent être structurées en
                      compte rendu professionnel — puis relues avant envoi.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Notes vocales ou écrites vers CR structuré</li>
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
                      Les entreprises du 78 répondent à des marchés publics (collectivités, bailleurs,
                      opérateurs sectoriels) et à des marchés privés. L&apos;IA aide à structurer
                      l&apos;analyse du DCE et la préparation du mémoire — sous votre validation.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
                      <li>Structurer la lecture d&apos;un CCTP et repérer les risques</li>
                      <li>Extraire les exigences techniques utiles au chiffrage</li>
                      <li>
                        Cohérence entre pièces du dossier — voir aussi{' '}
                        <Link href="/blog/analyser-cctp-ia-methode-complete-20-minutes" className="text-[var(--accent)] font-medium hover:underline">
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
                      <li>Ton adapté à l&apos;interlocuteur</li>
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
            Financement dans les Yvelines
          </h2>
          <div className="mt-6 max-w-3xl space-y-6 text-slate-600">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Constructys — plan de développement des compétences
              </h3>
              <p className="mt-2">
                La formation est certifiée Qualiopi et peut être financée par OPCO Constructys dans le cadre
                du plan de développement des compétences, selon les règles applicables à votre entreprise.
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2">
                <li>
                  Coût pédagogique : plafond couramment cité de 24 € HT par heure et par stagiaire (à
                  confirmer au moment du dossier). Plafond journalier de groupe pour l&apos;intra souvent
                  cité à 840 € HT/jour — vérifier les règles en vigueur.{' '}
                  <Link href="/financement-constructys-formation-ia-btp" className="text-[var(--accent)] font-medium hover:underline">
                    Guide financement
                  </Link>
                  .
                </li>
                <li>
                  Prise en charge des salaires en formation : barèmes spécifiques pour les très petites
                  structures (par exemple 15 € HT/h/stagiaire dans les cas prévus) — voir avec votre
                  conseiller Constructys.
                </li>
                <li>
                  Dépôt du dossier sur eGestion (services.constructys.fr), en général au{' '}
                  <strong>moins 15 jours</strong> avant le début de l&apos;action — délai à confirmer sur la
                  documentation officielle.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                FAFCEA — artisans non salariés
              </h3>
              <p>
                Les artisans relevant de la FAFCEA peuvent mobiliser des dispositifs de formation des
                chefs d&apos;entreprise : renseignez-vous auprès de votre Chambre des Métiers et de
                l&apos;Artisanat des Yvelines.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Inter-entreprises ou intra-entreprise ?
              </h3>
              <p>
                <strong>Intra</strong> : intervention dans vos locaux, sur vos documents — adapté aux
                équipes. <strong>Inter</strong> : sessions avec la FFB Île-de-France pour les petits
                groupes — me contacter pour les dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="zones" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Zones d&apos;intervention dans les Yvelines (78)
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            J&apos;interviens dans tout le département, sans frais de déplacement supplémentaires pour les
            entreprises du 78.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titre: 'Versailles / Grand Versailles',
                villes:
                  'Versailles, Le Chesnay-Rocquencourt, Viroflay, Vélizy-Villacoublay, Buc, Jouy-en-Josas, Bièvres',
              },
              {
                titre: 'Saint-Quentin-en-Yvelines',
                villes:
                  'Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, La Verrière, Maurepas, Coignières, Magny-les-Hameaux',
              },
              {
                titre: 'Versailles Sud / Rambouillet',
                villes: 'Rambouillet, Chevreuse, Les Essarts-le-Roi, Lévis-Saint-Nom, Montfort-l&apos;Amaury',
              },
              {
                titre: 'Nord-Ouest / Mantes',
                villes:
                  'Mantes-la-Jolie, Mantes-la-Ville, Les Mureaux, Poissy, Conflans-Sainte-Honorine, Carrières-sous-Poissy',
              },
              {
                titre: 'Centre / Plaisir',
                villes:
                  'Plaisir, Villepreux, Les Clayes-sous-Bois, Fontenay-le-Fleury, Bois-d&apos;Arcy',
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
            À qui s&apos;adresse cette formation dans les Yvelines ?
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              {
                titre: 'Dirigeants de PME et artisans BTP',
                text: "Gros œuvre, second œuvre, réseaux, finitions — gagner du temps sur devis, CR, administratif et dossiers.",
              },
              {
                titre: 'Conducteurs de travaux et chefs de chantier',
                text: 'Coordination multi-chantiers, comptes rendus, emails : méthodes applicables vite.',
              },
              {
                titre: "Chargés d'affaires et bureaux d'études",
                text: "Réponses aux consultations et mémoires techniques : structuration avec l'IA sous contrôle.",
              },
              {
                titre: 'Équipes administratives',
                text: 'Devis, facturation, relances : modèles réutilisables.',
              },
              {
                titre: 'Fédérations et groupements',
                text: 'Sessions collectives pour adhérents — possibilité de partenariat (FFB, CAPEB, etc.).',
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
            items={FAQ_IA_BTP_YVELINES}
            title="Questions fréquentes — Formation IA BTP dans les Yvelines"
          />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Organiser une formation IA BTP dans les Yvelines
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Option 1 — Appel découverte (30 min, gratuit)
              </h3>
              <p className="mt-3 text-slate-700">
                Échange sur votre activité, vos besoins et votre éligibilité Constructys. Devis et
                programme personnalisés sous 24 à 48 h en général.
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
                Pour 1 à 2 personnes, les sessions organisées avec la FFB Île-de-France peuvent être la
                solution la plus adaptée. Contactez-moi pour les prochaines dates.
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Session inter FFB — IA BTP Yvelines')}`}
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
            OFC Création d&apos;Entreprise — Yvelines et Île-de-France
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Organisme certifié Qualiopi, basé à Guyancourt (78280), spécialisé dans l&apos;intégration de
            l&apos;intelligence artificielle dans les entreprises du bâtiment et des travaux publics.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <strong className="text-slate-800">Références :</strong> FFB Grand Paris · FFB Île-de-France
            (78/91/95) · FFB Île-de-France Est · CSFE · CNAM Entreprise · Lefebvre Dalloz · CAPEB
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Plus de 1 592 professionnels BTP formés · Note 4,85/5 · Qualiopi · Constructys / FSE+
          </p>
          <p className="mt-6 text-sm text-slate-500">
            SIRET {SITE_CONFIG.siret} · NDA 11788515078 · {SITE_CONFIG.phoneDisplay} ·{' '}
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
              { href: '/formations/ia-btp-ile-de-france', label: 'Formation IA BTP Île-de-France' },
              { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
              { href: '/formations', label: 'Catalogue formations' },
              { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
              { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </section>

      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Formation IA BTP dans les Yvelines : prochaine étape
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Réservez un échange gratuit de 30 minutes ou contactez-nous pour un devis et un programme
            adapté à votre entreprise du 78.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </RdvLink>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              Appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
