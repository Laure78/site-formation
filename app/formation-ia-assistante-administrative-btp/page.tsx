import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { CTA_RDV_LABEL, CtaRdv } from '@/components/CtaRdv';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { getFAQSchema, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;
const PATH = '/formation-ia-assistante-administrative-btp';

export const metadata = createMetierBtpPageMetadata('assistante administrative', {
  title: 'IA admin & gestion BTP — courriers',
  description:
    'Formation IA pour le BTP : assistantes admin et de gestion — courriers, facturation, relances, DGD, DC4. Présentiel IDF, Qualiopi, OPCO selon éligibilité.',
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'formation IA assistante administrative BTP',
    'formation IA assistante de gestion BTP',
    'ChatGPT secrétariat bâtiment',
    'IA courriers professionnels BTP',
    'IA facturation BTP',
    'IA relance impayés BTP',
    'responsable administratif BTP IA',
    'OPCO Constructys',
    'Qualiopi BTP',
  ],
  openGraphType: 'website',
});

const PROMPT_COURRIERS = `Rédige 3 courriers types (PME BTP, Île-de-France) :

Courrier 1 — Relance fournisseur (1ère relance, friendly) :
Contexte : fournisseur (Matériaux Région) a promis 50 radiateurs pour le 15/04, on est le 20/04. Zéro nouvelle.
Ton : professionnel mais friendly, pas agressif. "On rappelle gentiment, c'est urgent pour notre chantier qui démarre lundi."

Courrier 2 — Relance client impayé (facture 30j) :
Contexte : facture FAC-2024-312 datée 15/03, due 15/04, pas reçu le paiement. Relance courtoises.
Ton : pro, courtois, rappelle les conditions de paiement, demande paiement rapide, propose virement.

Courrier 3 — Courrier à assurance client (sinistre) :
Contexte : dégât d'eau lors chantier (tuyau oublié ouvert par ouvrier), client menace de réclamer.
Ton : pro, rassure, explique qu'on assume responsabilité, qu'on va arranger.

Pour chaque courrier :
- En-tête + date automatique
- Formule d'ouverture courtoises
- Contexte clair en 2-3 lignes
- Demande/action explicite
- Signature type

Format : prêt à imprimer ou envoyer email.`;

const PROMPT_RELANCES = `Crée un plan de relance clients impayés (PME BTP, avril 2026) avec ces données :

Clients impayés :
- ABC Immobilier : facture 4 500€ TTC datée 15/03, due depuis 15/04, pas de paiement
- Syndic Guyancourt : facture 2 100€ TTC datée 01/04, due depuis 01/05, pas de paiement
- Particulier Dupont : facture 1 200€ TTC datée 10/04, due 24/04, relancé une fois, promesse demain

Plan doit contenir :
1. Tableau impayés : client, montant, délai, nb relances, prochaine action
2. Calendrier relances : qui relancer quand ? (j0 friendly mail, j+10 appel phone, j+20 courrier formel, j+30 final notice)
3. Template relances (différentes étapes : friendly, insistant, formel, final)
4. Suivi : relances effectuées, réactions clients, résolutions

Format : plan 1-2 pages, avec templates prêts à copier-coller.`;

const PROMPT_RAPPORT_CHANTIER = `Crée un rapport d'avancement chantier pro (client externe) à partir de ces notes :

Notes du conducteur de travaux :
"Jour 12 : maçonnerie quasi finie, électricité en cours, plomberie pas encore. Météo ralenti matin pluie. Pb : fenêtres pas arrivées, en retard 3j. Planning : si fenêtres arrivent mercredi, on rattrape le délai. Équipes : 8 ouvriers présents, bon ambiance."

Rapport doit contenir :
1. Résumé avancement par corps de métier (% complété)
2. Problèmes/obstacles (fenêtres retardées, météo)
3. Prévisions semaine prochaine
4. Points pour client (si nécessaire)
5. Signature avec date + conducteur

Format : pro, 1 page, lisible pour client qui reçoit, pas d'alarmisme juste les faits.`;

