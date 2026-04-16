import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF } from '@/lib/constants';

const PATH = '/formation-ia-pisciniste-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Pisciniste BTP Île-de-France — Laure Olivié',
  description:
    'Automatisez vos devis piscine, fiches techniques, relances clients. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA pisciniste BTP',
    'ChatGPT devis piscine',
    'IA piscine Île-de-France',
    'documentation technique piscine IA',
    'filtration piscine devis',
    'OPCO Constructys',
    'Qualiopi BTP',
    'FFB piscine',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Crée un devis technique pour cette piscine (Grand Paris) :
- Bassin : 12m × 6m × 1,5m de profondeur (180m³)
- Filtration : sable 30m³/h, pompe 1,5kW
- Traitement : chlore automatisé avec régulateur pH
- Équipements : escalier béton 2 marches, robot nettoyeur, éclairage LED 12W sous-marin (blanc)
- Revêtement : liner 75/100e bleu clair
- Couverture : 4 saisons manuel
- Accessoires : panier skimmer, échelle, brosse, pince
- Options client : chauffage pompe à chaleur, domotique Sondes

Pour chaque élément :
1. Description technique
2. Quantité (si applicable)
3. Prix unitaire HT
4. Sous-total

Ajoute les sections : terrassement, maçonnerie, électricité, mise en eau, mise en service, délai (6 semaines). Format tableau, pro, prêt à imprimer ou envoyer par email.`;

const PROMPT_VARIANTES = `Mon client demande des options d'optimisation sur le devis piscine à 38 000€ :
1. Variante "Sans chauffage" : combien ça descend ?
2. Variante "Avec domotique complète + chauffage" : combien ça monte ?
3. Variante "Bassin 10×5m au lieu de 12×6m" : prix estimé ?

Pour chaque variante, donne-moi :
- Le nouveau montant HT
- Les modifications au devis (lots affectés)
- Une phrase pour expliquer au client les avantages/inconvénients`;

const PROMPT_DOCUMENTATION = `Crée pour moi :

1. **Fiche de mise en service** (1 page) : procédure remplissage bassin, mise en marche filtration, équilibre chimique (pH, chlore), et contact urgent (24h) après mise en eau.

2. **Guide d'entretien saisonnier** (2 pages) : 
   - Printemps : remise en service, dosage premier chimique
   - Été : maintenance hebdo, contrôle chimie, nettoyage skimmer
   - Automne : préparation hivernage, produits spécifiques
   - Hiver : couverture et vigilance gel

3. **FAQ client** (5-7 questions) : 
   - Combien l'eau monte/baisse naturellement ?
   - Chlore manuel ou automatisé ?
   - Comment chauffer à peu de frais ?
   - Quand changer le liner ?
   - Risques enfants/sécurité ?

Ton : pro mais accessible, pas de jargon incompréhensible, conseils pratiques.`;

const PROMPT_SUIVI_CLIENT = `Mon client demande : "On veut une piscine plus petite, 8×4m au lieu de 12×6m, et moins chère. On pense faire phaser : une piscine simple maintenant, puis chauffage et domotique plus tard. Est-ce possible ?"

