import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF } from '@/lib/constants';

const PATH = '/formation-ia-carreleur-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Carreleur Faïencier BTP Île-de-France — Laure Olivié',
  description:
    'Formation IA ChatGPT pour carreleurs faïenciers. Automatisez devis carrelage, métrage revêtement, devis salle de bain. Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA carreleur',
    'ChatGPT devis carrelage',
    'métrage carrelage IA',
    'faïence salle de bain',
    'formation IA BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'fiche technique carrelage',
  ],
  openGraphType: 'article',
});

const PROMPT_BAREME = `Tu es expert carreleur. Voici mon barème indicatif (à adapter) — Île-de-France :

CARRELAGE (au m²) :
- Carrelage standard blanc 30x60 : 15 € /m²
- Carrelage imitation pierre 30x60 : 22 € /m²
- Carrelage haut de gamme pierre naturelle : 45 € /m²
- Carrelage sol antidérapant : 18 € /m²
- Carrelage mural salle de bain faïence : 12 € /m²

FOURNITURES JOINTS ET POSE :
- Joints ciment gris/blanc : 2 € /m²
- Scellant acrylique salle de bain : 1.50 € /m²
- Colle carrelage : 0.80 € /m²

MAIN-D'ŒUVRE :
- Pose carrelage : 35 € /h (rendement indicatif 8-10 m²/h)
- Joints + scellant : 15 € /h (rendement indicatif 15-20 m²/h)
- Dépose ancien carrelage : 20 € /h

FRAIS :
- Déplacement Île-de-France : 45 €
- Pertes carrelage : 12-15% de la surface (à ajuster selon cas)

Quand je te donne les détails d'un chantier, génère un devis professionnel avec métrage + pertes, en rappelant que les PU sont à remplacer par mes tarifs réels.`;

const PROMPT_FICHE_TECH = `Quand je te donne les caractéristiques d'un carrelage, génère une fiche technique structurée :
1. Nom du produit / marque
2. Format (ex: 30x60 cm)
3. Matière (grès cérame, faïence, pierre naturelle)
4. Épaisseur
5. Résistance / usage (eau, pièce humide — à croiser avec les docs fabricant)
6. Glissance (R9, R10, R11, R12, R13 — si indiqué)
7. Conformité ou usages recommandés (selon ce que je fournis)
8. Joints recommandés
9. Temps séchage / prise en charge (indicatif)
10. Entretien / maintenance

Ajoute une ligne : « À valider avec la fiche produit et la réglementation applicable au chantier. »`;

const PROMPT_VARIANTES = `Je dois proposer 3 options carrelage pour une cuisine 50 m² (sol + crédence).

Option 1 : Carrelage standard économique blanc
Option 2 : Carrelage design imitation béton
Option 3 : Carrelage haut de gamme pierre naturelle

Génère 3 devis comparables avec :
- Prix indicatifs (je remplacerai par mes barèmes)
- Différences matériau et finition
- Temps de pose estimé pour chaque option
- Points d'attention (découpes, pentes, etc. si je les précise)`;

const PROMPT_FAQ_CLIENTS = `Mes 8 questions client les plus fréquentes. Rédige une réponse courte (60-80 mots), ton pro et clair :

1. Quel est votre tarif au m² pour carrelage ?
2. Vous déposez l'ancien carrelage avant ?
3. Combien de temps pour carreler une cuisine 30 m² ?
4. Quel carrelage pour une salle de bain très humide ?
5. Est-ce que le carrelage avec plots est plus cher ?
6. Vous faites les joints imperméables salle de bain ?
7. Quelle différence entre grès cérame et faïence ?
8. Quel délai pour un devis ?`;

