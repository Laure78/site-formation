import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  createPageMetadata,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
  sitePhoneDisplaySuffix,
} from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

const PATH = '/formation-ia-electricien-btp';

const BTP01 = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'BTP-01')!;

/** Titre SEO — le layout ajoute « | Laure Olivié » via le template. */
const SEO_TITLE = 'Formation IA pour Électriciens BTP | Devis en 15 min';

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description:
    'Formation IA pour électriciens BTP. Devis en 15 min, emails clients, CR chantier automatisés. Qualiopi, finançable Constructys. Île-de-France. 1 592 pros formés.',
  path: PATH,
  keywords: [
    'formation IA électricien BTP',
    'ChatGPT devis électricité',
    'IA artisan électricien',
    'formation Qualiopi électricien',
    'Constructys formation électricien',
    'compte rendu chantier IA',
    'Île-de-France formation IA BTP',
  ],
  openGraphType: 'article',
  appendAuthorSuffix: false,
  article: {
    publishedTime: '2026-05-19',
    modifiedTime: '2026-05-19',
    author: 'Laure Olivié',
    section: 'Formations',
  },
  image: {
    url: '/images/formation-ia-electricien-btp.png',
    width: 1024,
    height: 682,
    alt:
      'Formation IA BTP en salle — présentation « L\'IA dans le BTP » (devis, chantier, organisation) avec Laure Olivié et des professionnels du bâtiment',
  },
});

const PROMPT_DEVIS_INSTALLATION = `Tu es un électricien qualifié en BTP pour une PME de 12 salariés
basée en Île-de-France.

Je dois rédiger un devis pour :
[Décrivez les travaux : type de chantier, surface, prestations]

Mes données de chiffrage :
- Fournitures : [liste avec références et prix HT]
- Main d'œuvre : [nombre d'heures × taux horaire]
- Déplacement : [forfait ou km]
- TVA applicable : [10 % rénovation / 20 % neuf]

Rédige un devis professionnel structuré avec :
1. En-tête (à compléter avec mes coordonnées)
2. Description détaillée des travaux par poste
3. Tableau fournitures + main d'œuvre + total HT/TTC
4. Conditions de règlement et délai d'exécution
5. Mentions légales (garantie décennale, assurance)

Vocabulaire électricité BTP : tableau, disjoncteur, circuit,
TGBT, câble, gaine, boîte de dérivation, mise à la terre.`;

const PROMPT_EMAIL_RECLAMATION = `J'ai reçu cette réclamation client : [collez le texte]

Contexte réel de ma part : [expliquez les faits en 5 lignes]

Rédige une réponse professionnelle de 150 à 200 mots qui :
- Accuse réception et reformule les faits de façon neutre
- Présente mon point de vue avec les éléments techniques
- Propose une solution concrète ou une date d'intervention
- Reste courtoise sans reconnaître de responsabilité non établie`;

const PROMPT_CR_INTERVENTION = `Je viens de terminer une intervention électrique.
Voici mes notes : [collez vos notes brutes]

Rédige un compte rendu d'intervention avec :
1. Date, lieu, client
2. Travaux réalisés (description technique précise)
3. Matériaux posés (avec références si fourni)
4. Tests et vérifications effectués
5. Réserves éventuelles ou travaux complémentaires conseillés
6. Signature (à compléter)

Format : une page A4 maximum. Ton professionnel.
Vocabulaire : mise en service, essais, conformité NF C 15-100.`;

const PROMPT_RELANCE_FACTURE = `Mon client [prénom nom] n'a pas réglé la facture N°[numéro]
de [montant] € TTC, échéance le [date].

C'est la [1ère / 2ème / 3ème] relance.

Rédige un email de relance adapté au rang :
- 1ère relance : ton courtois, rappel simple
- 2ème relance : ton ferme, mention des pénalités de retard
- 3ème relance : ton formel, mise en demeure avant action juridique

Inclus le montant des pénalités de retard légales (taux BCE + 10 points)
calculées à la date d'envoi de la relance.`;

const PROMPT_NOTICE_DOE = `Je dois remettre à mon client une notice simple sur
l'installation électrique que je viens de réaliser.

Installation réalisée : [description en 10 lignes]
Composants principaux : [tableau, disjoncteurs différentiels, etc.]
Puissance souscrite : [X] kVA

Rédige une notice de 1 à 2 pages expliquant :
1. Description générale de l'installation
2. Localisation des équipements principaux
3. Consignes de sécurité et d'utilisation
4. Entretien recommandé
5. Contacts d'urgence et numéro de votre entreprise

Langue claire et accessible pour un non-électricien.`;

