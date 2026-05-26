import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { SCHEMA_GEO } from '@/lib/schema-constants';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import {
  AI_TOOL_CHATGPT_URL,
  AI_TOOL_CLAUDE_URL,
  AI_TOOL_MISTRAL_CHAT_URL,
  AI_TOOL_NOTEBOOKLM_URL,
} from '@/lib/ai-tools-external-urls';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';

const PATH = LINKS.guideConducteurTravauxIaBtp;
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;
/** Title SEO CMS complet : 78 car. — version ≤65 pour <title> / OG */
const META_TITLE_ABS = 'Guide IA CDT BTP : 6 outils CR, PPSPS, DCE | Laure Olivié';
const META_DESCRIPTION =
  "Automatisez 6 livrables critiques de conducteur de travaux (CR, PPSPS, DCE, DOE) avec l'IA. Méthode terrain, prompts, gains chiffrés. Finançable Constructys.";

const HERO_ALT =
  "Conducteur de travaux BTP utilisant l'IA sur tablette devant un chantier";

const PUBLISHED = '2026-05-12';
const WORD_COUNT = 3200;

export const metadata = createPageMetadata({
  title: META_TITLE_ABS,
  titleAbsolute: META_TITLE_ABS,
  description: META_DESCRIPTION,
  path: PATH,
  appendAuthorSuffix: false,
  openGraphType: 'article',
  article: {
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    author: SITE_CONFIG.name,
    section: 'Ressources IA BTP — Île-de-France & France',
  },
  image: {
    url: PHOTOS.btpFormationVisioChantier2026.src,
    width: PHOTOS.btpFormationVisioChantier2026.width,
    height: PHOTOS.btpFormationVisioChantier2026.height,
    alt: HERO_ALT,
  },
  openGraphTitle: META_TITLE_ABS,
  openGraphDescription: META_DESCRIPTION,
  category: 'Ressources',
});

