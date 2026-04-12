import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, siteHasPublicPhone, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { InlinePublicPhoneLink, PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-peintre-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Peintre Bâtiment Île-de-France — Laure Olivié',
  description:
    'Formation IA ChatGPT pour peintres. Automatisez devis peinture, métrage surface, fiches de chantier. Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA peintre BTP',
    'ChatGPT devis peinture',
    'IA métrage murs plafonds',
    'fiche chantier peinture IA',
    'formation IA Île-de-France BTP',
    'peintre en bâtiment assistant IA',
    'OPCO Constructys peintre',
    'Qualiopi peinture',
  ],
  openGraphType: 'article',
});

const PROMPT_BAREME = `Tu es expert peintre en bâtiment. Voici mon barème indicatif (à compléter avec mes achats et ma grille tarifaire réels) :

PEINTURES & PRODUITS (au litre ou au pot selon ce que je précise) :
- Acrylique mur / plafond standard : [X €/L]
- Acrylique pièces humides / lessivables : [X €/L]
- Sous-couche / apprêt : [X €/L]
- Finitions boiseries (si applicable) : [X €]

MAIN-D’ŒUVRE :
- Préparation (ponçage, rebouchage léger) : [X €/h]
- Application peinture : [X €/h]
- Rendement indicatif : à ajuster selon support et nombre de couches

FRAIS :
- Déplacement : [X €]
- Matériel de protection (bâches, rubans…) : forfait ou % selon [ma règle]

Quand je décris le chantier (surfaces, couches, pièces), génère un brouillon de devis structuré. Je valide les quantités, les temps de séchage et les montants avant envoi.`;

const PROMPT_FICHE_CHANTIER = `Quand je te donne les informations d’un chantier peinture, génère une fiche chantier structurée (texte) :

1. Localisation et accès (si je les fournis)
2. Surfaces (murs, plafonds, boiseries) — hypothèses claires
3. Produits et nombre de couches prévus
4. Préparation support (niveau selon mon observation)
5. Planning indicatif (durées, séchage — rappel : à ajuster selon conditions réelles)
6. Effectif / organisation si je l’indique
7. Points de vigilance (humidité, température, ventilation)
8. Prévention des risques (EPI, circulation) selon mes pratiques

Je reste responsable de la conformité produits et sécurité sur site.`;

const PROMPT_TROIS_VARIANTES = `Je dois proposer 3 options pour un même chantier (ex. salon [X] m², [Y] couches).

Option 1 : gamme économique
Option 2 : gamme durable / teinte personnalisée
Option 3 : gamme adaptée pièces humides ou forte usure

Génère 3 brouillons de devis comparatifs : écarts de prix indicatifs, avantages/inconvénients. Les montants reprennent mon barème si je l’ai fourni.`;

const PROMPT_FAQ_CLIENT = `Mes questions clients les plus fréquentes. Rédige une réponse courte (50–80 mots), professionnelle, sans prix précis si je ne les ai pas donnés :

1. Tarif au m² pour peinture ?
2. Temps pour traiter environ X m² ?
3. Préparation des murs incluse ?
4. Peinture pour cuisine / salle de bain ?
5. Plafonds inclus ?
6. Protection des meubles et sols ?
7. Reprises menuiseries ?
8. Délai pour un devis ?`;