const PROMPT_TABLEAU_BORD = `Crée un tableau de bord administratif (PME BTP, mois d'avril) avec ces données :

Facturations avril :
- Chantier A : facture 12 500€ (reçu paiement)
- Chantier B : facture 8 700€ (impayé, relancé)
- Chantier C : facture 4 200€ (reçu paiement partiel 2 000€)
- Total CA : 25 400€, encaissé 23 400€, impayé 2 000€

Impayés cumulés (depuis janvier) : 5 200€ sur 87 000€ CA (6% du CA)

Commandes/fournisseurs :
- 50 radiateurs commandés le 08/04, attendus 20/04, arrivés le 22/04 (retard 2j)
- Câbles électriques commandés 15/04, attendus 20/04, pas encore (retard, relancer)

Tableau doit contenir :
1. Synthèse facturations (CA mensuel, encaissé, impayé, % encaissement)
2. Tendance impayés (j0 / j-30 / j-90)
3. Commandes en attente (fournisseur, délai, prochaine action)
4. RH : présences, absences, heures supplémentaires, paie en jour
5. Recommandations (quoi suivre de près, quoi est bon)

Format : 1-2 pages Excel, lisible pour patron.`;

const PROMPT_DC4 = `Tu es assistante de gestion / responsable administratif pour une entreprise BTP, entreprise principale sur un marché [public/privé].
Contrat de sous-traitance joint ci-dessous :
[Collez le contrat ou ses éléments clés]
Pré-remplis un formulaire DC4 (Acte Spécial de Sous-Traitance) avec les rubriques suivantes :
A. Identification entreprise principale
B. Identification sous-traitant (raison sociale, SIRET, adresse, n° URSSAF, assurance décennale, Probtp si BTP)
C. Nature des prestations sous-traitées (descriptif précis + lot concerné)
D. Montant TTC de la sous-traitance + taux TVA applicable (rappel : autoliquidation si sous-traitance BTP soumise au régime de l'article 283 du CGI)
E. Modalités de paiement
F. Modalités de règlement direct au sous-traitant si marché public
Préciser toutes les rubriques où des informations manquent au contrat.`;