const FAQ_ITEMS = [
  {
    q: 'Les livrables générés par l’IA ont-ils une valeur juridique ?',
    a: 'Oui, exactement la même que ceux rédigés à la main. La valeur juridique vient de la signature du dirigeant ou du conducteur de travaux, du respect des délais contractuels (5 à 8 jours pour un constat de retard, par exemple) et de l’envoi en LRAR avec accusé de réception. L’outil utilisé est sans incidence sur la force probante du document.',
  },
  {
    q: 'Faut-il être à l’aise avec l’informatique pour utiliser l’IA sur chantier ?',
    a: 'Non. Les conducteurs de travaux que je forme — y compris ceux qui n’avaient jamais utilisé ChatGPT — produisent leur premier compte rendu de chantier en moins de 30 minutes le jour de la formation. La méthode est progressive : on part de vos vrais documents et on bâtit ensemble vos prompts métier. Pas de jargon technique.',
  },
  {
    q: 'Combien de temps faut-il pour calibrer une méthode IA fiable sur un livrable ?',
    a: 'Comptez 30 à 45 minutes par livrable, à condition d’avoir rassemblé votre matière première (anciens documents, modèles internes, contraintes spécifiques). Le calibrage initial demande un peu de temps, mais s’amortit dès la deuxième utilisation. Au bout de 3 à 4 utilisations, les bons réflexes sont acquis et vous n’y pensez plus.',
  },
  {
    q: 'Mes données chantier restent-elles confidentielles ?',
    a: 'Sur les plans payants (ChatGPT Plus, Claude Pro, Mistral Pro), les éditeurs ne réutilisent pas le contenu des conversations pour entraîner leurs modèles. Pour les chantiers ultra-sensibles (défense, sites SEVESO, OIV), il est recommandé de travailler avec des données anonymisées dans les prompts et de vérifier que le règlement de consultation autorise l’usage d’outils IA externes.',
  },
  {
    q: 'Que se passe-t-il si l’IA rate une clause cachée dans un CCAP ?',
    a: 'Vous le signalez à l’outil : « Tu as oublié de relever la clause X page Y. Mémorise ce type de clause pour les prochaines analyses. » À chaque correction, la méthode devient plus précise. Au bout de 5 à 6 DCE, l’IA rate beaucoup moins de choses qu’un humain fatigué à 19 h. Mais sur les marchés que vous décidez de chiffrer, vous relisez le CCTP vous-même — c’est votre responsabilité.',
  },
  {
    q: 'Mon entreprise a moins de 11 salariés, suis-je éligible Constructys pour me former ?',
    a: 'Oui. Constructys finance le Plan de Développement des Compétences pour toutes les entreprises du bâtiment cotisantes. Pour 2026, le plafond pédagogique est de 24 € HT/h/stagiaire, avec maximum 840 € HT/jour/groupe en intra. Pour les entreprises de moins de 11 salariés, Constructys prend aussi en charge 15 € HT/h de salaires. La demande se fait via la plateforme eGestion (services.constructys.fr), 15 jours avant la formation.',
  },
  {
    q: 'Faut-il abandonner mon process actuel pour adopter l’IA ?',
    a: 'Non. La bonne approche est progressive : vous commencez par un seul livrable — souvent le compte rendu de chantier parce que c’est le plus chronophage — et vous gardez votre process habituel sur les autres. Une fois ce premier livrable maîtrisé, vous étendez à un deuxième. En 3 mois, vous avez automatisé vos 6 livrables critiques sans rupture brutale.',
  },
  {
    q: 'Que valent les formations IA généralistes pour un conducteur de travaux ?',
    a: 'Une formation IA généraliste apprend souvent à utiliser ChatGPT pour un email ou un résumé. En revanche, elle ne remplace pas des prompts calibrés pour un PPSPS R4532-64 ni la méthode pour faire signer un PV de levée de réserves au maître d’ouvrage. La formation OFC dédiée au terrain BTP travaille avec vos DCE, vos comptes rendus et vos PPSPS — pas avec des exemples génériques ; la fiche programme est accessible depuis la page formation IA conducteur de travaux (lien en tête de ce guide).',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${CANONICAL}#article`,
  headline: META_TITLE_ABS,
  description: META_DESCRIPTION,
  inLanguage: 'fr-FR',
  datePublished: `${PUBLISHED}T08:00:00+02:00`,
  dateModified: `${PUBLISHED}T08:00:00+02:00`,
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
  image: `${SITE_CONFIG.url.replace(/\/$/, '')}${PHOTOS.btpFormationVisioChantier2026.src}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  wordCount: WORD_COUNT,
  keywords: [
    'ia conducteur de travaux',
    'cr chantier ia',
    'ppsps ia',
    'dce ia btp',
    'doe ia',
    'formation IA pour les pro du BTP',
    'Guyancourt',
    'Île-de-France',
  ],
  about: [
    { '@type': 'Thing', name: 'Conducteur de travaux BTP' },
    {
      '@type': 'AdministrativeArea',
      name: SCHEMA_GEO.addressRegion,
      containedInPlace: { '@type': 'Country', name: 'France' },
    },
  ],
};

const prompt1 = `Tu es chargé d'affaires pour une entreprise BTP en [TON MÉTIER].
J'ai uploadé les pièces d'un DCE : CCAP, CCTP, RC, BPU, plans.

Génère une fiche d'analyse en 8 rubriques :
1. Identité du marché (objet, MOA, MOE, n° de marché)
2. Calendrier (date limite, durée d'exécution, démarrage)
3. Modalités de remise (plateforme, format, signature)
4. Critères de sélection avec leur pondération précise
5. Exigences techniques classées par priorité
6. Conditions financières (variantes, pénalités, retenue de garantie)
7. Pièces administratives à fournir
8. Points de vigilance (clauses inhabituelles, contraintes site)

Cite la page exacte du DCE pour chaque information.
Termine par un avis Go / No Go argumenté.`;

const prompt2 = `Tu es conducteur de travaux. Voici mes notes brutes de la semaine
[n° de semaine] sur le chantier [NOM]. Participants à la visite :
[LISTE NOMS + RÔLES].

Notes (format libre, abréviations OK) :
[COLLER NOTES VOCALES TRANSCRITES]

Structure un CR de chantier conforme aux 8 rubriques standard :
en-tête, avancement par lot (% vs planning), faits marquants,
réserves levées / émises, points de vigilance, décisions actées
(avec responsable + date butoir), prochaines étapes,
demandes en attente de réponse.

Mets en gras les décisions actées. Souligne les réserves nouvelles.
Calcule les écarts au planning en jours ouvrés. Ton factuel,
ni accusatoire ni conflictuel.`;

const prompt3 = `Tu es conducteur de travaux. Rédige un constat de retard en LRAR.

Contexte du chantier :
- Marché : [NOM] / MOA : [NOM] / MOE : [NOM]
- Lot : [NUMÉRO + INTITULÉ]
- Date du fait : [JJ/MM/AAAA] à [HH:MM]

Description du fait (3 à 5 lignes) :
[QUI, QUOI, OÙ, CONSÉQUENCE]

Type de retard : [intempéries / défaut MOA / coactivité / autre]
Conséquence : [N jours ouvrés d'arrêt]

Génère le courrier opposable : identification du marché,
horodatage précis, description circonstanciée, référence
contractuelle (CCAG-Travaux 2021 art. 19 ou clause CCAP),
chiffrage en jours ouvrés, demande explicite de prolongation
de délai. Ajoute la formule type :
« À défaut de réponse de votre part dans les 15 jours, nous
considérerons que la prolongation sollicitée est acquise
tacitement. »`;

export default function GuideConducteurTravauxIaBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-16" style={{ color: '#1A1A1A' }}>
      <JsonLd id="schema-article-guide-cdt-ia" schema={articleJsonLd} />
      {faqSchema ? <JsonLd id="schema-faq-guide-cdt-ia" schema={faqSchema} /> : null}

      <article className="mx-auto max-w-3xl px-4 pt-2">
        <header className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <Image
              src={PHOTOS.btpFormationVisioChantier2026.src}
              alt={HERO_ALT}
              width={PHOTOS.btpFormationVisioChantier2026.width}
              height={PHOTOS.btpFormationVisioChantier2026.height}
              className="h-full w-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-white/90">
                Ressource SEO · {formatProfessionalsTrainedCount()}{' '}
                professionnels formés — 12 mai 2026 · 11 min de lecture
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl lg:text-[1.85rem]">
                Guide du conducteur de travaux : 6 outils IA pour automatiser CR chantier, PPSPS, DCE et
                DOE
              </h1>
            </div>
          </div>
        </header>

        <div className="prose prose-neutral mt-10 max-w-none prose-a:text-[#377CF3] prose-headings:font-display prose-h2:text-[#377CF3]">
          <blockquote className="rounded-xl border-l-4 border-[#377CF3] bg-white/80 px-4 py-3 not-italic text-[#1A1A1A] shadow-sm">
            <p className="m-0 font-semibold text-[#377CF3]">En bref</p>
            <ul className="mb-0 mt-2">
              <li>
                Un conducteur de travaux BTP produit en moyenne{' '}
                <strong>47 documents administratifs critiques</strong> par chantier.
              </li>
              <li>
                <strong>6 livrables concentrent l’essentiel du temps bureau</strong> : analyse de DCE,
                PPSPS, compte rendu de chantier, constat de retard, PV de levée de réserves, DOE.
              </li>
              <li>
                Avec une méthode IA bien calibrée, vous récupérez{' '}
                <strong>30 à 50 heures de bureau par chantier</strong> — soit l’équivalent d’une semaine de
                travail par opération.
              </li>
              <li>
                Ce guide rassemble une méthode terrain validée auprès de{' '}
                <strong>+{SOCIAL_PROOF.PROFESSIONALS_TRAINED} professionnels formés</strong> (note{' '}
                {SOCIAL_PROOF.AVERAGE_RATING}), avec <strong>3 prompts prêts à l’emploi</strong> et le
                tableau des gains mesurés.
              </li>
              <li>
                <strong>Formation OFC</strong> : 4 heures, financement possible selon éligibilité (Constructys 2026) (24 € HT/h/stagiaire, plafonds du dispositif).
              </li>
            </ul>
          </blockquote>

          <nav aria-label="Sommaire" className="not-prose my-10 rounded-xl bg-white p-4 shadow-sm">
            <p className="m-0 font-display text-lg font-semibold text-[#377CF3]">Sommaire</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
              <li>
                <a href="#definition">Qu’est-ce que l’IA pour conducteur de travaux ?</a>
              </li>
              <li>
                <a href="#constat">Le constat terrain : 35 % du temps perdu en administratif</a>
              </li>
              <li>
                <a href="#livrables">Les 6 livrables critiques à automatiser</a>
              </li>
              <li>
                <a href="#gains">Tableau des gains de temps mesurés</a>
              </li>
              <li>
                <a href="#prompts">3 prompts prêts à l’emploi pour conducteur de travaux</a>
              </li>
              <li>
                <a href="#outils">Quel outil IA choisir : ChatGPT, Claude, Mistral, NotebookLM</a>
              </li>
              <li>
                <a href="#faq">FAQ : ce que les conducteurs de travaux demandent vraiment</a>
              </li>
              <li>
                <a href="#formation">Se former à l’IA chantier avec OFC</a>
              </li>
              <li>
                <a href="#sources">Sources réglementaires</a>
              </li>
            </ol>
          </nav>

          <h2 id="definition">Qu’est-ce que l’IA pour conducteur de travaux ?</h2>
          <p>
            <strong>
              L’IA pour conducteur de travaux désigne l’usage d’outils d’intelligence artificielle
              générative (ChatGPT, Claude, Mistral) pour automatiser la production des livrables
              administratifs d’un chantier BTP
            </strong>{' '}
            — analyse de DCE, rédaction du PPSPS, comptes rendus, constats, PV de levée, dossier des
            ouvrages exécutés.
          </p>
          <p>
            Concrètement, il ne s’agit pas de remplacer l’expertise terrain — c’est elle qui fait la
            différence sur un chantier. Il s’agit d’automatiser{' '}
            <strong>la mise en forme et la conformité documentaire</strong> pour rendre au conducteur de
            travaux ses heures de bureau.
          </p>
          <p>
            J’ai vécu ces journées qui finissent à 21 heures sur un compte rendu de chantier, après une
            visite de site à 7 h du matin. Pendant dix ans de travaux publics chez ALIA BTP, j’ai aussi
            vécu les CCTP de 80 pages qu’on lit en diagonale faute de temps, les PPSPS rédigés à la
            va-vite, les DOE qu’on assemble à la dernière minute. C’est précisément ce que l’IA permet
            de fluidifier — sans rien retirer à votre responsabilité de constatant et de décideur.
          </p>
          <p>
            C’est cette ligne nette qui rend l’usage de l’IA professionnel — et c’est ce qu’on travaille
            en détail dans le module dédié à l’
            <Link href={LINKS.formationConducteurTravaux} className="font-medium underline">
              IA pour conducteur de travaux en formation IA appliquée au bâtiment
            </Link>
            .
          </p>

          <h2 id="constat">Le constat terrain : 35 % du temps perdu en administratif</h2>
          <h3 className="text-lg font-semibold">Le poids réel de l’administratif sur un chantier</h3>
          <p>
            D’après une synthèse sectorielle publiée en 2024 sur la construction,{' '}
            <strong>un professionnel BTP passe environ 35 % de son temps en tâches administratives</strong>{' '}
            plutôt que sur le terrain. Sur un chantier moyen de 6 mois, cela représente :
          </p>
          <ul>
            <li>
              <strong>47 documents administratifs critiques</strong> à produire
            </li>
            <li>
              <strong>30 à 60 minutes de rédaction soignée par livrable</strong>
            </li>
            <li>
              <strong>150 à 200 heures cumulées de bureau</strong>, dont 60 à 80 sur le seul compte rendu
              hebdomadaire
            </li>
          </ul>
          <p>
            Et pourtant, une partie minoritaire des entreprises BTP structure encore l’IA dans leurs
            processus ; une partie significative des professionnels n’a pas encore expérimenté les grands
            modèles conversationnels — il reste une marge de progression immense sur le terrain.
          </p>

          <h3 className="text-lg font-semibold">Le coût caché des livrables négligés</h3>
          <p>Chaque livrable mal fait, en retard ou incomplet entraîne :</p>
          <ul>
            <li>
              <strong>Pénalités contractuelles</strong> — généralement 1/3 000ème ou 1/1 000ème du marché
              par jour de retard
            </li>
            <li>
              <strong>Retenue de garantie bloquée</strong> — 5 % du marché séquestrés sur 1 an (article 122
              du Code de la commande publique)
            </li>
            <li>
              <strong>Solde de chantier impayé</strong> tant que le DOE n’est pas remis (article 30 du
              CCAG-Travaux 2021)
            </li>
            <li>
              <strong>Sanctions liées au défaut de PPSPS</strong> — jusqu’à 9 000 € par travailleur non
              couvert en cas de manquement (article L4744-3 du Code du travail), avec risques juridiques en
              cas d’accident grave lié à une mise en œuvre défaillante
            </li>
          </ul>

          <h3 className="text-lg font-semibold">Ce que change l’IA dans le quotidien d’un CDT</h3>
          <p>L’IA prend en charge :</p>
          <ul>
            <li>
              L’<strong>extraction structurée</strong> d’information depuis un DCE de 200 pages
            </li>
            <li>
              La <strong>mise en forme normée</strong> d’un PPSPS conforme aux 9 rubriques R4532-64
            </li>
            <li>
              La <strong>transformation de notes vocales</strong> en compte rendu de chantier prêt à
              diffuser
            </li>
            <li>
              La <strong>rédaction d’un constat de retard</strong> en LRAR avec les bonnes références CCAG
            </li>
            <li>
              La <strong>compilation d’un sommaire de DOE</strong> indexé avec checklist des pièces
              manquantes
            </li>
          </ul>
          <p>L’IA ne fait pas — et ne doit pas faire :</p>
          <ul>
            <li>L’observation visuelle sur site</li>
            <li>La validation finale des faits constatés</li>
            <li>Les décisions Go / No Go</li>
            <li>La signature des actes juridiques</li>
          </ul>

          <h2 id="livrables">Les 6 livrables critiques à automatiser</h2>

          <h3 className="text-lg font-semibold">1. Analyse de DCE — 3 minutes au lieu de 4 heures</h3>
          <p>
            Un Dossier de Consultation des Entreprises complet pèse souvent <strong>50 à 200 Mo</strong>{' '}
            (CCAP, CCTP, RC, plans, BPU). Le lire intégralement prend en moyenne 4 heures. Sur les dossiers
            qui sortent chaque mois, vous ne pouvez pas tous les lire — résultat, vous choisissez au
            feeling et vous loupez des opportunités.
          </p>
          <p>
            Avec une méthode IA structurée, vous obtenez en 3 à 5 minutes une{' '}
            <strong>fiche d’analyse standardisée</strong> d’1 à 2 pages qui couvre :
          </p>
          <ul>
            <li>
              Les <strong>5 critères de sélection</strong> avec leur pondération exacte
            </li>
            <li>
              Les <strong>pénalités, retenues, clauses inhabituelles</strong>
            </li>
            <li>
              Les <strong>pièces administratives</strong> obligatoires (DC1, DC2, attestations)
            </li>
            <li>
              Un <strong>avis Go / No Go argumenté</strong> selon vos critères habituels
            </li>
          </ul>
          <p>
            Chaque information extraite doit citer la <strong>page exacte du DCE</strong> — c’est votre
            garantie en cas de litige : la fiche ne réinvente rien, elle reformule du sourcé.
          </p>
          <blockquote>
            <p>
              <strong>À retenir :</strong> l’IA filtre et priorise. Pour les marchés que vous décidez de
              chiffrer, vous relisez le CCTP vous-même — c’est votre responsabilité de dirigeant ou de chargé
              d’affaires.
            </p>
          </blockquote>

          <h3 className="text-lg font-semibold">2. PPSPS — 45 minutes au lieu de 4 heures</h3>
          <p>
            Le Plan Particulier de Sécurité et de Protection de la Santé est une{' '}
            <strong>obligation légale</strong> fixée par les articles{' '}
            <strong>R4532-56 à R4532-74 du Code du travail</strong>, issue de la loi du 31 décembre 1993
            transposant la directive européenne « chantiers temporaires ou mobiles ».
          </p>
          <p>
            Tout chantier soumis à coordination SPS — dès que 2 entreprises ou plus interviennent sur un même
            site — exige un PPSPS de chaque entreprise intervenante, remis au coordonnateur SPS avant le
            démarrage des travaux.
          </p>
          <p>
            L’IA bien calibrée vous permet de couvrir les <strong>9 rubriques obligatoires R4532-64</strong>{' '}
            en 45 minutes :
          </p>
          <ol>
            <li>Identification de l’opération et de l’entreprise</li>
            <li>Effectif prévisionnel et qualifications</li>
            <li>Description des travaux et modes opératoires</li>
            <li>Mesures de protection collective</li>
            <li>EPI individuels et formation associée</li>
            <li>Risques importés et risques exportés</li>
            <li>Premiers secours et procédure d’évacuation</li>
            <li>Hygiène (vestiaires, sanitaires, restauration)</li>
            <li>Mesures particulières de coactivité</li>
          </ol>
          <p>
            La clé : alimenter l’IA avec <strong>votre matrice de risques propre</strong>,{' '}
            <strong>vos modes opératoires types</strong> et <strong>vos EPI standards</strong> (avec leurs
            normes EN précises). Un PPSPS « copier-coller » est repéré en quelques minutes par un
            coordonnateur SPS expérimenté. La précision de votre matière fait toute la différence.
          </p>

          <h3 className="text-lg font-semibold">3. Compte rendu de chantier — 10 minutes au lieu de 2 heures</h3>
          <p>
            Le compte rendu de chantier hebdomadaire est <strong>un document contractuel</strong> dès qu’il
            est diffusé aux parties (MOA, MOE) sans contestation dans un délai raisonnable (généralement 8
            jours). Il fait foi pour les décisions actées, les réserves émises et l’avancement constaté.
          </p>
          <p>
            Sur 40 semaines de chantier, sa rédaction représente{' '}
            <strong>60 à 80 heures par an</strong>. Pour les conducteurs de travaux qui pilotent 3 à 5
            chantiers en parallèle, cela peut grimper à 200 heures annuelles.
          </p>
          <p>
            L’IA structure vos notes brutes (texte, vocal transcrit, photos) selon les{' '}
            <strong>8 rubriques standard</strong> d’un compte rendu professionnel :
          </p>
          <ol>
            <li>En-tête (n° chantier, date, participants à la visite)</li>
            <li>Avancement par lot ou phase (% réel vs planning)</li>
            <li>Faits marquants de la semaine</li>
            <li>Réserves levées et réserves émises</li>
            <li>Points de vigilance et risques identifiés</li>
            <li>Décisions actées (avec responsable + date butoir)</li>
            <li>Prochaines étapes (planning des 2 semaines à venir)</li>
            <li>Annexes (photos, plans annotés, mails de référence)</li>
          </ol>
          <p>
            Le workflow concret pour une session FFB Île-de-France (78) que j’anime : pendant la semaine,
            vous dictez vos observations en mémo vocal sur votre téléphone. Le vendredi, vous transcrivez
            (Otter, dictée Google, Whisper) et vous collez dans l’IA. Le compte rendu sort en 5 à 10
            minutes, prêt à envoyer aux destinataires habituels.
          </p>

          <h3 className="text-lg font-semibold">4. Constat de retard — 5 minutes au lieu de 45 minutes</h3>
          <p>
            Le retard sur chantier, c’est rarement de votre faute. Intempéries qui arrêtent le terrassement,
            validations MOA qui traînent, lot précédent qui prend du retard et bloque votre intervention.
            Mais <strong>sans constat formalisé et envoyé en LRAR</strong> au MOA et MOE, c’est l’entreprise
            qui paie.
          </p>
          <p>
            Sur un chantier de 300 000 €, c’est <strong>100 à 300 € par jour</strong> de retard imputé selon
            les clauses du marché.
          </p>
          <p>
            L’IA génère un courrier opposable comportant les <strong>7 éléments d’un constat valable</strong>{' '}
            :
          </p>
          <ol>
            <li>Identification du marché : MOA, MOE, n° de marché, lot</li>
            <li>Date et heure précises du fait constaté</li>
            <li>Description circonstanciée du fait</li>
            <li>
              <strong>Référence contractuelle invoquée</strong> (CCAG-Travaux 2021 art. 19 ou clause CCAP)
            </li>
            <li>Conséquence chiffrée sur le planning (jours d’arrêt, postes impactés)</li>
            <li>Demande explicite de prolongation de délai</li>
            <li>Envoi en LRAR avec accusé de réception et copie MOE</li>
          </ol>
          <p>
            L’IA peut citer automatiquement les <strong>seuils de référence métier</strong> pertinents pour
            vos corps d’état : pluie cumulée &gt; 5 mm/24 h pour le gros œuvre, gel à 0 °C pour le
            terrassement, vent &gt; 50 km/h pour la couverture, neige au sol &gt; 1 cm pour la peinture
            extérieure — à croiser avec votre convention collective et les usages du chantier.
          </p>
          <blockquote>
            <p>
              <strong>Règle d’or :</strong> envoyez le constat sous 5 jours du fait, en LRAR avec accusé de
              réception. Sans LRAR ou hors délais, même le plus beau constat est inopposable.
            </p>
          </blockquote>

          <h3 className="text-lg font-semibold">5. PV de levée de réserves — 15 minutes au lieu de 1 heure</h3>
          <p>
            Le PV de levée de réserves est <strong>le document qui débloque votre trésorerie</strong>. Tant
            qu’il n’est pas signé par le maître d’ouvrage, votre retenue de garantie reste séquestrée (5 % du
            marché en moyenne), la garantie de parfait achèvement (article 1792-6 du Code civil) continue de
            courir, et le solde du chantier peut être bloqué.
          </p>
          <p>
            Sur un chantier de 200 000 €, c’est <strong>10 000 € qui dorment chez le MOA</strong> pendant des
            mois.
          </p>
          <p>
            L’IA produit un document conforme aux <strong>7 blocs obligatoires</strong> :
          </p>
          <ol>
            <li>Identification du marché : MOA, MOE, n° de marché, adresse chantier</li>
            <li>Référence du PV de réception initial : date et n° de réserves émises</li>
            <li>Date et participants à la visite de levée</li>
            <li>
              Tableau des réserves traitées : n° / libellé initial / nature de la reprise / statut (levée /
              partiellement levée / maintenue)
            </li>
            <li>Photos avant / après pour les reprises visibles</li>
            <li>
              Mention du démarrage ou maintien de la <strong>GPA</strong> (1 an, article 1792-6 Code civil)
            </li>
            <li>Signatures MOA + entreprise + MOE si présent</li>
          </ol>
          <p>
            Vous restez le constatant. L’IA met en forme ce que vous avez vu et validé sur site. Ne signez
            jamais un PV sans avoir vérifié physiquement chaque reprise.
          </p>

          <h3 className="text-lg font-semibold">6. DOE — 1 jour au lieu d’1 semaine</h3>
          <p>
            Le <strong>Dossier des Ouvrages Exécutés</strong> clôt votre chantier. Sa remise au maître
            d’ouvrage est obligatoire — délai standard : <strong>60 jours après la réception</strong> pour les
            marchés publics (article 30 du CCAG-Travaux 2021). Au-delà, pénalités contractuelles applicables
            et <strong>solde bloqué</strong>.
          </p>
          <p>
            Un DOE complet compile 50 à 200 documents — un travail manuel de 2 à 5 jours de bureau.
          </p>
          <p>L’IA génère automatiquement :</p>
          <ul>
            <li>
              La <strong>page de garde</strong> aux normes (logo, marché, dates de réception et livraison)
            </li>
            <li>
              Le <strong>sommaire indexé</strong> conforme aux 9 rubriques obligatoires
            </li>
            <li>
              La <strong>numérotation des pièces</strong> selon la nomenclature MOA exigée (Aconex, Kairnial,
              SharePoint)
            </li>
            <li>
              La <strong>liste des sous-traitants</strong> avec leurs assurances décennales
            </li>
            <li>
              Une <strong>checklist des pièces manquantes</strong> signalant ce qu’il vous reste à récupérer
              auprès des autres lots
            </li>
          </ul>
          <p>
            C’est cette checklist qui transforme le DOE d’une corvée en outil de pilotage : vous lancez la
            méthode dès la phase de réception, pas à la fin. Vous obtenez la liste des manquants 60 jours
            avant la deadline — le temps de tout récupérer sans courir.
          </p>

          <h2 id="gains">Tableau des gains de temps mesurés</h2>
          <p>
            Données observées en formations OFC avec les{' '}
            <strong>
              conducteurs de travaux FFB Grand Paris, FFB Île-de-France, CSFE et CNAM Île-de-France
            </strong>{' '}
            (échantillon : +{SOCIAL_PROOF.PROFESSIONALS_TRAINED} professionnels formés, note moyenne{' '}
            {SOCIAL_PROOF.AVERAGE_RATING}).
          </p>
          <div className="not-prose overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#377CF3] text-white">
                <tr>
                  <th className="px-3 py-2 font-semibold">Livrable</th>
                  <th className="px-3 py-2 font-semibold">Sans IA</th>
                  <th className="px-3 py-2 font-semibold">Avec IA</th>
                  <th className="px-3 py-2 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr>
                  <td className="px-3 py-2">Analyse de DCE (200 pages)</td>
                  <td className="px-3 py-2">4 heures</td>
                  <td className="px-3 py-2">3 minutes</td>
                  <td className="px-3 py-2 font-medium text-green-700">−98 %</td>
                </tr>
                <tr className="bg-[#F2F2F2]/80">
                  <td className="px-3 py-2">PPSPS conforme R4532-64</td>
                  <td className="px-3 py-2">4 heures</td>
                  <td className="px-3 py-2">45 minutes</td>
                  <td className="px-3 py-2 font-medium text-green-700">−81 %</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">CR de chantier hebdomadaire</td>
                  <td className="px-3 py-2">2 heures</td>
                  <td className="px-3 py-2">10 minutes</td>
                  <td className="px-3 py-2 font-medium text-green-700">−92 %</td>
                </tr>
                <tr className="bg-[#F2F2F2]/80">
                  <td className="px-3 py-2">Constat de retard en LRAR</td>
                  <td className="px-3 py-2">45 minutes</td>
                  <td className="px-3 py-2">5 minutes</td>
                  <td className="px-3 py-2 font-medium text-green-700">−89 %</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">PV de levée de réserves</td>
                  <td className="px-3 py-2">1 heure</td>
                  <td className="px-3 py-2">15 minutes</td>
                  <td className="px-3 py-2 font-medium text-green-700">−75 %</td>
                </tr>
                <tr className="bg-[#F2F2F2]/80">
                  <td className="px-3 py-2">DOE complet (compilation)</td>
                  <td className="px-3 py-2">1 semaine</td>
                  <td className="px-3 py-2">1 jour</td>
                  <td className="px-3 py-2 font-medium text-green-700">−80 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Gains cumulés sur un chantier moyen : 30 à 50 heures de bureau récupérées</strong>, soit
            l’équivalent d’une semaine de travail par opération. Sur 10 chantiers par an, c’est entre 300 et
            500 heures rendues au pilotage terrain.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{GAINS_TEMPS_MENTION_PRUDENCE}</p>

          <h2 id="prompts">3 prompts prêts à l’emploi pour conducteur de travaux</h2>

          <h3 className="text-lg font-semibold">Prompt 1 — Analyse rapide d’un DCE</h3>
          <pre className="overflow-x-auto rounded-xl bg-[#1A1A1A] p-4 text-xs leading-relaxed text-zinc-100 md:text-sm">
            {prompt1}
          </pre>

          <h3 className="text-lg font-semibold">Prompt 2 — Compte rendu de chantier hebdomadaire</h3>
          <pre className="overflow-x-auto rounded-xl bg-[#1A1A1A] p-4 text-xs leading-relaxed text-zinc-100 md:text-sm">
            {prompt2}
          </pre>

          <h3 className="text-lg font-semibold">Prompt 3 — Constat de retard en LRAR</h3>
          <pre className="overflow-x-auto rounded-xl bg-[#1A1A1A] p-4 text-xs leading-relaxed text-zinc-100 md:text-sm">
            {prompt3}
          </pre>

          <p>
            Ces 3 prompts sont la base. En formation OFC, on en travaille <strong>8 à 12 par module métier</strong>{' '}
            — calibrés avec vos modes opératoires, votre matrice de risques, votre charte graphique. C’est ce
            calibrage qui transforme un prompt générique en outil de production fiable.
          </p>

          <h2 id="outils">Quel outil IA choisir pour un conducteur de travaux</h2>
          <div className="not-prose overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#377CF3] text-white">
                <tr>
                  <th className="px-3 py-2 font-semibold">Outil</th>
                  <th className="px-3 py-2 font-semibold">Forces pour le CDT</th>
                  <th className="px-3 py-2 font-semibold">Limites</th>
                  <th className="px-3 py-2 font-semibold">Tarif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr>
                  <td className="px-3 py-2 font-medium">
                    <ExternalLinkAnchor href={AI_TOOL_CHATGPT_URL}>ChatGPT Plus</ExternalLinkAnchor>
                  </td>
                  <td className="px-3 py-2">
                    Très bon en rédaction (CR, constats). Plugins. Mobile.
                  </td>
                  <td className="px-3 py-2">Limites de fichiers volumineux (DCE 200 Mo).</td>
                  <td className="px-3 py-2">20 $/mois</td>
                </tr>
                <tr className="bg-[#F2F2F2]/80">
                  <td className="px-3 py-2 font-medium">
                    <ExternalLinkAnchor href={AI_TOOL_CLAUDE_URL}>Claude Pro</ExternalLinkAnchor>
                  </td>
                  <td className="px-3 py-2">
                    Excellent sur les gros DCE. Génère des fichiers Word. Projets pour prompts métier.
                  </td>
                  <td className="px-3 py-2">Moins répandu, courbe d’apprentissage.</td>
                  <td className="px-3 py-2">18 €/mois</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">
                    <ExternalLinkAnchor href={AI_TOOL_MISTRAL_CHAT_URL}>Mistral Le Chat Pro</ExternalLinkAnchor>
                  </td>
                  <td className="px-3 py-2">
                    Hébergement européen, conforme RGPD pour les marchés sensibles.
                  </td>
                  <td className="px-3 py-2">Moins polyvalent sur les tâches longues.</td>
                  <td className="px-3 py-2">15 €/mois</td>
                </tr>
                <tr className="bg-[#F2F2F2]/80">
                  <td className="px-3 py-2 font-medium">
                    <ExternalLinkAnchor href={AI_TOOL_NOTEBOOKLM_URL}>NotebookLM (Google)</ExternalLinkAnchor>
                  </td>
                  <td className="px-3 py-2">Imbattable pour interroger un corpus (DCE multi-PDF).</td>
                  <td className="px-3 py-2">Pas de génération de livrables Word native.</td>
                  <td className="px-3 py-2">Gratuit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Ma recommandation terrain</strong> pour un conducteur de travaux BTP en 2026 :{' '}
            <strong>un outil principal pour la production</strong> (ChatGPT Plus ou Claude Pro) +{' '}
            <strong>NotebookLM en complément</strong> pour l’analyse documentaire des gros DCE. Budget total
            indicatif : environ 20 € par mois hors promotions.
          </p>
          <p>
            Pour les chantiers défense, OIV ou sites SEVESO, vérifiez systématiquement que le règlement de
            consultation autorise l’usage d’outils IA externes, et travaillez avec des données anonymisées dans
            les prompts.
          </p>

          <h2 id="faq">FAQ : ce que les conducteurs de travaux demandent vraiment</h2>
          <dl className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <dt className="font-display font-semibold text-[#377CF3]">{item.q}</dt>
                <dd className="mt-2 text-[#1A1A1A]">{item.a}</dd>
              </div>
            ))}
          </dl>

          <h2 id="formation">Se former à l’IA chantier avec OFC Création d’Entreprise</h2>
          <p>
            OFC Création d’Entreprise propose une <strong>formation IA pour le BTP de 4 heures</strong>, éligible au
            financement Constructys dans le cadre du Plan de Développement des Compétences, spécialement
            conçue pour les <strong>conducteurs de travaux</strong>, <strong>chargés d’affaires</strong> et{' '}
            <strong>dirigeants de PME BTP</strong>.
          </p>
          <p>Le module dédié aux 6 livrables critiques de conducteur de travaux comprend :</p>
          <ul>
            <li>L’analyse de DCE en quelques minutes (CCAP + CCTP + RC + BPU)</li>
            <li>La structuration d’un PPSPS conforme R4532-64</li>
            <li>La rédaction de comptes rendus de chantier à partir de notes vocales</li>
            <li>La génération de constats de retard en LRAR opposables</li>
            <li>
              Les prompts calibrés pour votre métier (gros œuvre, second œuvre, étanchéité, couverture,
              électricité, plomberie, VRD, TP)
            </li>
            <li>La gestion de la confidentialité et le choix de l’outil adapté à vos marchés</li>
          </ul>
          <p>
            <strong>Disponible en présentiel</strong> dans vos locaux en Île-de-France (75, 78, 91, 92, 93,
            94, 95, 77) <strong>ou en distanciel partout en France</strong>.
          </p>
          <p>
            Financement : jusqu’à <strong>24 € HT/heure/stagiaire</strong> dans les plafonds Constructys 2026,
            avec maximum <strong>840 € HT/jour/groupe en intra</strong>, plus prise en charge salaires (
            <strong>15 € HT/h</strong> pour les entreprises de moins de 11 salariés, sous conditions du
            dispositif).
          </p>
          <p>
            <strong>Références institutionnelles</strong> : FFB Grand Paris, FFB Île-de-France (78/91/95), FFB
            Île-de-France Est, CSFE, CNAM Île-de-France, Lefebvre Dalloz —{' '}
            <strong>
              +{SOCIAL_PROOF.PROFESSIONALS_TRAINED} professionnels formés, note {SOCIAL_PROOF.AVERAGE_RATING}
            </strong>
            .
          </p>
          <p>
            Découvrez le{' '}
            <Link href={LINKS.formations} className="font-medium underline">
              catalogue des formations IA appliquées au bâtiment
            </Link>{' '}
            et le détail du{' '}
            <Link href={LINKS.financement} className="font-medium underline">
              financement Constructys 2026 pour la formation IA pour les pro du BTP
            </Link>
            . Pour le programme dédié au terrain chantier, utilisez le lien « IA pour conducteur de travaux
            » placé plus haut dans ce guide (une seule entrée maillage pour éviter les doublons et garder une
            lecture claire).
          </p>

          <h2 id="sources">Sources réglementaires citées</h2>
          <p>Cet article s’appuie sur les textes et références officiels suivants :</p>
          <ul>
            <li>
              <strong>Code du travail</strong> — Articles R4532-56 à R4532-74 (PPSPS) —{' '}
              <ExternalLinkAnchor href="https://www.legifrance.gouv.fr/">Légifrance</ExternalLinkAnchor>
            </li>
            <li>
              <strong>Code du travail</strong> — Article L4744-3 —{' '}
              <ExternalLinkAnchor href="https://www.legifrance.gouv.fr/">Légifrance</ExternalLinkAnchor>
            </li>
            <li>
              <strong>Code civil</strong> — Article 1792-6 (garantie de parfait achèvement) —{' '}
              <ExternalLinkAnchor href="https://www.legifrance.gouv.fr/">Légifrance</ExternalLinkAnchor>
            </li>
            <li>
              <strong>Code de la commande publique</strong> — Article 122 —{' '}
              <ExternalLinkAnchor href="https://www.legifrance.gouv.fr/">Légifrance</ExternalLinkAnchor>
            </li>
            <li>
              <strong>CCAG-Travaux 2021</strong> — Articles 19 (prolongation de délai) et 30 (DOE) —
              documentation juridique des marchés publics
            </li>
            <li>
              <strong>Référentiel intempéries</strong> — seuils métiers de référence —{' '}
              <ExternalLinkAnchor href="https://www.cibtp.fr/">CIBTP</ExternalLinkAnchor>
            </li>
            <li>
              Synthèses sectorielles et enquêtes professionnelles sur la digitalisation BTP (FNTP,
              observatoires métiers, études stratégiques publiées sur la construction).
            </li>
          </ul>

          <footer className="not-prose mt-14 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="m-0 font-display font-semibold text-[#377CF3]">
              Laure Olivié — Formatrice IA pour les pro du BTP, OFC Création d’Entreprise
            </p>
            <p className="mt-2 text-sm">
              Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078 · Siège à{' '}
              {SCHEMA_GEO.addressLocality} ({SCHEMA_GEO.postalCode}), interventions Île-de-France et France.
            </p>
            <p className="mt-2 text-sm">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="text-[#377CF3] underline">
                {SITE_CONFIG.phoneDisplay}
              </a>
              {' · '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#377CF3] underline">
                {SITE_CONFIG.email}
              </a>
              {' · '}
              <ExternalLinkAnchor href={SITE_CONFIG.url} className="text-[#377CF3] underline">
                www.laureolivie.fr
              </ExternalLinkAnchor>
            </p>
            <p className="mt-4 text-sm">
              <ExternalLinkAnchor
                href={buildSiteCalendlyCtaUrl('ressources-guide-cdt-ia-btp-fin')}
                className="inline-flex rounded-lg bg-[#377CF3] px-4 py-2 font-semibold text-white no-underline hover:bg-[#2e69d9]"
              >
                Prendre rendez-vous — diagnostic gratuit 30 min
              </ExternalLinkAnchor>
              <span className="mx-2 text-neutral-400">·</span>
              <span className="text-neutral-600">
                Catalogue formations : utilisez le lien « catalogue des formations IA pour le BTP » dans la section
                formation ci-dessus (maillage unique).
              </span>
            </p>
          </footer>

          <section aria-labelledby="pour-aller-plus-loin" className="not-prose mt-12 rounded-xl bg-white p-6 shadow-sm">
            <h2 id="pour-aller-plus-loin" className="font-display text-xl font-bold text-[#377CF3]">
              Pour aller plus loin
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#1A1A1A]">
              <li>
                <Link href={LINKS.skillIaConducteurTravaux} className="font-medium text-[#377CF3] underline">
                  Guide PDF gratuit — 6 tutos Claude pour conducteur de travaux (DCE, PPSPS, CR…)
                </Link>
              </li>
              <li>
                <Link href={LINKS.tutoCrChantier} className="font-medium text-[#377CF3] underline">
                  Tuto web — compte rendu de chantier avec l’IA
                </Link>
              </li>
              <li>
                <Link href={LINKS.blogGuideSkillIaConducteurTravaux} className="font-medium text-[#377CF3] underline">
                  Article blog — guide Skill IA conducteur de travaux BTP
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
