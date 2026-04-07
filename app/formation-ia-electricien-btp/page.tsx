import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const PATH = '/formation-ia-electricien-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA pour Électriciens — Laure Olivié, Formatrice BTP',
  description:
    'Découvrez comment les électriciens du BTP gagnent 5h/semaine avec ChatGPT. Devis automatisés, appels d’offres optimisés, administratif simplifié. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'Formation IA électricien BTP',
    'ChatGPT électricien',
    'IA artisan électricien',
    'automatiser devis électricité',
    'formation ChatGPT BTP',
    'IA devis électricité',
    'OPCO Constructys électricien',
    'formation Qualiopi électricien',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Tu es un expert en rédaction de devis pour un électricien artisan BTP. 
Voici mes infos :
- Entreprise : [Votre nom]
- Localisation : [Ville/région]
- Spécialités : [Ex : neuf, rénovation, TCE, petit appareillage]
- Tarif horaire main-d'œuvre : [€]
- Délai de validité : 30 jours
- Conditions de paiement : 50% acompte, solde à réception

Crée un devis professionnel, complet et attrayant (pas génériques) à partir de ces infos :
- Nature du travail : [décrire le chantier]
- Fournitures nécessaires : [lister rapidement]
- Durée estimée : [heures]
- Client : [nom]
- Localisation du chantier : [adresse]