const PROMPT_CONTROLE_FACTURE = `Tu es responsable administratif BTP. Aide-moi à contrôler cette facture fournisseur.

Données :
- Devis initial : [réf + montant HT + postes]
- Bon de commande : [réf + montant]
- BL reçu : [quantités / % livrés]
- Facture : [réf + montant facturé]

Produis :
1. Tableau comparatif devis / commande / BL / facture (montants et % livrés)
2. Liste des écarts à vérifier avant validation
3. Questions à poser au fournisseur ou au conducteur si besoin
N'invente aucune donnée absente. Rappelle que la validation comptable reste humaine.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT comprend-il les normes de facturation BTP (mentions légales, DEEE, TFPB, etc.) ?',
    a: "L'IA peut rappeler des listes de mentions courantes et structurer un brouillon. Les obligations exactes (TVA, assurances, déchets, formalités) dépendent de votre situation : validez toujours avec votre expert-comptable ou votre logiciel de facturation certifié.",
  },
  {
    q: "L'IA peut-elle pré-remplir un DC4 ou un DGD à ma place ?",
    a: "Elle peut proposer une structure et pré-remplir des rubriques à partir du contrat ou des situations que vous fournissez — jamais signer ni remplacer le contrôle juridique et comptable. Les champs manquants doivent être signalés explicitement.",
  },
  {
    q: "L'IA va-t-elle remplacer les assistantes administratives ou les RAF ?",
    a: "Non. L'IA accélère la rédaction et la mise en forme ; la relation avec les clients, l'historique de l'entreprise et le traitement des cas particuliers restent humains.",
  },
  {
    q: 'Comment financer la formation si je suis assistante administrative salariée ?',
    a: "OFC Création d'Entreprise est un organisme certifié Qualiopi et enregistré Constructys. Le financement dépend de votre employeur et des règles du plan de développement des compétences — aucune promesse de « zéro reste à charge » sans étude de dossier.",
  },
  {
    q: "ChatGPT peut-il m'aider avec la paie et RH ?",
    a: "Pour des brouillons et des synthèses : plannings, procédures, idées de texte. La paie légale et les bulletins définitifs relèvent de votre expert-comptable ou de votre outil habilité.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On travaille en français, avec des prompts et des trames à adapter à vos courriers et à votre ton d'entreprise.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : paperasse, courriers et tâches répétitives' },
  { href: '#la-solution', label: 'La solution : l’IA pour vos tâches administratives' },
  { href: '#usages-gestion', label: 'Usages gestion : facturation, DC4, DGD' },
  { href: '#specificites-btp', label: 'Spécificités BTP : TVA, sous-traitance, paie' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — admin, gestion et RAF BTP' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

export default function FormationIaAssistanteAdministrativeBtpPage() {
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
        <span className="text-slate-900">Formation IA assistante administrative BTP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA assistante administrative &amp; gestion BTP —{' '}
          <span className="text-[var(--accent)]">courriers, facturation et DGD</span>
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600">
          Sessions en présentiel en Île-de-France — pour les <strong>assistantes administratives</strong>,{' '}
          <strong>assistantes de gestion</strong> et <strong>responsables administratifs (RAF)</strong> des PME
          BTP : courriers, mails, relances, facturation d&apos;avancement, DC4, DGD, synthèses et suivi
          bureau–chantier. Distinct de la{' '}
          <Link href={LINKS.formationIaAssistanteTravaux} className="font-medium text-[var(--accent)] hover:underline">
            formation IA assistante travaux
          </Link>{' '}
          (PPSPS, CR, DOE, suivi de marché).
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à rédiger des brouillons de courriers, relances, situations d’avancement et synthèses ;
            vous gardez la validation du fond, du ton et des obligations légales (facturation, paie, TVA,
            sous-traitance). Relire avant tout envoi officiel.
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
            Le problème : paperasse, courriers et tâches répétitives
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>assistante administrative</strong>, <strong>assistante de gestion</strong> ou{' '}
            <strong>responsable administratif</strong> dans une <strong>PME BTP</strong> en Île-de-France ou Grand
            Paris : facturation, relances, courriers, suivi fournisseurs, documentation chantier, mails et dossiers
            divers.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">La semaine charge souvent :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Facturation et suivi des paiements, relances.',
              'Courriers aux fournisseurs, clients, assureurs.',
              'Relances et coordination des commandes.',
              'Suivi de chantier : comptes rendus, tableaux, information client.',
              'Divers : contrats, RH, demandes internes selon l’entreprise.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sans méthode, le volume répétitif peut occuper une grande partie de la journée — au détriment du suivi de fond
            et de l’amélioration des processus.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour vos tâches administratives
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour : brouillons de courriers et relances, plans de relance structurés,
            synthèses de notes chantier, tableaux de bord à partir des données que vous fournissez.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. Courriers et relances
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous décrivez le contexte ; l’IA propose un ton adapté — vous ajustez avant envoi.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Relances clients (impayés)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Modèles par étape (courtois → ferme) — dans le respect du droit et de la politique interne.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Suivi chantiers et rapports
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Mise en forme professionnelle à partir de notes terrain — validation par le conducteur ou la direction si
            besoin.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            4. Synthèses et tableaux de bord
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vue d’ensemble pour la direction à partir de chiffres saisis par vos soins — pas de substitution à la
            comptabilité.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <CtaRdv variant="inline" origin="page-inline-rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline" />{' '}
            — 30 minutes pour adapter ces usages à votre administratif BTP.
          </p>
        </aside>

        <section id="usages-gestion" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Usages gestion : facturation, DC4, DGD et sous-traitance
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Au-delà des courriers, le back-office BTP concentre des tâches chiffrées où l&apos;IA accélère la mise
            en forme — sans accéder à votre logiciel ni signer à votre place :
          </p>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Relance impayé gradée</strong> (rappel amiable → courrier formel → mise en demeure) à partir
              de vos données de facturation.
            </li>
            <li>
              <strong>Facturation d&apos;avancement</strong> : structure de situation mensuelle à partir des %
              par lot que vous fournissez.
            </li>
            <li>
              <strong>Pré-remplissage DC4</strong> à partir du contrat de sous-traitance, avec champs manquants
              signalés.
            </li>
            <li>
              <strong>Synthèse des attestations</strong> sous-traitants (URSSAF, Probtp, décennale) pour contrôle
              documentaire.
            </li>
            <li>
              <strong>DGD préformaté</strong> à partir des situations mensuelles et pièces jointes.
            </li>
            <li>
              <strong>Contrôle facture / BL vs devis</strong> : tableau d&apos;écarts avant validation comptable.
            </li>
            <li>
              <strong>Éléments variables de paie</strong> (heures sup., IH, paniers) depuis relevés — brouillon
              uniquement.
            </li>
            <li>
              <strong>Mémoire de réclamation</strong> ou montage de dossier (Qualibat / RGE) : plan et structure,
              validation métier obligatoire.
            </li>
          </ol>
        </section>

        <section id="specificites-btp" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Spécificités BTP : TVA, sous-traitance, paie chantier
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Des règles métier que l&apos;IA doit connaître pour être utile — et que la formation intègre dans les
            prompts :
          </p>
          <ul className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <li>
              <strong>Autoliquidation TVA sous-traitance BTP</strong> (article 283-2 nonies du CGI) : un prompt mal
              cadré peut produire une mention de TVA invalide.
            </li>
            <li>
              <strong>Caisses congés payés BTP (CNETP / CIBTP)</strong> et <strong>Probtp</strong> : cotisations
              spécifiques à rappeler dans les synthèses RH.
            </li>
            <li>
              <strong>Intempéries (IH)</strong> et majorations d&apos;heures supplémentaires selon la convention
              collective Bâtiment.
            </li>
            <li>
              <strong>Retenue de garantie</strong> sur marchés publics : 5 %, libérée en deux tranches (réception /
              DGD).
            </li>
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            L&apos;IA propose ; l&apos;expert-comptable, le dirigeant ou le RAF valide avant envoi ou saisie
            logicielle.
          </p>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : courriers et relances
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_COURRIERS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : plan de relances clients impayés
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RELANCES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : suivi chantiers et rapports
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RAPPORT_CHANTIER}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : tableau de bord administratif mensuel
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TABLEAU_BORD}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : pré-remplissage DC4 (sous-traitance)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DC4}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 6 : contrôle facture / BL vs devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CONTROLE_FACTURE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>fortement variables</strong> selon la taille de l’entreprise et le
            temps de relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif avant / après usage de l’IA sur tâches administratives</caption>
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
                  <td className="p-3">Courriers / relances</td>
                  <td className="p-3">Rédaction longue</td>
                  <td className="p-3">Brouillons rapides</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Plan impayés</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Structuré</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rapports chantier</td>
                  <td className="p-3">Mise en forme lente</td>
                  <td className="p-3">Synthèse aidée</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Tableau de bord</td>
                  <td className="p-3">Manuel</td>
                  <td className="p-3">Vue proposée</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les gains en heures par jour ou par mois ne sont pas garantis : tout dépend du volume de dossiers et des
            validations internes.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « J’ai réduit le temps passé sur les relances et les courriers types. Je me concentre davantage sur
              l’organisation et le suivi — en gardant la main sur ce qui part au client ou au fournisseur. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Assistante administrative, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — admin, gestion et RAF BTP</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
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
            Courriers, relances, rapports chantier, synthèses — démonstration sur des cas types. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50" />
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
            Formation IA assistante administrative &amp; gestion BTP — Île-de-France &amp; Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <RelatedLinks
          path={PATH}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={[LINKS.formationIaAssistanteTravaux]}
        />

        <LiensConnexes
          currentPath={PATH}
          excludeHrefs={[
              ...getClusterRelatedHrefs(PATH),
              LINKS.formationIaAssistanteTravaux,
              LINKS.formations,
              LINKS.financement,
            ]}
          />

        <AllerPlusLoin
          links={[
            { href: LINKS.formationIaAssistanteTravaux, label: 'Formation IA assistante travaux — PPSPS, CR, DOE' },
            { href: LINKS.formations, label: 'Catalogue formations IA pour les pros du BTP' },
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
          ].filter((l) => !getClusterRelatedHrefs(PATH).includes(l.href))}
        />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />
      </article>
    </div>
  );
}
