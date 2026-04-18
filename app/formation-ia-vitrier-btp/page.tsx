import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
  sitePhoneDisplaySuffix,
} from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { InlinePublicPhoneLink, PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';

const PATH = '/formation-ia-vitrier-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Vitrier Miroitier BTP Île-de-France',
  description:
    'Formation IA ChatGPT pour vitriers miroitiers. Automatisez devis vitrage, métrages, fiches techniques, réponses clients. Qualiopi finançable Constructys. Laure Olivié.',
  path: PATH,
  keywords: [
    'formation IA vitrier BTP',
    'ChatGPT devis vitrage',
    'IA vitrier miroitier',
    'fiche technique vitrage IA',
    'formation IA Île-de-France BTP',
    'métrage verre assistant IA',
    'OPCO Constructys vitrier',
    'Qualiopi vitrerie',
  ],
  openGraphType: 'article',
});

const PROMPT_BAREME = `Tu es expert vitrier miroitier. Voici mon barème indicatif Île-de-France (à ajuster selon mes achats réels) :

VITRAGE (au m²) :
- Vitrage simple 4 mm : [X €]
- Double vitrage 4/12/4 standard : [X €]
- Double vitrage 4/12/4 haute isolation : [X €]
- Double vitrage 4/16/4 phonique : [X €]
- Triple vitrage 5/9/5/9/5 : [X €]
- Vitrage de sécurité feuilleté 5+5 : [X €]

CADRES ET QUINCAILLERIE (par baie) :
- Cadre alu standard : [X €]
- Cadre alu isolé thermique : [X €]
- Quincaillerie selon gamme : [X €]

MAIN-D'ŒUVRE :
- Pose vitrage : [X €/h] (rendement indicatif selon complexité)
- Joints silicone + finition : [X €/h]
- Dépose ancien vitrage : [X €/h]

FRAIS :
- Déplacement : [X €]
- Urgence 24h/24 : +[X €] (minimum selon grille)

Quand je te donne les détails d’une baie, génère un brouillon de devis structuré (fournitures + MO + frais). Je valide les montants avant envoi.`;

const PROMPT_FICHE_TECH = `Quand je te donne les spécifications vitrage issues fabricant ou notice, génère une fiche technique de présentation client avec :
1. Composition (ex. 4/12/4)
2. Gaz de remplissage (air, argon…)
3. Uw (W/m²K) — uniquement si je te fournis la valeur certifiée
4. Rw (dB) — idem si donnée officielle
5. Classe de sécurité (P2A, P4A, etc.) si applicable
6. Marquage CE / références produit si fournis
7. Avantages / limites (poids, usage)
8. Entretien indicatif

Rappel : ne pas inventer de valeurs Uw/Rw : utiliser celles que je colle ou indiquer « à confirmer sur notice ».`;

const PROMPT_TROIS_VARIANTES = `Je dois proposer 3 options vitrage pour une baie [dimensions] mm.

Option 1 : [description économique]
Option 2 : [description confort thermique]
Option 3 : [description performance / sécurité selon besoin]

Génère 3 brouillons de devis comparatifs : ligne de prix indicative, différences d’usage, avantages/inconvénients. Les prix doivent reprendre mon barème si je l’ai fourni.`;

const PROMPT_FAQ_CLIENT = `Voici mes questions clients les plus fréquentes. Rédige une réponse courte et professionnelle (60–80 mots chacune), ton clair, sans jargon inutile :

1. Tarif au m² pour vitrage ?
2. Différence simple / double vitrage ?
3. 4/12/4 isole-t-il vraiment ?
4. Quel vitrage selon l’orientation (nord/sud) ?
5. Triple vitrage : contrainte poids ?
6. Remplacement des joints silicone ?
7. Délai pour remplacer une baie ?
8. Urgence vitrage cassé ?
9. Miroirs sur mesure ?
10. Délai pour un devis ?`;