Rédige pour moi :
1. Email de réponse positive (montrez qu'on comprend le budget)
2. Devis phase 1 (piscine base sans options)
3. Note de conseil sur le phasage (ce qui est facile/difficile à ajouter plus tard)
4. Prochain RDV pour valider le projet modifié

Ton : chaleureux, rassurant, professionnel.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT comprend-il les calculs hydrauliques et filtration ?',
    a: "L'IA peut proposer des ordres de grandeur et des tableaux à partir des dimensions que vous indiquez. Les dimensionnements définitifs (hydraulique, pertes de charge, choix du matériel) restent sous votre responsabilité et doivent être validés selon votre méthode et les fabricants.",
  },
  {
    q: 'Comment l’IA peut-elle aider sur la sécurité (barrière, norme piscine) ?',
    a: "Elle peut rappeler des principes généraux et structurer une liste de points à vérifier. La conformité réglementaire (NF P 90-308, évolutions des textes) doit être validée avec votre expertise et, si besoin, un professionnel habilité.",
  },
  {
    q: 'Et pour l’électricité en zone d’eau ?',
    a: "L'IA peut proposer des formulations de type « zones 0-1-2 » et des rappels de bonnes pratiques. Le schéma réel, les protections et la mise en œuvre relèvent d'un électricien qualifié et des normes en vigueur.",
  },
  {
    q: "L'IA va-t-elle remplacer les piscinistes ?",
    a: "Non. L'IA accélère la rédaction et la structuration ; la visite terrain, le geste, la sécurité et la relation client restent humains.",
  },
  {
    q: 'Comment financer la formation si je suis artisan pisciniste ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'ChatGPT peut-il m’aider avec les démarches administratives (permis, déclaration) ?',
    a: "L'IA peut aider à structurer un dossier type (liste de pièces, formulations). La décision administrative et la conformité au PLU / règlement local restent à valider avec les services compétents ou un professionnel du droit de l'urbanisme.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : entre conception et suivi client' },
  { href: '#la-solution', label: 'La solution : l’IA pour vos devis et documentation' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des piscinistes sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaPiscinisteBtpPage() {
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
        <span className="text-slate-900">Formation IA pisciniste BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour piscinistes —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur devis et suivi</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 4 h par semaine</strong> sur devis techniques, variantes et
          documentation client.           <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, options et notices d’entretien ; le dimensionnement hydraulique, la sécurité
            réglementaire et les prix signés restent sous votre responsabilité professionnelle. Toujours valider avec un
            terrain réel et vos habitudes de chiffrage.
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
            Le problème : entre conception et suivi client
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>pisciniste</strong> en Île-de-France ou Grand Paris : chaque projet combine étude de
            terrain, conception du bassin, équipements, <strong>devis technique</strong>, puis suivi des questions,
            variantes et documentation.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Le cycle « avant chantier » peut inclure :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Visite et contraintes (accès, réseaux, voisinage).',
              'Conception : dimensions, filtration, traitement, options.',
              'Rédaction du devis et des variantes.',
              'Suivi commercial : relances, questions, ajustements.',
              'Documentation : mise en service, entretien, conseils au client.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sans méthode, une part importante du temps part en <strong>rédaction et reformulation</strong> — au détriment de
            la prospection et du suivi de chantier.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour vos devis et documentation
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour : premiers jets de devis structurés, scénarios de variantes, fiches
            entretien et FAQ, brouillons de mails clients — à partir des paramètres que vous fournissez et sous votre
            validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis technique structuré</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Tableaux par lot, postes et formulations — vous fixez les prix et les conditions.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Options et phasage</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Comparaisons de scénarios pour aider le client à décider — sans remplacer votre stratégie commerciale.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Documentation et suivi</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Guides d’entretien, FAQ, mails de suivi : gain de temps sur la mise en forme.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour adapter ces usages à votre processus de devis piscine.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : devis technique piscine
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : options et variantes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : documentation et entretien
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DOCUMENTATION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : suivi client et phasage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_SUIVI_CLIENT}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la complexité du projet et le temps de
            contrôle que vous conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif avant / après usage de l’IA sur un dossier piscine</caption>
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
                  <td className="p-3">Devis technique</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes</td>
                  <td className="p-3">Itératif</td>
                  <td className="p-3">Scénarios à valider</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Doc. / entretien</td>
                  <td className="p-3">Rédaction lourde</td>
                  <td className="p-3">Premiers jets</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Suivi client</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Mails cadrés</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures ou en chiffre d’affaires n’est garanti : tout dépend de votre volume de dossiers et de
            la qualité de vos relectures.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je gagne du temps sur la mise en forme des devis et des notices. Je reste vigilant sur les prix et la
              conformité — mais j’ai plus de disponibilité pour le client et les prospects. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Artisan pisciniste, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — piscinistes et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> les professionnels du BTP (artisans,
            dirigeants, fonctions techniques) pour utiliser ChatGPT sur la productivité (devis, documentation, appels
            d’offres). <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
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
            Devis piscine, variantes, documentation — démonstration sur un cas type. Sans engagement.
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
            Formation IA pisciniste — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-dirigeant-pme-btp', label: 'Formation IA dirigeant PME BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'IA appels d’offres BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
