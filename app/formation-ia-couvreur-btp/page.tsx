import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-couvreur-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Couvreur BTP Île-de-France — Laure Olivié',
  description:
    'Optimisez vos calculs de surface toiture, devis ardoise et zinc avec ChatGPT. Formation Qualiopi finançable Constructys. Gagnez 4h/semaine.',
  path: PATH,
  keywords: [
    'formation IA couvreur BTP',
    'ChatGPT zinguerie gouttière',
    'IA métré toiture pente',
    'devis couverture IA',
    'formation IA Île-de-France BTP',
    'DTU couverture assistant IA',
    'OPCO Constructys couvreur',
    'Qualiopi zingueur',
  ],
  openGraphType: 'article',
});

const PROMPT_COUVERTURE = `"Calcule le métré et le devis pour une toiture :

GÉOMÉTRIE :
- Bâtiment dimensions : [L x l m]
- Type toiture : [pente simple / deux pentes / mansard / etc.]
- Pente : [angle en degrés]
- Surface projetée horizontale : [X m²]
- Zones supplémentaires (redans, lucarnes, etc.) : [Y m²]

MATÉRIAU COUVERTURE :
- Type : [tuiles canal / tuiles plates / ardoises / zinc / cuivre...]
- Couleur/qualité : [si applicable]
- Prix unitaire marché Île-de-France : [X € le m²]

GOUTTIÈRE & TUYAUTERIE :
- Type gouttière : [demi-ronde, carrée, etc.], dimension [cm]
- Nombre de descentes : [N]
- Accessoires : [coudes, culottes, naissances, nombre estimé]

CHUTES & MAIN-D'ŒUVRE :
- Chutes matériau : [souvent 10 à 15 % selon matériau et découpes]
- Coût MO couverture (Île-de-France) : [Y € le m²]
- Coût MO gouttière/tuyauterie : [Z € le mètre linéaire]

CALCULE :
1) Surface réelle de couverture à partir de la surface projetée et de la pente (vérifier l’hypothèse géométrique)
2) Quantité matériau couverture avec chutes
3) Linéaires gouttière & tuyauterie
4) Accessoires estimés
5) Coût total matière + MO
6) Devis final avec marge 25%

Rappel : pentes mini, recouvrements et mise en œuvre = validation selon notices, DTU applicables et habitudes locales."`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il calculer la surface de toiture avec pente ?',
    a: "Sur une géométrie que vous décrivez clairement (surface projetée, angle, type de versant), l'IA peut proposer un coefficient de pente et une surface indicative. Les toitures complexes (plusieurs pans, brisis) demandent un découpage zone par zone : relisez toujours avec le plan et votre méthode habituelle.",
  },
  {
    q: 'L’IA comprend les DTU de couverture (pente minimale, recouvrement) ?',
    a: "Vous pouvez demander des rappels de principes et des références documentaires. Toujours croiser avec les fascicules, notices fabricant et DTU en vigueur pour le produit posé. L'IA peut se tromper sur un seuil ou une édition : la validation par un professionnel reste obligatoire.",
  },
  {
    q: 'Et si la toiture a des géométries complexes (lucarnes, redans, pignons) ?',
    a: "Découpez en zones et décrivez chaque surface : l'IA peut sommer des brouillons. Pour les cas très complexes, le résultat reste indicatif — mesure terrain ou logiciel métier si besoin.",
  },
  {
    q: 'Comment gérer les variations de prix tuiles, ardoises ou zinc ?',
    a: "Vous mettez à jour le prix au m² ou au kg dans votre prompt ou modèle réutilisable : quand le fournisseur change ses tarifs, vous recalculez vos brouillons plus vite. L'IA n'actualise rien toute seule sans votre saisie.",
  },
  {
    q: 'Faut-il maîtriser un logiciel CAO pour utiliser l’IA ?',
    a: "Non pour les usages texte : plan PDF ou mesures sur place, puis saisie des dimensions. Avec un abonnement adapté, certaines interfaces permettent d'appuyer l'analyse sur une image — toujours sous votre contrôle.",
  },
  {
    q: 'Quel est le coût de ChatGPT pour un couvreur ?',
    a: "Il existe une offre gratuite (limitée) et des abonnements payants selon les besoins (dont vision / fichiers). Comparez le coût mensuel au temps gagné sur les métrés et devis.",
  },
  {
    q: 'Ma formation IA est-elle finançable si je suis couvreur indépendant ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les couvreurs perdent du temps' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux couvreurs' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des couvreurs sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaCouvreurBtpPage() {
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
        <span className="text-slate-900">Formation IA couvreur BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour couvreurs / zingueurs —{' '}
          <span className="text-[var(--accent)]">gagnez environ 4 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Optimisez <strong>surfaces de toiture</strong>, <strong>devis</strong> (ardoise, tuiles, zinc) et{' '}
          <strong>métrés</strong> avec ChatGPT — <strong>Île-de-France</strong> et <strong>Grand Paris</strong>. Formation{' '}
          <strong>Qualiopi</strong>, finançable <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide les couvreurs à structurer surfaces, linéaires et devis à partir de vos données ; elle ne remplace ni
            le bureau d’études ni la validation des pentes, recouvrements et notices DTU / fabricants. Temps gagné sur la
            mise en forme et les itérations — sous votre responsabilité technique.
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
            Le problème : pourquoi les couvreurs perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes couvreur ou zingueur. Votre expertise : surfaces de toiture (avec pentes), gouttières et
            tuyauteries, choix et pose des matériaux (tuiles, ardoises, zinc, cuivre, écrans), lecture des plans.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Mais chaque semaine, c’est aussi : <strong>analyser les plans de toiture</strong>,{' '}
            <strong>calculer les surfaces à couvrir</strong> (pente, débords, réservations),{' '}
            <strong>estimer linéaires de gouttière et zinguerie</strong>, <strong>établir des devis détaillés</strong>,{' '}
            <strong>suivre les cours des matériaux</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Un couvreur passe souvent 5 à 7 heures par semaine</strong> sur les calculs de surface et la gestion
            administrative, souvent après la journée sur les toitures.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le risque ? <strong>Une erreur de surface, c’est coûteux.</strong> Sous-estimer, c’est réapprovisionner
            (délai, manœuvre). Surestimer, c’est marge perdue. Pentes minimales, recouvrements, dilatation des métaux et
            écoulement des eaux doivent rester cohérents avec les règles d’art et les documents du projet.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En Île-de-France et Grand Paris, la rénovation de toitures génère des dossiers réguliers. Mais entre analyse des
            plans, calcul de surface et rédaction du devis (pente, matériau, accessoires), vous n’avez parfois le temps de
            répondre qu’à peu d’appels par mois. <strong>Vous pouvez passer à côté de chantiers par manque de temps.</strong>
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La solution ?</strong> Utiliser l’IA comme assistant pour structurer métrés et brouillons de devis plus
            vite — tout en gardant la validation métier et les prescriptions du fabricant.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux couvreurs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour structurer surfaces, linéaires et devis à partir des paramètres que vous
            saisissez — pas pour remplacer le dimensionnement ou la conformité réglementaire lorsque le dossier l’exige.
          </p>
          <p className="mt-4 font-medium text-slate-900">Quatre cas d’usage concrets observés en formation :</p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Calculer une surface de couverture</strong> — vous partez du plan ou du relevé : surface projetée,
                angle de pente, type de versant. L’IA peut proposer un coefficient de pente et une surface indicative avec
                chutes (souvent 10 à 15 % selon matériau) — à <strong>recouper avec votre méthode</strong>. Gain typique :
                environ 30 à 45 minutes par devis selon dossiers.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Estimer linéaires de gouttière et tuyauterie</strong> — vous décrivez périmètre, type de gouttière,
                descentes, coudes et points singuliers : l’IA peut aider à lister des ordres de grandeur et un brouillon de
                quantités à valider sur plan.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Structurer un devis couverture</strong> — surface, pente, matériau, prix du jour. L’IA peut
                générer un brouillon : couverture, sous-couche ou écran, zinguerie, accessoires, main-d’œuvre — souvent en
                une vingtaine de minutes au lieu de plus d’une heure, sous votre validation.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Comparer des variantes</strong> — l’architecte ou le client hésite entre deux familles de
                produits. Vous mettez à jour le prompt : l’IA peut proposer plusieurs scénarios (ordres de grandeur de coût,
                délais indicatifs) pour arbitrer — toujours à valider avec les notices et votre politique commerciale.
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
            — Laure vous montre comment l’IA structure une surface toiture et un devis sur un cas type, financement
            Constructys, programme 1 ou 2 jours.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : automatiser le calcul couverture
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : créer votre template de calcul toiture (prompt réutilisable)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_COUVERTURE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : relever les dimensions sur le plan ou sur place
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Dimensions du bâti, pente(s), zones particulières (lucarnes, noues, etc.).
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : remplir le prompt
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Comptez souvent 5 à 10 minutes pour un dossier simple — plus si la toiture est découpée en nombreuses zones.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : générer le brouillon de devis et valider
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA produit surfaces, métrés et totaux à <strong>vérifier systématiquement</strong> (hypothèses de pente,
            recouvrements, points singuliers). Vous croisez avec les DTU / notices applicables avant engagement.
          </p>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation avec des couvreurs en Île-de-France — variables selon l’entreprise et le
            nombre de devis traités :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA sur tâches courantes</caption>
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
                  <td className="p-3">Calcul surface toiture réelle</td>
                  <td className="p-3">~45 min</td>
                  <td className="p-3">~2 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Linéaires gouttière / tuyauterie</td>
                  <td className="p-3">~1 h</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis couverture complet</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~20 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes (2–3 options)</td>
                  <td className="p-3">~2 h</td>
                  <td className="p-3">~10 min</td>
                  <td className="p-3">Très fort</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse (ex. 2 à 3 devis / semaine)</td>
                  <td className="p-3">Plusieurs heures</td>
                  <td className="p-3">Réduit fortement</td>
                  <td className="p-3">Variable (souvent plusieurs h / sem.)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les gains hebdomadaires dépendent du volume de devis et du temps de relecture que vous conservez. Aucun résultat
            chiffré (CA, marge) n’est garanti.
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Effet business possible (non garanti) :</strong> en libérant du temps sur l’étude de prix, certaines
            équipes peuvent répondre à davantage d’appels d’offres ou sécuriser des délais de réponse — à confirmer selon
            votre organisation.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant, un devis toiture me prenait souvent plusieurs heures : surface, gouttières, comparaisons… Maintenant je
              structure tout ça beaucoup plus vite avec ChatGPT — je peux en traiter davantage sans rester le soir sur
              l’administratif. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Artisan couvreur-zingueur, FFB Île-de-France (témoignage de formation)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des couvreurs sur l’IA
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
            <strong>Laure Olivié</strong>, formatrice IA et ChatGPT spécialisée BTP. L’organisme{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> (NDA 11788515078) et a formé
            plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment : couvreurs, zingueurs,
            conducteurs de travaux, dirigeants — en Île-de-France et en France.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> 4,85/5.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Elle a conçu cette approche parce qu’elle voit souvent des couvreurs très compétents passer trop de temps sur le
            calcul administratif. L’objectif : libérer du temps pour le chantier et la relation client, avec des usages
            d’IA encadrés et une validation humaine systématique.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Couvreur, zingueur ou chef de projet couverture en Île-de-France : vérifier si l’IA vous fait gagner du temps sur
            métrés et devis — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Comment ChatGPT structure une surface toiture et des linéaires de gouttière à partir de votre description</li>
            <li>Brouillon de devis matière + MO — toujours sous votre validation</li>
            <li>Financement Constructys et format (1 ou 2 jours, inter / intra)</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              id="cta-calendly"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Réserver un créneau
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
            { href: '/formation-ia-etancheur-btp', label: 'Formation IA étancheur BTP' },
            { href: '/formation-ia-charpentier-btp', label: 'Formation IA charpentier BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