const PROMPT_RELEVE = `Après une visite chantier, je te transmets des dimensions brutes et le nombre de baies.
Tu génères un brief chantier structuré : récap baies, surface vitrage estimée, type de vitrage recommandé (à valider), heures de pose indicatives, points d’attention.
Je reste seul responsable des cotes et du choix final des produits.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment rédiger un devis vitrage fiable ?',
    a: "L'IA peut produire un brouillon structuré (description, lignes, quantités) à partir de vos données et de votre barème. Vous contrôlez les cotes, les gammes et les prix : le devis signé engage votre entreprise — relisez toujours avant envoi.",
  },
  {
    q: 'Et les indices Uw, Rw — comment les gérer ?',
    a: "L'IA peut reformuler des définitions et mettre en page des valeurs que vous fournissez (notice fabricant, avis technique). Pour les valeurs réglementaires ou certifiées, sourcez toujours le document officiel : ne pas faire confiance à des chiffres « inventés » par le modèle.",
  },
  {
    q: 'Comment financer la formation ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
  {
    q: 'Mes clients verront-ils que j’utilise ChatGPT ?',
    a: "Non si vous reprenez le texte dans votre modèle de devis / PDF maison (logo, mentions légales). L'IA est un outil de brouillon : le document final doit refléter votre entreprise et vos conditions générales.",
  },
  {
    q: 'Et la confidentialité des tarifs et marges ?',
    a: "Évitez de partager des données ultra sensibles dans des outils non maîtrisés. Préférez des comptes professionnels ou entreprise quand c’est possible, et des barèmes arrondis ou anonymisés dans les prompts si besoin.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis vitrage et métrages chronophages' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux vitriers' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des vitriers sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaVitrierBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA vitrier miroitier BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour vitriers miroitiers —{' '}
          <span className="text-[var(--accent)]">gagnez environ 3 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez <strong>devis vitrage</strong>, <strong>métrages</strong> et <strong>fiches techniques</strong> avec
          ChatGPT — <strong>Île-de-France</strong>. Formation <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, variantes et réponses clients à partir de vos barèmes et données ; elle ne remplace
            pas le relevé de cotes ni la validation des performances affichées (Uw, Rw, sécurité) sur documents officiels.
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
            Le problème : devis vitrage et métrages verres mangent votre temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La réalité du vitrier miroitier</strong> en Île-de-France : chaque semaine, une partie du temps part sur
            l’administratif au lieu du chantier.
          </p>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Écrire des devis vitrage</strong> — dimensions, composition (4/12/4, etc.), cadre, quincaillerie, type
              de pose, joints : tout doit être décrit proprement pour être chiffré.
            </li>
            <li>
              <strong>Calculer les métrages verres</strong> — baie par baie, retrait des dormants, cotes vitrage : le travail
              est méticuleux.
            </li>
            <li>
              <strong>Gérer les variantes</strong> — le client veut souvent plusieurs options (standard, phonique, sécurité) :
              autant de brouillons à produire et à comparer.
            </li>
            <li>
              <strong>Rédiger des fiches techniques</strong> — composition, Uw, Rw, classes de sécurité, marquage : il faut
              rester aligné sur les données fabricant.
            </li>
            <li>
              <strong>Répondre aux questions clients</strong> — isolation, orientation, délais, urgence baie cassée : les
              mêmes explications reviennent souvent.
            </li>
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Conséquence :</strong> on peut facilement passer plusieurs heures par semaine sur ces tâches. Les devis
            traînent, les dossiers urgents se bousculent — surtout en cas de vitrage cassé.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux vitriers
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT ne coupe pas le verre — mais il peut accélérer la <strong>rédaction</strong>, la <strong>mise en forme</strong>{' '}
            et les <strong>variantes</strong> à partir des informations que vous fournissez.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Brouillon de devis vitrage</strong> — vous décrivez la baie, le vitrage, la pose et les options :
                l’IA propose une structure de devis à intégrer dans votre modèle — sous votre validation des prix.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Fiche technique</strong> — à partir des données que vous collez (notice, certificat), mise en page
                claire pour le client — sans inventer de performances.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Plusieurs variantes</strong> — une seule requête pour comparer 2 ou 3 options (économique,
                confort, sécurité) avec écarts expliqués.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Réponses types</strong> — base de réponses courtes pour les questions récurrentes, à personnaliser
                avant envoi.
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
            — adaptation de ChatGPT au métier vitrier (devis, variantes, brief chantier), financement Constructys.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 5 étapes avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : codifier votre barème vitrage
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous fixez vitrage au m², cadres, MO, frais — chiffres indicatifs que vous mettez à jour selon vos fournisseurs.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BAREME}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : prompt de fiche technique vitrage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE_TECH}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : générer des variantes comparatives
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
            Étape 5 : structurer un relevé de visite
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
                  <td className="p-3">Devis vitrage</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche technique</td>
                  <td className="p-3">~15–20 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">3 variantes comparées</td>
                  <td className="p-3">~45–60 min</td>
                  <td className="p-3">~5–10 min</td>
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
                  <td className="p-3">Plusieurs heures</td>
                  <td className="p-3">Réduit</td>
                  <td className="p-3">Souvent ~3 h / sem. (variable)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain d’heures ou de chiffre d’affaires n’est garanti : tout dépend de votre activité et de la rigueur de
            relecture.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis vitrage me prenaient une grosse partie du bureau. Avec un brouillon généré par ChatGPT que je
              retravaille, j’envoie beaucoup plus vite — les clients ont une réponse le jour même quand je peux. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Vitrier miroitier, Île-de-France (témoignage de formation)
            </footer>
          </blockquote>

          <p className="mt-8 text-slate-600 leading-relaxed">
            <strong>Devis trop longs à rédiger ?</strong>{' '}
            <a href="#rdv" className="text-[var(--accent)] font-medium underline hover:no-underline">
              Réservez une visio découverte gratuite
            </a>
            .
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des vitriers sur l’IA
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
            L’organisme a formé plus de <strong>{formatProfessionalsTrainedCount()} professionnels</strong> du bâtiment.{' '}
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> {SOCIAL_PROOF.AVERAGE_RATING}.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les formations vitrerie s’appuient sur des cas réels : devis, variantes, fiches techniques — toujours avec
            validation des données produit et des prix par le professionnel.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Vitrier miroitier en Île-de-France : voir comment structurer devis et variantes plus vite — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Démonstration : brouillon de devis vitrage à partir de votre barème</li>
            <li>Les usages qui libèrent le plus de temps au quotidien</li>
            <li>Financement Constructys et mise en pratique</li>
          </ul>
          <p className="mt-6 text-blue-100 text-sm">
            Équipe ou session intra : contactez Laure {siteHasPublicPhone() ? 'au ' : 'à '}
            <InlinePublicPhoneLink className="underline hover:text-white" />
            {siteHasPublicPhone() ? ' ou ' : ''}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
            .
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
            { href: '/formation-ia-couvreur-btp', label: 'Formation IA couvreur BTP' },
            { href: '/formation-ia-etancheur-btp', label: 'Formation IA étancheur BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