const PROMPT_RELEVE = `Après une visite chantier, je te transmets des notes brutes (cotes, état des surfaces, pièces).
Tu génères un brief structuré : surfaces estimées, préparation probable, heures indicatives, points à clarifier avant signature.
Je reste seul responsable des mesures et du choix des produits (fiches techniques fabricant, compatibilité support).`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment m’aider à chiffrer un devis peinture ?',
    a: "L'IA peut structurer un brouillon (surfaces, lignes, temps) à partir de votre barème et de votre description. Vous validez rendements, surfaces et prix : le devis signé engage votre entreprise.",
  },
  {
    q: 'Et les chantiers atypiques (murs très dégradés, hauteur sous plafond) ?',
    a: "Vous indiquez les surcoûts ou heures supplémentaires dans le prompt : l'IA peut les intégrer au texte du devis. L’estimation du travail de préparation reste votre expertise.",
  },
  {
    q: 'Comment financer la formation ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
  {
    q: 'Mes clients verront-ils que j’utilise ChatGPT ?',
    a: "Non si vous reprenez le texte dans votre modèle (logo, mentions légales). L'IA est un outil de brouillon : le document final doit refléter votre entreprise.",
  },
  {
    q: 'Comment protéger la confidentialité de mes tarifs ?',
    a: "Limitez les données sensibles dans les outils non maîtrisés ; préférez des comptes professionnels ou entreprise quand c’est possible, et des barèmes arrondis ou anonymisés dans les prompts si besoin.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis peinture et métrage chronophages' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux peintres' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des peintres sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaPeintreBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA peintre BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour peintres en bâtiment —{' '}
          <span className="text-[var(--accent)]">gagnez environ 3 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez <strong>devis peinture</strong>, <strong>métrages</strong> et <strong>fiches de chantier</strong> avec
          ChatGPT — <strong>Île-de-France</strong>. Formation <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, variantes et comptes rendus à partir de vos barèmes ; elle ne remplace pas la visite
            ni le jugement sur l’état des supports, les temps de séchage réels ni la fiche produit du fabricant.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[var(--accent)] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : devis peinture et métrage mangent votre temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes peintre en Île-de-France. Chaque semaine, une partie du temps part sur l’étude de prix et la rédaction
            plutôt que sur les supports.
          </p>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Devis détaillés</strong> — surfaces, types de finition, préparation, produits, déplacement : tout doit
              être clair pour le client.
            </li>
            <li>
              <strong>Métrages</strong> — multi-pièces, surfaces murs et plafonds, réservations : le calcul est répétitif.
            </li>
            <li>
              <strong>Variantes</strong> — comparaison de gammes ou de finitions : plusieurs brouillons à produire.
            </li>
            <li>
              <strong>Fiches d’intervention</strong> — pour chaque chantier : synthèse utile à l’équipe (surfaces, couches,
              vigilance).
            </li>
            <li>
              <strong>Questions récurrentes</strong> — prix au m², délais, préparation, pièces humides : les mêmes réponses à
              reformuler.
            </li>
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Conséquence :</strong> moins de temps sur la peinture et plus sur le bureau ou le téléphone ; des devis
            qui traînent peuvent faire partir le client vers un concurrent plus réactif.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux peintres
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’IA ne remplace pas le geste ni le jugement sur le support — elle peut accélérer la{' '}
            <strong>rédaction</strong> et la <strong>mise en forme</strong> : devis, fiches, variantes, réponses types.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Brouillon de devis</strong> — vous décrivez les pièces, surfaces et produits : structure de devis
                fournitures + MO — à valider avant envoi.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Fiche de chantier</strong> — compte rendu structuré (surfaces, couches, préparation, sécurité) à
                partir de vos notes.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Variantes comparées</strong> — une requête pour plusieurs gammes avec écarts expliqués.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Réponses types</strong> — base de textes courts pour les questions fréquentes, à personnaliser.
              </span>
            </li>
          </ul>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — adaptation de ChatGPT au métier peintre (devis, métrages, fiches), financement Constructys.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 5 étapes avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : codifier votre barème peinture
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BAREME}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : fiche de chantier
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE_CHANTIER}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : trois variantes prix / usage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TROIS_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : réponses aux questions fréquentes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FAQ_CLIENT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : relevé de visite → brief
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RELEVE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — variables selon le volume de devis et le temps de relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Avant IA</th>
                  <th className="p-3 font-semibold text-slate-900">Après IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain indicatif</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis peinture</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche de chantier</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">3 variantes</td>
                  <td className="p-3">~45–60 min</td>
                  <td className="p-3">~10 min</td>
                  <td className="p-3">Très fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Réponse type client</td>
                  <td className="p-3">~5–10 min</td>
                  <td className="p-3">~1 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse hebdomadaire</td>
                  <td className="p-3">Plusieurs h</td>
                  <td className="p-3">Réduit</td>
                  <td className="p-3">Souvent ~3 h / sem. (variable)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain d’heures ou de chiffre d’affaires n’est garanti.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis me prenaient le soir et le week-end. Avec un brouillon ChatGPT que je corrige, j’envoie plus vite — les
              clients ont une réponse structurée sans que je retape tout à la main. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Peintre en bâtiment, Île-de-France (témoignage de formation)
            </footer>
          </blockquote>

          <p className="mt-8 text-slate-600 leading-relaxed">
            <a href="#rdv" className="text-[var(--accent)] font-medium underline hover:no-underline">
              Réservez une visio découverte gratuite
            </a>{' '}
            pour voir des cas types adaptés à votre activité.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des peintres sur l’IA
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Laure Olivié</strong> est formatrice IA et ChatGPT spécialisée <strong>BTP</strong>. Elle dirige{' '}
            <strong>OFC Création d’Entreprise</strong>, certifié <strong>Qualiopi</strong>, avec financements possibles{' '}
            <strong>Constructys</strong> et <strong>FSE+</strong> selon règles en vigueur.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’organisme a formé plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment.{' '}
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> 4,85/5.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les parcours restent centrés sur la <strong>pratique</strong> : devis, fiches, variantes — avec relecture
            systématique des quantités et des prix par le professionnel.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Peintre en Île-de-France : voir comment structurer devis et fiches de chantier plus vite — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Démonstration : brouillon de devis peinture à partir de votre barème</li>
            <li>Les usages qui libèrent le plus de temps au quotidien</li>
            <li>Financement Constructys et formats 1 ou 2 jours (inter / intra)</li>
          </ul>
          <p className="mt-6 text-blue-100 text-sm">
            Petite équipe :{' '}
            <InlinePublicPhoneLink className="underline hover:text-white" />
            {siteHasPublicPhone() ? ' · ' : ''}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              id="cta-calendly"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Choisir un créneau
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">OFC Création d’Entreprise</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Certifiée Qualiopi · Finançable Constructys, FSE+, OPCO selon
            règles en vigueur · {SITE_CONFIG.geo.streetAddress}, {SITE_CONFIG.geo.postalCode} {SITE_CONFIG.geo.city} ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
              www.laureolivie.fr
            </a>
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-plaquiste-btp', label: 'Formation IA plaquiste BTP' },
            { href: '/formation-ia-carreleur-btp', label: 'Formation IA carreleur BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