Le devis doit être:
- Structuré en postes clairs (matériaux, main-d'œuvre, frais généraux)
- Professionnel et persuasif
- Conforme aux attentes des maîtres d'ouvrage publics/privés
- Prêt à imprimer et signer`;

const PROMPT_MEMOIRE = `Tu es un consultant spécialisé dans la rédaction de mémoires techniques pour les appels d'offres électrique BTP.

Contexte :
- Entreprise : [Votre nom/SIREN]
- Secteurs d'expertise : [Ex : rénovation résidentielle, neuf tertiaire, TCE, installation VMC]
- Effectif : [nombre d'électriciens]
- Certifications : [RGE, Qualiopi, etc.]
- Références clients : [exemples de chantiers réussis]

Plan demandé (adapté au DCE) :
1. Présentation de l'entreprise (expertise, références)
2. Compréhension du lot électrique (prestations demandées)
3. Moyens humains et techniques (qui fait quoi, planning)
4. Sécurité/environnement (PPSPS, assurances)
5. Délais et phasage

Crée un mémoire technique structuré de 15-20 pages, persuasif et conforme aux standards DCE.`;

const PROMPT_EMAIL = `Rédige un email professionnel pour un électricien artisan BTP.
Contexte : [Ex : "Je dois relancer un client à qui j'ai envoyé un devis il y a 10 jours, il n'a pas encore réagi. Je veux lui proposer de discuter des détails du chantier pour affiner le devis"]

Ton : professionnel, courtois, sans agressivité
Longueur : 200-250 mots

Le client : [nom + contexte court]

Génère l'email prêt à envoyer.`;

const FAQ_ITEMS = [
  {
    q: "L'IA va-t-elle remplacer les électriciens ?",
    a: "Non. L'IA remplace l'administratif répétitif (devis, emails, appels d'offres), pas le métier de l'électricien. Vous restez le spécialiste technique : diagnostic, pose, respect des normes, sécurité. L'IA vous fait gagner du temps sur le travail de bureau.",
  },
  {
    q: 'Faut-il être « bon en informatique » pour utiliser ChatGPT ?',
    a: "Non. ChatGPT fonctionne en langage naturel français. En formation, nous utilisons des templates de prompts prêts à copier-coller. En quelques heures, vous êtes autonome sur les usages utiles au quotidien.",
  },
  {
    q: 'Est-ce que mes clients vont savoir que mes devis sont générés par l’IA ?',
    a: "Non. Un devis généré puis relu et validé par vous reste un document professionnel comme un autre : c'est votre contenu, votre tarification — l'IA n'est que l'outil de rédaction.",
  },
  {
    q: 'Quelle est la durée de la formation ?',
    a: "Les formats OFC vont d'une journée (8 h) à deux jours (16 h) selon le parcours. Nous proposons aussi du sur mesure en intra, adapté à votre activité (neuf, rénovation, TCE, etc.).",
  },
  {
    q: 'Peut-on financer la formation avec Constructys ?',
    a: "Oui. OFC Création d'Entreprise est certifiée Qualiopi et enregistrée auprès de Constructys. La prise en charge dépend des règles de votre branche et de votre entreprise. Nous vous accompagnons sur le dossier.",
  },
  {
    q: 'Qu’est-ce que je vais exactement apprendre dans la formation ?',
    a: "Présentation de ChatGPT et cas d'usage électricien BTP, prompts devis et emails, structuration de contenu, appels d'offres et mémoires techniques, bonnes pratiques de sécurité et de validation des sorties IA.",
  },
  {
    q: 'Avez-vous des références dans mon secteur (électriciens) ?',
    a: "Oui : artisans électriciens, conducteurs de travaux, responsables administratifs de PME électricité. Interventions dans le réseau FFB, CAPEB, CSFE. Vous pouvez demander une mise en relation avec un professionnel formé.",
  },
];

export default function FormationIaElectricienBtpPage() {
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
        <span className="text-slate-900">Formation IA électricien BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour électriciens —{' '}
          <span className="text-[var(--accent)]">gagnez 5 h/semaine sur l’administratif</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          <strong>Formation IA électricien BTP</strong> : ChatGPT et l’IA pour les{' '}
          <strong>devis</strong>, les <strong>appels d’offres</strong> et l’<strong>administratif</strong>, sans
          remplacer votre expertise terrain. Qualiopi, finançable Constructys.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            Les électriciens BTP qui utilisent ChatGPT sur les tâches rédactionnelles (devis, relances, mémoires
            techniques) gagnent souvent plusieurs heures par semaine — à condition de valider chiffres, normes et
            engagements. Formation pratique avec Laure Olivié (OFC Création d’Entreprise).
          </ShortAnswerBlock>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : l’électricien perd 2 h par jour sur l’administratif
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes électricien artisan ou conducteur de travaux électrique dans le BTP. Votre quotidien ressemble
            souvent à ceci :
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Chaque devis peut prendre une longue durée à rédiger : estimation du matériel, calcul du temps, mise en page, envoi au client.',
              'Les appels d’offres demandent des jours de travail administratif au lieu de vous concentrer sur la technique.',
              'Les emails professionnels (relances, précisions, paiement) se retapent à la main.',
              'Les erreurs de devis coûtent cher : quantités, oublis de postes, marge qui s’évapore.',
              'Entre le chantier, l’administratif et la prospection, le temps manque.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Résultat ?</strong> Charge de travail élevée, fatigue, et opportunités commerciales laissées de côté
            faute de temps pour répondre à tous les marchés. C’est un enjeu récurrent pour les artisans électriciens en
            2026 : plus de chantiers rime souvent avec plus de papier.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : ChatGPT et l’IA pour électriciens — viser 5 h gagnées par semaine
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’IA (ChatGPT, Claude, Gemini) automatise les tâches répétitives. Votre vocabulaire métier est structuré :
            c’est un atout pour obtenir des brouillons exploitables.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            1. Devis accélérés : structurer au lieu de repartir de zéro
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous donnez les paramètres (nature des travaux, client, prestations, cadre tarifaire) ; l’IA propose une
            structure de devis et des formulations — vous fixez les prix et la marge. Exemple type : décrire une
            intervention en quelques phrases, puis obtenir un premier jet à retravailler en quelques minutes.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>Ordre de grandeur</strong> : sur plusieurs devis par semaine, le gain cumulé sur la rédaction peut
            représenter plusieurs heures — selon votre volume et votre méthode.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            2. Appels d’offres : mémoire technique structuré plus vite
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Les DCE sont volumineux. L’IA aide à structurer le mémoire technique à partir de vos moyens, références et
            compréhension du lot — vous gardez la validation finale et la cohérence avec le prix.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            3. Emails et relances en quelques secondes
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Relances, demandes de précision, prospection : l’IA rédige un premier jet professionnel que vous personnalisez
            avant envoi.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            4. Moins d’erreurs administratives, meilleure lisibilité des marges
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Une checklist et une relecture systématique limitent les oublis de postes ou les malentendus sur le cahier
            des charges — sous votre responsabilité.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Vous voulez voir ça en action ?</p>
          <p className="mt-2 text-slate-600">
            <RdvLink className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </RdvLink>{' '}
            — je vous montre comment adapter ces techniques à votre activité d’électricien et comment financer la
            formation avec Constructys.
          </p>
        </aside>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 3 étapes pour utiliser l’IA comme électricien
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : votre prompt « devis électrique » réutilisable
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous préparez une fois le contexte entreprise (tarifs, conditions, spécialités). Ensuite, chaque nouveau
            devis s’appuie sur ce cadre.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Étape 2 : template mémoire technique pour les AO
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MEMOIRE}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Étape 3 : emails de relance et prospection
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL}
          </pre>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Résultats : ce que constatent les électriciens formés à l’IA
          </h2>
          <div className="mt-8 space-y-8">
            <blockquote className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700 italic leading-relaxed">
                « Avant, je passais 50 h/semaine : 30 h de chantier, 20 h d’administratif. Après la formation IA de
                Laure, je fais 30 h de chantier et 10 h d’administratif. J’ai repris les appels d’offres que je refusais
                avant. »
              </p>
              <footer className="mt-4 text-sm font-medium text-slate-900">— Marie, électricienne artisan en rénovation (Île-de-France)</footer>
            </blockquote>
            <blockquote className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700 italic leading-relaxed">
                « Nous répondons à beaucoup plus d’appels d’offres depuis la formation. L’IA structure le mémoire
                technique et on gagne des jours à chaque réponse. »
              </p>
              <footer className="mt-4 text-sm font-medium text-slate-900">
                — Jean-Pierre, conducteur de travaux électrique TCE (Grand Paris)
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Synthèse indicative des gains observés en formation</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Métrique</th>
                  <th className="p-3 font-semibold text-slate-900">Avant</th>
                  <th className="p-3 font-semibold text-slate-900">Après</th>
                  <th className="p-3 font-semibold text-slate-900">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Temps devis / semaine</td>
                  <td className="p-3">5 h</td>
                  <td className="p-3">1 h 30</td>
                  <td className="p-3 font-medium text-[var(--accent)]">~70 % de temps gagné</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Appels d’offres / trimestre</td>
                  <td className="p-3">2 à 3</td>
                  <td className="p-3">8 à 12</td>
                  <td className="p-3 font-medium text-[var(--accent)]">Plus d’opportunités</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Temps administratif / semaine</td>
                  <td className="p-3">15 h</td>
                  <td className="p-3">8 h</td>
                  <td className="p-3 font-medium text-[var(--accent)]">~7 h par semaine</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Erreurs devis / an</td>
                  <td className="p-3">6 à 8</td>
                  <td className="p-3">1 à 2</td>
                  <td className="p-3 font-medium text-[var(--accent)]">Moins d’erreurs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Chiffres pédagogiques issus de retours de formation ; résultats variables selon votre organisation et votre
            volume d’activité.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Les résultats vous intéressent ?</p>
          <p className="mt-2 text-slate-600">
            <RdvLink className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </RdvLink>{' '}
            — nous analyserons votre administratif et estimerons vos gains potentiels.
          </p>
        </aside>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — électriciens BTP</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi vous former avec Laure Olivié
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Laure Olivié</strong> — formatrice IA & ChatGPT spécialisée BTP. Plus de{' '}
            <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du BTP formés, note de satisfaction
            moyenne <strong>4,85/5</strong>. Organisme certifié <strong>Qualiopi</strong> (NDA 11788515078), enregistré{' '}
            <strong>Constructys</strong>. Clients et partenaires : FFB, CAPEB, Lefebvre Dalloz, CNAM Entreprise,
            etc.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Approche 100 % pratique, vocabulaire BTP sans jargon inutile. Formation initiale électricité (CAP + BP) : le
            discours est ancré dans les réalités du terrain et de la norme.
          </p>
        </section>

        <section className="mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Prochaine étape : visio découverte gratuite (30 min)</h2>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Cas d’usage IA pour électriciens</li>
            <li>Estimation personnalisée du temps récupérable</li>
            <li>Financement Constructys : comment ça marche</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver sur Calendly
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              {SITE_CONFIG.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Email :{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-bold text-slate-900">Mentions légales</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            <strong>OFC Création d’Entreprise</strong> — Laure Olivié · SIRET : {SITE_CONFIG.siret} · NDA Qualiopi 11788515078 ·{' '}
            {SITE_CONFIG.geo.streetAddress}, {SITE_CONFIG.geo.postalCode} {SITE_CONFIG.geo.city} · Tél. :{' '}
            {SITE_CONFIG.phoneDisplay} · {SITE_CONFIG.email} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
              www.laureolivie.fr
            </a>
            <br />
            Organisme certifié Qualiopi · Formations finançables Constructys, FSE+ · TVA exonérée (article 261-4-4° du CGI
            pour formations en intra) selon conditions.
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-chatgpt-artisan-electricien', label: 'ChatGPT artisan électricien BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'IA appels d’offres BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
