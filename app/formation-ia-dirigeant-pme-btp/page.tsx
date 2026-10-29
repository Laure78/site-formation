import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { CTA_RDV_LABEL, CtaRdv } from '@/components/CtaRdv';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { getFAQSchema, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import {
  FORMATION_IA_PME_BTP_H1,
  FORMATION_IA_PME_BTP_INTRO,
  FORMATION_IA_PME_BTP_PARCOURS,
  FORMATION_IA_PME_BTP_SHORT_ANSWER,
  FORMATION_IA_PME_BTP_TACHES,
  formationIaPmeBtpMetadata,
  getFormationIaPmeBtpFaq,
} from '@/lib/formation-ia-dirigeant-pme-btp-config';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { VousEtesPlutotEncart } from '@/components/landing/VousEtesPlutotEncart';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { ParcoursEncadrerIaBlock } from '@/components/formations/ParcoursEncadrerIaBlock';

export const revalidate = 3600;
const PATH = LINKS.formationIaDirigeantPmeBtp;

export const metadata = formationIaPmeBtpMetadata();

const PROMPT_DEVIS_EXPRESS = `Crée un devis pour ce client (PME BTP, Île-de-France) :
- Prestation : remplacement 5 radiateurs gaz par pompe à chaleur air-air (climatisation réversible)
- Surface : maison 120m², étage + RDC
- État : radiateurs gaz 30 ans, chaudière à remplacer aussi
- Marque proposée : Daikin ou Mitsubishi (tu décides)
- Pose : 2 jours (1j installation + 1j tests + mise en eau)
- Budget client max : 9 500€ TTC
- Délai : 2 semaines
- Ton : pro, rassurant, explique les avantages PAC vs gaz

Devis doit contenir :
1. Description travaux (dépose radiateurs gaz, pose unité intérieure/extérieure, électricité spécialisée)
2. Équipements (PAC modèle, radiateurs de remplacement ou conservation tuyauterie)
3. Main-d'œuvre (jours ouvriers, qualifications)
4. Fournitures (câbles, raccords, thermostat)
5. Conditions (délai, paiement 1/3 avance, 1/3 mi-parcours, 1/3 livraison, assurance RTI)
6. Avantages : économies énergie estimées, silence, climatisation été, garantie constructeur

Format : tableau, clair, professionnel, prêt à imprimer ou envoyer email.`;

const PROMPT_PROSPECTION = `Rédige 3 mails de prospection "soft" (PME plomberie chauffage, Île-de-France) :

Email 1 — À un bâtiment collectif (syndic) :
Tu as lu qu'ils vont remplacer le chauffage. Propose-leur : "Audit gratuit du chauffage, on vous calcule économies possible, zero engagement."

Email 2 — À une agence immobilière locale :
Propose-leur : "Vous recommandez des entreprises chauffage/plomberie à vos clients ? On peut être référent local, garantie 5 ans, devis rapide."

Email 3 — À un précédent client (chantier 3 ans ago) :
Relance soft : "Ça va depuis nos travaux ? On vous propose diagnostic gratuit annuel si vous le souhaitez + conseil économies énergie."

Pour chaque email :
- 3-4 paragraphes max
- Pas de "achète mon truc" lourd, juste propose une conversation
- Ton chaleureux mais pro
- CTA clair (appel, visio, rendez-vous)

Format : prêt à envoyer.`;

const PROMPT_REPONSES_CLIENTS = `Rédige des réponses types (PME plomberie chauffage) :

Q1 — Client demande : "Combien de temps durent les radiateurs électriques ? Ils sont cher à l'entretien ?"
Réponse : [...] (explique durée, maintenance, comparaison économies vs chauffage gaz)

Q2 — Client demande : "Quel délai de visite pour devis chauffage maison ?"
Réponse : [...] (proposer 3 slots cette semaine, explique déroulement visite, ce qu'on regardé)

Q3 — Client demande : "Vous faites crédit ou financement ? Quel coût ?"
Réponse : [...] (propose option crédit 0%, explique conditions, durée max 60 mois)

Q4 — Client demande après chantier (1 semaine) : "Ça marche bien mais j'ai une question sur thermostat"
Réponse : [...] (rassure, explique fonctionnement, rappelle garantie 5 ans + SAV gratuit an 1)

Pour chaque réponse :
- Directe et rassurante
- Pas de bla-bla, juste l'info utile
- CTA clair (rappel, visite, confirmation, etc.)

Format : prêt à copier-coller dans les mails.`;

const PROMPT_TABLEAU_BORD = `Crée un tableau de bord activité (PME chauffage 8 salariés, mois de mars) :

Données brutes :
- Chantier 1 : 4 200€ HT facturé, 3 jours ouvrier, 1 jour patron, 12h camion/matériel
- Chantier 2 : 1 800€ HT, 2 jours ouvrier (moins compliqué)
- Chantier 3 : 6 500€ HT, 5 jours ouvrier, 2 jours patron, appel d'offres compliqué
- Chantier 4 : 2 300€ HT (travail déjà commencé mois dernier, phase 2)
- Total : 14 800€ HT + travail en cours
- Coût moyen ouvrier : 35€/h net (coût patron-comptable : 55€/h)
- Coût matériel/camion : 5% du CA

Tableau doit contenir :
1. Revenu par chantier (HT)
2. Coût de réalisation (main-d'œuvre + matériel)
3. Marge par chantier et marge moyenne
4. Rentabilité horaire (CA/heures ouvrier vs coût ouvrier)
5. Tendance mois vs mois précédent
6. Points d'amélioration (quels chantiers moins rentables et pourquoi)

Format : 1 page Excel, lisible pour vous (pour vrai piloter l'activité).`;

const SOMMAIRE = [
  { href: '#public-cible', label: 'À qui s’adressent les formations ?' },
  { href: '#taches-ia-btp', label: 'Quelles tâches du BTP avec l’IA ?' },
  { href: '#parcours-formations', label: 'Quel parcours selon le niveau et le métier ?' },
  { href: '#former-equipe', label: 'Former plusieurs collaborateurs (intra)' },
  { href: '#le-probleme', label: 'Du chantier à la paperasse en PME' },
  { href: '#la-solution', label: 'Usages concrets au quotidien' },
  { href: '#methode', label: 'Exemples de prompts ChatGPT' },
  { href: '#resultats', label: 'Retours de formation' },
  { href: '#faq', label: 'FAQ — PME du BTP et IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

export default function FormationIaDirigeantPmeBtpPage() {
  const faqItems = getFormationIaPmeBtpFaq();
  const faqSchema = getFAQSchema(faqItems);

  return (
    <div className="ofc-page-article ofc-editorial">
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">{FORMATION_IA_PME_BTP_H1}</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <VousEtesPlutotEncart
          currentAudience="Cette page présente l’offre IA pour les dirigeants et les équipes des PME du bâtiment et des travaux publics."
          href={LINKS.formationConducteurTravaux}
          linkLabel="Formation IA conducteur de travaux — conduite de travaux et suivi chantier"
        />
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-2xl">
          {FORMATION_IA_PME_BTP_H1}
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600 leading-relaxed">{FORMATION_IA_PME_BTP_INTRO}</p>

        <div className="mt-8">
          <ShortAnswerBlock>{FORMATION_IA_PME_BTP_SHORT_ANSWER}</ShortAnswerBlock>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={LINKS.formations}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Voir les formations
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={LINKS.contact}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
          >
            Échanger sur les besoins de votre équipe
          </Link>
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

        <section id="public-cible" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">À qui s’adressent les formations ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les sessions Laure Olivié (OFC Création d&apos;Entreprise, Qualiopi) s&apos;adressent aux{' '}
            <strong>PME du bâtiment et des travaux publics</strong> en Île-de-France — dirigeants et directions,
            conducteurs de travaux, chargés d&apos;affaires, métreurs et économistes, assistant(e)s travaux et
            administratifs, équipes appels d&apos;offres et fonctions support (QSE, achats, gestion).
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Pas de compétence informatique requise pour débuter : navigateur, documents métier et français écrit
            suffisent. Pour choisir selon le poste, consultez les{' '}
            <Link href={LINKS.parcoursMetiers} className="font-medium text-[var(--accent)] underline hover:no-underline">
              parcours par métier
            </Link>{' '}
            ou le{' '}
            <Link href={LINKS.formationIaBtp} className="font-medium text-[var(--accent)] underline hover:no-underline">
              hub formation IA pour le BTP
            </Link>
            .
          </p>
        </section>

        <section id="taches-ia-btp" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Sur quelles tâches du BTP utiliser l&apos;IA ?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En formation, on travaille sur des cas réels ou anonymisés : l&apos;IA propose des brouillons structurés ;
            votre équipe vérifie chiffrages, conformité technique et engagements avant envoi.
          </p>
          <ul className="mt-8 space-y-6">
            {FORMATION_IA_PME_BTP_TACHES.map(({ title, body, href, linkLabel }) => (
              <li key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{body}</p>
                <p className="mt-3">
                  <Link href={href} className="text-sm font-medium text-[var(--accent)] underline hover:no-underline">
                    {linkLabel}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="parcours-formations" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Quel parcours choisir selon le niveau et le métier ?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le catalogue Qualiopi est organisé en progression : initiation, perfectionnement sur les usages métier, puis
            création et déploiement d&apos;outils adaptés. Chaque fiche précise public, durée et prérequis — sans
            engagement sur le catalogue depuis cette page.
          </p>
          <ol className="mt-8 space-y-6">
            {FORMATION_IA_PME_BTP_PARCOURS.map(({ niveau, resume, href, label, duree }) => (
              <li key={niveau} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{niveau}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  <Link href={href} className="text-[var(--accent)] underline hover:no-underline">
                    {label}
                  </Link>
                  <span className="ml-2 text-base font-normal text-slate-600">· {duree}</span>
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{resume}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Exemples de perfectionnement métier :{' '}
            <Link href={LINKS.formationMaitriserClaudeAiBtp} className="font-medium text-[var(--accent)] underline">
              Maîtriser Claude AI pour le BTP
            </Link>
            ,{' '}
            <Link href={LINKS.formationIaAppelsOffresBtp} className="font-medium text-[var(--accent)] underline">
              appels d&apos;offres
            </Link>
            ,{' '}
            <Link href={LINKS.parcoursDirigeantPmeBtp} className="font-medium text-[var(--accent)] underline">
              parcours dirigeant PME BTP
            </Link>
            .
          </p>
        </section>

        <section id="former-equipe" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Comment organiser une formation pour son équipe ?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En <strong>intra-entreprise</strong>, la session se déroule chez vous ou dans un lieu convenu en
            Île-de-France : même programme Qualiopi, contenus adaptés à vos documents et à vos métiers présents dans
            la salle. En <strong>inter-entreprises</strong>, vos collaborateurs rejoignent une date du catalogue lorsque
            les places et le calendrier conviennent.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Pour cadrer effectifs, dates et financement OPCO, une visio découverte ou un message suffit — détail des
            modalités intra :{' '}
            <Link
              href={LINKS.formationIaIntraEntrepriseBtp}
              className="font-medium text-[var(--accent)] underline hover:no-underline"
            >
              formation IA intra-entreprise BTP
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CtaRdv origin="pme-btp-organiser-equipe" />
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-50"
            >
              Écrire à l&apos;équipe pédagogique
            </Link>
          </div>
        </section>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : du chantier à la paperasse BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En PME du bâtiment ou des travaux publics, dirigeants et encadrement cumulent chantiers, devis,
            facturation, coordination d&apos;équipes et prospection — souvent avec peu de marge pour l&apos;administratif
            et la réponse aux appels d&apos;offres.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Une semaine type peut charger :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Chantier : suivi des équipes et de la qualité.',
              'Devis et relances : demandes entrantes, visites, propositions, suivi.',
              'Coordination : planning, interfaces entre chantiers, imprévus.',
              'Administratif : facturation, relances, mails, dossiers.',
              'Prospection : souvent le parent pauvre faute de disponibilité.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Résultat fréquent : longues semaines, peu de temps pour vendre et piloter sereinement — d’où l’intérêt d’
            <strong>automatiser le rédactionnel</strong> sans déléguer votre jugement.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA au service des équipes PME BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour accélérer la mise en forme des devis, des mails et des synthèses — à partir
            des informations que vous fournissez et sous votre validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis structurés plus vite</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Après quelques questions cadrées sur le chantier, l’IA propose un premier jet de devis (postes, formulations) :
            vous ajustez prix, délais et clauses avant envoi.
          </p>
          <aside className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 italic">
            Exemple (fictif) : « Remplacement radiateurs gaz par PAC air-air, maison 120 m², budget cible, délai de pose »
            — l’IA aide à structurer le descriptif ; le chiffrage et la conformité restent votre ressort.
          </aside>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Prospection et relances (ton professionnel)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Brouillons de mails « soft », relances, rappels de valeur — à personnaliser avant envoi pour respecter le RGPD
            et votre image de marque.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Communication client</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Réponses types aux questions fréquentes (délais, garanties, financement) : vous gardez le dernier mot.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">4. Synthèses et pilotage</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            À partir de données que vous fournissez (CA chantiers, heures, coûts), l’IA peut proposer des tableaux et des
            indicateurs — à recouper avec votre comptabilité.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <CtaRdv variant="inline" origin="page-inline-rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline" />{' '}
            — 30 minutes pour voir comment adapter ces usages à votre PME BTP.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : devis express (exemple chauffage / PAC)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Temps potentiellement gagné sur la mise en forme : significatif selon vos habitudes — toujours relire les
            montants et les conditions.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS_EXPRESS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : prospection douce et relances
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PROSPECTION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : réponses types aux questions clients
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_REPONSES_CLIENTS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : tableau de bord rentabilité (données à fournir)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA propose une structuration ; les taux horaires, charges réelles et résultats définitifs doivent être
            validés avec vos chiffres internes et votre comptable.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TABLEAU_BORD}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — <strong>variables</strong> selon votre organisation et le temps de
            relecture que vous conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA sur tâches administratives</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Avant</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain indicatif</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis par dossier</td>
                  <td className="p-3">1 h 30 à 2 h</td>
                  <td className="p-3">~10 min + relecture</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Relances / prospection</td>
                  <td className="p-3">Plusieurs h/sem.</td>
                  <td className="p-3">Brouillons plus rapides</td>
                  <td className="p-3">Selon volume</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Questions clients</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Modèles à adapter</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Synthèse mensuelle</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Structuration aidée</td>
                  <td className="p-3">Selon données</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les bilans « X heures gagnées par semaine » sont des objectifs pédagogiques, pas une garantie de résultat.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant, j’étais trop pris par l’administratif pour vendre sereinement. Maintenant, je dégage du temps pour
              la prospection et le pilotage — avec des brouillons IA que je valide toujours avant envoi. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Dirigeant PME BTP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — PME du BTP et IA</h2>
          <div className="mt-8 space-y-6">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait />
<section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Voir en direct comment structurer un devis, des mails de prospection et une synthèse d’activité — sans
            engagement. Vous repartez avec des idées de prompts à adapter à votre entreprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50" />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href={LINKS.contact}
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
            {FORMATION_IA_PME_BTP_H1} — présentiel Île-de-France
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <ParcoursEncadrerIaBlock />

        <LiensConnexes
          currentPath={PATH}
          excludeHrefs={[LINKS.formations, LINKS.financement, LINKS.formationIaBtp]}
        />

        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations IA appliquées au bâtiment' },
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
          ]}
        />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />
      </article>
    </div>
  );
}