const FAQ_ITEMS = [
  {
    q: "L'IA connaît-elle la norme NF C 15-100 ?",
    a: "ChatGPT et Claude connaissent les grandes lignes de la NF C 15-100 et peuvent l'utiliser dans vos prompts. Mais ils ne remplacent pas votre vérification technique : l'IA cite des règles générales, pas votre installation spécifique. Utilisez-la pour la rédaction des documents, pas pour le calcul des sections de câbles.",
  },
  {
    q: "Peut-on utiliser l'IA pour faire des devis en déplacement depuis le smartphone ?",
    a: "Oui. ChatGPT et Claude ont des applications mobiles. Le cas le plus courant après formation : prendre les notes de métré sur chantier (vocal ou texte), générer le devis depuis l'application pendant le trajet de retour, et l'envoyer au client dans la journée.",
  },
  {
    q: "L'IA peut-elle générer des devis avec les prix du marché actuels ?",
    a: "Non. L'IA ne connaît pas vos tarifs fournisseurs ni vos taux horaires. Elle structure et met en forme le devis à partir des données que vous lui donnez. Vous restez maître des prix.",
  },
  {
    q: "Est-ce que l'IA peut aider pour les dossiers ENEDIS ou CONSUEL ?",
    a: "L'IA peut vous aider à rédiger les courriers et descriptions techniques associés à un dossier ENEDIS ou CONSUEL. Elle ne remplit pas les formulaires officiels à votre place — mais elle structure les informations que vous devez y faire figurer.",
  },
  {
    q: 'La formation est-elle adaptée pour une PME avec plusieurs électriciens ?',
    a: "Oui. Une session intra dans vos locaux permet de former toute l'équipe ensemble. Avantage : tout le monde utilise les mêmes prompts et les mêmes méthodes — la productivité gagnée est immédiatement partagée dans l'entreprise.",
  },
  {
    q: 'Faut-il un abonnement payant à ChatGPT ou Claude ?',
    a: "Non pour commencer. La version gratuite de ChatGPT ou Claude suffit pour les devis et emails standards. Pour les entreprises qui génèrent plusieurs dizaines de documents par semaine, la version payante (20 €/mois) est rentabilisée dès la première heure économisée.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: "Le problème : combien d'heures l'électricien perd sur l'administratif ?" },
  { href: '#la-solution', label: "Ce que l'IA change pour les électriciens BTP" },
  { href: '#usages', label: "5 cas d'usage concrets avec prompts" },
  { href: '#resultats', label: 'Tableau de gains de temps' },
  { href: '#programme', label: 'Programme de la formation BTP-01' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: 'FAQ — électriciens et IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA gratuit' },
];

function getElectricienCourseJsonLd() {
  const base = getCourseSchema({
    name: BTP01.name,
    description: BTP01.description,
    path: PATH,
    providerName: SITE_CONFIG.legalName,
    teaches: BTP01.teaches,
    courseCode: 'BTP-01',
    educationalLevel: 'Beginner',
    timeRequired: 'PT4H',
    areaServed: ['France', 'Île-de-France'],
  });
  return {
    ...base,
    offers: {
      '@type': 'Offer',
      price: TARIF_FORFAIT_DEBUTANT_HT,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.url}${PATH}`,
      category: 'Formation professionnelle',
    },
  };
}

export default function FormationIaElectricienBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  const courseJsonLd = getElectricienCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={courseJsonLd} id="jsonld-course-btp01-electricien" />
      <JsonLd data={faqSchema} id="jsonld-faq-electricien" />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA électricien BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour Électriciens BTP —{' '}
          <span className="text-[#377CF3]">Devis, Emails et CR en 15 minutes</span>
        </h1>
        <p className="mt-4 text-lg italic text-slate-600">
          Laure Olivié · OFC Création d&apos;Entreprise · Qualiopi · Finançable Constructys
        </p>
        <p className="mt-6 text-xl text-slate-600">
          Devis en 15 minutes, <strong>emails clients</strong> et <strong>comptes rendus</strong> automatisés : formez
          vos équipes à l&apos;IA sans remplacer l&apos;expertise terrain. <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> — <strong>Île-de-France</strong>.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA ne fait pas les métrés ni le choix du câblage : elle structure devis, courriers et documents à
            partir de vos données — vous vérifiez les chiffres et vous signez. Programme aligné sur{' '}
            <strong>BTP-01</strong> — « L&apos;IA au service du bâtiment ».
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[#377CF3] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Combien d&apos;heures l&apos;électricien perd sur l&apos;administratif chaque semaine ?
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Un électricien qualifié, qu&apos;il soit à son compte ou salarié d&apos;une PME, passe en moyenne{' '}
              <strong>6 à 10 heures par semaine</strong> sur des tâches qui n&apos;ont rien à voir avec
              l&apos;installation électrique : rédiger des devis, répondre à des emails clients, préparer des comptes
              rendus, remplir des documents de réception, gérer les relances. Pour un artisan qui travaille 45 heures
              par semaine, c&apos;est entre <strong>13 et 22 %</strong> de son temps.
            </p>
            <p>
              Ces tâches sont indispensables — elles structurent la relation client, conditionnent le paiement et
              protègent contractuellement. Mais leur rédaction est répétitive, chronophage, et peut être largement
              automatisée.
            </p>
            <p className="font-medium text-slate-900">
              Les 3 points de douleur que les électriciens citent le plus souvent en formation :
            </p>
            <p>
              <strong>Les devis.</strong> Un devis d&apos;installation électrique complète (tableau, circuits, prises,
              éclairage) prend 1 h 30 à 3 h à rédiger avec précision — fournitures, main d&apos;œuvre, TVA 10 % sur la
              rénovation, TVA 20 % sur le neuf, variantes. Avec l&apos;IA et un prompt calibré, ce temps tombe à{' '}
              <strong>15 à 20 minutes</strong>.
            </p>
            <p>
              <strong>Les emails clients.</strong> Répondre à une réclamation, expliquer un surcoût, relancer une
              facture impayée, confirmer un chantier — chaque email est différent, et chacun prend 15 à 25 minutes à
              rédiger correctement. L&apos;IA réduit ce temps à <strong>2 à 3 minutes</strong>.
            </p>
            <p>
              <strong>Les documents de réception.</strong> PV de réception, DOE simplifié, notice d&apos;utilisation
              pour le client — des documents que l&apos;électricien remet rarement par manque de temps, et qui le
              protègent pourtant en cas de litige. L&apos;IA permet de les produire en <strong>10 minutes</strong> à
              partir de ses notes.
            </p>
          </div>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que l&apos;IA change pour les électriciens BTP
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>
              L&apos;intelligence artificielle — ChatGPT, Claude AI — ne connaît pas votre installation électrique.
              Elle ne fait pas les métrés, ne vérifie pas la puissance du tableau, ne choisit pas le câblage à la place
              de votre technicien. Ce qui reste entièrement de votre ressort.
            </p>
            <p>
              En revanche, elle est exceptionnellement utile pour tout ce qui concerne la{' '}
              <strong>rédaction et la structuration de documents</strong> à partir d&apos;informations que vous possédez
              déjà : les fournitures que vous avez sélectionnées, les heures que vous avez comptées, les travaux que
              vous avez réalisés.
            </p>
            <p>
              Le principe est simple : vous lui donnez vos données brutes, elle les met en forme. Vous vérifiez les
              chiffres, vous signez.
            </p>
          </div>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            5 cas d&apos;usage concrets avec prompts calibrés électricité
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Usage 1 — Devis d&apos;installation électrique
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS_INSTALLATION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Usage 2 — Email de réponse à une réclamation client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL_RECLAMATION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Usage 3 — Compte rendu d&apos;intervention
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CR_INTERVENTION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Usage 4 — Relance facture impayée
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RELANCE_FACTURE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Usage 5 — Notice de remise en main client (DOE simplifié)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_NOTICE_DOE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Tableau de gains de temps — électriciens BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les ordres de grandeur ci-dessous sont <strong>pédagogiques</strong> : ils illustrent le type de gain
            observé lorsque la méthode est appliquée avec relecture systématique.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparaison temps sans IA et avec IA pour les tâches administratives des électriciens
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-[#F2F2F2]">
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Tâche
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Sans IA
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Avec IA
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Gain
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis installation complète</td>
                  <td className="p-3">1 h 30 à 3 h</td>
                  <td className="p-3 font-medium text-[#377CF3]">15 à 20 min</td>
                  <td className="p-3">−85 %</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Email client (réponse/réclamation)</td>
                  <td className="p-3">15 à 25 min</td>
                  <td className="p-3 font-medium text-[#377CF3]">2 à 3 min</td>
                  <td className="p-3">−85 %</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">CR d&apos;intervention</td>
                  <td className="p-3">20 à 40 min</td>
                  <td className="p-3 font-medium text-[#377CF3]">5 à 8 min</td>
                  <td className="p-3">−80 %</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Relance facture impayée</td>
                  <td className="p-3">15 à 20 min</td>
                  <td className="p-3 font-medium text-[#377CF3]">2 à 3 min</td>
                  <td className="p-3">−85 %</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Notice DOE simplifié</td>
                  <td className="p-3">45 à 60 min</td>
                  <td className="p-3 font-medium text-[#377CF3]">8 à 12 min</td>
                  <td className="p-3">−80 %</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-semibold text-slate-900">Total semaine type</td>
                  <td className="p-3 font-semibold">4 à 6 h</td>
                  <td className="p-3 font-semibold text-[#377CF3]">40 à 60 min</td>
                  <td className="p-3 font-semibold">−85 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme de la formation BTP-01</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>L&apos;IA au service du bâtiment — spécialisation électricité</strong>
            <br />
            Référence : BTP-01 · Débutant · 4 h · {TARIF_FORFAIT_DEBUTANT_HT} € HT/participant ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <h3 className="mt-6 font-display text-lg font-semibold text-slate-900">Objectifs pédagogiques</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600 leading-relaxed">
            <li>Rédiger un devis électricité en 15 minutes avec ChatGPT</li>
            <li>Produire un email client professionnel en 3 minutes</li>
            <li>Générer un CR d&apos;intervention depuis vos notes brutes</li>
            <li>Créer votre bibliothèque de prompts réutilisables (devis, emails, relances)</li>
            <li>Gérer la confidentialité de vos données clients</li>
          </ul>
          <h3 className="mt-6 font-display text-lg font-semibold text-slate-900">Public</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Électriciens qualifiés, chefs d&apos;équipe, assistantes de PME électricité BTP. Aucun prérequis
            informatique.
          </p>
          <h3 className="mt-6 font-display text-lg font-semibold text-slate-900">Format</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600 leading-relaxed">
            <li>
              <strong>Intra</strong> dans vos locaux en Île-de-France
            </li>
            <li>
              <strong>Inter</strong> en sessions collectives Île-de-France
            </li>
            <li>
              <strong>Distanciel</strong> par visio
            </li>
          </ul>
          <p className="mt-6">
            <Link
              href="/formations/ia-au-service-du-batiment"
              className="inline-flex items-center gap-2 font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Voir le programme complet
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys 2026</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Plafonds et taux Constructys selon la taille d&apos;entreprise
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-[#F2F2F2]">
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Entreprise
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Coût pédagogique
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Salaires
                  </th>
                  <th scope="col" className="p-3 font-semibold text-slate-900">
                    Max intra/jour
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">&lt; 11 salariés</td>
                  <td className="p-3">24 € HT/h/stagiaire</td>
                  <td className="p-3">15 € HT/h/stagiaire</td>
                  <td className="p-3">840 € HT/groupe</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">11 à 50 salariés</td>
                  <td className="p-3">24 € HT/h/stagiaire</td>
                  <td className="p-3">10 € HT/h/stagiaire</td>
                  <td className="p-3">840 € HT/groupe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-slate-600 leading-relaxed shadow-sm">
            <p className="font-semibold text-slate-900">Exemple pour un électricien indépendant (1 salarié)</p>
            <p className="mt-2">
              Formation inter 4 h · 100 € HT — Constructys prend en charge 96 € HT (24 € × 4 h × 1) + 60 € de salaires
              (15 € × 4 h). Reste à charge : 4 € HT.
            </p>
            <p className="mt-4">
              <strong>Condition :</strong> demande sur eGestion 15 jours avant la formation. OFC constitue le dossier
              avec vous.
            </p>
          </div>
          <p className="mt-6">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="inline-flex items-center gap-2 font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Guide financement Constructys
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <RdvLink className="inline-flex items-center gap-2 font-semibold text-[#377CF3] underline hover:no-underline">
              Réserver mon diagnostic IA BTP
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </RdvLink>{' '}
            — 30 minutes pour cadrer vos cas et le financement Constructys.
          </p>
        </aside>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — électriciens BTP et IA</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  <FAQAnswer content={a} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Laure Olivié est formatrice IA et ChatGPT pour les entreprises du bâtiment et des travaux publics. Son
            organisme <strong>OFC Création d&apos;Entreprise</strong> est certifié <strong>Qualiopi</strong>, basé à
            Guyancourt (Yvelines, 78), et référencé par la <strong>FFB Grand Paris</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sa singularité : <strong>7 ans de direction d&apos;entreprise en travaux publics</strong> (ALIA BTP,
            2017-2024) avant de créer OFC. Elle forme les électriciens avec le vocabulaire et les contraintes de terrain
            qu&apos;elle connaît directement — pas depuis un manuel pédagogique.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>+{SITE_CONFIG.statsPersonnesFormees} professionnels formés</strong> · Note{' '}
            <strong>4,85/5</strong> · Qualiopi · FFB Grand Paris · FFB Île-de-France · CSFE
            · CNAM IDF · LinkedIn Learning
          </p>
          <p className="mt-6">
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Voir le parcours complet
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-bold text-slate-900">Articles liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 leading-relaxed">
            <li>
              <Link href="/blog/chatgpt-devis-electricien-btp" className="text-[#377CF3] underline hover:no-underline">
                ChatGPT pour devis électricien : guide et prompts
              </Link>
            </li>
            <li>
              <Link
                href="/blog/ia-et-electricien-5-gains-de-temps-concrets"
                className="text-[#377CF3] underline hover:no-underline"
              >
                IA et électricien : 5 gains de temps concrets
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-conducteur-travaux-usages" className="text-[#377CF3] underline hover:no-underline">
                IA pour conducteur de travaux : 8 usages terrain
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-btp-ile-de-france" className="text-[#377CF3] underline hover:no-underline">
                Formation IA BTP Île-de-France
              </Link>
            </li>
            <li>
              <Link href="/blog/dossier-constructys-2026-etapes" className="text-[#377CF3] underline hover:no-underline">
                Constructys 2026 : monter son dossier en 20 min
              </Link>
            </li>
          </ul>
        </section>

        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[#377CF3] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Réservez votre diagnostic IA gratuit</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            30 minutes pour identifier les 3 tâches où l&apos;IA vous fera gagner le plus de temps cette semaine.
            Gratuit, sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
              Cas d&apos;usage adaptés aux électriciens BTP
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
              Garde-fous (normes, prix, confidentialité)
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
              Pistes de financement Qualiopi / Constructys
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] hover:bg-blue-50">
              Réserver mon diagnostic IA BTP
              <ArrowRight size={20} strokeWidth={2} aria-hidden />
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
            <Link href="/formations" className="underline hover:text-white">
              Catalogue formations
            </Link>
            {' · '}
            <Link href="/financement-constructys-formation-ia-btp" className="underline hover:text-white">
              Financement Constructys
            </Link>
            {' · '}
            Email :{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <p className="mt-10 text-sm italic text-slate-600 leading-relaxed">
          Laure Olivié — Formatrice IA BTP, OFC Création d&apos;Entreprise
          <br />
          Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Guyancourt (78)
          <br />
          06 95 66 18 18 · {SITE_CONFIG.email} ·{' '}
          <a href={SITE_CONFIG.url} className="text-[#377CF3] hover:underline">
            www.laureolivie.fr
          </a>
        </p>

        <section className="mt-14">
          <h2 className="font-display text-xl font-bold text-slate-900">Mentions légales</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            <strong>OFC Création d&apos;Entreprise</strong> — Laure Olivié · SIRET : {SITE_CONFIG.siret} · NDA Qualiopi
            11788515078 · {SITE_CONFIG.geo.streetAddress}, {SITE_CONFIG.geo.postalCode} {SITE_CONFIG.geo.city} · Email
            :{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#377CF3] hover:underline">
              {SITE_CONFIG.email}
            </a>
            {sitePhoneDisplaySuffix()} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[#377CF3] hover:underline">
              www.laureolivie.fr
            </a>
            <br />
            Organisme certifié Qualiopi · Formations finançables Constructys, FSE+ · TVA exonérée (article 261-4-4° du
            CGI pour formations en intra) selon conditions.
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formations/ia-au-service-du-batiment', label: 'Formation BTP-01 — IA au service du bâtiment' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/blog/chatgpt-devis-electricien-btp', label: 'Blog — ChatGPT devis électricien BTP' },
            { href: '/formation-ia-btp-ile-de-france', label: 'Formation IA BTP Île-de-France' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous Calendly' },
          ]}
        />
      </article>
    </div>
  );
}
