import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { CharteIaBtpDownloadBlock } from '@/components/ressources/CharteIaBtpDownloadBlock';
import { SommaireAncre } from '@/components/readability/SommaireAncre';
import { LINKS } from '@/lib/internal-links';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import {
  CHARTE_IA_BTP_CLAIMS_TO_VERIFY,
  CHARTE_IA_BTP_LEGAL_REVIEW_PENDING,
} from '@/lib/charte-ia-btp-legal';
import {
  CHARTE_IA_BTP_CONTENT_UPDATED_AT,
  CHARTE_IA_BTP_PAGE_PATH,
  CHARTE_IA_BTP_PDF_PAGE_COUNT,
} from '@/lib/charte-ia-btp-ressource';
import { OFC_EDITORIAL, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

const SOMMAIRE = [
  { label: 'Pourquoi une charte IA ?', anchor: 'pourquoi-charte' },
  { label: 'Contenu du modèle PDF', anchor: 'contenu-modele' },
  { label: 'Règles bureau et chantier', anchor: 'regles-chantier' },
  { label: 'Adapter la charte', anchor: 'adapter-charte' },
  { label: 'RGPD et règlement IA', anchor: 'rgpd-ai-act' },
  { label: 'Télécharger', anchor: 'telecharger-charte' },
  { label: 'Questions fréquentes', anchor: 'faq-charte' },
  { label: 'Textes de référence', anchor: 'sources-charte' },
  { label: 'Relecture juridique', anchor: 'relecture-juridique' },
] as const;

const TABLE_BTP = [
  {
    situation: 'Synthèse d’un CCTP',
    aide: 'Structurer les exigences, repérer les lots sensibles',
    controle: 'Vérifier droit de transmission, puis contrôler prescriptions dans la pièce originale',
  },
  {
    situation: 'Préparation d’un devis',
    aide: 'Proposer une structure, relire une formulation',
    controle: 'Contrôler quantités, unités, prix, exclusions avant validation et envoi',
  },
  {
    situation: 'Rédaction d’un compte rendu',
    aide: 'Organiser les faits et décisions à partir de notes',
    controle: 'Vérifier faits, responsables, échéances ; signaler les informations manquantes',
  },
  {
    situation: 'Préparation d’un DOE',
    aide: 'Lister les pièces et structurer le dossier',
    controle: 'Croiser avec les produits posés et les travaux réellement exécutés',
  },
  {
    situation: 'Documents de prévention',
    aide: 'Structurer une trame PPSPS ou un mode opératoire',
    controle: 'Validation par un profil compétent en prévention, sur la base du chantier réel',
  },
] as const;

function Callout({
  title,
  children,
  variant = 'default',
}: {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'vigilance';
}) {
  const border = variant === 'vigilance' ? 'border-amber-500' : 'border-[#377CF3]';
  return (
    <aside className={`mt-6 rounded-xl border-l-4 ${border} bg-[#F2F2F2] p-5`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">{title}</p>
      <div className="mt-2 text-slate-800 leading-relaxed">{children}</div>
    </aside>
  );
}

export function CharteIaBtpGuidePage() {
  const cover = RESSOURCES_MINIATURES.charteIaPmeBatiment;
  const maillage = getMaillageRessourceConfig(CHARTE_IA_BTP_PAGE_PATH);

  return (
    <div className="min-h-screen bg-white">
      <div className="ofc-section-inner max-w-6xl pb-2 pt-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Ressources', href: LINKS.ressources },
            { label: 'Charte IA BTP', href: CHARTE_IA_BTP_PAGE_PATH },
          ]}
          jsonLdId="schema-breadcrumb-charte-ia-btp"
        />
      </div>

      {CHARTE_IA_BTP_LEGAL_REVIEW_PENDING ? (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="ofc-section-inner max-w-6xl py-3 text-sm leading-relaxed text-amber-950">
            <p className="font-semibold">Relecture juridique en cours</p>
            <p className="mt-1">
              Cette page et le PDF associé sont des supports pédagogiques et organisationnels. Les
              repères réglementaires du PDF{' '}
              <strong>n’ont pas été revérifiés de façon indépendante</strong> pour cette publication
              web. Ne les utilisez pas comme avis juridique. Voir la liste des points à contrôler
              en bas de page.
            </p>
          </div>
        </div>
      ) : null}

      <section
        className="border-b border-slate-200 bg-[#F2F2F2]"
        aria-labelledby="hero-charte-ia-btp"
      >
        <div className="ofc-section-inner pb-8 pt-6 md:pb-10 md:pt-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
                Guide pratique · Modèle PDF gratuit
              </p>
              <h1
                id="hero-charte-ia-btp"
                className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 md:text-[1.75rem] lg:text-2xl"
              >
                Charte IA dans le BTP : un modèle gratuit pour votre PME
              </h1>
              <p className="mt-4 max-w-2xl text-slate-700 leading-relaxed md:text-lg">
                Un conducteur transmet un CCTP à un assistant. Un métreur prépare un devis à partir
                d’un relevé. Une assistante rédige un compte rendu à partir de notes de chantier.
                Sans règles communes, chacun choisit son outil, ses documents et son niveau de
                contrôle.
              </p>
              <p className="mt-4 max-w-2xl text-slate-700 leading-relaxed">
                Une <strong>charte IA</strong> fixe ce cadre : outils autorisés, données
                transmissibles, validation humaine et procédure d’alerte — au bureau comme sur
                chantier. Ce guide présente le modèle PDF OFC ({CHARTE_IA_BTP_PDF_PAGE_COUNT}{' '}
                pages) à personnaliser avant diffusion dans votre entreprise.
              </p>
              <CharteIaBtpDownloadBlock className="mt-8" />
              <p className="mt-3 text-sm text-slate-600">
                PDF · {CHARTE_IA_BTP_PDF_PAGE_COUNT} pages · Sans inscription
              </p>
              <p className="mt-4">
                <a href="#pourquoi-charte" className={`text-sm font-semibold ${OFC_LINK}`}>
                  Découvrir le contenu
                </a>
              </p>
              <figure className="mt-8 max-w-xs lg:hidden">
                <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    className="h-auto w-full object-cover"
                    sizes="320px"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <figcaption className="mt-2 text-xs text-slate-500">
                  Couverture du fichier PDF hébergé sur ce site
                </figcaption>
              </figure>
            </div>
            <figure className="mx-auto hidden w-full max-w-xs lg:mx-0 lg:block lg:max-w-none lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl shadow-[0_20px_48px_-16px_rgba(55,124,243,0.22)] ring-1 ring-slate-200">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                  quality={75}
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-slate-500">
                Couverture du fichier PDF hébergé sur ce site
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="ofc-section-inner max-w-6xl py-10 md:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          <div className="mb-8 lg:mb-0">
            <SommaireAncre
              items={[...SOMMAIRE]}
              instanceId="charte-ia-btp-guide"
              heading="Sommaire"
            />
          </div>

          <article className={`min-w-0 max-w-3xl ${OFC_EDITORIAL}`}>
            <section id="pourquoi-charte" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Pourquoi mettre en place une charte IA dans une PME du bâtiment ?
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Dès qu’un outil reçoit des informations professionnelles ou produit un document
                utilisé dans l’activité, le risque n’est plus théorique. Un devis contient des prix
                et des coordonnées. Un dossier de consultation peut comporter des restrictions de
                diffusion. Une photo de chantier peut identifier des personnes. Une note de calcul
                engage au-delà de la qualité de sa rédaction.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                La charte donne un repère commun entre bureau et chantier : quels outils, quelles
                données, qui valide, comment signaler un incident. Elle harmonise les pratiques sans
                remplacer vos contrats marchés, votre DPO ou votre avis juridique.
              </p>
              <Callout title="À retenir">
                La charte traduit des choix d’organisation. Elle ne garantit pas à elle seule la
                conformité de l’entreprise au RGPD, au Code du travail ou au règlement européen sur
                l’IA.
              </Callout>
            </section>

            <section id="contenu-modele" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Que contient le modèle de charte IA à télécharger ?
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Le fichier PDF disponible sur cette page compte{' '}
                <strong>{CHARTE_IA_BTP_PDF_PAGE_COUNT} pages</strong>. D’après sa table des
                matières, il est structuré en deux parties complémentaires, plus des annexes
                opérationnelles :
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-relaxed">
                <li>
                  <strong>Salariés et chantiers</strong> — cinq réflexes, outils autorisés, usages
                  permis ou interdits, validation des ouvrages, données et incidents.
                </li>
                <li>
                  <strong>Direction et conformité</strong> — gouvernance, RGPD, dialogue social,
                  contrôles, règlement européen sur l’IA.
                </li>
                <li>
                  <strong>Fiche terrain</strong> (page dédiée) — cinq réflexes à afficher après
                  adaptation.
                </li>
                <li>
                  <strong>Exemples BTP</strong> — repères pour décider des contrôles selon le type
                  de document.
                </li>
                <li>
                  <strong>Registre des outils et usages autorisés</strong> — tableau à compléter.
                </li>
                <li>
                  <strong>Matrice de validation</strong> — qui contrôle et qui valide par famille
                  de livrables.
                </li>
                <li>
                  <strong>Checklist de déploiement</strong> — actions, responsables et échéances en
                  fin de document.
                </li>
                <li>
                  <strong>Sources et limites de vérification</strong> — références consultées et
                  points à faire valider localement.
                </li>
              </ul>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Ce modèle doit être personnalisé selon vos outils, vos usages et votre organisation
                avant sa diffusion. Ce n’est ni un formulaire PDF interactif, ni un modèle Word, ni
                un document officiel de la FFB — rédaction originale OFC Création d’Entreprise.
              </p>
            </section>

            <section id="regles-chantier" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Quelles règles prévoir au bureau et sur chantier ?
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Cinq principes reprennent la logique du modèle PDF :
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[#377CF3]">
                <li className="pl-1 leading-[1.7] text-slate-700">Utiliser les outils autorisés.</li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Protéger les informations transmises.
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Contrôler les résultats dans les sources.
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Faire valider les documents engageants.
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">Signaler les incidents.</li>
              </ol>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="min-w-[640px] w-full border-collapse text-left text-sm md:text-[0.95rem]">
                  <thead>
                    <tr className="bg-[#377CF3] text-white">
                      <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                        Situation BTP
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                        Aide possible de l’IA
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                        Contrôle attendu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_BTP.map((row) => (
                      <tr key={row.situation} className="border-t border-slate-200 odd:bg-white even:bg-[#F8FAFC]">
                        <th scope="row" className="px-4 py-3.5 align-top font-semibold text-slate-900 sm:px-5">
                          {row.situation}
                        </th>
                        <td className="px-4 py-3.5 align-top text-slate-700 leading-relaxed sm:px-5">
                          {row.aide}
                        </td>
                        <td className="px-4 py-3.5 align-top text-slate-700 leading-relaxed sm:px-5">
                          {row.controle}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Callout title="Point de vigilance" variant="vigilance">
                L’IA ne remplace pas la vérification technique ni l’examen des conditions réelles du
                chantier. Pour les plans et calculs de sécurité, une seconde réponse IA ne constitue
                pas un contrôle professionnel.
              </Callout>
            </section>

            <section id="adapter-charte" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Comment adapter cette charte à votre entreprise ?
              </h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 marker:font-semibold marker:text-[#377CF3]">
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Recenser les outils et usages réels (bureau et chantier).
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Définir les données admises et exclues pour chaque outil.
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Désigner les responsables et validateurs par type de document.
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Examiner les formalités applicables (social, règlement intérieur, contrats
                  fournisseurs).
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Former les utilisateurs et diffuser les consignes (fiche terrain incluse).
                </li>
                <li className="pl-1 leading-[1.7] text-slate-700">
                  Organiser la mise à jour lors d’un changement d’outil, de contrat ou de risque
                  identifié.
                </li>
              </ol>
              <Callout title="Exemple chantier">
                Test simple : un salarié sait-il à qui demander avant d’envoyer un document de
                chantier dans un nouvel outil ? Si la réponse n’est pas claire, la charte n’est pas
                encore utilisable sur le terrain.
              </Callout>
            </section>

            <section id="rgpd-ai-act" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Charte IA, RGPD et règlement européen : repères à faire valider
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Cette section oriente votre travail avec un juriste ou un DPO. Elle{' '}
                <strong>ne valide pas</strong> les formulations détaillées du PDF, ni les
                calendriers réglementaires qu’il contient.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                En principe, aucun texte n’impose à toute PME du bâtiment un document intitulé «
                charte IA ». L’usage de l’IA peut en revanche croiser le RGPD, le Code du travail et,
                selon les systèmes, le règlement (UE) 2024/1689 — à qualifier cas par cas.
              </p>
              <h3 className="mt-8 font-display text-lg font-semibold text-slate-900">
                Données personnelles
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Lorsque des données identifiantes sont traitées, les principes du{' '}
                <a
                  href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr"
                  className={OFC_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  règlement (UE) 2016/679
                </a>{' '}
                (finalité, base légale, minimisation) et les guides de la{' '}
                <a
                  href="https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative"
                  className={OFC_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CNIL sur l’IA générative
                </a>{' '}
                sont des points de départ — pas une check-list automatique de conformité.
              </p>
              <h3 className="mt-8 font-display text-lg font-semibold text-slate-900">
                Règlement européen sur l’IA
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Le PDF aborde notamment l’
                <a
                  href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4"
                  className={OFC_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  article 4
                </a>{' '}
                (mesures de maîtrise) et un calendrier d’application.{' '}
                <strong>Ces éléments doivent être recoupés</strong> avec EUR-Lex, le rôle de votre
                entreprise (déployeur, fournisseur…) et la version consolidée en vigueur au moment
                du déploiement.
              </p>
              <h3 className="mt-8 font-display text-lg font-semibold text-slate-900">
                Dialogue social et formalités internes
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Information-consultation, règlement intérieur, publicité des règles : les articles du
                Code du travail cités dans le PDF (par ex.{' '}
                <a
                  href="https://code.travail.gouv.fr/code-du-travail/l2312-8"
                  className={OFC_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  L. 2312-8
                </a>
                ,{' '}
                <a
                  href="https://code.travail.gouv.fr/code-du-travail/l1321-5"
                  className={OFC_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  L. 1321-5
                </a>
                ) s’appliquent selon votre effectif et la nature des dispositions — à confirmer
                professionnellement.
              </p>
              <Callout title="Point de vigilance" variant="vigilance">
                Un abonnement payant à un outil IA ne garantit pas la confidentialité. Distinguez
                toujours obligation légale, recommandation et règle interne proposée dans le modèle.
              </Callout>
            </section>

            <section id="telecharger-charte" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Télécharger votre modèle de charte IA BTP
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Vous y trouverez les parties salariés et direction, la fiche terrain, les exemples
                BTP, le registre des outils, la matrice de validation, la checklist de déploiement et
                les sources. Téléchargement gratuit, sans inscription.
              </p>
              <CharteIaBtpDownloadBlock className="mt-6" />
            </section>

            <section id="faq-charte" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Questions fréquentes
              </h2>
              <dl className="mt-6 space-y-8">
                <div>
                  <dt className="font-semibold text-slate-900">
                    À quoi sert une charte IA dans le bâtiment ?
                  </dt>
                  <dd className="mt-2 text-slate-700 leading-relaxed">
                    Elle fixe les outils autorisés, les données utilisables, les contrôles humains et
                    la procédure d’alerte — pour aligner bureau et chantier avant qu’un document
                    sensible ne parte dans un compte non cadré.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Une charte IA est-elle obligatoire ?</dt>
                  <dd className="mt-2 text-slate-700 leading-relaxed">
                    Non pour le libellé « charte » en tant que tel. Oui pour l’esprit : sécuriser les
                    traitements de données, respecter les marchés et cadrer les usages lorsque
                    l’IA traite des informations professionnelles.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    Peut-on transmettre un CCTP à ChatGPT ou à Claude ?
                  </dt>
                  <dd className="mt-2 text-slate-700 leading-relaxed">
                    Cela dépend des droits sur le document, des obligations du marché et de l’outil
                    autorisé par l’entreprise. Le nom du service ne suffit pas : vérifiez paramètres
                    et contrat de la formule utilisée.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    Qui doit vérifier les documents produits avec l’IA ?
                  </dt>
                  <dd className="mt-2 text-slate-700 leading-relaxed">
                    La personne qui engage l’entreprise sur le fond : direction ou études de prix
                    pour un devis, conducteur ou chargé d’affaires pour un CR, profil compétent pour
                    un document de prévention. L’IA prépare ; l’humain valide.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    Comment adapter ce modèle à son entreprise ?
                  </dt>
                  <dd className="mt-2 text-slate-700 leading-relaxed">
                    Complétez les champs du PDF, recensez les usages réels, nommez validateurs et
                    référent, puis faites examiner les formalités sociales et juridiques avant
                    diffusion. La checklist de déploiement en page 19 structure le suivi.
                  </dd>
                </div>
              </dl>
            </section>

            <section id="relecture-juridique" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Relecture juridique — points à contrôler
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Le PDF joint contient des repères réglementaires datés au{' '}
                {new Date(CHARTE_IA_BTP_CONTENT_UPDATED_AT).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                dans sa rédaction OFC.{' '}
                <strong>
                  Laure Olivié / OFC Création d’Entreprise ne les présente pas comme validés
                  juridiquement sur cette page.
                </strong>{' '}
                Avant diffusion interne, faites contrôler notamment :
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 leading-relaxed">
                {CHARTE_IA_BTP_CLAIMS_TO_VERIFY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {CHARTE_IA_BTP_LEGAL_REVIEW_PENDING ? (
                <p className="mt-4 text-sm text-slate-600">
                  Tant que la relecture n’est pas terminée, cette URL est en{' '}
                  <strong>brouillon SEO</strong> (<code className="text-xs">noindex</code>,{' '}
                  <code className="text-xs">follow</code>).
                </p>
              ) : null}
            </section>

            <section id="sources-charte" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Textes de référence (liens)
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Liens utiles pour votre propre vérification — sans garantie d’exhaustivité ni de mise
                à jour automatique par rapport au PDF.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                <li>
                  <a
                    href="https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    CNIL — Questions-réponses IA générative
                  </a>{' '}
                  (18 juillet 2024)
                </li>
                <li>
                  <a
                    href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    RGPD — règlement (UE) 2016/679
                  </a>
                </li>
                <li>
                  <a
                    href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Commission européenne — article 4 du règlement sur l’IA
                  </a>
                </li>
                <li>
                  <a
                    href="https://code.travail.gouv.fr/code-du-travail/l2312-8"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Code du travail — L. 2312-8
                  </a>
                </li>
                <li>
                  <a
                    href="https://code.travail.gouv.fr/code-du-travail/l1321-5"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Code du travail — L. 1321-5
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ffbatiment.fr/actualites-batiment/actualite-ba/charte-ethique-ia-proposee-ffb"
                    className={OFC_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    FFB — charte éthique IA (présentation publique)
                  </a>{' '}
                  — le modèle OFC ne reproduit pas le document intégral FFB et n’en bénéficie pas
                  d’une validation.
                </li>
              </ul>
            </section>

            <section id="formation-charte" className="mt-14 scroll-mt-28 border-t border-slate-200 pt-10">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
                Former les équipes sur leurs cas concrets
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Une charte utile se vit en atelier : repérer les informations à retirer d’un
                document, contrôler un compte rendu, vérifier un devis préparé avec l’IA. J’anime
                des formations IA appliquées au BTP en présentiel en Île-de-France, à partir de vos
                documents et de vos processus.
              </p>
              <p className="mt-4">
                <Link href={LINKS.formations} className={`font-semibold ${OFC_LINK}`}>
                  Découvrir les formations IA BTP
                </Link>
                {' · '}
                <Link href={LINKS.prendreRdv} className={`font-semibold ${OFC_LINK}`}>
                  Réserver une visio découverte
                </Link>
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Besoin cadré :{' '}
                <a href="mailto:contact@laureolivie.fr" className={OFC_LINK}>
                  contact@laureolivie.fr
                </a>{' '}
                — indiquez les métiers concernés sans joindre de document confidentiel.
              </p>
            </section>
          </article>
        </div>
      </div>

      {maillage ? (
        <MaillageRessourceFromConfig config={maillage} currentPath={CHARTE_IA_BTP_PAGE_PATH} />
      ) : null}
    </div>
  );
}
