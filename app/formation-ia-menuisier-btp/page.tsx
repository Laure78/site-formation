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

const PATH = '/formation-ia-menuisier-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Menuisier BTP Île-de-France — Laure Olivié',
  description:
    'Formation IA ChatGPT pour menuisiers. Automatisez devis, métrage, fiches techniques menuiserie. Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA menuisier BTP',
    'ChatGPT devis menuiserie',
    'IA fiche technique fenêtre',
    'devis PVC alu bois IA',
    'formation IA Île-de-France BTP',
    'menuisier intérieur extérieur IA',
    'OPCO Constructys menuisier',
    'Qualiopi menuiserie',
  ],
  openGraphType: 'article',
});

const PROMPT_BAREME = `Tu es expert menuisier (bois, PVC, alu, composite). Voici la structure de mon barème indicatif — je complète les montants réels :

PORTES D’ENTRÉE / FENÊTRES / BAIES (fourniture / pose selon ma grille) :
- [gamme PVC] : [X €] fourniture, [Y €] pose, options : […]
- [gamme alu] : [X €] …
- [portes intérieures, placards, escaliers…] : [mes forfaits ou €/ml]

MAIN-D’ŒUVRE :
- Taux horaire pose : [X €/h]
- Déplacement : [X €]

Quand je décris une commande (produits, cotes, options, zone), génère un brouillon de devis :
- description détaillée par poste
- fournitures × quantités si je les donne
- main-d’œuvre (heures estimées × taux)
- frais annexes
- totaux HT / TVA selon mon régime — je valide
- délais fabrication / pose indicatifs

Je reste responsable des cotes mesurées, des choix réglementaires (thermique, acoustique, accessibilité selon dossier) et des prix.`;

const PROMPT_FICHE_TECH = `Quand je te fournis les caractéristiques d’un produit (type, matière, dimensions, vitrage, quincaillerie, références fabricant), génère une fiche de présentation client structurée :

1. Désignation et usage
2. Dimensions et cotes (celles que je fournis)
3. Matériaux et composition
4. Performances thermiques Uw et acoustiques Rw — uniquement si je colle les valeurs issues notice / certificat ; sinon indiquer « à confirmer sur documentation fabricant »
5. Marquage CE / normes si fournis
6. Quincaillerie et options
7. Délais et conditions de pose (indicatifs)
8. Entretien

Ne pas inventer de valeurs Uw/Rw ou de certifications.`;

const PROMPT_VARIANTES = `Je dois proposer 3 variantes pour un même besoin (ex. fenêtre [X] × [Y] mm, pose [tunnel/applique…], zone Île-de-France).

Variante 1 : [ex. PVC — gamme standard]
Variante 2 : [ex. PVC + vitrage renforcé]
Variante 3 : [ex. alu — gamme premium]

Génère 3 brouillons de devis comparables : écarts de prix indicatifs, avantages/inconvénients. Les montants reprennent mon barème si je l’ai fourni.`;

const PROMPT_FAQ_CLIENT = `Je suis menuisier en Île-de-France. Voici des questions fréquentes. Pour chacune, réponse courte (60–100 mots), professionnelle, sans prix chiffré si je ne les ai pas donnés :

1. PVC vs alu vs bois : critères de choix (sans trancher à la place d’une visite)
2. Livraison et pose : ce qui est typiquement inclus (à adapter à mon offre)
3. Ordre de grandeur pour remplacer plusieurs ouvrants (sans engagement sans mesure)
4. Coordination volets / réseaux / autres corps d’état
5. Durée indicative de pose pour une porte d’entrée (selon contexte)
6. Comparaison portes PVC / bois (généralités + rendez-vous sur site)
7. Zone d’intervention
8. Devis gratuit / payant selon ma politique`;