const PROMPT_RELEVE = `Après une visite chantier, je te transmets les dimensions brutes et caractéristiques.
Tu génères un brief chantier avec :
- Surfaces par zone
- Surface totale + proposition de taux de pertes (à valider par moi)
- Estimation indicative du nombre de carreaux si je donne le format
- Fourchette d'heures de pose (selon les infos que je fournis)
- Liste des points à vérifier avant chiffrage définitif

Rappelle que les mesures définitives et le chiffrage contractuel restent ma responsabilité.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT calcule-t-il correctement le métrage avec pertes ?',
    a: "L'IA peut appliquer des formules (surface, format, taux de pertes) à partir de vos données. Vous validez toujours les hypothèses (découpes, angles, casse) et le résultat avant commande.",
  },
  {
    q: 'Et si la pose est particulière (diagonale, découpes nombreuses) ?',
    a: "Vous le précisez dans le prompt. L'IA peut proposer des postes ou une fourchette de temps ; le jugement de difficulté reste le vôtre.",
  },
  {
    q: 'Comment financer la formation ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'Les clients verront-ils que j’utilise l’IA ?',
    a: "Non si vous rédigez et adaptez le texte : le document envoyé est le vôtre, avec votre relecture et votre mise en forme habituelle.",
  },
  {
    q: 'Confidentialité des tarifs et données chantier ?',
    a: "Évitez de saisir des informations sensibles dans des outils non adaptés ; suivez la politique de votre compte et les règles RGPD de votre entreprise. Les barèmes restent chez vous.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis carrelage et métrage chronophages' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux carreleurs' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des carreleurs sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaCarreleurBtpPage() {
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
        <span className="text-slate-900">Formation IA carreleur faïencier BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour carreleurs faïenciers —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur devis, métrage et fiches techniques</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 3 h par semaine</strong> sur l’administratif (devis, variantes,
          réponses clients). <strong>Île-de-France</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis et textes ; les métrages définitifs, les prix, les fiches produit et la conformité
            aux prescriptions restent sous votre responsabilité. Relisez toujours avant envoi au client.
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
            Le problème : devis carrelage et métrage occupent la semaine
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>carreleur faïencier</strong> en Île-de-France : chaque dossier combine surfaces, formats,
            pertes, joints, dépose éventuelle, et souvent <strong>plusieurs variantes</strong> pour le client.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, le temps part souvent en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Rédaction de devis détaillés (murs, sols, types de pose, finitions).',
              'Calculs de métrage avec taux de pertes et découpes.',
              'Variantes « standard / design / haut de gamme » à comparer.',
              'Fiches techniques ou synthèses à partir des docs fournisseurs.',
              'Réponses répétitives aux questions clients (délais, glissance, dépose, etc.).',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Résultat : les devis prennent du retard alors que les prospects comparent plusieurs offres — d’où l’intérêt
            d’accélérer la mise en forme tout en gardant la main sur le chiffrage.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">La solution : l’IA adaptée aux carreleurs</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : produire des brouillons de devis à partir de votre barème, structurer des fiches
            techniques, générer des variantes comparables, préparer des réponses types — sous votre relecture.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis et lots</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Tableaux avec métrage, pertes indicatives et postes main-d’œuvre.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Fiches techniques</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Structuration à partir des données que vous fournissez — à croiser avec les notices fabricants.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Variantes et FAQ client</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Comparaisons et textes courts réutilisables pour le commercial au quotidien.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ChatGPT à votre métier de carreleur.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas : 5 étapes</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : codifier votre barème carrelage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BAREME}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : modèle de fiche technique carrelage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE_TECH}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : trois variantes sur un même chantier
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : réponses aux questions fréquentes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FAQ_CLIENTS}
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
            Ordres de grandeur possibles — <strong>variables</strong> selon le nombre de devis et votre temps de contrôle
            :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur les tâches carreleur
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis carrelage</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche technique</td>
                  <td className="p-3">Mise en forme manuelle</td>
                  <td className="p-3">Trame remplie</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Plusieurs variantes</td>
                  <td className="p-3">Rédactions séparées</td>
                  <td className="p-3">Comparatif proposé</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Réponses clients</td>
                  <td className="p-3">À retaper</td>
                  <td className="p-3">Textes types</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par semaine n’est garanti : tout dépend de votre volume de dossiers et de vos relectures.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis avec métrage et variantes me prenaient une partie de la soirée. Avec des prompts calés sur mon
              barème, j’envoie plus vite des propositions claires — je garde le dernier mot sur les prix et la pose. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Carreleur faïencier, témoignage de formation (Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — carreleurs et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> artisans et dirigeants du BTP pour
            utiliser ChatGPT sur la productivité (devis, communication, appels d’offres).{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
            <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> formés, satisfaction moyenne{' '}
            <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Devis carrelage, fiches techniques, variantes : démonstration sur un cas type. Pour une équipe ou une session
            intra-entreprise, utilisez aussi le contact ou le téléphone ci-dessous.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
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
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA carreleur faïencier — Île-de-France
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · Finançable Constructys selon éligibilité · SIRET{' '}
            {SITE_CONFIG.siret} · NDA 11788515078 · {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'Formation IA appels d’offres BTP' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/formation-ia-macon-paysagiste-btp', label: 'Formation IA maçon paysagiste BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