const PROMPT_BRIEF_LEVEE = `Je te transmets les infos relevées chez un client (cotes, configuration, état existant, besoins).
Tu génères un brief structuré pour l’atelier ou l’équipe :

1. Contexte et relevé de cotes (tel que je les donne)
2. Besoins identifiés (produits, perf, style)
3. Proposition de planning (fabrication / pose — indicatif)
4. Points de vigilance (accès, conformité, interfaces avec autres lots)
5. Pistes de variantes prix / performance si je le demande

Je valide les cotes au métre et les choix techniques avant fabrication.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment rédiger un devis menuiserie ?',
    a: "L'IA peut structurer un brouillon à partir de votre barème et des cotes que vous fournissez. Vous contrôlez les dimensions, les gammes et les prix : le devis signé engage votre entreprise — relisez toujours avant envoi.",
  },
  {
    q: 'Les cotes et dimensions sur mesure — comment les gérer ?',
    a: "Vous saisissez les mesures relevées : l'IA les insère dans le texte. Les erreurs de saisie ou d’interprétation restent possibles : la validation finale est toujours la vôtre.",
  },
  {
    q: 'L’IA peut-elle m’aider sur Uw, Rw et normes ?',
    a: "Elle peut reformuler des définitions et mettre en page des valeurs que vous fournissez (notice fabricant, avis technique). Pour les valeurs certifiées ou réglementaires, sourcez le document officiel — ne pas faire confiance à des chiffres inventés par le modèle.",
  },
  {
    q: 'Combien de temps pour monter en autonomie avec ChatGPT ?',
    a: "Cela dépend de votre habitude du numérique. En formation, on enchaîne des cas réels (devis, fiches, mails) pour accélérer la prise en main — sans prérequis « informaticien » pour les usages texte.",
  },
  {
    q: 'Comment financer la formation ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
  {
    q: 'Mes clients verront-ils une différence dans les devis ?',
    a: "Si vous reprenez le brouillon dans votre modèle (logo, mentions légales), le rendu reste le vôtre. L’intérêt est souvent une meilleure structure et des variantes plus rapides — pas une garantie de taux de signature.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis menuiserie et métrage chronophages' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux menuisiers' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des menuisiers sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaMenuisierBtpPage() {
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
        <span className="text-slate-900">Formation IA menuisier BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour menuisiers —{' '}
          <span className="text-[var(--accent)]">gagnez environ 3 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez <strong>devis</strong>, <strong>métrages</strong> et <strong>fiches techniques</strong> (bois, PVC,
          alu) avec ChatGPT — <strong>Île-de-France</strong>. Formation <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, descriptifs et mails à partir de vos données ; elle ne remplace ni le relevé de
            cotes, ni la validation des performances affichées (Uw, Rw) sur documents fabricant, ni le logiciel métier si vous
            en utilisez un.
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
            Le problème : devis menuiserie et métrage mangent votre temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes menuisier en Île-de-France : bois, PVC, alu, matériaux composites. Chaque semaine, une partie du temps
            part sur la rédaction et le chiffrage plutôt que sur l’atelier ou la pose.
          </p>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Devis détaillés</strong> — portes, fenêtres, placards, escaliers : chaque poste demande description,
              quantités et pose.
            </li>
            <li>
              <strong>Métrages et relevés</strong> — cotes, configurations, accès : à consigner proprement pour l’atelier.
            </li>
            <li>
              <strong>Fiches techniques</strong> — vitrage, quincaillerie, mode de pose : alignement sur les notices et le
              CCTP quand il existe.
            </li>
            <li>
              <strong>Questions récurrentes</strong> — matériaux, délais, coordination volets ou autres lots : les mêmes
              explications à reformuler.
            </li>
            <li>
              <strong>Variantes</strong> — plusieurs gammes ou finitions : autant de brouillons à produire et à comparer.
            </li>
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Conséquence :</strong> des heures au bureau ou derrière l’écran alors que l’atelier et le chantier
            attendent ; des devis qui tardent peuvent faire partir le client vers un concurrent plus réactif.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux menuisiers
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’IA ne trace pas les plans ni ne mesure à votre place — elle peut accélérer la{' '}
            <strong>rédaction</strong> des devis, descriptifs et réponses à partir de vos données.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Brouillon de devis</strong> — vous décrivez produits, cotes et options : structure fournitures +
                pose — à valider avant signature.
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
                <strong>3. Variantes comparées</strong> — une requête pour plusieurs gammes (PVC, alu, vitrage) avec écarts
                expliqués.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Réponses types</strong> — base de textes pour les questions fréquentes, à personnaliser.
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
            — adaptation de ChatGPT à votre spécialité menuiserie, financement Constructys.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 5 étapes avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : structurer votre barème produits
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BAREME}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : fiche technique produit
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE_TECH}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : variantes de devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : réponses aux questions fréquentes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FAQ_CLIENT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : brief après levée de cotes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BRIEF_LEVEE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — variables selon le volume de devis et le temps de relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
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
                  <td className="p-3">Devis menuiserie</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche technique</td>
                  <td className="p-3">~15–30 min</td>
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
                  <td className="p-3">Réponse client</td>
                  <td className="p-3">~5–10 min</td>
                  <td className="p-3">~1 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Brief levée de cotes</td>
                  <td className="p-3">~20–30 min</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
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
              « Les devis et les descriptifs me prenaient une grosse partie du bureau. Avec un brouillon ChatGPT que je
              retravaille, j’envoie plus vite — je garde la main sur les cotes et les prix. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Menuisier, Île-de-France (témoignage de formation)
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
            FAQ — questions des menuisiers sur l’IA
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
            L’organisme a formé plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment
            (artisans, PME, encadrement). <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> 4,85/5.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les formations s’appuient sur des <strong>cas réels</strong> (devis, descriptifs, extraits de dossiers) — pas de
            généraliste sans mise en pratique terrain.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Menuisier en Île-de-France : voir comment structurer devis et fiches plus vite — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Démonstration : brouillon de devis à partir de votre barème</li>
            <li>Cas d’usage : variantes, fiches techniques, briefs atelier</li>
            <li>Financement Constructys et formats 1 ou 2 jours (inter / intra)</li>
          </ul>
          <p className="mt-6 text-blue-100 text-sm">
            PME ou équipe :{' '}
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
            { href: '/formation-ia-vitrier-btp', label: 'Formation IA vitrier miroitier' },
            { href: '/formation-ia-charpentier-btp', label: 'Formation IA charpentier BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
